# Sprint 7 — SEO, OG, Performance & A11y Hardening

**Goal:** Run a comprehensive optimization, performance tuning, accessibility, and SEO
hardening pass across **all 13 live page types** in Arabic and English, bringing mobile
Lighthouse performance to the target budget (≥ 90–95) and ensuring zero accessibility defects.

**Depends on:** S6 (all routes are now live).
**Blocks:** S8 (final QA, proofreading, and cross-browser review).

## Scope

### In
- **Metadata, Canonical & Hreflang:** Complete audit across all routes in AR & EN.
- **Structured Data (JSON-LD):** Site-wide validation sweep ensuring no schema warnings or errors.
- **Open Graph & Social Cards:** Dynamic/fallback OG image generation review in RTL & LTR.
- **Performance & Asset Optimization:**
  - Font subsetting and preload tuning (Arabic & Latin typography).
  - Image loading strategies (AVIF/WebP, priority on heroes, lazy below fold).
  - JavaScript bundle analysis and elimination of unnecessary client imports.
  - Cumulative Layout Shift (CLS) verification (CLS < 0.05).
- **Accessibility Hardening:**
  - Full site-wide Axe Core audit (zero serious or critical issues).
  - Manual keyboard traversal and focus indicator visibility sweep.
  - Strict compliance with `prefers-reduced-motion` in all CSS and animation layers.
  - Text scaling and 200% zoom verification without horizontal clipping.
- **Sitemap, Robots & RSS:** XML validity, canonical origins, and feed reader verification.

### Out
- Final content sign-off from HRC → S8 / Handover.
- Third-party deployment & DNS provisioning → S9.

## Exit criteria

- [ ] All routes achieve Lighthouse A11y, Best Practices, and SEO scores of 100/100.
- [ ] Lighthouse Mobile Performance elevated to target budget across primary routes.
- [ ] 0 Axe serious or critical violations across all routes and both locales.
- [ ] All JSON-LD structures valid according to schema.org standards.
- [ ] Comprehensive hardening report written in `report.md`.
