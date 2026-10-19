# Sprint 11 — Progress Log

**Sprint status:** ✅ complete · **Tasks:** 3 / 3 · 2026-10-19

### S11-T01 — training catalog
- Sources: the Center's courses page (5 course pages with full text) + official news (arbitration diploma,
  AI & judicial justice, secretarial diploma cohort 87, Onyx Pro, Soroban trainer course, English diploma
  cohorts 11–12). Android course skipped (page has no details).
- 11 programs (7 new). Fees shown with the date of the announcement and a "may change" note.
- New fields: law & arbitration, accounting & business. Catalog sorted newest-announced first.

### S11-T02 — font loading (measured, local Lighthouse mobile, 2 runs each)

| Variant | /en perf | /en CLS | /ar perf | /ar LCP |
|---|---|---|---|---|
| A — before | 77–78 | 0.112 | 87–88 | 3.9 s |
| B — Garamond 600 preloaded | 76–78 | 0.089 | 85 | 4.2 s |
| **C — Latin faces `optional`, Garamond 600** | **82–87** | **0** | **88–91** | **3.5–3.8 s** |

C shipped. Trade-off: on a cold first visit to an English page over a slow link, Latin text may render in
the metric-adjusted fallback until the next navigation (no shift either way).

### Verification
lint ✅ · typecheck ✅ · unit 123/123 ✅ · build ✅ · e2e chromium + mobile 206/206 ✅ · visual check AR desktop + mobile.
