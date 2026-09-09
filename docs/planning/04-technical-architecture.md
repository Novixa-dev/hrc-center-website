# Technical Architecture

## 1. Stack & rationale

| Concern | Choice | Rationale | Alternatives considered |
|---|---|---|---|
| Framework | **Next.js 15**, App Router, RSC | Best‑in‑class SSG/ISR for SEO + perf; mature i18n; trivial Vercel deploy; large talent pool | Astro (lighter, but team + user picked Next); vanilla (rejected: 9 pages × 2 locales unmaintainable) |
| Language | **TypeScript**, `strict` | Safety, refactorability | — |
| Styling | **Tailwind CSS v4** + CSS‑variable tokens | Matches Novixa's current tooling; fast; tokens keep it disciplined | CSS Modules, vanilla‑extract |
| i18n | **next-intl** (v3+) | First‑class App Router support, locale routing, `getTranslations` in RSC, formatting | `next-i18next` (pages‑router era), hand‑rolled |
| Animation | **Framer Motion** (`motion/react`) | Declarative, RSC‑friendly with `"use client"` islands, `useReducedMotion` | GSAP (kept as reference for timing/easing values only — no second animation lib in the bundle) |
| Content | **MDX** via `@next/mdx` or `next-mdx-remote`, files organized as collections; **Zod** frontmatter validation | No CMS to run; content is versioned, reviewable in PRs; typed | Contentlayer (maintenance risk), a headless CMS (ops overhead) |
| Icons | **lucide-react** | One consistent family, tree‑shakeable | Heroicons, Phosphor |
| Fonts | **next/font** (self‑hosted, subset) | No layout shift, no third‑party request, privacy | Google Fonts CDN (rejected: privacy + perf) |
| Forms | **Server Action** → email provider (Formspree or Resend) | No backend; progressive enhancement | API route + own SMTP |
| Maps | Static styled map image or lightweight Leaflet island | Avoid heavy embeds; Yemen bandwidth | Google Maps iframe (heavy, tracks) |
| Analytics | Cookieless (Vercel Analytics / self‑host Umami later) | Privacy, no consent banner needed | GA4 (rejected) |
| Testing | **Playwright** (e2e + `@axe-core/playwright`), **Vitest** (units), **Lighthouse CI** | Covers behavior, a11y, perf budgets | Cypress |
| Lint/format | **ESLint** (next, ts, jsx‑a11y, tailwind) + **Prettier** + `prettier-plugin-tailwindcss` | Consistency, a11y lint | Biome (fine, but ESLint has the a11y plugin ecosystem) |
| Hooks | **Husky** + **lint-staged** | Keep `main` green | — |
| Package manager | **pnpm** | Already installed; fast, strict | npm |
| Node | **22 LTS** (`.nvmrc`) | Current LTS | — |

## 2. Rendering strategy

- **Everything static by default.** All pages are statically generated at build
  (`generateStaticParams` for `[locale]` and all `[slug]` routes).
- **ISR** (`revalidate`) only if a dynamic data source appears later; not needed for
  Git‑based MDX.
- **RSC by default**; `"use client"` only for: header menu, locale switcher, filter bar,
  form, motion wrappers, map. Keep client bundles per‑route small.
- **No SSR‑at‑request** pages in v1.
- **Streaming/Suspense** for any below‑the‑fold client island that needs it (minimal here).

## 3. i18n design

- Locales: `['ar', 'en']`, `defaultLocale: 'ar'`, locale prefix: `always` (`/ar/...`, `/en/...`).
- `src/i18n/routing.ts` (next-intl `defineRouting`) + `src/i18n/request.ts` (message loader).
- `middleware.ts`: locale negotiation + redirect `/` → `/ar` (honor `Accept-Language`,
  fallback `ar`).
- `src/app/[locale]/layout.tsx`: sets `<html lang={locale} dir={dir}>`, loads the locale's
  font stack, wraps `NextIntlClientProvider` (only passing the messages the client tree needs).
- `dir`: `ar → rtl`, `en → ltr`. Tailwind logical properties (`ps-*`, `pe-*`, `text-start`)
  everywhere; no hard `left/right`. A few `rtl:`/`ltr:` variants for directional glyphs
  (arrows, chevrons).
- Metadata localized via `generateMetadata` + `getTranslations`.
- `setRequestLocale(locale)` in every page/layout for static rendering.
- Formatting: `useFormatter` / `getFormatter` for dates, numbers, lists.

## 4. Content pipeline

```
src/content/<collection>/<locale>/<slug>.mdx
        │  frontmatter (YAML) ── validated by Zod schema in src/lib/content/schemas.ts
        ▼
src/lib/content/<collection>.ts   getAll(locale) / getBySlug(locale, slug) / getSlugs()
        │  build-time read (node fs), cached; fails build on invalid frontmatter
        ▼
RSC pages import the loader → render cards / MDX body (custom components map)
```

- MDX components map: typed `<Callout>`, `<Figure>`, `<KeyFacts>`, `<Step>`, headings with
  anchor links, `next/image` wrapper. No raw HTML in content.
- Each collection has: schema, loader, a `list` card component, a `detail` renderer.
- `team` and `programs` may be YAML/JSON instead of MDX if bodies stay short — decide in Sprint 4/5.

## 5. Component architecture

- **`components/ui/`** — primitives, no business logic: `Button`, `Link` (locale‑aware),
  `Card`, `Badge`, `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Disclosure`,
  `Tabs`, `Breadcrumbs`, `Pagination`, `Prose`.
- **`components/layout/`** — `Header`, `MobileNav`, `Footer`, `LocaleSwitcher`,
  `SkipLink`, `Container`, `SectionHeader`.
- **`components/sections/`** — composed page sections: `Hero`, `PillarsGrid`,
  `FeaturedPrograms`, `JournalFeature`, `LatestNews`, `AudiencePaths`, `CtaBand`,
  `ServiceList`, `VisionMission`, `TeamGrid`, `ContactDetails`, `EventArchive`.
- **`components/motion/`** — `Reveal`, `Stagger`, `ParallaxLite` — thin Framer Motion
  wrappers that all read motion tokens and `useReducedMotion`.
- Styling: token‑based Tailwind classes; `cva` (class‑variance‑authority) for variant
  APIs; `cn()` helper (clsx + tailwind‑merge).
- No component ships without: keyboard support, focus visible, `aria` where needed,
  both‑locale check, responsive check.

## 6. SEO / metadata infrastructure

- `src/lib/seo.ts`: `buildMetadata({ locale, path, title, description, image, type })` →
  returns a Next `Metadata` object with canonical, `alternates.languages` (hreflang),
  OpenGraph, Twitter.
- `src/lib/schema.ts`: JSON‑LD builders per type, injected via `<script type="application/ld+json">`.
- `app/[locale]/opengraph-image.tsx` + per‑collection `opengraph-image` using `next/og`
  (ImageResponse) — brand template: logo, title, kicker, brand pattern, locale‑correct
  direction.
- `app/sitemap.ts` — enumerates all routes × locales from the content loaders.
- `app/robots.ts` — allow all, point to sitemap; disallow nothing sensitive (none).
- `app/[locale]/news/rss.xml/route.ts` — RSS 2.0 for news.

## 7. Performance budget (enforced in Lighthouse CI)

| Metric | Budget |
|---|---|
| Performance score (mobile) | ≥ 95 |
| LCP | < 2.0 s (throttled 4G) |
| CLS | < 0.05 |
| TBT | < 150 ms |
| Total JS (gz, heaviest route) | ≤ 120 KB |
| Total transfer (heaviest route) | ≤ 500 KB |
| Image formats | AVIF/WebP only; every `<img>` has width/height or aspect‑ratio |
| Fonts | ≤ 2 families, ≤ 4 weights total, subset (Latin + Arabic), `display: swap`, preloaded critical only |

Techniques: RSC (ship less JS), route‑level code‑split, `next/image`, `next/font`,
no client date lib (use `Intl`), lazy‑mount map & below‑fold islands, `content-visibility`
for long lists, prefetch on viewport for internal links.

## 8. Accessibility infrastructure

- `eslint-plugin-jsx-a11y` (recommended + strict extras) in CI.
- `@axe-core/playwright` scan on every page in both locales; zero serious/critical.
- Manual pass per DoD: keyboard, screen reader (NVDA/VoiceOver), 200% zoom, reduced motion,
  forced‑colors.
- Accessibility statement page kept current with known limitations.

## 9. Project configuration files (created in Sprint 2)

`package.json` · `tsconfig.json` · `next.config.mjs` (mdx, i18n plugin, image formats) ·
`tailwind.config.ts` + `src/styles/tokens.css` · `postcss.config.mjs` ·
`.eslintrc.cjs` / `eslint.config.mjs` · `.prettierrc` · `playwright.config.ts` ·
`vitest.config.ts` · `lighthouserc.cjs` · `.husky/` · `vercel.json` (prepared, unused) ·
`.github/workflows/ci.yml` (lint + typecheck + test + build + LHCI; runs locally via `act`
optional, ready for when a remote is added).

## 10. Environments & config

| Var | Purpose | Default (dev) |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical base | `http://localhost:3000` |
| `CONTACT_FORM_ENDPOINT` / provider keys | form delivery | logs to console in dev |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp deep link number | from research (confirm) |
| `NEXT_PUBLIC_ANALYTICS` | analytics id / off | off in dev |

`.env.example` committed; real `.env*` gitignored.

## 11. Decisions log (append‑only)

| Date | Decision | Why |
|---|---|---|
| 2026‑09‑09 | Next.js 15 + Tailwind v4 + next-intl + Framer Motion | User selection; fits SEO/i18n/perf goals |
| 2026‑09‑09 | Local git only, no deploy | User selection |
| 2026‑09‑09 | Content as Git MDX collections, no CMS | Pro‑bono → minimize ops; PR‑reviewable content |
| 2026‑09‑09 | One animation library (Framer Motion); GSAP data used as timing reference only | Bundle size |
| 2026‑09‑09 | Services = single page w/ anchors; Training/News/Conferences/Publications = collections w/ detail routes | Content volume fit |
| 2026‑09‑09 (S1) | Dark mode = **system‑only** for v1 (`prefers-color-scheme`), no toggle; tokens use `:root` + `@media` + `[data-theme]` so a toggle is additive later | Fewer moving parts; no persisted state / flash‑of‑theme handling; no toggle UI to design + RTL‑test; audience is mostly mobile AR |
| 2026‑09‑09 (S1) | Type pairing: Amiri (AR display) + IBM Plex Sans Arabic (AR body) + EB Garamond (Latin display) + Inter (Latin body) | Scholarly Arabic voice + highly legible AR body; Latin serif matches; all SIL OFL, subsettable |
| 2026‑09‑09 (S1) | Bronze `#A16207` is fill/large‑only; `#854D0E` (bronze‑600) is the text/link/CTA colour | `#A16207` on white = 4.9:1 (marginal); `#854D0E` = 6.9:1 gives headroom |
| 2026‑09‑09 (S2) | **Next.js 16** (not 15 as originally written) | Latest stable in Sept 2026; matches the brief's "modern / best". App Router, RSC, Turbopack — same architecture the plan assumed |
| 2026‑09‑09 (S2) | `src/proxy.ts` instead of `middleware.ts` | Next 16 renamed the request‑handler file convention; next-intl's `createMiddleware` works unchanged |
| 2026‑09‑09 (S2) | Tailwind v4 **CSS‑first** (`@theme inline` in `globals.css`), no `tailwind.config.ts` | v4 idiom; tokens are authored once in `tokens.css` and exposed as utilities |
| 2026‑09‑09 (S2) | `motion` package (v13) via `motion/react` | The current name/entry for Framer Motion; RSC‑friendly |
| 2026‑09‑09 (S2) | ESLint = `eslint-config-next` flat defaults + a tuned `no-unused-vars`; extra jsx‑a11y/import rules dropped | Flat config only lets a rule be set in the object that registers its plugin; eslint-config-next already covers jsx‑a11y recommended |
| 2026‑09‑09 (S2) | Performance ≥ 95 is an **S7** gate, not S2 | S7 is the dedicated performance sprint; LHCI keeps `performance` as `warn` until then |
| 2026‑09‑09 (S3) | Framer Motion → dependency‑free CSS scroll‑reveal; `motion` package removed | 6 hydrated islands on Home → TBT 940 ms; the reveal is a translate‑only rise (opacity stays 1) so content is always visible / contrast‑valid |
| 2026‑09‑09 (S4) | Content = **plain Markdown + `gray-matter` + `marked`**, not `@next/mdx` / `next-mdx-remote` (supersedes §1 and §4) | Turbopack + MDX interop is a live risk in Next 16; content is trusted and in‑repo, so components‑in‑content aren't needed. Headings still get anchored ids via a `marked` renderer; bodies render server‑side to a trusted HTML string consumed by `<Prose html=…>`. `<Callout>`/`<Figure>`/`<KeyFacts>` are ordinary React components used in page layout, not in content. |
| 2026‑09‑09 (S4) | Generic `defineCollection<S>(name, schema)` loader (`src/lib/content/`) | `node:fs` + `gray-matter` + Zod `safeParse` (throws at build on a bad file); `programs` is the first user; `publications`/`conferences`/`team`/`news` reuse it unchanged |
| 2026‑09‑09 (S4) | New deps: `gray-matter` (frontmatter), `marked` (md→html) — both server‑only, 0 client JS | see above |
| 2026‑09‑09 (S4) | `/[locale]/training` renders dynamically (`ƒ`), not SSG | reads `searchParams` for the SSR filter default; keeps a filtered URL shareable and JS‑optional |
| 2026‑09‑09 (S5) | `publications` + `conferences` reuse `defineCollection`; shared `isoDate` Zod preprocessor in `schema.ts` | YAML frontmatter parsers turn `date: 2024-09-01` into a `Date` — every collection with a date field needs the normalization |
| 2026‑09‑09 (S5) | Team = a typed model (`src/lib/team.ts`), not a content collection | zero HRC‑confirmed content; a model makes "an unconfirmed name never renders" an enforceable, unit‑tested invariant (`getTeamGroups()` returns `name: string \| null`, null unless `confirmed`) |
| 2026‑09‑09 (S5) | `eventSchema` emitted only when `startDate && location` (`hasEventData`); `creativeWorkSchema` emits confirmed fields only | never assert a scheduled `Event` or a journal ISSN/citation we don't have (R10) |
| 2026‑09‑09 (S5) | publication detail lives at `/research/[slug]` (not a top‑level `/publications`) | Research is the hub; one fewer route |
| 2026‑09‑09 (S5) | `<Link>` base class = `group` only (was `group inline items-center gap-1`) | the unconditional `items-center` silently centred every card that used `<Link>` as a `flex flex-col` wrapper |
| 2026‑09‑09 (S5) | `buildMetadata` `og:image` default = `/[locale]/opengraph-image` | the per‑route default (`/<locale><path>/opengraph-image`) 404s — only the locale‑level image route exists until S7 |
