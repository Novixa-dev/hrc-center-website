# Definition of Done

Three levels: **Task**, **Page/Feature**, **Sprint**, **Project**. Higher levels assume
all lower levels passed.

## Task DoD

- [ ] Acceptance criteria in `tasks.md` met.
- [ ] Code matches conventions in `CLAUDE.md` §4 and `docs/guides/coding-standards.md`.
- [ ] No hard‑coded user‑facing strings — all via `next-intl`, AR + EN both present.
- [ ] Tokens only — no ad‑hoc hex, spacing, radius, shadow, duration.
- [ ] `pnpm lint` + `pnpm typecheck` + `pnpm build` pass (when `src/` touched).
- [ ] Relevant unit/e2e tests added or updated and passing.
- [ ] Sprint `tasks.md` checkbox ticked; `progress.md` line added; `global-progress.md` updated.
- [ ] One Conventional Commit referencing the task ID.
- [ ] Any new dependency noted in the sprint `report.md` draft with a reason.
- [ ] Any unverified fact → `content-review-checklist.md`.

## Page / Feature DoD

Everything in Task DoD, plus:

### Bilingual
- [ ] Full AR and EN content (or explicit "to be announced" — never Lorem, never a raw key).
- [ ] Layout correct in **RTL and LTR** (logical properties; directional icons flipped).
- [ ] Localized `<title>`, meta description, canonical, `hreflang` (ar/en/x‑default), OG/Twitter.
- [ ] Localized dates/numbers; localized OG image direction.

### Responsive
- [ ] Verified at 375, 768, 1024, 1440 px (and spot‑checked 320 + 1920).
- [ ] No horizontal scroll; no overlap; tap targets ≥ 24px (44px for primary).
- [ ] Wide content (tables, code, galleries) scrolls within its own container.

### Accessibility (WCAG 2.2 AA)
- [ ] Semantic landmarks; exactly one `h1`; headings nest without skips.
- [ ] Keyboard: every interactive element reachable + operable; logical order; visible focus (≥ 3:1, not obscured).
- [ ] Contrast ≥ 4.5:1 text, ≥ 3:1 UI/graphics; info never by color alone.
- [ ] Images: meaningful → descriptive localized `alt`; decorative → `alt=""`.
- [ ] Forms: visible labels, `aria-describedby` errors, `aria-live` summary, required marked.
- [ ] `prefers-reduced-motion`: non‑essential motion removed, final state shown immediately.
- [ ] `@axe-core/playwright` scan of the page in both locales — 0 serious, 0 critical.
- [ ] Manual: NVDA or VoiceOver read‑through makes sense; 200% zoom usable; forced‑colors OK.

### Performance
- [ ] Lighthouse (mobile, throttled) ≥ 95 in all four categories for this route.
- [ ] Within the performance budget (`04-technical-architecture.md` §7) for this route.
- [ ] Images AVIF/WebP with dimensions; hero `priority`, rest lazy.
- [ ] No new render‑blocking resource; client JS island justified.

### SEO / structured data
- [ ] Correct JSON‑LD type for the page, validates (Rich Results / schema.org).
- [ ] In `sitemap.xml`; internal links use descriptive anchors.

### Content quality
- [ ] Passes the anti‑AI‑smell checklist (`03-content-strategy.md`).
- [ ] AR proofread by a native‑level read; EN proofread; terminology matches the glossary.
- [ ] Every factual claim traceable to `docs/research/` or flagged.

## Sprint DoD

- [ ] All sprint tasks meet Task/Page DoD.
- [ ] Sprint `tests.md` executed; results recorded; failures fixed or logged as deferred.
- [ ] Full‑site regression (from S2 onward): `pnpm test` green.
- [ ] Lighthouse CI run for touched routes — budgets met.
- [ ] Sprint `report.md` written: what shipped, metrics, decisions, new deps, deferred
      items, risks, next‑sprint notes.
- [ ] `global-progress.md` + `global-report.md` updated.
- [ ] Exit criteria in the sprint `README.md` satisfied.
- [ ] `sprint-<n>-complete` tag created.

## Project DoD (v1.0.0)

- [ ] Master‑plan success criteria S1–S8 all met.
- [ ] All 9 page types + utility pages live in AR + EN to Page DoD.
- [ ] Site‑wide: Lighthouse ≥ 95 (mobile) every route; axe 0 serious/critical; all
      structured data valid; sitemap/robots/RSS valid; hreflang complete.
- [ ] Cross‑browser/device matrix passed (S8).
- [ ] `content-review-checklist.md` — every item resolved by HRC or explicitly deferred
      by Novixa with a note.
- [ ] Handover pack delivered: deploy guide, content‑edit guide, case study, social kit,
      presentation.
- [ ] `global-report.md` final version signed; `main` tagged `v1.0.0`.
- [ ] No `TODO`/`FIXME`/`[NEEDS HRC CONFIRMATION]` left in shipped app code without a
      tracked checklist entry.
