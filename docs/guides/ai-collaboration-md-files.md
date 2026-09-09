# Working with Claude: the Markdown files that make it effective

> Why this repo is structured the way it is. Based on 2025–2026 consensus around
> "spec‑driven development" and Claude Code best practice.

## The core idea

Handing an agent a vague prompt produces vague code; a structured set of specs produces
something close to what you meant. The winning loop is:

**research → plan → execute → review → ship**, with a human gate at each step.

Persistent Markdown files are what carry intent *across sessions* so the agent doesn't
suffer "context amnesia" every time the conversation resets.

Sources:
[Thoughtworks — Spec‑driven development](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) ·
[O'Reilly — How to write a good spec for AI agents](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/) ·
[GitHub Spec Kit](https://github.com/github/spec-kit) ·
[Claude Code best practices 2026](https://www.openhands.dev/blog/claude-code-best-practices-agentic-coding) ·
[Claude Code — what the docs don't cover](https://chudi.dev/blog/claude-code-complete-guide)

## The canonical artifact set (and where each lives here)

| Artifact (generic name) | Purpose | In this repo |
|---|---|---|
| **`CLAUDE.md`** | Project context + rules the agent loads every session. Kept **short** (aim ≤ ~200 lines), links out to detail. What to touch, what not to, how to prove success, when to stop. | [`/CLAUDE.md`](../../CLAUDE.md) |
| **Constitution / principles** | Non‑negotiable project principles | Golden rules in `CLAUDE.md` §2 + [`06-definition-of-done.md`](../planning/06-definition-of-done.md) |
| **Research / context** | Everything gathered that the agent can't infer from code | [`docs/research/`](../research/) |
| **PRD / spec** — *what* & *why* | User stories, requirements, acceptance criteria, success metrics | [`docs/planning/01-prd.md`](../planning/01-prd.md) + [`00-master-plan.md`](../planning/00-master-plan.md) |
| **Design / plan** — *how* | Technical strategy, architecture, decisions | [`docs/planning/04-technical-architecture.md`](../planning/04-technical-architecture.md) + [`docs/design/`](../design/) + [`02-information-architecture.md`](../planning/02-information-architecture.md) |
| **`tasks.md`** — ordered breakdown | The unit of execution; each task small, testable, one commit | `docs/sprints/sprint-*/tasks.md` |
| **Progress / status** | Running state so a fresh session knows where things stand | `docs/sprints/sprint-*/progress.md` + [`docs/reports/global-progress.md`](../reports/global-progress.md) |
| **Test plan + results** | How we prove each slice works | `docs/sprints/sprint-*/tests.md` + [`docs/testing/`](../testing/) |
| **Reports / retros** | What actually happened, decisions, deferrals, risks | `docs/sprints/sprint-*/report.md` + [`docs/reports/global-report.md`](../reports/global-report.md) |
| **Skill usage rules** | How to use the vendored design/UX intelligence | [`docs/skills/01-skills-usage-rules.md`](../skills/01-skills-usage-rules.md) |
| **Conventions** | Git, coding standards, SEO checklist | [`docs/guides/`](.) |
| **`llms.txt` / machine summaries** | Compact index for LLM consumption | Generated in S2 as `public/llms.txt` (site content map) |

## Principles we follow

1. **Specs live beside the code** and version with it — not in a wiki, not in chat.
2. **`CLAUDE.md` stays lean.** It's an index + rules, not an encyclopedia. Detail is one
   click away in `docs/`.
3. **Separate planning from implementation.** Sprint 0–1 are planning; code starts Sprint 2.
4. **One task → one commit → tracker update.** Small scopes, clean context, verifiable.
5. **Every doc has an owner and a confidence level** where facts are involved.
6. **Write for "agent experience":** clean headings, tables over prose, explicit
   acceptance criteria, links between docs, no ambiguity about "done".
7. **The trackers are load‑bearing.** `global-progress.md` is the first file to read each
   session; sprint `progress.md` is updated after every task.
8. **Reports are honest.** Deferred, broken, and uncertain things are written down, not
   hidden.

## Session ritual (also in `CLAUDE.md` §5)

1. Read `CLAUDE.md` → `docs/reports/global-progress.md` → current sprint `README.md` + `tasks.md`.
2. Pick the next unblocked task.
3. Pull the relevant spec/design/skill.
4. Implement → verify against DoD → update trackers → commit.
5. At sprint end: run tests, write the report, update global docs, tag, open next sprint.

## What we deliberately did NOT add

- A second AI‑rules file format (e.g. `.cursorrules`, `AGENTS.md`) — one source of truth.
- Auto‑generated giant context dumps — they bloat context and age badly.
- Per‑file header comments restating the docs — the docs are the source.
- A CMS or issue tracker — for a solo pro‑bono build, Markdown + Git is enough and stays
  reviewable.
