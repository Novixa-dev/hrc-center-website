# Design Brief — HRC Website

> Status: **draft from Sprint 0 research + `ui-ux-pro-max` generation.**
> Finalized and signed off in Sprint 1. Changes after S1 are logged in §9.

## 1. What we're designing

The visual and interaction language for an independent, bilingual (Arabic‑first) website
for a **university research center** in Mukalla, Hadramout. It must feel **scholarly,
credible, rooted, and quietly modern** — the considered work of a design studio, not a
template and not "AI‑generated".

## 2. Audiences (design implications)

| Audience | Design implication |
|---|---|
| Prospective trainees (mobile, AR, low bandwidth) | Mobile‑first, fast, obvious CTAs, minimal JS |
| Researchers / academics | Editorial density, clear typographic hierarchy, references legible |
| Organizations / government | Formal, trustworthy, restrained; governance visible |
| Journalists / community | Scannable, factual, easy contact |

## 3. Design direction (from `ui-ux-pro-max --design-system`, adapted)

- **Style:** *Swiss / International Typographic* — a strict grid, strong type hierarchy,
  generous whitespace, mathematical spacing, asymmetry used with intent. Restrained
  ornament: one Hadrami‑inspired geometric motif used sparingly (dividers, section marks,
  OG images), never decorative clutter.
- **Landing pattern:** *Trust & Authority + Conversion* —
  `Hero (mandate + credibility) → Pillars/Proof → What we do → Featured programs & journal
  → Latest news → Audience paths → Contact CTA`.
- **Layout system:** 12‑column grid, consistent max‑width container, editorial pull‑quotes
  and captions, tabular figures for data. Cards are calm (hairline border, minimal shadow).
- **Imagery:** real HRC photography when cleared; otherwise typographic + brand‑pattern
  treatments (large Arabic display type, subtle navy→ink gradient, geometric motif).
  Never stock photos of foreign campuses, never AI faces.
- **Motion:** subtle, meaningful, `prefers-reduced-motion`‑first. Scroll‑reveal with
  short stagger; a restrained hero entrance; hover/press micro‑feedback. Nothing bounces
  gratuitously.

## 4. Color (draft — verify contrast in S1)

From the generated system, aligned with the brief's palette intent (deep blue / bright
blue / gold):

| Role | Hex | Notes |
|---|---|---|
| Primary (institutional navy) | `#1E3A5F` | Headers, primary text on light, brand |
| Primary‑strong / ink | `#0F172A` | Body text, footer bg |
| Secondary (scholar blue) | `#2563EB` | Links, secondary emphasis |
| Accent (bronze/gold) | `#A16207` | CTAs and key highlights **only** |
| Background | `#F8FAFC` | Page |
| Surface / card | `#FFFFFF` | |
| Muted surface | `#E9EEF5` | Alt sections |
| Muted text | `#475569` | Secondary text (check 4.5:1 on white ✔) |
| Border / hairline | `#CBD5E1` | |
| Success / Error | `#15803D` / `#DC2626` | With icon + text, never color‑only |

Dark theme: desaturated navy surfaces, lightened text — designed as a pair in S1
(decision pending: system‑only vs. toggle).

The university's own green/gold is acknowledged via the affiliation lockup, not adopted
wholesale — HRC gets its own navy+bronze identity.

## 5. Typography (draft — final pairing in `03-typography-system.md`)

- **Arabic (primary):** display/headings — *Noto Naskh Arabic* or a more characterful
  Naskh; body/UI — *Noto Sans Arabic* or *IBM Plex Sans Arabic*. ("Arabic Elegant" pairing.)
- **Latin:** headings — *EB Garamond* (academic serif, matches the AR Naskh voice);
  body — a clean sans (*Inter*) or *Atkinson Hyperlegible* for accessibility.
- Both scripts share a **modular type scale** and consistent line‑heights tuned per script
  (Arabic needs more line‑height and slightly larger optical size).
- Self‑hosted via `next/font`, subset (Arabic + Latin), ≤ 4 weights total.

## 6. Iconography

- **Lucide** only. 1.5–2px stroke, consistent size tokens (`16/20/24`).
- Icons support text, they don't replace it. No emoji.
- Directional icons (arrows, chevrons) flip in RTL.

## 7. Accessibility posture

WCAG 2.2 AA is the floor. Contrast, focus, keyboard, reduced motion, SR semantics are
designed in, not bolted on. See [`05-accessibility-standards.md`](05-accessibility-standards.md).

## 8. Deliverables of Sprint 1

- [x] Final color set + contrast matrix (all text/UI pairs) — [`05`](05-accessibility-standards.md) §Matrix, `scripts/check-contrast.py`.
- [x] Final type system (families, scale, line‑heights, weights, per‑script tuning) — [`03`](03-typography-system.md).
- [x] Token tables → ready for `src/styles/tokens.css` — [`02`](02-design-tokens.md) (FINAL).
- [x] Motion tokens + patterns + Framer Motion variants — [`04`](04-motion-guidelines.md) (FINAL).
- [x] Component inventory with states + iconography rules — [`06`](06-component-inventory.md).
- [x] Brand identity + voice + motif chosen (8‑point star) — [`01`](01-brand-identity.md) (FINAL).
- [x] OG image template + brand asset specs — [`08`](08-og-and-brand-assets.md).
- [x] Low‑fidelity wireframes, 6 templates, LTR + RTL notes — [`07`](07-wireframes.md).
- [x] `design-system/hadramout-research-center/MASTER.md` persisted + reconciled + `pages/home.md`.
- [x] Visual specimen rendering the system — `docs/design/specimen.html`.
- [x] Design‑review rubric — [`docs/reports/reviews/design-review-rubric.md`](../reports/reviews/design-review-rubric.md).
- [x] Sign‑off note (below).

## 9. Sign‑off & changes after Sprint 1

**Signed off 2026‑09‑09 (S1‑T13).** The system in `docs/design/02–08` is binding for the
build. On‑device verification of fonts and the performance budget happens in S2/S7; HRC
inputs (real logo, numerals decision, tagline approval) are tracked in the content review
checklist and folded in when received.

### Reconciliation with `MASTER.md` (skill seed → final)

| Skill seed (`ui-ux-pro-max`) | Final decision | Why |
|---|---|---|
| Typography: EB Garamond + Crimson Text (Latin only) | Amiri + IBM Plex Sans Arabic + EB Garamond + Inter + IBM Plex Mono | Arabic‑first site; skill's typography domain doesn't cover bilingual pairing |
| Accent `#A16207` for CTA text | `#854D0E` for text/CTA; `#A16207` = fill/large only | `#A16207` on white = 4.9:1 (marginal); verified matrix |
| Page pattern: "Portfolio Grid" | "Trust & Authority + Conversion" / editorial | An institution, not a portfolio; matches `--domain landing` result |
| Motion: GSAP ScrollTrigger | Framer Motion (GSAP values as timing reference) | One animation lib; RSC‑friendly |
| Google Fonts `@import` | self‑host via `next/font` | performance + privacy |
| `cursor:pointer` on all `.card` | only when the whole card is a link | correctness |
| No dark theme / no RTL notes | system dark theme + RTL throughout | requirements |

### Change log (append‑only; date · what · why)

- **2026‑09‑09 (S3)** · Motion **implementation** changed Framer Motion → CSS transitions
  (one `<Reveal>` client component). `motion` package removed. · It cost ~40 KB + a
  hydrated island per section (TBT ~940 ms; LCP ~6.6 s). CSS reveal: LCP ~3.3 s, JS
  −38 KB. The *design* (what animates, timing, easing, reduced‑motion) is unchanged.
  Detail in `04-motion-guidelines.md`.
