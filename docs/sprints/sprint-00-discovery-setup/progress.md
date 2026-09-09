# Sprint 0 — Progress Log

**Sprint status:** ▶ closing
**Tasks:** 10 / 11 done
**Started:** 2026-09-09 · **Closed:** —

---

## Log

### 2026-09-09 — S0-T01..T03 scaffold, skills, research
- Did: read `idea.md` in full; confirmed 3 project decisions with the user (stack =
  Next.js 15 + Tailwind + next-intl + Framer Motion; hosting = local git only;
  content = full bilingual with unverified facts flagged). Web research: Al‑Ahgaff
  University (AR + EN Wikipedia, en.ahgaff.edu), HRC center pages (AR + EN), the journal
  page, Novixa + Aqar. `git init`; scaffolded tooling; wrote `CLAUDE.md`. Vendored 8
  design/UX skills from the aqar project; verified `ui-ux-pro-max` CLI on Python 3.13.
  Wrote 6 research files.
- Result: research consolidated with confidence tags; ~18 open questions → content review checklist.
- Skills used: `ui-ux-pro-max` (design‑system generation + typography/landing/gsap domains).
- Decisions: see `global-report.md` "Key decisions".
- Commits: `7686698`, `594e71a`, `34d0cac`.

### 2026-09-09 — S0-T04 planning docs
- Did: master plan, PRD (personas + FR/NFR + content model), IA (sitemap, nav, templates,
  collections, filtering, hreflang, empty states), content strategy (voice, glossary,
  anti‑AI‑smell), technical architecture (stack rationale, rendering, i18n, pipeline,
  perf budget, decisions log), sprint plan (S0–S9), Definition of Done (4 levels),
  risk register (16 risks).
- Result: internally consistent, cross‑linked plan.
- Commit: `d181b71`.

### 2026-09-09 — S0-T05..T08 design drafts, skills rules, guides, testing
- Did: design brief + 6 system drafts; skills inventory + usage rules; AI‑collaboration
  md‑files guide (spec‑driven dev, sourced); git workflow; coding standards; SEO checklist;
  test strategy; master QA checklist.
- Result: design direction set (Swiss/editorial, navy+bronze, Trust & Authority pattern);
  binding skill rules; full QA framework.
- Skills used: `ui-ux-pro-max` domains (typography, landing, gsap).
- Commits: `(design)`, `(skills+guides)`, `(testing)`.

### 2026-09-09 — S0-T09..T10 trackers, reports, sprint scaffold
- Did: `global-progress.md`, `global-report.md`, `content-review-checklist.md` (12
  sections, ~50 rows), `_templates/*`, `sprint-00*/*`, `docs/README.md`.
- Result: the session‑start tracker and per‑sprint machinery are in place.
- Commit: `(reports)`, `(sprint scaffold)`.

### 2026-09-09 — S0-T11 close sprint
- Did: this report; global docs updated to "S0 complete"; drafted S1 tasks; tagged.
- Commit: `(this)`.

---

## Blockers encountered

| Date | Blocker | Resolution / workaround |
|---|---|---|
| 2026-09-09 | Instagram/Facebook auth‑walled to fetch | Relied on official site (AR+EN) + Wikipedia + directories; social content to be supplied by HRC (checklist H1) |
| 2026-09-09 | `site.ahgaff.opalstacked.com` TLS cert mismatch | Used the stable `ahgaff.edu` / `en.ahgaff.edu` pages instead; noted the rebuild in research |
| 2026-09-09 | Conflicting facts across sources (phone, address, journal issue dates) | Recorded all variants with confidence in research; chose one canonical value + flagged |

## Deviations from the plan

| Date | Planned | Actual | Why |
|---|---|---|---|
| 2026-09-09 | Design docs "skeletons" in S0 | Substantive drafts | The `ui-ux-pro-max` output gave enough to draft properly; still marked draft, still finalized in S1 |
