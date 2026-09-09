# News — content brief & copy

**Goal:** A light, honest news stream — recent updates on the Center's work, filterable by
topic, with an article template and an RSS feed. Not a complete archive.
**Primary CTA:** none of its own (CTA band at the foot).
**SEO title:** AR `الأخبار — مركز بحوث حضرموت` · EN `News — Hadramout Research Center`
**JSON-LD:** `CollectionPage` + `BreadcrumbList` (list); `NewsArticle` + `BreadcrumbList` (article).
**Feed:** `/[locale]/news/rss.xml` — valid RSS 2.0, linked from `<head>` and the page.

## Structure

- **List** (`/news`): page header → breadcrumb → **tag filter** (a `<nav>` of `<a>` chips:
  "All" + one per tag; `?tag=<t>`; `aria-current` on the active; a polite count) →
  reverse-chronological card grid → **history note** → CTA band. Empty state per tag.
- **Article** (`/news/[slug]`): breadcrumb → date + tag links → `h1` → summary →
  markdown body → provisional note → "All news" → related.

The tag filter is server-side (the chips are real links), so a filtered URL is shareable
and works with JS disabled.

## Content model — `news` collection

`src/content/news/{ar,en}/<slug>.md`, Zod frontmatter:
`title · summary · date (required) · tags (default []) · provisional · order` + body.

Tag vocabulary (localised in `messages.news.tags.*`): `journal` · `training` ·
`conferences` · `arbitration`.

### Provisional entries (S6)

Four, from `research/02` §Events — **all `provisional: true`**, flagged H1:

| slug | date | tags |
|---|---|---|
| `journal-issue-1-published` | 2024-09-01 | journal |
| `arbitrator-training-concluded` | 2024-07-01 | training, arbitration |
| `english-diploma-graduation` | 2025-01-04 | training |
| `second-conference-preparatory-meeting` | 2025-09-14 | conferences |

Bodies are **our summaries**; day-level precision is approximate where the source only
gave a month (noted in each body / flagged).

## Fixed copy

`src/messages/{ar,en}.json` under `news.*`. The **history note** —
"This is a selection of recent updates; it is not a complete record of the Center's
activity since 2013" — is deliberate (R13): we never imply the list is exhaustive.
Result count is an ICU plural.

## Flags → checklist

| Flag | Row |
|---|---|
| Which events to publish + exact dates + descriptions | H1, G3 |
| Day-level dates approximate where the source gave only a month | H1 |
| News history is a selection, not a complete archive | H1 (note shown; R13) |
| Article images — none (placeholder policy) | I-rows |
