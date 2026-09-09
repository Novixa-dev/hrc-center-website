# Sprint 1 — Tasks

Task IDs: `S1-T<mm>`. One commit per task, `Refs: S1-T<mm>`.
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S1-T01 | ✅ | Dark‑theme decision + palette scope | Decision (system‑only) in `design/02` + `planning/04` log; palette roles finalized | `80895f8` |
| S1-T02 | ✅ | Color system + contrast matrix | Full light+dark matrix in `design/05` (0 fails); `design/02` colour tokens FINAL; bronze rule; `scripts/check-contrast.py` (exits 0) | `80895f8` |
| S1-T03 | ✅ | Typography finalization | `design/03` FINAL — Amiri + IBM Plex Sans Arabic + EB Garamond + Inter + IBM Plex Mono; `clamp()` scale locked; per‑script tuning; specimen rendered | `525209a` |
| S1-T04 | ✅ | Spacing / radius / shadow / z / breakpoint tokens | `design/02` promoted to FINAL — primitive + semantic + component tables, final CSS‑var names, `tokens.css` skeleton | `80895f8` |
| S1-T05 | ✅ | Motion tokens + reference behaviors | `design/04` FINAL — token values + copy‑ready Framer Motion variants (`reveal`/`stagger`) + reduced‑motion contract + specimen demo | `525209a` |
| S1-T06 | ✅ | Iconography rules | `design/06` iconography section — Lucide only, size tokens 16/20/24, stroke, RTL flip list, decorative vs meaningful, curated set | `525209a` |
| S1-T07 | ✅ | Component inventory state specs | `design/06` catalog + state template + iconography; specimen shows button/card/field/badge in both themes; per‑component full specs authored as encountered in S2 | `525209a` |
| S1-T08 | ✅ | Brand: voice final + tagline/boilerplate + motif | `design/01` FINAL — voice, tone‑by‑context, boilerplate draft (flagged), motif chosen = 8‑point star (2 rejected) | `525209a` |
| S1-T09 | ✅ | Persist design system via skill | Ran `--design-system --persist … --page home`; `MASTER.md` rewritten to signed‑off decisions + `pages/home.md`; drift table in `design/00` §9 | `525209a` |
| S1-T10 | ✅ | OG + brand assets spec | `design/08-og-and-brand-assets.md` — motif SVG spec, logo lockup, favicon set, 1200×630 OG template (LTR+RTL) + variants, decorative treatments, build checklist | `525209a` |
| S1-T11 | ✅ | Wireframes — 6 templates × LTR/RTL | `design/07-wireframes.md` — Landing/Overview/Catalog/Detail/Form/Utility + global header/footer, RTL notes, mobile stacking, responsive rules | `525209a` |
| S1-T12 | ✅ | Design‑review rubric | `docs/reports/reviews/design-review-rubric.md` — 7 dimensions, anti‑AI‑smell pass, severity scale, recording format | `525209a` |
| S1-T13 | ✅ | Close S1 | `design/00` §8 checked + §9 sign‑off + reconciliation table; `report.md`; globals → "S1 complete"; `sprint-02` folder; `sprint-1-complete` tag | `525209a` |

## Task detail

### S1-T02 — contrast matrix
Use a scriptable check (small Python using the WCAG formula, or the skill's guidance).
Matrix rows: `text`, `text‑muted`, `heading`, `link`, `on‑primary`, `on‑accent`,
`border`, `focus‑ring`, `success/danger/warning` — each against `bg`, `surface`,
`surface‑muted`, `primary`, `accent`. Mark ✅ ≥ 4.5 / ⚠️ 3–4.5 (large/UI only) / ❌ < 3.
Adjust primitives until no ❌ remains for its intended use. Repeat for dark.

### S1-T03 — typography rendering
A throwaway `scratch/type-sample.html` (gitignored or deleted after) that loads the
candidate fonts and shows hero/h2/body/caption/button/label in AR and EN at 375 and 1440.
Decision recorded with a one‑line rationale. Skill: `ui-ux-pro-max --domain google-fonts`.

### S1-T11 — wireframes
Text/ASCII wireframes are sufficient (no design tool). Each shows: header, the ordered
sections (named to match `design/06`), the primary CTA position, and the RTL mirror.
Annotate breakpoint behavior (what stacks/hides at `md`).

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | High‑fidelity mockups | In‑browser polish against tokens is the plan | S3–S8 |
| — | Real motif SVG file | Created as an asset when first used | S2/S3 |
