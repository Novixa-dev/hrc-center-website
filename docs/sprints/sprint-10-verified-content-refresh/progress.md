# Sprint 10 — Progress Log

**Sprint status:** ✅ complete (round 1)
**Tasks:** 9 / 9 done
**Started:** 2026-10-19 · **Closed:** 2026-10-19

---

## Log

### 2026-10-19 — S10-T01 research refresh
- Read all 5 pages of the Center's official news feed, the Center pages (AR/EN), the publications page,
  the journal PDFs (Issues 1–2) and book covers; third-party: ISSN register, League of Islamic Universities.
- Findings that changed the site: E-ISSN 3106-9053; Issues 2 (Jan 2026) and 3 (Jul 2026); conference held
  27 Dec 2025 online; leadership named in official news; arbitration office (Oct 2026); partnerships.
- Corrections: "Hadramout and the Diaspora" is a King Faisal Center publication (not shown as HRC's);
  the "arbitrator training Jul 2024" item could not be found and was removed; the editorial-board and
  journal-site links printed in the issues are dead (404).
- Commit: `28baa3c docs(research)`

### 2026-10-19 — S10-T02…T08 implementation
- `source` on every collection + SourceLink + `NewsArticle.isBasedOn`; publication `contents`; conference
  `online` → Event with VirtualLocation; `Periodical` JSON-LD with ISSN.
- News archive: 15 sourced items (AR+EN). Journal block: glance, board, criteria, Issues 1–3 with contents
  and official PDFs. Team: four sourced names, per-locale. Services: sourced copy + highlights.
  About: milestones (9) + partners (4). Novixa credit → novixa.dev (K1).
- Commits: `a9ccbc9` `739feae` `be01d54` `8123b80` `4d4b937` `d8c71e9` `2f9222f` `4440fa9` `186e3b4`

### Verification (local production build, Node 22)
- `pnpm lint` ✅ · `pnpm typecheck` ✅ · unit **122/122** ✅ · `pnpm build` ✅
- e2e chromium + mobile **206/206** ✅ (incl. axe on every changed surface)
- Visual pass: AR/EN desktop + 390 px mobile screenshots of the new sections.

---

## Deviations from the plan

| Date | Planned | Actual | Why |
|---|---|---|---|
| 2026-10-19 | One commit per task | T02 carries the message-catalog + schema changes for T02–T08; T03–T08 are separate commits | Shared JSON catalogs/schema files cannot be split by hunk non-interactively |
| 2026-10-19 | — | Local toolchain: Node 22 + pnpm 11 in a scratch dir; `--fetch-timeout` raised for the 41 MB `next` tarball | Default 60 s fetch timeout aborts on this connection |
