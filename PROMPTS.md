AI-Assisted Development — Prompt Sequence & Workflow

1.  Assignment Intake and Scoping

Prompt:

Read the Playpower Labs Take-Home Task PDF carefully and inspect the
provided Airbnb reference application and layout screenshot.

Before writing code, identify:

• All required screens and interaction states • Reusable UI components •
Required functionality • Visual details that need to match the reference
• Accessibility requirements • Data and asset requirements • Backend/API
requirements • Production architecture or scaling requirements

Break the assignment into clear implementation phases. Separate
must-have requirements, visual fidelity requirements, interactive
behavior, and optional improvements.

Do not start implementing until the requirements and overall structure
are clearly understood.

2.  Data Modeling and Asset Extraction

Prompt:

Analyze the reference listing and determine the complete data structure
required to reproduce the page accurately.

Create a structured listing model containing:

• Property information • Title and location • Host information • Pricing
• Ratings • Review information • Categorized amenities • Room categories
• Image metadata • Descriptions • Location information • Booking
information

For the listing “Romantic Jacuzzi 1BHK Candolim | Mirashya UG10”,
organize the available reference information, including the 18
room-categorized images, host information, ₹28,498/night pricing, 32
amenities, 4.95 rating, and review data.

Keep the data separate from the React components so that the UI remains
data-driven and easy to maintain.

3.  Primary Listing Page

Prompt:

Implement the primary desktop listing page based on the provided
reference.

Break the page into reusable React components instead of creating one
large component.

Implement:

• Airbnb-style header • Brand/logo area • Search pill with destination,
date, and guest states • Profile menu • Listing title • Share
interaction with clipboard support • Save/heart toggle • 1-large +
4-small image gallery • Show All Photos interaction • Guest Favourite
badge • Rating and review summary • Host information • Workspace, host,
and location highlights • Translation disclaimer • Where You’ll Sleep
section • Sticky booking card • Dynamic price breakdown

Match the reference as closely as possible in terms of spacing,
typography, proportions, borders, shadows, icons, and component
dimensions.

Keep the implementation modular and use semantic HTML and clean CSS.

4.  Extended Listing Sections

Prompt:

Continue from the existing listing implementation without breaking the
current layout or interactions.

Implement the remaining sections visible in the reference.

Reviews section:

• Large 4.95 rating badge • Category rating bars • Category icons •
Review topic filters • Review cards

Location section:

• Candolim, Goa map presentation • Location radius • Custom location
marker • Surrounding location context

Meet Your Host section:

• Michelle & Neha host card • Co-host information • Response statistics
• Payment protection information

Things to Know section:

• House Rules • Safety • Cancellation Policy

Also implement:

• Nearby listing cards • Pricing and ratings • Airbnb-style footer

Reuse existing components and styling patterns where possible. Avoid
duplicating logic.

5.  Photo Tour, Lightbox, and Modals

Prompt:

Implement the overlay and modal functionality required by the reference
application.

Photo Tour:

• Full-screen gallery • Back navigation • Category tabs • Room/category
grouping • Vertically arranged image stream • Correct image metadata and
captions

Lightbox:

• Single-image viewer • Previous and next controls • Image counter •
Caption • Keyboard navigation • Escape-to-close behavior

Additional modals:

• Show All 32 Amenities • About This Space • Show All 19 Reviews

Make the modal system reusable and ensure that opening or closing an
overlay does not interfere with the underlying page state.

6.  Accessibility and Keyboard Interaction

Prompt:

Perform an accessibility review of all current modals, overlays,
buttons, navigation controls, and keyboard interactions.

Check the implementation for:

• Semantic HTML • ARIA labels for icon-only controls • Appropriate
dialog roles • aria-modal • Focus movement when opening modals • Focus
trapping • Focus restoration after closing • Escape-to-close behavior •
ArrowLeft and ArrowRight navigation in the lightbox • Visible keyboard
focus states • Keyboard accessibility of interactive elements •
prefers-reduced-motion support

For each issue found, identify the affected component, explain the
problem, and provide the appropriate implementation change.

7.  Visual Fidelity Review

Prompt:

Compare the current implementation against the provided reference
screenshot and reference application.

Review:

• Page width and container alignment • Header height • Typography • Font
sizes and weights • Line heights • Spacing and vertical rhythm • Gallery
proportions • Image cropping • Border radius • Borders • Shadows • Icon
sizing and positioning • Button dimensions • Rating components • Sticky
booking card • Modal dimensions • Overlay behavior

Identify the differences in priority order:

1.  Major layout differences
2.  Component-level differences
3.  Typography differences
4.  Spacing differences
5.  Minor visual details

Make targeted changes based on the reference and avoid unnecessary
stylistic changes.

8.  CSS and Design Consistency

Prompt:

Review the current CSS and identify repeated values such as colors,
typography sizes, font weights, spacing, border radii, shadows,
container widths, and common component dimensions.

Organize these values into reusable design tokens so that future visual
adjustments can be made consistently across the application.

Do not change the existing visual appearance while extracting the tokens
unless a value is clearly inconsistent with the reference.

9.  Production Architecture

Prompt:

Design a high-level production architecture for a vacation-rental
marketplace operating at large scale.

The architecture should include:

• Web frontend • API gateway • Backend services • Authentication •
Listing service • Booking service • Payment service • Review service •
Search service • Kafka/event streaming • PostgreSQL • Database sharding
• Redis caching • Elasticsearch or equivalent geo-search • Object
storage and CDN for images • Kubernetes deployment • Logging •
Monitoring • Observability • Horizontal scaling

Explain the purpose of each major component and how the system can scale
as traffic and data volume increase.

Create a clean architecture diagram and supporting technical
documentation suitable for a software engineering take-home assignment.

10. Booking, Search, and Currency Features

Prompt:

Review the current application and improve the main user interaction
flows while preserving the existing visual design.

Implement the following:

Booking and dates:

• Synchronize selected dates with the sticky booking card • Calculate
the number of nights • Recalculate the total price dynamically

Reservation:

• Reservation confirmation modal • Booking summary • Generated
confirmation code

Language and Currency:

• Language and currency modal • Currency selection • Exchange-rate
conversion • Consistent price conversion across the application

Search:

• Destination dropdown • Date selection • Guest selection • Adult,
child, and infant counters

Additional interactions:

• Report modal • Things to Know modal • Message Host dialog • Keyboard
shortcuts/help modal • Toast notifications

Before modifying each flow, inspect the existing state management to
avoid duplicated or conflicting state.

Test each interaction after implementation and make sure existing
functionality continues to work.

11. Debugging and Error Resolution

Prompt:

Inspect the current runtime error and trace it back to the actual source
instead of applying a superficial workaround.

Identify:

• The component where the error occurs • The exact state or data value
causing the problem • Why the value can become undefined • The safest
fix • Whether the same data-flow issue exists elsewhere

Apply the smallest maintainable fix and verify that the existing
functionality remains intact.

After fixing the issue, check related components for similar problems.

12. Final Review

Prompt:

Perform a final review of the complete application.

Verify:

• All required assignment features are implemented • Navigation works
correctly • Modals open and close correctly • Keyboard interactions work
• Booking calculations are correct • Search interactions work • Currency
changes are reflected correctly • Images load correctly • No major
console errors remain • Components remain modular • Data is separated
from presentation • Accessibility requirements are addressed • The
implementation matches the reference as closely as possible • The
architecture documentation and diagram are complete

Identify any remaining issues that could affect functionality, visual
fidelity, maintainability, or the evaluation criteria.

Development Approach

The implementation was developed iteratively:

1.  Understand the requirements and reference.
2.  Break the application into reusable components.
3.  Model the required data.
4.  Implement the main listing page.
5.  Add secondary sections and interactions.
6.  Implement overlays and modal behavior.
7.  Test and debug the application.
8.  Compare the implementation against the reference.
9.  Refine visual details and interactions.
10. Review accessibility and keyboard behavior.
11. Add advanced functionality.
12. Complete the production architecture and final validation.
