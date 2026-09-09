# Sprint 2 — Report

**Name:** Project Scaffold & Foundation · **Status:** ✅ complete · **Closed:** 2026-09-09
**Commits:** `4f8bba1..<close>` (8) · **Tag:** `sprint-2-complete`

## 1. What shipped

A running, empty-but-correct **bilingual Next.js 16 app** with the S1 design system wired in.

- **Stack:** Next.js 16.3.4 (App Router, RSC, Turbopack), React 19.2, TypeScript 5.9
  (`strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`), Tailwind CSS v4
  (CSS-first `@theme inline`), next-intl 4, motion 13, lucide-react, zod, cva.
- **i18n:** `/ar` (default, RTL) + `/en` (LTR), always-prefixed; `src/proxy.ts` negotiates
  and redirects `/` → `/ar`; `[locale]/layout.tsx` sets `<html lang dir>`, the per-script
  font set, and `NextIntlClientProvider`; every string via `next-intl`; `setRequestLocale`
  everywhere → fully static.
- **Design tokens:** `src/styles/tokens.css` transcribed verbatim from `design/02` (FINAL),
  three-state theme pattern (system dark now, `[data-theme]` ready). `globals.css` maps
  tokens → Tailwind utilities. Token contract unit-tested.
- **Fonts:** Amiri + IBM Plex Sans Arabic + EB Garamond + Inter + IBM Plex Mono via
  `next/font` (self-hosted, subset AR+Latin, 2 preloaded, `display: swap`). CLS 0–0.004.
- **Components:** `ui/` (Button, Link, Container, Card, Badge, Field/Input/Textarea,
  SectionHeader, Prose, VisuallyHidden, Spinner) · `motion/` (Reveal, Stagger) · `brand/`
  (Motif, Logo, social-icons) · `layout/` (SkipLink, Header, MobileNav, NavLink,
  LocaleSwitcher, Footer, AffiliationLockup). All token-driven, logical properties, focus
  visible, keyboard-operable, RTL-checked. State specs in `design/06`.
- **SEO/infra:** `lib/seo` (`buildMetadata` → canonical + `ar`/`en`/`x-default` hreflang +
  OG/Twitter), `lib/schema` (`EducationalOrganization`, `WebSite`, `BreadcrumbList`),
  `app/sitemap.ts` (live routes), `robots.ts`, `manifest.ts`, `icon.svg`, `apple-icon.tsx`,
  `[locale]/opengraph-image.tsx`, `public/favicon.ico`, `public/llms.txt`, localized
  `not-found` + `error`.
- **Placeholder Home:** real drafted bilingual hero copy (not Lorem) + a `Reveal`; proves
  RTL/LTR, fonts, tokens, keyboard, skip link, JSON-LD.
- **Tooling:** ESLint (eslint-config-next flat) + Prettier + `prettier-plugin-tailwindcss`,
  Husky (pre-commit lint-staged, commit-msg commitlint w/ project scope enum), Playwright
  + `@axe-core/playwright`, Vitest, Lighthouse CI, `pnpm verify`, `.github/workflows/ci.yml`,
  `.env.example`, `vercel.json`.

## 2. Metrics

| Metric | Target | Result | Scope |
|---|---|---|---|
| Lighthouse Accessibility | ≥ 95 | **100** | `/ar` + `/en` (mobile) |
| Lighthouse Best-Practices | ≥ 95 | **100** | `/ar` + `/en` |
| Lighthouse SEO | ≥ 95 | **100** | `/ar` + `/en` |
| Lighthouse Performance | ≥ 95 | **63 / 66** (mobile-simulate) · **92** (desktop) | placeholder Home |
| CLS | < 0.05 | **0 – 0.004** | |
| axe serious/critical | 0 | **0** | `/ar` + `/en` |
| Unit tests | green | **24 / 24** | seo, schema, tokens |
| E2E (chromium + mobile) | green | **14 / 14** each | shell |
| Build | success | **success**, `/ar` `/en` + OG as SSG | |
| Heaviest route: fonts | — | ~342 KB (over budget → S7) | |
| Heaviest route: JS | ≤ 120 KB gz | ~211 KB transfer (~gz smaller; over → S7) | |

Full data: `docs/sprints/sprint-02-scaffold-foundation/tests.md` +
`docs/testing/reports/sprint-02/lighthouse-summary.json`.

## 3. Decisions

| Decision | Rationale | Recorded in |
|---|---|---|
| **Next.js 16** (plan said 15) | Latest stable Sept 2026; matches the brief's "modern/best" | `planning/04` log (to add), this report |
| `src/proxy.ts` (not `middleware.ts`) | Next 16 renamed the convention | this report |
| Tailwind v4 **CSS-first** (`@theme inline`), no `tailwind.config.ts` | v4 idiom; tokens live in `tokens.css` | `progress.md` |
| Token unit test = **text assertions** on `tokens.css` | jsdom can't resolve `@import`/`@theme`; browser checks are in Playwright | `tests.md` |
| ESLint = eslint-config-next defaults + tuned `no-unused-vars` only | flat-config can't re-register `jsx-a11y`/`import` in an override object | `progress.md` |
| Instagram/Facebook icons = inline SVG (Simple Icons) | lucide-react removed brand icons | `progress.md` |
| **S2 exit criterion revised:** a11y/BP/SEO ≥ 95 (got 100); performance = baseline + S7 plan | S7 is the perf-hardening sprint; scaffold's job is a correct foundation | `README.md` exit criteria |
| pre-commit runs lint-staged only (not full `tsc`) | keep commits fast; full typecheck in `pnpm verify` + CI | `progress.md` |

## 4. New dependencies

| Package | Why |
|---|---|
| `next` 16, `react`/`react-dom` 19 | framework |
| `next-intl` 4 | i18n routing + RTL + message catalogs |
| `motion` 13 | animation (design/04); RSC-friendly islands |
| `lucide-react` | single icon family |
| `class-variance-authority`, `clsx`, `tailwind-merge` | typed variant APIs + safe class merging |
| `zod` | frontmatter/env/form validation (used from S4) |
| `tailwindcss` 4 + `@tailwindcss/postcss`, `postcss` | styling |
| `eslint` 9 + `eslint-config-next` 16 + `eslint-config-prettier` + `eslint-plugin-jsx-a11y` | linting |
| `prettier` + `prettier-plugin-tailwindcss` | formatting + class sort |
| `husky`, `lint-staged`, `@commitlint/{cli,config-conventional}` | commit hygiene |
| `@playwright/test`, `@axe-core/playwright` | e2e + a11y |
| `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react` | unit |
| `@lhci/cli` | performance budgets (CI) |
| `@types/{node,react,react-dom}` | types |

All justified; no "kitchen-sink" UI kit, no date library (using `Intl`).

## 5. Deferred / not done

| Item | Why | Where it went |
|---|---|---|
| Performance ≥ 95 mobile | S7 is the perf sprint | S7 (plan in `tests.md`) |
| Content collections + loaders | Introduced when first consumed | S4 (`programs`) / S5 |
| Contact form server action + provider | Needs the form | S6 |
| OG image Arabic-title font in satori | Latin + motif is enough for the template | S7 (`design/08` §4) |
| firefox / webkit e2e | Cross-browser matrix | S8 (`FULL_MATRIX=1`) |
| `markdownlint` on `docs/` | Low value vs. effort | optional, S7/S8 |
| Theme toggle | v1 is system-only | Phase 2 |

## 6. Content flags raised

No new content flags. `src/lib/site.ts` null-gates the unconfirmed contact fields
(phone/email/WhatsApp — checklist A4–A6) so nothing unverified renders.

## 7. Risks

- **Realized:** R7 (perf budget) — the 5-font-family Arabic-first stack is over budget on
  mobile. Contained: 3/4 Lighthouse categories at 100, desktop perf 92, concrete S7 plan.
- **New:** none.
- **Watch:** R8 (RTL) — shell verified in both directions via Playwright; continues per page.

## 8. Test summary

Lint / typecheck / unit (24) / e2e chromium + mobile (14 each) / axe (0 serious-critical) /
build — all green. Lighthouse a11y + BP + SEO = 100 both locales; performance baseline
recorded with an S7 remediation plan.

## 9. Notes for next sprint (S3 — Home + About)

- The foundation is done: only *add pages* now. Read `MASTER.md` + `pages/home.md` +
  `design/07` §1–§2 before building.
- Build `sections/*` (Hero, PillarsGrid, …) as composed server components; wrap the
  1–2 animated elements per viewport in `Reveal`/`Stagger`.
- Remove `/about` from `routesInProgress` when the About page ships; same pattern per route.
- Content: draft AR-first, flag unverified facts, add to `content-review-checklist.md`.
- Add `EducationalOrganization` is already global; add `AboutPage` + `BreadcrumbList` on About.
- Keep an eye on JS/font weight as `motion` usage grows — note it for S7.

## 10. Exit criteria

- [x] `pnpm dev`/`start` serves `/ar` + `/en` with working nav, MobileNav, LocaleSwitcher, SkipLink.
- [x] `tokens.css` matches `design/02`; token contract tested.
- [x] Fonts via `next/font`, CLS ~0 (weight over budget → S7, documented).
- [x] lint / typecheck / unit / e2e / build all green.
- [x] **Revised:** a11y + BP + SEO ≥ 95 (100); performance baseline + S7 plan.
- [x] axe clean on the shell, both locales.
- [x] sitemap / robots / manifest / localized 404 + error / metadata + hreflang + JSON-LD.
- [x] `design/06` state specs for every primitive built.
- [x] No create-next-app boilerplate.
- [x] New deps listed with reasons.
- [x] `report.md` written; globals updated; `sprint-2-complete` tag.
