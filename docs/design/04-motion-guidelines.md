# Motion Guidelines — FINAL (Sprint 1) · impl revised S3

> Signed off S1-T05. Source: `ui-ux-pro-max --domain gsap` (timing/easing reference) +
> `--domain ux` (animation rules). Demo: `docs/design/specimen.html` §Motion.
>
> **S3 change:** implementation moved from **Framer Motion → CSS transitions** driven by
> one tiny `<Reveal>` client component. Reason: `motion` added ~40 KB and one hydrated
> island per section (6 on Home), pushing TBT to ~940 ms. CSS reveal recovered LCP
> ~6.6 s → ~3.3 s. The `motion` package was removed. The *design* (what animates, timing,
> easing, reduced‑motion behaviour) is unchanged. Logged in `design/00` §9.

## Implementation — `<Reveal>` (CSS)

`src/components/motion/reveal.tsx` — `'use client'`, no dependencies:

- Renders children **visible** (no-JS / reduced-motion / SEO safe).
- `useEffect` on mount: bail if `prefers-reduced-motion` or no `IntersectionObserver`;
  bail if the element is **already at/above the fold** (so it's never hidden even for a
  frame — no flash). Otherwise set `data-reveal` and observe.
- On intersect → set `data-shown`, disconnect the observer.
- `stagger` prop → `data-reveal-stagger`; CSS staggers `> *` by 60 ms (`nth-child`, cap 8).

CSS (`src/styles/globals.css`, under `@media (prefers-reduced-motion: no-preference)`):
`[data-reveal]` = `translateY(14px)` **only — opacity stays 1** so the resting state is
fully visible (thumbnail / find‑in‑page / screen‑reader safe, and contrast‑valid before
the observer fires). `[data-shown]` = `translateY(0)`. Stagger delays 60 ms per child via
`nth-child`. `RevealList` = `<Reveal stagger>`.

Timing/easing come from the tokens (`--duration-slow/base`, `--ease-out`).

## Philosophy

Motion here is **quiet and functional**. It orients (where did this come from?), confirms
(that worked), and guides the eye down an editorial page — nothing decorative, nothing
that delays reading. This is an academic institution; restraint *is* the brand.

## Non‑negotiables

1. **Reduced motion first.** Every animation checks `useReducedMotion()`. When reduced:
   render the final state immediately, keep only opacity crossfades ≤ 150ms (or none).
2. **Transform + opacity only.** Never animate `width/height/top/left/margin` → no CLS.
3. **≤ 2 animated key elements per viewport.** Stagger ≤ 8 items.
4. **Interruptible.** User scroll/tap cancels; never block input; never depend on an
   `onAnimationComplete` for correctness.
5. **One rhythm.** All motion uses the shared duration + easing tokens. No one‑off numbers.

## Tokens (from `02-design-tokens.md`)

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 80ms | color/opacity hover |
| `--duration-fast` | 160ms | press feedback, small state changes |
| `--duration-base` | 240ms | most enter/exit, disclosure, tab |
| `--duration-slow` | 360ms | hero entrance, section reveal |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | elements arriving |
| `--ease-in` | `cubic-bezier(0.7,0,0.84,0)` | elements leaving |
| `--spring-soft` | stiffness 170 / damping 26 | playful‑but‑subtle (cards, toggles) |

Exit ≈ 60–70% of enter duration. Forward nav animates start→end (LTR) / end→start (RTL);
back reverses.

## Patterns

### 1. Scroll reveal (primary page motion)

Framer Motion equivalent of the skill's Standard tier
(`opacity 0→1, y 24→0, duration 0.4–0.5s, ease-out, stagger 0.08`):

```tsx
// components/motion/Reveal.tsx  (client)
const prefersReduced = useReducedMotion();
<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
/>
```

- `<Stagger>` wraps a list: parent `staggerChildren: 0.06`, max 8, then the rest appear
  with the last.
- Scope observers to the section; `once: true`.

### 2. Hero entrance (home only)

- Kicker → headline → sub → CTA, staggered ~0.08, total ≤ 0.6s.
- Optional: headline word‑by‑word fade (not char‑by‑char), reduced‑motion → plain.
- Background motif: a very slow, ≤ 8px parallax drift, disabled on reduced motion and on
  touch. No parallax on text.

### 3. Micro‑interactions

| Element | Motion |
|---|---|
| Button | `--duration-fast` bg/opacity on hover; scale 0.98 on press (spring‑soft); restore on release |
| Card (clickable) | hairline→border color + `--shadow-1`→`--shadow-2` on hover, `--duration-base`; scale 0.99 press |
| Link | underline offset/opacity `--duration-instant` |
| Icon toggle (menu, disclosure) | rotate/cross‑fade `--duration-base`, `--ease-inout` |
| Focus ring | appears instantly (no animation) |

### 4. Overlays (mobile nav sheet, dialog)

- Sheet: slide from the inline‑start edge + backdrop fade, `--duration-base`, `--ease-out`;
  exit `--ease-in` at ~0.7×. Focus trap; `Esc` + backdrop close; restore focus to trigger.
- Dialog: scale 0.96→1 + fade from the trigger's direction.
- Backdrop blur only to signal dismissal, not decoration.

### 5. State transitions

- Disclosure/accordion: animate `height` via Framer's `AnimatePresence` + measured
  layout (`layout` prop) — acceptable exception to "no height" because FM does it on the
  compositor via `transform` where possible; test for CLS, fall back to instant if janky.
- Filter results: crossfade the grid (`AnimatePresence`, `mode="popLayout"`), announce
  count via a polite live region.
- Route change: fade `main` in over `--duration-base`; move focus to `main`.

## Testing motion (per Page DoD)

- [ ] With `prefers-reduced-motion: reduce`: content fully readable immediately, no
      movement beyond a ≤150ms fade.
- [ ] Rapid scroll / rapid toggle doesn't leave elements stuck mid‑state.
- [ ] No layout shift attributable to animation (CLS check).
- [ ] 60fps on a mid‑range Android (throttled CPU 4×).
- [ ] RTL: directional animations mirror correctly.

## S1 checklist

- [ ] Confirm the token values feel right on device.
- [ ] Build `Reveal`, `Stagger`, `ParallaxLite` reference implementations.
- [ ] Decide hero headline treatment (word fade vs none).
- [ ] Decide accordion approach (FM layout vs instant).
