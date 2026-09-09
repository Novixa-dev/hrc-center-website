# Typography System — FINAL (Sprint 1)

> Signed off S1-T03. Decisions below are binding for the build. On‑device re‑check happens
> in S2 once `next/font` is wired; any tuning is logged in `00-design-brief.md` §9.

## 1. Families — decided

| Script | Role | Family | Weights loaded | Rationale |
|---|---|---|---|---|
| Arabic | Display / headings | **Amiri** | 400, 700 | A revival of the Būlāq / Amiria Press Naskh (Cairo). Carries the scholarly gravitas a Hadrami university institute earns; unmistakably rooted, not generic. |
| Arabic | Body / UI | **IBM Plex Sans Arabic** | 400, 500, 600 | Modern, even colour, renders cleanly at small sizes on screen; keeps running text contemporary against Amiri's classical display. |
| Latin | Display / headings | **EB Garamond** | 500, 600, 700 | Old‑style, pen‑drawn axis shared with Naskh — an honest pairing with Amiri rather than a contrast. |
| Latin | Body / UI | **Inter** | 400, 500, 600 | Neutral, legible, small footprint. Latin is the secondary script and mostly UI + EN prose; personality is carried by Amiri + EB Garamond, so the Latin body face stays quiet by design. |
| Both | Data / numerals / code | **IBM Plex Mono** | 400, 500 | Tabular figures for phone numbers, dates, coordinates, stats; shares the IBM Plex family with the Arabic body face → system coherence. |

Rejected: Noto Naskh Arabic for display (more neutral, less character — kept only as the
Amiri fallback); Atkinson Hyperlegible for Latin body (a11y‑forward but distinctive
letterforms fight the quiet‑Latin intent — kept as a fallback if S8 a11y review flags
Inter legibility, which at our size/contrast/line‑height it should not).

All five are **SIL OFL 1.1**. Self‑host via `next/font` (build‑time, no runtime request),
subset to **Arabic + Latin** ranges.

### CSS custom properties (final — mirrors `02-design-tokens.md` §1.7)

```css
--font-ar-display:  "Amiri", "Noto Naskh Arabic", Georgia, serif;
--font-ar-body:     "IBM Plex Sans Arabic", "Noto Sans Arabic", system-ui, sans-serif;
--font-latin-display:"EB Garamond", Georgia, "Times New Roman", serif;
--font-latin-body:  "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-mono:        "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

The `[locale]` layout selects the family set from `lang`/`dir`; components never choose a
face directly. Headings → `*-display`; body/UI/buttons/labels → `*-body`; numerals in
data contexts → `--font-mono`.

## 2. Type scale — locked

Modular ≈ **1.25**, fluid `clamp()` tuned for a 375 → 1440 px viewport.

| Token | `clamp(min, preferred, max)` | Role |
|---|---|---|
| `--text-display` | `clamp(2.24rem, 1.79rem + 1.95vw, 3.60rem)` | Home hero headline only |
| `--text-4xl` (h1) | `clamp(1.90rem, 1.55rem + 1.5vw, 2.75rem)` | Page title |
| `--text-3xl` (h2) | `clamp(1.78rem, 1.53rem + 1.07vw, 2.55rem)` | Section |
| `--text-2xl` (h3) | `clamp(1.42rem, 1.28rem + 0.60vw, 1.80rem)` | Subsection / card title |
| `--text-xl` (h4) | `clamp(1.25rem, 1.14rem + 0.45vw, 1.50rem)` | Minor heading, lede |
| `--text-lg` | `1.125rem` | Lead paragraph |
| `--text-base` | `1rem` (**16 px floor**) | Body |
| `--text-sm` | `0.875rem` | Captions, meta |
| `--text-xs` | `clamp(0.80rem, 0.78rem + 0.10vw, 0.875rem)` | Overline / mono labels |

## 3. Per‑script tuning — locked

| Property | Arabic | Latin |
|---|---|---|
| Body line‑height | **1.85** | 1.6 |
| Heading line‑height | 1.3 (display 1.25) | 1.15 |
| Letter‑spacing | **0** everywhere (never tighten Arabic) | headings −0.01em, body 0, overline +0.08–0.14em |
| Optical size | body renders ~1 step larger than the Latin equivalent feels — set base comfortably | — |
| Max line length (`--measure`) | `46em` (≈ 55–60 chars) | `66ch` |
| Overline / kicker | mono face, **no uppercase transform** (Arabic has no case); tracking 0.08em on the Latin part only | uppercase + 0.12–0.14em tracking |
| Numerals | **Western digits by default** (phone, dates, stats); Arabic‑Indic optional per HRC — checklist J1 | Western; `tabular-nums` in columns |
| Punctuation | Arabic comma `،`, question `؟`, correct quotation marks `«»` or `""` per HRC | standard |
| `text-wrap` | `balance` on short headings; `pretty` on body where supported | same |
| `overflow-wrap` | `anywhere` on URLs/IDs/emails inside Arabic runs (bidi) | `anywhere` on long tokens |

## 4. Weights & usage

| Use | Face | Weight |
|---|---|---|
| Hero / page title | display | Amiri 700 / EB Garamond 600 |
| Section / card title | display | Amiri 700 / EB Garamond 600 |
| Lede | display | EB Garamond 500 (Latin) / Amiri 400 (Arabic) |
| Body | body | 400 |
| Emphasis in body | body | 600 (not italic for Arabic; italic OK for Latin) |
| Buttons / labels / nav | body | 600 / 500 |
| Captions, meta, overline | body or mono | 400 / 500 |

Loaded total: Amiri 2 · IBM Plex Sans Arabic 3 · EB Garamond 3 · Inter 3 · IBM Plex Mono 2
= 13 faces. Preload only the two above‑the‑fold on `/ar` (Amiri 700, IBM Plex Sans Arabic
400). `font-display: swap`. Budget check in S2/S7.

## 5. Prose (MDX body) spec

- `max-width`: `var(--measure)` — script‑aware (46em AR / 66ch LA).
- Paragraph gap `--space-4`; list markers use `padding-inline-start`.
- Links: `--color-link` (`#854D0E` / `#E9B667`), underline with 3px offset, visible focus;
  external links get a small icon + `rel="noopener noreferrer"`.
- Blockquote: `border-inline-start` 2px `--bronze-fill`; Latin italic, Arabic 500 weight.
- `<figure>`: sits within the measure, caption `--text-sm` muted.
- Tables: shaded `<th>`, hairline rows, `--text-sm`, wrapped in `overflow-x:auto`.
- Code (rare): `--font-mono`, `--color-surface-muted` bg, own scroll container.
- Headings in prose get anchor links (visible on hover/focus), keep the one‑`h1`‑per‑page rule.

## 6. Verification status

| Check | Status |
|---|---|
| Families chosen with rationale | ✅ |
| Scale locked (clamp values) | ✅ |
| Per‑script tuning locked | ✅ |
| Rendered specimen (AR + EN, hero→caption) | ✅ `docs/design/specimen.html` |
| On‑device render at 375 & 1440 with `next/font` | ⏳ S2 |
| Loaded‑weight budget vs. perf budget | ⏳ S2/S7 |
| Numerals decision (AR‑Indic vs Western) | ⏳ HRC — checklist J1 |
