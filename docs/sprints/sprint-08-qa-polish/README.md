# Sprint 8 — QA, Review & Polish

**Goal:** Execute full cross-browser and cross-device QA, conduct native-read content proofreading in Arabic and English, verify edge states and error boundaries, run a design-review polish pass across all 13 live page types, update the content review checklist, and leave the repository 100% verified and green.

**Depends on:** S7 (all hardening complete).
**Blocks:** S9 (handover, documentation & deployment guides).

## Scope

### In
- **Cross-Browser & Device Matrix:** Full Playwright verification across Desktop Chromium and Mobile Pixel 7 across all viewports (320px to 1920px).
- **Content Proofreading:** Native-read Arabic (formal, institutional, scholarly) and English localization review.
- **Edge States & 404:** Localized 404 page, empty collection filter states, error boundary verification.
- **Design Review & Anti-AI-Smell Polish:** Verification that typography, spacing, shadows, and subtle micro-interactions read as high-end studio craft.
- **Resilience Check:** No-JS / reduced-bandwidth verification ensuring progressive enhancement and content accessibility.
- **Checklist Sync:** Comprehensive audit of `docs/content/content-review-checklist.md` to guarantee zero unverified claims published.
- **Full Regression Suite:** `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm test:e2e`, `pnpm build`.

### Out
- Final production deployment / server provisioning → S9.
- Marketing materials & client handover package → S9.

## Exit criteria

- [ ] All 8 tasks in `tasks.md` completed.
- [ ] 100% green test matrix across unit, e2e, lint, and typecheck.
- [ ] Content review checklist synchronized with zero unflagged claims.
- [ ] Sprint 8 `report.md` authored; tagged `sprint-8-complete`.
