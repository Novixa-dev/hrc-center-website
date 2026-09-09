# Conferences — content brief & copy

**Goal:** Explain that HRC runs scientific conferences + seminars, list what's announced,
and honestly route the (unknown) back-catalogue to News.
**Primary CTA:** "Contact the Center" (empty state) / "Ask about this event" (detail).
**SEO title:** AR `المؤتمرات والندوات — مركز بحوث حضرموت` · EN `Conferences & Seminars — …`
**JSON-LD:** `CollectionPage` + `BreadcrumbList` (list); `Event` **only when a real date +
location exist**, otherwise just `BreadcrumbList` (detail).

## Structure (`/conferences`)

Page header → breadcrumb → intro line → **Upcoming & in preparation** (cards) →
**Past conferences** (cards, or — for now — a line pointing to News) → CTA band.
Full empty state (`empty.title/body/cta`) if the collection is ever empty.

The intro and the "past → News" line are **ours**: the real conference history isn't
verifiable (G1), so we don't fake a list.

## Content model — `conferences` collection

`src/content/conferences/{ar,en}/<slug>.md`, Zod frontmatter:
`title · summary · status(upcoming|past|planned) · startDate? · endDate? · location? ·
theme? · provisional · order` + markdown body.

`hasEventData(fm)` = `startDate && location`. The event detail emits `Event` JSON-LD only
when that's true.

### Provisional entry (S5)

| slug | status | date/venue | flag |
|---|---|---|---|
| `second-scientific-conference` | `planned` | none | G2 — "in preparation" per the Sep 2025 preparatory-committee meeting; no confirmed date, venue, or theme |

Body is **ours**, drawn from `research/02` §Events.

## Event detail (`/conferences/[slug]`)

Breadcrumb → status badge + `h1` + summary → markdown body → KeyFacts aside (date /
location → "to be announced" when unknown; theme when set) → "Ask about this event"
(Contact) → provisional note → "All conferences".

## Fixed copy

`src/messages/{ar,en}.json` under `conferences.*`. Status labels: `قادم` / `قيد الإعداد` /
`سابق` (upcoming / in preparation / past). "To be announced" = `يُعلَن لاحقاً`.

## Flags → checklist

| Flag | Row |
|---|---|
| First Scientific Conference — nothing shown | G1 |
| Second Scientific Conference — status/date/venue/theme all unconfirmed; no Event markup | G2 |
| Other events live in News, not here | G3 |
| No event photo galleries | G4 |
