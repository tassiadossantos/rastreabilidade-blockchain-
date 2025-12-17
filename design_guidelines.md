# Design Guidelines: Agricultural Traceability Blockchain Platform

## Design Approach

**Selected Approach:** Design System - Material Design
**Justification:** This enterprise B2B application prioritizes data clarity, workflow efficiency, and trust signals. Material Design provides robust patterns for complex forms, data visualization, and multi-step processes essential for blockchain verification workflows.

**Core Principles:**
- Information hierarchy that prioritizes data integrity signals
- Clear visual separation between data entry and verification states
- Progressive disclosure for complex blockchain transaction details
- Trust-building through professional, structured layouts

## Typography System

**Font Family:** Inter (primary), Roboto Mono (data/hashes)

**Hierarchy:**
- Page Headers: 2.5rem (40px), font-weight 700
- Section Headers: 1.75rem (28px), font-weight 600
- Card Headers: 1.25rem (20px), font-weight 600
- Body Text: 1rem (16px), font-weight 400
- Data Labels: 0.875rem (14px), font-weight 500, uppercase tracking
- Hash/Technical Data: 0.875rem (14px), Roboto Mono, font-weight 400
- Helper Text: 0.75rem (12px), font-weight 400

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 or p-8
- Section spacing: py-12 or py-16
- Card gaps: gap-6
- Form field spacing: space-y-4
- Dashboard metrics: gap-8

**Container Strategy:**
- Max width: max-w-7xl for main content
- Dashboard grids: 12-column grid system
- Form layouts: max-w-2xl centered for single-column, max-w-4xl for two-column layouts

## Core Component Library

### Navigation
**Top Navigation Bar:**
- Fixed header with logo left, primary navigation center, user account right
- Height: h-16
- Contains: Role indicator badge, wallet connection status, notifications

**Sidebar Navigation (Dashboard):**
- Width: w-64
- Collapsible to w-16 on mobile
- Sections: Dashboard, Register Batch, Track Batches, Verification, Reports
- Active state clearly indicated with background treatment

### Forms & Data Entry

**Multi-Step Registration Form:**
- Stepper component showing 4 stages (Insumo → Aplicação → Colheita → Transporte)
- Progress indicator with completed/active/pending states
- Card-based form sections with clear visual grouping
- Form fields: Full-width inputs with floating labels
- Field spacing: space-y-6 between field groups
- Action buttons: Sticky footer with "Back" (secondary) and "Next/Submit" (primary)

**Input Components:**
- Text inputs: h-12, rounded borders, focus states with ring
- File uploads: Drag-and-drop zone with preview thumbnails
- Date/time pickers: Native HTML5 enhanced with clear formatting
- Dropdowns: Searchable select for entities (producers, cooperatives)

### Dashboard Components

**Metrics Cards:**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Card structure: Icon top-left, metric value large, label small, trend indicator
- Padding: p-6
- Border treatment with subtle shadow

**Timeline Visualization:**
- Vertical timeline for batch journey
- Each step shows: Icon, timestamp, actor, status badge, blockchain tx link
- Spacing between steps: space-y-8
- Connecting line visual element between steps

**Data Tables:**
- Header row with sortable columns
- Row height: h-16
- Alternating row treatment for readability
- Actions column (right-aligned): View details, Verify, Export
- Pagination controls at bottom
- Responsive: Collapse to cards on mobile

### Blockchain Verification Display

**Verification Panel:**
- Two-column layout: Off-chain data (left) vs On-chain hash (right)
- Comparison indicator showing match/mismatch status
- Monospace font for hashes and transaction IDs
- "View on Polygonscan" external link button
- Copy-to-clipboard functionality for hashes

**Status Badges:**
- Verification states: Verified (success), Pending (warning), Failed (error), Not Synced (neutral)
- Size: inline with text, rounded-full, px-3 py-1
- Include status icon + text

### Data Visualization

**Batch Journey Map:**
- Horizontal progress bar showing completion percentage
- Stage indicators with icons
- Current stage highlighted
- Clickable stages to view detailed information

**Integrity Indicators:**
- Hash comparison visual (checkmark or alert icon)
- Timestamp display with blockchain confirmation count
- Gas used and transaction cost (for transparency)

## Layout Patterns

### Dashboard Layout
- Three-column grid: Sidebar (w-64) + Main content (flex-1) + Info panel (w-80, optional)
- Main content: Metrics cards at top, primary data table/timeline below
- Spacing: p-8 for main content area

### Registration Flow Layout
- Centered single-column form (max-w-2xl)
- Stepper at top showing all 4 stages
- Form card with generous padding (p-8)
- Sticky action footer

### Verification Detail Page
- Hero section showing batch ID and overall status
- Grid layout below: 2 columns on desktop (off-chain vs on-chain)
- Full timeline at bottom spanning full width
- Sidebar showing quick stats (dates, actors, transaction count)

## Interaction Patterns

**Loading States:**
- Skeleton screens for data tables and cards
- Spinner for blockchain transaction confirmation
- Progress bar for multi-step processes

**Empty States:**
- Centered content with illustrative icon
- Clear call-to-action ("Register Your First Batch")
- Helper text explaining next steps

**Error States:**
- Inline validation messages below form fields
- Alert banners for system-level errors
- Blockchain error explanations in plain language

**Success Confirmations:**
- Toast notifications for completed actions
- Transaction success modal with blockchain tx ID
- Option to view on explorer or continue workflow

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - Single column, collapsed sidebar, stacked forms
- Tablet: 768px - 1024px - Two-column layouts, compressed metrics
- Desktop: > 1024px - Full multi-column layouts, expanded sidebar

**Mobile Optimizations:**
- Bottom navigation bar for primary actions
- Swipeable cards for batch timeline
- Collapsible details sections
- Simplified table views (show essential columns only)

## Accessibility & Trust Signals

**Trust Indicators:**
- Blockchain verification badges prominently displayed
- Transaction confirmations count
- Timestamp with relative time ("2 hours ago") and absolute date
- Clear actor attribution (who registered what)

**Data Integrity:**
- Visual hash comparison with clear match/mismatch indicators
- "Last verified" timestamp on all blockchain-linked data
- Warning indicators for unverified or pending data

**Accessibility:**
- ARIA labels for all interactive elements
- Keyboard navigation support for multi-step forms
- High contrast for status indicators
- Screen reader-friendly table structures

## Critical Implementation Notes

- Maintain consistent spacing throughout (units: 2, 4, 6, 8, 12, 16)
- Use elevation (shadows) sparingly - primarily for cards and modals
- All blockchain-related text (hashes, addresses) in monospace font
- Status changes should be immediately visible with clear visual feedback
- Forms must show validation state before blockchain submission
- Every blockchain transaction should show estimated/actual gas cost for transparency