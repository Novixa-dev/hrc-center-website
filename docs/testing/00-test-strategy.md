# Test Strategy

## Goals

Prove, at every sprint boundary and before launch, that the site is **correct, bilingual,
accessible, fast, and resilient** — with evidence, not vibes.

## Test types & tooling

| Layer | Tool | Scope | Runs |
|---|---|---|---|
| **Static analysis** | ESLint (next + ts + jsx‑a11y + tailwind), `tsc --noEmit`, Prettier check | All `src/` | pre‑commit + CI |
| **Unit** | Vitest | `lib/` (seo, schema, content loaders, formatters, validation), pure UI logic | pre‑commit (changed) + CI |
| **Component / interaction** | Playwright (component or page‑mounted) | Interactive components: nav, mobile menu, locale switcher, filter bar, form, disclosure | CI + per task touching them |
| **End‑to‑end** | Playwright | Every route in `ar` + `en`: renders, `h1`, key content, nav works, no console errors | CI + sprint gate |
| **Accessibility (automated)** | `@axe-core/playwright` | Every route × locale; 0 serious/critical | CI + Page DoD |
| **Accessibility (manual)** | NVDA/VoiceOver, keyboard, zoom, forced‑colors, reduced‑motion | Representative pages per sprint; full site S7/S8 | Page DoD spot + S7/S8 |
| **Performance** | Lighthouse CI (`@lhci/cli`), mobile preset, throttled | Representative routes (home, a catalog, a detail, contact) | CI + sprint gate |
| **Visual / design polish** | `design-review` skill (7 dimensions) + manual screenshots | Full pages | after S3, then S8 |
| **SEO / structured data** | schema.org validator + Rich Results test + manual meta/hreflang audit + `xml` validation | Every page | S7 + spot per page |
| **Cross‑browser / device** | Playwright projects (Chromium, Firefox, WebKit) + manual on real iOS/Android | Full site | S8 |
| **Content / linguistic** | Native‑level read (AR + EN), glossary check, anti‑AI‑smell checklist, link check | All copy | per content task + S8 |
| **Resilience** | Throttled 3G/Slow‑4G profile, JS‑disabled smoke, offline reload of a static page | Home, a detail page, contact | S7/S8 |
| **Security** | `security-review` skill, dependency audit (`pnpm audit`), form abuse test (honeypot/rate) | Server action / form / headers | after S6 + S8 |

## Environments

- **Local dev** (`pnpm dev`) — authoring + quick checks.
- **Local prod** (`pnpm build && pnpm start`) — the target for Lighthouse, e2e, axe (dev
  mode perf numbers are not trusted).
- No staging server this phase (local‑only hosting).

## Test data

- Content collections carry a small set of **clearly‑marked provisional entries** derived
  from research (e.g. 3–4 programs, 3 news items, 1–2 conferences, journal issues). Each
  has `provisional: true` in frontmatter and a checklist entry. Tests assert structure and
  behavior, not the provisional facts.

## CI pipeline (`.github/workflows/ci.yml`, ready for when a remote is added)

```
install → lint → typecheck → unit → build → e2e (+ axe) → lighthouse-ci → upload reports
```
Until a remote exists, the same steps run locally via `pnpm verify` (a script that chains
them) and are recorded in the sprint `tests.md`.

## Definition of "passing" per gate

| Gate | Pass condition |
|---|---|
| Pre‑commit | lint + typecheck + changed unit tests green |
| Task | Task DoD (incl. relevant tests added & green) |
| Page | Page DoD (axe clean, Lighthouse ≥ 95, manual a11y spot) |
| Sprint | all tasks + `tests.md` executed + full e2e green + LHCI budgets met + report written |
| Project | full matrix (S8) + all structured data valid + checklist resolved/deferred |

## Reporting

- Each sprint: `docs/sprints/sprint-<n>/tests.md` — the plan, what ran, results, failures,
  fixes, screenshots/scores.
- Aggregate scores tracked in `docs/reports/global-report.md` (Lighthouse per route, axe
  status, e2e count, browser matrix).
- Lighthouse HTML/JSON and Playwright reports saved under `docs/testing/reports/sprint-<n>/`
  (large HTML gitignored; JSON summaries committed).

## Regression policy

From S2 on, `pnpm verify` (full suite) must be green before a sprint closes. A red test is
either fixed or, if genuinely out of scope, moved to the sprint report's "deferred" list
with a reason and a follow‑up task.
