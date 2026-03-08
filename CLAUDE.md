# Personal Website

Svelte 5 portfolio site built with Vite, deployed on Vercel.

## Verification Workflow

### Always: `npm run check`
Run after every change. Catches broken imports, TS errors, and logic regressions. Cheap and fast.

### When changing visuals (spacing, colors, motion, layout):
1. Take a desktop screenshot at the start as a baseline
2. Make changes
3. Take a desktop screenshot to compare

### When changing responsive/layout code:
Also take a mobile screenshot (375x812) before and after.

### When changing semantic HTML, ARIA, or heading structure:
Also take an a11y snapshot (`take_snapshot`) to verify the tree.

### Don't bother with MCP for:
- Pure logic changes (utils, data) - tests cover these
- Refactors that don't change rendering
- Dependency updates

### Dev Server
- Port is pinned to **5173** (`strictPort: true` in vite.config.js)
- Before starting `npm run dev`, check if port 5173 is already in use: `lsof -i :5173 -t`
- Never start a second dev server - reuse the existing one

### MCP Commands Reference
Ensure dev server is running (`npm run dev`), then:
- `navigate_page` to http://localhost:5173
- `emulate` viewport `1440x900x1`, then `take_screenshot` for desktop
- `emulate` viewport `375x812x1,mobile,touch`, then `take_screenshot` for mobile
- `list_console_messages` to check for errors
- `take_snapshot` for accessibility tree

### Responsive Breakpoints
- Mobile: 375x812 (below SM_SCREEN_PX=768)
- Tablet: 768x1024 (breakpoint boundary)
- Desktop: 1440x900

### Pre-Deploy Check
Run `npm run check` (build + tests) before deploying.

## Testing

- Run all tests: `npx vitest run`
- Run specific test: `npx vitest run parallax`
- Watch mode: `npx vitest`
- Full check (build + tests): `npm run check`

## Project Structure

- `src/utils/` - Pure utility functions (parallax math, browser detection, image paths)
- `src/data/` - Static data for career cards and projects
- `src/components/` - Svelte components organized by section (01-Title, 02-AboutMe, etc.)
- `src/types/` - TypeScript interfaces
