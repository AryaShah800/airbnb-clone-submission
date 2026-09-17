# AGENTS.md — Specialized Sub-Agent Configurations

This project utilized a multi-agent AI collaboration workflow to achieve high visual fidelity, structural clean-room code, and WCAG accessibility standards.

## 1. Component Builder Agent (`.claude/agents/component-builder.md`)
- **Role:** Frontend Architecture & Component Construction.
- **Responsibilities:**
  - Implements modular React components adhering to clean HTML semantic elements (`<main>`, `<section>`, `<header>`, `<article>`).
  - Writes pure, scoped CSS using Airbnb design tokens (typography, border radius, spacing).
  - Keeps component interfaces decoupled with explicit props and event callbacks.

## 2. Visual Fidelity Reviewer Agent (`.claude/agents/fidelity-reviewer.md`)
- **Role:** Visual QA & Parity Auditor.
- **Responsibilities:**
  - Performs cross-reference audits between the implemented views and the reference screenshot (`https://airbnb-clone-umber-two.vercel.app`).
  - Checks exact pixel proportions, typography weights (`600` titles, `400` body), SVG icons, color codes (`#FF385C`, `#222222`, `#717171`), and hover/focus transitions.

## 3. Accessibility Auditor Agent (`.claude/agents/accessibility-auditor.md`)
- **Role:** WCAG 2.1 AA Compliance & Keyboard Interaction.
- **Responsibilities:**
  - Enforces modal focus traps and Escape key dismissals via `useModalA11y.js`.
  - Verifies ARIA roles (`role="dialog"`, `aria-modal="true"`, `aria-expanded`).
  - Ensures keyboard navigation across overlays (Arrow keys for Lightbox, Tab cycling).
  - Respects `prefers-reduced-motion` media queries.

## 4. Design Tokens Skill (`.claude/skills/airbnb-design-tokens/SKILL.md`)
- **Role:** Centralized Design Token Authority.
- **Responsibilities:**
  - Enforces standard colors, spacing scales (`4px` to `48px`), typography hierarchy, and transition timings across all style sheets.
