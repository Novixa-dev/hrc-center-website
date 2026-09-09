# Sprint 5 — Test Plan & Results

Ref: [`docs/testing/00-test-strategy.md`](../../testing/00-test-strategy.md),
[`docs/testing/01-qa-checklist.md`](../../testing/01-qa-checklist.md).

## Plan — what we test this sprint

| # | Area | Type | Pass condition |
|---|---|---|---|
| 1 | Static | `pnpm lint` + `pnpm typecheck` | 0 errors |
| 2 | `publications` / `conferences` schemas + loaders | Vitest | valid + invalid frontmatter, sort order, `getJournalIssues`, `hasEventData` |
| 3 | `team` model — the `confirmed` gate | Vitest | an unconfirmed record never exposes its name; brief names absent from the serialized model |
| 4 | Research / Conferences / Team + 2 detail templates | Playwright chromium **+ mobile** | h1, sections, journal submission route, external board link, issue→detail nav, breadcrumb, `aria-current` |
| 5 | Structured data honesty | e2e | `CollectionPage` present; `Event` **absent** on the provisional conference; `Course`-style fabrication check |
| 6 | Content honesty | e2e + manual | client-brief names never in the DOM (Team + publication detail); "to be announced" for the unconfirmed event; no ISSN/frequency/board names |
| 7 | Accessibility | `@axe-core/playwright` on all 5 page types × 2 locales | 0 serious/critical |
| 8 | Lighthouse | mobile, 5 routes | a11y/BP/SEO ≥ 95; perf recorded |
| 9 | Design review | `design-review` 7 dimensions + anti-AI-smell | High/Medium fixed |
| 10 | Responsive | 390 / 1440, LTR + RTL | no overlap / h-scroll; reflows |

## Execution

**Build under test:** `143dcd0` (pages) → `1e6a21b` (fixes) · local prod, build + serve
share `NEXT_PUBLIC_SITE_URL`. **Date:** 2026-09-09

### Automated

| Suite | Command | Result | Notes |
|---|---|---|---|
| Lint | `pnpm lint` | ✅ | |
| Typecheck | `pnpm typecheck` | ✅ | strict + `exactOptionalPropertyTypes` + `noUncheckedIndexedAccess` |
| Unit | `pnpm test:unit` | ✅ **53/53** | +19 (`publications` 7, `conferences` 7, `team` 5); +1 seo (OG default) |
| E2E + axe | `pnpm test:e2e` | ✅ **156/156** | chromium + mobile; +24 in `research-conferences-team.spec.ts` (2 locales × 2 projects) |
| Build | `pnpm build` | ✅ | research / research/[slug] / conferences / conferences/[slug] / team all **SSG** |
| Lighthouse | `lighthouse` CLI (mobile) | ✅ gate | see below |

### Lighthouse (mobile, simulated throttling, local prod)

| Route | Perf | A11y | Best-Practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| /ar/research | 52 | **100** | **100** | **100** | 4.9 s | 2,110 ms | 0.031 |
| /en/research | 55 | **100** | **100** | **100** | 5.5 s | 1,220 ms | 0 |
| /ar/conferences | 54 | **100** | **100** | **100** | 5.1 s | 1,790 ms | 0 |
| /ar/team | 59 | **100** | **100** | **100** | 4.8 s | 1,140 ms | 0 |
| /ar/research/al-ahgaff-journal-issue-1 | 57 | **100** | **100** | **100** | 5.0 s | 1,270 ms | 0 |

**Performance caveat:** the machine was under heavy load during this run. `/en/about` and
`/en/services` (shipped in S3/S4 at perf 64–91) re-measured the *same session* also scored
**59** (LCP ~5 s, TBT ~800 ms). The S5 pages are architecturally identical to S4 (RSC +
CSS-reveal + the same 5-family font stack) — these numbers track the existing baseline
under load, not a regression. Real perf work is **S7** (font subsetting ~342 KB is the
lever). Full data: `docs/testing/reports/sprint-05/lighthouse-summary.json`.

### Design review

`docs/reports/reviews/sprint-05-design-review.md` — **no High.** Two **Medium**, both
pre-existing and both fixed this sprint:

1. `<Link>` carried an unconditional `items-center` in its base class → every card that
   used it as a `flex flex-col` wrapper (ProgramCard, PillarsGrid, the new Conference /
   Publication cards) centred its eyebrow / badge / short text. Removed it (`1e6a21b`).
   This visibly improved Home and Training too.
2. `og:image` defaulted to a per-route path that 404s (`3bb528b`).

4 Low logged for S8.

### Content honesty (manual + e2e)

- **Team:** no name renders. Unit test asserts every mapped `name` is `null`; unit + e2e
  both assert `Maknoon|Bin-Dohry|Baharoon|مكنون|بن دحري` never appear.
- **Event:** `hasEventData` is false for the provisional conference → **no `Event`
  JSON-LD** (e2e asserts `not.toContain('"Event"')`); date + location render "to be
  announced".
- **Journal:** Issue 1 (Sept 2024) only; no ISSN, no frequency, no board names; the board
  link points to the university site; `law.m@ahgaff.edu` carries an "under confirmation"
  note.
- No `[NEEDS HRC CONFIRMATION]` string renders anywhere.

### Responsive (manual, screenshots — `scratchpad/shots5b/`, `shots5c/`)

| Page | 390 (RTL) | 390 (LTR) | 1440 (RTL) | 1440 (LTR) |
|---|---|---|---|---|
| Research | ✅ rail → `<details>`; cards 1-up | ✅ | ✅ rail inline-end; 2×2 focus grid | ✅ |
| Publication detail | ✅ aside above body | ✅ | ✅ sticky aside | ✅ |
| Conferences | ✅ single card full-width | ✅ | ✅ | ✅ |
| Event detail | ✅ KeyFacts above body | ✅ | ✅ sticky aside inline-start (RTL) | ✅ |
| Team | ✅ role cards 1-up; banner wraps | ✅ | ✅ 3-up cards; affiliation block | ✅ |

## Findings

| # | Severity | Area | Description | Fix / status |
|---|---|---|---|---|
| 1 | Medium | Component consistency | `<Link>`-as-card centred its content | ✅ `1e6a21b` |
| 2 | Medium | SEO | `og:image` default 404s on non-home routes | ✅ `3bb528b` |
| 3 | Schema bug | content | YAML `date:` parsed as `Date`, failed Zod | ✅ `d98628a` — `isoDate` preprocessor |
| 4–7 | Low | design-review | journal card heights, "Issues" heading weight, tall sticky-aside column, empty groups | ⏭️ S8 |
| 8 | — | Performance | 52–59 (< 95) | ⏭️ **S7** |

## Deferred

| Finding | Why | Follow-up |
|---|---|---|
| Performance ≥ 95 | S7 is the perf sprint | S7 |
| 4 Low design-review items | polish pass | S8 |
| Firefox / WebKit e2e | cross-browser matrix | S8 (`FULL_MATRIX=1`) |
| Per-route JS budget number | Next 16/Turbopack build drops the column | S7 bundle analysis |

## Verdict

- [x] lint / typecheck / unit (**53**) / e2e (**156**, chromium + mobile) / build — green.
- [x] A11y + Best-Practices + SEO = **100** on all 5 page types, both locales.
- [x] axe: 0 serious/critical.
- [x] New collections Zod-validated; a bad frontmatter file throws at build; unit-tested,
      including the `confirmed: false` ⇒ name-hidden rule.
- [x] `Event` structured data only where a real date + location exist; other structured
      data validates.
- [x] No fabricated names, dates, ISSNs, or attendance figures render anywhere.
- [x] `design-review` pass; no High; both Medium fixed; Low logged.
- [ ] Performance ≥ 95 → **S7**.

Reports archived: `docs/testing/reports/sprint-05/`.
