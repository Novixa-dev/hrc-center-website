# Sprint 8 — Tasks

Task IDs: `S8-T<mm>`. One commit per task, `Refs: S8-T<mm>`. Lowercase subjects; scope
from `commitlint.config.mjs` (`test`, `content`, `design`, `docs`).
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S8-T01 | ✅ | Cross-browser & device matrix check | Run full Playwright regression across desktop and mobile viewports (320px–1920px); 100% pass | `test(test)` |
| S8-T02 | ✅ | Content proofreading & native-read review | Native-read review of Arabic and English strings in message catalogs and MDX files; verify tone and grammar | `docs(content)` |
| S8-T03 | ✅ | Broken link & edge-state verification | Verify localized 404 page, empty filter states, and error boundary fallbacks | `fix(layout)` |
| S8-T04 | ✅ | Design review & anti-AI-smell polish | Audit typography hierarchy, spacing rhythm, shadows, and subtle micro-interactions | `style(design)` |
| S8-T05 | ✅ | Resilience & progressive enhancement check | Verify that core content and forms function cleanly when scripts or animations are restricted | `test(test)` |
| S8-T06 | ✅ | Content review checklist audit | Audit `docs/content/content-review-checklist.md`; confirm all provisional data points are strictly tagged | `docs(content)` |
| S8-T07 | ✅ | Full regression test run | Execute `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, and `pnpm test:e2e` to ensure 100% green | `test(test)` |
| S8-T08 | ✅ | Sprint 8 report & tag | Write `report.md`; update global progress; tag `sprint-8-complete` | `docs(sprint)` |
