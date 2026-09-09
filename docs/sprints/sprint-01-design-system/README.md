# Sprint 1 — Design System (paper)

**Goal:** Lock the visual and interaction language — colors, type, spacing, motion,
components, brand motif, wireframes — so Sprint 2 can implement without re‑deciding.

**Depends on:** S0 (design brief + drafts, research, skill rules).
**Blocks:** S2 (scaffold consumes the finalized tokens + wireframes).

## Scope

### In
- Contrast‑verified color system (light + dark) with a full pairing matrix.
- Final typography system (families, fluid scale, per‑script tuning) — tested on device.
- Final token tables (primitive → semantic → component), ready to become `tokens.css`.
- Motion tokens + reference behaviors for `Reveal` / `Stagger` / `ParallaxLite` / overlays.
- Iconography rules (Lucide usage, sizes, RTL flips).
- Component inventory with full state specs (the S0 template filled for every component).
- Brand: finalized voice, Arabic tagline/boilerplate draft, and a geometric motif (3→1).
- OG image template design (AR + EN direction).
- Affiliation lockup design (HRC + "a center of Al‑Ahgaff University").
- Low‑fidelity wireframes for all 6 page templates, in LTR **and** RTL.
- `design-system/hadramout-research-center/MASTER.md` persisted via `ui-ux-pro-max`.
- A short design‑review rubric to use from S3 on.

### Out (this sprint)
- Any `src/` code, Tailwind config, real components → **S2**.
- High‑fidelity mockups / a full design tool file — wireframes + specs are enough; final
  visual polish happens in‑browser (S3–S8) against the tokens.
- Page content → **S3–S6**.

## Deliverables

- [ ] `docs/design/02-design-tokens.md` — finalized (no "draft"/"pending" markers).
- [ ] `docs/design/03-typography-system.md` — finalized with locked `clamp()` values.
- [ ] `docs/design/04-motion-guidelines.md` — finalized.
- [ ] `docs/design/05-accessibility-standards.md` — contrast matrix attached.
- [ ] `docs/design/06-component-inventory.md` — every component has a filled state spec.
- [ ] `docs/design/01-brand-identity.md` — voice final; tagline/boilerplate draft; motif chosen.
- [ ] `docs/design/07-wireframes.md` — ASCII/description wireframes for 6 templates × 2 directions.
- [ ] `docs/design/08-og-and-brand-assets.md` — OG template, favicon basis, affiliation lockup, motif spec.
- [ ] `design-system/hadramout-research-center/MASTER.md` (+ `pages/`).
- [ ] `docs/design/00-design-brief.md` §8 all checked; §9 sign‑off note added.
- [ ] `docs/reports/reviews/` — the design‑review rubric.

## Exit criteria

- [ ] All deliverables above complete; no "TBD/pending/draft" left in `design/02–06`.
- [ ] Every text/background and UI/background pair in the palette meets WCAG (4.5:1 text,
      3:1 large/UI) in **light and dark**, documented in the matrix.
- [ ] Token tables are directly transcribable to CSS variables (names finalized).
- [ ] Wireframes exist for Landing, Overview, Catalog, Detail, Form, Utility — LTR + RTL.
- [ ] `MASTER.md` persisted; `design/00` notes it and any narrative drift.
- [ ] `report.md` written; globals updated; `sprint-1-complete` tag.

## Risks for this sprint

| Risk | Mitigation |
|---|---|
| Bronze accent fails small‑text contrast on white | Build the matrix first; restrict bronze to large/UI/fills or darken to `#854D0E`; pick link/CTA colors from verified pairs |
| Arabic display face choice (Naskh vs Amiri) hard to judge without rendering | Render real samples via a scratch HTML page (allowed, throwaway) at 375 & 1440 before deciding |
| Over‑speccing / gold‑plating the system | Spec only what the 14 pages + inventory actually need; defer the rest to "as encountered" |
| Dark theme doubles the work | Decide system‑only vs toggle at the top of the sprint; if toggle, it's still one token map with a `[data-theme]` override |
