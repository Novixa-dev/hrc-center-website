# Sprint 0 — Tasks

Task IDs: `S0-T<mm>`. Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S0-T01 | ✅ | Repo scaffold + tooling config + `CLAUDE.md` | `.gitignore/.editorconfig/.nvmrc/README/CLAUDE.md` present; `git init`; rules cover golden rules + per‑task DoD | `7686698` |
| S0-T02 | ✅ | Vendor design/UX skills | 8 skills under `.claude/skills/`; `ui-ux-pro-max` CLI runs (Python 3.13 verified) | `594e71a` |
| S0-T03 | ✅ | Internet + social research → consolidated files | 6 research files; every fact confidence‑tagged; sources listed; open questions → checklist | `34d0cac` |
| S0-T04 | ✅ | Planning docs | master plan, PRD, IA, content strategy, tech architecture, sprint plan, DoD, risk register — consistent + cross‑linked | `d181b71` |
| S0-T05 | ✅ | Design brief + system drafts | brief + 6 drafts (brand, tokens, typography, motion, a11y, components); derived from research + `ui-ux-pro-max --design-system`; marked draft | `7e8f531` |
| S0-T06 | ✅ | Skills inventory + usage rules | `docs/skills/00–01`; binding rules referenced from `CLAUDE.md` §8 | `db5a785` |
| S0-T07 | ✅ | Dev + AI guides | `ai-collaboration-md-files` (spec‑driven dev, sourced), `git-workflow`, `coding-standards`, `seo-checklist` | `db5a785` |
| S0-T08 | ✅ | Test strategy + QA checklist | `docs/testing/00–01`; covers static/unit/e2e/a11y/perf/visual/SEO/x‑browser/content/resilience/security | `488927f` |
| S0-T09 | ✅ | Global trackers + reports | `global-progress.md` (sprint + page + criteria + blockers + metrics) + `global-report.md` (decisions, deferrals, per‑sprint sections) | `488927f` |
| S0-T10 | ✅ | Sprint templates + Sprint 0 folder + content review checklist + docs index | `_templates/{README,tasks,progress,tests,report}`; `sprint-00*/*`; `content-review-checklist.md` (12 sections); `docs/README.md` | `fe10b9b` |
| S0-T11 | ✅ | Close S0: report + trackers + S1 tasks drafted + tag | `report.md` done; globals → "S0 complete"; `sprint-01-design-system/tasks.md` drafted; `sprint-0-complete` tag | `fe10b9b` |

## Task detail

### S0-T05 — design drafts (note)
Per the plan, design docs are **intentionally drafts** in S0. The `ui-ux-pro-max`
`--design-system` run (query: "research center university institute academic bilingual
arabic") produced: style = *Swiss Modernism 2.0*, landing = *Trust & Authority +
Conversion*, colors = navy `#1E3A5F` / blue `#2563EB` / bronze `#A16207` on `#F8FAFC`,
typography candidates = "Arabic Elegant" (Noto Naskh + Noto Sans Arabic) and
"Academic/Research" (Crimson Pro / EB Garamond + accessible body). GSAP scroll‑reveal
preset captured as a Framer Motion timing reference. Finalization + `MASTER.md`
persistence happen in S1.

### S0-T11 — closing checklist
- [ ] `report.md` completed with the S0 narrative.
- [ ] `global-progress.md`: S0 → ✅, S1 → 🏗️, update change log + date.
- [ ] `global-report.md`: finalize the Sprint 0 section.
- [ ] Draft `docs/sprints/sprint-01-design-system/{README,tasks,progress,tests,report}.md`
      (README + tasks substantive; others from template).
- [ ] `git tag sprint-0-complete`.

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | Persist `design-system/.../MASTER.md` via skill | Needs the finalized system, not the draft | S1-T09 |
| — | Acquire HRC logo & photography | External dependency on HRC | tracked in content review checklist |
