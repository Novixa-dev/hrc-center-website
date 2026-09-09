# Sprint 5 — Report

**Name:** Research + Conferences + Team · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `d98628a..cbb5013` (7) · **Tag:** `sprint-5-complete`

## 1. What shipped

Three pages, two detail templates, and two more content collections on the S4 pattern —
all built so that **nothing unverified about a real institution reaches the screen**.

- **`publications` + `conferences` collections** (`src/lib/content/`): `defineCollection`
  reused unchanged; `publicationFrontmatter` (kind / venue / authors / doi / url / issue),
  `conferenceFrontmatter` (status / startDate / endDate / location / theme). A shared
  `isoDate` preprocessor normalizes YAML dates. `getPublications` / `getJournalIssues`,
  `getConferences` / `hasEventData`.
- **`src/lib/team.ts`** — a governance model where an unconfirmed name has **no code path
  to the DOM**: records hold `name?` + `confirmed`; the sole accessor returns `name: null`
  unless `confirmed`; the card renders the role + "appointment announced soon".
- **Research** (`/[locale]/research`): focus areas (our framing from the mandate),
  "commission a study" → Contact/Services, and the **Journal section** — the real
  submission route (`law.m@ahgaff.edu` + form), an outbound link to the university's
  editorial-board page, and the one verifiable issue (Sept 2024). No ISSN, no frequency,
  no board names. `CollectionPage` + `BreadcrumbList` JSON-LD.
- **Publication detail** (`/[locale]/research/[slug]`): metadata aside, markdown body,
  external link (`url` or `doi`), `creativeWorkSchema` mapping kind →
  `PublicationIssue` / `Book` / `Report` / `ScholarlyArticle` with confirmed fields only.
- **Conferences** (`/[locale]/conferences`): a framed intro, "upcoming & in preparation"
  vs "past", a designed empty state, and an honest "past events live in News" line
  instead of a faked back-catalogue. **Event detail** emits `Event` JSON-LD **only** when
  a real date + location exist — the provisional "Second Scientific Conference" renders
  without it, dates as "to be announced".
- **Team** (`/[locale]/team`): grouped role cards, a pending-note banner, the university
  affiliation block. Empty groups (Advisory, Staff) don't render. About's Governance
  section now links here.
- **schema.ts**: `collectionPageSchema`, `creativeWorkSchema`, `eventSchema`.
- **i18n**: `research` / `conferences` / `team` namespaces, AR + EN (key parity checked).
  `/research`, `/conferences`, `/team` removed from `routesInProgress`; sitemap gains the
  publication + conference detail routes.
- **Tests**: `tests/e2e/research-conferences-team.spec.ts` (12 cases ×2 locales ×2
  projects); `tests/unit/{publications,conferences,team}.test.ts` (+19). 156/156 e2e,
  53/53 unit.
- **Close fixes**: the `<Link>`-centres-every-card bug (`1e6a21b`, pre-existing — also
  fixed Home/Training), and the `og:image` default that 404s on every non-home route
  (`3bb528b`, pre-existing since S2).

## 2. Metrics

| Metric | Target | Result | Route/scope |
|---|---|---|---|
| Lighthouse Perf (mobile) | ≥ 95 (S7) | 52 – 59 (machine under load — S3/S4 pages re-measured also ~59) | 5 new routes |
| Lighthouse A11y / BP / SEO | ≥ 95 | **100 / 100 / 100** | all 5 routes, both locales |
| axe serious/critical | 0 | **0** | Research / Publication / Conferences / Event / Team × 2 |
| E2E specs | all green | **156/156** | chromium + mobile |
| Unit specs | all green | **53/53** | +19 (S5 loaders + team) +1 (seo) |
| CLS | < 0.05 | 0 – 0.031 | all |

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| `team` = a typed model, not a collection | zero confirmed content; a model makes "`confirmed` gates the name" enforceable + unit-testable | `src/lib/team.ts`, S5 `tasks.md` |
| One accessor (`getTeamGroups`) returns `name: string \| null` | there is no code path that exposes an unconfirmed name | unit + e2e tests |
| `Event` JSON-LD only when `startDate && location` (`hasEventData`) | never claim a scheduled event without a real date and venue | `conferences.ts`, e2e |
| `creativeWorkSchema` — confirmed fields only, no ISSN / citations / ratings | representing a real journal read by academics (R10) | `schema.ts` |
| Journal issue archive = Issue 1 only | later issue dates conflict across sources (R11); show only what's verifiable | `research-content.md`, checklist F5 |
| Publication detail at `/research/[slug]` | Research is the hub; one fewer top-level route | S5 `tasks.md` |
| Shared `isoDate` preprocessor in `schema.ts` | YAML parses bare dates as `Date`; every collection with a `date` field needs it | `d98628a` |
| `<Link>` base drops `items-center gap-1` | it silently centred every card wrapping `<Link>` | `1e6a21b` |
| `og:image` defaults to `/[locale]/opengraph-image` | the per-route default 404s; per-route OG images are S7 | `3bb528b` |

## 4. New dependencies

**None.** Both collections reuse `gray-matter` + `marked` (added S4).

## 5. Deferred / not done

| Item | Why | Where it went |
|---|---|---|
| Performance ≥ 95 | S7 is the perf sprint | S7 |
| Real journal issues / ISSN / board / frequency | needs HRC | checklist F2–F7 |
| Real conference dates / venue / themes / history | needs HRC | checklist G1–G4 |
| Team names + bios + photos | needs HRC | checklist B1–B6 |
| 4 Low design-review items | polish pass | S8 |
| Firefox / WebKit e2e | cross-browser matrix | S8 |
| `news` collection + Contact form + utility pages | S6 scope | S6 |

## 6. Content flags raised

| Flag | Checklist row |
|---|---|
| Four research focus areas are our framing from the mandate | F9 |
| Journal ISSN / frequency / board not shown; board is a link-out | F2, F3, F4 |
| Issue archive = Issue 1 only; later issues held (conflicting dates) | F5 |
| `law.m@ahgaff.edu` from the journal page, not re-confirmed | F6 |
| 2023 book — title / author / imprint provisional | F8 |
| No external OJS link | F10 |
| Second Scientific Conference — status/date/venue/theme unconfirmed; no Event markup | G2 |
| First Scientific Conference — nothing shown | G1 |
| Other events belong in News | G3 |
| Board Chair / Executive Director / full Board / staff — names all unconfirmed | B1–B4 |

## 7. Risks

- **Realized — R1 (unverified facts):** the entire sprint is provisional institutional
  data. Mitigated structurally, not just by flagging: the team model *cannot* render an
  unconfirmed name, and `Event` markup *cannot* be emitted without a real date/venue.
- **Realized — R4 (team names):** exactly the anticipated case — role cards + "announced
  soon", tested twice over.
- **Realized — R10 (journal facts):** confirmed-only rendering; ISSN / board / frequency
  all withheld; link out for the board.
- **Realized — R11 (conflicting source data):** the journal issue list is trimmed to the
  one consistent entry.
- **Realized — R7 (perf):** continues (52–59, though under machine load). S7 owns it.
- R8 (RTL): all five page types verified in both directions.
- **New:** none.

## 8. Test summary

See `tests.md`. Headline: **all green** — lint / typecheck / unit(53) / e2e(**156**,
chromium + mobile) / build; a11y + BP + SEO = 100 on all five page types both locales;
axe 0 serious/critical; `design-review` no High, both Medium fixed. Three defects found
and fixed (the `<Link>` centring bug, the OG-image default, the YAML-date schema bug),
two of them pre-existing and benefiting earlier sprints. Perf → S7.

## 9. Notes for next sprint (S6 — News + Contact)

- `news` is the last collection — copy `publications` almost verbatim (`newsFrontmatter`:
  `tags?`, `date` required; `NewsArticle` JSON-LD; an RSS route).
- **Contact form**: server action → provider (or dev-log); subjects incl.
  `?subject=program` / `?subject=consultation` that Services/Training/Program/Event
  already link with. Full a11y: visible labels, inline validation, `aria-live` errors,
  honeypot + time-trap, progressive enhancement. Contact details stay hidden until HRC
  confirms (site.ts `contact` is `null`) — the form is the channel meanwhile.
- Utility pages: privacy note, accessibility statement, link hub. These come off
  `routesInProgress` last.
- After S6 every route is live → S7 can do the full metadata/OG/perf sweep.
- Keep both e2e projects. `Prose` / `KeyFacts` / `OnThisPage` / the card pattern all carry.

## 10. Exit criteria

From `README.md`:

- [x] Research + Conferences + Team + the two detail templates meet **Page DoD** in
      AR + EN (perf → S7).
- [x] No fabricated names, dates, ISSNs, or attendance figures render anywhere; every
      unconfirmed item is in the checklist and shows a neutral state.
- [x] `Event` structured data only where a real date + location exist; other structured
      data validates.
- [x] New collections Zod-validated; build fails on a bad frontmatter file; unit-tested,
      including the `confirmed: false` ⇒ name-hidden rule.
- [x] lint / typecheck / unit / e2e (chromium + mobile) / build green; axe 0 serious/critical.
- [x] `report.md`; globals + metrics; `sprint-5-complete` tag; S6 folder drafted.
