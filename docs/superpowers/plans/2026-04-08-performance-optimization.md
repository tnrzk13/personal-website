# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce initial page load by ~4 MB, eliminate render-blocking external dependencies, cut runtime GPU/CPU overhead from off-screen animations, and simplify the image format selection architecture.

**Architecture:** Seven workstreams in two phases. Phase 1: WS1 (trivial cleanup on main), then WS2-5 as parallel agents in isolated worktrees. Phase 2: WS6 (architectural refactor) runs after Phase 1 merges, since it touches files modified by WS2 and WS3.

**Tech Stack:** Svelte 5, Vite 6, TypeScript, CSS keyframe animations, IntersectionObserver API

---

## File Map

| Workstream | Files touched | Agent isolation |
|---|---|---|
| WS1: Dead weight removal | `public/fonts/SF-Pro-Text-Regular.otf`, `public/images/readme-preview.png` | Main branch (trivial deletes) |
| WS2: Font Awesome -> inline SVGs | `index.html`, `src/components/01-Title/Parallax.svelte`, `src/components/05-Contact/ContactText.svelte`, `src/components/05-Contact/ContactMobile.svelte`, `src/components/Cards/CardProject.svelte` | Worktree (5 files, no overlap with WS3-5) |
| WS3: Parallax image lazy-load + preload + RAF throttle | `index.html`, `src/components/01-Title/Parallax.svelte` | Worktree (overlaps WS2 on same files, but different lines - merge cleanly) |
| WS4: Pause off-screen animations | `src/components/AuroraBackground.svelte`, `src/components/AmbientOrbs.svelte` | Worktree (exclusive files) |
| WS5: Consolidate reveal system | `src/actions/reveal.ts`, `src/components/03-Career.svelte`, `src/components/03b-Testimonials/Testimonials.svelte`, `src/components/04-Projects.svelte`, `src/components/04-Projects/ProjectCompact.svelte`, `src/components/04-Projects/ProjectInstance.svelte`, `src/components/Cards/CardCareer.svelte`, `src/components/Cards/CardCareerCompact.svelte`, `src/components/03b-Testimonials/TestimonialCard.svelte` | Worktree (reveal.ts exclusive; section components only change delay prop names/values - no overlap with WS6's image changes) |
| WS6: Replace getImagePath with `<picture>` | `src/types/index.ts`, `src/data/career.ts`, `src/data/projects.ts`, `src/data/data.test.ts`, `src/components/Cards/CardCareer.svelte`, `src/components/Cards/CardCareerCompact.svelte`, `src/components/04-Projects/ProjectInstance.svelte`, `src/components/04-Projects/ProjectCompact.svelte`, `src/components/02-AboutMe.svelte`, `src/components/Navbar.svelte`, `src/components/01-Title/Parallax.svelte` + delete `src/utils/browser.ts`, `src/utils/imagePath.ts`, `src/utils/imagePath.test.ts` | Phase 2: after WS2-5 merge (touches Parallax.svelte, Navbar modified by WS2) |

**Phase 1 parallelism:** WS2, WS3, WS4, and WS5 touch different code regions and can run as parallel agents. WS2 and WS3 both touch `index.html` and `Parallax.svelte` but at different locations (WS2 changes icon markup, WS3 changes image loading and scroll logic), so they merge cleanly. WS5 now also touches section components for prop name standardization, but only modifies reveal delay props/values - no overlap with WS6's image-related changes to those same files.

**Phase 2 sequencing:** WS6 must run after Phase 1 merges because it modifies `Parallax.svelte` (also touched by WS2 and WS3) and several other components. It's a single-agent workstream.

---

## Workstream 1: Dead Weight Removal

**Files:**
- Delete: `public/fonts/SF-Pro-Text-Regular.otf` (3.0 MB, zero CSS references)
- Delete: `public/images/readme-preview.png` (694 KB, not referenced in `src/`)

This is trivial and should be done first on main before branching worktrees.

- [ ] **Step 1: Verify the font has no references**

Run: `grep -r "SF-Pro" src/ public/ index.html`
Expected: No matches (the font is defined nowhere in CSS or HTML).

- [ ] **Step 2: Verify the image has no references**

Run: `grep -r "readme-preview" src/ public/ index.html`
Expected: No matches.

- [ ] **Step 3: Delete both files**

```bash
rm public/fonts/SF-Pro-Text-Regular.otf
rm public/images/readme-preview.png
```

- [ ] **Step 4: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "Remove unused SF-Pro font (3 MB) and readme-preview image (694 KB)"
```

---

## Workstream 2: Replace Font Awesome with Inline SVGs

**Files:**
- Modify: `index.html:43` (remove Font Awesome script tag)
- Modify: `src/components/01-Title/Parallax.svelte:88` (scroll-down chevron icon)
- Modify: `src/components/05-Contact/ContactText.svelte:27,30` (LinkedIn + GitHub icons)
- Modify: `src/components/05-Contact/ContactMobile.svelte:25,28` (LinkedIn + GitHub icons)
- Modify: `src/components/Cards/CardProject.svelte:15,28` (link + GitHub icons)
- Create: `src/components/Icons/IconAnglesDown.svelte`
- Create: `src/components/Icons/IconLinkedIn.svelte`
- Create: `src/components/Icons/IconGitHub.svelte`
- Create: `src/components/Icons/IconLink.svelte`

**Context:** The site loads `https://kit.fontawesome.com/f128a4fea2.js` as an external render-blocking script. Only 4 unique icons are used across the entire site. Replacing them with inline SVG components eliminates the external dependency entirely.

**Icon inventory (4 unique icons, 7 usages):**
1. `fa-solid fa-angles-down` - Parallax.svelte (1 usage)
2. `fa-brands fa-linkedin` - ContactText.svelte, ContactMobile.svelte (2 usages)
3. `fa-brands fa-github` - ContactText.svelte, ContactMobile.svelte, CardProject.svelte (3 usages)
4. `fa-solid fa-link` - CardProject.svelte (1 usage)

### Task 2.1: Create icon components

- [ ] **Step 1: Create `src/components/Icons/IconAnglesDown.svelte`**

```svelte
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...$$restProps}>
  <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/>
</svg>
```

Note: Get this SVG path data from Font Awesome's free icon set (MIT licensed). The `viewBox` and `path` values are the canonical Font Awesome SVG data. Use `fill="currentColor"` so the icon inherits text color, matching the existing behavior.

- [ ] **Step 2: Create `src/components/Icons/IconLinkedIn.svelte`**

```svelte
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...$$restProps}>
  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
</svg>
```

- [ ] **Step 3: Create `src/components/Icons/IconGitHub.svelte`**

```svelte
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor" aria-hidden="true" {...$$restProps}>
  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.8-14.9-112.8-116.8 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 102.2-58.9 110.5-115 116.8 8.8 7.9 16.7 22.9 16.7 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
</svg>
```

- [ ] **Step 4: Create `src/components/Icons/IconLink.svelte`**

```svelte
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true" {...$$restProps}>
  <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372.1 74 321.1 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.8l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 #377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
</svg>
```

### Task 2.2: Replace icon usages in components

- [ ] **Step 5: Update `Parallax.svelte:88`**

Replace:
```svelte
<div class="scrolldown"><i class="fa-solid fa-angles-down" aria-hidden="true"></i></div>
```
With:
```svelte
<div class="scrolldown"><IconAnglesDown /></div>
```

Add import at top of script:
```js
import IconAnglesDown from "../Icons/IconAnglesDown.svelte";
```

Add CSS to scope the SVG size (in `.scrolldown` block):
```css
.scrolldown :global(svg) {
  width: 1em;
  height: 1em;
}
```

- [ ] **Step 6: Update `ContactText.svelte:27,30`**

Replace the two `<i>` tags:
```svelte
<i class="fa-brands fa-linkedin fa-md" aria-hidden="true"></i>
```
with:
```svelte
<IconLinkedIn />
```
and:
```svelte
<i class="fa-brands fa-github fa-md" aria-hidden="true"></i>
```
with:
```svelte
<IconGitHub />
```

Add imports:
```js
import IconLinkedIn from "../Icons/IconLinkedIn.svelte";
import IconGitHub from "../Icons/IconGitHub.svelte";
```

Add CSS for icon sizing in `.icon-links a`:
```css
:global(svg) {
  width: 1em;
  height: 1em;
}
```

- [ ] **Step 7: Update `ContactMobile.svelte:25,28`**

Same pattern as Step 6. Replace `<i class="fa-brands fa-linkedin fa-lg">` and `<i class="fa-brands fa-github fa-lg">` with `<IconLinkedIn />` and `<IconGitHub />`.

Add same imports. Add CSS:
```css
:global(svg) {
  width: 1em;
  height: 1em;
}
```

- [ ] **Step 8: Update `CardProject.svelte:15,28`**

Replace:
```svelte
<i class="fa-solid fa-link" aria-hidden="true"></i>
```
with:
```svelte
<IconLink />
```

Replace:
```svelte
<i class="fa-brands fa-github" aria-hidden="true"></i>
```
with:
```svelte
<IconGitHub />
```

Add imports:
```js
import IconLink from "../Icons/IconLink.svelte";
import IconGitHub from "../Icons/IconGitHub.svelte";
```

Add CSS for inline icon sizing in `.card-body h3, .card-body span.title`:
```css
:global(svg) {
  width: 0.8em;
  height: 0.8em;
  vertical-align: baseline;
}
```

### Task 2.3: Remove Font Awesome script

- [ ] **Step 9: Remove the script tag from `index.html:43`**

Delete this line:
```html
<script src="https://kit.fontawesome.com/f128a4fea2.js" crossorigin="anonymous"></script>
```

- [ ] **Step 10: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 11: Visual verification**

Start dev server, navigate to `http://localhost:5173`. Verify:
1. Scroll-down chevron renders on the parallax hero
2. LinkedIn and GitHub icons render in the contact section (desktop + mobile)
3. Link and GitHub icons render on project cards
4. No console errors about missing Font Awesome

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "Replace Font Awesome CDN with inline SVG icon components

Eliminates render-blocking external script dependency.
Only 4 icons were used site-wide (angles-down, linkedin, github, link)."
```

---

## Workstream 3: Parallax Image Lazy-Load + Preload Hero + RAF Throttle

**Files:**
- Modify: `index.html:47` (add preload for hero image)
- Modify: `src/components/01-Title/Parallax.svelte:52-99` (add loading="lazy" to non-hero images, wrap scroll handler in RAF)

**Context:** All 10 parallax image frames (2.9 MB) load eagerly on page load. Only frame 000 is visible before any scroll. The parallax scroll handler recalculates 11 layer transforms on every scroll event without any frame throttling.

### Task 3.1: Preload the hero parallax image

- [ ] **Step 1: Add preload link to `index.html`**

After the existing font preloads (line 47), add:
```html
<link rel="preload" href="/images/intro/000.avif" as="image" type="image/avif">
```

This tells the browser to start fetching the hero image immediately, before JS parses and mounts the Parallax component. Only preload the AVIF variant since it covers ~95% of browsers.

### Task 3.2: Lazy-load non-hero parallax images

- [ ] **Step 2: Add `loading="lazy"` to images in `Parallax.svelte`**

The component renders images in an `{#each layers as layer}` loop (lines 52-100). There are three `<img>` blocks:

1. Layer 0 (line 54-62): The hero/background. Keep this **eager** (no loading attribute needed, it's the default).

2. Layers 1-2 (lines 63-70): Near-hero layers. Add `loading="lazy"`:
```svelte
<img
  loading="lazy"
  style="transform: ..."
  src={getImagePath(`images/intro/00${layer}`)}
  alt="parallax layer {layer}"
/>
```

3. Layers 4-10 (lines 91-99): Background layers. Add `loading="lazy"`:
```svelte
<img
  loading="lazy"
  style="transform: ..."
  src={getImagePath(`images/intro/00${layer - 1}`)}
  alt="parallax layer {layer - 1}"
/>
```

Note: `loading="lazy"` on fixed/absolutely positioned images may not trigger the browser's lazy heuristic in all browsers. As a progressive enhancement, this is still correct - worst case is the browser loads them eagerly (current behavior). For a guaranteed lazy approach, the images could use an IntersectionObserver to swap `data-src` to `src`, but start with the native attribute since it's zero-complexity.

### Task 3.3: RAF-throttle the parallax scroll recalculation

- [ ] **Step 3: Wrap the scroll-driven `$effect` in a requestAnimationFrame gate**

In `Parallax.svelte`, the `$effect` at line 34-37 runs `update()` on every reactive change (including every `scrollY` tick). Wrap it:

Replace:
```js
$effect(() => {
  boolShowContact = scrollY > pageHalfDown;
  update();
});
```

With:
```js
let rafId = 0;
$effect(() => {
  // Read reactive deps to subscribe
  const currentScrollY = scrollY;
  const currentPageHalfDown = pageHalfDown;

  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    boolShowContact = currentScrollY > currentPageHalfDown;
    update();
  });

  return () => cancelAnimationFrame(rafId);
});
```

This ensures the 11-layer transform recalculation happens at most once per animation frame (~60fps), skipping redundant intermediate scroll events.

- [ ] **Step 4: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 5: Visual verification**

Start dev server, navigate to `http://localhost:5173`. Verify:
1. Parallax hero image loads immediately (no flash of empty space)
2. Scrolling is smooth - layers move at different speeds as before
3. Contact section parallax effect still works when scrolling past halfway
4. No console errors

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Lazy-load parallax images and RAF-throttle scroll handler

- Preload hero frame (000.avif) in HTML head for faster LCP
- Add loading=lazy to non-hero parallax frames (saves ~2 MB on initial load)
- Gate parallax recalculation behind requestAnimationFrame to skip redundant scroll events"
```

---

## Workstream 4: Pause Off-Screen Animations

**Files:**
- Modify: `src/components/AuroraBackground.svelte:1-33` (add visibility observer)
- Modify: `src/components/AmbientOrbs.svelte:57-63` (add visibility observer)

**Context:** There are 3 `AuroraBackground` instances (top, career, bottom) with 12 total blobs, plus `AmbientOrbs` with 5 desktop / 4 mobile orbs. All run CSS keyframe animations continuously, even when scrolled off-screen. Pausing them when not visible saves GPU compositing work and battery.

### Task 4.1: Add off-screen pause to AuroraBackground

- [ ] **Step 1: Add IntersectionObserver to toggle animation in `AuroraBackground.svelte`**

Add a `visible` state variable and an observer in the script block:

```ts
let visible = $state(false);

$effect(() => {
  if (!auroraEl) return;
  const observer = new IntersectionObserver(
    ([entry]) => { visible = entry.isIntersecting; },
    { rootMargin: '200px' }
  );
  observer.observe(auroraEl);
  return () => observer.disconnect();
});
```

The `rootMargin: '200px'` starts animations 200px before the section scrolls into view, so they're already moving when visible.

- [ ] **Step 2: Add a CSS class that pauses animations**

On the `.aurora` div, add the paused class conditionally:

```svelte
<div
  class="aurora"
  class:paused={!visible}
  aria-hidden="true"
  bind:this={auroraEl}
  style={freezeHeight && frozenHeightPx ? `height: ${frozenHeightPx}px` : undefined}
>
```

Add the CSS rule:
```css
.aurora.paused .aurora-blob {
  animation-play-state: paused;
}
```

This uses `animation-play-state` which freezes the animation at its current position and resumes from there - no jarring jump.

### Task 4.2: Add off-screen pause to AmbientOrbs

- [ ] **Step 3: Add IntersectionObserver to `AmbientOrbs.svelte`**

Add state and observer:
```ts
let orbsEl: HTMLDivElement;
let visible = $state(false);

$effect(() => {
  if (!orbsEl) return;
  const observer = new IntersectionObserver(
    ([entry]) => { visible = entry.isIntersecting; },
    { rootMargin: '200px' }
  );
  observer.observe(orbsEl);
  return () => observer.disconnect();
});
```

Update the template:
```svelte
<div class="ambient-orbs" class:paused={!visible} aria-hidden="true" bind:this={orbsEl}>
```

Add CSS:
```css
.ambient-orbs.paused .orb {
  animation-play-state: paused;
}
```

- [ ] **Step 4: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 5: Visual verification**

Start dev server, navigate to `http://localhost:5173`. Verify:
1. Aurora blobs animate when their section is in view
2. Blobs pause when scrolled far away (check via DevTools - inspect element, animation tab)
3. Ambient orbs behave the same way
4. No visual jump when animations resume

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Pause aurora blob and ambient orb animations when off-screen

Uses IntersectionObserver with 200px rootMargin so animations
start before section scrolls into view. Reduces GPU compositing
overhead from 12+ continuously animating blobs."
```

---

## Workstream 5: Consolidate Reveal System

**Files:**
- Modify: `src/actions/reveal.ts` (refactor to shared observer)
- Modify: `src/components/03-Career.svelte` (use stagger constant + standardize prop name)
- Modify: `src/components/03b-Testimonials/Testimonials.svelte` (use stagger constant + standardize prop name)
- Modify: `src/components/04-Projects.svelte` (use stagger constant + standardize prop name)
- Modify: `src/components/04-Projects/ProjectCompact.svelte` (rename `delayMs` to `revealDelayMs`)
- Modify: `src/components/04-Projects/ProjectInstance.svelte` (use stagger constant)
- Modify: `src/components/Cards/CardCareer.svelte` (no change needed - already uses `revealDelayMs`)
- Modify: `src/components/Cards/CardCareerCompact.svelte` (no change needed - already uses `revealDelayMs`)
- Modify: `src/components/03b-Testimonials/TestimonialCard.svelte` (no change needed - already uses `revealDelayMs`)

**Context:** The `reveal` Svelte action creates one `IntersectionObserver` per element. With 25-50 revealed elements on the page, this means 25-50 independent observers. A single shared observer watching all targets is more memory-efficient and equally functional. Additionally, the reveal system has two cleanup issues: (1) the delay prop is named `revealDelayMs` in some components and `delayMs` in others, and (2) the stagger increment (60ms) and base delay (50ms) are magic numbers repeated across 5+ section files.

**Important:** The current `reveal.ts` includes a `requestAnimationFrame` check for scroll-restoration (elements above viewport on page load). This must be preserved in the refactored version.

### Task 5.1: Refactor reveal action to use a shared observer

- [ ] **Step 1: Replace individual observers with a shared one in `src/actions/reveal.ts`**

Replace the entire file with:

```ts
const REVEAL_CLASS = "revealed";

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type RevealMeta = {
    options?: { delay?: number; propagateTo?: string; propagateDelayMs?: number };
    propagateTimer?: ReturnType<typeof setTimeout>;
    rafId?: number;
};

const nodeMap = new Map<Element, RevealMeta>();

function revealNode(node: HTMLElement, meta: RevealMeta, skipDelay = false) {
    node.classList.add(REVEAL_CLASS);
    const ancestor = meta.options?.propagateTo
        ? node.closest(meta.options.propagateTo)
        : null;
    if (!ancestor) return;

    const delayMs = skipDelay ? 0 : (meta.options?.propagateDelayMs ?? 0);
    if (delayMs > 0) {
        meta.propagateTimer = setTimeout(
            () => ancestor.classList.add(REVEAL_CLASS),
            delayMs
        );
    } else {
        ancestor.classList.add(REVEAL_CLASS);
    }
}

const sharedObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const meta = nodeMap.get(entry.target);
            if (!meta) continue;

            revealNode(entry.target as HTMLElement, meta);
            sharedObserver.unobserve(entry.target);
            nodeMap.delete(entry.target);
        }
    },
    { threshold: 0.1 }
);

export function reveal(
    node: HTMLElement,
    options?: { delay?: number; propagateTo?: string; propagateDelayMs?: number }
) {
    const meta: RevealMeta = { options };

    if (prefersReducedMotion()) {
        revealNode(node, meta, true);
        return;
    }

    if (options?.delay && options.delay > 0) {
        node.style.transitionDelay = `${options.delay}ms`;
    }

    nodeMap.set(node, meta);
    sharedObserver.observe(node);

    // Browser restores scroll position after mount, so elements above
    // the viewport appear in-viewport at mount time. Check after one
    // frame when scroll restoration has completed.
    meta.rafId = requestAnimationFrame(() => {
        if (node.getBoundingClientRect().bottom <= 0) {
            revealNode(node, meta, true);
            sharedObserver.unobserve(node);
            nodeMap.delete(node);
        }
    });

    return {
        destroy() {
            sharedObserver.unobserve(node);
            nodeMap.delete(node);
            clearTimeout(meta.propagateTimer);
            if (meta.rafId !== undefined) cancelAnimationFrame(meta.rafId);
        },
    };
}
```

Key changes from current code:
- One `IntersectionObserver` instance shared across all `reveal()` calls (was one per element)
- A `Map<Element, RevealMeta>` stores per-element config (delay, propagation)
- `revealNode` extracted as a standalone function (shared by observer callback, reduced-motion path, and scroll-restoration path)
- Preserves the `requestAnimationFrame` scroll-restoration check from the current code
- `destroy()` cleans up observer, propagation timer, and rAF

- [ ] **Step 2: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 3: Visual verification**

Start dev server, scroll through the page. Verify:
1. Section elements still fade in as they enter the viewport
2. Staggered word reveals still work
3. No elements that should reveal are stuck hidden
4. Refreshing mid-page and scrolling up shows all content immediately (scroll-restoration check)

- [ ] **Step 4: Commit**

```bash
git add src/actions/reveal.ts
git commit -m "Consolidate reveal observers into single shared IntersectionObserver

Reduces ~25-50 individual observers to 1 shared instance.
Same threshold (0.1), same fire-once unobserve, same propagation behavior.
Preserves requestAnimationFrame scroll-restoration check."
```

### Task 5.2: Standardize reveal delay prop name and extract stagger constants

The delay prop is named `revealDelayMs` in career/testimonial cards but `delayMs` in `ProjectCompact`. The stagger increment (60ms) and base delay (50ms) are magic numbers in 5+ files. This task standardizes both.

- [ ] **Step 5: Rename `delayMs` to `revealDelayMs` in `ProjectCompact.svelte`**

In `src/components/04-Projects/ProjectCompact.svelte`, change the prop declaration:
```ts
// Before
let { projectInfo, delayMs = 0 }: { projectInfo: ProjectData; delayMs?: number } = $props();
// After
let { projectInfo, revealDelayMs = 0 }: { projectInfo: ProjectData; revealDelayMs?: number } = $props();
```

Update the template usage from `{delayMs}` to `{revealDelayMs}`.

- [ ] **Step 6: Update `04-Projects.svelte` to use `revealDelayMs`**

Change `delayMs={250 + (index + 1) * 60}` to `revealDelayMs={250 + (index + 1) * 60}`.

- [ ] **Step 7: Extract stagger constants to a shared location**

Create constants in `src/actions/reveal.ts` (colocated with the reveal system):

```ts
/** Delay between consecutive sibling reveals within a section */
export const REVEAL_STAGGER_MS = 60;

/** Delay before the first child in a section starts revealing */
export const REVEAL_BASE_DELAY_MS = 50;

/** Convenience: compute the reveal delay for a staggered child */
export function staggerDelayMs(index: number, baseMs = REVEAL_BASE_DELAY_MS): number {
    return baseMs + index * REVEAL_STAGGER_MS;
}
```

- [ ] **Step 8: Replace inline stagger math in section components**

In each section component, replace the inline arithmetic with the shared helper:

**`03-Career.svelte`:**
```svelte
<!-- Before -->
revealDelayMs={i * 60 + 50}
<!-- After -->
revealDelayMs={staggerDelayMs(i)}
```
Also update the "Earlier Experience" heading and compact cards to use the constants.

**`03b-Testimonials/Testimonials.svelte`:**
```svelte
<!-- Before -->
revealDelayMs={50 + i * 60}
<!-- After -->
revealDelayMs={staggerDelayMs(i)}
```

**`04-Projects.svelte`:**
Update description (150ms), filter tabs (200ms), carousel (250ms), and grid items to use the constants. The static delays (150, 200, 250) remain as literals since they're one-off sequential values, not staggered indices.

**`04-Projects/ProjectInstance.svelte`:**
```svelte
<!-- Before -->
style="transition-delay: {projectIndex * 60 + 250}ms"
<!-- After (import REVEAL_STAGGER_MS) -->
style="transition-delay: {projectIndex * REVEAL_STAGGER_MS + 250}ms"
```

- [ ] **Step 9: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass.

- [ ] **Step 10: Visual verification**

Start dev server, scroll through the page. Verify animations are unchanged - this is a pure refactor.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "Standardize reveal delay prop name and extract stagger constants

Rename delayMs to revealDelayMs in ProjectCompact for consistency.
Extract REVEAL_STAGGER_MS (60) and staggerDelayMs() helper to
reveal.ts, replacing scattered magic numbers in section components."
```

---

## Workstream 6: Replace getImagePath with Native `<picture>` Elements

**Files:**
- Modify: `src/types/index.ts:7,23` (rename `imgurl` to `imgBase` on `CareerCard` and `ProjectData`)
- Modify: `src/data/career.ts:1,6,89,154,207,272,307,358,383` (remove getImagePath import, change all `imgurl` to `imgBase` with raw base paths)
- Modify: `src/data/projects.ts:1,7,19,32,44,56,68,80,91` (same pattern)
- Modify: `src/data/data.test.ts:1-6,24,49` (remove browser mock, update field name assertions)
- Modify: `src/components/Cards/CardCareer.svelte:5,28` (accept `imgBase` prop, render `<picture>`)
- Modify: `src/components/Cards/CardCareerCompact.svelte:4,24` (same)
- Modify: `src/components/04-Projects/ProjectInstance.svelte:26,34` (use `imgBase` for poster and `<picture>`)
- Modify: `src/components/04-Projects/ProjectCompact.svelte:17,25` (same)
- Modify: `src/components/02-AboutMe.svelte:3,28` (remove import, render `<picture>`)
- Modify: `src/components/Navbar.svelte:2,68` (remove import, render `<picture>`)
- Modify: `src/components/01-Title/Parallax.svelte:4,60,68,96` (remove import, render `<picture>`)
- Delete: `src/utils/browser.ts`
- Delete: `src/utils/imagePath.ts`
- Delete: `src/utils/imagePath.test.ts`

**Context:** The current image format selection does UA sniffing in JS (`browser.ts`) to choose between AVIF and PNG (`imagePath.ts`). This is used in 14+ places. The native `<picture>` element lets the browser negotiate format without JS, is more correct (no fragile UA parsing), works with native preloading, and eliminates 3 files + a test mock.

### Task 6.1: Update types

- [ ] **Step 1: Rename `imgurl` to `imgBase` in `src/types/index.ts`**

Replace:
```ts
export interface CareerCard {
  imgurl: string;
```
With:
```ts
export interface CareerCard {
  imgBase: string;
```

Replace:
```ts
export interface ProjectData {
  title: string;
  imgurl: string;
```
With:
```ts
export interface ProjectData {
  title: string;
  imgBase: string;
```

### Task 6.2: Update data files

- [ ] **Step 2: Update `src/data/career.ts`**

Remove the import line:
```ts
import { getImagePath } from "../utils/imagePath";
```

Change every `imgurl: getImagePath("images/03-career/...")` to `imgBase: "images/03-career/..."`. There are 8 entries:

```ts
imgBase: "images/03-career/alethea",
imgBase: "images/03-career/myriade",
imgBase: "images/03-career/npx",
imgBase: "images/03-career/360insights",
imgBase: "images/03-career/quarter4",
imgBase: "images/03-career/marsh",
imgBase: "images/03-career/jpmorgan",
imgBase: "images/03-career/goldman",
```

- [ ] **Step 3: Update `src/data/projects.ts`**

Remove the import line:
```ts
import { getImagePath } from "../utils/imagePath";
```

Change every `imgurl: getImagePath("images/04-project/...")` to `imgBase: "images/04-project/..."`. There are 8 entries:

```ts
imgBase: "images/04-project/pneumoniaXrayIdentifier",
imgBase: "images/04-project/voicedictation",
imgBase: "images/04-project/youtubechunker",
imgBase: "images/04-project/souldog",
imgBase: "images/04-project/airpassengers",
imgBase: "images/04-project/website",
imgBase: "images/04-project/chess",
imgBase: "images/04-project/wumpusworld",
```

### Task 6.3: Update data tests

- [ ] **Step 4: Update `src/data/data.test.ts`**

Remove the browser mock at the top:
```ts
vi.mock("../utils/browser", () => ({
  isBrowserSafari: vi.fn(() => false),
}));
```

Change the field assertions from `imgurl` to `imgBase`:
```ts
// In career test
expect(card.imgBase).toBeTruthy();

// In project test
expect(proj.imgBase).toBeTruthy();
```

The full updated file:
```ts
import { describe, expect, it } from "vitest";

import { cardList } from "./career";
import { projList } from "./projects";

describe("cardList (career data)", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(cardList)).toBe(true);
    expect(cardList.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const card of cardList) {
      expect(card.title).toBeTruthy();
      expect(card.subtitle).toBeTruthy();
      expect(card.techstack.length).toBeGreaterThan(0);
      expect(card.points.length).toBeGreaterThan(0);
      expect(card.imgBase).toBeTruthy();
      expect(card.logoColor).toBeTruthy();
    }
  });

  it("each point has valid text parts", () => {
    for (const card of cardList) {
      for (const point of card.points) {
        expect(point.length).toBeGreaterThan(0);
        for (const part of point) {
          expect(["bold", "none"]).toContain(part.style);
          expect(part.text).toBeDefined();
        }
      }
    }
  });
});

describe("projList (project data)", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(projList)).toBe(true);
    expect(projList.length).toBeGreaterThan(0);
  });

  it("each entry has required fields", () => {
    for (const proj of projList) {
      expect(proj.title).toBeTruthy();
      expect(proj.imgBase).toBeTruthy();
      expect(proj.text).toBeTruthy();
      expect(proj.techstack.length).toBeGreaterThan(0);
      expect(proj.urls).toBeDefined();
      expect(proj.urls.codeUrl).toBeTruthy();
    }
  });
});
```

- [ ] **Step 5: Run tests to verify data changes**

Run: `npx vitest run`
Expected: All tests pass. The `imagePath.test.ts` tests will still pass at this point since we haven't deleted the file yet.

### Task 6.4: Update career card components

- [ ] **Step 6: Update `src/components/Cards/CardCareer.svelte`**

Change the props destructuring (line 5):
```ts
let { imgurl, title, subtitle, datePeriod, points, logoColor, techstack, revealDelayMs = 0 } = $props();
```
to:
```ts
let { imgBase, title, subtitle, datePeriod, points, logoColor, techstack, revealDelayMs = 0 } = $props();
```

Replace the img tag (line 28):
```svelte
<img class="logo" src={imgurl} alt="company logo" loading="lazy" />
```
with:
```svelte
<picture>
  <source srcset="{imgBase}.avif" type="image/avif">
  <img class="logo" src="{imgBase}.png" alt="company logo" loading="lazy" />
</picture>
```

- [ ] **Step 7: Update `src/components/Cards/CardCareerCompact.svelte`**

Change the props destructuring (line 4):
```ts
let { imgurl, title, subtitle, datePeriod, points, logoColor, revealDelayMs = 0 } = $props();
```
to:
```ts
let { imgBase, title, subtitle, datePeriod, points, logoColor, revealDelayMs = 0 } = $props();
```

Replace the img tag (line 24):
```svelte
<img src={imgurl} alt="company logo" loading="lazy" />
```
with:
```svelte
<picture>
  <source srcset="{imgBase}.avif" type="image/avif">
  <img src="{imgBase}.png" alt="company logo" loading="lazy" />
</picture>
```

- [ ] **Step 8: Update `src/components/03-Career.svelte` prop spreading**

The career component destructures and passes props. Update the `{#each}` blocks:

Line 16-17, change:
```svelte
{#each featuredCards as { imgurl, title, subtitle, datePeriod, techstack, points, logoColor }, i}
  <Card {imgurl} {title} {subtitle} {datePeriod} {techstack} {points} {logoColor} revealDelayMs={i * 60 + 50} />
```
to:
```svelte
{#each featuredCards as { imgBase, title, subtitle, datePeriod, techstack, points, logoColor }, i}
  <Card {imgBase} {title} {subtitle} {datePeriod} {techstack} {points} {logoColor} revealDelayMs={i * 60 + 50} />
```

Line 24-25, change:
```svelte
{#each compactCards as { imgurl, title, subtitle, datePeriod, points, logoColor }, i}
  <CardCompact {imgurl} {title} {subtitle} {datePeriod} {points} {logoColor} revealDelayMs={featuredCards.length * 60 + 150 + i * 60} />
```
to:
```svelte
{#each compactCards as { imgBase, title, subtitle, datePeriod, points, logoColor }, i}
  <CardCompact {imgBase} {title} {subtitle} {datePeriod} {points} {logoColor} revealDelayMs={featuredCards.length * 60 + 150 + i * 60} />
```

### Task 6.5: Update project components

- [ ] **Step 9: Update `src/components/04-Projects/ProjectInstance.svelte`**

For the video branch (line 22-32), change `poster={projectInfo.imgurl}` to `poster="{projectInfo.imgBase}.avif"`:
```svelte
<video
  class="main"
  class:glowing
  src={projectInfo.videoUrl}
  poster="{projectInfo.imgBase}.avif"
  preload="none"
  muted
  loop
  playsinline
  use:lazyPlayback
></video>
```

For the image branch (line 34), replace:
```svelte
<img class="main" class:glowing src={projectInfo.imgurl} alt="project" loading="lazy" />
```
with:
```svelte
<picture>
  <source srcset="{projectInfo.imgBase}.avif" type="image/avif">
  <img class="main" class:glowing src="{projectInfo.imgBase}.png" alt="project" loading="lazy" />
</picture>
```

Note: The CSS selectors `img.main` and `img.glowing` still work because the `<img>` is still present inside `<picture>`. The `<picture>` element is layout-transparent.

- [ ] **Step 10: Update `src/components/04-Projects/ProjectCompact.svelte`**

Same pattern. For the video branch (line 15-23), change `poster={projectInfo.imgurl}`:
```svelte
poster="{projectInfo.imgBase}.avif"
```

For the image branch (line 25), replace:
```svelte
<img src={projectInfo.imgurl} alt={projectInfo.title} loading="lazy" />
```
with:
```svelte
<picture>
  <source srcset="{projectInfo.imgBase}.avif" type="image/avif">
  <img src="{projectInfo.imgBase}.png" alt={projectInfo.title} loading="lazy" />
</picture>
```

### Task 6.6: Update remaining components that call getImagePath directly

- [ ] **Step 11: Update `src/components/02-AboutMe.svelte`**

Remove the import (line 3):
```ts
import { getImagePath } from "../utils/imagePath";
```

Replace the img tag (line 26-30):
```svelte
<img
  class="aboutmeimg"
  src={getImagePath("images/02-aboutme/self")}
  alt="tony kwok"
  loading="lazy"
/>
```
with:
```svelte
<picture>
  <source srcset="images/02-aboutme/self.avif" type="image/avif">
  <img
    class="aboutmeimg"
    src="images/02-aboutme/self.png"
    alt="tony kwok"
    loading="lazy"
  />
</picture>
```

The CSS selector `img.aboutmeimg` still works inside `<picture>`.

- [ ] **Step 12: Update `src/components/Navbar.svelte`**

Remove the import (line 2):
```ts
import { getImagePath } from "../utils/imagePath";
```

Replace the img tag (line 67-70):
```svelte
<img
  src={getImagePath("images/navbar/gorilla")}
  alt="logo gorilla"
/>
```
with:
```svelte
<picture>
  <source srcset="images/navbar/gorilla.avif" type="image/avif">
  <img src="images/navbar/gorilla.png" alt="logo gorilla" />
</picture>
```

- [ ] **Step 13: Update `src/components/01-Title/Parallax.svelte`**

Remove the import (line 4):
```ts
import { getImagePath } from "../../utils/imagePath";
```

Replace the three `<img>` patterns in the `{#each layers as layer}` loop. Since Parallax images are absolutely positioned, the `<picture>` wrapper needs no extra CSS - `<picture>` is layout-transparent and the `<img>` retains its positioning.

Layer 0 (line 54-62) - replace `src={getImagePath(...)}`:
```svelte
<picture>
  <source srcset="images/intro/00{layer}.avif" type="image/avif">
  <img
    style="transform: translateY(calc({boolShowContact
      ? getContactParallax(layer) * 0.7
      : (-scrollY * layer) / parallaxSpeedDivisor}px {boolShowContact
      ? '- ' + contentBorderRadius
      : ''})); opacity: {getLayerOpacity(layer)}"
    src="images/intro/00{layer}.png"
    alt="parallax layer {layer}"
  />
</picture>
```

Layers 1-2 (line 63-70):
```svelte
<picture>
  <source srcset="images/intro/00{layer}.avif" type="image/avif">
  <img
    loading="lazy"
    style="transform: translateY({(boolShowContact
      ? getContactParallax(layer)
      : (-scrollY * layer) / parallaxSpeedDivisor) + getLayerOffsetPx(layer)}px); opacity: {getLayerOpacity(layer)}"
    src="images/intro/00{layer}.png"
    alt="parallax layer {layer}"
  />
</picture>
```

Layers 4-10 (line 91-99):
```svelte
<picture>
  <source srcset="images/intro/00{layer - 1}.avif" type="image/avif">
  <img
    loading="lazy"
    style="transform: translateY({(boolShowContact
      ? getContactParallax(layer)
      : (-scrollY * (layer - 1)) / parallaxSpeedDivisor) + getLayerOffsetPx(layer)}px){getLayerScale(layer)}"
    src="images/intro/00{layer - 1}.png"
    alt="parallax layer {layer - 1}"
  />
</picture>
```

Note: The CSS rule `.parallax-container img` for absolute positioning still applies - `<picture>` doesn't break descendant selectors.

### Task 6.7: Delete old utility files

- [ ] **Step 14: Delete the three files**

```bash
rm src/utils/browser.ts
rm src/utils/imagePath.ts
rm src/utils/imagePath.test.ts
```

- [ ] **Step 15: Build and test**

Run: `npm run check`
Expected: Build succeeds, all tests pass. No remaining imports of `getImagePath` or `isBrowserSafari`.

Verify no dangling references:
```bash
grep -r "getImagePath\|isBrowserSafari\|imagePath\|browser.ts" src/
```
Expected: No matches.

- [ ] **Step 16: Visual verification**

Start dev server, navigate to `http://localhost:5173`. Verify at desktop (1440x900):
1. All career logos render correctly
2. All project images render correctly
3. Project video thumbnails (Voice Dictation, This Website) show the poster frame
4. About me portrait renders
5. Navbar gorilla logo renders
6. Parallax hero layers render with correct format

Then verify at mobile (375x812):
1. Career logos, project images, about me portrait all render
2. No broken image placeholders anywhere

Open DevTools Network tab and verify:
1. AVIF files are loaded in Chrome/Firefox (not PNGs)
2. The `<source>` negotiation is working

- [ ] **Step 17: Commit**

```bash
git add -A
git commit -m "Replace JS UA-sniffing image format selection with native <picture> elements

Removes browser.ts, imagePath.ts, and imagePath.test.ts.
The browser now negotiates AVIF vs PNG natively via <source type>,
eliminating JS from the format-selection critical path.
Renames imgurl -> imgBase across types, data, and components."
```

---

## Execution Strategy: Two-Phase Parallel Agents

```
Phase 1:
main ──[WS1: delete files]──┬──[WS2: agent in worktree]──┐
                             ├──[WS3: agent in worktree]──┤
                             ├──[WS4: agent in worktree]──├── merge all ── npm run check
                             └──[WS5: agent in worktree]──┘

Phase 2:
main ──[WS6: agent in worktree]── merge ── npm run check ── visual spot-check
```

### Phase 1
1. **Do WS1 first on main** (2 file deletes, 1 minute)
2. **Dispatch WS2, WS3, WS4, WS5 as 4 parallel agents**, each in an isolated worktree
   - WS2 and WS3 both touch `index.html` and `Parallax.svelte` but at different locations, so they merge cleanly
   - WS4 and WS5 touch completely independent files
3. **Merge all worktree branches back to main** sequentially
4. **Run `npm run check`** on main after all merges

### Phase 2
5. **Dispatch WS6 as a single agent** in an isolated worktree (it touches files modified by WS2 and WS3)
6. **Merge WS6 branch back to main**
7. **Run `npm run check`** on main
8. **Visual spot-check** at desktop (1440x900) and mobile (375x812) viewports

### Agent prompts should include:
- The exact workstream section from this plan
- File paths and line numbers
- The verification steps
- Instruction to commit with the specified message
- Instruction to run `npm run check` before committing

### Post-merge verification:
After all branches are merged to main:
- `npm run check` (build + tests)
- `npm run build` and compare bundle size to baseline (was 106.74 KB JS, 40.08 KB CSS)
- Visual check at desktop (1440x900) and mobile (375x812) viewports
- Verify no remaining references to `getImagePath`, `isBrowserSafari`, or `browser.ts`
