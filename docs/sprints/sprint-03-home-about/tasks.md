# Sprint 3 — Tasks

Task IDs: `S3-T<mm>`. One commit per task, `Refs: S3-T<mm>`.
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S3-T01 | ✅ | Home content brief + AR/EN copy | `docs/content/{ar,en}/home.md` — goal, sections, word counts, required facts (research refs), SEO title/desc, JSON‑LD; copy for hero + all section blurbs; flags → checklist | `c91b5ad` |
| S3-T02 | ✅ | About content brief + AR/EN copy | `docs/content/{ar,en}/about.md` — establishment, Vision/Mission/Objectives (verbatim + flag), lineage, 6 departments, governance teaser; flags → checklist | `c91b5ad` |
| S3-T03 | ✅ | `Hero` section | Kicker + display h1 (≤14 words) + lede + 2 CTAs + motif bg; word‑fade option reduced‑motion‑guarded; only image (if any) `priority`; RTL mirror | `33f6ed5` |
| S3-T04 | ✅ | `PillarsGrid` section | 3 pillars (البحث/الاستشارات/التدريب) icon + blurb + link; 3‑up→1‑up; `Stagger` ≤ 8; Lucide icons `aria-hidden` | `33f6ed5` |
| S3-T05 | ✅ | `FeaturedPrograms` + `LatestNews` (stub) | Card grid from a typed local stub array (marked `provisional: true`); "all programs/news" links (prefetch‑gated); empty‑state handling | `33f6ed5` |
| S3-T06 | ✅ | `JournalFeature` + `AudiencePaths` + `CtaBand` | Journal cover + scope line + submit/browse CTAs; "I am a…" routed paths; full‑bleed bronze‑tinted CTA band | `33f6ed5` |
| S3-T07 | ✅ | Compose Home | `/[locale]/page.tsx` assembles the sections per `pages/home.md`; `generateMetadata`; `WebSite`+`Organization` already global; remove placeholder; both locales | `33f6ed5` |
| S3-T08 | ✅ | `VisionMission` + `Lineage` + `OrgUnits` sections | Labeled V/M/O block (verbatim, `lang` correct); university→HRC story + `AffiliationLockup`; 6 department cards | `33f6ed5 dda258a` |
| S3-T09 | ✅ | Compose About | `/[locale]/about/page.tsx` — Overview template, sticky "on this page" (disclosure on mobile), governance teaser; `AboutPage`+`BreadcrumbList` JSON‑LD; `generateMetadata`; remove `/about` from `routesInProgress` | `33f6ed5` |
| S3-T10 | ✅ | Page tests | `tests/e2e/{home,about}.spec.ts` — both locales: single h1, key sections visible, nav active state, breadcrumb on About, axe clean; update sitemap test | `33f6ed5` |
| S3-T11 | ✅ | Lighthouse + design review | LH a11y/BP/SEO ≥ 95 both pages ×2 locales (record perf); `design-review` 7‑dimension pass → `docs/reports/reviews/sprint-03-design-review.md`; fix blocker/high | `f9cf035 c34da77` |
| S3-T12 | ✅ | Close S3 | `report.md`; globals + metrics; checklist flags logged; `sprint-3-complete` tag; draft `sprint-04` folder | `(close)` |

## Task detail

### S3-T01 / T02 — content
AR‑first. Run the `brand` skill for voice. Anti‑AI‑smell checklist (`03-content-strategy.md`)
before moving copy into `messages/*.json`. Anything not in `docs/research/` gets
`[NEEDS HRC CONFIRMATION: <id>]` in the brief and a checklist row; the **app** shows neutral
copy or "to be announced", never the flag.

### S3-T03..T06 / T08 — sections
Server components. `"use client"` only where interactivity/motion needs it (push to leaves).
Each section takes content via props (reusable for S4–S6). Tokens only. Verify at
375/768/1024/1440 in both directions before committing.

### S3-T11 — design review
First real pass. Use the rubric in `docs/reports/reviews/design-review-rubric.md` +
`ui-ux-pro-max --domain ux` for any specific concern. This is also the "does it look
studio‑built?" gate.

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | `programs` / `news` content collections | Home uses stubs; real collections when their pages are built | S4 / S6 |
| — | Team page | Governance detail | S5 |
| — | Perf tuning | Dedicated sprint | S7 |
