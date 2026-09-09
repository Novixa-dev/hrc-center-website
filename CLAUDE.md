# CLAUDE.md — Rules for AI‑assisted development

This file is loaded into context on every session. It is the operating manual for
building the **Hadramout Research Center (HRC) website**. Read it fully before acting.

---

## 1. Project in one paragraph

Build an independent, bilingual (Arabic primary / English secondary), modern, fast,
accessible marketing + information website for the Hadramout Research Center at
Al‑Ahgaff University (Mukalla, Yemen). It is a **pro‑bono project by Novixa** that also
serves as a portfolio showcase. Quality bar: it must not look "AI‑generated" — it must
read as the considered work of a professional studio. The original client brief is
[`idea.md`](idea.md); intent there wins over any assumption.

## 2. Golden rules

1. **Work in tasks.** Every unit of work is a task in the current sprint folder. A task
   has: a checklist entry, an implementation, a test/verification step, and one commit.
2. **One task → one commit.** Conventional Commits format. No "wip", no mega‑commits.
   See [`docs/guides/git-workflow.md`](docs/guides/git-workflow.md).
3. **Update the trackers.** After finishing a task, tick it in the sprint `tasks.md`,
   update the sprint `progress.md`, and update
   [`docs/reports/global-progress.md`](docs/reports/global-progress.md).
4. **Never invent facts about a real institution.** If a fact (date, name, number,
   quote, credential) is not in `docs/research/` or a cited source, either omit it or
   add it to [`docs/content/content-review-checklist.md`](docs/content/content-review-checklist.md)
   with a `[NEEDS HRC CONFIRMATION]` tag. No fake testimonials, stats, or logos.
5. **Bilingual from the start.** Every user‑facing string goes through `next-intl`
   message catalogs. No hard‑coded copy in components. Arabic is the default locale.
6. **Accessibility is not optional.** WCAG 2.2 AA is the minimum bar and part of the
   Definition of Done. See [`docs/design/05-accessibility-standards.md`](docs/design/05-accessibility-standards.md).
7. **Use the design system, not ad‑hoc values.** Colors, spacing, type, radius, shadow,
   motion all come from tokens in [`docs/design/02-design-tokens.md`](docs/design/02-design-tokens.md).
8. **Consult the skills.** For any UI/design/animation/content decision, use the
   vendored skills per [`docs/skills/01-skills-usage-rules.md`](docs/skills/01-skills-usage-rules.md).
9. **Leave the repo green.** `pnpm lint && pnpm typecheck && pnpm build` must pass
   before a commit that touches `src/`. Tests must pass before closing a sprint.
10. **Report honestly.** If something is skipped, broken, or uncertain, say so in the
    sprint report and the global report. No silent gaps.

## 3. Definition of Done (per task)

A task is done only when **all** apply:

- [ ] Meets its acceptance criteria in `tasks.md`.
- [ ] Bilingual: AR + EN strings present; layout verified in both RTL and LTR.
- [ ] Responsive: verified at 375 / 768 / 1024 / 1440 px, no horizontal scroll.
- [ ] Accessible: keyboard reachable, visible focus, contrast ≥ 4.5:1, semantic HTML,
      `prefers-reduced-motion` respected, axe check clean for the changed surface.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass (if `src/` touched).
- [ ] Trackers updated (sprint `tasks.md` + `progress.md` + global progress).
- [ ] One conventional commit, message references the task ID.

Full DoD incl. per‑sprint gates: [`docs/planning/06-definition-of-done.md`](docs/planning/06-definition-of-done.md).

## 4. Tech stack & conventions

- **Next.js 15** App Router, React Server Components by default; `"use client"` only
  when needed (interactivity, browser APIs, Framer Motion).
- **TypeScript strict**. No `any`. Shared types in `src/types/`.
- **Tailwind CSS v4** with tokens exposed as CSS variables + a Tailwind theme. No inline
  hex; use token classes/utilities.
- **next-intl** with locale segment routing: `/ar/...` (default), `/en/...`. `dir` and
  `lang` set on `<html>` per locale. All routes localized including metadata.
- **Framer Motion** for animation. Timing/easing come from motion tokens. Always guard
  with `useReducedMotion()`. Animate `transform` / `opacity` only.
- **Content**: MDX collections for `news`, `programs`, `publications`, `team`,
  `conferences`. One file per item per locale, typed frontmatter (Zod‑validated).
- **Icons**: one family only — **Lucide** (`lucide-react`). No emoji as icons.
- **Images**: `next/image`, AVIF/WebP, explicit dimensions, `alt` in the active locale,
  lazy below the fold, priority on the hero only.
- **Forms**: progressive‑enhancement friendly; server action → email provider; visible
  labels, inline validation on blur, `aria-live` errors, success state.

### Directory layout (`src/`)

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx            # <html lang dir>, fonts, providers
│       ├── page.tsx              # Home
│       ├── about/ services/ training/ research/
│       ├── conferences/ team/ news/ contact/
│       ├── sitemap.ts robots.ts opengraph-image.tsx
├── components/
│   ├── ui/                       # primitives (Button, Card, Field, ...)
│   ├── layout/                   # Header, Footer, LocaleSwitcher, SkipLink
│   ├── sections/                 # page sections (Hero, ServicesGrid, ...)
│   └── motion/                   # motion wrappers (Reveal, Stagger, ...)
├── content/                      # MDX collections (ar/ en/)
├── i18n/                         # routing, request config
├── lib/                          # utils, seo, schema.org, content loaders
├── messages/                     # ar.json, en.json (UI strings)
├── styles/                       # globals.css, tokens.css
└── types/
```

## 5. Working rhythm each session

1. Read this file + [`docs/reports/global-progress.md`](docs/reports/global-progress.md)
   + the current sprint's `README.md` and `tasks.md`.
2. Pick the next unblocked task.
3. Consult relevant skills + design/planning docs.
4. Implement → verify (DoD) → update trackers → commit.
5. When a sprint's tasks are all done: run the sprint test suite, write the sprint
   `report.md`, update the global report, tag the sprint, open the next sprint.

## 6. Content & tone

- Arabic copy: Modern Standard Arabic, formal‑but‑warm, institutional. No machine‑
  translation feel. English is a true localization, not a literal mirror.
- Voice follows [`docs/design/01-brand-identity.md`](docs/design/01-brand-identity.md)
  and the `brand` skill.
- Respect the institutional context (a university research center in Yemen): credible,
  scholarly, community‑minded; avoid hype, avoid startup jargon.
- Novixa credit lives in the footer only, tastefully.

## 7. Things NOT to do

- Don't add a dependency without noting it in the sprint report with a one‑line reason.
- Don't scaffold with `create-next-app` defaults and leave boilerplate lying around.
- Don't ship Lorem Ipsum to any branch — use real drafted content or explicit
  `[NEEDS HRC CONFIRMATION]` placeholders.
- Don't animate more than ~2 key elements per viewport; don't animate layout properties.
- Don't push to a remote or deploy — hosting is "local only" until the user says otherwise.
- Don't bypass the trackers or commit multiple tasks at once.

## 8. Key references

| Topic | File |
|---|---|
| Master plan | [`docs/planning/00-master-plan.md`](docs/planning/00-master-plan.md) |
| Sprint plan | [`docs/planning/05-sprint-plan.md`](docs/planning/05-sprint-plan.md) |
| PRD | [`docs/planning/01-prd.md`](docs/planning/01-prd.md) |
| Information architecture | [`docs/planning/02-information-architecture.md`](docs/planning/02-information-architecture.md) |
| Design brief | [`docs/design/00-design-brief.md`](docs/design/00-design-brief.md) |
| Design tokens | [`docs/design/02-design-tokens.md`](docs/design/02-design-tokens.md) |
| Skills usage rules | [`docs/skills/01-skills-usage-rules.md`](docs/skills/01-skills-usage-rules.md) |
| Global progress tracker | [`docs/reports/global-progress.md`](docs/reports/global-progress.md) |
