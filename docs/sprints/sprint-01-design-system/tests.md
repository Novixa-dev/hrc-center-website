# Sprint 1 — Test Plan & Results

Ref: [`docs/testing/00-test-strategy.md`](../../testing/00-test-strategy.md),
[`docs/testing/01-qa-checklist.md`](../../testing/01-qa-checklist.md).

## Plan — what we test this sprint

| # | Area | Type | How | Pass condition |
|---|---|---|---|---|
| 1 | | | | |

## Execution

**Build under test:** `<commit hash>` · local prod (`pnpm build && pnpm start`) unless noted.
**Date:** <date>

### Automated

| Suite | Command | Result | Notes |
|---|---|---|---|
| Lint | `pnpm lint` | — | |
| Typecheck | `pnpm typecheck` | — | |
| Unit | `pnpm test:unit` | — | |
| E2E + axe | `pnpm test:e2e` | — | |
| Lighthouse CI | `pnpm lhci` | — | |

### Lighthouse (mobile, throttled)

| Route | Perf | A11y | Best‑Pract. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| /ar | | | | | | | |

### Accessibility (manual)

| Page | Keyboard | Screen reader | 200% zoom | Reduced motion | Forced colors | Result |
|---|---|---|---|---|---|---|
| | | | | | | |

### Cross‑browser (S8)

| Page | Chrome | Edge | Firefox | Safari | iOS | Android |
|---|---|---|---|---|---|---|
| | | | | | | |

## Findings

| # | Severity | Area | Description | Fix commit / status |
|---|---|---|---|---|
| | | | | |

## Deferred

| Finding | Why | Follow‑up task |
|---|---|---|

## Verdict

- [ ] All planned tests executed.
- [ ] No open blocker/critical/serious findings (or listed as deferred with reason).
- [ ] Sprint DoD test items satisfied.

Reports archived: `docs/testing/reports/sprint-<n>/`
