# Sprint 3 — Home + About

**Goal:** Ship the real Home and About pages to full Page DoD, in Arabic and English —
the first two pages a visitor and a stakeholder will judge the site by.

**Depends on:** S2 (foundation, components, i18n, SEO infra).
**Blocks:** S4–S6 reuse the section components and content patterns established here.

## Scope

### In
- **Content:** briefs + AR‑first drafted copy (EN localization) for Home and About, with
  every unverified fact flagged and added to `content-review-checklist.md`.
- **Sections** (`src/components/sections/`): `Hero`, `PillarsGrid`, `FeaturedPrograms`
  (stub data — real `programs` collection is S4), `JournalFeature`, `LatestNews` (stub),
  `AudiencePaths`, `CtaBand` · `VisionMission`, `Lineage`, `OrgUnits`, plus a governance teaser.
- **Home page** (`/[locale]`): compose the sections per `design-system/…/pages/home.md`
  + `design/07` §1. Replace the placeholder.
- **About page** (`/[locale]/about`): `Overview` template — page header, sticky "on this
  page", Vision/Mission/Objectives labeled block (verbatim, flagged), lineage + affiliation,
  the six departments, governance teaser → (future) Team page.
- **SEO:** `generateMetadata` + `buildMetadata` per page; `AboutPage` + `BreadcrumbList`
  JSON‑LD on About; per‑page OG (uses the S2 template).
- **Motion:** `Reveal`/`Stagger` on ≤ 2 key elements per viewport; reduced‑motion verified.
- **Tests:** page e2e (both locales: h1, key sections, nav active state, axe) + Lighthouse
  a11y/BP/SEO ≥ 95 per page.
- Remove `/about` from `routesInProgress`.

### Out (this sprint)
- Real `programs` / `news` collections → S4 / S6 (Home uses clearly‑marked stub data).
- Team page (governance detail) → S5.
- Services / Training / Research / Conferences / Contact → S4–S6.
- Performance tuning → S7.

## Deliverables

- [ ] `docs/content/ar/home.md` + `en/home.md`, `ar/about.md` + `en/about.md` — briefs + copy.
- [ ] `src/components/sections/` — the sections listed above, each token‑driven,
      bilingual, RTL‑checked, a11y‑clean.
- [ ] `/[locale]` real Home (placeholder removed); `/[locale]/about` About.
- [ ] Metadata + canonical + hreflang + OG + JSON‑LD on both pages.
- [ ] `tests/e2e/home.spec.ts` + `about.spec.ts`; unit tests for any new `lib` helper.
- [ ] Lighthouse a11y/BP/SEO ≥ 95 both pages, both locales (perf recorded, S7 gate).
- [ ] `docs/reports/reviews/sprint-03-design-review.md` — first `design-review` pass.
- [ ] Content flags in `content-review-checklist.md`; global trackers updated.

## Exit criteria

- [x] Home + About meet **Page DoD** (`planning/06`) in AR + EN (performance deferred to S7).
- [x] lint / typecheck / unit / e2e (38) / build green (perf `warn` only).
- [x] axe 0 serious/critical on both pages, both locales.
- [x] `design-review` pass done; 2 High + 4 Medium findings fixed, rest logged (S8/assets).
- [x] No `[NEEDS HRC CONFIRMATION]` string rendered in the app; each tracked in the checklist.
- [x] `report.md` written; globals updated; `sprint-3-complete` tag; S4 folder drafted.

## Risks for this sprint

| Risk | Mitigation |
|---|---|
| Home feels thin without real programs/news | Curated, clearly‑labelled stub entries from research; "provisional" styling; real data in S4/S6 |
| About's Vision/Mission wording not exact | Use the fetched center‑page text, flag it "confirm exact wording" (checklist C1–C3) |
| Governance section implies names we can't confirm | Role cards + "appointment announced soon"; no names until checklist B1–B5 resolved |
| Section components over‑fitted to Home | Design them for reuse (props for content); Services/Training will exercise them |
| Motion creeps past 2 elements/viewport | `design-review` motion check + DoD |
