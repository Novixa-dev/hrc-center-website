# Sprint 1 — Progress Log

Running log. One entry per work session / task. Newest at the bottom.

**Sprint status:** ✅ closing
**Tasks:** 13 / 13 done
**Started:** 2026-09-09 · **Closed:** 2026-09-09

---

## Log

### 2026-09-09 — S1-T01 dark-theme decision + palette scope
- Did: decided **system-only** dark mode for v1 (no toggle); token architecture uses
  `:root` + `@media (prefers-color-scheme: dark)` + `[data-theme]` so a toggle is additive.
- Result: recorded in `design/02` header + `planning/04` decisions log.
- Decisions: dark = system-only; palette roles locked (navy brand, blue focus, bronze CTA).

### 2026-09-09 — S1-T02 colour system + contrast matrix
- Did: wrote `scripts/check-contrast.py` (WCAG 2.x, stdlib, re-runnable, non-zero on
  regression). Audited every fg/bg + UI pair, light + dark. Finalized `design/02`
  (primitive/semantic/component colour tokens) and attached the full matrix to `design/05`.
- Result: **0 pairs below threshold.** Key outcomes: bronze `#A16207` is fill/large-only;
  `#854D0E` (6.9:1) is the text/link/CTA colour; interactive borders use `slate-500`
  (light) / `#647CA6` (dark) for ≥3:1; decorative hairlines can stay `slate-300`.
- Skills used: — (used the WCAG formula directly; cross-checked against `ui-ux-pro-max`
  Quick Reference §1 `color-contrast` / `color-accessible-pairs`).
- Follow-ups: verify on-device once fonts are in (S2); re-run script after any colour change.

### 2026-09-09 — S1-T03..T13 (typography → close)
- Did: finalized typography (`design/03`): Amiri + IBM Plex Sans Arabic (AR) + EB Garamond
  + Inter + IBM Plex Mono (LA/data); locked the `clamp()` scale + per-script tuning.
  Promoted `design/02` tokens, `design/04` motion (with copy-ready Framer Motion variants),
  `design/01` brand (voice + boilerplate draft + motif = 8-point star) to FINAL. Added the
  iconography section to `design/06`. Wrote `design/07-wireframes.md` (6 templates + global
  chrome, LTR/RTL, mobile) and `design/08-og-and-brand-assets.md` (motif, lockup, favicons,
  OG template). Wrote the design-review rubric. Built the visual specimen
  (`docs/design/specimen.html`). Ran `--design-system --persist --page home`; rewrote
  `MASTER.md` to the signed-off decisions + added `pages/home.md`; recorded the seed→final
  reconciliation in `design/00` §9.
- Result: design system signed off. Every `design/0x` doc is FINAL or has an explicit
  "verify in S2" tail. `MASTER.md` consistent with `docs/design/`.
- Skills used: `ui-ux-pro-max` (`--design-system --persist`, `--domain typography/gsap`);
  `artifact-design` (specimen); reviewed `design-review` skill for the rubric.
- Blockers: **Artifact publish of the specimen was denied by the session auto-mode
  classifier** — specimen kept as a local HTML file; flagged to the user.
- Follow-ups: on-device font render + perf-budget check (S2/S7); per-component full state
  specs authored as each component is built (S2); HRC inputs via checklist (logo, numerals,
  tagline).
- Commits: `80895f8` (colour), `525209a` (typography → close).

---

## Blockers encountered

| Date | Blocker | Resolution / workaround |
|---|---|---|
| | | |

## Deviations from the plan

| Date | Planned | Actual | Why |
|---|---|---|---|
| | | | |
