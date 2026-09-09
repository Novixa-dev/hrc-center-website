# Product Requirements — HRC Website

## 1. Problem

HRC has no independent digital presence. Prospective students, researchers, partner
organizations, journalists and the community cannot find a clear, credible, current
account of what the Center does, what training is available, what it publishes, or how
to engage it. Its identity is diluted inside the university CMS and scattered social posts.

## 2. Users & jobs‑to‑be‑done

| Persona | Context | Primary job | Key content | Success = |
|---|---|---|---|---|
| **Prospective trainee** (student / young professional, Mukalla & Hadramout) | Mobile, Arabic, limited bandwidth | "Find a course that fits me and sign up" | Training catalog, dates, format, cost, registration | Submits an enquiry / saves the WhatsApp contact |
| **Researcher / academic** | Desktop, AR or EN | "Understand the research agenda; submit to the journal; propose collaboration" | Research areas, journal (scope, archive, author guidelines), contact | Downloads guidelines / emails a proposal |
| **Organization / government body** | Desktop, formal | "Assess HRC for a consultancy, study, arbitration or training contract" | Services, past work, governance, credibility signals, contact | Sends a consultation request |
| **Journalist / community member** | Mobile | "Get facts, latest news, events, and a contact" | About, news, events, press‑ready facts, contact | Finds accurate info + a way to reach HRC |
| **Novixa prospect** (secondary) | Any | "Judge whether Novixa can build a serious site" | The site itself + footer credit + case study | Contacts Novixa |

## 3. Functional requirements

### 3.1 Global

- FR‑G1 Locale routing: `/ar` (default), `/en`. Locale persists across navigation.
- FR‑G2 `<html lang>` and `dir` set per locale; full RTL for AR, LTR for EN.
- FR‑G3 Locale switcher in header + footer; switching keeps the user on the same page.
- FR‑G4 Global header (logo, primary nav, locale switch, prominent "Contact"/"Enroll" CTA)
  and footer (contact block, quick links, social, affiliation, Novixa credit, legal).
- FR‑G5 Skip‑to‑content link; keyboard‑operable nav incl. mobile menu.
- FR‑G6 404 and error pages, localized.
- FR‑G7 All pages have localized `<title>`, meta description, canonical, `hreflang`
  alternates, OG/Twitter tags, and appropriate JSON‑LD.
- FR‑G8 Sitemap (`/sitemap.xml`) covering both locales; `robots.txt`; RSS for news.

### 3.2 Pages

| Page | Must include |
|---|---|
| **Home** | Mandate statement; 3 pillars (Research / Consultancy / Training); featured programs (from collection); featured publication + journal callout; latest news (3); "who we serve" paths; affiliation; CTA to Contact. |
| **About** | Establishment (2013) & legal status; Vision / Mission / Objectives (labeled block, verbatim); relationship to Al‑Ahgaff University; "past/present/future of Hadramout" framing; governance overview → link to Team; org units. |
| **Services** | The 7 services, each: name, description, "how to commission", CTA. Consultation request path. |
| **Training / Programs** | Filterable catalog (by field, format, status). Each program page: outcome blurb, "who it's for", duration, format, schedule/next intake, language, certificate, cost/subsidy, registration CTA. "How enrollment works" steps. Upcoming intakes list. |
| **Research** | Research areas/agenda; projects (if any confirmed); **Journal section**: aims & scope, editorial board, author guidelines, issue archive (collection), ethics, submission CTA/email; other publications (books). |
| **Conferences / Events** | Upcoming events; archive with theme, date, outcomes, proceedings link, gallery. The Second Scientific Conference featured if confirmed. |
| **Team** | Leadership + Board of Trustees + research staff/advisors. Each: name, role, short bio, photo. If names unconfirmed → show roles + "announced soon" state, no fabrication. |
| **News** | Dated, filterable list (collection). Article pages with share + related. RSS. |
| **Contact** | Single smart form (subject = general / program enquiry / consultation / research / media); name, email, phone (optional), message; consent checkbox. Address + map; phone; email; WhatsApp; hours; social. Location‑within‑campus note. |
| **Link hub** (`/ar/links`) | Compact list of key destinations for social bios. |
| **Legal** | Privacy note (what the form + analytics collect), and accessibility statement. |

### 3.3 Forms

- FR‑F1 One reusable `<ContactForm>` with a `subject` prop/preset.
- FR‑F2 Visible labels, required markers, helper text, blur‑time validation, inline
  errors wired with `aria-describedby`, `aria-live` error summary on submit failure.
- FR‑F3 Submit → loading state → success or error state with recovery. Works without JS
  (progressive enhancement) where feasible; server action handles delivery.
- FR‑F4 Spam mitigation: honeypot + time‑trap + provider‑side (no CAPTCHA that harms a11y).
- FR‑F5 No PII stored by us; delivered to HRC email via provider; privacy note linked.

### 3.4 Content model (collections, per locale)

- `programs` — field, format, status (open/upcoming/archived), duration, schedule,
  language, certificate, cost, summary, body (MDX), CTA.
- `publications` — type (journal‑issue / book / report), title, date, cover, authors,
  abstract, link/PDF, journal‑issue number.
- `news` — title, date, excerpt, cover, tags, body (MDX).
- `conferences` — title, date(s), location, theme, status, outcomes, proceedings, gallery.
- `team` — name, role, group (leadership/board/staff/advisor), bio, photo, order,
  `confirmed: boolean`.

All frontmatter Zod‑validated at build; missing required field fails the build.

## 4. Non‑functional requirements

| Area | Requirement |
|---|---|
| Performance | Lighthouse mobile ≥ 95 (all 4 categories). JS ≤ ~120KB gz on the heaviest route. Fonts self‑hosted, `display: swap`, subset. Images AVIF/WebP + dimensions. No CLS from ads/embeds. |
| Accessibility | WCAG 2.2 AA. Contrast ≥ 4.5:1 (text) / 3:1 (UI). Full keyboard. Visible focus. Reduced‑motion. Screen‑reader sane. Target size ≥ 24px (AA). |
| SEO | Semantic HTML, one `h1`/page, logical headings, descriptive links, canonical + hreflang, structured data, fast + mobile‑friendly. |
| i18n | No hard‑coded UI strings. Locale‑aware dates/numbers. AR digits per HRC preference (confirm). Translations reviewed, not machine‑literal. |
| Privacy | No third‑party trackers by default. Analytics cookieless. Form data minimized. Privacy note. |
| Browser support | Last 2 versions of Chrome, Edge, Firefox, Safari (desktop + iOS/Android). Graceful degradation below. |
| Resilience | Works on slow 3G/4G (Yemen context): small payloads, offline‑tolerant static pages, no blocking third‑party. |
| Maintainability | TS strict, lint/format enforced, documented content‑editing workflow, no dead boilerplate. |

## 5. Acceptance (project‑level)

Meets all FRs above + NFRs + master‑plan success criteria S1–S8, with sprint reports
green and the content review checklist resolved or explicitly deferred by HRC.

## 6. Assumptions & dependencies

- HRC will confirm the review‑checklist items and provide assets (logo, photos, bios)
  before public launch. The build proceeds with flagged placeholders meanwhile.
- Email delivery uses a free provider (Formspree or Resend + a domain later);
  until then, form posts to a configurable endpoint / logs in dev.
- "Local only" hosting: no Vercel project created this phase; `vercel.json` + deploy
  guide prepared for a one‑click connect later.
