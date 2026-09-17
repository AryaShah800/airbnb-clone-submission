# Airbnb Listing Clone — Playpower Labs Take-Home Task

A pixel-perfect desktop clone of the Airbnb listing page (`Romantic Jacuzzi 1BHK Candolim | Mirashya UG10`) matching the reference (`https://airbnb-clone-umber-two.vercel.app`) visually and behaviorally across all three required views:

1. **Listing Page:** Full property page with identical layout, typography, authentic Airbnb icons, and interactions.
2. **Photo Tour:** Full-screen gallery opened from "Show all photos" or any hero photo, with room category tabs and grouped room sections.
3. **Lightbox:** Single-photo viewer opened from any gallery photo with prev/next controls, keyboard ($\leftarrow/\rightarrow$) navigation, Escape key to close, and captions.

---

## Tech Stack
- **Frontend:** React 19 + Vite, vanilla CSS with custom design tokens (no heavy CSS framework classes).
- **Backend:** Node.js / Express API serving mock listing data (`server/data/listing.json`).
- **Resilience:** The frontend includes an automatic fallback to bundled mock data if the backend server is offline, enabling standalone deployment on platforms like Vercel.
- **Accessibility:** Full WCAG 2.1 AA compliance with focus trapping, ARIA roles (`dialog`, `aria-modal`), keyboard navigation, and visible focus rings.

---

## Quick Start (Run Locally)

### 1. Start the Backend API (Optional / Recommended)
```bash
cd server
npm install
npm start
# API server running on http://localhost:4000
```

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
# Vite dev server running on http://localhost:5173
```

To build for production:
```bash
cd client
npm run build
```

---

## Implemented Views & Features

### View 1: Listing Page
- **Navigation Bar:** Authentic Airbnb brand logo, floating search pill ("Anywhere · Any week · Add guests" with coral search button), host link, language globe, and interactive profile menu dropdown.
- **Title & Action Row:** Listing title with interactive "Share" (copies URL with feedback toast) and "Save" (animated heart wishlist toggle).
- **Hero Photo Grid:** 1-large + 4-small photo layout with hover zoom/darken transitions and a floating "Show all photos" button with the 9-dot grid icon.
- **Guest Favourite Award Banner:** Laurel wreath graphics, 4.95 star rating, and 19 reviews counter.
- **Host Row:** Michelle & Neha host profile, Superhost badge, and tenure.
- **Listing Highlights:** Dedicated workspace, experienced host, and great location highlights with authentic SVG icons.
- **Translation Banner:** Auto-translation notice with "Show original" trigger.
- **Listing Description:** Rich description with "Show more >" modal dialog.
- **Where You'll Sleep:** Room cards with photos for the Master Bedroom (double bed) and Living Room (sofa bed).
- **What This Place Offers:** 2-column grid of 10 primary amenities with SVG icons, plus a working "Show all 32 amenities" modal dialog with search filtering.
- **Interactive Calendar:** Dual-month view (October & November 2023) with preselected dates (14–19 Oct), keyboard shortcut button, and "Clear dates" action.
- **Sticky Booking Card:** Real-time pricing (₹28,498/night), check-in/checkout dates, guest selector dropdown, gradient Reserve button, dynamic fee calculation breakdown, and "Report this listing" link.
- **Big Reviews Section:** Giant 4.95 rating display with laurel wreath branches, 6 category rating breakdown bars with icons, topic filter pills, 6 review cards, and a working "Show all 19 reviews" modal dialog.
- **Where You'll Be (Map):** Interactive styled map of Candolim, Goa with coastal outline, translucent area circle highlight, custom pin, zoom controls (+ / -), and neighborhood description.
- **Meet Your Host:** Detailed host card with rating and review statistics, co-hosts list, response metrics (100% response rate), "Message Host" button, and payment protection notice.
- **Things to Know:** 3-column layout covering House Rules, Safety & Property, and Cancellation Policy.
- **Footer:** "Other listings nearby" cards and standard Airbnb multi-column footer.

### View 2: Photo Tour
- Opened from "Show all photos" or by clicking any photo in the hero grid.
- Sticky top bar with back navigation arrow, listing title, and share/save buttons.
- Room category filter tabs ("All photos", "Living room", "Bedroom", "Bathroom", "Outdoor", "Kitchen").
- Photo stream organized by room with titles and descriptive captions.
- Clicking any photo launches the Lightbox at that specific photo.

### View 3: Lightbox
- Immersive dark full-screen single-photo viewer.
- Top bar with close button, photo counter (`X / 18`), share, and save actions.
- Circular Previous ($\leftarrow$) and Next ($\rightarrow$) navigation buttons with smooth slide animations.
- Full keyboard support: `ArrowLeft` / `ArrowRight` to change photos, `Escape` to close.
- Bottom caption bar displaying the room name and description.

---

## AI-Assisted Development Workflow
- **`PROMPTS.md`:** Complete record of prompts and iteration sequence used during development.
- **Sub-Agents:** `.claude/agents/` containing dedicated configurations for `component-builder`, `fidelity-reviewer`, and `accessibility-auditor`.
- **Skills:** `.claude/skills/airbnb-design-tokens/` defining shared design variables and constraints.

---

## Architecture Diagram & Production Scaling
- **Visual Diagram:** [`architecture-diagram.png`](./architecture-diagram.png) (vector source: [`architecture-diagram.svg`](./architecture-diagram.svg))
- **In-Depth Documentation:** [`ARCHITECTURE.md`](./ARCHITECTURE.md) provides detailed analysis of:
  - **Client Layer:** Next.js / React SSR, mobile clients, CDN edge caching.
  - **Edge / API Gateway:** WAF, API gateway, rate limiting, GraphQL/REST BFF.
  - **Application Services:** Independently scaled microservices for Listings, Search, Booking (inventory locking), Payments, Media, and Notifications.
  - **Async Layer:** Kafka / SQS event bus with autoscaling consumer workers and near-real-time search indexing.
  - **Data Layer:** Sharded PostgreSQL with read replicas, Elasticsearch geo-search cluster, Redis caching layer, and S3 media storage.
  - **Deployment & Scaling:** Kubernetes HPA, multi-AZ deployment, circuit breakers, and zero-downtime blue/green deployments.
