# Mobile-Friendly Career & Projects Redesign

## Problem

The career section takes ~3.7 screens of scrolling on mobile (8 cards in a single column with full-sized collapsed states). The project section uses a carousel that hides content behind swipes with low discoverability. Both sections use techstack pills that take more vertical space than the information warrants.

## Goals

1. Cut career section mobile scroll length from ~3.7 screens to ~1.7 screens
2. Replace the project carousel with a scannable stacked layout
3. Unify techstack display as inline text site-wide
4. Preserve two-column layouts on viewports wide enough to support them

## Design

### 1. Techstack Component: Pills to Inline

**Scope**: Site-wide. Every consumer of `Techstack.svelte` gets the change.

**Change**: Replace pill containers (bordered, padded, rounded spans) with dot-separated inline text in a muted color.

Before:
```
[React] [TypeScript] [Firebase] [Vite] [Typesense]
```

After:
```
React · TypeScript · Firebase · Vite · Typesense
```

**Consumers affected**:
- `CardCareer.svelte` - featured career cards
- `CardCareerCompact.svelte` - compact career cards (techstack must be ADDED here; currently missing)
- `CardProject.svelte` - featured project text
- `CardProjectCompact.svelte` - compact project cards
- `02-AboutMe.svelte` - About Me section

**Content reorder in career cards**: Techstack moves from above bullets to below bullets. This changes the scan order from "header -> tech -> achievements" to "header -> achievements -> tech" - a stronger narrative for hiring managers.

**No content reorder in project cards**: Techstack stays below the summary text (its current position). Project summaries are short (1-2 sentences), so there's no "speed bump" problem.

### 2. Career Section Breakpoints

| Viewport | Width | Layout |
|----------|-------|--------|
| Phone | < 640px | Single column. Featured cards show 1 bullet (not 2) in collapsed state. All 8 cards visible. |
| Tablet+ | >= 640px | Two columns via `balanceColumns()`. Featured show 2 bullets, compact show 1. Current desktop behavior. |

**Key changes**:
- Column-collapse CSS media query moves from `max-width: 992px` to `max-width: 639px`
- Featured cards reduce visible bullets from 2 to 1 on phone: render both bullets as normal, use a CSS media query (`max-width: 639px`) to hide the second visible bullet. No JS needed.
- No progressive disclosure - all cards shown. Compact format alone reduces scroll from ~3.7 to ~1.7 screens.

### 3. Project Section Breakpoints

| Viewport | Width | Layout |
|----------|-------|--------|
| Phone | < 640px | Single column. ALL projects use compact format (`CardProjectCompact`) regardless of tier. |
| Tablet+ | >= 640px | Two columns. Featured projects keep large format (`ProjectCompact`), compact keep thumbnail format. |

**Key changes**:
- **Remove the carousel entirely**: Delete `activeSlide`, `carouselEl`, `carouselHeightPx` state, scroll/height/slide handler functions, the `$effect` blocks for carousel management, and all carousel CSS.
- **Replace `isMobile` with a project-local reactive check at 640px** (or change `SM_SCREEN_PX` globally from 768 to 640 if all other consumers - About Me, Navbar, AmbientOrbs - work at that breakpoint). Switching between `ProjectCompact` and `CardProjectCompact` requires JS since they are different Svelte components; pure CSS cannot toggle between them. The `{#if}` branch stays, but switches from carousel/columns to compact-cards/columns.
- Filter tabs remain unchanged.
- No progressive disclosure.

### 4. Files Changed

**Modified**:
- `src/components/Misc/Techstack.svelte` - Pills to inline dot-separated text
- `src/components/Cards/CardCareer.svelte` - Move techstack below bullets, phone-only 1-bullet limit
- `src/components/Cards/CardCareerCompact.svelte` - Add techstack prop and inline rendering
- `src/components/Cards/CardProject.svelte` - Inherits inline techstack from component change (no code change needed unless reordering)
- `src/components/Cards/CardProjectCompact.svelte` - Inherits inline techstack from component change (no code change needed unless reordering)
- `src/components/03-Career.svelte` - Change column-collapse breakpoint from 992px to 639px
- `src/components/04-Projects.svelte` - Remove carousel, replace `isMobile` branch (carousel vs columns) with new branch (compact cards vs columns), add CSS column-collapse at 639px
- `src/utils/breakpoints.ts` - Potentially change `SM_SCREEN_PX` from 768 to 640 (or add a second breakpoint constant)
- `src/components/02-AboutMe.svelte` - No code change needed (inherits inline from component change)

**No new files created**.

### 5. What Gets Deleted

- Carousel state and logic in `04-Projects.svelte`: `activeSlide`, `carouselEl`, `carouselHeightPx`, `updateCarouselHeight()`, `getSlideStepPx()`, `handleScroll()`, `scrollToSlide()`, both `$effect` blocks for carousel
- Carousel CSS in `04-Projects.svelte`: `.carousel-container`, `.carousel`, `.carousel-slide`, `.carousel-dots`, `.dot`
- `isMobile` import from `04-Projects.svelte`
- Pill CSS in `Techstack.svelte`: border, border-radius, padding, background, hover effects

### 6. Out of Scope

- Other sections (Title, Contact, navigation)
- Desktop layout changes beyond techstack reorder
- Data model or type changes
- New components or dependencies
