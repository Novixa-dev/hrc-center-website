# Sprint 5 — Design Review (spot)

**Scope:** the Research page + Journal section, the publication detail template, the
Conferences list + event detail, and the Team page. Reviewer: `design-review` rubric +
manual. **Build:** `1e6a21b`. **Locales:** AR (RTL) + EN (LTR). **Breakpoints:** 390, 1440.
Evidence: `scratchpad/shots5b/`, `scratchpad/shots5c/`.

## What's working

- **Research** reads as one page with a clear spine: focus areas → commissioning →
  Journal → publications, with the `OnThisPage` rail reused. The Journal block gives the
  real submission route (`law.m@ahgaff.edu` as a `mailto:`), links out to the university's
  editorial-board page rather than inventing a board, and lists only the issue we can
  verify.
- **Provisional honesty:** no ISSN, no frequency, no fabricated issue list, no author
  names. Every provisional item carries the "under review with the Center" note on its
  detail page.
- **Conferences** is a real, designed page despite having one entry — a framed intro, an
  "in preparation" card, and a "past conferences" section that honestly points to News
  instead of faking a history. The single card renders at a readable max-width, not as a
  lonely half-width cell.
- **Event detail** emits **no `Event` JSON-LD** because there is no confirmed date or
  venue — it degrades to a plain informational page with "to be announced" facts. This is
  the correct call and is asserted by an e2e test.
- **Team** never renders a name. Role cards show the title + "appointment announced soon",
  a lead-in banner explains why, and the university affiliation is stated plainly. A unit
  test *and* an e2e test both assert the client-brief names never reach the DOM.
- **RTL:** the `OnThisPage` rail, breadcrumbs, KeyFacts asides and card text all mirror
  correctly; the arrow links flip.
- axe: **0 serious/critical** on all five page types, both locales.

## Findings

| # | Sev | Dimension | Page | Evidence | Fix | Status |
|---|---|---|---|---|---|---|
| 1 | **Medium** | Component consistency | site-wide | `<Link>` used as a `flex flex-col` card wrapper inherited an unconditional `items-center` from its base class — ProgramCard, PillarsGrid, and the new Conference/Publication cards centred their eyebrow/badge/short lines | dropped `items-center gap-1` from the `Link` base (arrow aligns via its own margin) | ✅ fixed `1e6a21b` |
| 2 | **Medium** | SEO | every non-home route | `og:image` defaulted to `/<locale><path>/opengraph-image`, which 404s — only `/[locale]/opengraph-image` exists | default to the locale-level brand card until S7 adds per-route images | ✅ fixed `3bb528b` |
| 3 | Low | Layout | Research | the submit / editorial-board cards have slightly unequal heights at `md` | `items-stretch` is already the grid default; the visual delta is small — revisit in S8 | ⏭️ S8 |
| 4 | Low | Layout | Research | the "Issues" `h3` sits a little quietly between the two journal cards and the archive card | consider a hairline divider or more space above | ⏭️ S8 |
| 5 | Low | Spacing | Event / publication detail | the sticky aside leaves a tall empty column on a short page (same as the S4 program detail) | acceptable for a detail template; if it re-flags in S8, drop the aside to a top block on short pages | ⏭️ S8 |
| 6 | Low | Content | Team | only two groups have entries (Board, Executive); "Advisory" / "Staff" are defined but empty and correctly hidden | no action — they appear when HRC provides names | — |

## Anti-AI-smell

Clean. No fabricated people, dates, ISSNs, or attendance numbers. The Conferences page
doesn't pad itself with a fake back-catalogue. Numbered markers appear nowhere here.
Palette / type unchanged.

## Verdict

**Ship.** Two Medium findings were real and are fixed (both pre-existing and now also
helping S3/S4 pages). Four Low items logged for the S8 polish pass. The honesty gates —
no `Event` markup without a date/place, no team names, confirmed-only journal facts — hold
and are test-covered.
