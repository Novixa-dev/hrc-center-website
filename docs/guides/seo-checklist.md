# SEO & Social Sharing Checklist

Run per page (Page DoD) and site‑wide in Sprint 7. Based on the brief's Appendix G,
expanded for a bilingual Next.js app.

## Per‑page

### Titles & descriptions
- [ ] One `<title>`, ≤ 60 chars, unique, format `<Page> — Hadramout Research Center`
      (AR: `<الصفحة> — مركز بحوث حضرموت`).
- [ ] `<meta name="description">` 140–155 chars, a real sentence, unique, includes the
      primary term, localized.
- [ ] No keyword stuffing; reads naturally in the page's language.

### Crawl & indexing
- [ ] `<link rel="canonical">` = the page's own clean URL (no query, no trailing slash).
- [ ] `hreflang` alternates: `ar`, `en`, `x-default` (→ `ar`). Self‑referencing included.
- [ ] Page is in `sitemap.xml` with `lastmod`.
- [ ] Not accidentally `noindex`; `robots.txt` doesn't block it.
- [ ] Clean, stable, human‑readable slug.

### Semantic HTML
- [ ] Exactly one `<h1>` = the visible page title.
- [ ] Headings nest without skipping levels.
- [ ] Landmarks: `header`, `nav`, `main`, `footer`, `article`/`section` as appropriate.
- [ ] Lists are lists; tables have `<caption>`/`<th scope>`; time uses `<time datetime>`.
- [ ] Internal links: descriptive anchor text (not bare "here"/"read more").

### Media
- [ ] Every meaningful image has localized `alt`; decorative `alt=""`.
- [ ] Images sized (width/height or aspect-ratio); AVIF/WebP; lazy except LCP.
- [ ] `<figure>`/`<figcaption>` for captioned media.

### Structured data (JSON‑LD)
- [ ] Correct `@type` for the page:
      - Site root: `EducationalOrganization` (+ `WebSite`)
      - About: `AboutPage`
      - Program detail: `Course` (+ `CourseInstance` if a dated intake)
      - Journal: `Periodical` / issues as `PublicationIssue`; articles `ScholarlyArticle`
      - News article: `NewsArticle`
      - Event/conference: `Event`
      - All non‑home: `BreadcrumbList`
- [ ] Validates in schema.org validator + Google Rich Results Test.
- [ ] Values match visible content (no hidden/inflated data).

### Open Graph / Twitter
- [ ] `og:title`, `og:description`, `og:type`, `og:url` (canonical), `og:locale`
      (+ `og:locale:alternate`), `og:site_name`.
- [ ] `og:image` — per‑page generated image, 1200×630, < 300KB, text legible, correct
      direction for the locale; `og:image:alt`.
- [ ] `twitter:card = summary_large_image` + title/description/image.
- [ ] Preview checked in a real debugger (or a local render) for AR and EN.

## Site‑wide (Sprint 7)

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real base; all canonical/OG/sitemap absolute URLs use it.
- [ ] `robots.txt`: allow all, `Sitemap:` line present, no stray disallows.
- [ ] `sitemap.xml`: every route × locale, valid XML, correct `<xhtml:link hreflang>` entries.
- [ ] `news/rss.xml`: valid RSS 2.0, absolute links, localized per feed (or one feed w/ language).
- [ ] `public/llms.txt`: concise site map for LLM consumers.
- [ ] Favicons + `apple-touch-icon` + `manifest.webmanifest` (name, theme color, icons).
- [ ] `<meta name="author" content="Novixa">` (or `humans.txt`) — per Novixa's preference.
- [ ] 404 returns HTTP 404 and is localized; no soft‑404s.
- [ ] No duplicate content between locales (hreflang handles it) or between `/` and `/ar`.
- [ ] Core Web Vitals green on every route (see perf budget).
- [ ] Mobile‑friendly: viewport meta, no horizontal scroll, tap targets, readable fonts.
- [ ] All external links reviewed; `rel="noopener"` on `target="_blank"`.
- [ ] Structured data: batch‑validate every type.
- [ ] Analytics installed (cookieless) and firing; no PII in events.

## Post‑launch (handover doc, not v1 build)

- [ ] Submit sitemap to Google Search Console + Bing Webmaster (both properties, AR/EN).
- [ ] Claim/verify Google Business Profile (Mukalla).
- [ ] Set canonical domain + 301 from any old center URLs if possible.
- [ ] Monitor Search Console for coverage/hreflang errors for the first month.
