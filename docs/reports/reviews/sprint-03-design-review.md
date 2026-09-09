# Sprint 3 — Design Review

**Reviewer:** `design-review` skill (7 dimensions) + `ui-ux-pro-max` rules + manual.
**Build:** `499ecf1` (pre-fix) → fixes applied same sprint.
**Pages:** Home, About · **Locales:** AR (RTL) + EN (LTR) · **Breakpoints:** 390, 768, 1440.
**Evidence:** full-page screenshots, `scratchpad/shots/` (not committed).

## What's already good — don't touch

- **RTL is genuinely mirrored**, not "LTR with flipped text": nav flows right→left,
  the "on this page" rail sits on the right, card rows reflow right→left, the
  `←`/`→` arrows and breadcrumb chevron point the correct way, `border-s`/`ps-*`
  logical properties hold.
- **Typography carries the page.** Amiri gives the headings real scholarly weight;
  IBM Plex Sans Arabic keeps body text modern and legible. The verbatim Arabic
  vision/mission read as written by a person.
- **Restrained colour.** Navy does the work; the umber‑bronze appears only on the
  one primary action per view and the section kickers. No rainbow.
- **Provisional content is honestly labelled** — featured programs show a bronze
  "قُدِّم مؤخراً / Recently offered" badge, not "Enrolling now".
- **Governance names nothing** it can't confirm.
- One `h1` per page; landmarks and heading nesting are clean; axe 0 serious/critical.

## Findings

| # | Sev | Dimension | Page / bp | Evidence | Fix | Status |
|---|---|---|---|---|---|---|
| 1 | **High** | Layout & spacing | both / 1440 | ~256 px of empty space between every section; Home 3626 px tall, About 3981 px — reads as sparse/unfinished | `Section` py `space-12` → `space-8`(mobile)/`space-9`(lg); `--section-gap` 64/128 → 48/80 | ✅ fixed (`499ecf1`+1) — Home 2802 px, About 3064 px |
| 2 | **High** | Responsive | both / 390 | `--breakpoint-sm` was 375 px, so `sm:grid-cols-3` fired on every phone — audience cards 3‑up and cramped ("...عن تدريب" wrapping to 3 lines) | `--breakpoint-sm` 375 → 640 | ✅ fixed — audience/dept cards now stack < 640 |
| 3 | Medium | Component consistency | Home / all | Pillar card showed its title as an `h3` **and** again as a bottom text link — redundant | Whole card is the link now (matches the program cards) | ✅ fixed |
| 4 | Medium | Interaction | Home / 390 | Header locale switcher (`hidden sm:flex`) showed cramped next to the hamburger on phones | → `hidden lg:flex`; it lives in the mobile sheet below `lg` | ✅ fixed |
| 5 | Medium | Visual hierarchy | Home / all | The "أنا… / I am a…" prompt under the audiences heading was mono‑xs and easy to miss | → `text-lg` | ✅ fixed |
| 6 | Medium | Correctness (motion) | both | Scroll‑reveal parked below‑fold content at `opacity:0` until the observer fired — invisible in a no‑scroll capture / "find in page" | `Reveal` now has an 800 ms fallback; content always appears | ✅ fixed |
| 7 | Low | Layout & spacing | About / 1440 | Breadcrumb sits **below** the large page header rather than above the `h1` | leave — below a `PageHeader` is a common, acceptable pattern | ⏭️ S8 if noticed again |
| 8 | Low | Visual hierarchy | Home / 1440 | Hero motif bleeds off the inline‑start edge showing ~half the star | intentional (6 % opacity texture); revisit position in S8 | ⏭️ S8 |
| 9 | Low | Component consistency | Home / About | Journal cover + audience/department icons are placeholders (real journal cover, richer iconography pending) | placeholder policy; real assets via checklist I3/I5 | ⏭️ assets |
| 10 | Low | Typography | About / 1440 | Vision (1 line) vs Mission (4 lines) blocks look unbalanced | verbatim content — do not edit to "balance" | ⏭️ accept |

## Anti‑AI‑smell pass

| Check | Result |
|---|---|
| Warm‑cream + serif + terracotta palette | ✅ ours is cool paper + navy + umber |
| Inter / Space Grotesk as the display face | ✅ Amiri + EB Garamond carry display |
| Emoji as icons / section markers | ✅ none (Lucide + inline brand SVG) |
| Numbered `01 / 02 / 03` markers on non‑sequences | ✅ none |
| Everything centered; one radius + one shadow on every block | ✅ left/start‑aligned; hairline cards vs. navy CTA band vs. bordered pills — spent by role |
| Purple→blue gradient hero on white | ✅ no gradient hero; a faint navy radial + motif texture |
| Stock imagery / AI faces | ✅ none — typographic + motif treatments only |
| "In today's fast‑paced world…" / adjective triads / empty transitions | ✅ copy is concrete; verbatim where it matters |

## Verdict

**Fix‑then‑ship.** Two High findings (whitespace, `sm` breakpoint) were structural and
are fixed this sprint; the four Medium findings are fixed. Low findings and the
placeholder‑asset items are logged for S8 / the asset bundle. The pages read as the
considered work of a studio.
