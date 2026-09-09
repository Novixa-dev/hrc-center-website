# Sprint 5 — Research + Conferences + Team

**Goal:** Ship the Research (with the Journal section), Conferences, and Team pages, plus
publication and event detail templates — reusing the `defineCollection` pattern from S4.

**Depends on:** S4 (`defineCollection`, `Prose`, `KeyFacts`, `OnThisPage`, `PageHeader`,
`FilterBar` pattern, the `sections/` layer, SEO infra).
**Blocks:** S6 (`news` copies the same collection pattern); S7 hardening sweep needs all
content pages in place.

## Scope

### In
- **`publications` collection** (`src/content/publications/{ar,en}/<slug>.md`): Zod
  frontmatter (`title`, `summary`, `kind` = journal | book | report | paper, `date?`,
  `authors?`, `doi?`, `url?`, `provisional`, `order`) + markdown body. Journal issues may
  be a lighter sub-shape.
- **`conferences` collection**: Zod frontmatter (`title`, `summary`, `status` = upcoming |
  past | planned, `startDate?`, `endDate?`, `location?`, `theme?`, `provisional`, `order`)
  + body (call for papers / programme / outcomes where known).
- **`team` collection** *(or typed data file if bodies stay short)*: `name`, `role`,
  `group` (board-of-trustees | executive | advisory | staff), `confirmed: boolean`,
  `bio?`, `photo?`, `order`. **`confirmed: false` ⇒ the name never renders** — the card
  shows the role + "التعيين يُعلَن قريباً / appointment announced soon".
- **Research page** (`/[locale]/research`): `Overview` — what HRC researches (the pillars
  + department mandates), how to commission research (→ Services/Contact), current focus
  areas, then the **Journal section**: aims & scope, "how to submit" (the real
  `law.m@ahgaff.edu` route), issue archive (confirmed issues only), editorial-board
  placeholder ("board listed on the university site" + link) — no ISSN until confirmed.
- **Publication detail** (`/[locale]/research/[slug]` or `/publications/[slug]`):
  breadcrumb, header, metadata aside, body, `ScholarlyArticle` / `Book` JSON-LD only with
  confirmed fields; link out to any external DOI/PDF.
- **Conferences list** (`/[locale]/conferences`): upcoming vs. past split; cards; empty
  state if nothing confirmed. **Event detail** (`/[locale]/conferences/[slug]`):
  `Event` JSON-LD **only** when a real date + location exist; otherwise a plain page.
- **Team page** (`/[locale]/team`): grouped sections (board / executive / advisory /
  staff), role cards, graceful "announced soon" for every unconfirmed person, university
  affiliation lockup. `governance` teaser on About can now deep-link here.
- **SEO:** metadata + canonical + hreflang + OG per page; `CollectionPage` /
  `ItemList` where it helps; breadcrumbs on every detail.
- **Tests:** e2e for Research + Journal + Conferences + Team + one detail of each (both
  locales, axe); unit tests for the two/three new schemas + loaders (invalid frontmatter
  throws; `confirmed: false` hides the name).
- Remove `/research`, `/conferences`, `/team` from `routesInProgress` as they ship.
- Keep the **full e2e matrix** (chromium + mobile) in every run (S4 lesson / R15).

### Out (this sprint)
- `news` collection + article + RSS → S6.
- Contact page + form → S6.
- Utility pages (privacy / accessibility / links) → S6.
- Performance tuning → S7.
- Real journal issue list, ISSN, board names, conference themes, staff names → depends on
  HRC (checklist B/F/G rows); confirmed-only rendering meanwhile.

## Deliverables

- [ ] `src/lib/content/{publications,conferences,team}.ts` (+ schema additions).
- [ ] `src/content/{publications,conferences}/{ar,en}/*` — provisional entries, flagged.
- [ ] `src/content/team/*` (or `src/lib/team.ts`) — roles only, `confirmed` gating.
- [ ] `/[locale]/research` (+ Journal section) and publication detail.
- [ ] `/[locale]/conferences` + event detail (`Event` JSON-LD when dated).
- [ ] `/[locale]/team` (grouped, graceful pending state).
- [ ] `tests/e2e/{research,conferences,team}.spec.ts` + `tests/unit/*` for the new loaders.
- [ ] Lighthouse a11y/BP/SEO ≥ 95 on the new pages ×2 locales (perf recorded).
- [ ] `docs/content/{research,conferences,team}-content.md`; checklist flags.
- [ ] `docs/reports/reviews/sprint-05-design-review.md`.

## Exit criteria

- [ ] Research + Conferences + Team + the two detail templates meet **Page DoD** in
      AR + EN (perf → S7).
- [ ] No fabricated names, dates, ISSNs, or attendance figures render anywhere; every
      unconfirmed item is in the checklist and shows a neutral state in the app.
- [ ] `Event` structured data only where a real date + location exist; other structured
      data validates.
- [ ] New collections Zod-validated; build fails on a bad frontmatter file; unit-tested,
      including the `confirmed: false` ⇒ name-hidden rule.
- [ ] lint / typecheck / unit / e2e (chromium **+ mobile**) / build green; axe 0 serious/critical.
- [ ] `report.md`; globals + metrics; `sprint-5-complete` tag; S6 folder drafted.

## Risks for this sprint

| Risk | Mitigation |
|---|---|
| Team page invents or implies leadership (R4) | `confirmed` boolean gates the name; default card is role-only "announced soon"; unit test asserts brief names never render; e2e asserts the same |
| Journal facts wrong — visible to academics (R10) | Render only confirmed fields (title, publisher, submission email, the issues we can verify); link to the university's editorial-board page; no ISSN / frequency until confirmed |
| Conference data is inconsistent across sources (R11) | Research file records all variants; show only what's consistent; "Second Scientific Conference — in preparation" is safe, specific dates/themes are not |
| `Event` JSON-LD with no real date/venue | Emit `Event` only when both exist; otherwise a plain informational page |
| Three collections at once → schema drift | One shared `baseFrontmatter`; extend per collection; the S4 `defineCollection` is unchanged |
| Empty Conferences / thin Team read as unfinished | Designed empty/pending states (the S4 catalog empty state is the reference) |
