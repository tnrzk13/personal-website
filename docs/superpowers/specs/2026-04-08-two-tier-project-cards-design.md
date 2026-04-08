# Two-Tier Project Cards with Expandable Content

## Problem

The projects section occupies 2,532px (2.8 viewports, 36.6% of total page height). All 8 projects use the same full-size card layout with large screenshots, creating excessive scrolling.

## Solution

Split projects into two visual tiers - featured (full cards) and compact (side-thumbnail cards) - mirroring the career section's two-tier pattern. Add hover-to-expand behavior to all cards for revealing additional content.

## Data Model Changes

### `ProjectData` type (`src/types/index.ts`)

Add two fields:

```typescript
tier: "featured" | "compact"  // determines card layout
oneliner: string               // brief description for compact collapsed state
```

### Project assignments (`src/data/projects.ts`)

**Featured (3):**
- Pneumonia Detection
- Voice Dictation
- YouTube Audio Chunker

**Compact (5):**
- SoulDog
- Time Series Forecasting
- This Website!
- Chess
- Wumpus World

Add `tier` and `oneliner` fields to each project entry.

## Component Changes

### New: `CardProjectCompact.svelte`

Compact card with side-thumbnail layout:

**Collapsed state:**
- Side thumbnail (~140px wide, landscape aspect ratio) on the left
- Title + link icons on the right
- One-liner description (from `oneliner` field)
- Tech tags
- Chevron hint at bottom

**Expanded state (hover/tap):**
- Slides open below the card row to reveal full description text
- Expanded content placeholder for future in-depth content (deferred)

**Interaction:**
- Desktop: `mouseenter`/`mouseleave` to expand/collapse
- Mobile (no hover): `onclick` toggle
- Detect capability with `window.matchMedia("(hover: hover)")`

### Modified: `CardProject.svelte`

Add expandable section to existing featured card:

**Collapsed state:** Unchanged (screenshot on top, title, links, description, tech tags)

**Expanded state (hover/tap):**
- Slides open below tech tags to reveal expanded content placeholder (deferred)
- Chevron hint at bottom

Same hover/click interaction pattern as compact cards.

### Modified: `ProjectCompact.svelte` (container component)

**Desktop layout:**
- Both tiers flow in the same 2-column grid with no visual separator
- Featured cards appear first, compact cards follow
- Column balancing uses the same weighted algorithm as career section
  - Featured cards get higher weight than compact cards

**Mobile layout:**
- Single carousel mixing both card types
- Both featured and compact cards render in the same carousel format (current card style)
- Expand via tap

**Filtering:**
- Filter tabs (All/ML/Systems/Web) filter across both tiers
- A filtered view may show a mix of featured and compact cards

## Expand/Collapse Mechanism

Reuse the career section pattern from `CardCareerCompact.svelte`:

- CSS: `grid-template-rows: 0fr` collapsed, `1fr` expanded
- Transition: `0.35s ease`
- Chevron: rotates 180deg when expanded
- State: Svelte `$state(false)` for expanded boolean
- Wrapper: `<button>` element for accessibility with `aria-expanded`

## Deferred

- The actual expanded content for both tiers (placeholder for now - show existing description text or a generic message)
- In-depth project descriptions will be authored separately

## Files Changed

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `tier` and `oneliner` to `ProjectData` |
| `src/data/projects.ts` | Add `tier` and `oneliner` values to all projects |
| `src/components/Cards/CardProjectCompact.svelte` | New component |
| `src/components/Cards/CardProject.svelte` | Add expand/collapse section |
| `src/components/04-Projects/ProjectCompact.svelte` | Two-tier grid layout, weighted columns |
