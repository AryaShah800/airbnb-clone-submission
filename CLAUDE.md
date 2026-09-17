# CLAUDE.md — Project Guidelines & AI Assistant Context

## Overview
This repository contains a high-fidelity desktop clone of the Airbnb listing page (`Romantic Jacuzzi 1BHK Candolim | Mirashya UG10`), developed for the Playpower Labs Take-Home Assignment.

## Stack & Architecture
- **Frontend:** React 19, Vite, vanilla CSS (no heavy CSS frameworks or Tailwind).
- **Backend:** Node.js, Express mock API (`server/data/listing.json`).
- **Resilience:** Built-in static fallback to bundled listing JSON in `client/src/api/listing.js` for zero-dependency edge deployments.
- **Accessibility:** WCAG 2.1 AA compliant, custom `useModalA11y` hook (focus trapping, Tab cycling, Escape to close).

## Commands
- **Install Client:** `cd client && npm install`
- **Dev Client:** `npm run dev` (starts on `http://localhost:5173`)
- **Build Client:** `npm run build` (outputs to `client/dist`)
- **Run Server:** `cd server && npm install && npm start` (starts on `http://localhost:4000`)

## Key Conventions
- Desktop-first UI layout targeting 1120px max content width.
- Custom CSS design tokens in `client/src/styles/listing.css`.
- Modular overlay architecture for Photo Tour (`PhotoTour.jsx`) and Lightbox (`Lightbox.jsx`).
- Dynamic interactive state synchronization: calendar dates recalculate stay cost and fees in `BookingCard.jsx` in real time.
- Multi-currency conversion engine (`CurrencyModal.jsx`) converting all prices across the site dynamically.
