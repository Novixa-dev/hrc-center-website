# Documentation Index

Everything that isn't code. Start each session at
[`reports/global-progress.md`](reports/global-progress.md).

## Read order for a new contributor (human or AI)

1. [`/idea.md`](../idea.md) — the client brief (authoritative intent)
2. [`/CLAUDE.md`](../CLAUDE.md) — operating rules + per‑task Definition of Done
3. [`reports/global-progress.md`](reports/global-progress.md) — where the project is now
4. `sprints/sprint-<current>/README.md` + `tasks.md` — what to do next
5. The specific `planning/`, `design/`, `research/` doc your task touches

## Folders

### `research/` — the source of truth for facts
| File | Covers |
|---|---|
| [`00-index.md`](research/00-index.md) | Sources, confidence legend, open research tasks |
| [`01-al-ahgaff-university.md`](research/01-al-ahgaff-university.md) | Parent institution |
| [`02-hadramout-research-center.md`](research/02-hadramout-research-center.md) | HRC — the core file |
| [`03-novixa-brand.md`](research/03-novixa-brand.md) | The studio + design references |
| [`04-peer-benchmark.md`](research/04-peer-benchmark.md) | How peers present online |
| [`05-digital-presence-audit.md`](research/05-digital-presence-audit.md) | Current footprint + gaps |
| [`06-assets-inventory.md`](research/06-assets-inventory.md) | Logos, photos, fonts — provenance |

### `planning/` — what & how
| File | Covers |
|---|---|
| [`00-master-plan.md`](planning/00-master-plan.md) | Goal, success criteria, scope, approach |
| [`01-prd.md`](planning/01-prd.md) | Personas, requirements, content model |
| [`02-information-architecture.md`](planning/02-information-architecture.md) | Sitemap, nav, templates, collections |
| [`03-content-strategy.md`](planning/03-content-strategy.md) | Voice, bilingual mechanics, glossary, SEO copy |
| [`04-technical-architecture.md`](planning/04-technical-architecture.md) | Stack, rendering, i18n, pipeline, budgets, decisions |
| [`05-sprint-plan.md`](planning/05-sprint-plan.md) | S0–S9 |
| [`06-definition-of-done.md`](planning/06-definition-of-done.md) | Task / Page / Sprint / Project DoD |
| [`07-risk-register.md`](planning/07-risk-register.md) | 16 risks, scored, owned |

### `design/` — the visual + interaction system
| File | Covers |
|---|---|
| [`00-design-brief.md`](design/00-design-brief.md) | Direction, audiences, S1 deliverables, change log |
| [`01-brand-identity.md`](design/01-brand-identity.md) | Essence, positioning, voice, visual identity |
| [`02-design-tokens.md`](design/02-design-tokens.md) | primitive → semantic → component tokens |
| [`03-typography-system.md`](design/03-typography-system.md) | AR + EN pairing, scale, per‑script tuning |
| [`04-motion-guidelines.md`](design/04-motion-guidelines.md) | Philosophy, tokens, patterns (Framer Motion) |
| [`05-accessibility-standards.md`](design/05-accessibility-standards.md) | WCAG 2.2 AA commitments + protocol |
| [`06-component-inventory.md`](design/06-component-inventory.md) | ui / layout / motion / sections catalog |

### `content/` — copy + confirmation
| File | Covers |
|---|---|
| [`content-review-checklist.md`](content/content-review-checklist.md) | Every unverified claim, for HRC to confirm |
| `ar/`, `en/` | Per‑page content briefs & drafts (added S3–S6) |

### `skills/` — design intelligence
| File | Covers |
|---|---|
| [`00-skills-inventory.md`](skills/00-skills-inventory.md) | What's vendored + why |
| [`01-skills-usage-rules.md`](skills/01-skills-usage-rules.md) | Binding rules for using them |

### `guides/` — how we work
| File | Covers |
|---|---|
| [`ai-collaboration-md-files.md`](guides/ai-collaboration-md-files.md) | Why this doc structure (spec‑driven dev) |
| [`git-workflow.md`](guides/git-workflow.md) | One task → one commit, Conventional Commits |
| [`coding-standards.md`](guides/coding-standards.md) | TS/React/Tailwind/i18n/a11y/motion conventions |
| [`seo-checklist.md`](guides/seo-checklist.md) | Per‑page + site‑wide + post‑launch |

### `testing/` — proving it works
| File | Covers |
|---|---|
| [`00-test-strategy.md`](testing/00-test-strategy.md) | Layers, tools, gates, reporting |
| [`01-qa-checklist.md`](testing/01-qa-checklist.md) | Master per‑page + site‑wide checklist |
| `reports/` | Archived Lighthouse/Playwright output per sprint |

### `reports/` — status & story
| File | Covers |
|---|---|
| [`global-progress.md`](reports/global-progress.md) | Live tracker — **read first** |
| [`global-report.md`](reports/global-report.md) | Accumulating narrative + decisions + metrics |
| `reviews/` | `design-review` / `code-review` outputs |

### `sprints/` — execution
- `_templates/` — the five files every sprint folder starts from.
- `sprint-<nn>-<name>/` — `README.md` (plan) · `tasks.md` (tracker) · `progress.md` (log)
  · `tests.md` (results) · `report.md` (retro).

### `marketing/` (created in S9)
- Novixa case study · HRC social launch kit · handover presentation.

## Conventions

- Facts carry a confidence tag (✅ 🟡 🔴 ❓). Unverified → `content-review-checklist.md`.
- Docs cross‑link with relative paths.
- Design docs marked "draft" are not binding until the S1 sign‑off note.
- Append‑only logs (decisions, change logs, risk status) are never rewritten, only added to.
