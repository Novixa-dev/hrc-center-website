# Sprint 2 — Tasks

Task IDs: `S2-T<mm>`. One commit per task, `Refs: S2-T<mm>`.
Status: ☐ todo · ▶ in progress · ✅ done · ⛔ blocked · ⏭️ deferred

| ID | Status | Task | Acceptance criteria | Commit |
|---|---|---|---|---|
| S2-T01 | ✅ | Init Next.js 16 + TS strict + pnpm | hand-scaffolded (no create-next-app); tsconfig strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes; Node 22; App Router / RSC per planning/04; | `4f8bba1` |
| S2-T02 | ✅ | ESLint + Prettier + Husky + commitlint | `pnpm lint` runs (next, ts, jsx‑a11y, tailwind plugins); Prettier + tailwind class sort; pre‑commit runs lint‑staged + `tsc`; commit‑msg linted | `729b3fe` |
| S2-T03 | ✅ | Tailwind v4 + `tokens.css` from `design/02` | `src/styles/tokens.css` = `design/02` §1–§3 verbatim (3‑state theme pattern); `tailwind.config.ts` maps utilities to the vars; a Vitest test asserts ~8 key tokens resolve; `markdownlint` (deferred from S0) run on `docs/` | `4f8bba1` |
| S2-T04 | ✅ | Fonts via `next/font` | 5 families loaded, subset AR+Latin, `display:swap`; preload Amiri 700 + IBM Plex Sans Arabic 400 only; `[locale]` layout applies the set by `dir`; **record total font transfer** vs budget in `progress.md` | `4f8bba1 39b3cd5` |
| S2-T05 | ✅ | next‑intl routing + middleware + `[locale]` layout | `/` → `/ar`; `/ar` + `/en` render; `<html lang dir>` correct; `setRequestLocale` in layout; `NextIntlClientProvider` passes only needed messages; `messages/{ar,en}.json` skeleton (`nav`, `footer`, `common`, `a11y`) | `4f8bba1` |
| S2-T06 | ✅ | `lib/` utilities | `cn()`; `lib/motion.ts` (from `design/04`); `lib/seo.ts` `buildMetadata({locale,path,title,description,image,type})` → canonical + hreflang(ar/en/x‑default) + OG/Twitter; `lib/schema.ts` JSON‑LD builders (`EducationalOrganization`, `WebSite`, `BreadcrumbList`); unit tests for seo + schema | `4f8bba1` |
| S2-T07 | ✅ | `components/ui/` primitives | `Button` (cva variants, loading, 44px), `Link` (locale‑aware), `Container`, `SectionHeader`, `Card`, `Badge`, `Field`+`Input`+`Textarea`, `Prose`, `VisuallyHidden`, `Spinner`; each: tokens only, logical props, focus‑visible, keyboard, RTL‑checked; state specs appended to `design/06` | `fade7af f8d153e` |
| S2-T08 | ✅ | `components/motion/` | `Reveal`, `Stagger` from the `design/04` variants; `useReducedMotion` guard → final state; scoped `whileInView once`; no CLS | `fade7af` |
| S2-T09 | ✅ | Brand components | `<Motif>` (finalized 8‑point‑star path, `size`/`tone`), `<Logo>` (horizontal/stacked/mono), `<AffiliationLockup>` — all from `design/08`; both scripts; both themes | `fade7af` |
| S2-T10 | ✅ | `components/layout/` chrome | `SkipLink`; `Header` (sticky, active route, `--header-h`); `MobileNav` (dialog/disclosure, focus trap, `Esc`, CTA pinned, locale top); `Footer` (4‑col → 1, affiliation, Novixa credit, legal row); `LocaleSwitcher` (keeps path, `lang` on options) | `fade7af` |
| S2-T11 | ✅ | SEO/infra routes | `app/sitemap.ts` (shell routes × locales), `app/robots.ts`, `app/[locale]/not-found.tsx` (localized, HTTP 404), error boundary, `app/[locale]/opengraph-image.tsx` (template from `design/08`), `public/llms.txt` stub, favicons + `manifest.webmanifest` | `f8d153e` |
| S2-T12 | ✅ | Placeholder Home | `app/[locale]/page.tsx`: header/footer + hero stub (real AR/EN strings via next‑intl) + a `Reveal` demo; proves RTL/LTR, fonts, tokens, keyboard, skip link; `generateMetadata` + `EducationalOrganization`+`WebSite` JSON‑LD | `73858c9` |
| S2-T13 | ✅ | Test tooling + CI file | `playwright.config.ts` (chromium/firefox/webkit; `webServer` = prod build), `@axe-core/playwright` helper, shell e2e (both locales: h1, nav, locale switch, skip link, axe), `vitest.config.ts`, `lighthouserc.cjs` (budgets from `planning/04` §7), `pnpm verify` script, `.github/workflows/ci.yml`, `.env.example`, `vercel.json` | `729b3fe` |
| S2-T14 | ✅ | Baseline + close S2 | Run `pnpm verify` + Lighthouse + axe on the shell (both locales); record numbers in `global-progress.md` metrics + `report.md`; `design/06` state specs done; draft `sprint-03` folder; `sprint-2-complete` tag | `(this)` |

## Task detail

### S2-T03 — token transcription
`tokens.css` must use the exact three‑state pattern from `design/02` §5 (bare `:root` =
light; `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`;
`:root[data-theme="dark"]`). Even though v1 is system‑only, ship the `[data-theme]` blocks
so a future toggle is additive. The Vitest test renders a fixture and asserts
`getComputedStyle` for `--color-bg`, `--color-text`, `--color-accent`, `--space-4`,
`--radius-lg`, `--header-h`, `--font-ar-body`, `--duration-base`.

### S2-T07 — primitives
Consult `ui-styling` (shadcn/Radix patterns) + `ui-ux-pro-max --stack nextjs` /
`--domain ux` per component. Take the *patterns*, implement against our tokens — do **not**
run the shadcn CLI or pull its theme. Every primitive gets its filled state spec in
`design/06` in the same commit.

### S2-T12 — placeholder Home
Hero copy is real, drafted, bilingual (from `design/01` boilerplate) — not Lorem. It's a
stub layout, but nothing on it is fake. Marked in `progress.md` as "placeholder — real
Home is S3".

## Deferred out of this sprint

| ID | Task | Why | Moved to |
|---|---|---|---|
| — | Content collections + loaders | Introduce when first consumed | S4 (`programs`) / S5 |
| — | Contact form server action | Needs the form + provider decision | S6 |
| — | Theme toggle | v1 is system‑only | Phase 2 |
