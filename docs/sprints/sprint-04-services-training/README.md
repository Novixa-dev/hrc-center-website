# Sprint 4 — Services + Training

**Goal:** Ship the Services and Training pages, and stand up the project's first
**MDX content collection** (`programs`) — the pattern every later collection follows.

**Depends on:** S3 (`sections/` layer, content patterns, i18n, SEO infra).
**Blocks:** S5 (`publications`/`conferences`/`team` collections copy this pattern); the
Home `FeaturedPrograms` stub is replaced from the real collection here.

## Scope

### In
- **`programs` content collection:** `src/content/programs/{ar,en}/<slug>.mdx`; Zod
  frontmatter schema (field, format, status `open|upcoming|archived`, duration, schedule,
  language, certificate, cost, summary, CTA); a typed loader (`getAll(locale)`,
  `getBySlug`, `getSlugs`); build fails on invalid frontmatter. 3–5 **provisional**
  entries from `research/02`, each `provisional: true` + a checklist row.
- **MDX pipeline:** `@next/mdx` or `next-mdx-remote`; a typed components map
  (`Callout`, `Figure`, `KeyFacts`, anchored headings); no raw HTML in content.
- **Services page** (`/[locale]/services`): `Overview` template — the 7 services as
  anchored sections, sticky `OnThisPage` sub‑nav, "how to commission" + a consultation
  CTA per service, page‑level "Request a consultation".
- **Training catalog** (`/[locale]/training`): `Catalog` template — filter bar (field ×
  format × status, URL‑encoded `?field=…&status=open`, SSR default + client enhance),
  program cards, "how enrolment works" steps, upcoming‑intakes list, empty state
  ("No open intakes — register interest" → contact).
- **Program detail** (`/[locale]/training/[program]`): `Detail` template — outcome,
  who‑it's‑for, `KeyFacts` aside (duration/format/language/certificate/next intake/cost),
  MDX body, register CTA, related. `Course` (+ `CourseInstance` if dated) JSON‑LD.
- **Home:** `FeaturedPrograms` reads the collection (status‑aware), not the stub.
- **SEO:** metadata + canonical + hreflang + OG per page; `Course` + `BreadcrumbList`
  structured data validates.
- **Tests:** e2e for Services + Training + a program detail (both locales, filters
  deep‑linkable + a11y, axe); unit tests for the schema + loader.
- Remove `/services` + `/training` from `routesInProgress`.

### Out (this sprint)
- `research`/`conferences`/`team`/`news` collections → S5 / S6.
- Contact form server action → S6.
- Performance tuning → S7.
- Real (confirmed) program data → depends on HRC (checklist E1–E7); provisional meanwhile.

## Deliverables

- [ ] `src/lib/content/` — schema (Zod), loader, MDX components map.
- [ ] `src/content/programs/{ar,en}/*` — 3–5 provisional programs.
- [ ] `/[locale]/services` (7 anchored services + sub‑nav + consultation CTA).
- [ ] `/[locale]/training` (filterable catalog + enrolment steps + empty state).
- [ ] `/[locale]/training/[program]` (detail + `Course` JSON‑LD).
- [ ] `FeaturedPrograms` reads the collection.
- [ ] `tests/e2e/{services,training,program}.spec.ts` + `tests/unit/programs.test.ts`.
- [ ] Lighthouse a11y/BP/SEO ≥ 95 on the new pages ×2 locales (perf recorded).
- [ ] `docs/content/{services,training}-content.md`; checklist flags.
- [ ] `docs/reports/reviews/sprint-04-design-review.md` (spot review of the `Catalog`/`Detail` templates).

## Exit criteria

- [ ] Services + Training + program detail meet **Page DoD** in AR + EN (perf → S7).
- [ ] `programs` collection: Zod‑validated, build fails on a bad frontmatter file, unit‑tested.
- [ ] Filters are URL‑encoded, keyboard‑operable, announce the result count politely.
- [ ] `Course` structured data validates; nothing claims an intake is "open" without a source.
- [ ] lint / typecheck / unit / e2e / build green; axe 0 serious/critical.
- [ ] `report.md`; globals + metrics; `sprint-4-complete` tag; S5 folder drafted.

## Risks for this sprint

| Risk | Mitigation |
|---|---|
| MDX build pipeline complexity in Next 16 / Turbopack | Start minimal (frontmatter + a small components map); a fixture test that a bad frontmatter file fails the build |
| Filter bar accessibility (chips, live region, deep‑linking) | `ui-ux-pro-max --domain ux` for the specific patterns; SSR the default state, enhance the interaction; e2e keyboard test |
| Training catalog looks empty (no confirmed open programs) | Provisional entries + a genuine, well‑designed empty state; "register interest" path is real |
| `Course` JSON‑LD with provisional data | Only emit fields we have; no fabricated `offers`/`aggregateRating`; mark provisional in the review checklist |
| Collection pattern gets over‑fitted to `programs` | Design the loader/schema generically enough that S5's collections reuse it |
