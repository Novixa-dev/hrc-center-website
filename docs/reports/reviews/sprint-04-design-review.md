# Sprint 4 — Design Review (spot)

**Scope:** the `Catalog` (Training) and `Detail` (Program) templates, plus the Services
`Overview` page. Reviewer: `design-review` rubric + manual. **Build:** `bc32c9f`.
**Locales:** AR (RTL) + EN (LTR). **Breakpoints:** 390, 1440. Evidence: `scratchpad/shots/`.

## What's working

- **Filter bar** renders localised chips (not raw keys — an early bug, fixed), the
  `aria-pressed` state tracks the URL, and the polite live region announces a full ICU
  phrase ("٤ برامج مطابقة" / "4 programs match"). Filtering is server-side, so a filtered
  URL is shareable and works without JS.
- **Empty state** is real and designed — heading + explanation + "register interest" →
  Contact — not a blank grid. Shown correctly for `?status=open` (all programs archived).
- **Provisional honesty:** every program card + the detail page badge reads "قُدِّم مؤخراً /
  Recently offered"; the detail aside carries "المعلومات المعروضة أولية وقيد المراجعة".
- **Course JSON-LD** asserts only `name`/`description`/`provider`/`inLanguage`(+`award`) —
  no fabricated `offers` or `hasCourseInstance`.
- **Services** page: 7 anchored blocks with a sticky sub-nav (`OnThisPage` reused),
  per-service "how to commission" + CTA. RTL mirrors (sidebar inline-end, icons inline-end).
- **"How enrolment works"** uses `01 / 02 / 03` markers — legitimate here (it is a real
  sequence, per the artifact-design rule).
- axe: **0 serious/critical** on all four page types, both locales.

## Findings

| # | Sev | Dimension | Page | Evidence | Fix | Status |
|---|---|---|---|---|---|---|
| 1 | Low | Component consistency | Services | 7 repeated "اطلب استشارة" ghost buttons down the page read a little heavy | consider a text link per service + keep one page-level primary CTA | ⏭️ S8 |
| 2 | Low | Layout | Training | 4 program cards in a 3-col grid → 3 + 1 orphan | switch to 2-col until ≥ 5 items, or centre a short last row | ⏭️ S8 (or when real program count is known) |
| 3 | Low | Layout | Training | filter chips + count float loosely between the breadcrumb and the grid | wrap the filter block in a hairline container to group it | ⏭️ S8 |
| 4 | Low | Layout | Program detail | KeyFacts aside sits at the inline-end in RTL; `design/07` §4 wireframe put it inline-start | either is fine for a detail page; align the wireframe to the build | ⏭️ note in `design/07` |
| 5 | Low | Spacing | Program detail | gap between the body and the "related" band is generous | tighten if it re-flags in the S8 pass | ⏭️ S8 |

## Fixed at sprint close (not design findings — recorded here for the trail)

- `/ar/services` Lighthouse Best-Practices 96 → **100**: per-service CTAs
  (`/contact?subject=…`) were prefetching the unbuilt `/contact` and logging `_rsc` 404s.
  `shouldPrefetch` now strips the query/hash before the `routesInProgress` lookup
  (`bf8d201`).
- Breadcrumb `<nav>` had no meaningful accessible name (it reused the page eyebrow). Added
  `breadcrumb.label` — "مسار التنقل" / "Breadcrumb" (`7f7e500`).
- 4 mobile e2e specs were matching `hidden lg:*` header controls; fixed the locators and
  restored the full chromium + mobile run (`a4b3cd2`).

## Anti-AI-smell

Clean. Numbered markers appear only on the genuine enrolment sequence; palette/type
unchanged; provisional data is labelled, not dressed up.

## Verdict

**Ship.** No High/Medium findings — the templates are sound. Five Low items logged for the
S8 polish pass (several will resolve once HRC confirms the real program list).
