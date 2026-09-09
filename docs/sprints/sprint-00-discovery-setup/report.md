# Sprint 0 — Report

**Name:** Discovery & Setup · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `7686698..<close>` · **Tag:** `sprint-0-complete`

## 1. What shipped

- **Repo scaffold** — `.gitignore`, `.editorconfig`, `.nvmrc`, `README.md`, and a lean
  `CLAUDE.md` (golden rules + per‑task Definition of Done + conventions + directory layout).
- **Vendored skills** — 8 design/UX skills (`ui-ux-pro-max`, `design`, `design-system`,
  `ui-styling`, `design-review`, `brand`, `banner-design`, `slides`) under `.claude/skills/`,
  with `ui-ux-pro-max`'s Python CLI verified on 3.13.
- **Research (6 files)** — Al‑Ahgaff University, HRC (core file), Novixa + Aqar design
  reference, peer benchmark, digital presence audit, assets inventory. Every fact tagged
  ✅/🟡/🔴/❓; ~18 open research questions surfaced.
- **Planning (8 files)** — master plan (success criteria S1–S8, scope in/out), PRD
  (5 personas + JTBD, functional + non‑functional requirements, content model), IA
  (sitemap, nav, 6 templates, 5 collections, filtering, hreflang, empty states),
  content strategy (voice, glossary, anti‑AI‑smell checklist, review workflow),
  technical architecture (stack rationale, RSC rendering, next-intl i18n, MDX pipeline,
  component architecture, SEO infra, perf budget, a11y infra, decisions log),
  sprint plan (S0–S9), Definition of Done (4 levels), risk register (16 scored risks).
- **Skills docs (2)** — inventory (per‑skill project use + CLI reference) and binding
  usage rules (consult‑before‑deciding matrix, query discipline, adapt‑don't‑paste,
  design‑system persistence, review timing).
- **Guides (4)** — AI‑collaboration `.md` files (spec‑driven dev, with sources),
  git workflow, coding standards, SEO checklist.
- **Design brief + 6 system drafts** — brand/voice, tokens (3 layers), typography
  (AR+EN), motion (Framer Motion patterns), accessibility (WCAG 2.2 AA table), component
  inventory. Direction set: Swiss/editorial style, *Trust & Authority* landing pattern,
  navy `#1E3A5F` + bronze `#A16207`.
- **Testing (2)** — test strategy (11 test types, gates, reporting) + master QA checklist.
- **Reports** — global progress tracker + global report (with a per‑sprint section format).
- **Sprint machinery** — 5 templates + this Sprint 0 folder + the content review
  checklist (12 sections, ~50 rows) + `docs/README.md` index.

## 2. Metrics

Not applicable — Sprint 0 is documentation only. Baselines begin in Sprint 2.

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| Next.js 15 + Tailwind v4 + next-intl + Framer Motion | SEO/i18n/perf goals; user selection | `global-report.md`, `planning/04` |
| Local git only, deploy‑ready but not deployed | User selection | `planning/00` |
| Full bilingual content, unverified facts flagged | User selection; real institution | `planning/03`, checklist |
| Content = Git MDX collections, no CMS | Pro‑bono → minimal ops | `planning/04` |
| One animation library (Framer Motion); GSAP = timing reference only | Bundle budget | `design/04` |
| Design direction: Swiss/editorial + Trust & Authority; navy + bronze | `ui-ux-pro-max --design-system`, adapted | `design/00` |
| Services = one anchored page; Training/News/Conferences/Publications = collections + detail routes | Content volume | `planning/02` |
| Design docs are drafts in S0, finalized in S1 | Avoid premature lock‑in | plan |

## 4. New dependencies

None (no `package.json` yet — starts S2).

## 5. Deferred / not done

| Item | Why | Where it went |
|---|---|---|
| Finalize design system + persist `MASTER.md` | Needs the finalized system | S1 (S1-T09) |
| `markdownlint` pass on docs | No Node tooling installed yet (policy: S2) | S2 (S2-T03), noted in S0 `tests.md` |
| Acquire HRC logo & photography, confirm facts | External dependency on HRC | content review checklist |
| CI on a remote | Local‑only this phase | `pnpm verify` locally; workflow file added S2, wired at handover |

## 6. Content flags raised

The full set (~50) is in [`content-review-checklist.md`](../../content/content-review-checklist.md),
grouped: identity & contact (A), leadership (B), vision/mission (C), services (D),
training (E), research & journal (F), conferences (G), news (H), assets (I),
localization (J), Novixa credit (K), legal (L).

## 7. Risks

- **Realized:** none.
- **Live:** R1 (unverified facts) and R4 (team names) — mitigated by the checklist + a
  graceful "to be announced" UI pattern; R2/R3 (missing logo/photos) — placeholder policy
  (typographic + brand motif, never stock/AI faces).
- **New:** none beyond the register.
- **Retired:** none.

## 8. Test summary

Documentation QA pass (see `tests.md`): cross‑links, cross‑doc consistency, brief→plan
coverage map, and fact‑tagging all ✅. One advisory tool (`markdownlint`) deferred to S2.
No blocker findings.

## 9. Notes for next sprint (S1 — Design System)

- Start from `design/00-design-brief.md` §8 (S1 deliverables list).
- Run `ui-ux-pro-max --design-system … --persist -p "Hadramout Research Center"
  --output-dir "."` **after** the system is verified, not before.
- The bronze accent (`#A16207`) on white likely fails 4.5:1 for **small text** — plan to
  restrict it to large text / UI / fills, or darken it. Build the full contrast matrix first.
- Decide: dark theme = system‑only vs toggle (affects token work + component states).
- Produce low‑fi wireframes for all 6 templates in **both** LTR and RTL.
- Keep design docs' narrative in sync with `MASTER.md`; log any drift in `design/00` §9.

## 10. Exit criteria

- [x] All Sprint 0 deliverable docs committed.
- [x] Research fact‑tagged; open questions → checklist.
- [x] `CLAUDE.md` + planning + design + skills docs consistent and cross‑linked.
- [x] `report.md` written; `global-progress.md` + `global-report.md` updated to "S0 complete".
- [x] Sprint 1 tasks drafted.
- [x] `sprint-0-complete` tag created.
