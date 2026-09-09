# Coding Standards

Applies from Sprint 2. Enforced by ESLint + Prettier + `tsc` where possible; the rest is
convention checked in review.

## TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- No `any`. Use `unknown` + narrowing, generics, or a precise type. `// eslint-disable`
  needs a comment explaining why.
- Shared/domain types in `src/types/`. Component prop types colocated.
- Prefer `type` for unions/props; `interface` only for extensible public contracts.
- Validate all external/boundary data (frontmatter, form input, env) with **Zod**.
- No default exports except Next.js special files (`page.tsx`, `layout.tsx`, route
  handlers, `sitemap.ts`, etc.). Components use named exports.

## React / Next.js

- **Server Components by default.** Add `"use client"` only for interactivity, browser
  APIs, or Framer Motion — and push it to the smallest leaf possible.
- `async` RSC for data; no `useEffect` data fetching.
- Call `setRequestLocale(locale)` in every `page`/`layout` for static rendering.
- `generateStaticParams` for every dynamic segment; `generateMetadata` for every route.
- No `<a>` for internal links — use the locale‑aware `<Link>` from `src/components/ui`.
- Images: `next/image` with explicit `width`/`height` (or `fill` + sized parent),
  meaningful localized `alt` or `alt=""`, `priority` only on the LCP image.
- Keep components < ~150 lines; extract sections and hooks.

## Styling (Tailwind v4 + tokens)

- Only token‑backed utilities. No arbitrary values (`w-[473px]`, `text-[#123]`) except
  rare, commented one‑offs.
- **Logical properties only:** `ps-*`/`pe-*`/`ms-*`/`me-*`, `text-start`/`text-end`,
  `border-s`/`border-e`, `inset-inline-*`. Never `pl-*`/`pr-*`/`left-*`/`right-*` for
  layout. Directional glyphs use `rtl:`/`ltr:` variants.
- Class order via `prettier-plugin-tailwindcss`.
- Variant APIs with `cva`; compose with `cn()` (clsx + tailwind-merge).
- Component‑level design decisions reference a token, not a raw value; if a needed token
  is missing, add it to `tokens.css` + `docs/design/02-design-tokens.md`, don't inline.
- Dark mode: design tokens include dark values; toggle via `class`/`data-theme` (decide
  in S1 whether v1 ships a theme toggle or follows system only).

## i18n

- Every user‑facing string via `next-intl` (`useTranslations` / `getTranslations`).
  Keys are English, namespaced (`home.hero.title`). No string concatenation of translated
  fragments — use ICU messages with placeholders/plurals.
- Dates/numbers/lists via `useFormatter`/`getFormatter`. No `toLocaleString` scattered.
- Content bodies in MDX per locale; never a single file with both languages.

## Accessibility (lint + convention)

- `eslint-plugin-jsx-a11y` recommended + strict extras, no rule disabled without a note.
- Interactive = a real element (`button`, `a`, `input`) or a properly `role`/`tabindex`/
  keyboard‑handled custom control (prefer Radix primitives via `ui-styling` patterns).
- Every icon‑only control has an accessible name; decorative icons `aria-hidden`.
- Focus is never removed; custom focus styles meet 3:1 and aren't clipped.
- Animations check `useReducedMotion()` and render the final state when reduced.

## Motion

- Only `transform` and `opacity`.
- Durations/easings from motion tokens (`docs/design/04-motion-guidelines.md`); no inline
  magic numbers.
- ≤ 2 animated key elements per viewport; stagger ≤ 8 items, 30–50ms step.
- All motion wrappers live in `src/components/motion/` and are reduced‑motion aware.

## Files & naming

- Components: `PascalCase.tsx`; one main component per file.
- Hooks: `useThing.ts`. Utils: `camelCase.ts`. Route folders: kebab‑case.
- Content: `src/content/<collection>/<locale>/<slug>.mdx`.
- Test files: `*.spec.ts` (Playwright) / `*.test.ts` (Vitest), colocated or in `tests/`.
- No file over ~250 lines without a reason.

## Comments & docs

- Comment the **why**, not the what. Match surrounding density.
- Public utilities get a one‑line JSDoc.
- No commented‑out code in commits. No `console.log` in committed code (use a `logger`
  util or remove).
- `TODO`/`FIXME` only with a matching entry in a tracker or the review checklist.

## Dependencies

- Justify every addition in the sprint report (one line: what problem, why not built‑in).
- Prefer platform APIs (`Intl`, `URL`, `fetch`, `<dialog>` where viable) over libraries.
- No dependency that ships large client JS for a small gain (date libs, lodash, full UI kits).
- Pin exact or caret per repo norm; `pnpm dedupe` clean.

## Testing expectations

- Each page: a Playwright spec that loads it in `ar` + `en`, checks the `h1`, key content,
  nav, and runs an axe scan.
- Each interactive component: a spec for keyboard operation + the happy path + one error path.
- Utilities (`seo`, `schema`, content loaders, formatters): Vitest unit tests.
- Lighthouse CI config asserts the budget for representative routes.
