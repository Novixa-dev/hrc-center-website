# Sprint 13 — Home refresh (post-launch, round 4)

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S13-T01 | ✅ | Latest-news band on Home | `getLatestNews` existed since S6 but was never rendered. Home shows the three newest sourced items (AR/EN), "all news" link; background rhythm kept alternating (Audiences → default tone); e2e covers it | `feat(home)` |
| S13-T02 | ✅ | Journal card facts | Home journal card: peer-reviewed · semi-annual, E-ISSN, three issues; links to the journal block | `feat(home)` |

Verification: lint ✅ · typecheck ✅ · build ✅ · e2e 208/208 ✅ · local Lighthouse mobile `/ar` 89 · `/en` 87 · CLS 0 (no regression from the extra section).
