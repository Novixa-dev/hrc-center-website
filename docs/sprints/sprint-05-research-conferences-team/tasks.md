# Sprint 5 — Tasks

Task IDs: `S5-T<mm>`. One commit per task, `Refs: S5-T<mm>`. Lowercase subjects; scope
from `commitlint.config.mjs`.
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S5-T01 | ☐ | `publications` + `conferences` schemas | extend `baseFrontmatter` in `src/lib/content/schema.ts`; `publicationFrontmatter` (`kind`, `date?`, `authors?`, `doi?`, `url?`), `conferenceFrontmatter` (`status` upcoming\|past\|planned, `startDate?`, `endDate?`, `location?`, `theme?`); enums exported | |
| S5-T02 | ☐ | `publications` + `conferences` loaders | `src/lib/content/{publications,conferences}.ts` via `defineCollection`; `getPublications`/`getConferences` (date/status sort), `getBySlug`, `getSlugs`; invalid frontmatter throws at build | |
| S5-T03 | ☐ | `team` model + `confirmed` gating | `src/lib/team.ts` (typed array) **or** a `team` collection; `group` + `confirmed`; a `teamMember` view type where `name` is `string \| null` and is `null` unless `confirmed`; unit test: an unconfirmed member never exposes its name | |
| S5-T04 | ☐ | Provisional content | `src/content/publications/{ar,en}/*` (the journal + confirmed issues + the 2023 book, all flagged), `src/content/conferences/{ar,en}/*` ("second scientific conference — in preparation"); `team` = roles from `research/02` §Leadership with `confirmed: false`; checklist B1–B5, F1–F5, G rows | |
| S5-T05 | ☐ | Research content brief + copy | `docs/content/research-content.md` — what HRC researches, focus areas, "commission research" path, Journal aims/scope/submission; AR + EN; flags | `(docs)` |
| S5-T06 | ☐ | `Research` page + Journal section | `/[locale]/research` — `PageHeader` + `OnThisPage` + research overview + focus areas + **Journal** block (aims, how to submit → `law.m@ahgaff.edu`, issue archive, board → link out); metadata + `BreadcrumbList` JSON-LD; remove `/research` from `routesInProgress` | |
| S5-T07 | ☐ | Publication detail template | `/[locale]/research/[slug]` — breadcrumb, header, metadata aside, `Prose` body, external link; `ScholarlyArticle`/`Book` JSON-LD with confirmed fields only; `generateStaticParams`; `generateMetadata` | |
| S5-T08 | ☐ | Conferences content brief + copy | `docs/content/conferences-content.md` — list intro, upcoming/past framing, empty-state copy, event-detail structure; AR + EN | `(docs)` |
| S5-T09 | ☐ | `Conferences` list + event detail | `/[locale]/conferences` (upcoming/past split, cards, empty state) + `/[locale]/conferences/[slug]` (`Event` JSON-LD **only** when date + location exist); metadata; remove `/conferences` from `routesInProgress` | |
| S5-T10 | ☐ | Team content brief + copy | `docs/content/team-content.md` — group order + labels, the "announced soon" copy, affiliation lockup wording; AR + EN | `(docs)` |
| S5-T11 | ☐ | `Team` page | `/[locale]/team` — grouped role cards, graceful pending state for every unconfirmed person, university affiliation lockup; About `governance` teaser deep-links here; metadata + `BreadcrumbList`; remove `/team` from `routesInProgress` | |
| S5-T12 | ☐ | Tests | `tests/e2e/{research,conferences,team}.spec.ts` (both locales: h1, sections, journal submission route, `Event` JSON-LD presence/absence, no brief names in Team, empty states, axe); `tests/unit/*` for the new loaders + the `confirmed` rule; sitemap expectations | |
| S5-T13 | ☐ | Lighthouse + design review | LH a11y/BP/SEO ≥ 95 new pages ×2 locales (record perf); `design-review` spot pass → `docs/reports/reviews/sprint-05-design-review.md`; fix High/Medium | `(review)` |
| S5-T14 | ☐ | Close S5 | `progress.md` / `tests.md` / `report.md`; globals + metrics + page-build status; checklist flags; `sprint-5-complete` tag; draft `sprint-06` folder | `(close)` |

## Task detail

### S5-T03 — the `confirmed` rule
The single most important honesty gate this sprint. The view layer must make it
*impossible* to render an unconfirmed name: the mapper returns `name: null` for
`confirmed: false`, the card component renders the role + pending copy when `name` is
`null`, and both a unit test and an e2e test assert that the names in `research/02`
§Leadership (Bin-Dohry, Maknoon, Baharoon, بن دحري, مكنون) never appear in the Team page
DOM. The university President may be named **only** as an ex-officio university reference,
not as center leadership, and only if that framing is confirmed acceptable — otherwise
role-only.

### S5-T06 — Journal section, confirmed-only
Render: the journal name (AR + EN, from the mandate), that it's peer-reviewed and
published by HRC, the **real** submission route (publication form + `law.m@ahgaff.edu`),
and the issues we can verify (Issue 1 — Sept 2024). Do **not** render: ISSN, frequency
("semi-annual" is unconfirmed), a full issue list (dates are inconsistent — R11), or
board names. Link to `ahgaff.edu/magazines/13/editorial-board/` for the board.

### S5-T09 — `Event` JSON-LD
Only emit `Event` when the entry has both `startDate` and `location`. The "Second
Scientific Conference" is currently `status: planned` with neither → it renders as a
plain informational page ("in preparation", per the Sep 2025 preparatory-committee
meeting), no `Event` markup.

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | `news` collection + article + RSS | S6 owns news | S6 |
| — | Contact page + `<ContactForm>` server action | S6 | S6 |
| — | Privacy / accessibility / links utility pages | S6 | S6 |
| — | Perf tuning | dedicated sprint | S7 |
| — | Real journal issues / ISSN / board / conference themes / staff names | needs HRC | checklist (B/F/G) |
