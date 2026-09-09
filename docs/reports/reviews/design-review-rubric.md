# Design Review Rubric

> Used from Sprint 3 on (after each page‑building sprint) and in full at Sprint 8. Pairs
> the `design-review` skill (visual polish, 7 dimensions) with `ui-ux-pro-max --domain ux`
> (interaction/a11y rules). Findings recorded per run in
> `docs/reports/reviews/sprint-<n>-design-review.md`.

## The question

> "Does this look and feel like the considered work of a professional studio — not a
> template, not AI‑generated?"

## Seven dimensions (score each 1–5; note evidence)

| # | Dimension | Looking for | Red flags |
|---|---|---|---|
| 1 | **Layout & spacing** | Consistent 8pt rhythm; generous, intentional whitespace; alignment to the grid; sections breathe | Random gaps, cramped clusters, things not aligned, one giant hero pushing content off the fold |
| 2 | **Typography** | Clear hierarchy; on‑scale sizes; body measure 46em AR / 66ch LA; line‑height per script; balanced short headings; no orphan words | Too many sizes, tight Arabic, walls of text, centered everything, Latin body doing the personality work |
| 3 | **Colour & contrast** | Token‑driven (no ad‑hoc hex); navy does the work; **one** bronze CTA per view; contrast verified; dark theme is a real pair | Rainbow of accents, bronze text failing contrast, gray‑on‑gray, dark mode = naive invert |
| 4 | **Visual hierarchy** | The primary action/content is obvious at a glance; secondary things recede | Everything competes; CTA lost; card soup with one radius + one shadow everywhere |
| 5 | **Component consistency** | Buttons/cards/inputs/badges/icons look like one system across pages; states (hover/focus/pressed/disabled) coherent | Variants drift page to page; inconsistent icon sizes/strokes; mismatched radii |
| 6 | **Interaction & motion** | Feedback within ~100ms; focus always visible + unobscured; motion subtle, meaningful, ≤ 2 elements/viewport; reduced‑motion honoured | Hover‑only affordances, invisible focus, everything animating on scroll, layout‑shifting transitions |
| 7 | **Responsive behaviour** | Flawless 320→1920; no horizontal scroll; touch targets ≥ 24 (44 primary); wide content scrolls in its own container; RTL mirrors cleanly | Overlap/clipping at a breakpoint, tiny tap targets, body scrolls sideways, RTL bugs (unflipped arrows, `left/right` leaks) |

## Anti‑AI‑smell pass (binary — any "yes" is a finding)

- [ ] Warm‑cream + serif + terracotta palette? (ours is navy + umber + cool paper — good)
- [ ] Inter/Space Grotesk carrying the display voice? (ours is Amiri/EB Garamond — good)
- [ ] Emoji as section markers or icons?
- [ ] Numbered `01 / 02 / 03` markers on content that isn't a sequence?
- [ ] Everything centered; `rounded-lg` + one shadow on every block?
- [ ] Purple→blue gradient hero on white?
- [ ] Generic stock imagery / AI faces?
- [ ] Copy openers like "In today's fast‑paced world…", triads of adjectives, empty
      transitions? (see `03-content-strategy.md`)

## Severity scale for findings

| Severity | Meaning | Must fix before… |
|---|---|---|
| **Blocker** | Breaks the page / unreadable / inaccessible | the commit |
| **High** | Clearly unprofessional; a client would notice | the sprint closes |
| **Medium** | Polish gap; noticeable to a designer | Sprint 8 |
| **Low** | Nitpick / subjective | backlog, optional |

## Recording format (per run)

```
# Sprint <n> — Design Review
Reviewer: <skill + manual> · Build: <commit> · Pages: <list> · Themes: light + dark · Dirs: LTR + RTL

## Scores
| Page | L&S | Type | Colour | Hier. | Consist. | Interaction | Responsive |

## Findings
| # | Severity | Dimension | Page | Evidence (screenshot / selector) | Recommendation | Fix commit |

## Anti-AI-smell: pass / <list>
## Verdict: <ship / fix-then-ship / rework>
```
