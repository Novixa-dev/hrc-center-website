# Sprint 6 — Report

**Name:** News + Contact · **Status:** ✅ complete · **Closed:** 2026-09-09
**Tag:** `sprint-6-complete`

## 1. What shipped

Sprint 6 marks a major milestone: **every single route in the site is now live and accessible**.

- **News collection (`src/lib/content/news.ts`):** Zod-validated frontmatter (`title`, `summary`, `date` required, `tags`), newest-first sorting, tag extraction, and 4 provisional historical announcements from `research/02` §Events (Issue 1 publication, arbitrator training, English diploma graduation, second conference preparatory meeting).
- **News list (`/[locale]/news`):** Reverse-chronological card grid, server-side tag filter chips (`?tag=`) that are shareable and JS-independent, polite ICU plural count, per-tag empty state, and an honest history note ("selection of recent updates, not exhaustive record since 2013").
- **Article detail (`/[locale]/news/[slug]`):** Clean typography via `Prose`, breadcrumbs, publication date, tag badges, related news section, and `NewsArticle` + `BreadcrumbList` JSON-LD.
- **RSS feed (`/[locale]/news/rss.xml`):** Valid RSS 2.0 with XML declaration, localized channel metadata, and `<head>` link alternate.
- **Form validation & anti-bot protection (`src/lib/contact.ts`):** Zod schema for visible inputs (name, email, subject, message), pure `validateContact` function, honeypot spam detection, and time-trap (submissions under 3s rejected).
- **Delivery adapter (`src/lib/contact/delivery.ts`):** Decoupled provider interface supporting Resend API key with zero committed secrets, falling back to structured console logging in development so the UX flow is completely testable.
- **`<ContactForm>` server action (`src/components/sections/contact-form.tsx`):** Progressive enhancement `<form action={serverAction}>` operable with JS disabled and enhanced on client without reloads; grouped polite `aria-live` region for screen reader error announcements; visible `<label>` for every field; `?subject=` deep-link preselection.
- **Contact page (`/[locale]/contact`):** Two-column layout with form, location card (Al-Ahgaff Presidency Building in Fuah), office hours, social channels, and university affiliation link. Zero unverified phone/email/direct details exposed.
- **Utility pages (`/privacy` & `/accessibility`):** Transparent privacy policy (zero ad cookies, no commercial data resale) and WCAG 2.2 AA accessibility commitment.
- **Navigation & Sitemap milestone:** `routesInProgress` in `src/lib/nav.ts` is now **completely empty**. All routes are active in sitemap and primary navigation.
- **Tests:** `tests/e2e/{news,contact}.spec.ts` (40/40 tests pass on chromium and mobile); `tests/unit/contact.test.ts` (+9 tests). All axe accessibility checks clean.

## 2. Metrics

| Metric | Target | Result | Route/scope |
|---|---|---|---|
| Lighthouse A11y / BP / SEO | ≥ 95 | **100 / 100 / 100** | all routes, both locales |
| axe serious/critical | 0 | **0** | News / Article / Contact / Privacy / Accessibility × 2 |
| E2E specs | 100% | **196 / 196** | chromium + mobile across all 8 spec files |
| Unit specs | 100% | **71 / 71** | all 9 suites |
| Live routes | 100% | **13 / 13 page types** | all live |

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| Server action with progressive enhancement | Guarantees form submission works reliably across all network conditions and even if JavaScript is blocked | `contact.md` |
| Grouped polite `aria-live` live region | Prevents jarring screen reader interruptions while clearly communicating form errors | `contact-form.tsx` |
| Honeypot + time-trap instead of CAPTCHA | Zero user friction, zero external tracking, high efficacy against automated scrapers | `contact.ts` |
| Emptying `routesInProgress` | With Contact and utility pages live, no placeholder links remain on the site | `nav.ts` |

## 4. Residual flags & handover notes

- Real provider key (e.g. `RESEND_API_KEY`) and canonical email to be configured at production deployment (documented in `.env.example`).
- Physical address wording and canonical contact numbers awaiting HRC final confirmation (Checklist rows A3–A6, L1).
- All provisional news announcements marked with disclaimer until HRC confirmation.
