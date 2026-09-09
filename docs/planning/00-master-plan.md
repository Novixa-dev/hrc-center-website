# Master Plan — HRC Website

> The one‑page (ish) plan. Details live in the sibling planning docs and the sprint folders.

## 1. Goal

Deliver an independent, bilingual, modern, fast, accessible website for the Hadramout
Research Center that (a) gives HRC a real digital identity and conversion paths, and
(b) stands as a portfolio‑grade showcase for Novixa in the education/research sector.

## 2. Success criteria

| # | Criterion | Measure |
|---|---|---|
| S1 | All core pages live in AR + EN | 9 page types, full parity |
| S2 | Performance | Lighthouse mobile ≥ 95 across Perf/SEO/Best‑Practices/A11y; LCP < 2.0s on 4G; CLS < 0.05 |
| S3 | Accessibility | WCAG 2.2 AA; automated axe clean; manual keyboard + SR pass |
| S4 | SEO/OG | Full metadata, canonical + hreflang, sitemap, robots, JSON‑LD; per‑page OG images |
| S5 | Responsive | Flawless at 320–1920px; verified 375/768/1024/1440 |
| S6 | Content integrity | Zero unverified factual claims published; all gaps in the review checklist |
| S7 | Craft | Passes an external‑eye "does this look like a professional studio built it?" review |
| S8 | Handover | Deploy guide, content‑edit guide, case study, social kit all delivered |

## 3. Scope

### In scope (v1)

- Pages: Home, About, Services, Training/Programs, Research (+ Journal section),
  Conferences/Events, Team, News, Contact. Plus: 404, legal/privacy, link‑hub.
- Bilingual AR (default) / EN with locale routing, RTL/LTR, localized metadata.
- Content collections: news, programs, publications, conferences, team.
- Contact form + program enquiry + research submission info + consultation request
  (single form component, typed subject) → email provider. WhatsApp deep link. Map.
- Design system: tokens, components, motion, iconography, OG templates, brand pattern.
- SEO/OG/JSON‑LD, sitemap, robots, RSS for news.
- Analytics (privacy‑friendly, e.g. Vercel Analytics or Plausible‑style), cookie‑free.
- QA: Playwright e2e + axe, Lighthouse CI, cross‑browser matrix, content proofing.
- Docs: everything in `docs/`, handover pack, Novixa case study, HRC social kit.

### Out of scope (v1) — recorded for a future phase

- Full journal OJS / peer‑review workflow (link out or lightweight archive only).
- Online payments / paid course checkout.
- Authenticated portals (student, researcher).
- CMS/admin UI (content is Git‑based MDX; handover explains editing).
- Custom domain + email provisioning (recommended in handover; not executed).
- Arabic + English + a third language (architecture ready; only AR/EN authored).
- Live deployment to Vercel (user chose "local only for now").

## 4. Approach

1. **Docs‑first.** Research → PRD → IA → content strategy → tech architecture → design
   system, before app code. (Sprint 0.)
2. **Design system before pages.** Tokens + primitives + motion + one reference page.
   (Sprint 1–2.)
3. **Vertical slices.** Build page‑by‑page, each fully bilingual + responsive + accessible
   + tested before moving on. (Sprints 3–6.)
4. **Hardening pass.** SEO/OG/perf/a11y sweep across the whole site. (Sprint 7.)
5. **QA + review + polish.** Full test matrix, design review, content review, fixes.
   (Sprint 8.)
6. **Handover.** Deploy guide, edit guide, case study, social kit, final report.
   (Sprint 9.)

Every task ends with a conventional commit. Every sprint ends with tests + a written
report + tracker updates.

## 5. Timeline (effort‑based, not calendar)

The brief's "2 weeks" is a client‑facing figure. Internally we track by sprint
completion, not days. Rough order‑of‑magnitude: 10 sprints, S0–S9. See
[`05-sprint-plan.md`](05-sprint-plan.md).

## 6. Roles

| Role | Owner |
|---|---|
| Product / project lead | Novixa (user) |
| Design + build + docs + QA | AI pair (Claude) under CLAUDE.md rules |
| Content authority / fact confirmation | HRC (via review checklist) |
| Final sign‑off | Novixa → HRC |

## 7. Key risks (top 3 — full register in `07-risk-register.md`)

1. **Unverified facts about a real institution** → strict "cite or flag" rule; review checklist.
2. **Missing assets (logo, photos)** → placeholder policy (typographic/brand pattern), asset request bundle.
3. **Scope creep on a pro‑bono project** → scope locked here; changes go to a "phase 2" list.

## 8. Definition of Done (project)

All success criteria S1–S8 met, all sprint reports green, global report signed,
handover pack delivered, `main` tagged `v1.0.0`.
