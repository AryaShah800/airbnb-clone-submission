# Production Architecture & Scaling Strategy

This document provides a comprehensive technical breakdown of the architecture for scaling a high-traffic vacation rental marketplace (like Airbnb) to handle millions of daily active users, petabytes of media, sub-100ms search latency, and zero-double-booking guarantees.

The accompanying architectural schematics are available in [`architecture-diagram.png`](./architecture-diagram.png) and vector format [`architecture-diagram.svg`](./architecture-diagram.svg).

---

## 1. High-Level Architecture Overview

```
[ Web (React/Next.js) ]      [ Mobile iOS/Android ]
           \                     /
            v                   v
     [ CDN + Edge Cache (CloudFront / Vercel Edge) ]
                       |
                       v
         [ Load Balancer & WAF (AWS ALB / Cloudflare) ]
                       |
                       v
         [ API Gateway (AuthN, Rate Limiting, BFF) ]
                       |
   +-------------------+-------------------+
   |                   |                   |
   v                   v                   v
[ Listings ]       [ Search ]         [ Booking ]      [ Payments ]    [ Media ]
  Service           Service            Service          Service         Service
   |                   |                   |               |               |
   +-------------------+-------------------+---------------+---------------+
                       |
                       v
            [ Kafka Event Streaming Bus ]
           /           |             \
          v            v              v
    [ Search Indexer ] [ Async Workers ] [ Analytics ETL ]
          |            |              |
          v            v              v
  [ Elasticsearch ] [ Redis / DB ] [ BigQuery / Snowflake ]
```

---

## 2. Layer-by-Layer Architectural Specifications

### 2.1 Client & Edge Layer
- **Rendering Strategy (SSR & ISR):** Listing pages (`/rooms/:id`) utilize Incremental Static Regeneration (ISR). High-traffic listings are statically cached at edge nodes (TTL: 60s) and regenerated in the background upon property updates.
- **Edge Caching & CDN:** Static bundles, WebP/AVIF responsive image variants, and video tours are distributed globally across 300+ edge locations (CloudFront/Cloudflare) achieving >95% cache hit ratio and <50ms first-byte times.
- **Client State & Hydration:** React 19 concurrent hydration with optimistic UI updates (instant wishlist toggle, instant calendar selection) and defensive local fallbacks.

### 2.2 Edge, API Gateway & BFF Layer
- **WAF & DDoS Mitigation:** Cloudflare / AWS WAF protects against bot scrapers, brute force credential attacks, and layer 7 DDoS.
- **Rate Limiting:** Token-bucket algorithm implemented in Redis (e.g., max 100 requests/minute for search queries, 10/minute for booking attempts).
- **Backend-for-Frontend (BFF):** GraphQL / REST federation layer aggregates data across underlying microservices, reducing mobile client round-trips and payload sizes.

### 2.3 Application Microservices
1. **Listings Service:**
   - Owns property metadata, house rules, amenities, room groupings, and host profile associations.
   - Read-heavy workload (100:1 read-to-write ratio) optimized with multi-tier Redis caching.
2. **Search & Discovery Service:**
   - Powers geo-distance radius filtering, date availability intersection, pricing range, and keyword filters.
   - Built on top of an autoscaling Elasticsearch / OpenSearch cluster with geospatial indexing (`geo_point` and `geo_shape`).
3. **Booking & Reservation Service:**
   - **Distributed Locking:** Uses Redis Redlock or Postgres row-level locks (`SELECT FOR UPDATE`) to eliminate race conditions and double-booking.
   - **State Machine:** Deterministic transitions: `PENDING_RESERVE` → `PAYMENT_AUTHORIZED` → `CONFIRMED` / `EXPIRED`.
   - **Inventory Locks:** When a user clicks "Reserve", an inventory hold is placed for 15 minutes before expiring automatically if payment is not finalized.
4. **Payments Service:**
   - PCI-DSS compliant isolated sandbox.
   - Integrates Stripe, Razorpay, and regional gateways with idempotency keys on all charge and refund operations.
   - Escrow holding: guest payment captured immediately; host payout disbursed 24 hours after verified check-in.
5. **Media Service:**
   - Direct-to-S3 pre-signed upload URLs.
   - Async Lambda/worker pipeline generates responsive multi-resolution thumbnails (1080p, 720p, 480p, blurhash placeholders).
6. **Messaging & Notifications Service:**
   - Real-time WebSockets for host-guest chat.
   - Multi-channel delivery (Email via SendGrid, SMS via Twilio, push notifications via FCM/APNs).

---

## 3. Asynchronous Processing & Event Bus (Kafka)

All services communicate state changes asynchronously via Apache Kafka:
- `listing.created` / `listing.updated`: Consumed by Search Indexer to update OpenSearch near-real-time (<500ms).
- `booking.requested`: Consumed by Notifications Service to alert the host and inventory worker.
- `payment.completed`: Triggers booking state transition and receipt generation.
- `user.interaction`: Streamed to Kafka topic for real-time recommendation engines and clickstream analytics.

---

## 4. Data Layer & Storage Strategy

| Data Type | Technology | Storage Pattern | Retention / Scalability |
| :--- | :--- | :--- | :--- |
| **Listings & Bookings** | PostgreSQL | Sharded by geographic region (`region_id`) + listing ID hash. Read replicas across 3 Availability Zones. | ACID transactions, automated point-in-time recovery. |
| **Fast Search & Geo** | Elasticsearch | Indices partitioned by country/city; replicas per shard. | Sub-50ms query latency, eventual consistency via Kafka. |
| **Hot Cache & Sessions** | Redis Cluster | LRU cache for listing payloads, user auth sessions, distributed locks. | In-memory, sub-2ms latency, multi-node clustering. |
| **Images & Media** | AWS S3 / Google Cloud Storage | Object storage with immutable versioning and CDN origin shielding. | 99.999999999% (11 9s) durability. |
| **Analytics & ML** | BigQuery / Snowflake | Parquet columnar storage fed by Kafka Connect. | Petabyte-scale BI reporting, dynamic pricing models. |

---

## 5. High Availability, Fault Tolerance & Disaster Recovery

- **Multi-AZ Deployment:** Every service runs across at least 3 distinct AWS Availability Zones.
- **Horizontal Pod Autoscaling (HPA):** Kubernetes autoscaler scales pods based on CPU utilization and incoming request queues.
- **Circuit Breakers (Resilience4j / Envoy):** If the Reviews service slows down, the listing page gracefully degrades by serving cached review counts without blocking property booking.
- **Idempotency:** Every POST/PUT endpoint accepts an `Idempotency-Key` header to prevent duplicate charges or bookings upon network retries.
- **Blue/Green Deployments:** Zero-downtime rolling deployments with automatic canary rollbacks upon error-rate spikes.
