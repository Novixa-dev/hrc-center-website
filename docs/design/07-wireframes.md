# Wireframes — Page Templates (Sprint 1)

> Low‑fidelity, text/ASCII. Section names match `06-component-inventory.md`. Each template
> is shown at **desktop LTR** with notes for **RTL mirror** and **mobile (≤ md) stacking**.
> RTL mirrors the whole grid: nav order, sidebars, card rows, icon direction — via logical
> properties, automatically. Only content that is inherently directional (arrows, the
> "next"/"prev" sense) is hand‑flipped.

Legend: `▶` = primary CTA (bronze) · `▷` = secondary CTA · `≡` = nav · `▮` = image/media ·
`— —` = hairline divider · `[ ]` = card · `◇` = icon.

---

## 1. `Landing` — Home

```
LTR (desktop ≥ lg)                                     RTL notes
┌───────────────────────────────────────────────┐
│ [◆ mark] HRC        ≡ About Services Training… │  logo → inline-start;
│                       Research Team News  ▷EN ▮│  nav flows right→left;
│                                        ▷ Contact│  "Contact" CTA → inline-end
├───────────────────────────────────────────────┤
│  HERO                                          │  text block → inline-start,
│  eyebrow                                       │  motif → inline-end
│  H1 headline (display, ~14 words)      ◆ motif │
│  lede (2 lines)                        (bg)    │
│  ▶ Explore programs   ▷ Contact the Center     │
│  — affiliation: a center of Al‑Ahgaff Univ. — │
├───────────────────────────────────────────────┤
│  PILLARS  (3-up)                               │  cards reflow R→L
│  [◇ Research] [◇ Consultancy] [◇ Training]     │
│   blurb+link   blurb+link      blurb+link      │
├───────────────────────────────────────────────┤
│  FEATURED PROGRAMS         "All programs →"    │  "→" becomes "←" in RTL
│  [▮ card] [▮ card] [▮ card]                    │
├───────────────────────────────────────────────┤
│  JOURNAL FEATURE                               │  cover → inline-end in RTL
│  [▮ cover]   Al‑Ahgaff Journal for Social Sci. │
│              scope line · ▷ Browse issues      │
│              ▷ Submit research                 │
├───────────────────────────────────────────────┤
│  LATEST NEWS  (3-up)          "All news →" ⋔RSS│
│  [date · title · excerpt] × 3                  │
├───────────────────────────────────────────────┤
│  AUDIENCE PATHS                                │
│  I am a…  ▷ Trainee  ▷ Researcher  ▷ Organization│
├───────────────────────────────────────────────┤
│  CTA BAND (bronze-tinted, full-bleed)          │
│  "Have a question or a project?"  ▷ Contact ▷WA│
├───────────────────────────────────────────────┤
│  FOOTER  (4 col → contact | links | highlights │  columns reverse order;
│          | social+affiliation+Novixa credit)   │  Novixa credit line last
│  — Privacy · Accessibility · © 2026 —          │
└───────────────────────────────────────────────┘
```
**Mobile:** hero text → full width, motif behind at low opacity; pillars stack 1‑up;
program/news cards 1‑up; audience paths become a vertical list; footer columns stack;
header collapses to `[◆ HRC] … [≡]` opening a full‑height sheet (locale switch top, CTA
pinned bottom).

---

## 2. `Overview` — About · Services · Research · Team

```
LTR (desktop ≥ lg)
┌───────────────────────────────────────────────┐
│ header (same, "About" active)                  │
├───────────────────────────────────────────────┤
│  PAGE HEADER                                   │
│  eyebrow · H1 · lede (≤ 3 lines)               │
├──────────────┬────────────────────────────────┤
│  ON THIS PAGE│  § Establishment & legal status │  sidebar → inline-end (RTL)
│  (sticky)    │    body + KeyFacts aside        │
│  • Establish │  — —                            │
│  • Vision…   │  § VISION / MISSION / OBJECTIVES │
│  • Lineage   │    labeled block, verbatim text │  labels stay in AR for AR
│  • Org units │  — —                            │
│  • Governance│  § Lineage: University → HRC     │
│              │    + affiliation lockup         │
│              │  — —                            │
│              │  § The six departments (grid)   │
│              │  [◇][◇][◇]                      │
│              │  [◇][◇][◇]                      │
│              │  — —                            │
│              │  § Governance teaser → Team page │
├──────────────┴────────────────────────────────┤
│  CTA BAND · FOOTER                             │
└───────────────────────────────────────────────┘
```
- **Services** variant: sidebar = the 7 service names; each `§` is a service with
  "How to commission" + `▷ Request` ; page‑level `▷ Request a consultation` in the header.
- **Team** variant: no sidebar; groups = Leadership / Board of Trustees / Staff / Advisors;
  each a `PersonCard` grid; unconfirmed people → "Appointment announced soon" card.
- **Mobile:** "On this page" becomes a collapsible disclosure below the page header;
  content full width; department grid 1‑up.

---

## 3. `Catalog` — Training · News · Conferences (list) · Publications

```
LTR (desktop ≥ lg)
┌───────────────────────────────────────────────┐
│  PAGE HEADER (eyebrow · H1 · lede)             │
├───────────────────────────────────────────────┤
│  FILTER BAR                                    │  chips wrap; RTL: filters
│  Field ▾  Format ▾  Status: [Open][Upcoming]   │  right-aligned; result
│  ────────────────────────  "12 programs" (live)│  count announced politely
├───────────────────────────────────────────────┤
│  CARD GRID (3-up ≥ lg, 2-up md, 1-up sm)       │
│  [▮ media                ]  [▮ ]  [▮ ]         │
│  [ kicker · title        ]                     │
│  [ field · duration      ]                     │
│  [ ● Enrolling   next: … ]                     │  badge = shape + text
│  [▮ …] [▮ …] [▮ …]                             │
├───────────────────────────────────────────────┤
│  "Load more"  /  ‹ 1 2 3 ›                     │  pagination arrows flip
├───────────────────────────────────────────────┤
│  EMPTY STATE (if no open items):               │
│  "No open intakes right now — register interest"│
│   ▷ Contact                                    │
├───────────────────────────────────────────────┤
│  CTA BAND · FOOTER                             │
└───────────────────────────────────────────────┘
```
- **News:** filter = tags only; sort newest first; card = date · title · excerpt · tag.
- **Conferences:** two labeled groups "Upcoming" / "Past"; no filter bar if few items.
- **Mobile:** filter bar becomes a "Filters (2)" button opening a sheet; cards 1‑up.

---

## 4. `Detail` — Program · Article · Event · Publication

```
LTR (desktop ≥ lg)
┌───────────────────────────────────────────────┐
│  Breadcrumbs:  Training / Intermediate English │  separator flips; last =
│                                                 │  aria-current
│  H1 (title)                                     │
│  meta row: field · format · language · updated │
├──────────────────────────┬────────────────────┤
│  ▮ HERO MEDIA (16:9)      │  KEY FACTS (aside)  │  aside → inline-start (RTL)
│                          │  Duration   2 terms │
│  BODY (MDX prose,        │  Format     In‑person│
│  measure-limited)        │  Language   AR / EN │
│   § Outcomes             │  Certificate Yes    │
│   § Who it's for         │  Next intake  —     │
│   § Schedule             │  ────────           │
│   § How to enroll        │  ▶ Register interest│  sticky on desktop
│                          │  ▷ Ask a question   │
├──────────────────────────┴────────────────────┤
│  RELATED (3-up):  more programs / articles      │
├───────────────────────────────────────────────┤
│  CTA BAND · FOOTER                             │
└───────────────────────────────────────────────┘
```
- **Article:** no KeyFacts aside; instead author/date + share row + reading time;
  RELATED = "More news". `NewsArticle` JSON‑LD.
- **Event:** KeyFacts = dates, location, theme, status; body = outcomes + proceedings link
  + `▮▮▮` gallery grid; `Event` JSON‑LD.
- **Publication:** KeyFacts = type, date, authors, issue no.; `▷ Download / Read` or
  "Print only — contact HRC".
- **Mobile:** aside moves **below** the hero media, above the body; register CTA becomes a
  bottom sticky bar (safe‑area aware).

---

## 5. `Form` — Contact

```
LTR (desktop ≥ lg)
┌───────────────────────────────────────────────┐
│  PAGE HEADER (eyebrow · H1 · lede)             │
├──────────────────────────┬────────────────────┤
│  CONTACT FORM            │  CONTACT DETAILS    │  panels swap side in RTL
│  Subject ▾ (general /    │  ◇ Address + map    │
│   program / consultation │    [▮ static map]   │
│   / research / media)    │    "Get directions" │
│  Name*        [______]   │  ◇ Phone  (mono)    │
│  Email*       [______]   │  ◇ Email            │
│  Phone        [______]   │  ◇ WhatsApp  ▷      │
│  Message*     [______]   │  ◇ Hours            │
│               [______]   │  ◇ Instagram Facebook│
│  ☐ consent to be contacted│  — —               │
│  ▶ Send message          │  "A center of      │
│  (error summary appears  │   Al‑Ahgaff Univ."  │
│   here on submit-fail,   │                    │
│   focus moved to it)     │                    │
├──────────────────────────┴────────────────────┤
│  FOOTER                                        │
└───────────────────────────────────────────────┘
```
- Deep link `?subject=consultation` preselects the Subject.
- Email/phone inputs are `dir="ltr"` even in the AR layout (bidi).
- **Mobile:** details panel moves **above** the form (address + phone reachable first);
  map lazy‑loads; sticky "Send" not used (form is short).

---

## 6. `Utility` — Privacy · Accessibility · Links · 404

```
┌───────────────────────────────────────────────┐
│  PAGE HEADER (H1 · lede)                       │
├───────────────────────────────────────────────┤
│  PROSE (measure-limited) or LIST              │
│   — Links: vertical list of labeled buttons   │
│     grouped (Main / Programs / Follow)         │
│   — 404: short apology + ▷ Home ▷ Contact +    │
│     3 popular links; returns HTTP 404          │
│   — Accessibility: target, how to report,     │
│     known limitations, last reviewed date     │
├───────────────────────────────────────────────┤
│  FOOTER                                        │
└───────────────────────────────────────────────┘
```

---

## Global chrome — Header & Footer

```
HEADER (desktop)            [◆ HRC]  About Services Training Research Conferences Team News   [AR|EN]  ▷Contact
HEADER (mobile)             [◆ HRC] ─────────────────────────────────────────────────────────────────  [≡]
  ↳ sheet: [✕]  [AR | EN]
           About / Services / Training / Research / Conferences / Team / News
           ─────────
           ▷ Contact  (pinned bottom, safe-area)

FOOTER (desktop, 4 col)
  Contact              | Explore            | Highlights          | Connect
  Address (2 lines)    | About              | Featured program    | Instagram
  Phone (mono)         | Services           | Latest journal issue| Facebook
  Email                | Training           | Upcoming event      | ── ── ──
  ▷ WhatsApp           | Research           |                     | ◆ A center of
  Hours                | Conferences        |                     |   Al‑Ahgaff University
                       | Team / News        |                     |
  ───────────────────────────────────────────────────────────────────────────────
  Privacy · Accessibility          © 2026 Hadramout Research Center   ·   Designed & developed by Novixa
```
RTL: column order reverses (Connect → Contact left‑to‑right becomes right‑to‑left);
the legal row mirrors; the Novixa credit sits at the inline‑end.

---

## Responsive rules applied to every template

| Breakpoint | Behavior |
|---|---|
| `< md` (mobile) | 1‑column; sidebars → disclosures or reorder above content; header → sheet; card grids 1‑up; sticky CTAs become bottom bars where noted |
| `md` (768) | 2‑column card grids; sidebars still collapse; header shows full nav if it fits, else sheet |
| `lg` (1024) | full nav; sidebars appear (sticky); 3‑up grids; container maxes at 1200 |
| `xl` (1440)+ | container centered at 1200; larger type via `clamp()`; more section spacing |

No horizontal scroll at any width ≥ 320px. Wide content (tables, galleries, code) scrolls
inside its own `overflow-x:auto` container.
