# Sprint 3 — Test Plan & Results

Ref: [`docs/testing/00-test-strategy.md`](../../testing/00-test-strategy.md),
[`docs/testing/01-qa-checklist.md`](../../testing/01-qa-checklist.md).

## Plan

| # | Area | Type | Pass condition |
|---|---|---|---|
| 1 | Static | `pnpm lint` + `pnpm typecheck` | 0 errors |
| 2 | Unit | Vitest (`schema.aboutPageSchema` covered by existing suite) | green |
| 3 | Page e2e | Playwright chromium — Home + About, both locales | green |
| 4 | Accessibility | `@axe-core/playwright` on Home + About × 2 locales | 0 serious/critical |
| 5 | Lighthouse | mobile, Home + About × 2 locales | a11y/BP/SEO ≥ 95; perf recorded |
| 6 | Design review | `design-review` 7 dimensions + anti‑AI‑smell | High findings fixed |
| 7 | Content | verbatim vision/mission match research; no unconfirmed names; provisional labelled | manual |
| 8 | Responsive | 390 / 768 / 1440, LTR + RTL | no overlap / horizontal scroll; layout reflows |

## Execution

**Build:** `c34da77` · local prod, `NEXT_PUBLIC_SITE_URL` = test origin · **Date:** 2026-09-09

### Automated

| Suite | Result | Notes |
|---|---|---|
| `pnpm lint` | ✅ | eslint-config-next flat + prettier |
| `pnpm typecheck` | ✅ | strict + `exactOptionalPropertyTypes` |
| `pnpm test:unit` | ✅ 24/24 | unchanged from S2 |
| `pnpm test:e2e --project=chromium` | ✅ **38/38** | shell (14) + home (10) + about (14); incl. axe on Home + About × 2 locales |
| `pnpm build` | ✅ | `/ar` `/en` `/ar\|en/about` + OG as SSG |

### Lighthouse (mobile, simulate, localhost)

| Route | Perf | A11y | Best‑Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| /ar | 70 | **100** | **100** | **100** | 3.9 s | 0.001 | 350 ms |
| /en | 73 | **100** | **100** | **100** | 3.6 s | 0 | 380 ms |
| /ar/about | 79 | **100** | **100** | **100** | 3.3 s | 0.031 | 290 ms |
| /en/about | 64 | **100** | **100** | **100** | 4.0 s | 0 | 510 ms |

vs. the S2 placeholder Home (P 63/66): a first draft of the rich Home hit **P 45**
(6 Framer‑Motion islands, TBT 940 ms). After swapping to a CSS scroll‑reveal, dropping the
`motion` package, scoping the client message payload, and converting arbitrary Tailwind
values to canonical utilities → **P 64–79, TBT 290–510 ms, LCP ~3.3–4.0 s, CLS ~0**. Full
data: `docs/testing/reports/sprint-03/lighthouse-summary.json`.

### Design review

`docs/reports/reviews/sprint-03-design-review.md`. Two **High** findings (section
whitespace ~256 px between sections; `--breakpoint-sm` set to 375 px firing `sm:` layouts
on every phone) and four **Medium** findings — **all fixed this sprint**. Six Low / asset
items logged for S8. Anti‑AI‑smell pass: clean.

### Content

- Vision + Mission render **verbatim** from `ahgaff.edu/centers/1/` (re‑fetched
  2026‑09‑09; recorded in `research/02`).
- Department names **verbatim** AR; EN + one‑line blurbs are ours (flagged C5).
- Governance section names **no one** (test `about.spec.ts` asserts the brief's
  placeholder names never appear).
- Featured programs badged "قُدِّم مؤخراً / Recently offered", never "Enrolling" (test asserts).
- No `[NEEDS HRC CONFIRMATION]` string renders in the app.

### Responsive (manual, screenshots)

| Page | 390 (RTL) | 390 (LTR) | 1440 (RTL) | 1440 (LTR) |
|---|---|---|---|---|
| Home | ✅ 1‑up stacks; sheet nav; no h‑scroll | ✅ | ✅ 3‑up grids; rhythm ok post‑fix | ✅ |
| About | ✅ sidebar → `<details>`; dept 1‑up | ✅ | ✅ sticky rail on the inline‑end | ✅ |

## Findings

| # | Sev | Description | Status |
|---|---|---|---|
| 1 | Serious | axe color‑contrast: below‑fold reveal content scanned at `opacity:0` (281 nodes) | ✅ fixed — reveal is now a translate‑only rise, opacity stays 1 (`c34da77`) |
| 2 | High×2 / Med×4 | design‑review findings | ✅ fixed (`f9cf035`, `c34da77`) |
| 3 | — | Performance 64–79 (< 95) | ⏭️ **S7** (perf‑hardening sprint) — TBT is now the lever: CSS weight (arbitrary values largely gone), next‑intl client, Arabic fonts ~342 KB |

## Verdict

- [x] lint / typecheck / unit / e2e (38) / build — all green.
- [x] A11y + Best‑Practices + SEO = **100** on Home + About, both locales.
- [x] axe: 0 serious/critical.
- [x] Design‑review High + Medium findings fixed; anti‑AI‑smell clean.
- [x] Content verbatim where it matters; nothing unverified rendered; provisional labelled.
- [x] Responsive verified 390 / 1440 in both directions.
- [ ] Performance ≥ 95 → S7.

Reports: `docs/testing/reports/sprint-03/`.
