# Git Workflow

## Branching (current phase: local only)

- Work directly on `main` while hosting is "local only" and there's a single builder.
- Keep `main` releasable: `pnpm lint && pnpm typecheck && pnpm build` must pass on every
  commit that touches `src/`.
- When a remote/CI is added (handover phase): switch to short‑lived `feat/*` branches +
  PRs; `main` protected.

## One task → one commit

- A commit maps to exactly one task (`S<n>-T<m>`).
- No "wip", no "misc fixes", no commit spanning multiple tasks.
- Commit only when the task meets its Task DoD.
- Docs‑only tasks commit docs; code tasks may include the docs they update (trackers).

## Conventional Commits

```
<type>(<scope>): <subject>            # <= ~72 chars, imperative, lower-case

<body: what & why, wrapped ~72; bullet points fine>

<footer: task ref + co-author>
```

**Types:** `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `chore` `ci`.

**Scopes (this repo):** `research` `planning` `design` `skills` `content` `i18n` `home`
`about` `services` `training` `research-page` `conferences` `team` `news` `contact` `ui`
`layout` `motion` `seo` `a11y` `perf` `test` `deps` `sprint`.

**Footer:**
```
Refs: S3-T04
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

### Examples

```
feat(home): build hero section with bilingual headline and CTA

- Reveal + Stagger motion wrappers, guarded by useReducedMotion
- AR/EN strings in messages/*.json under home.hero.*
- priority image on desktop only; token spacing/colors
- axe clean both locales; Lighthouse 98 mobile

Refs: S3-T03
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

```
docs(design): finalize typography system for AR and EN

Refs: S1-T02
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

## Tags

- `sprint-<n>-complete` — lightweight tag when a sprint's exit criteria are met and its
  report is written.
- `v1.0.0` — annotated tag at Project DoD.

## Trackers are part of the commit

Every task commit that isn't itself a tracker update should also touch:
- the sprint `tasks.md` (tick the box),
- the sprint `progress.md` (one line),
- `docs/reports/global-progress.md` (counts / current task).

Stage these together with the task's real changes.

## Hygiene

- No secrets, `.env`, `node_modules`, build output, or large binaries in Git.
- Source images go in `assets-source/` (tracked if small/licensed) or are documented as
  external in `06-assets-inventory.md` if too large.
- `pnpm-lock.yaml` is committed.
- Rebngase/force‑push: never on `main`. Fix forward with a new commit.
- If a commit is wrong and unpushed, `git commit --amend` is acceptable **before** the
  next task starts; otherwise a follow‑up `fix:` commit.

## Pre‑commit (from S2, via Husky + lint-staged)

- `eslint --fix` + `prettier --write` on staged `*.{ts,tsx,css,md}`.
- `tsc --noEmit` on commit.
- Commit message linted against Conventional Commits (`commitlint`).
