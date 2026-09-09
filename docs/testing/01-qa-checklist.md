# QA Checklist

Master checklist. Per‑page runs live in each sprint's `tests.md`; the full run is Sprint 8.

## Per‑page (every page, both locales)

### Render & content
- [ ] Loads with no console errors/warnings; no failed requests.
- [ ] Exactly one `<h1>` = visible title; headings nest correctly.
- [ ] All content present; no raw i18n keys; no `[NEEDS HRC CONFIRMATION]` visible in app.
- [ ] No Lorem Ipsum anywhere.
- [ ] Links all resolve (internal + external); external open with `rel="noopener"`.
- [ ] Images load, correct `alt`, no broken/oversized.

### Bilingual
- [ ] AR version complete + RTL correct (layout, icons, punctuation, numerals per decision).
- [ ] EN version complete + LTR correct.
- [ ] Locale switch keeps you on the same page; `<html lang/dir>` correct.
- [ ] Dates/numbers localized; no hard‑coded formats.
- [ ] `hreflang` + canonical present and correct.

### Responsive
- [ ] 320 / 375 / 768 / 1024 / 1440 / 1920 — no horizontal scroll, no overlap, no clipping.
- [ ] Landscape phone OK.
- [ ] Tap targets ≥ 24px (44px primary); comfortable spacing.
- [ ] Wide content scrolls inside its own container.
- [ ] Sticky header doesn't hide content or focus.

### Accessibility
- [ ] `@axe-core/playwright`: 0 serious, 0 critical (moderate logged w/ decision).
- [ ] Keyboard: full reach + operate; logical order; visible focus (3:1, not clipped/obscured); no trap.
- [ ] Screen‑reader pass: headings, landmarks, link purpose, form flow make sense.
- [ ] 200% + 400% zoom usable.
- [ ] `prefers-reduced-motion`: no non‑essential motion; content immediate.
- [ ] Forced‑colors / high‑contrast: content + focus visible.
- [ ] Color‑blind: no information lost.
- [ ] Contrast: text ≥ 4.5:1, UI/large ≥ 3:1 (spot‑check key pairs).

### Performance
- [ ] Lighthouse mobile (local prod build): Perf / A11y / Best‑Practices / SEO all ≥ 95.
- [ ] LCP < 2.0s, CLS < 0.05, TBT < 150ms (throttled).
- [ ] Route JS ≤ 120KB gz; total transfer ≤ 500KB.
- [ ] Images AVIF/WebP + dimensions; only LCP image `priority`.
- [ ] Fonts subset, `swap`, ≤ budget; no layout shift on font load.

### SEO / social
- [ ] `<title>` ≤ 60, unique, formatted; meta description 140–155, unique.
- [ ] JSON‑LD: correct type, validates, matches visible content.
- [ ] OG/Twitter tags complete; OG image renders correctly (AR + EN direction), alt present.
- [ ] In `sitemap.xml`; descriptive internal anchor text.

### Content quality
- [ ] Anti‑AI‑smell checklist passed.
- [ ] AR proofread (native‑level); EN proofread; terminology matches glossary.
- [ ] Every fact traceable to research or flagged.

## Forms (Contact)
- [ ] Works without JS (progressive enhancement) — server action handles submit.
- [ ] Visible labels; required marked (not color‑only); helper text persistent.
- [ ] Validation on blur; inline errors wired via `aria-describedby`; `aria-invalid`.
- [ ] Submit: loading → success (clear confirmation) or error (with recovery).
- [ ] Failed submit with ≥ 2 errors: focus moves to a linked error summary.
- [ ] `aria-live` announces errors/success without stealing focus.
- [ ] Correct `type` / `inputmode` / `autocomplete`; mobile keyboards correct.
- [ ] Honeypot + time‑trap active; no CAPTCHA harming a11y.
- [ ] No PII stored by us; privacy note linked; consent checkbox works.
- [ ] Subject preset works from deep links (e.g. `/contact?subject=consultation`).
- [ ] Bidi: AR message text + LTR email/phone fields behave.

## Site‑wide
- [ ] `/` redirects to `/ar` (or negotiated); `/en` reachable.
- [ ] 404 page: localized, returns HTTP 404, offers a way back.
- [ ] `robots.txt`, `sitemap.xml`, `news/rss.xml`, `llms.txt` valid.
- [ ] Favicons, `apple-touch-icon`, `manifest.webmanifest`.
- [ ] All structured‑data types validate (batch).
- [ ] Nav + footer identical placement across pages; active state correct.
- [ ] Analytics firing (cookieless), no PII, no consent banner needed.
- [ ] No mixed content; HTTPS assumptions hold with the configured `SITE_URL`.
- [ ] `pnpm verify` (full suite) green.

## Cross‑browser / device (Sprint 8)
- [ ] Chrome, Edge, Firefox, Safari (desktop, last 2 versions).
- [ ] iOS Safari + Android Chrome (real devices if possible).
- [ ] Reduced‑bandwidth (Slow 4G) walkthrough of 3 key journeys.
- [ ] JS‑disabled smoke test of home + a detail page + contact.

## Sign‑off
- [ ] All above pass or are explicitly deferred (with reason + follow‑up task).
- [ ] QA report written in the sprint `tests.md` / `docs/reports/global-report.md`.
