# Sprint 7 — Tasks

Task IDs: `S7-T<mm>`. One commit per task, `Refs: S7-T<mm>`. Lowercase subjects; scope
from `commitlint.config.mjs` (`seo`, `perf`, `a11y`).
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S7-T01 | ✅ | Metadata & canonical audit | Audit all routes in AR & EN; verify title templates, descriptions, canonical URLs, and hreflang pairs | `test(seo)` |
| S7-T02 | ✅ | Structured data validation | Validate JSON-LD across all 13 route types using schema.org validator; verify zero missing required fields | `test(seo)` |
| S7-T03 | ✅ | Open Graph cards review | Test dynamic `opengraph-image.tsx` rendering for AR and EN; verify dimensions, contrast, and fallback cards | `feat(og)` |
| S7-T04 | ✅ | Sitemap & RSS feed check | Verify valid XML output at `/sitemap.xml`, `/robots.txt`, and `/[locale]/news/rss.xml` | `test(seo)` |
| S7-T05 | ✅ | Font loading & subset optimization | Optimize Google Fonts loading strategy, preconnects, font-display: swap, and subsetting to minimize font payload | `perf(perf)` |
| S7-T06 | ✅ | Image & asset delivery pass | Audit all `next/image` components for modern formats (AVIF/WebP), proper sizes attribute, priority on hero images | `perf(perf)` |
| S7-T07 | ✅ | Bundle analysis & code-splitting | Run Next.js bundle analyzer; audit client components; minimize client JS payload across heaviest routes | `perf(perf)` |
| S7-T08 | ✅ | CLS & layout stability hunt | Ensure CLS < 0.05 on all routes; verify explicit aspect ratios and font fallback metric matching | `test(perf)` |
| S7-T09 | ✅ | A11y hardening & reduced motion | Site-wide Axe sweep, keyboard navigation review, visible focus ring consistency, and prefers-reduced-motion verification | `test(a11y)` |
| S7-T10 | ✅ | Lighthouse sweep & Sprint 7 close | Run full Lighthouse mobile audit on all routes; record metrics; write `report.md`; tag `sprint-7-complete` | `docs(sprint)` |
