# FOSS Interactive Journey

An interactive, presentation-style web experience introducing students to Free
and Open Source Software.

Built against [`docs/FOSS.prd`](docs/FOSS.prd) (product contract),
[`docs/rules.prd`](docs/rules.prd) (hard design constraints) and
[`docs/apple_design.md`](docs/apple_design.md) (principles only — none of its
tokens are used; this experience is dark, green-accented and photography-free).

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run typecheck
```

Everything is bundled: fonts are self-hosted and there are no runtime network
requests, so the experience works on a projector with no internet.

## Presenting

| Input | Action |
|---|---|
| Scroll / trackpad | Move through the journey |
| `↓` `→` `Space` `PageDown` | Next scene |
| `↑` `←` `PageUp` | Previous scene |
| `Home` / `End` | First / last scene |
| `P` | Presentation mode (fullscreen, hides presenter hints) |
| Progress rail (right) | Jump to any scene |

## Editing content

**All copy lives in [`src/data/`](src/data/) — no text is written inside
components.** The club can revise wording without touching component logic.

- [`src/data/content.ts`](src/data/content.ts) — every headline, body line and label
- [`src/data/technologies.ts`](src/data/technologies.ts) — the technology graph: nodes *and* the edges between them

A logo can replace the `FOSS` wordmark by setting `brand.logoSrc` in
`content.ts`; no layout changes are needed.

To add, remove or reorder scenes, edit
[`src/scenes/registry.ts`](src/scenes/registry.ts). It is the single source of
truth — scroll order, keyboard order, rail order and the two-digit ordinals are
all derived from it, so the navigation can never drift from the content.

## Architecture

```
src/
├── scenes/       registry.ts + the twelve scenes
├── components/   Scene stage, TerminalSequence, BranchConnectors, ProgressRail
├── three/        the WebGL layer + its d3-force layout
├── motion/       GSAP registration and shared easings
├── navigation/   keyboard, scene state, presentation mode
├── data/         all copy and the technology graph
└── styles/       design tokens (@theme)
```

**Pinning is CSS `position: sticky`, not ScrollTrigger's `pin`.** Sticky stays
on the compositor and injects no pin-spacer wrappers; GSAP's only job is to map
scroll distance onto each scene's timeline. There is no scroll hijacking and no
CSS scroll-snap (which cannot coexist with pinning).

**Motion ownership is strict.** GSAP owns the scroll spine and all scrubbed
timelines. Framer Motion owns discrete UI state only. No element is animated by
both.

**Reduced motion is resolved in one place** ([`src/components/Scene.tsx`](src/components/Scene.tsx)),
and every scene declares an explicit end state rather than simply skipping its
animation — content is never left hidden.

**3D renders only where it argues something.** One `<Canvas>`, in scene 04,
lazy-loaded in its own chunk, frozen (`frameloop="never"`) when off screen, with
an SVG fallback built from the same force layout when WebGL is unavailable. Its
rotation is driven by scroll and cursor only — nothing moves on its own.
