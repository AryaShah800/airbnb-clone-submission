---
name: airbnb-design-tokens
description: Reference design tokens (color, type, spacing, radius) for reproducing Airbnb's real listing-page visual system. Use whenever styling a component for the Airbnb-clone assignment so values stay consistent across files instead of being re-guessed per component.
---

# Airbnb Design Tokens

## Color
- Primary / accent: `#FF385C` (rausch), hover/active `#E31C5F`
- Text: `#222222`
- Secondary text: `#717171`
- Border: `#DDDDDD`, light border: `#EBEBEB`
- Success/available: `#008A05`

## Type
- Font stack: `"Circular", "Helvetica Neue", Helvetica, Arial, sans-serif`
- Listing title: 26px / 600
- Section headers: 20px / 600
- Body: 15–16px / 400, line-height 1.6
- Small meta text: 13–14px

## Spacing & radius
- Page max-width: 1120px
- Card radius: 12px; button radius: 8px; small chips: 4px
- Section vertical rhythm: 24px between blocks, 48px between major sections

## Motion
- Hover transitions: 150–200ms ease on background/transform, never longer
- Modal open: simple fade-in (~200ms), respect `prefers-reduced-motion`
- Gallery tile hover: `scale(1.03)` on the image plus a 12% black overlay,
  not a border or shadow change

## Interaction conventions
- Icon-only buttons always get `aria-label`
- Overlays (Photo Tour, Lightbox) trap focus, close on Escape, restore focus
  to the trigger on close
- Lightbox supports ArrowLeft/ArrowRight for prev/next
