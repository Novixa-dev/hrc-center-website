# Sprint 4 — Tasks

Task IDs: `S4-T<mm>`. One commit per task, `Refs: S4-T<mm>`.
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S4-T01 | ✅ | `programs` schema + loader | `src/lib/content/schemas.ts` (Zod: field, format, status, duration, schedule, language, certificate, cost, summary, provisional, order); `src/lib/content/programs.ts` (`getAll(locale)` / `getBySlug` / `getSlugs`); invalid frontmatter throws at build; `tests/unit/programs.test.ts` | `de84604` |
| S4-T02 | ✅ | MDX pipeline + components map | `next.config` MDX; `src/components/mdx/` (`Callout`, `Figure`, `KeyFacts`, anchored `h2/h3`); no raw HTML; typed `useMDXComponents` | `bc32c9f` |
| S4-T03 | ✅ | Provisional program content | 3–5 `src/content/programs/{ar,en}/<slug>.mdx` from `research/02` (english‑diploma, motion‑graphics, ai‑productivity, +1–2); all `provisional: true`, `status: archived` unless HRC confirms; checklist E1/E6 | `de84604` |
| S4-T04 | ✅ | Services content brief + copy | `docs/content/services-content.md` — the 7 services (name, 1‑line, "how to commission"), AR + EN, flags → checklist D1–D4 | `(docs)` |
| S4-T05 | ✅ | `ServiceList` section + Services page | `/[locale]/services` — `PageHeader` + `OnThisPage` sub‑nav + 7 anchored service blocks + per‑service CTA + page‑level "Request a consultation"; metadata + `BreadcrumbList` JSON‑LD; remove `/services` from `routesInProgress` | `bc32c9f` |
| S4-T06 | ✅ | Training content brief + copy | `docs/content/training-content.md` — catalog intro, "how enrolment works" steps, empty‑state copy; AR + EN | `(docs)` |
| S4-T07 | ✅ | `FilterBar` (client) | field × format × status; URL‑encoded (`?field=…&status=open`); SSR reads params for the default; chips wrap, `+n` overflow is an operable disclosure; result count in a polite live region as a full phrase; keyboard‑operable; `ui-ux-pro-max --domain ux` consulted | `bc32c9f` |
| S4-T08 | ✅ | `ProgramCard` + `ProgramCatalog` + Training page | `/[locale]/training` — `Catalog` template: filter bar + card grid (status badge) + "how enrolment works" + upcoming intakes + empty state; reads `programs` collection; metadata; remove `/training` from `routesInProgress` | `bc32c9f` |
| S4-T09 | ✅ | `ProgramDetail` + `/training/[program]` | `Detail` template: breadcrumb, header, `KeyFacts` aside (sticky desktop / above body mobile), MDX body, register CTA (`?subject=program`), related; `generateStaticParams` from `getSlugs`; `Course` (+ `CourseInstance` if dated) + `BreadcrumbList` JSON‑LD; `generateMetadata` | `bc32c9f` |
| S4-T10 | ✅ | Home `FeaturedPrograms` from the collection | replace the `lib/content.ts` stub; show ≤ 3, prefer `open`/`upcoming`, fall back to recent `archived`; keep the "recently offered" wording when archived | `bc32c9f` |
| S4-T11 | ✅ | Tests | `tests/e2e/{services,training,program}.spec.ts` (both locales: h1, sections/cards, filter deep‑link + keyboard + live count, empty state, breadcrumb, `Course` JSON‑LD, axe); update sitemap expectations | `bc32c9f` |
| S4-T12 | ✅ | Lighthouse + design review | LH a11y/BP/SEO ≥ 95 new pages ×2 locales (record perf); `design-review` spot pass on `Catalog` + `Detail` → `docs/reports/reviews/sprint-04-design-review.md`; fix High/Medium | `(review)` |
| S4-T13 | ✅ | Close S4 | `report.md`; globals + metrics + page‑build status; checklist flags; `sprint-4-complete` tag; draft `sprint-05` folder | `(close)` |

## Task detail

### S4-T01 — collection pattern
Design `schemas.ts` + `programs.ts` so S5's `publications` / `conferences` / `team` reuse
the same shape (a generic `defineCollection(schema)` helper if it falls out cleanly).
Loader reads at build via `node:fs` + `gray-matter` (or MDX's own frontmatter),
Zod‑parses, caches. A fixture (`src/content/programs/_invalid.fixture.mdx`, git‑ignored
from the build glob) + a test that parsing it throws.

### S4-T07 — filter bar a11y
Query first: `"filter chips result count live region" --domain ux`, then
`"url encoded filter state" --stack nextjs`. The count announcement is one polite
`aria-live` region updated with a complete phrase ("12 برنامجًا مطابقًا" / "12 programs
match"), never a bare number. Filters must be usable and shareable with JS disabled
(links that set query params) — enhance to instant client filtering on top.

### S4-T09 — Course JSON-LD with provisional data
Emit only `name`, `description`, `provider` (the Organization), `inLanguage`,
`educationalLevel`/`teaches` where known. **No** `offers` unless a real price is
confirmed; **no** `hasCourseInstance` unless a real dated intake exists. Provisional
programs get `courseMode` omitted rather than guessed.

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | `publications` / `conferences` / `team` collections | one collection pattern first | S5 |
| — | Contact form server action (`?subject=program` target) | the form is S6 | S6 |
| — | Perf tuning | dedicated sprint | S7 |
