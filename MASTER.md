# Artie Sweetman — Portfolio v1 · Design Master

**Working name:** artiesweetman.com
**Purpose:** Statement-of-taste portfolio to land creative clients (artists, Ōtepoti Dunedin, NZ). The site *is* the proof — no work gallery in v1.
**Direction:** "Warm hard-editorial." *Bold structure, warm skin.* Two-state: at rest a printed art-direction magazine spread; on interaction, subtle powerful drift.

---

## Palette — Monochrome-plus-paper (never cold white)

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | `#F3EFE7` | bone base background |
| `--paper-2` | `#ECE6DA` | panels / hover fills |
| `--paper-3` | `#E3DCCC` | deepest paper / portrait bg |
| `--ink` | `#1A1712` | warm espresso near-black — display + body |
| `--ink-soft` | `#4A443B` | secondary text |
| `--ink-mute` | `#8C8477` | labels, numerals, meta |
| `--line` | `#CBC3B3` | structural grid + hairlines |
| `--line-soft` | `#DDD6C8` | faint grid rules |
| `--accent` | `#A2532B` | restrained rust — **© mark only** |

Background carries a faint 3px radial dot "paper tooth" so it never reads as flat screen-white.

## Type

- **Display / serif:** **Fraunces Variable** (opsz + real italics; warm, high-personality high-contrast serif) — all display words, section titles, statement/contact lines, italic accents.
- **Grotesque / sans:** **Archivo Variable** (neo-grotesque) — labels, nav, body, numerals, the "I make" contrast word.
- **Labels:** wide-tracked small-caps — `0.72rem`, `letter-spacing: 0.22em`, uppercase, `--ink-mute`.
- Fluid `clamp()` scale; display tops out ~200px (`--step-display`).
- Self-hosted via `@fontsource-variable/*` (no render-blocking external request → LCP/CLS safe).

## Structure

- 12-column grid, visible fixed **grid-line overlay** (the strongest "print, not website" cue). 6 rules on mobile.
- Numbered sections **01–04**: 01 Statement · 02 Approach · 03 Craft (+ editorial data table) · 04 Contact. Plus one clearly-marked, minimal **Future work / portfolio** placeholder (hatched empty slots).
- Big asymmetric whitespace; nothing centred/safe.

## Hero — TYPE-ONLY statement (v3)

- The hero is now a **finished, type-only typographic statement** — no image, nothing missing. Oversized Fraunces "quiet / homes / work" with an italic "for loud" accent, an Archivo "I make" lead-in, a `© 2026` signature mark anchoring the top-right, a quiet "scroll" cue, and big asymmetric whitespace on the visible grid. Rendered as an `<h1>` for accessibility ("I make quiet homes for loud work").
- **Why it reads complete, not empty:** the negative space at upper-right is *enclosed* by the © mark (top), the "quiet / homes" mass (left) and the "for loud" line (bottom), and the type sweeps on a diagonal down to "work" — deliberate composition, not a hole.

### Reintroducing a portrait LATER (no rebuild)
- **Reserved zone:** the **central whitespace channel** of `.hero__statement` — **columns ~5–9, rows 2–3**, ~**4:5** portrait. The display words are split left/right ("quiet"|"homes", "for loud"|"work") and already **flank this channel**, exactly as they flanked the frame in v2. It is intentional editorial negative space now; a portrait drops straight into it.
- The R3F files are **dormant, not deleted**: `src/components/hero/PortraitCanvas.tsx`, `DuotoneScene.tsx`, `duotoneShader.ts`, `heroScroll.ts`. To bring a portrait back:
  1. In `Hero.tsx`, add a `<div className="hero__portrait">` inside `.hero__statement` with `grid-column: 8 / 13; grid-row: 2 / 4; aspect-ratio: 4/5;` (see v2's `hero.css` `.hero__portrait` for the exact framed/duotone treatment).
  2. Mount `<PortraitCanvas>` inside it (lazy, desktop-only, in-view gated) and set the duotone `uMap` uniform to the portrait texture (`uHasMap = 1`).
  3. Optionally reclaim the scroll signal: re-add the `heroScroll` ScrollTrigger in `App.tsx` (replaced in v3 by the type-drift tween).
- Because the type already leaves that zone open, dropping the image in causes **no reflow** to the words.
- Copy line: *"I make quiet homes for loud work."*

## Motion (subtle · powerful · drifting)

- **ScrollSmoother** (`smooth: 1.35`, effects) — desktop + motion only.
- Hero: kinetic intro timeline (words drift up, `power4.out`, `stagger 0.09`, one at a time); scroll-linked drift now applied to the **type** (`.hero__statement` yPercent, `scrub`) instead of WebGL.
- **In-page navigation:** all `a[href^="#"]` clicks (nav, CTA, footer) are delegated to `smoothScrollTo()` → ScrollSmoother on desktop, native smooth/instant on mobile/reduced.
- Below-fold: quiet `ScrollTrigger.batch` fade-ups (`y26→0`, `power3.out`, `once`).
- Desktop-only trailing **cursor** (lagged ring + tight dot, `gsap.quickTo`).
- Eases: `power4.out` / `power3.out`, ~1.2–1.8s. Drift, don't fling.

## Guardrails

- **prefers-reduced-motion:** no `matchMedia` branch runs → final state, zero motion, no ScrollSmoother, no cursor, no canvas.
- **Mobile / touch:** strong STATIC editorial stack, light quick fade-ups, **no** ScrollSmoother, **no** pinned/horizontal scroll, **no** canvas, **no** cursor.
- **Perf:** Canvas code-split + lazy behind CSS poster; `frameloop` never↔always by in-view + tab-visible; `dpr [1,2]`; uniforms mutated in `useFrame` (never setState); explicit dims (CLS~0); self-hosted fonts.

## Stack

Vite + React + TS · three / @react-three/fiber / drei (dormant in v3, kept for future portrait) · gsap (ScrollTrigger, ScrollSmoother, @gsap/react) · @fontsource-variable. Dev port **5185** (v1 = 5183, v2 = 5184).
