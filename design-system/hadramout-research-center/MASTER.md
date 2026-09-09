# Design System Master File — Hadramout Research Center

> **LOGIC:** When building a page, first check `design-system/hadramout-research-center/pages/<page>.md`.
> If it exists, its rules **override** this file. Otherwise follow this file.
>
> **AUTHORITY:** This is the machine‑retrievable summary. The full narrative + rationale
> lives in [`docs/design/`](../../docs/design/). If they disagree, `docs/design/` wins and
> this file is stale — reconcile it. Seeded from `ui-ux-pro-max --design-system`
> (2026‑09‑09), then rewritten to the S1‑signed‑off decisions.

**Project:** Hadramout Research Center · **Category:** university research institute
**Locales:** Arabic (default, RTL) + English (LTR) · **Dark mode:** system‑only (v1)
**Dials:** Variance 4 (balanced/editorial) · Motion 3 (subtle) · Density 3 (spacious)

---

## Style & pattern

- **Style:** Swiss / International Typographic — strict 12‑col grid, strong type
  hierarchy, generous whitespace, intentional asymmetry, minimal ornament.
- **Landing pattern:** *Trust & Authority + Conversion* —
  `Hero (mandate + credibility) → Pillars → What we do → Featured programs + Journal →
  Latest news → Audience paths → CTA band`.
- **One Hadrami motif** (8‑point star) used sparingly: header mark, favicon, OG, footer.
- **Not:** portfolio masonry, stock imagery, AI‑cream palette, emoji, numbered markers on
  non‑sequences, `cursor:pointer` on non‑interactive cards.

## Colour (verified — see `docs/design/05` matrix; `scripts/check-contrast.py`)

Semantic tokens, light → dark:

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#F8FAFC` | `#0A1420` |
| `--color-surface` | `#FFFFFF` | `#0F1E30` |
| `--color-surface-muted` | `#E9EEF5` | `#14283F` |
| `--color-text` | `#0F172A` | `#E7ECF3` |
| `--color-text-muted` | `#475569` | `#A9B6C6` |
| `--color-heading` | `#1E3A5F` | `#F2F5F9` |
| `--color-link` / `--color-accent` | `#854D0E` | `#E9B667` |
| `--color-primary` | `#1E3A5F` | `#3D6099` |
| `--color-on-primary` | `#FFFFFF` | `#FFFFFF` |
| `--color-on-accent` | `#FFFFFF` | `#0A1420` |
| `--color-border` (decorative) | `#CBD5E1` | `#24374F` |
| `--color-border-interactive` | `#64748B` | `#647CA6` |
| `--color-focus-ring` | `#1D4ED8` | `#7CA9FF` |
| `--color-success` / `--color-danger` / `--color-warning` | `#15803D` / `#DC2626` / `#B45309` | `#4ADE80` / `#F87171` / `#FBBF24` |

**Bronze rule:** `#A16207` (`--bronze-fill`) is fill / ≥24px graphic only. Text, links and
CTAs use `#854D0E` (6.9:1 on white). **One bronze CTA per view.** Status is always icon +
text, never colour alone.

## Typography (self‑hosted via `next/font`, subset AR+Latin, `swap`)

| Role | Family | Weights |
|---|---|---|
| Arabic display | **Amiri** | 400, 700 |
| Arabic body / UI | **IBM Plex Sans Arabic** | 400, 500, 600 |
| Latin display | **EB Garamond** | 500, 600, 700 |
| Latin body / UI | **Inter** | 400, 500, 600 |
| Data / numerals | **IBM Plex Mono** | 400, 500 |

- Scale ≈ 1.25, fluid `clamp()` (`docs/design/03` §2). Body 16px floor.
- Per‑script: AR line‑height 1.85 / heading 1.3, **zero** letter‑spacing; LA body 1.6.
- Measure: 46em (AR) / 66ch (LA). One `h1` per page.
- No `@import` of Google Fonts; no runtime font request.

## Spacing / radius / shadow / z

- Spacing: 8pt base + 4pt half‑steps (`--space-1..13` = 4…160px). Section gap 64→96→128.
- Radius: `sm 4 · md 8 · lg 14 · xl 22 · full`. Buttons/inputs `md`; cards `lg`.
- Shadow: `--shadow-1` (cards) → `--shadow-2` (hover) → `--shadow-3` (overlay). Dark
  variants use black alpha.
- Z: base 0 · sticky 20 · header 30 · overlay 40 · modal 50 · toast 60.

## Motion (Framer Motion — `docs/design/04`)

- Tokens: durations `80/160/240/360/500ms`; `--ease-out cubic-bezier(.16,1,.3,1)`;
  spring `{stiffness:170, damping:26}`.
- Scroll reveal: `opacity 0→1, y 24→0, 360ms, ease-out`; stagger `0.06`, ≤ 8 children.
- **Every** wrapper: `useReducedMotion()` → final state, no movement.
- Animate `transform`/`opacity` only. ≤ 2 key elements per viewport.

## Component rules (full specs: `docs/design/06`)

- **Button:** primary = `--color-accent` bg + `--color-on-accent`, `--radius-md`,
  min‑height 44px, `scale(.98)` on press. Secondary = navy. Ghost = interactive border.
- **Card:** `--color-surface`, hairline `--color-border`, `--shadow-1`, `--radius-lg`.
  `cursor:pointer` **only** if the whole card is a link. Hover → `--shadow-2`.
- **Field:** `--color-border-interactive`, 44px min‑height, visible `<label>`,
  `aria-describedby` errors, `aria-live` summary on submit‑fail.
- **Icons:** Lucide only, sizes 16/20/24, `currentColor`, directional glyphs flip in RTL,
  decorative → `aria-hidden`, icon‑only control → `aria-label`.
- **Focus:** `:focus-visible` → `0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-focus-ring)`.
  Never remove focus; never let sticky UI obscure it.

## Non‑negotiables (Pre‑delivery)

- [ ] WCAG 2.2 AA: contrast (matrix), keyboard, visible focus, reduced‑motion, SR semantics.
- [ ] Bilingual: AR + EN both present; RTL + LTR both verified; logical properties only.
- [ ] Responsive 320→1920 (check 375/768/1024/1440); no horizontal body scroll.
- [ ] Tokens only — no ad‑hoc hex/space/radius/shadow/duration.
- [ ] One `h1`/page; nested headings; semantic landmarks.
- [ ] No emoji icons; one icon family; official brand marks.
- [ ] Lighthouse mobile ≥ 95 all categories; images AVIF/WebP + dimensions; hero `priority` only.
- [ ] No content behind fixed header; wide content scrolls in its own container.
- [ ] No invented facts — unverified → `docs/content/content-review-checklist.md`.
