# Color Consolidation - Path 2: Cyan + Peach

## Problem

The site has no color hierarchy. Every section title uses a different gradient, buttons use different gradient styles, aurora blobs introduce 5 competing accent colors, and there is no single "brand color." The result is visual noise that competes with the parallax illustration - the site's most distinctive asset.

## Goals

- Establish a two-accent color system derived from the parallax illustration
- Unify interactive elements (buttons, links, active states) to one color family
- Keep sectional personality in titles without the current gradient chaos
- Make aurora blobs atmospheric rather than attention-competing
- Clean up unused CSS custom properties

## Non-Goals

- Changing the parallax illustration
- Redesigning the contact section layout (desktop white background stays)
- Changing glass card styling or white text opacity hierarchy

---

## Color Palette

| Role | Value | Illustration source |
|---|---|---|
| Primary accent | `#6dd5fa` (bright cyan) | Cyan rock layer (004), aurora blobs |
| Emphasis | `#f0c8a0` (soft peach-gold) | Sky gradient warm band (layer 000) |
| Background | `#040d21` (deep navy) | No change (`--darkblue`) |
| Base blue | `rgb(6, 0, 87)` | No change (`--blue`) |

### Why these colors

- **`#6dd5fa` over `#64acff`**: Brighter, more saturated, ~8.3:1 contrast on `#040d21` (AAA). Already proven in the codebase (`--gradient-cool-sky` endpoint, blob colors). The extra green pushes it toward the cyan rocks in the illustration, creating a stronger visual link. More distinctive than the generic `#64acff` that appears on half of dark-mode portfolios.
- **`#f0c8a0` over `#f0b866`**: Pulled from the sky gradient's peach-to-gold transition. Softer and warmer than the current gold, reads as "sunset warmth" rather than "caution tape." ~8.5:1 contrast on dark navy.

---

## Section Titles - Same Family, Different Temperatures

Each section keeps its own gradient, but all gradients now live in the cyan-blue-periwinkle family. This preserves scroll rhythm while reading as one cohesive palette.

| Section | New gradient | Hex endpoints | Personality |
|---|---|---|---|
| About Me | White to periwinkle | `white 50% -> #c8b8e8 80%` | Personal, warm-cool |
| Career | White to cyan | `white 50% -> #6dd5fa 80%` | Crisp, professional |
| Testimonials | White to soft sky | `white 50% -> #9bb8e8 80%` | Softer, reflective |
| Projects | White to bright blue | `white 50% -> #64acff 80%` | Standard, technical |

All use the same `315deg` angle and stop positions as the current `--gradient-cool-sky` base. The global default in `h2.section-title` stays as white-to-cyan. Per-section overrides only change the endpoint color.

### Variables

Replace the current gradient zoo with:

```css
--gradient-title-base: linear-gradient(315deg, white 50%, #6dd5fa 80%);
--gradient-title-periwinkle: linear-gradient(315deg, white 50%, #c8b8e8 80%);
--gradient-title-sky: linear-gradient(315deg, white 50%, #9bb8e8 80%);
--gradient-title-blue: linear-gradient(315deg, white 50%, #64acff 80%);
```

### Impact Metrics

Metric values currently use `--gradient-cool-sky`. Replace with `--gradient-title-base` (same color, just renamed for consistency).

### Testimonial Quote Marks

TestimonialCard `::before` currently uses `--gradient-cool-sky`. Replace with `--gradient-title-base`.

---

## Buttons & Navigation - Unified to Primary Accent

| Element | Current | New |
|---|---|---|
| Navbar active underline | `--gradient-button-red-blue` (red-teal animated) | Solid `#6dd5fa` |
| Resume button | `--gradient-button-red-blue` (red-teal animated) | `--gradient-button` (cyan animated) |
| Say Hello (GradientButton) | `--gradient-button-blue-purple` (cyan-purple animated) | `--gradient-button` (cyan animated) |

One button gradient variable:

```css
--gradient-button: linear-gradient(to right, #6dd5fa 0%, #4a9ae0 51%, #6dd5fa 100%);
```

This keeps the animated background-position shift that the current buttons use (the `background-size: 200%` + hover slide pattern), but in the cyan family instead of red-teal or cyan-purple.

---

## Bold Text Highlights

`--bold-highlight` changes from `#f0b866` (gold) to `#f0c8a0` (peach-gold).

Used in: `BulletList.svelte`, `CardProject.svelte`, `CardProjectCompact.svelte`.

---

## Aurora Blobs

Currently: 12 blobs across 3 groups with 5 colors (cyan, pink, purple, orange, blue) at 0.2-1.0 opacity with screen blend mode.

### Changes

- **Keep**: Blue and purple blobs (already cohesive with dark background)
- **Keep**: Cyan blobs (matches primary accent)
- **Mute, don't remove**: Pink blobs shift toward lavender (reduce saturation, shift hue). Orange blobs reduce opacity significantly.
- **Overall**: Reduce max opacity by ~30%

Specific blob color changes:

| Blob | Current | New |
|---|---|---|
| Cyan (1, 6, 10) | `rgba(109, 213, 250, ...)` | Keep as-is, reduce opacity ~20% |
| Pink (2, 7) | `rgba(252, 165, 241, ...)` | Shift to lavender: `rgba(200, 170, 230, ...)`, reduce opacity ~30% |
| Purple (3, 8) | `rgba(142, 45, 226, ...)` | Keep hue, reduce opacity ~20% |
| Orange (4, 9, 12) | `rgba(240, 184, 102, ...)` | Mute to warm peach: `rgba(220, 180, 160, ...)`, reduce opacity ~40% |
| Blue (5, 11) | `rgba(5, 117, 230, ...)` | Keep as-is, reduce opacity ~20% |

This preserves thermal continuity (warm illustration -> slightly warm mid-section -> warm illustration) without the current rainbow effect.

### Ambient Orbs

Same treatment as aurora blobs - shift toward blue-purple-cyan family, mute warm tones, reduce opacity.

---

## One-Off Color Fixes

| Element | Current | New |
|---|---|---|
| Portrait hover shadow (AboutMe) | `#6dd5fa` | Keep (matches primary accent) |
| Featured project image glow (ProjectInstance) | `rgb(237, 78, 80)` (red-orange) | Shift to `#6dd5fa` (primary accent) |
| Project link color (CardProject, CardProjectCompact) | `#64acff` | Change to `#6dd5fa` (primary accent) |
| Active filter tab border (Projects) | `rgba(100, 172, 255, 0.7)` | `rgba(109, 213, 250, 0.7)` (primary accent at 70%) |
| Active filter tab background (Projects) | `rgba(100, 172, 255, 0.15)` | `rgba(109, 213, 250, 0.15)` |
| Career subtitle text | `rgb(200, 200, 200)` | `rgba(255, 255, 255, 0.78)` (use opacity system) |

---

## Title Mobile

Currently uses `--gradient-mint-blue-dark`: `linear-gradient(-70deg, #a2facf 0%, #64acff 100%)`.

Change endpoint from `#64acff` to `#6dd5fa` to match primary accent. Keep the mint start color - the hero title is a special element and the mint-to-cyan sweep is distinctive.

```css
--gradient-mint-blue-dark: linear-gradient(-70deg, #a2facf 0%, #6dd5fa 100%);
```

---

## CSS Cleanup

### Retire (replaced by new system)

After migration, remove:

- `--gradient-cool-sky` (replaced by `--gradient-title-base`)
- `--gradient-bora-bora` (replaced by `--gradient-title-sky` or similar)
- `--gradient-pink-blue` (replaced by `--gradient-title-periwinkle`)
- `--gradient-relaxing-red` (replaced by `--gradient-title-blue`)
- `--gradient-button-red-blue` (replaced by `--gradient-button`)
- `--gradient-button-blue-purple` (replaced by `--gradient-button`)

---

## Contact Section

### Desktop

Stays as-is (white background with parallax illustration). The illustration colors already align with the new palette since the palette was derived from it.

### Mobile

Currently uses `linear-gradient(109.6deg, rgba(62, 161, 219, 1) 11.2%, rgba(93, 52, 236, 1) 100.2%)` (blue to purple). This is already in the cool family and doesn't conflict. No change needed.

---

## What Stays Unchanged

- Parallax illustration (all 10 layers)
- Glass card styling (`rgba(255, 255, 255, 0.03/0.05/0.08/0.15)`)
- White text opacity hierarchy (1.0 / 0.6 / 0.4 for primary / secondary / muted)
- Dark background colors (`--blue`, `--darkblue`)
- Contact section layout
- Card border styling

---

## Files Changed

| File | Change |
|---|---|
| `public/global.css` | New palette variables, retire old gradients, update `h2.section-title` base |
| `src/components/02-AboutMe.svelte` | Section title gradient override -> `--gradient-title-periwinkle` |
| `src/components/03-Career.svelte` | Remove section title gradient override (inherits `--gradient-title-base` from global) |
| `src/components/03b-Testimonials/Testimonials.svelte` | Section title gradient override -> `--gradient-title-sky` |
| `src/components/03b-Testimonials/TestimonialCard.svelte` | Quote mark gradient -> `--gradient-title-base` |
| `src/components/04-Projects.svelte` | Section title gradient override -> `--gradient-title-blue`, filter tab colors |
| `src/components/02b-ImpactMetrics.svelte` | Metric value gradient -> `--gradient-title-base` |
| `src/components/01-Title/TitleMobile.svelte` | Update `--gradient-mint-blue-dark` endpoint |
| `src/components/Navbar.svelte` | Replace button-red-blue with primary accent |
| `src/components/Button/GradientButton.svelte` | Replace button-blue-purple with new `--gradient-button` |
| `src/components/AuroraBackground.svelte` | Mute blob colors and reduce opacity |
| `src/components/AmbientOrbs.svelte` | Same blob treatment |
| `src/components/04-Projects/ProjectInstance.svelte` | Featured project glow color |
| `src/components/Cards/CardProject.svelte` | Link color to primary accent |
| `src/components/Cards/CardProjectCompact.svelte` | Link color to primary accent |
| `src/components/Cards/CardCareer.svelte` | Subtitle text to opacity system |
