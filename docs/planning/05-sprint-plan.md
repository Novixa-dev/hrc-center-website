# Sprint Plan

Work is organized into 10 sprints (S0–S9). Each sprint has its own folder under
`docs/sprints/` containing `README.md` (goal + scope + exit criteria), `tasks.md`
(task list + acceptance criteria + tracker), `progress.md` (running log),
`tests.md` (test plan + results), `report.md` (written retro + metrics).

Sprints are **effort units, not calendar weeks**. A sprint closes only when its exit
criteria are met and its report is written.

Task IDs: `S<n>-T<m>` (e.g. `S2-T04`). Commits reference the ID.

---

## S0 — Discovery & Setup  ⟵ *current*

**Goal:** Everything needed to build with confidence — research, plans, design brief,
skills rules, guides, trackers, sprint scaffolding.

**Deliverables:** `docs/research/*`, `docs/planning/*`, `docs/design/00–06` (briefs),
`docs/skills/*`, `docs/guides/*`, `docs/testing/00–01`, `docs/reports/global-*`,
`docs/sprints/_templates/*`, `docs/sprints/sprint-00*/*`.

**Exit criteria:** All Sprint 0 docs committed; open questions captured in the review
checklist; Sprint 1 tasks drafted.

---

## S1 — Design System (paper)

**Goal:** Lock the visual + motion language before code.

**Tasks (outline):** finalize palette & contrast matrix; typography system (AR + EN
pairing, scale, line‑heights); spacing/radius/shadow/z tokens; component inventory with
states; motion tokens + patterns; iconography rules; brand pattern/motif exploration;
OG image template design; logo/affiliation lockup approach; low‑fi wireframes for all 6
templates (AR + EN direction); design‑review rubric.

**Exit criteria:** `docs/design/01–08` complete and internally consistent; tokens
expressed as a table ready to become `tokens.css`; wireframes for every template;
a contrast‑checked color set; sign‑off note in the sprint report.

---

## S2 — Project Scaffold & Foundation

**Goal:** A running, empty‑but‑correct bilingual app with the design system wired.

**Tasks (outline):** `pnpm` init; Next 15 + TS strict; Tailwind v4 + `tokens.css` from
S1; `next/font` AR+EN; ESLint/Prettier/jsx‑a11y; Husky + lint‑staged; next-intl routing +
middleware + `[locale]` layout (`lang`/`dir`); message catalog skeleton; `ui/` primitives
(Button, Link, Container, Field…); `layout/` Header + MobileNav + Footer + LocaleSwitcher
+ SkipLink; motion wrappers; SEO + schema libs; sitemap/robots; error/404; Playwright +
axe + Vitest + Lighthouse CI config; `.env.example`; CI workflow file; a placeholder Home
that proves RTL/LTR, nav, locale switch, fonts, tokens.

**Exit criteria:** `pnpm dev` serves `/ar` + `/en` with working nav, locale switch, RTL,
fonts, tokens; `pnpm lint typecheck build test` all green; Lighthouse ≥ 95 on the shell;
axe clean.

---

## S3 — Home + About

**Tasks (outline):** content briefs + AR/EN copy for Home & About (flagged);
sections: Hero, PillarsGrid, FeaturedPrograms (stub data), JournalFeature, LatestNews
(stub), AudiencePaths, CtaBand; About: page header, VisionMission block (verbatim),
lineage/affiliation, org units, governance teaser; metadata + JSON‑LD
(`EducationalOrganization`, `AboutPage`, `BreadcrumbList`); OG images; responsive + a11y +
both locales; page tests.

**Exit criteria:** Home + About done to DoD in AR + EN; Lighthouse ≥ 95; axe clean;
copy flags logged.

---

## S4 — Services + Training

**Tasks (outline):** `programs` collection (schema, loader, sample entries from research
— marked provisional); Services page (7 services, anchors, sub‑nav, consultation CTA);
Training catalog (filter bar, cards, empty states) + program detail template
(`Course` JSON‑LD); "how enrollment works"; upcoming intakes; AR/EN copy; tests.

**Exit criteria:** Both pages + program detail to DoD; filters deep‑linkable + a11y;
`Course` structured data valid; provisional‑content flags logged.

---

## S5 — Research + Conferences + Team

**Tasks (outline):** `publications` + `conferences` + `team` collections; Research page
+ Journal section (aims/scope, editorial board, author guidelines, issue archive,
submission CTA) + publication detail; Conferences list (upcoming/past) + event detail
(`Event` JSON‑LD) + gallery; Team page (grouped, `confirmed` handling, bios) ; AR/EN copy;
tests.

**Exit criteria:** Three pages + two detail templates to DoD; no fabricated names/data;
structured data valid; flags logged.

---

## S6 — News + Contact

**Tasks (outline):** `news` collection + list (tag filter) + article template
(`NewsArticle` JSON‑LD, share, related) + RSS; Contact page: `<ContactForm>` (subjects,
validation, `aria-live`, honeypot/time‑trap, server action → provider, success/error,
progressive enhancement) + contact details + map island + hours + social; privacy note;
link hub; accessibility statement; AR/EN copy; tests incl. form e2e.

**Exit criteria:** News + Contact + utility pages to DoD; form delivers (or logs in dev)
and is fully accessible; RSS valid; flags logged.

---

## S7 — SEO, OG, Performance & A11y Hardening

**Tasks (outline):** full metadata/canonical/hreflang audit across every route × locale;
JSON‑LD validation sweep; OG image QA (both directions); sitemap/robots/RSS validation;
image optimization pass (formats, sizes, priority, lazy); font subset audit; bundle
analysis + code‑split tuning to hit budgets; CLS hunt; `prefers-reduced-motion` audit;
full axe sweep + manual keyboard/SR/zoom/forced‑colors pass; fix list → fixes.

**Exit criteria:** Every page ≥ 95 Lighthouse (mobile) all categories; performance budget
met on the heaviest route; axe zero serious/critical site‑wide; structured data all valid;
hardening report written.

---

## S8 — QA, Review & Polish

**Tasks (outline):** cross‑browser/device matrix (Chrome, Edge, Firefox, Safari; iOS,
Android; 320→1920); full Playwright regression; content proofread (AR + EN, native‑read);
`design-review` skill pass (7 dimensions) → findings → fixes; link check; 404/edge‑state
check; reduced‑bandwidth check; final anti‑AI‑smell review; visual‑polish fixes.

**Exit criteria:** Test matrix all pass; design‑review findings resolved or deferred with
reason; content proof sign‑off; polish backlog empty or explicitly deferred; QA report written.

---

## S9 — Handover & Marketing

**Tasks (outline):** `vercel.json` + step‑by‑step deploy guide (connect repo, env vars,
domain later); content‑editing guide (how to add a news post / program / publication,
how translations work); admin/README polish; **Novixa case study** (`docs/marketing/`);
**HRC social kit** (AR/EN launch posts, image specs, hashtag set — from the brief);
handover presentation (via `slides` skill); final `global-report.md`; tag `v1.0.0`.

**Exit criteria:** Handover pack complete; case study + social kit delivered; global
report signed; repo tagged.

---

## Cross‑sprint conventions

- **Every sprint:** update `docs/reports/global-progress.md` at start and end; write
  `report.md`; run the sprint's `tests.md`; tag `sprint-<n>-complete` (lightweight).
- **Content flags** discovered in any sprint go straight into
  `docs/content/content-review-checklist.md`.
- **New dependencies** are listed in that sprint's `report.md` with a one‑line reason.
- **Design changes** after S1 are logged in `docs/design/00-design-brief.md` "changes" section.
- A sprint may spawn a **fix sub‑task list** in its folder if review turns up issues.
