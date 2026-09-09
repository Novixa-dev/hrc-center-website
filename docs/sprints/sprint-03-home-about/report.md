# Sprint 3 — Report

**Name:** Home + About · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `afc82d9..<close>` (7) · **Tag:** `sprint-3-complete`

## 1. What shipped

The first two real pages — **Home** and **About** — fully bilingual, to Page DoD
(a11y/BP/SEO 100), plus a reusable `sections/` component layer.

- **Content** (`docs/content/{home,about}-content.md`): AR‑first drafted copy, EN
  localization. The About page's **Vision and Mission render verbatim** from the center
  page (re‑fetched 2026‑09‑09; `research/02` updated), as do the **6 department names**.
  Every unverified item is flagged to `content-review-checklist.md`.
- **Sections** (`src/components/sections/`): `Section`, `Hero`, `PillarsGrid`,
  `FeaturedPrograms`, `JournalFeature`, `AudiencePaths`, `CtaBand`, `PageHeader`,
  `VisionMission`, `Lineage`, `OrgUnits`, `ProseSection`, `OnThisPage`. Server components;
  content via props; token‑driven; RTL‑checked.
- **Home** (`/[locale]`) — hero (motif texture, not `100vh`) → pillars → featured programs
  (provisional, "Recently offered" badge) → journal → audience paths → CTA band.
- **About** (`/[locale]/about`) — `PageHeader` + breadcrumb + sticky "on this page" rail
  (a `<details>` disclosure below `lg`) → establishment → verbatim Vision/Mission/Purpose
  → university lineage + affiliation lockup → 6 departments → governance teaser (**no
  names** until confirmed) → CTA. `AboutPage` + `BreadcrumbList` JSON‑LD.
- **Motion**: replaced Framer Motion with a **CSS scroll‑reveal** (`<Reveal>` — one
  IntersectionObserver, translate‑only rise, opacity stays 1 so content is always
  visible/contrast‑valid; 800 ms fallback). `motion` package removed.
- **Tooling/quality**: `NextIntlClientProvider` scoped to 3 namespaces; arbitrary Tailwind
  values → canonical utilities across 28 files; `--breakpoint-sm` 375 → 640; section
  rhythm tightened; `/about` removed from `routesInProgress`.
- **Tests**: `tests/e2e/{home,about}.spec.ts` — 24 new cases (h1, sections, provisional
  badge, breadcrumb, governance names absent, nav `aria-current`, JSON‑LD, axe). **38/38.**
- **Design review**: `docs/reports/reviews/sprint-03-design-review.md` — 2 High + 4 Medium
  findings, all fixed.

## 2. Metrics

| Metric | Target | Result |
|---|---|---|
| Lighthouse A11y / Best‑Practices / SEO (mobile) | ≥ 95 | **100 / 100 / 100** — Home + About, both locales |
| Lighthouse Performance | ≥ 95 (S7) | 64–79 (LCP 3.3–4.0 s, TBT 290–510 ms) |
| CLS | < 0.05 | 0 – 0.031 |
| axe serious/critical | 0 | **0** |
| E2E (chromium) | green | **38/38** |
| Unit | green | 24/24 |

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| Framer Motion → CSS scroll‑reveal; `motion` removed | 6 hydrated islands on Home → TBT 940 ms, LCP 6.6 s. CSS: LCP ~3.5 s, −38 KB JS. Design unchanged. | `design/04`, `design/00` §9 |
| Reveal = translate‑only (no opacity fade) | Content must read in a thumbnail / find‑in‑page / for a screen reader before the observer fires; also fixed a serious axe contrast finding | `design/04` |
| `--breakpoint-sm` 375 → 640 | 375 as a breakpoint meant `sm:` layouts fired on every phone (cramped 3‑up cards at 390 px) | `f9cf035` |
| Section padding `space-12` → `space-8/9`; `--section-gap` 64/128 → 48/80 | design review High finding — ~256 px between sections read as sparse | `design/02` (implicitly), `f9cf035` |
| Canonical Tailwind utilities (`text-accent`, `rounded-md`, `shadow-1`) over `[var(--…)]` | readability + smaller CSS + likely faster style matching (S7 TBT lever); `--spacing-*` kept OUT of `@theme` so `p-N` never collides with the non‑linear `--space-N` scale | `f9cf035` |
| Content structure = typed `lib/content.ts` + strings keyed by id in `messages/*.json` | MDX collections are S4; this keeps S3 content typed and i18n‑native | — |

## 4. New dependencies

**None.** `motion` was **removed** (−1 dependency).

## 5. Deferred / not done

| Item | Why | Where |
|---|---|---|
| Performance ≥ 95 | S7 is the perf sprint | S7 (`tests.md` plan) |
| Real `programs` / `news` collections | Home uses a clearly‑labelled provisional stub | S4 / S6 |
| Latest‑news band on Home | no confirmed news to seed yet (checklist H1) | S6; band is simply omitted per the IA empty‑state rule |
| Journal cover image, richer iconography | placeholder policy | asset bundle (checklist I3/I5) |
| Breadcrumb above the `PageHeader` `h1` | Low finding; below a page header is acceptable | S8 if re‑flagged |
| firefox / webkit e2e | cross‑browser matrix | S8 |

## 6. Content flags raised

Added / refined in `content-review-checklist.md`: A2 (establishment month), C2 (EN
mission wording), C3 (no official objectives list — framing paragraph is ours), C5 (EN
department names + blurbs), E1/E6 (programs "recently offered" not "open"), F5 (journal
issue history omitted), H1 (news band pending), J3/J4 (tagline / "past‑present‑future"
framing / EN localization). B1–B5 (governance names) unchanged — Team page (S5) will
handle the "announced soon" state.

## 7. Risks

- **Realized:** R7 (perf) continues — but the CSS‑reveal + canonical‑class work materially
  improved it (TBT 940 → ~400 ms). S7's job is now font weight + remaining CSS/JS.
- R8 (RTL): Home + About verified in both directions (screenshots + Playwright). Clean.
- **New:** none.

## 8. Test summary

`tests.md`: lint / typecheck / unit(24) / e2e(38) / build all green; a11y+BP+SEO = 100
both pages both locales; axe 0 serious/critical (after the reveal fix); design‑review
High+Medium findings all resolved.

## 9. Notes for next sprint (S4 — Services + Training)

- Introduce the first **MDX content collection** (`programs`): schema (Zod) + loader +
  `list`/`detail` components. Move the Home `featuredPrograms` stub to read from it.
- Services = one anchored page (`ServiceList` section) + sticky sub‑nav (reuse `OnThisPage`).
- Training = `Catalog` template — filter bar (URL‑encoded, a11y: chips + live count),
  program cards, empty state ("no open intakes — register interest"), program detail
  (`Course` JSON‑LD).
- Remove `/services` + `/training` from `routesInProgress` as they ship.
- Keep watching JS/CSS weight; note anything for S7.
- The `sections/` layer is proven — Services/Training should mostly compose it.

## 10. Exit criteria

- [x] Home + About meet Page DoD in AR + EN.
- [x] `pnpm verify`‑equivalent green (lint/typecheck/unit/e2e/build); perf `warn` only.
- [x] axe 0 serious/critical on both pages, both locales.
- [x] `design-review` pass done; High + Medium findings fixed; rest logged.
- [x] No `[NEEDS HRC CONFIRMATION]` rendered; each tracked.
- [x] `report.md` written; globals + metrics updated; `sprint-3-complete` tag; S4 folder drafted.
