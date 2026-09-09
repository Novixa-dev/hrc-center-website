# Sprint 4 — Report

**Name:** Services + Training · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `de84604..f111f06` (7) · **Tag:** `sprint-4-complete`

## 1. What shipped

The Services and Training pages, and the project's **first content collection** — the
pattern every later collection (`publications`, `conferences`, `team`, `news`) reuses.

- **Content collection infrastructure** (`src/lib/content/`): a generic
  `defineCollection<S>(name, schema)` — `node:fs` + `gray-matter` frontmatter + Zod
  `safeParse` (throws on an invalid file at build time), `getAll` / `getBySlug` /
  `getSlugs`. `schema.ts` (`baseFrontmatter` → `programFrontmatter`, `programStatus`
  enum). `programs.ts` (status-ranked `getPrograms`, `getFeaturedPrograms`,
  `getProgramFields`). `render.ts` (`marked`, slugified heading ids).
- **`programs` content** (`src/content/programs/{ar,en}/`): 4 provisional entries —
  `english-diploma`, `motion-graphics`, `ai-productivity`, `soroban` — every one
  `provisional: true` + `status: archived`; bodies are our summaries from the department
  mandate, each flagged (E1–E7).
- **Services** (`/[locale]/services`): `ServiceList` — the 7 services as anchored blocks
  (research, consultancy, arbitration, translation, training, conferences, publishing),
  sticky `OnThisPage` sub-nav, a "how to commission" line + CTA per service, one
  page-level "Request a consultation". `BreadcrumbList` JSON-LD.
- **Training catalog** (`/[locale]/training`): `FilterBar` (client — field × format ×
  status, URL-encoded `?field=&format=&status=`), `ProgramCatalog` (server-side filter
  off `searchParams` + a scoped `NextIntlClientProvider`), `ProgramCard` (status badge),
  "how enrolment works" (3 real steps), and a designed empty state ("no open intakes —
  register interest").
- **Program detail** (`/[locale]/training/[program]`): breadcrumb, header, `KeyFacts`
  aside (sticky desktop / above body mobile), `Prose` body from markdown, register CTA
  (`?subject=program`), related programs. `Course` + `BreadcrumbList` JSON-LD,
  `generateStaticParams` from `getSlugs`.
- **Home**: `FeaturedPrograms` now reads `getFeaturedPrograms(locale)` (status-aware,
  "recently offered" wording); the `lib/content.ts` stub is gone.
- **i18n**: `messages.training.results` is an ICU plural (AR one/two/few/other, EN
  one/other). `/services` + `/training` removed from `routesInProgress`.
- **Tests**: `tests/e2e/services-training.spec.ts` (8 cases ×2 locales ×2 projects);
  `tests/unit/programs.test.ts` (9). Full matrix **108/108** (chromium + mobile).
- **Design review**: `docs/reports/reviews/sprint-04-design-review.md` — no High/Medium,
  5 Low → S8.
- **Close fixes**: `/ar/services` Best-Practices 96 → 100 (`shouldPrefetch` query-strip);
  breadcrumb nav given a real accessible name; 4 stale mobile e2e locators fixed.

## 2. Metrics

| Metric | Target | Result | Route/scope |
|---|---|---|---|
| Lighthouse Perf (mobile) | ≥ 95 (S7) | 72 – 91 | 4 new routes |
| Lighthouse A11y / BP / SEO | ≥ 95 | **100 / 100 / 100** | all 4 routes, both locales |
| axe serious/critical | 0 | **0** | Services + Catalog + Detail × 2 locales |
| E2E specs | all green | **108/108** | chromium **+ mobile** |
| Unit specs | all green | **33/33** | +9 (`programs`) |
| CLS | < 0.05 | 0 – 0.022 | all |
| TBT | < 150 ms (S7) | 120 – 480 ms | detail page is the worst |
| Heaviest route JS (gz) | ≤ 120 KB | not re-measured — Next 16/Turbopack build drops the size column; → S7 bundle analysis | — |

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| **Markdown + `gray-matter` + `marked`, not `@next/mdx` / `next-mdx-remote`** | Turbopack + MDX interop is a live risk in Next 16; content is trusted and in-repo, so a components-in-content escape hatch isn't needed. Headings still get anchored ids; no raw HTML. | `planning/04`, this report |
| `defineCollection<S>(name, schema)` generic loader | S5's `publications`/`conferences`/`team` reuse it unchanged | `planning/04` |
| `/[locale]/training` is dynamic (`ƒ`), not SSG | it reads `searchParams` for the SSR filter default; server filtering keeps the filtered URL shareable + JS-optional | S4 `tests.md` |
| `Course` JSON-LD: only `name`/`description`/`provider`/`inLanguage`(+`award`) | no confirmed price or dated intake → no `offers`, no `hasCourseInstance`, no `aggregateRating` | `schema.ts`, checklist E1–E5 |
| Result count = one polite `aria-live` region with a full ICU phrase | never announce a bare number to a screen reader | S4 `tasks.md` S4-T07 |
| `shouldPrefetch` splits the pathname before the `routesInProgress` lookup | query-string CTAs (`/contact?subject=…`) were bypassing the guard | `bf8d201` |
| Breadcrumb `<nav>` gets `breadcrumb.label`, not the page eyebrow | four nav landmarks per page need four real names | `7f7e500` |
| Mobile (Pixel 7) back in the default e2e run | S3/S4 had narrowed to `--project=chromium` and missed 4 regressions | `a4b3cd2` |

## 4. New dependencies

| Package | Version | Why | Client JS cost |
|---|---|---|---|
| `gray-matter` | ^4.0.3 | frontmatter parsing for the content collections | 0 — build/server only |
| `marked` | ^16 | markdown → HTML for program bodies | 0 — rendered on the server, `Prose` gets a trusted HTML string |

Both are server-only; neither ships to the browser. `zod` was already added in S2 (listed
then, first used here).

## 5. Deferred / not done

| Item | Why | Where it went |
|---|---|---|
| Performance ≥ 95 | S7 is the perf sprint | S7 |
| MDX components-in-content | not needed for trusted in-repo content | — (dropped; revisit only if an author needs it) |
| `publications` / `conferences` / `team` collections | one collection pattern first | S5 |
| Contact form + `?subject=` handling | the form is S6 | S6 |
| Real (confirmed) program data — open/upcoming, duration, fees, process | depends on HRC | checklist E1–E7 |
| 5 Low design-review items | polish pass | S8 |
| Firefox / WebKit e2e | cross-browser matrix | S8 |

## 6. Content flags raised

| Flag | Checklist row |
|---|---|
| The 7 service names + one-line descriptions are ours (from the mandate string + department names) | D1 |
| "How to commission" line is generic — real per-service process unconfirmed | D2 |
| Arbitration — formal unit? scope? credentials? | D3 |
| Translation — languages offered, request process | D4 |
| Which programs are actually open / upcoming (app shows none as open) | E1 |
| Per-program duration / schedule / format / language | E2 |
| Prerequisites / audience / certificate | E3 |
| Fees / subsidy (not shown — no guessing) | E4 |
| Real registration process | E5 |
| Which archived programs to keep + correct names | E6 |
| English Diploma — levels / CEFR / graduation | E7 |

## 7. Risks

- **Realized — R7 (perf):** continues; the new routes are 72–91. Contained: a11y/BP/SEO
  100, CLS ~0, TBT mostly < 250 ms (detail page 480 ms). S7 owns it; LHCI keeps
  `performance` as `warn`.
- **Realized — R1 (unverified facts):** the program catalog is entirely provisional data.
  Mitigated exactly as the checklist prescribes — every entry flagged (E1–E7), nothing
  shown "open", a genuine empty state and a real "register interest" path.
- **Realized — R15 (a11y regressions creep in across sprints):** sprint verification had
  quietly narrowed to `--project=chromium` since S3, hiding 4 mobile failures (one of them
  a breadcrumb-landmark naming issue). Caught at close, fixed, and the full e2e matrix
  (chromium + mobile) is back in the default run. S5–S7 keep both projects; S8 adds
  firefox/webkit. The register's mitigation ("axe in CI + Page DoD gate") held for axe
  itself — the gap was the Playwright project filter, not the a11y tooling.
- R8 (RTL): Services / Catalog / Detail verified in both directions (screenshots +
  Playwright mobile). Clean.

## 8. Test summary

See `tests.md`. Headline: **all green** — lint / typecheck / unit(33) / e2e(**108**,
chromium + mobile) / build; a11y + BP + SEO = 100 on all four page types both locales;
axe 0 serious/critical; `design-review` found no High/Medium. Three defects found and
fixed at close (BP-96 prefetch, breadcrumb landmark name, stale mobile locators). Perf
→ S7.

## 9. Notes for next sprint (S5 — Research + Conferences + Team)

- The `defineCollection` pattern is proven — `publications`, `conferences`, `team` should
  each be `~1` schema + `~1` loader file. Keep frontmatter minimal; flag everything
  unconfirmed.
- **Team page**: no fabricated names. Use role cards + "announced soon" until HRC confirms
  (checklist B1–B5). A `confirmed: boolean` per-person field gates whether a name renders.
- **Conferences**: `Event` JSON-LD only for events with a real date + location; otherwise
  a plain listing. No invented attendance numbers.
- **Research / Journal**: the Al-Ahgaf Journal of Social Sciences is real and named in the
  mandate — but ISSN, issue history, and the editorial board are unconfirmed (checklist
  F-rows). Render only confirmed fields; "submission" points at Contact for now.
- Keep both e2e projects in every run. Watch JS/CSS weight for S7.
- `Prose` + `KeyFacts` + `OnThisPage` + `PageHeader` + the filter pattern all carry over.

## 10. Exit criteria

From `README.md`:

- [x] Services + Training + program detail meet **Page DoD** in AR + EN (perf → S7).
- [x] `programs` collection: Zod-validated, build fails on a bad frontmatter file, unit-tested.
- [x] Filters are URL-encoded, keyboard-operable, announce the result count politely.
- [x] `Course` structured data validates; nothing claims an intake is "open" without a source.
- [x] lint / typecheck / unit / e2e / build green; axe 0 serious/critical.
- [x] `report.md`; globals + metrics; `sprint-4-complete` tag; S5 folder drafted.
