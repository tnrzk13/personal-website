# Two-Tier Project Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split projects into featured (full cards) and compact (side-thumbnail) tiers on desktop to reduce vertical footprint, and add hover-to-expand behavior to all cards.

**Architecture:** Add `tier` and `oneliner` fields to `ProjectData`. Create a new `CardProjectCompact.svelte` for the compact layout. Add expand/collapse to both card types using the same `grid-template-rows` pattern as career cards. Modify `04-Projects.svelte` to render a weighted two-column layout on desktop (like career section) while keeping the mobile carousel unchanged.

**Tech Stack:** Svelte 5, TypeScript, SCSS

**Spec:** `docs/superpowers/specs/2026-04-08-two-tier-project-cards-design.md`

---

### Task 1: Update data model and project data

**Files:**
- Modify: `src/types/index.ts:22-31`
- Modify: `src/data/projects.ts`
- Modify: `src/data/data.test.ts:36-52`

- [ ] **Step 1: Write failing tests for new fields**

Add tests to `src/data/data.test.ts` that verify the new `tier` and `oneliner` fields exist on every project:

```typescript
it("each entry has a valid tier", () => {
  for (const proj of projList) {
    expect(["featured", "compact"]).toContain(proj.tier);
  }
});

it("each compact entry has a oneliner", () => {
  for (const proj of projList) {
    if (proj.tier === "compact") {
      expect(proj.oneliner).toBeTruthy();
    }
  }
});
```

Add these two tests inside the existing `describe("projList (project data)")` block, after the existing tests.

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd /home/tony/Documents/Playground/personal-website && npx vitest run data`
Expected: FAIL - `tier` property is undefined on project entries.

- [ ] **Step 3: Update ProjectData type**

In `src/types/index.ts`, replace the `ProjectData` interface:

```typescript
export interface ProjectData {
  title: string;
  imgBase: string;
  videoUrl?: string;
  urls: ProjectUrls;
  text: string;
  techstack: string[];
  tags: string[];
  tier: "featured" | "compact";
  oneliner: string;
}
```

This removes the old `featured?: boolean` field and adds `tier` and `oneliner`.

- [ ] **Step 4: Update project data entries**

In `src/data/projects.ts`, update each project entry. Replace `featured: true` with `tier: "featured"` and add `oneliner` to all entries. For projects without the old `featured` field, add `tier: "compact"`.

Featured projects (replace `featured: true` with `tier` and add `oneliner`):

```
Pneumonia Detection:
  tier: "featured",
  oneliner: "Deep learning X-ray diagnosis model",

Voice Dictation:
  tier: "featured",
  oneliner: "Real-time Linux voice transcription tool",

YouTube Audio Chunker:
  tier: "featured",
  oneliner: "Desktop app for Garmin audio sideloading",
```

Compact projects (add `tier` and `oneliner`):

```
SoulDog:
  tier: "compact",
  oneliner: "Full-stack dog adoption webapp",

Time Series Forecasting:
  tier: "compact",
  oneliner: "Air passenger volume prediction",

This Website!:
  tier: "compact",
  oneliner: "Svelte portfolio site built from scratch",

Chess:
  tier: "compact",
  oneliner: "Full chess engine with Stockfish AI",

Wumpus World:
  tier: "compact",
  oneliner: "Reinforcement learning RPG solver",
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd /home/tony/Documents/Playground/personal-website && npx vitest run data`
Expected: All tests PASS.

- [ ] **Step 6: Run full check**

Run: `cd /home/tony/Documents/Playground/personal-website && npm run check`
Expected: PASS. If any component references the old `featured` field, it will fail here - note which files need updating.

- [ ] **Step 7: Commit**

```bash
git add src/types/index.ts src/data/projects.ts src/data/data.test.ts
git commit -m "Add tier and oneliner fields to ProjectData, remove featured flag"
```

---

### Task 2: Add expand/collapse to featured cards (CardProject + ProjectCompact)

**Files:**
- Modify: `src/components/Cards/CardProject.svelte`
- Modify: `src/components/04-Projects/ProjectCompact.svelte`

The expand/collapse needs to wrap the entire card content (including the image) so it can be triggered from anywhere on the card. The `ProjectCompact` component wraps `CardProject` inside a `GlassCard`, so the expand interaction goes on `ProjectCompact` as a `<button>` wrapper, and `CardProject` gets a new expandable section slot.

- [ ] **Step 1: Add expand/collapse to CardProject**

In `src/components/Cards/CardProject.svelte`, add a chevron and an expandable extra section. The expanded content is a placeholder for now (will be authored later).

Replace the entire file with:

```svelte
<script>
  let { title, urls, text, techstack, expanded = false } = $props();
  import Techstack from "../Misc/Techstack.svelte";
  import IconLink from "../Icons/IconLink.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";
</script>

<div class="project-card-wrapper">
  <div class="project-card">
    <div class="card-body">
      {#if urls.projectUrl || urls.codeUrl}
        <span class="title-row">
          {#if urls.projectUrl}
            <a href={urls.projectUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} project">
              <h3 class="title">
                {title}
                <IconLink />
              </h3>
            </a>
          {:else}
            <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code">
              <h3 class="title">
                {title}
              </h3>
            </a>
          {/if}
          {#if urls.codeUrl}
            <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code on GitHub" class="github-link">
              <span class="title">
                <IconGitHub />
              </span>
            </a>
          {/if}
        </span>
      {:else}
        <h3 class="title">{title}</h3>
      {/if}
      <p class="text">{@html text}</p>
      <Techstack {techstack} />
    </div>
    <div class="extra-content" class:open={expanded}>
      <div class="extra-inner">
        <!-- Expanded content placeholder - will be authored later -->
      </div>
    </div>
    <div class="chevron-row">
      <svg class="chevron" class:open={expanded} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</div>

<style lang="scss">
  .project-card-wrapper {
    padding: 0;

    .project-card {
      color: white;
      border-radius: 1rem;
      background-color: transparent;
      border: none;
      margin: 0.5rem;
      text-align: center;
    }

    .card-body {
      text-align: left;
      padding: 1em 1em;

      a {
        text-decoration: none;
        color: #64acff;
      }
      a:hover {
        filter: brightness(75%);
      }

      :global(svg) {
        width: 0.8em;
        height: 0.8em;
        vertical-align: -0.125em;
      }

      h3, span.title {
        font-family: "Montserrat", sans-serif;
        font-size: 1.5rem;
        padding: 1.5rem 0 0.5rem 0;
        display: inline;
      }

      .text {
        margin-top: 1.5em;

        :global(strong) {
          color: var(--bold-highlight);
          font-weight: 600;
        }
      }

      .title-row {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
      }
    }

    .extra-content {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s ease;

      &.open {
        grid-template-rows: 1fr;
      }
    }

    .extra-inner {
      overflow: hidden;
      padding: 0 1em;
    }

    .chevron-row {
      display: flex;
      justify-content: center;
      padding: 0.25rem 0 0.5rem;
    }

    .chevron {
      color: rgba(255, 255, 255, 0.25);
      transition: transform 0.3s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
```

- [ ] **Step 2: Add expand interaction to ProjectCompact**

In `src/components/04-Projects/ProjectCompact.svelte`, add the hover/click expand logic. The `ProjectCompact` wraps everything in a `GlassCard` and handles the image, so it's the right place for the interaction wrapper.

Replace the entire file with:

```svelte
<script lang="ts">
  import CardProject from "../Cards/CardProject.svelte";
  import GlassCard from "../Cards/GlassCard.svelte";
  import { lazyPlayback } from "../../actions/lazyPlayback";
  import type { ProjectData } from "../../types";

  let { projectInfo, revealDelayMs = 0 }: { projectInfo: ProjectData; revealDelayMs?: number } = $props();

  let expanded = $state(false);
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
</script>

<div class="compact-project reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="expand-trigger"
      onclick={() => { if (!canHover) expanded = !expanded; }}
      onmouseenter={() => { if (canHover) expanded = true; }}
      onmouseleave={() => { if (canHover) expanded = false; }}
      aria-expanded={expanded}
      type="button"
    >
      <div class="compact-img-container">
        {#snippet media()}
          {#if projectInfo.videoUrl}
            <video
              src={projectInfo.videoUrl}
              poster="{projectInfo.imgBase}.avif"
              preload="none"
              muted
              loop
              playsinline
              use:lazyPlayback
            ></video>
          {:else}
            <picture>
              <source srcset="{projectInfo.imgBase}.avif" type="image/avif">
              <img src="{projectInfo.imgBase}.png" alt={projectInfo.title} loading="lazy" />
            </picture>
          {/if}
        {/snippet}

        {#if projectInfo.urls.projectUrl || projectInfo.urls.codeUrl}
          <a href={projectInfo.urls.projectUrl || projectInfo.urls.codeUrl} target="_blank" rel="noopener noreferrer">
            {@render media()}
          </a>
        {:else}
          {@render media()}
        {/if}
      </div>
      <CardProject
        title={projectInfo.title}
        urls={projectInfo.urls}
        text={projectInfo.text}
        techstack={projectInfo.techstack}
        {expanded}
      />
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .compact-project {
    height: 100%;
  }

  .expand-trigger {
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;
    padding: 0;

    @media (hover: none) {
      cursor: pointer;
    }
  }

  .compact-img-container {
    width: 100%;

    a {
      display: block;
    }

    img, video {
      width: 100%;
      display: block;
      border-radius: 1rem 1rem 0 0;
    }
  }
</style>
```

- [ ] **Step 3: Run check**

Run: `cd /home/tony/Documents/Playground/personal-website && npm run check`
Expected: PASS. The build should succeed since we only added new props and kept existing ones.

- [ ] **Step 4: Commit**

```bash
git add src/components/Cards/CardProject.svelte src/components/04-Projects/ProjectCompact.svelte
git commit -m "Add expand/collapse to featured project cards"
```

---

### Task 3: Create CardProjectCompact component

**Files:**
- Create: `src/components/Cards/CardProjectCompact.svelte`

This is the compact card with side-thumbnail layout: small landscape image on the left, title + oneliner + tech tags on the right, expandable description below.

- [ ] **Step 1: Create CardProjectCompact.svelte**

Create `src/components/Cards/CardProjectCompact.svelte`:

```svelte
<script lang="ts">
  import GlassCard from "./GlassCard.svelte";
  import Techstack from "../Misc/Techstack.svelte";
  import IconLink from "../Icons/IconLink.svelte";
  import IconGitHub from "../Icons/IconGitHub.svelte";
  import type { ProjectUrls } from "../../types";

  let {
    title,
    imgBase,
    oneliner,
    urls,
    text,
    techstack,
    revealDelayMs = 0,
  }: {
    title: string;
    imgBase: string;
    oneliner: string;
    urls: ProjectUrls;
    text: string;
    techstack: string[];
    revealDelayMs?: number;
  } = $props();

  let expanded = $state(false);
  const canHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
</script>

<div class="compact-project reveal" style="transition-delay: {revealDelayMs}ms">
  <GlassCard>
    <button
      class="compact-content"
      onclick={() => { if (!canHover) expanded = !expanded; }}
      onmouseenter={() => { if (canHover) expanded = true; }}
      onmouseleave={() => { if (canHover) expanded = false; }}
      aria-expanded={expanded}
      type="button"
    >
      <div class="compact-row">
        <div class="compact-thumb">
          <picture>
            <source srcset="{imgBase}.avif" type="image/avif">
            <img src="{imgBase}.png" alt={title} loading="lazy" />
          </picture>
        </div>
        <div class="compact-body">
          <div class="compact-title-row">
            {#if urls.projectUrl}
              <a href={urls.projectUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} project">
                <h3 class="compact-title">{title} <IconLink /></h3>
              </a>
            {:else if urls.codeUrl}
              <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code">
                <h3 class="compact-title">{title}</h3>
              </a>
            {:else}
              <h3 class="compact-title">{title}</h3>
            {/if}
            {#if urls.codeUrl}
              <a href={urls.codeUrl} target="_blank" rel="noopener noreferrer" aria-label="View {title} source code on GitHub" class="github-link">
                <IconGitHub />
              </a>
            {/if}
          </div>
          <p class="compact-oneliner">{oneliner}</p>
          <Techstack {techstack} />
        </div>
        <svg class="chevron" class:open={expanded} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="extra-content" class:open={expanded}>
        <div class="extra-inner">
          <p class="expanded-text">{@html text}</p>
        </div>
      </div>
    </button>
  </GlassCard>
</div>

<style lang="scss">
  .compact-project {
    color: white;
  }

  .compact-content {
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: default;
    padding: 0;

    @media (hover: none) {
      cursor: pointer;
    }
  }

  .compact-row {
    display: flex;
    align-items: flex-start;
    gap: 0;
  }

  .compact-thumb {
    width: 140px;
    min-width: 140px;
    overflow: hidden;
    border-radius: 1rem 0 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .compact-body {
    flex: 1;
    min-width: 0;
    padding: 0.875rem 1rem;

    :global(.techstack-container) {
      margin-top: 0.75rem;
    }
  }

  .compact-title-row {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    a {
      text-decoration: none;
      color: #64acff;

      &:hover {
        filter: brightness(75%);
      }
    }

    :global(svg) {
      width: 0.7em;
      height: 0.7em;
      vertical-align: -0.1em;
    }
  }

  .compact-title {
    font-family: "Montserrat", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    display: inline;
  }

  .github-link {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;

    &:hover {
      color: white;
    }

    :global(svg) {
      width: 1em;
      height: 1em;
    }
  }

  .compact-oneliner {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0.35rem 0 0 0;
    line-height: 1.3;
  }

  .chevron {
    color: rgba(255, 255, 255, 0.25);
    transition: transform 0.3s ease;
    flex-shrink: 0;
    align-self: center;
    margin: 0 0.75rem;

    &.open {
      transform: rotate(180deg);
    }
  }

  .extra-content {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.35s ease;

    &.open {
      grid-template-rows: 1fr;
    }
  }

  .extra-inner {
    overflow: hidden;
  }

  .expanded-text {
    padding: 0.75rem 1rem 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.5;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    :global(strong) {
      color: var(--bold-highlight);
      font-weight: 600;
    }
  }
</style>
```

- [ ] **Step 2: Run check**

Run: `cd /home/tony/Documents/Playground/personal-website && npm run check`
Expected: PASS. The component isn't imported anywhere yet, but it should compile without errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Cards/CardProjectCompact.svelte
git commit -m "Create CardProjectCompact component with side-thumbnail layout"
```

---

### Task 4: Update 04-Projects.svelte for two-tier desktop layout

**Files:**
- Modify: `src/components/04-Projects.svelte`

Replace the simple 2-column grid with the career section's weighted column balancing. On desktop, featured projects render via `ProjectCompact` (existing) and compact projects render via `CardProjectCompact`. On mobile, all projects continue through the existing carousel using `ProjectCompact`.

- [ ] **Step 1: Update 04-Projects.svelte**

Replace the entire file with:

```svelte
<script>
  import ProjectCompact from "./04-Projects/ProjectCompact.svelte";
  import CardProjectCompact from "./Cards/CardProjectCompact.svelte";
  import { projList } from "../data/projects";
  import TextReveal from "./TextReveal.svelte";
  import { isMobile } from '../utils/mediaQuery.svelte';

  const ALL_TAG = "All";
  const tags = [ALL_TAG, ...new Set(projList.flatMap((p) => p.tags))];
  const WEIGHT = { featured: 3, compact: 1 };

  let activeTag = $state(ALL_TAG);
  let activeSlide = $state(0);
  let carouselEl = $state(null);
  let carouselHeightPx = $state(0);

  const filteredProjects = $derived(
    activeTag === ALL_TAG ? projList : projList.filter((p) => p.tags.includes(activeTag))
  );

  const columns = $derived.by(() => {
    const sorted = [...filteredProjects].sort((a, b) => {
      if (a.tier === b.tier) return 0;
      return a.tier === "featured" ? -1 : 1;
    }).map((p, i) => ({ ...p, sortedIndex: i }));

    const featured = sorted.filter(p => p.tier === "featured");
    const compact = sorted.filter(p => p.tier !== "featured");

    const left = [];
    const right = [];
    let leftWeight = 0;
    let rightWeight = 0;

    for (const proj of featured) {
      if (leftWeight <= rightWeight) {
        left.push(proj);
        leftWeight += WEIGHT[proj.tier];
      } else {
        right.push(proj);
        rightWeight += WEIGHT[proj.tier];
      }
    }

    for (const proj of compact) {
      if (leftWeight <= rightWeight) {
        left.push(proj);
        leftWeight += WEIGHT[proj.tier];
      } else {
        right.push(proj);
        rightWeight += WEIGHT[proj.tier];
      }
    }

    return { left, right };
  });

  function updateCarouselHeight() {
    if (!carouselEl) return;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    let maxHeight = 0;
    slides.forEach(s => { if (s.offsetHeight > maxHeight) maxHeight = s.offsetHeight; });
    carouselHeightPx = maxHeight;
  }

  function getSlideStepPx() {
    if (!carouselEl) return 0;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    if (slides.length < 2) return slides[0]?.offsetWidth ?? 0;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function handleScroll() {
    if (!carouselEl) return;
    const step = getSlideStepPx();
    if (step === 0) return;
    activeSlide = Math.round(carouselEl.scrollLeft / step);
  }

  function scrollToSlide(index) {
    if (!carouselEl) return;
    const step = getSlideStepPx();
    carouselEl.scrollTo({ left: index * step, behavior: "smooth" });
  }

  $effect(() => {
    if (!carouselEl) return;
    const slides = carouselEl.querySelectorAll(".carousel-slide");
    const images = Array.from(slides).flatMap(s => [...s.querySelectorAll("img")]);
    const onLoad = () => updateCarouselHeight();
    images.forEach(img => img.addEventListener("load", onLoad));
    updateCarouselHeight();
    return () => images.forEach(img => img.removeEventListener("load", onLoad));
  });

  $effect(() => {
    activeTag;
    activeSlide = 0;
    if (carouselEl) carouselEl.scrollLeft = 0;
  });
</script>

{#snippet renderProject(proj)}
  {@const revealDelayMs = 250 + (proj.sortedIndex + 1) * 60}
  {#if proj.tier === "featured"}
    <ProjectCompact projectInfo={proj} {revealDelayMs} />
  {:else}
    <CardProjectCompact
      title={proj.title}
      imgBase={proj.imgBase}
      oneliner={proj.oneliner}
      urls={proj.urls}
      text={proj.text}
      techstack={proj.techstack}
      {revealDelayMs}
    />
  {/if}
{/snippet}

<div id="projects" class="section-inset" data-reveal-section>
  <TextReveal text="Built with passion" class="section-title content-width" />
  <div class="description content-width reveal" style="transition-delay: 150ms">
    I can learn any technology, and I thrive on turning ideas into impactful realities. Here are some of the projects I've built on my own:
  </div>

  <div class="filter-tabs content-width reveal" style="transition-delay: 200ms">
    {#each tags as tag}
      <button
        class="filter-tab"
        class:active={activeTag === tag}
        onclick={() => activeTag = tag}
      >
        {tag}
      </button>
    {/each}
  </div>

  {#if isMobile.value}
    <div class="carousel-container content-width reveal" style="transition-delay: 250ms">
      <div
        class="carousel"
        bind:this={carouselEl}
        onscroll={handleScroll}
        style:--carousel-h="{carouselHeightPx}px"
      >
        {#each filteredProjects as projectInfo, index (projectInfo.title)}
          <div class="carousel-slide">
            <ProjectCompact {projectInfo} />
          </div>
        {/each}
      </div>
      {#if filteredProjects.length > 1}
        <div class="carousel-dots">
          {#each filteredProjects as _, index}
            <button
              class="dot"
              class:active={activeSlide === index}
              onclick={() => scrollToSlide(index)}
              aria-label="Go to project {index + 1}"
            ></button>
          {/each}
        </div>
      {/if}
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
</div>

<style lang="scss">
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

    .carousel-container {
      position: relative;
      margin-right: -1rem;
      margin-bottom: 3rem;
    }

    .carousel {
      height: var(--carousel-h);
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      overscroll-behavior-x: contain;
      padding-right: 1rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .carousel-slide {
      flex: 0 0 85%;
      scroll-snap-align: start;
    }

    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.25rem;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.3);
      padding: 0;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.25s ease;

      &.active {
        background: rgba(100, 172, 255, 0.8);
        transform: scale(1.3);
      }
    }
  }
</style>
```

- [ ] **Step 2: Run check**

Run: `cd /home/tony/Documents/Playground/personal-website && npm run check`
Expected: PASS.

- [ ] **Step 3: Visual verification - desktop**

Start dev server if not running, navigate to http://localhost:5173, emulate desktop viewport (1440x900), scroll to the projects section, and take a screenshot. Verify:
- Featured cards (Pneumonia Detection, Voice Dictation, YouTube Audio Chunker) show with full screenshots on top
- Compact cards (SoulDog, Time Series Forecasting, This Website!, Chess, Wumpus World) show with side thumbnails
- Both tiers flow in the same two-column layout with no separator
- Cards are balanced between columns

- [ ] **Step 4: Visual verification - mobile**

Emulate mobile viewport (375x812, mobile, touch) and take a screenshot. Verify:
- All projects show in the carousel as full cards (same as before)
- Dot navigation works
- No compact card layout visible on mobile

- [ ] **Step 5: Visual verification - expand behavior**

On desktop, hover over a featured card and a compact card. Verify:
- Featured card: chevron rotates, expandable section slides open
- Compact card: chevron rotates, description text slides open below the side-thumbnail row

On mobile, tap a card. Verify the same expand behavior works via tap.

- [ ] **Step 6: Commit**

```bash
git add src/components/04-Projects.svelte
git commit -m "Switch projects desktop layout to weighted two-tier columns"
```

---

### Task 5: Verify filters work across both tiers

**Files:** None (testing only)

- [ ] **Step 1: Test filter behavior**

On desktop at http://localhost:5173, click each filter tab and verify:
- **All:** Shows all 8 projects (3 featured + 5 compact), balanced in two columns
- **ML:** Shows Pneumonia Detection (featured) + Time Series Forecasting (compact) + Wumpus World (compact)
- **Systems:** Shows Voice Dictation (featured) + Chess (compact)
- **Web:** Shows YouTube Audio Chunker (featured) + SoulDog (compact) + This Website! (compact)

Each filtered view should show the correct mix of featured and compact cards in balanced columns.

- [ ] **Step 2: Run full check**

Run: `cd /home/tony/Documents/Playground/personal-website && npm run check`
Expected: All tests and build pass.
