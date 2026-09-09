# Sprint 4 — Progress Log

Running log. One entry per work session / task. Newest at the bottom. Keep it terse —
this is the "where was I" file.

**Sprint status:** ✅ complete
**Tasks:** 13 / 13 done
**Started:** 2026-09-09 · **Closed:** 2026-09-09

User: run S2–S4 autonomously; performance deferred to S7 as planned.

---

## Log

### 2026-09-09 — S4-T01 `programs` schema + loader
- Did: `src/lib/content/` — a generic `defineCollection<S>(name, schema)` (fs + `gray-matter`
  + Zod `safeParse`, throws on invalid frontmatter, `getAll`/`getBySlug`/`getSlugs`);
  `schema.ts` (`baseFrontmatter` + `programFrontmatter` + `programStatus` enum);
  `programs.ts` (status-ranked `getPrograms`, `getFeaturedPrograms`, `getProgramFields`);
  `render.ts` (`marked` + slugified heading ids). `tests/unit/programs.test.ts` (9).
- Decision: **Markdown + `gray-matter` + `marked`, not `@next/mdx`** — Turbopack-risk
  avoidance; content is trusted in-repo. Logged for `planning/04`.
- Commit: `de84604`.

### 2026-09-09 — S4-T02..T10 pages
- Did: **Services** (`/[locale]/services`) — `ServiceList` (7 anchored blocks, `OnThisPage`
  sub-nav, per-service "how to commission" + CTA, page-level consultation CTA);
  `BreadcrumbList` JSON-LD. **Training catalog** (`/[locale]/training`) — `FilterBar`
  (client, URL-encoded `?field=&format=&status=`), `ProgramCatalog` (server filter +
  scoped `NextIntlClientProvider`), `ProgramCard`, "how enrolment works", empty state.
  **Program detail** (`/[locale]/training/[program]`) — `KeyFacts` aside, `Prose` body
  from markdown, `Course` + `BreadcrumbList` JSON-LD, `generateStaticParams`. Home
  `FeaturedPrograms` now reads `getFeaturedPrograms` (stub removed). `/services` +
  `/training` off `routesInProgress`. `messages.training.results` = ICU plural.
- Content: 4 provisional programs (`english-diploma`, `motion-graphics`, `ai-productivity`,
  `soroban`) — all `provisional: true`, `status: archived`; bodies are our summaries.
- Commit: `bc32c9f`.

### 2026-09-09 — S4-T04, S4-T06 content briefs
- Did: `docs/content/services-content.md` (the 7 services → mandate verbatim; D1–D4 flags),
  `docs/content/training-content.md` (catalog + enrolment copy; E1–E7 flags).
- Commit: `(docs)`.

### 2026-09-09 — S4-T11 tests
- Did: `tests/e2e/services-training.spec.ts` (8 cases ×2 locales: h1 + 7 headings,
  nav/breadcrumb current, filter deep-link + chip toggle + empty state, `Course` JSON-LD,
  provisional note, axe on all four page types). Sitemap expectations updated.
- Commit: `bc32c9f` (bundled).

### 2026-09-09 — S4-T12 Lighthouse + design review
- Did: LH mobile ×4 routes — a11y/BP/SEO **100** everywhere except `/ar/services` BP **96**
  (console `_rsc` 404 to the unbuilt `/contact`); perf 72–91. `design-review` spot pass on
  `Catalog` + `Detail` + Services → `docs/reports/reviews/sprint-04-design-review.md`:
  **no High/Medium**, 5 Low logged for S8.
- Commit: `(review)`.

### 2026-09-09 — S4-T13 close
- Did: fixed `/ar/services` BP → **100** (`shouldPrefetch` now strips `?#` before the
  `routesInProgress` lookup, `bf8d201`). Ran the **full** e2e matrix (chromium + **mobile**)
  for the first time since S2 — caught 4 mobile failures from S3's `hidden lg:*` header
  controls being picked by `.first()` locators; fixed the two specs (`a4b3cd2`) and gave
  the breadcrumb nav a real accessible name while there (`7f7e500`). e2e **108/108**.
  Wrote `tests.md`, `report.md`, LH summary; updated globals; `sprint-4-complete`; drafted
  the S5 folder.
- Commits: `bf8d201`, `7f7e500`, `a4b3cd2`, `(close)`.

---

## Blockers encountered

| Date | Blocker | Resolution / workaround |
|---|---|---|
| 2026-09-09 | `commitlint` rejects `content` as a type and `e2e` as a scope | `docs(content):` (content is a scope); `test(layout):` for the e2e locator fix |
| 2026-09-09 | `@lhci/cli` chrome-launcher EPERMs on Windows sandbox temp cleanup | run the `lighthouse` CLI directly with `TMPDIR`/`TEMP`/`TMP` in the scratchpad + `CHROME_PATH` = Playwright chromium; the report is written before the cleanup throw |
| 2026-09-09 | Filter chips first rendered raw i18n keys | `NextIntlClientProvider` was scoped too tightly → wrap `<FilterBar>` in `program-catalog.tsx` with a scoped provider carrying `{ training }` |
| 2026-09-09 | S3/S4 verification only ran `--project=chromium`, so 4 mobile e2e regressions sat undetected | ran the full matrix at S4 close; fixed; S8 owns the standing cross-browser matrix |

## Deviations from the plan

| Date | Planned | Actual | Why |
|---|---|---|---|
| 2026-09-09 | MDX pipeline (`@next/mdx` / `next-mdx-remote`) + components map (S4-T02) | Markdown files + `gray-matter` + `marked`; `Prose`/`KeyFacts` as React components, not MDX components | Turbopack + `@next/mdx` interop risk; content is trusted and in-repo, so a components-in-content escape hatch isn't needed. `tasks.md` S4-T02 acceptance is met in spirit (anchored headings, no raw HTML, typed) |
| 2026-09-09 | `src/content/programs/{ar,en}/<slug>.mdx` | `.md` | follows from the above |
| 2026-09-09 | `/[locale]/training` static | `ƒ` dynamic (server-rendered) | it reads `searchParams` for the SSR filter default; catalog is small and cache-friendly, revisit in S7 if it matters |
