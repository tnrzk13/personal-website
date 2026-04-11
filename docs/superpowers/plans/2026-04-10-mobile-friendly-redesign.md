# Mobile-Friendly Career & Projects Redesign - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut mobile scroll length in career/project sections by replacing techstack pills with inline text, reordering card content for achievements-first hierarchy, and replacing the project carousel with stacked compact cards.

**Architecture:** Modify the shared `Techstack.svelte` component from pills to dot-separated inline text (affects all 5 consumers site-wide). Reorder career cards to show achievements before tech. Add techstack to compact career cards. Remove the project carousel entirely and replace with a single-column compact layout on narrow viewports (<640px), keeping two-column tier-based layout on wider screens.

**Tech Stack:** Svelte 5 (runes), SCSS, CSS media queries, `window.matchMedia` for project layout switching.

**Spec:** `docs/superpowers/specs/2026-04-10-mobile-friendly-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/Misc/Techstack.svelte` | Modify | Replace pill markup/CSS with dot-separated inline text |
| `src/components/Cards/CardCareer.svelte` | Modify | Move techstack below bullets; hide 2nd visible bullet on phone |
| `src/components/Cards/CardCareerCompact.svelte` | Modify | Add `techstack` prop, import and render Techstack |
| `src/components/03-Career.svelte` | Modify | Pass `techstack` to compact cards; change breakpoint 992px to 639px |
| `src/components/04-Projects.svelte` | Modify | Delete carousel; add local 640px reactive check; narrow branch renders all as CardProjectCompact in single column |

No new files created.

---

### Task 1: Techstack pills to inline text

**Files:**
- Modify: `src/components/Misc/Techstack.svelte` (entire file)

This is the foundation change. Every consumer of this component (CardCareer, CardCareerCompact, CardProject, CardProjectCompact, AboutMe) gets inline text automatically.

- [ ] **Step 1: Replace the template markup**

Replace the entire `<span class="techstack-container">` block (lines 4-8) with dot-separated inline text. Keep the outer class name `techstack-container` because `CardProjectCompact.svelte:217` targets it via `:global(.techstack-container)`.

```svelte
<span class="techstack-container">
  {#each techstack as tech, i}{#if i > 0}<span class="sep"> &middot; </span>{/if}{tech}{/each}
</span>
```

The `{#each}` is deliberately on one line to avoid whitespace between items. The `&middot;` renders as a centered dot (·).

- [ ] **Step 2: Replace the CSS**

Replace the entire `<style>` block (lines 11-43) with inline text styling. Remove all pill CSS (border, border-radius, padding, background, hover effects).

```scss
.techstack-container {
  display: block;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;

  .sep {
    margin: 0 0.15em;
    opacity: 0.6;
  }
}
```

Key decisions:
- `margin-top: 1.25rem` preserved from the original (consumers that need different spacing override via `:global()`)
- `color: rgba(255, 255, 255, 0.45)` - muted text, less prominent than content
- No hover effects - inline text doesn't need interactivity

- [ ] **Step 3: Verify build**

Run: `npm run check`
Expected: Clean build, no errors. All 5 consumers now render inline text instead of pills.

- [ ] **Step 4: Commit**

```bash
git add src/components/Misc/Techstack.svelte
git commit -m "Replace techstack pills with inline dot-separated text"
```

---

### Task 2: Career featured cards - achievements-first reorder + phone bullet limit

**Files:**
- Modify: `src/components/Cards/CardCareer.svelte:46-58,136-180`

Two changes: (a) move techstack below bullets so hiring managers see achievements first, (b) hide the 2nd visible bullet on phone (<640px) via CSS.

- [ ] **Step 1: Move techstack-wrapper below the bullets section**

In the template (lines 46-58), the current order inside `.card-body` is:

```
techstack-wrapper  (line 47-49)
BulletList         (line 50)
extra-bullets      (line 51-57)
```

Reorder to:

```
BulletList         (visible bullets)
extra-bullets      (expandable bullets)
techstack-wrapper  (techstack, now last)
```

The new `.card-body` block should be:

```svelte
    <div class="card-body">
      <BulletList points={visiblePoints} />
      {#if hasExtra}
        <div class="extra-bullets" class:open={expandable.expanded}>
          <div class="extra-list">
            <BulletList points={extraPoints} />
          </div>
        </div>
      {/if}
      <div class="techstack-wrapper">
        <Techstack {techstack} />
      </div>
    </div>
```

- [ ] **Step 2: Delete the `.techstack-wrapper` CSS rule**

Currently `.techstack-wrapper` (lines 178-180) has `margin-bottom: 1.25rem` because it sat above the bullets. Now it sits below them and the `Techstack` component's built-in `margin-top: 1.25rem` provides sufficient spacing from the bullets above.

Delete the entire `.techstack-wrapper` rule (lines 178-180):

```scss
    // DELETE these lines:
    .techstack-wrapper {
      margin-bottom: 1.25rem;
    }
```

Keep the `<div class="techstack-wrapper">` in the template for semantic clarity - it just won't have any styling.

- [ ] **Step 3: Add CSS to hide 2nd visible bullet on phone**

Add a media query inside the `.card-body` rule (after line 138) to hide the second `<li>` of the direct-child `.bullet-list` on narrow screens. The direct-child combinator ensures only the visible BulletList is affected, not the extra-bullets list inside `.extra-list`.

```scss
    .card-body {
      text-align: left;
      padding: 0;

      @media (max-width: 639px) {
        > :global(.bullet-list li:nth-child(2)) {
          display: none;
        }
      }
    }
```

This hides the second visible bullet on phones. The first BulletList (`visiblePoints`) is a direct child of `.card-body`. The extra BulletList is nested inside `.extra-list` and won't match the `>` combinator.

- [ ] **Step 4: Verify build**

Run: `npm run check`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Cards/CardCareer.svelte
git commit -m "Reorder career cards to achievements-first, limit to 1 bullet on phone"
```

---

### Task 3: Add techstack to compact career cards

**Files:**
- Modify: `src/components/Cards/CardCareerCompact.svelte:1-11,42-53,58-170`

Compact career cards currently don't show techstack. Add the prop, import, and render below the bullets.

- [ ] **Step 1: Add Techstack import and prop**

In the `<script>` block (lines 1-11), add the import and the `techstack` prop:

```svelte
<script>
  import GlassCard from "./GlassCard.svelte";
  import BulletList from "../Misc/BulletList.svelte";
  import Techstack from "../Misc/Techstack.svelte";
  import ChevronIcon from "../Icons/ChevronIcon.svelte";
  import { createExpandable } from "../../utils/expandable.svelte";

  let { imgBase, title, subtitle, datePeriod, points, logoColor, techstack, revealDelayMs = 0 } = $props();

  const hasExtra = points.length > 1;
  const expandable = createExpandable(hasExtra);
</script>
```

Changes from original: added `import Techstack` (line 4) and added `techstack` to the destructured props (line 8).

- [ ] **Step 2: Add Techstack rendering in the template**

Insert `<Techstack {techstack} />` after the `extra-bullets` block and before `</button>`. The placement is after line 53 (closing `{/if}` of extra-bullets), before line 54 (`</button>`):

```svelte
      {#if hasExtra}
        <div class="extra-bullets" class:open={expandable.expanded}>
          <div class="extra-list">
            <BulletList points={points.slice(1)} />
          </div>
        </div>
      {/if}
      <Techstack {techstack} />
    </button>
```

- [ ] **Step 3: Add CSS override for techstack spacing in compact cards**

The `Techstack` component has `margin-top: 1.25rem` by default, which is slightly too much for compact cards. Add a `:global()` override inside the `.compact-content` rule (after line 77, before the closing `}`):

```scss
  .compact-content {
    padding: 1rem;
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;

    @media (hover: none) {
      &.expandable {
        cursor: pointer;
      }
    }

    :global(.techstack-container) {
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
  }
```

- [ ] **Step 4: Verify build**

Run: `npm run check`
Expected: Build fails with a type error because `03-Career.svelte` doesn't pass `techstack` to `CardCompact` yet. That's expected - Task 4 fixes it. Verify the error is specifically about the missing prop, nothing else.

If the build doesn't fail (because `techstack` has no default and Svelte 5 doesn't enforce required props at build time), that's also fine - just confirm no other errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Cards/CardCareerCompact.svelte
git commit -m "Add techstack display to compact career cards"
```

---

### Task 4: Career section - pass techstack to compact cards + breakpoint change

**Files:**
- Modify: `src/components/03-Career.svelte:12-19,72-80`

Two changes: (a) pass `techstack` prop to compact cards, (b) change column-collapse breakpoint from 992px to 639px.

- [ ] **Step 1: Pass techstack to CardCompact in the renderCard snippet**

In the `renderCard` snippet (lines 12-19), the compact card rendering on line 17 is missing `techstack`. Add it:

```svelte
{#snippet renderCard(card, unifiedIndex)}
  {@const revealDelayMs = unifiedIndex * 60 + 50}
  {#if card.tier === "featured"}
    <Card imgBase={card.imgBase} title={card.title} subtitle={card.subtitle} datePeriod={card.datePeriod} techstack={card.techstack} points={card.points} logoColor={card.logoColor} {revealDelayMs} />
  {:else}
    <CardCompact imgBase={card.imgBase} title={card.title} subtitle={card.subtitle} datePeriod={card.datePeriod} techstack={card.techstack} points={card.points} logoColor={card.logoColor} {revealDelayMs} />
  {/if}
{/snippet}
```

The only change is adding `techstack={card.techstack}` on the `CardCompact` line. All career data entries in `src/data/career.ts` already have `techstack` arrays.

- [ ] **Step 2: Change column-collapse breakpoint from 992px to 639px**

In the CSS (line 72), change the media query:

```scss
    @media (max-width: 639px) {
      .card-columns {
        flex-direction: column;
      }

      .card-column {
        display: contents;
      }
    }
```

This means two columns on viewports >= 640px (tablets), single column below 640px (phones).

- [ ] **Step 3: Verify build**

Run: `npm run check`
Expected: Clean build, no errors. Compact career cards now show techstack, and career layout collapses to single column at 639px instead of 992px.

- [ ] **Step 4: Commit**

```bash
git add src/components/03-Career.svelte
git commit -m "Pass techstack to compact career cards, collapse to single column at 639px"
```

---

### Task 5: Project section - remove carousel, add compact phone layout

**Files:**
- Modify: `src/components/04-Projects.svelte` (extensive changes across script, template, and CSS)

The biggest task. Remove the entire carousel system and replace the mobile branch with stacked `CardProjectCompact` cards in a single column on narrow viewports (<640px).

- [ ] **Step 1: Replace the script block**

Replace the entire `<script>` block (lines 1-67) with a cleaned-up version that removes carousel state/functions/effects, removes the `isMobile` import, and adds a local 640px reactive check.

```svelte
<script>
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import CardProjectCompact from "./Cards/CardProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { balanceColumns } from "../utils/balanceColumns";

  const ALL_TAG = "All";
  const COMPACT_BREAKPOINT_PX = 640;
  const WEIGHT = { featured: 3, compact: 1 };
  const tags = [ALL_TAG, ...new Set(projList.flatMap((p) => p.tags))];

  let activeTag = $state(ALL_TAG);
  let isNarrow = $state(window.innerWidth < COMPACT_BREAKPOINT_PX);

  const filteredProjects = $derived(
    activeTag === ALL_TAG ? projList : projList.filter((p) => p.tags.includes(activeTag))
  );

  const columns = $derived.by(() => balanceColumns(filteredProjects, WEIGHT));

  $effect(() => {
    const mql = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT_PX - 1}px)`);
    const onChange = (e) => { isNarrow = e.matches; };
    mql.addEventListener("change", onChange);
    isNarrow = mql.matches;
    return () => mql.removeEventListener("change", onChange);
  });
</script>
```

What's removed:
- `isMobile` import (line 6)
- `activeSlide`, `carouselEl`, `carouselHeightPx` state (lines 14-16)
- `updateCarouselHeight()`, `getSlideStepPx()`, `handleScroll()`, `scrollToSlide()` functions (lines 24-50)
- Both `$effect` blocks for carousel management (lines 52-66)

What's added:
- `COMPACT_BREAKPOINT_PX = 640` constant
- `isNarrow` reactive state with `matchMedia` effect
- The `matchMedia` approach is cleaner than `resize` listener and matches how modern responsive JS works

- [ ] **Step 2: Replace the template layout branches**

Replace the `{#if isMobile.value}` block (lines 104-148) with the new narrow/wide branches. The `renderProject` snippet (lines 87-102) stays unchanged - it's used by the wide branch.

```svelte
  {#if isNarrow}
    <div class="compact-stack content-width">
      {#each filteredProjects as proj (proj.title)}
        {@const revealDelayMs = 250 + (proj.sortedIndex + 1) * 60}
        <CardProjectCompact
          title={proj.title}
          imgBase={proj.imgBase}
          urls={proj.urls}
          text={proj.text}
          details={proj.details}
          techstack={proj.techstack}
          {revealDelayMs}
        />
      {/each}
    </div>
  {:else}
    <div class="project-columns content-width">
      <div class="project-column">
        {#each columns.left as proj (proj.title)}
          <div class="project-slot" style="order: {proj.sortedIndex}">
            {@render renderProject(proj)}
          </div>
        {/each}
      </div>
      <div class="project-column">
        {#each columns.right as proj (proj.title)}
          <div class="project-slot" style="order: {proj.sortedIndex}">
            {@render renderProject(proj)}
          </div>
        {/each}
      </div>
    </div>
  {/if}
```

Key differences from current:
- `{#if isMobile.value}` becomes `{#if isNarrow}`
- Carousel markup replaced with `.compact-stack` div containing `CardProjectCompact` for ALL projects (regardless of tier)
- Wide branch is unchanged (two columns with `renderProject` snippet)

- [ ] **Step 3: Replace the CSS**

Replace the entire `<style>` block (lines 151-260) with cleaned-up CSS that removes all carousel rules and adds `.compact-stack` styling.

```scss
  #projects {
    border: 1px solid transparent;

    :global(h2.section-title) {
      background-image: var(--gradient-relaxing-red);
    }

    .description {
      margin-bottom: 2em;
    }

    .filter-tabs {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 2.5em;
    }

    .filter-tab {
      font-family: "Inter", system-ui, sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      padding: 0.45em 1.5em;
      border-radius: 999px;
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      background: transparent;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;

      &:hover {
        color: white;
        border-color: rgba(255, 255, 255, 0.4);
      }

      &.active {
        color: white;
        border-color: rgba(100, 172, 255, 0.7);
        background: rgba(100, 172, 255, 0.15);
      }
    }

    .compact-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .project-columns {
      display: flex;
      gap: 1.5rem;
    }

    .project-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      min-width: 0;
    }
  }
```

What's removed:
- `.carousel-container` (lines 207-212)
- `.carousel` (lines 214-230)
- `.carousel-slide` (lines 232-235)
- `.carousel-dots` (lines 237-242)
- `.dot` (lines 244-258)

What's added:
- `.compact-stack` - simple flex column with gap for the narrow layout

- [ ] **Step 4: Verify build**

Run: `npm run check`
Expected: Clean build, no errors. The carousel is gone, replaced by compact cards on narrow viewports.

- [ ] **Step 5: Commit**

```bash
git add src/components/04-Projects.svelte
git commit -m "Replace project carousel with stacked compact cards on narrow viewports"
```

---

### Task 6: Visual verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server if not running**

Check if port 5173 is in use: `lsof -i :5173 -t`

If not running: `npm run dev`

- [ ] **Step 2: Desktop screenshot**

Navigate to `http://localhost:5173`, emulate viewport `1440x900x1`, take screenshot. Verify:
- Career section: two columns, techstack appears below bullets (not above), inline dot-separated text (no pills)
- Project section: two columns, featured projects use large format, compact use thumbnail format
- About Me section: techstack shows as inline text
- No carousel dots visible anywhere

- [ ] **Step 3: Mobile screenshot**

Emulate viewport `375x812x1,mobile,touch`, take screenshot. Verify:
- Career section: single column, featured cards show 1 bullet (2nd hidden), compact cards show techstack
- Project section: single column, ALL projects use compact format (thumbnail + text), no carousel
- Techstack everywhere is inline dot-separated text

- [ ] **Step 4: Tablet screenshot**

Emulate viewport `768x1024x1`, take screenshot. Verify:
- Career section: two columns (breakpoint is 639px, 768px is above it)
- Project section: two columns with tier-based rendering
- Both sections look balanced

- [ ] **Step 5: Console check**

Run `list_console_messages` to verify no runtime errors.
