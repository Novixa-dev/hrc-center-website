# Research — content brief & copy

**Goal:** Show what HRC researches, how an institution commissions a study, and everything
about the Al-Ahgaff Journal for Social Sciences — in one page, with a publication detail
template behind it.
**Primary CTA:** "Request a study" (→ Contact).
**SEO title:** AR `البحث والدراسات والمجلة — مركز بحوث حضرموت` · EN `Research & the Journal — …`
**JSON-LD:** `CollectionPage` + `BreadcrumbList` (overview); `PublicationIssue` / `Book` /
`Report` / `ScholarlyArticle` + `BreadcrumbList` (detail).

## Structure (`/research`)

Page header → breadcrumb → `OnThisPage` rail + four anchored sections:

1. **`#focus` — What we research.** Four focus areas, **our framing** from the mandate +
   department names (F9): society & community · economy & development · law & governance ·
   heritage & culture.
2. **`#commission` — Commissioning a study.** Short prose + "Request a study" (Contact) +
   a link to Services §research. Wording is ours (D1/D2-adjacent).
3. **`#journal` — Al-Ahgaff Journal for Social Sciences.** Confirmed facts only:
   - name (F1), peer-reviewed, published by HRC;
   - **submission:** complete the journal's form and email the manuscript to
     `law.m@ahgaff.edu` (F6 — from the journal page; "under confirmation" note shown);
   - **editorial board:** not named — link out to `ahgaff.edu/magazines/13/editorial-board/` (F3);
   - **issue archive:** Issue 1, September 2024 only (F5). No ISSN (F2), no frequency (F4).
4. **`#publications` — Books & publications.** The 2023 book, provisional (F8).

## Content model — `publications` collection

`src/content/publications/{ar,en}/<slug>.md`, Zod frontmatter:
`title · summary · kind(journal-issue|book|report|paper) · date? · venue? · authors? ·
doi? · url? · issue? · provisional · order` + markdown body.

### Provisional entries (S5)

| slug | kind | date | flag |
|---|---|---|---|
| `al-ahgaff-journal-issue-1` | journal-issue | 2024-09 | F5 — contents unknown |
| `class-and-politics` | book | 2023-12 | F8 — full title / author / imprint unconfirmed |

Bodies are **our summaries**; both `provisional: true`.

## Publication detail (`/research/[slug]`)

Breadcrumb → kind eyebrow + `h1` + summary → markdown body → metadata aside
(published date, venue, authors — only when present) → external link (`url` or
`https://doi.org/<doi>`) → provisional note → "All research" → related.

`creativeWorkSchema` emits only `name` / `description` / `datePublished` / `author` /
`isPartOf` / `sameAs` where the frontmatter has them. **No** ISSN, page counts, citations,
or `aggregateRating`.

## Fixed copy

All strings in `src/messages/{ar,en}.json` under `research.*`. Focus-area titles/bodies,
the commissioning paragraph, and the "under confirmation" notes are **ours**.

## Flags → checklist

| Flag | Row |
|---|---|
| Four focus areas are our framing | F9 |
| Journal ISSN / frequency / board not shown | F2, F3, F4 |
| Issue archive = Issue 1 only; later issues held (dates conflict) | F5 |
| Submission email `law.m@ahgaff.edu` from the journal page, not re-confirmed | F6 |
| 2023 book — title/author/imprint provisional | F8 |
| No external OJS link | F10 |
