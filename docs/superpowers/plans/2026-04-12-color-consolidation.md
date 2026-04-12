# Color Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the site's color system from 5+ competing accents to two illustration-derived colors (`#6dd5fa` cyan primary, `#f0c8a0` peach emphasis), with same-family-different-temperature section title gradients.

**Architecture:** Replace all gradient variables in `global.css` with a new naming system (`--gradient-title-*`, `--gradient-button`). Update each component that references old variables. Mute aurora blob warm tones instead of removing them. All changes are CSS-only - no structural or logic changes.

**Tech Stack:** Svelte 5, CSS custom properties, Vite dev server on port 5173

**Spec:** `docs/superpowers/specs/2026-04-12-color-consolidation-design.md`

**Verification:** After each visual task, run `npm run check` to catch TS/build errors. After all tasks, take desktop (1440x900) and mobile (375x812) screenshots to compare before/after.

---

### Task 1: Replace CSS custom properties in global.css

**Files:**
- Modify: `public/global.css:55-87` (`:root` block)
- Modify: `public/global.css:129` (`h2.section-title` background-image)

- [ ] **Step 1: Replace the `:root` variable block**

Replace lines 55-87 in `public/global.css`:

```css
:root {
    --blue: rgb(6, 0, 87);
    --darkblue: #040d21;
    --bold-highlight: #f0b866;
    /* gradients for text */
    --gradient-cool-sky: linear-gradient(315deg, white 50%, #6dd5fa 80%);
    --gradient-bora-bora: linear-gradient(315deg, #eaecc6 45%, #2bc0e4);
    --gradient-pink-blue: linear-gradient(
        68.6deg,
        rgba(252, 165, 241, 1) 1.8%,
        rgba(181, 255, 255, 1)
    );
    --gradient-relaxing-red: linear-gradient(315deg, #fffbd5 40%, #b20a2c);
    --gradient-mint-blue-dark: linear-gradient(
        -70deg,
        #a2facf 0%,
        #64acff 100%
    );

    /* button gradients */
    --gradient-button-red-blue: linear-gradient(
        to right,
        #fc354c 0%,
        #0abfbc 51%,
        #fc354c 100%
    );
    --gradient-button-blue-purple: linear-gradient(
        to right,
        #24c6dc 0%,
        #514a9d 51%,
        #24c6dc 100%
    );
}
```

With:

```css
:root {
    --blue: rgb(6, 0, 87);
    --darkblue: #040d21;
    --bold-highlight: #f0c8a0;

    /* section title gradients - same family, different temperatures */
    --gradient-title-base: linear-gradient(315deg, white 50%, #6dd5fa 80%);
    --gradient-title-periwinkle: linear-gradient(315deg, white 50%, #c8b8e8 80%);
    --gradient-title-sky: linear-gradient(315deg, white 50%, #9bb8e8 80%);
    --gradient-title-blue: linear-gradient(315deg, white 50%, #64acff 80%);

    /* hero title gradient */
    --gradient-mint-cyan: linear-gradient(-70deg, #a2facf 0%, #6dd5fa 100%);

    /* button gradient */
    --gradient-button: linear-gradient(
        to right,
        #6dd5fa 0%,
        #4a9ae0 51%,
        #6dd5fa 100%
    );
}
```

- [ ] **Step 2: Update the `h2.section-title` base rule**

In `public/global.css`, line 129, change:

```css
    background-image: var(--gradient-cool-sky);
```

To:

```css
    background-image: var(--gradient-title-base);
```

- [ ] **Step 3: Run check**

Run: `npm run check`
Expected: PASS (no components reference old variables yet - they'll be updated in subsequent tasks)

Note: This will temporarily break components that reference removed variables (`--gradient-pink-blue`, `--gradient-bora-bora`, etc.). The build may warn but shouldn't fail since CSS custom properties degrade gracefully. Subsequent tasks fix each reference.

- [ ] **Step 4: Commit**

```bash
git add public/global.css
git commit -m "Replace color palette variables with consolidated cyan+peach system"
```

---

### Task 2: Update section title gradients per component

**Files:**
- Modify: `src/components/02-AboutMe.svelte:124-127`
- Modify: `src/components/03-Career.svelte:44-46`
- Modify: `src/components/03b-Testimonials/Testimonials.svelte:18-20`
- Modify: `src/components/04-Projects.svelte:105-107`

- [ ] **Step 1: Update About Me section title**

In `src/components/02-AboutMe.svelte`, line 126, change:

```css
      background-image: var(--gradient-pink-blue);
```

To:

```css
      background-image: var(--gradient-title-periwinkle);
```

- [ ] **Step 2: Remove Career section title override**

In `src/components/03-Career.svelte`, remove lines 44-46 entirely:

```css
  :global(h2.section-title) {
    background-image: var(--gradient-cool-sky);
  }
```

Career now inherits `--gradient-title-base` (white to cyan) from the global `h2.section-title` rule, which is the same color the Career section was already using.

- [ ] **Step 3: Update Testimonials section title**

In `src/components/03b-Testimonials/Testimonials.svelte`, line 19, change:

```css
    background-image: var(--gradient-bora-bora);
```

To:

```css
    background-image: var(--gradient-title-sky);
```

- [ ] **Step 4: Update Projects section title**

In `src/components/04-Projects.svelte`, line 106, change:

```css
      background-image: var(--gradient-relaxing-red);
```

To:

```css
      background-image: var(--gradient-title-blue);
```

- [ ] **Step 5: Update Impact Metrics gradient**

In `src/components/02b-ImpactMetrics.svelte`, line 85, change:

```css
        background-image: var(--gradient-cool-sky);
```

To:

```css
        background-image: var(--gradient-title-base);
```

- [ ] **Step 6: Update Testimonial quote mark gradient**

In `src/components/03b-Testimonials/TestimonialCard.svelte`, line 33, change:

```css
      background-image: var(--gradient-cool-sky);
```

To:

```css
      background-image: var(--gradient-title-base);
```

- [ ] **Step 7: Run check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/02-AboutMe.svelte src/components/03-Career.svelte src/components/03b-Testimonials/Testimonials.svelte src/components/03b-Testimonials/TestimonialCard.svelte src/components/04-Projects.svelte src/components/02b-ImpactMetrics.svelte
git commit -m "Unify section title gradients to cyan-blue family with per-section temperatures"
```

---

### Task 3: Update buttons and navigation

**Files:**
- Modify: `src/components/Navbar.svelte:157,184`
- Modify: `src/components/Button/GradientButton.svelte:12`

- [ ] **Step 1: Update Navbar active underline**

In `src/components/Navbar.svelte`, line 157, change:

```css
        background: var(--gradient-button-red-blue);
```

To:

```css
        background: #6dd5fa;
```

- [ ] **Step 2: Remove the underline background-size**

In `src/components/Navbar.svelte`, line 158, remove:

```css
        background-size: 200% auto;
```

The animated `background-size` was for the red-blue gradient slide effect. A solid color doesn't need it.

- [ ] **Step 3: Update Navbar resume button**

In `src/components/Navbar.svelte`, line 184, change:

```css
      background-image: var(--gradient-button-red-blue);
```

To:

```css
      background-image: var(--gradient-button);
```

- [ ] **Step 4: Update GradientButton (Say Hello)**

In `src/components/Button/GradientButton.svelte`, line 12, change:

```css
    background-image: var(--gradient-button-blue-purple);
```

To:

```css
    background-image: var(--gradient-button);
```

- [ ] **Step 5: Run check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.svelte src/components/Button/GradientButton.svelte
git commit -m "Unify button and nav gradients to cyan accent"
```

---

### Task 4: Update Title Mobile gradient

**Files:**
- Modify: `src/components/01-Title/TitleMobile.svelte:82,89,93`

- [ ] **Step 1: Replace all `--gradient-mint-blue-dark` references**

In `src/components/01-Title/TitleMobile.svelte`, replace all 3 occurrences of:

```css
        background-image: var(--gradient-mint-blue-dark);
```

With:

```css
        background-image: var(--gradient-mint-cyan);
```

These are at lines 82, 89, and 93.

- [ ] **Step 2: Run check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/01-Title/TitleMobile.svelte
git commit -m "Update mobile title gradient to use renamed mint-cyan variable"
```

---

### Task 5: Update one-off colors in project cards and career cards

**Files:**
- Modify: `src/components/Cards/CardProject.svelte:66`
- Modify: `src/components/Cards/CardProjectCompact.svelte:144`
- Modify: `src/components/Cards/CardCareer.svelte:114`
- Modify: `src/components/04-Projects/ProjectInstance.svelte:93`
- Modify: `src/components/04-Projects.svelte:139-140`

- [ ] **Step 1: Update CardProject link color**

In `src/components/Cards/CardProject.svelte`, line 66, change:

```css
      color: #64acff;
```

To:

```css
      color: #6dd5fa;
```

- [ ] **Step 2: Update CardProjectCompact link color**

In `src/components/Cards/CardProjectCompact.svelte`, line 144, change:

```css
      color: #64acff;
```

To:

```css
      color: #6dd5fa;
```

- [ ] **Step 3: Update CardCareer subtitle to opacity system**

In `src/components/Cards/CardCareer.svelte`, line 114, change:

```css
      color: rgb(200, 200, 200);
```

To:

```css
      color: rgba(255, 255, 255, 0.78);
```

- [ ] **Step 4: Update ProjectInstance featured image glow**

In `src/components/04-Projects/ProjectInstance.svelte`, line 93, change:

```css
      box-shadow: 0 0 65px rgb(237 78 80), 0 0 0 1px rgb(255 255 255 / 10%),
```

To:

```css
      box-shadow: 0 0 65px rgb(109 213 250 / 70%), 0 0 0 1px rgb(255 255 255 / 10%),
```

The `rgb(109 213 250)` is `#6dd5fa` (primary accent). Added 70% opacity to keep the glow soft rather than overpowering.

- [ ] **Step 5: Update Projects filter tab active colors**

In `src/components/04-Projects.svelte`, line 139, change:

```css
        border-color: rgba(100, 172, 255, 0.7);
```

To:

```css
        border-color: rgba(109, 213, 250, 0.7);
```

And line 140, change:

```css
        background: rgba(100, 172, 255, 0.15);
```

To:

```css
        background: rgba(109, 213, 250, 0.15);
```

- [ ] **Step 6: Run check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/Cards/CardProject.svelte src/components/Cards/CardProjectCompact.svelte src/components/Cards/CardCareer.svelte src/components/04-Projects/ProjectInstance.svelte src/components/04-Projects.svelte
git commit -m "Align one-off colors to primary accent and opacity system"
```

---

### Task 6: Mute aurora blob colors and reduce opacity

**Files:**
- Modify: `src/components/AuroraBackground.svelte` (blob CSS, 12 blobs)
- Modify: `src/components/AmbientOrbs.svelte` (orb data arrays)

The spec calls for: keep cyan/blue/purple hues, shift pink toward lavender, mute orange to warm peach, reduce all opacities.

- [ ] **Step 1: Update AuroraBackground blob colors**

In `src/components/AuroraBackground.svelte`, update each blob's CSS. The blobs use `radial-gradient` with the color at full opacity in the center, then fading. Update the color value AND the `opacity` property for each blob.

**Cyan blobs (1, 6, 10):** Keep color `rgba(109, 213, 250, ...)`, reduce opacity by ~20%:
- Blob 1: opacity `0.4` -> `0.32`
- Blob 6: opacity `0.4` -> `0.32`
- Blob 10: opacity `0.38` -> `0.30`

**Pink blobs (2, 7):** Shift to lavender `rgba(200, 170, 230, ...)`, reduce opacity by ~30%:
- Blob 2: color `rgba(252, 165, 241, ...)` -> `rgba(200, 170, 230, ...)`, opacity `0.35` -> `0.24`
- Blob 7: color `rgba(252, 165, 241, ...)` -> `rgba(200, 170, 230, ...)`, opacity `0.4` -> `0.28`

**Purple blobs (3, 8):** Keep color `rgba(142, 45, 226, ...)`, reduce opacity by ~20%:
- Blob 3: opacity `0.3` -> `0.24`
- Blob 8: opacity `0.4` -> `0.32`

**Orange blobs (4, 9, 12):** Mute to warm peach `rgba(220, 180, 160, ...)`, reduce opacity by ~40%:
- Blob 4: color `rgba(240, 184, 102, ...)` -> `rgba(220, 180, 160, ...)`, opacity `0.38` -> `0.23`
- Blob 9: color `rgba(240, 184, 102, ...)` -> `rgba(220, 180, 160, ...)`, opacity `0.35` -> `0.21`
- Blob 12: color `rgba(240, 184, 102, ...)` -> `rgba(220, 180, 160, ...)`, opacity `0.38` -> `0.23`

**Blue blobs (5, 11):** Keep color `rgba(5, 117, 230, ...)`, reduce opacity by ~20%:
- Blob 5: opacity `0.42` -> `0.34`
- Blob 11: opacity `0.4` -> `0.32`

For each blob, the `radial-gradient` has two color stops using the same RGB values at different alpha values. Update both stops to match the new RGB values. For example, blob 2 currently has:

```css
background: radial-gradient(circle, rgba(252, 165, 241, 1) 0%, rgba(252, 165, 241, 0.4) 50%, transparent 70%);
```

Change to:

```css
background: radial-gradient(circle, rgba(200, 170, 230, 1) 0%, rgba(200, 170, 230, 0.4) 50%, transparent 70%);
```

- [ ] **Step 2: Update AmbientOrbs desktop orb colors**

In `src/components/AmbientOrbs.svelte`, update the `DESKTOP_ORBS` array. Each orb has a `color` property as an rgba string:

```
Orb 1 (Cyan):   rgba(109, 213, 250, 0.35) -> rgba(109, 213, 250, 0.28)
Orb 2 (Pink):   rgba(252, 165, 241, 0.30) -> rgba(200, 170, 230, 0.20)
Orb 3 (Purple): rgba(142, 45, 226, 0.28)  -> rgba(142, 45, 226, 0.22)
Orb 4 (Orange): rgba(240, 184, 102, 0.20) -> rgba(220, 180, 160, 0.12)
Orb 5 (Blue):   rgba(5, 117, 230, 0.32)   -> rgba(5, 117, 230, 0.26)
```

- [ ] **Step 3: Update AmbientOrbs mobile orb colors**

In `src/components/AmbientOrbs.svelte`, update the `MOBILE_ORBS` array:

```
Orb 1 (Cyan):   rgba(109, 213, 250, 0.28) -> rgba(109, 213, 250, 0.22)
Orb 2 (Pink):   rgba(252, 165, 241, 0.24) -> rgba(200, 170, 230, 0.16)
Orb 3 (Purple): rgba(142, 45, 226, 0.22)  -> rgba(142, 45, 226, 0.18)
Orb 4 (Blue):   rgba(5, 117, 230, 0.28)   -> rgba(5, 117, 230, 0.22)
```

- [ ] **Step 4: Run check**

Run: `npm run check`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/AuroraBackground.svelte src/components/AmbientOrbs.svelte
git commit -m "Mute aurora blobs: shift warm tones to lavender/peach, reduce all opacities"
```

---

### Task 7: Visual verification

**Files:** None (verification only)

- [ ] **Step 1: Run full check**

Run: `npm run check`
Expected: PASS with no errors

- [ ] **Step 2: Verify dev server is running**

Run: `lsof -i :5173 -t`
If no output, start with: `npm run dev` (in background)

- [ ] **Step 3: Take desktop screenshot**

Navigate to `http://localhost:5173`, emulate viewport `1440x900x1`, take a full-page screenshot. Verify:

- Section titles show distinct but related cool gradients (periwinkle, cyan, soft sky, blue)
- Navbar resume button and active underline are in cyan family
- Impact metric numbers are cyan gradient
- Bold highlights in cards are soft peach (not gold)
- Aurora blobs are muted and blue-purple dominant
- Featured project image glow is cyan (not red-orange)
- Filter tabs active state is cyan

- [ ] **Step 4: Take mobile screenshot**

Emulate viewport `375x812x1,mobile,touch`, take viewport screenshot. Verify:

- Mobile title gradient is mint-to-cyan
- GradientButton (Say Hello) uses cyan gradient
- Blobs are subtle, not overpowering

- [ ] **Step 5: Prompt user for visual review**

Show both screenshots to the user. The blob opacity values are tuning parameters - if they're too subtle or too strong, they can be adjusted in a follow-up commit.
