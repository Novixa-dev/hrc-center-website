# Sprint 5 — Progress Log

Running log. One entry per work session / task. Newest at the bottom. Keep it terse.

**Sprint status:** ✅ complete
**Tasks:** 14 / 14 done
**Started:** 2026-09-09 · **Closed:** 2026-09-09

User: continue autonomously; performance deferred to S7.

---

## Log

### 2026-09-09 — S5-T01..T04 collections + team model + content
- Did: `publicationFrontmatter` + `conferenceFrontmatter` + a shared `isoDate`
  preprocessor (YAML parses `date: 2024-09-01` as a `Date`); `publications.ts`
  (`getPublications` / `getJournalIssues`) + `conferences.ts` (`getConferences` /
  `hasEventData`) on the S4 `defineCollection`; `src/lib/team.ts` — records carry
  `name?` + `confirmed`, the only accessor maps `name` to `null` unless confirmed.
  Content: journal Issue 1 + the 2023 book (provisional); the Second Scientific
  Conference as `planned`, no date/venue. Unit: +19 → 52/52.
- Commit: `d98628a`.

### 2026-09-09 — S5-T06..T11 pages
- Did: **Research** (`/[locale]/research`) — focus areas, commissioning, the Journal
  section (real `law.m@ahgaff.edu` submission route, board link-out, Issue 1 archive),
  publications; `CollectionPage` + `BreadcrumbList`. **Publication detail** — metadata
  aside, `creativeWorkSchema` (confirmed fields only). **Conferences** (`/[locale]/conferences`)
  — upcoming/planned vs past, empty state, past → News. **Event detail** — `Event` JSON-LD
  **only** when `hasEventData`. **Team** — grouped role cards, pending banner, affiliation.
  `schema.ts`: `collectionPageSchema` / `creativeWorkSchema` / `eventSchema`. Messages:
  `research` / `conferences` / `team` × AR+EN (key parity checked). `/research`,
  `/conferences`, `/team` off `routesInProgress`. sitemap + About governance link.
- Commit: `143dcd0`.

### 2026-09-09 — fix(seo): OG image default
- Did: `buildMetadata` defaulted `og:image` to `/<locale><path>/opengraph-image` — only
  `/[locale]/opengraph-image` exists, so every non-home route (incl. all of S3/S4) shipped
  a 404 `og:image`. Defaulted to the locale-level brand card. +1 unit assertion (→ 53).
- Commit: `3bb528b`.

### 2026-09-09 — S5-T12 tests
- Did: `tests/e2e/research-conferences-team.spec.ts` — both locales × chromium + mobile:
  research h1 + journal + submission email + external board link + issue→detail + JSON-LD;
  conference card + past→News + **no `Event` JSON-LD** without a date/place; team pending
  state + roles + **no brief names in the DOM**. Full suite 156/156.
- Commit: `9bd40eb`.

### 2026-09-09 — S5-T13 Lighthouse + design review
- Did: LH mobile ×5 routes — **a11y/BP/SEO 100 everywhere**; perf 52–59 (machine under
  load — S3/S4 pages re-measured the same session also hit ~59; not a regression, → S7).
  `design-review` spot pass → `sprint-05-design-review.md`: **no High**, 2 Medium found
  and fixed:
  - **`<Link>` centred every card** that wrapped it (`items-center` in the base class) —
    ProgramCard, PillarsGrid, the new cards. Dropped it. Also fixed single-item card
    lists to a readable max-width.
  - the **OG-image default** (above).
  4 Low → S8.
- Commits: `1e6a21b`, `(review docs)`.

### 2026-09-09 — S5-T14 close
- Did: content briefs (`research`/`conferences`/`team`), checklist B/F/G updates, LH
  summary, `progress.md` / `tests.md` / `report.md`, globals, `sprint-5-complete`, S6
  folder.
- Commits: `37148d7`, `(close)`.

---

## Blockers encountered

| Date | Blocker | Resolution / workaround |
|---|---|---|
| 2026-09-09 | YAML frontmatter parses `date: 2024-09-01` as a JS `Date`, failing `z.string().date()` | shared `isoDate = z.preprocess(d => d instanceof Date ? d.toISOString().slice(0,10) : d, z.string().date())` in `schema.ts` |
| 2026-09-09 | `@lhci/cli` chrome-launcher EPERM on Windows sandbox temp cleanup | `lighthouse` CLI directly with `TMPDIR` in scratchpad; report written before the throw |
| 2026-09-09 | Scratchpad `.mjs` can't `import '@playwright/test'` | copy the screenshot script into the project root, run, delete |
| 2026-09-09 | Lighthouse perf readings ~59 across the board | machine load — confirmed by re-measuring S3/S4 pages (also ~59); recorded with the caveat, perf is S7 |

## Deviations from the plan

| Date | Planned | Actual | Why |
|---|---|---|---|
| 2026-09-09 | `team` as a collection *or* typed data file | `src/lib/team.ts` typed model | zero confirmed content; a typed model makes the `confirmed`-gates-the-name rule enforceable + unit-testable |
| 2026-09-09 | publication detail at `/research/[slug]` *or* `/publications/[slug]` | `/research/[slug]` | one fewer top-level route; Research is the hub |
| 2026-09-09 | `ScholarlyArticle` / `Book` JSON-LD | `creativeWorkSchema` maps kind → `PublicationIssue` / `Book` / `Report` / `ScholarlyArticle` | one helper, confirmed fields only |
