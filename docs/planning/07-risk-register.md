# Risk Register

Scored **Likelihood (L)** × **Impact (I)** on 1–5. Review at each sprint boundary;
update status. Owner "AI" = handled in‑build; "Novixa" = needs the user; "HRC" = needs client.

| ID | Risk | L | I | Score | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|---|
| R1 | Publishing unverified facts about a real institution (dates, names, numbers) | 4 | 5 | 20 | "Cite or flag" rule; `content-review-checklist.md`; no stats without a source; neutral "to be announced" states | AI + HRC | Open — controlled |
| R2 | HRC logo / official assets never provided | 3 | 3 | 9 | Typographic/brand‑pattern placeholder system; asset request bundle in `06-assets-inventory.md`; design works logo‑light | AI + HRC | Open |
| R3 | No usable photography → site feels empty | 3 | 3 | 9 | Abstract/typographic hero treatments, brand motif, generous editorial layout; never stock/AI faces | AI | Open |
| R4 | Team/governance names can't be confirmed | 4 | 3 | 12 | Role‑based cards with "appointment announced soon"; Team page degrades gracefully; flag | AI + HRC | Open |
| R5 | Scope creep on a pro‑bono project | 3 | 3 | 9 | Scope locked in `00-master-plan.md`; new asks → "Phase 2" list, not this build | Novixa | Open |
| R6 | Bilingual quality — Arabic reads machine‑translated | 3 | 4 | 12 | AR‑first authoring; anti‑AI‑smell checklist; native‑level proof pass in S8; glossary | AI + Novixa | Open |
| R7 | Performance budget missed (heavy fonts/Arabic subsetting, Framer Motion, MDX) | 2 | 3 | 6 | `next/font` subset; one animation lib; RSC default; Lighthouse CI gate from S2 | AI | Open |
| R8 | RTL bugs (mirrored layouts, flipped icons, bidi text in forms) | 3 | 3 | 9 | Logical properties only; RTL check in Page DoD; Playwright runs both locales | AI | Open |
| R9 | Contact form delivery not wired (no provider account) | 3 | 2 | 6 | Configurable endpoint; dev logs; server action ready; provider is a 10‑min setup in S6/handover | Novixa | Open |
| R10 | Journal facts (ISSN, issues, board) wrong — visible to academics | 3 | 4 | 12 | Journal section built from confirmed fields only; link out to any OJS; flag the rest | AI + HRC | Open |
| R11 | Conflicting source data (phone, address, dates differ across pages) | 4 | 2 | 8 | Research file records all variants with confidence; one canonical value chosen + flagged | AI + HRC | Open |
| R12 | "Local only" now, but URL‑dependent features (canonical, OG, sitemap) need a domain | 3 | 2 | 6 | `NEXT_PUBLIC_SITE_URL` env, single source; placeholder domain documented; swap at deploy | AI | Open |
| R13 | Instagram/Facebook content not archivable (auth‑walled) → news history thin | 3 | 2 | 6 | Seed `news` from center‑page items + HRC input; "history since 2013" not claimed to be complete | AI + HRC | Open |
| R14 | Over‑reliance on the university's shifting CMS as a source (rebuild in progress) | 3 | 2 | 6 | Snapshot facts into research files now; don't deep‑link to unstable URLs | AI | Open |
| R15 | Accessibility regressions creep in across sprints | 2 | 4 | 8 | axe in CI + Page DoD gate + S7 dedicated hardening + S8 manual pass | AI | Open — **occurred S4**: e2e runs had narrowed to `--project=chromium` since S3, hiding 4 mobile failures + a breadcrumb-landmark naming bug. Fixed (`a4b3cd2`, `7f7e500`); full matrix restored to the default run. |
| R16 | Novixa credit / case study published without HRC's blessing | 2 | 3 | 6 | Credit is footer‑only + tasteful; case study is Novixa‑internal until HRC approves a public version | Novixa | Open |

## Retired / accepted

*(none yet)*
