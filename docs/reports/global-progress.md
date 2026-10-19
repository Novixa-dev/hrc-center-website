# Global Progress Tracker

> **Read this first every session.** Updated after every task and at each sprint boundary.
> The detailed running log per sprint is in `docs/sprints/sprint-<n>/progress.md`.

**Last updated:** 2026-10-19
**Current sprint:** Project Complete (All Sprints S0–S9 Done)
**Current task:** Final Release Tagging (`v1.0.0`)
**Overall status:** 🟢 100% Complete · ALL 13 page types live across AR and EN; all 10 sprints delivered; all 8 success criteria verified; tagged `v1.0.0`. Production ready.

## Sprint status

| Sprint | Name | Status | Tasks done | Exit criteria met | Report | Tag |
|---|---|---|---|---|---|---|
| S0 | Discovery & Setup | ✅ Complete | 11 / 11 | ✅ | ✅ | `sprint-0-complete` |
| S1 | Design System (paper) | ✅ Complete | 13 / 13 | ✅ | ✅ | `sprint-1-complete` |
| S2 | Project Scaffold & Foundation | ✅ Complete | 14 / 14 | ✅ | ✅ | `sprint-2-complete` |
| S3 | Home + About | ✅ Complete | 12 / 12 | ✅ | ✅ | `sprint-3-complete` |
| S4 | Services + Training | ✅ Complete | 13 / 13 | ✅ | ✅ | `sprint-4-complete` |
| S5 | Research + Conferences + Team | ✅ Complete | 14 / 14 | ✅ | ✅ | `sprint-5-complete` |
| S6 | News + Contact | ✅ Complete | 13 / 13 | ✅ | ✅ | `sprint-6-complete` |
| S7 | SEO / OG / Perf / A11y Hardening | ✅ Complete | 10 / 10 | ✅ | ✅ | `sprint-7-complete` |
| S8 | QA, Review & Polish | ✅ Complete | 8 / 8 | ✅ | ✅ | `sprint-8-complete` |
| S9 | Handover & Marketing | ✅ Complete | 7 / 7 | ✅ | ✅ | `v1.0.0` |
| S10 | Verified content refresh (post-launch) | ✅ Complete | 9 / 9 | ✅ | — | — |
| S11 | Training catalog + font loading | ✅ Complete | 3 / 3 | ✅ | — | — |
| S12 | Contact accuracy | ✅ Complete | 3 / 3 | ✅ | — | — |

Legend: ⏳ not started · 🏗️ in progress · ✅ complete · ⚠️ blocked · 🔁 reopened

## Page build status (fills in S3–S6)

| Page | AR | EN | Responsive | A11y | Perf ≥95 | SEO/JSON‑LD | Tests | Done |
|---|---|---|---|---|---|---|---|---|
| Home | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Services | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Training (list) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Program (detail) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Research | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Publication (detail) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Conferences (list) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Event (detail) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Team | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| News (list) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Article (detail) | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Contact | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |
| Links / Privacy / A11y / 404 | ✅ | ✅ | ✅ | ✅ 100 | ✅ ≥95 | ✅ | ✅ | ✅ |

## Success criteria (from master plan)

| # | Criterion | Status |
|---|---|---|
| S1 | All core pages live AR + EN | ✅ Complete (13 page types, 55 routes) |
| S2 | Lighthouse mobile ≥ 95 all categories | ✅ Complete (100 A11y / 100 SEO / 100 BP) |
| S3 | WCAG 2.2 AA | ✅ Complete (0 axe-core violations) |
| S4 | Full SEO/OG/JSON‑LD | ✅ Complete (13 JSON-LD models + OG cards) |
| S5 | Responsive 320–1920 | ✅ Complete (tested on desktop and mobile) |
| S6 | Zero unverified claims published | ✅ Complete (36-point checklist enforced) |
| S7 | Passes external "studio‑built?" review | ✅ Complete (Novixa craft & anti-AI-smell) |
| S8 | Handover pack delivered | ✅ Complete (guides, case study, social kit) |

## Blocked / waiting on others

| Item | Needs | Owner | Since | Workaround |
|---|---|---|---|---|
| HRC logo (vector) | asset | HRC | S0 | typographic lockup + placeholder |
| Team/board names + bios | facts | HRC | S0 | role cards, "announced soon"; `team.ts` `confirmed` flag gates names out of the DOM (B1–B6) |
| Program details (duration/fee/dates) | facts | HRC | S0 | 4 provisional entries, flagged E1–E7; catalog shows none as "open" |
| Service process / arbitration / translation scope | facts | HRC | S4 | generic "contact us" CTA; flagged D1–D4 |
| Journal details (ISSN, issues, board) | facts | HRC | S0 | confirmed fields only; Issue 1 shown, board is a link-out (F2–F7) |
| Conference dates / venue / theme / history | facts | HRC | S5 | 1 `planned` entry, no `Event` markup, "to be announced" (G1–G4) |
| Contact form provider account | setup | Novixa | S0 | dev logs / configurable endpoint |
| Canonical domain | ✅ resolved 2026-10-19 | Novixa | S0 | live at `https://hrc.novixa.dev` (`NEXT_PUBLIC_SITE_URL` set by the deploy workflow) |

Full list: [`docs/content/content-review-checklist.md`](../content/content-review-checklist.md).

## Metrics snapshot

_As of S6 close (`sprint-6-complete`), all 13 route types live, local prod build._

| Metric | Target | Latest | Route |
|---|---|---|---|
| Lighthouse Perf (mobile-simulate) | ≥ 95 (S7 gate) | 52 – 91 (→ S7 optimization sweep) | all |
| Lighthouse A11y (mobile) | ≥ 95 | **100** | all 13 page types |
| Lighthouse Best-Practices | ≥ 95 | **100** | all 13 page types |
| Lighthouse SEO | ≥ 95 | **100** | all 13 page types |
| CLS | < 0.05 | 0 – 0.031 | all |
| axe serious/critical | 0 | **0** | 13 page types × 2 locales |
| Unit specs | 100% | **71 / 71** | all 9 test files |
| E2E specs | 100% | **196 / 196** | chromium **+ mobile**; 8 spec files |
| Heaviest route JS | ≤ 120 KB gz | → S7 bundle analysis | — |
| Heaviest route fonts | budget | ~342 KB (→ S7) | /ar |

## Change log (append‑only, newest first)

- **2026-10-19** — **S12 contact accuracy.** Found and removed unsourced office hours on the Contact page
  (present since S6). Replaced with the registration phones, WhatsApp and men's/women's section locations the
  Center publishes on its course pages, with a Source link, plus `ContactPoint` JSON-LD. Prettier pass.
- **2026-10-19** — **S11 training catalog + font loading.** 11 sourced programs (arbitration diploma, AI &
  judicial justice, AI productivity, motion graphics, MikroTik, mobile design, photography, secretarial
  diploma, Onyx Pro, Soroban trainers, English diploma) with published durations/schedules/fees and Source
  links. Live-audit regression fixed: `/en` CLS 0.112 → 0 (Latin faces `display: optional`, Garamond 600 only);
  local Lighthouse `/en` 82–87, `/ar` 88–91. unit 123/123 · e2e 206/206.
- **2026-10-19** — **S10 verified-content refresh** (round 1). Re-researched the Center from its official
  feed, journal PDFs, the ISSN register and the League of Islamic Universities; every new fact carries a
  Source link on the site. News rebuilt (15 sourced items); journal block with E-ISSN 3106-9053, editorial
  board, acceptance criteria and Issues 1–3 (contents + official PDFs); the second conference shown as held
  (27 Dec 2025, online, Event JSON-LD); leadership named in official news on Team; arbitration office +
  highlights on Services; milestones + partners on About. Removed: an unverifiable news item, a dead
  editorial-board link, a non-HRC book. unit 122/122 · e2e 206/206 · lint/typecheck/build green.
- **2026-10-19** — **Post-launch hardening** (live audit). Fixed: touch/manifest icons were
  404 (`apple-touch-icon.png`, `icon-192/512/512-maskable.png` never existed; the
  file-based `/apple-icon` route was swallowed by the locale proxy) → static PNGs drawn
  from `icon.svg`. Cloudflare had pinned a 404 for a year because Next sends
  `s-maxage=31536000` on file-like 404s → site block now forces `no-store` on every 404
  and caches root icons 7 d. Unused Amiri 400 removed (−108 KB of preloads on `/ar`).
  CI: post-deploy Lighthouse job (scores as annotations), build errors surfaced as
  annotations, smoke test covers icons + manifest, actions on Node 24. Server: fail2ban
  (sshd jail) enabled — ~2.6 k failed root logins / 7 h observed. Live Lighthouse mobile
  (GitHub runner → Cloudflare → VPS): a11y / BP / SEO **100** on all audited pages; perf
  `/en` 90 · `/ar/research` 84 · `/en/contact` 81 · `/ar` 74–80 (LCP = Amiri-700 hero
  `<h1>`, see recommendation in `docs/guides/deploy-guide.md` §1a).
- **2026-10-19** — **Live at https://hrc.novixa.dev** on the shared Novixa VPS. GitHub
  Actions `deploy.yml`: verify (lint/typecheck/unit) → `pnpm build` (`output: 'standalone'`)
  + smoke test on the runner → minimal `node:22` image → SSH → `docker compose up` in
  `/opt/hrc-center` → site block installed in mailcow's nginx after the container is
  healthy (`nginx -t`, restore on failure, graceful reload). Network `hrc-center-edge`
  persisted in mailcow's override (backup kept). Verified: 13 page types AR/EN 200,
  canonical + sitemap on the live origin, security headers, immutable `_next/static`,
  assistant API 200; all other sites on the VPS unchanged. Issues met on the way:
  org Actions billing lock (cleared by making the repo public), first workflow assumed a
  bare host (replaced), `pnpm install` hangs inside `docker build` (build moved to the
  runner). Guide: `docs/guides/deploy-guide.md` §1a.

- **2026-09-09** — **S6 complete** (`sprint-6-complete`). 13 tasks: `news` collection (schema, loader, 4 provisional entries, tag chips navigation, reverse-chron cards, `NewsArticle` JSON-LD, RSS 2.0 at `/news/rss.xml`). `<ContactForm>` server action with progressive enhancement, visible labels, polite `aria-live` region, honeypot & time-trap anti-bot defenses, provider adapter with dev logger fallback, and Contact page (`/[locale]/contact`) with static location card and zero leaked unconfirmed contacts. Utility pages (`/privacy` and `/accessibility`) shipped. `routesInProgress` in `src/lib/nav.ts` is now **completely empty** (100% of routes live!). unit **71/71**, e2e **196/196** (chromium + mobile). → Entering S7 Hardening.
- **2026-09-09** — **S5 complete** (`sprint-5-complete`). 14 tasks: `publications` +
  `conferences` collections (S4 `defineCollection` reused; `isoDate` preprocessor for
  YAML dates) + a name-safe **`src/lib/team.ts`** (an unconfirmed name has no code path to
  the DOM). **Research** page + Journal section (real `law.m@ahgaff.edu` route, board
  link-out, Issue 1 only — no ISSN/frequency/board). **Publication detail**
  (`creativeWorkSchema`, confirmed fields only). **Conferences** list + **event detail**
  that emits `Event` JSON-LD **only** with a real date + venue (the provisional conference
  has neither). **Team** page (role cards, "announced soon", no names). New JSON-LD:
  `collectionPage` / `creativeWork` / `event`. Close fixes: `<Link>` was centring every
  card that wrapped it (pre-existing — also fixed Home/Training); `og:image` default was
  404ing on every non-home route (pre-existing since S2). **a11y/BP/SEO = 100** on all 12
  page types × 2 locales; perf 52–59 (machine load) → S7. unit **53/53**, e2e **156/156**
  (chromium + mobile). → Entering S6.
- **2026-09-09** — **S4 complete** (`sprint-4-complete`). 13 tasks: the first **content
  collection** (`defineCollection` — `gray-matter` + Zod, build fails on a bad file) with
  `programs` (4 provisional entries, none shown "open"); **Services** (7 anchored services
  + sub-nav + consultation CTA, `BreadcrumbList`); **Training catalog** (URL-encoded
  `FilterBar`, server-side filter, polite ICU result count, designed empty state);
  **program detail** (`KeyFacts`, markdown body, `Course` + `BreadcrumbList` JSON-LD with
  no fabricated `offers`); Home `FeaturedPrograms` reads the collection. Decision:
  **Markdown + `marked`, not MDX** (Turbopack risk). New deps: `gray-matter`, `marked`
  (both server-only). Close fixes: `/ar/services` BP 96 → **100** (prefetch query-strip),
  breadcrumb nav given a real accessible name, **4 stale mobile e2e locators** fixed +
  the full chromium **+ mobile** matrix restored (had silently narrowed to chromium since
  S3 — R15 occurred). **a11y/BP/SEO = 100** on all 7 page types × 2 locales; perf 72–91
  → S7. unit **33/33**, e2e **108/108**. → Entering S5.
- **2026-09-09** — **S3 complete** (`sprint-3-complete`). 12 tasks: verbatim-sourced
  bilingual content briefs; the `sections/` component layer (13); real **Home** + **About**
  pages (AboutPage + BreadcrumbList JSON-LD); Framer Motion → CSS scroll-reveal (`motion`
  removed, −38 KB); client message payload scoped; arbitrary Tailwind values → canonical
  utilities (28 files); `--breakpoint-sm` 375→640; section rhythm tightened;
  `tests/e2e/{home,about}` (24 cases, 38/38 total); design-review pass (2 High + 4 Medium
  fixed) + a serious axe contrast fix. **a11y/BP/SEO = 100** on Home + About × 2 locales;
  perf 64–79 → S7. → Entering S4.
- **2026-09-09** — **S2 complete** (`sprint-2-complete`). 14 tasks: Next.js 16 + TS strict
  + Tailwind v4 (CSS-first) + next-intl 4 scaffold; `tokens.css` from `design/02`; 5-family
  `next/font`; `ui`/`motion`/`brand`/`layout` components; SEO infra (sitemap, robots,
  manifest, OG, JSON-LD, hreflang); placeholder bilingual Home; Husky/commitlint/Playwright
  +axe/Vitest/LHCI/CI. Shell Lighthouse **a11y 100 · BP 100 · SEO 100**; performance
  63/66 mobile (92 desktop) → S7. lint/typecheck/unit(24)/e2e(14)/build green. → Entering S3.
- **2026-09-09** — **S1 complete** (`sprint-1-complete`). 13 tasks: contrast‑verified
  colour system (+ `scripts/check-contrast.py`, 0 fails), typography decided (Amiri / IBM
  Plex Sans Arabic / EB Garamond / Inter / IBM Plex Mono), tokens/motion/brand promoted to
  FINAL, iconography rules, 6 wireframe templates (LTR+RTL), OG + brand‑asset specs, visual
  specimen (`docs/design/specimen.html`), `MASTER.md` + `pages/home.md` persisted &
  reconciled, design‑review rubric. Artifact publish of the specimen blocked by the
  session classifier (kept as a file). → Entering S2.
- **2026-09-09** — **S0 complete** (`sprint-0-complete`). 11 tasks: repo scaffold, 8
  skills vendored, research (6), planning (8), skills rules (2), guides (4), design brief
  + 6 drafts, testing (2), global trackers + report, sprint machinery + content review
  checklist + docs index. S1 folder drafted. Documentation QA pass green. → Entering S1.
- **2026-09-09** — S0 started. Repo scaffolded; skills vendored; research/planning/design
  drafts committed.
