# Accessibility Standards

**Target: WCAG 2.2 Level AA** across the whole site, both locales. Several AAA items are
adopted where cheap. This is part of the Definition of Done, not a later pass.

## Commitments

| # | Commitment | How we meet it | Verified |
|---|---|---|---|
| A1 | Perceivable color | Contrast ≥ 4.5:1 text, ≥ 3:1 large text & UI/graphics; never color‑only meaning (add icon/text) | Contrast matrix (S1) + axe + manual |
| A2 | Text resize | All `rem`; usable at 200% zoom and 320px width; no clipping as text grows | Manual zoom test per page |
| A3 | Keyboard | Every interactive element reachable & operable by keyboard; visible order = DOM order; no traps (except intentional modal, with escape) | Playwright keyboard specs + manual |
| A4 | Focus visible (2.4.7) + not obscured (2.4.11 AA) | Custom 2px ring, 3:1, offset; sticky header/overlays never cover the focused control | Manual + component tests |
| A5 | Focus appearance (2.4.13 AAA, adopted) | Ring encloses the component, ≥ 2px, 3:1 against both states | Design review |
| A6 | Target size (2.5.8 AA) | Pointer targets ≥ 24×24 CSS px (primary actions ≥ 44); adequate spacing | Design tokens + review |
| A7 | Semantic structure | One `h1`; nested headings; landmarks (`header/nav/main/footer`); lists/tables/`<time>` correct | Lint + axe + manual |
| A8 | Names, roles, values | Icon‑only controls have `aria-label`; state (`aria-expanded/current/pressed/selected`) exposed; Radix primitives for complex widgets | jsx‑a11y lint + SR test |
| A9 | Forms | Visible `<label for>`; required marked (not color‑only); helper text persistent; errors inline + `aria-describedby`; error summary focused on submit fail, linked to fields; `aria-live` announcements; correct `type`/`autocomplete`/`inputmode` | Form e2e + SR test |
| A10 | Images & media | Meaningful → localized descriptive `alt`; decorative → `alt=""`/`aria-hidden`; complex figures → adjacent text; no auto‑playing media | Content review + axe |
| A11 | Motion (2.3.3 AAA + 2.2.2) | `prefers-reduced-motion` respected; any auto‑moving/rotating content has pause + stops on focus/reduced motion (we avoid carousels) | Motion test per page |
| A12 | Language | `<html lang>` per locale; inline `lang` on foreign phrases; `dir` correct; bidi‑safe form fields | Manual + markup review |
| A13 | Predictable & consistent | Nav in the same place every page; consistent help location (2.4.11); no context change on focus | Design review |
| A14 | Reflow (1.4.10) | No horizontal scroll at 320px / 400% zoom except genuine 2‑D content in its own scroller | Responsive test |
| A15 | Redundant entry (3.3.7) / Accessible auth (3.3.8) | Don't re‑ask info in one flow; the contact form allows paste & password managers (n/a — no login); no cognitive test / CAPTCHA that fails a11y | Form design |
| A16 | Parsing / valid markup | Valid HTML, unique `id`s, no duplicate landmarks without labels | Build + validator |

## Component‑level rules

- **Skip link** first in tab order, visible on focus, jumps to `#main`.
- **Header nav**: `<nav aria-label>`; current page `aria-current="page"`; mobile menu is a
  disclosure or dialog with focus management + `Esc`.
- **Locale switcher**: a real control; announces the target language in that language
  (`lang` attr on each option); keeps the user on the same page.
- **Cards linking somewhere**: one real link (title), whole‑card click via the link's
  pseudo‑element — not nested interactive elements.
- **Disclosure/Accordion/Tabs**: Radix or WAI pattern; arrow‑key where specified;
  `aria-expanded`/`aria-selected`.
- **Filter bar**: checkboxes/toggles with labels; result count in a polite live region as
  a full phrase ("12 programs match"); chips are operable, `+n` overflow is a disclosure.
- **Toasts** (if used): `role="status"` / `aria-live="polite"`, don't steal focus, 3–5s +
  manual dismiss.
- **Map**: has a text address alternative right beside it; keyboard‑pannable or static
  image with a "get directions" link.

## Testing protocol

**Automated (CI + Page DoD):**
- `eslint-plugin-jsx-a11y` (recommended + `no-autofocus`, `no-redundant-roles`, etc.).
- `@axe-core/playwright` on every route × locale → **0 serious, 0 critical**. Log moderate
  issues with a decision.

**Manual (Page DoD spot‑check + full pass in S7/S8):**
- Keyboard‑only walkthrough (Tab/Shift‑Tab/Enter/Space/Esc/Arrows).
- Screen reader: NVDA + Firefox (Windows) and/or VoiceOver + Safari — headings list,
  landmark nav, form flow, link purpose.
- 200% and 400% zoom; 320px width.
- `prefers-reduced-motion: reduce`.
- Forced colors / Windows High Contrast — content and focus still visible.
- Color‑blind check (no info lost) via a simulator.

## Accessibility statement page

`/[locale]/accessibility` — states the target (WCAG 2.2 AA), how to report a problem
(email), known limitations (e.g. third‑party map, any deferred item), and the date last
reviewed. Kept current each sprint.

## Known‑risk areas for this project

- Arabic + form inputs (bidi): test mixed AR text + LTR email/URL fields.
- RTL focus order and directional controls.
- ~~Contrast of the bronze accent on white~~ → **resolved S1-T02**: `#A16207` (bronze‑500)
  is fill/large‑only; `#854D0E` (bronze‑600, 6.9:1) is the text/link/CTA colour. See matrix.
- Long Arabic headings wrapping / truncation.

---

## Contrast matrix (verified Sprint 1-T02)

Computed with the WCAG 2.x relative‑luminance formula —
[`scripts/check-contrast.py`](../../scripts/check-contrast.py), re‑runnable, exits non‑zero
on any regression. Thresholds: **text 4.5:1**, **large text / UI / graphics 3:1**, AAA 7:1.

### Light theme

| Foreground | Background | Ratio | Intended use | Verdict |
|---|---|---|---|---|
| `--color-text` `#0F172A` | `--color-bg` `#F8FAFC` | 17.1 | body | AAA ✅ |
| `--color-text` `#0F172A` | `--color-surface` `#FFFFFF` | 17.9 | body on cards | AAA ✅ |
| `--color-text-muted` `#475569` | `#FFFFFF` | 7.6 | secondary text | AAA ✅ |
| `--color-heading` `#1E3A5F` | `#FFFFFF` | 11.5 | headings | AAA ✅ |
| `--color-link` `#854D0E` | `#FFFFFF` | 6.9 | links | AA ✅ |
| `--color-link` `#854D0E` | `#F8FAFC` | 6.6 | links on bg | AA ✅ |
| `#FFFFFF` | `--color-primary` `#1E3A5F` | 11.5 | text on navy | AAA ✅ |
| `--color-on-accent` `#FFFFFF` | `--color-accent` `#854D0E` | 6.9 | CTA label | AA ✅ |
| `#FFFFFF` | `--bronze-500` `#A16207` | 4.9 | (avoid for text) small‑CTA fallback | AA ⚠️ use bronze‑600 instead |
| `--bronze-500` `#A16207` | `#FFFFFF` | 4.9 | **not** for body; large/icon | large ✅ / text ⚠️ |
| `--color-border` `#CBD5E1` | `#FFFFFF` | 1.5 | **decorative** divider/card edge only | n/a (exempt) |
| `--color-border-interactive` `#64748B` | `#FFFFFF` | 4.8 | form field / focusable edge | UI ✅ |
| `--color-focus-ring` `#1D4ED8` | `#FFFFFF` | 6.7 | focus indicator | UI ✅ |
| `--color-success` `#15803D` | `#FFFFFF` | 5.0 | success text (+icon) | AA ✅ |
| `--color-danger` `#DC2626` | `#FFFFFF` | 4.8 | error text (+icon) | AA ✅ |
| `--color-warning` `#B45309` | `#FFFFFF` | 5.9 | warning text (+icon) | AA ✅ |
| `#D97706` (amber‑600) | `#FFFFFF` | 3.2 | warning **icon/large only** | large ✅ |

### Dark theme (system, `prefers-color-scheme: dark`)

| Foreground | Background | Ratio | Intended use | Verdict |
|---|---|---|---|---|
| `--d-text` `#E7ECF3` | `--d-bg` `#0A1420` | 15.6 | body | AAA ✅ |
| `--d-text` `#E7ECF3` | `--d-surface` `#0F1E30` | 14.2 | body on cards | AAA ✅ |
| `--d-text-muted` `#A9B6C6` | `#0A1420` | 9.0 | secondary | AAA ✅ |
| `--d-heading` `#F2F5F9` | `#0A1420` | 16.9 | headings | AAA ✅ |
| `--d-link` `#7CA9FF` | `#0A1420` | 7.9 | links | AAA ✅ |
| `--d-link` `#7CA9FF` | `#0F1E30` | 7.2 | links on cards | AAA ✅ |
| `--d-text` `#E7ECF3` | `--d-primary` `#3D6099` | 5.3 | text on primary | AA ✅ |
| `--navy-900` `#0A1420` | `--d-accent` `#D8A24A` | 8.1 | CTA label (dark) | AAA ✅ |
| `--d-border-interactive` `#647CA6` | `#0A1420` / `#0F1E30` / `#14283F` | 4.4 / 4.0 / 3.5 | form field edge | UI ✅ |
| `--d-border-divider` `#24374F` | `#0F1E30` | 1.4 | **decorative** only | n/a (exempt) |

### Notes

- **Decorative borders** (`--color-border`) are exempt from 1.4.11 because the component
  is also identifiable by background, shadow, and layout — the border is not the sole
  visual affordance. **Interactive** edges (inputs, focusable controls whose boundary is
  the affordance) use `--color-border-interactive` (≥ 3:1).
- Bronze‑500/400 are **fill and ≥ 24px graphic** colours. Any bronze text or bronze on a
  tinted surface uses **bronze‑600**.
- All "muted" text pairs clear AA comfortably; there is no gray‑on‑gray anywhere in the
  system.
- Status colours always ship with an icon and a text label (`color-not-only`).
- Re‑verify after any primitive change; the script is the source of truth.
