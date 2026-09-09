# Skills Inventory

Two tiers of skills are available to this project.

## Tier 1 — Vendored project skills (`/.claude/skills/`)

Copied into the repo so design decisions are reproducible across sessions and machines.
Source: Novixa's `aqar` project skill set (`claudekit` + adaptations).

| Skill | What it gives us | Primary use in this project |
|---|---|---|
| **`ui-ux-pro-max`** | Design intelligence: 50+ styles, 190+ product palettes, 74 font pairings, 119 UX guidelines, 105 icons, 17 GSAP presets, 25 chart types, 22 stack guides. Python CLI: `search.py`. | Sprint 1 design system generation; per‑component UX rule lookups; stack guidance (`--stack nextjs`); motion timing reference; accessibility rule checks. **The main design brain.** |
| **`design`** | Unified: brand identity, design tokens, UI styling (shadcn/Tailwind), logo generation, corporate identity, HTML slides, banner design, icon design, social images. | Brand identity work (S1); token architecture; OG/social image templates (S1/S7); handover slides (S9). |
| **`design-system`** | Three‑layer token architecture (primitive → semantic → component), CSS variables, spacing/type scales, component specs. | Authoring `docs/design/02-design-tokens.md` and `src/styles/tokens.css` (S1–S2). |
| **`ui-styling`** | shadcn/ui + Radix + Tailwind patterns, accessible component recipes, dark mode, theming. | Building `components/ui/` primitives (S2); accessible dialog/menu/disclosure/tabs patterns. |
| **`design-review`** | Structured visual‑polish audit across 7 dimensions (layout, typography, color, hierarchy, consistency, interaction, responsive) with severity + evidence reporting. | S8 design review pass; spot checks after big UI sprints. |
| **`brand`** | Brand voice, messaging frameworks, visual identity standards, consistency audit. | Voice & tone in `docs/design/01-brand-identity.md`; content review (S3–S6); consistency audit (S8). |
| **`banner-design`** | Multi‑format banner/hero/social/ad creative, art‑direction options. | OG image art direction (S1/S7); HRC social launch kit graphics (S9). |
| **`slides`** | Strategic HTML presentations, layout patterns, copywriting formulas, Chart.js. | Handover / pitch presentation for HRC (S9); Novixa case‑study deck. |

### `ui-ux-pro-max` CLI quick reference

```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "Hadramout Research Center" -f markdown
python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <product|style|color|typography|landing|ux|gsap|react|icons|google-fonts>
python .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs
```
Design dials: `--variance 1-10` `--motion 1-10` `--density 1-10`.
(Windows: use `python`, not `python3`.)

## Tier 2 — Session skills (Claude Code environment)

Not vendored; available when running in Claude Code. Use where they fit.

| Skill | Use in this project |
|---|---|
| `artifact-design`, `artifact-diagramming` | If we publish a visual artifact (e.g. a shareable design spec, a diagram of the IA) — design fundamentals. |
| `dataviz` | Any chart in the site or in reports (e.g. a programs‑by‑field chart, if added) — read before writing chart code. |
| `code-review` | End‑of‑sprint review of the diff (S3–S8) at `high` for correctness + cleanup. |
| `simplify` | After a feature sprint, quality pass on the changed code. |
| `security-review` | Before "ship" (S8/S9) — review the contact form / server action / any dynamic surface. |
| `run` | Launch the Next.js app to verify a change in the real browser (from S2). |
| `fewer-permission-prompts` | Optional, to speed up the workflow after patterns are established. |

## Skills we evaluated and are NOT using

| Skill | Why not |
|---|---|
| `skill-creator` | Not building new skills for this project. |
| `update-config`, `keybindings-help` | Environment config, not project work. |
| `loop`, `schedule` | No recurring/scheduled automation needed. |
| `claude-api` | We're not building an LLM app here. |

## Rules for using all of the above

See [`01-skills-usage-rules.md`](01-skills-usage-rules.md).
