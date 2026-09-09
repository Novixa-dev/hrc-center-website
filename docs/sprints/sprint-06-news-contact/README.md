# Sprint 6 — News + Contact

**Goal:** Ship the News section (list + article + RSS), the Contact page with a working,
fully-accessible form, and the remaining utility pages — after which **every route is
live** and S7 can run the site-wide hardening sweep.

**Depends on:** S5 (`defineCollection`, `Prose`, `PageHeader`, `OnThisPage`, SEO infra,
the `?subject=` CTA targets already wired from Services / Training / Program / Event).
**Blocks:** S7 (needs all routes live for the full metadata/OG/perf/a11y sweep);
S8 (final QA).

## Scope

### In
- **`news` collection** (`src/content/news/{ar,en}/<slug>.md`): Zod frontmatter
  (`title`, `summary`, `date` **required**, `tags?`, `provisional`, `order`) + markdown
  body. Copy the `publications` shape almost verbatim.
- **News list** (`/[locale]/news`): reverse-chronological cards, optional tag filter
  (URL-encoded, same a11y pattern as the S4 `FilterBar` — links + polite count), empty
  state. Seeded from `research/02` §Events (all provisional, flagged H1).
- **Article** (`/[locale]/news/[slug]`): breadcrumb, header (date, tags), `Prose` body,
  `NewsArticle` JSON-LD, share links (no counts), related. `generateStaticParams`.
- **RSS** (`/[locale]/news/rss.xml` or `/rss.xml`): valid RSS 2.0 from the collection.
- **Contact** (`/[locale]/contact`): `<ContactForm>` — a server action.
  - subjects: general / research / consultancy / training / program enquiry / media —
    pre-selected from `?subject=` (Services, Training, Program, Event all link with it).
  - fields: name, email, subject, message; visible labels; inline validation on blur;
    errors in a polite `aria-live` region; success + error states.
  - spam: honeypot field + time-trap (min fill time); no CAPTCHA.
  - **progressive enhancement**: the form posts and works with JS disabled; enhance to
    inline submit.
  - delivery: server action → provider adapter; **dev/no-key → structured log** (R9).
  - contact details (phone/email/address) stay **hidden** until HRC confirms
    (`site.ts` `contact` is `null`, checklist A4–A6); the form + social links are the
    channel meanwhile. Map: static, no third-party embed, until an address is confirmed.
- **Utility pages**: privacy note (`/[locale]/privacy`), accessibility statement
  (`/[locale]/accessibility`), link hub (`/[locale]/links` — optional). `noindex` where
  appropriate. These come off `routesInProgress` last.
- **SEO**: metadata + canonical + hreflang per page; `NewsArticle` validates; RSS valid.
- **Tests**: e2e for the list + article + **the form** (keyboard, validation, `aria-live`,
  honeypot rejection, success path, JS-disabled post); unit for the `news` schema + the
  form's validation + spam checks.
- Remove `/news`, `/contact`, `/privacy`, `/accessibility` from `routesInProgress`.
- Keep the full e2e matrix (chromium + mobile).

### Out (this sprint)
- Real contact details / a real provider key → HRC / Novixa (checklist A, R9).
- Real news history beyond what `research/02` records → HRC (H1).
- Performance tuning → S7.
- Newsletter signup, comments → Phase 2.

## Deliverables

- [ ] `src/lib/content/news.ts` (+ schema); `src/content/news/{ar,en}/*` (provisional, flagged).
- [ ] `/[locale]/news` (+ tag filter) and `/[locale]/news/[slug]` (`NewsArticle` JSON-LD).
- [ ] RSS route, valid RSS 2.0.
- [ ] `/[locale]/contact` + `<ContactForm>` server action + provider adapter + dev log.
- [ ] `/[locale]/privacy`, `/[locale]/accessibility` (+ link hub if useful).
- [ ] `tests/e2e/{news,contact}.spec.ts` + `tests/unit/*`.
- [ ] Lighthouse a11y/BP/SEO ≥ 95 on the new pages ×2 locales (perf recorded).
- [ ] `docs/content/{news,contact}-content.md`; checklist flags.
- [ ] `docs/reports/reviews/sprint-06-design-review.md`.

## Exit criteria

- [ ] News list + article + Contact + utility pages meet **Page DoD** in AR + EN (perf → S7).
- [ ] The form is fully keyboard + screen-reader operable, validates inline, announces
      errors politely, resists a naive bot, **and works with JS disabled**.
- [ ] Form delivery works against a provider **or** logs a structured record in dev; no
      secret is committed.
- [ ] RSS validates; `NewsArticle` structured data validates.
- [ ] No unconfirmed contact detail (phone / email / address) renders.
- [ ] `news` collection Zod-validated; build fails on a bad file; unit-tested.
- [ ] lint / typecheck / unit / e2e (chromium + mobile) / build green; axe 0 serious/critical.
- [ ] `report.md`; globals + metrics; `sprint-6-complete` tag; S7 folder drafted.

## Risks for this sprint

| Risk | Mitigation |
|---|---|
| Contact form has no provider account (R9) | provider adapter interface + a dev logger fallback; the real key is a handover step; e2e tests the log path |
| Server actions + progressive enhancement in Next 16 | the `<form action={serverAction}>` pattern degrades natively; test with JS disabled in Playwright |
| Form a11y is easy to get subtly wrong | `ui-ux-pro-max --domain forms` for the pattern; e2e keyboard + `aria-live` assertions; manual SR pass |
| Spam without a CAPTCHA | honeypot + time-trap + server-side validation; rate-limiting is a deploy concern noted for handover |
| No real news to publish (H1) | provisional entries from `research/02`, all flagged; a genuine empty/thin-state design; "history since 2013 not claimed complete" (R13) |
| Utility page content (privacy) makes legal claims | keep it factual and minimal — what data the form collects and where it goes; no boilerplate legalese; flag for HRC/Novixa review (checklist L) |
