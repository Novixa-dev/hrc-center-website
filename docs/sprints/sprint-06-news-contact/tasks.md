# Sprint 6 — Tasks

Task IDs: `S6-T<mm>`. One commit per task, `Refs: S6-T<mm>`. Lowercase subjects; scope
from `commitlint.config.mjs` (`news`, `contact` are valid scopes).
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S6-T01 | ✅ | `news` schema + loader | `newsFrontmatter` (extends base; `date` required, `tags?`); `src/lib/content/news.ts` (`getNews` reverse-chron, `getBySlug`, `getSlugs`, `getTags`); invalid frontmatter throws at build; `tests/unit/news.test.ts` | `f549558` |
| S6-T02 | ✅ | Provisional news content | 4–6 `src/content/news/{ar,en}/<slug>.md` from `research/02` §Events (journal issue 1, arbitrator training, diploma ceremony, prep-committee meeting…), all `provisional: true`, flagged H1 | `f549558` |
| S6-T03 | ✅ | News content brief | `docs/content/news-content.md` — list/article structure, tag list, empty-state copy, "history not claimed complete" note; AR + EN | `7a04d90` |
| S6-T04 | ✅ | `NewsCard` + News list page | `/[locale]/news` — reverse-chron cards, tag filter (URL-encoded `?tag=`, links + polite count, S4 `FilterBar` a11y pattern), empty state; metadata + `CollectionPage`/`BreadcrumbList` JSON-LD; remove `/news` from `routesInProgress` | `7a04d90` |
| S6-T05 | ✅ | Article template | `/[locale]/news/[slug]` — breadcrumb, header (formatted date, tags), `Prose` body, `NewsArticle` JSON-LD, share links (no counts), related; `generateStaticParams`; `generateMetadata` (`type: 'article'`) | `7a04d90` |
| S6-T06 | ✅ | RSS feed | `/[locale]/news/rss.xml` (or `/rss.xml` per locale) — valid RSS 2.0 from `getNews`; linked from `<head>` (`alternate` type) and the News page | `7a04d90` |
| S6-T07 | ✅ | Contact content brief | `docs/content/contact-content.md` — subjects, field list, validation messages, success/error copy, privacy line; AR + EN; flags → checklist A/L | `(docs)` |
| S6-T08 | ✅ | Form validation + spam (pure) | `src/lib/contact.ts` — Zod schema (name/email/subject/message), `validateContact()`, honeypot + time-trap checks; `tests/unit/contact.test.ts` (valid, each invalid, honeypot filled, too-fast) | `(feat)` |
| S6-T09 | ✅ | Provider adapter + dev logger | `src/lib/contact/delivery.ts` — `deliver(payload)` interface; env-keyed provider (e.g. Resend/SMTP) or, with no key, a structured `console`/file log; **no secret committed**; `.env.example` updated | `(feat)` |
| S6-T10 | ✅ | `<ContactForm>` + server action + Contact page | `/[locale]/contact` — `<form action={serverAction}>`: visible labels, `?subject=` preselect, inline validation on blur, errors in one polite `aria-live` region, success + error states, honeypot; **works with JS disabled**; enhance to no-reload submit; social links; static map placeholder; no unconfirmed contact detail; remove `/contact` from `routesInProgress` | `(feat)` |
| S6-T11 | ✅ | Utility pages | `/[locale]/privacy` + `/[locale]/accessibility` (+ `/links` if useful) — factual, minimal; `PageHeader` + `Prose`; `noindex` as appropriate; footer links already point here; remove from `routesInProgress` | `(feat)` |
| S6-T12 | ✅ | Tests | `tests/e2e/{news,contact}.spec.ts` — news list + tag deep-link + article + `NewsArticle` JSON-LD + RSS 200/valid; contact: keyboard path, inline error + `aria-live`, honeypot rejection, success path, **JS-disabled POST**; both locales; axe; sitemap expectations | `(test)` |
| S6-T13 | ✅ | Lighthouse + design review + close | LH a11y/BP/SEO ≥ 95 new pages ×2 locales (record perf); `design-review` → `docs/reports/reviews/sprint-06-design-review.md`; fix High/Medium; `progress.md`/`tests.md`/`report.md`; globals + metrics + page-build status; checklist flags; `sprint-6-complete` tag; draft `sprint-07` folder | `(close)` |

## Task detail

### S6-T08/T10 — form accessibility (the crux)
Query first: `"accessible form inline validation aria-live" --domain forms`, then
`"nextjs server action progressive enhancement form"`. Rules:
- every input has a visible `<label>` (not just placeholder); errors are associated via
  `aria-describedby` and also summarized in **one** polite live region as full sentences.
- validation fires on blur and on submit, never on every keystroke.
- the submit is a real `<button type="submit">` inside `<form action={...}>`; with JS off
  the server action still runs, re-renders with errors or the success state.
- honeypot: a visually-hidden, `tabindex="-1"`, `autocomplete="off"` field that must stay
  empty; time-trap: reject submits faster than ~3s from render.

### S6-T09 — no secrets
The provider key is `process.env.CONTACT_*`, documented in `.env.example` with a comment,
never committed. With no key the adapter logs `{to, subject, from, message, at}` and
returns success so the UX path is testable. Real provisioning is a handover item (R9).

### S6-T11 — privacy page scope
State plainly: the contact form collects name + email + message; it is sent to the Center
by email; it is not used for anything else; there is no analytics/tracking cookie (confirm
this stays true). No generic GDPR/CCPA boilerplate. Flag for HRC/Novixa sign-off (L rows).

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | Real provider account + key | needs Novixa | handover (R9) |
| — | Real contact phone/email/address | needs HRC | checklist A4–A6 |
| — | Newsletter signup, article comments | out of v1 scope | Phase 2 |
| — | Perf tuning | dedicated sprint | S7 |
| — | Rate limiting / WAF for the form | deploy-time concern | handover |
