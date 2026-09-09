# Sprint 1 — Report

**Name:** Design System (paper) · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `80895f8`, `525209a` · **Tag:** `sprint-1-complete`

## 1. What shipped

- **Colour system, verified.** Institutional navy `#1E3A5F`, deep umber‑bronze `#854D0E`
  for the single CTA per view, cool paper neutrals with a navy bias. Full light + dark
  contrast matrix in `design/05`, backed by `scripts/check-contrast.py` (stdlib WCAG 2.x,
  re‑runnable, exits non‑zero on regression) — **0 pairs below threshold**.
- **Typography, decided.** Arabic‑first: **Amiri** (display) + **IBM Plex Sans Arabic**
  (body); **EB Garamond** + **Inter** for Latin; **IBM Plex Mono** for data. Two
  calligraphic pairs, one system. Fluid `clamp()` scale + per‑script tuning locked
  (`design/03`).
- **Tokens, final.** `design/02` promoted to FINAL: primitive → semantic → component with
  the real CSS‑var names and a `tokens.css` skeleton. Dark mode = **system‑only** for v1.
- **Motion, final.** `design/04` with copy‑ready Framer Motion variants (`reveal`,
  `stagger*`), token values, and the reduced‑motion contract.
- **Brand, final.** `design/01` — voice attributes, tone by context, boilerplate draft
  (flagged for HRC), and the geometric motif chosen: the **eight‑point Hadrami star**
  (two alternatives considered and rejected, with reasons).
- **Components.** `design/06` catalog + iconography rules (Lucide only, size tokens, RTL
  flip list, decorative‑vs‑meaningful) + state template. Per‑component full state specs
  are authored as each component is built in S2 (deliberate — avoids speccing in a vacuum).
- **Wireframes.** `design/07` — all 6 templates (Landing / Overview / Catalog / Detail /
  Form / Utility) + global header/footer, with RTL mirror notes and mobile stacking.
- **OG + brand assets.** `design/08` — motif SVG spec, logo lockup (interim + swap plan),
  favicon set, 1200×630 OG template (LTR + RTL, 4 variants), decorative treatments for the
  photography gap, and an S2/S7 build checklist.
- **Visual specimen.** `docs/design/specimen.html` renders the whole system (palette with
  measured ratios, bilingual type specimens, tokens, components in both themes, motion
  demo). Openable in a browser.
- **`MASTER.md`** persisted via `ui-ux-pro-max`, then rewritten to the signed‑off
  decisions, plus `pages/home.md`. Seed → final reconciliation recorded in `design/00` §9.
- **Design‑review rubric** (`docs/reports/reviews/`) for use from S3.

## 2. Metrics

Not applicable — no application code this sprint. Contrast audit: **0 failures**
(15 light + 11 dark pairs at their intended threshold).

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| Dark mode = system‑only (v1) | Fewer moving parts; no theme‑flash / persisted‑state work; audience mostly mobile AR | `planning/04` log, `design/02` |
| Type = Amiri + IBM Plex Sans Arabic + EB Garamond + Inter + IBM Plex Mono | Scholarly Arabic voice + modern legible body; Latin serif matches; all OFL, subsettable | `design/03`, `planning/04` log |
| Bronze `#A16207` → fill/large only; `#854D0E` → text/link/CTA | `#A16207` on white = 4.9:1 (marginal); `#854D0E` = 6.9:1 | `design/05`, `planning/04` log |
| Motif = 8‑point Hadrami star | Subject‑specific, small‑size legible, not a generic "building" glyph | `design/01`, `design/08` |
| Per‑component full state specs authored in S2, not S1 | Speccing every state before building risks churn; the catalog + template + specimen are enough to start | `design/06`, this report |
| `MASTER.md` rewritten (not left as the skill seed) | Skill seed is Latin‑only, non‑RTL, portfolio‑pattern; our design work supersedes it | `design/00` §9 |

## 4. New dependencies

None (no `package.json` yet). Fonts to be added via `next/font` in S2:
Amiri, IBM Plex Sans Arabic, EB Garamond, Inter, IBM Plex Mono — all SIL OFL 1.1.

## 5. Deferred / not done

| Item | Why | Where it went |
|---|---|---|
| On‑device font render + perf‑budget check | Needs the S2 scaffold + `next/font` | S2 (S2‑T04), S7 |
| Per‑component full state specs | Authored while building each component | S2 |
| Real motif SVG + `<Motif>` / `<Logo>` components | Built as assets when first used | S2 |
| Publishing the specimen as a shareable hosted page | **Blocked by the session auto‑mode classifier** | User decision — local HTML file meanwhile |
| Numerals (AR‑Indic vs Western), Hijri dates, tagline approval | HRC inputs | content review checklist J1–J3 |

## 6. Content flags raised

No new flags this sprint. Existing design‑dependent flags: I1 (logo), I4 (brand colours),
I5 (motif approval), J1–J3 (numerals / Hijri / tagline).

## 7. Risks

- **Realized:** none.
- **New:** the Artifact‑publish denial is a workflow friction, not a project risk — the
  specimen exists as a file. If the user wants shareable design links later, they enable
  the action.
- **Watch:** R7 (perf budget with 13 loaded font faces + Arabic subsetting) — mitigated by
  subsetting + preloading only 2, but confirm in S2/S7. R8 (RTL) — wireframes now carry
  explicit mirror notes.

## 8. Test summary

Documentation + design QA: contrast script (0 fails), cross‑doc consistency
(`MASTER.md` ↔ `docs/design/`), specimen structural check (braces/tags balanced),
anti‑AI‑smell self‑check of the specimen (navy+umber not cream+terracotta; Amiri/EB
Garamond not Inter‑as‑display; no emoji; numbered markers removed). No automated app tests
(no app yet).

## 9. Notes for next sprint (S2 — Scaffold & Foundation)

- Transcribe `design/02` §1–§3 verbatim into `src/styles/tokens.css`; generate
  `tailwind.config.ts` from the same tables.
- `next/font`: load the 5 families, subset AR+Latin, preload Amiri 700 + IBM Plex Sans
  Arabic 400; check the total against the perf budget immediately.
- Build `Reveal` / `Stagger` from the variants in `design/04`; `<Motif>` / `<Logo>` from
  `design/08` (finalize the star path).
- `[locale]` layout picks the font set from `dir`; use logical properties from line one.
- Read `MASTER.md` + `pages/home.md` before the placeholder Home.
- First real Lighthouse + axe baseline on the shell — record in `global-report.md` metrics.

## 10. Exit criteria

- [x] All deliverables in `README.md` complete; no "TBD/pending/draft" left in `design/02–08`
      (only explicit "verify in S2" tails).
- [x] Every palette pair meets WCAG at its intended threshold, light and dark, documented.
- [x] Token tables are directly transcribable (final var names).
- [x] Wireframes for all 6 templates + LTR/RTL notes.
- [x] `MASTER.md` persisted, reconciled; drift table in `design/00` §9.
- [x] `report.md` written; globals updated; `sprint-1-complete` tag.
