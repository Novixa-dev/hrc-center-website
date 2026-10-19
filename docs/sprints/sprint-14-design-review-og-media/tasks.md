# Sprint 14 — Tasks

## Design review findings (design-review skill; screenshots 375/768/1440, AR + EN)

| # | Severity | Dimension | Finding | Fix |
|---|---|---|---|---|
| 1 | High | Layout / interaction | Assistant trigger was a wide floating pill covering content on every page (news headline at 1440, article text and section headings at 375) | Compact 56 px round button at the inline end, label for AT + tooltip; no pulse animation |
| 2 | High | Interaction (empty states) | Conferences: "Upcoming & in preparation" heading rendered with nothing under it | Designed empty-state note |
| 3 | Medium | Consistency | Affiliation lockup read "A center of Al-Ahgaff University · Al-Ahgaff University" (About, footer) | Removed the duplicated name; new-tab hint for AT |
| 4 | Medium | Consistency | 9 utility classes referenced tokens that do not exist (`surface-elevated`, `surface-hover`, `primary-hover`, `secondary`, `background`, `foreground`, `muted-foreground`) — styles silently dropped in the assistant, contact form, contact + privacy pages | Mapped to design-system tokens |
| 5 | Medium | Content / i18n | Assistant: 9 hard-coded bilingual strings (rule 5) and a header claiming "Powered by Gemini" while it answers from the local knowledge base | Moved to the `assistant` catalog; accurate status line + disclaimer |
| 6 | Medium | Typography | `font-display: optional` (S11) left English headings in the fallback serif on first visits | Self-hosted Latin faces, preloaded on `/en` only |

What already works (left untouched): RTL mirroring, no horizontal overflow at any size, consistent card system, steady section rhythm, type hierarchy.

## Tasks

| ID | Status | Task | Commit |
|---|---|---|---|
| S14-T01 | ✅ | Design-review fixes 1–5 | `fix(ui)` |
| S14-T02 | ✅ | Per-page OG cards: Chromium-rendered (satori cannot shape Arabic), 84 JPEG cards, `og:image`/`twitter:image` per page with brand-card fallback, CI generation before build, e2e | `feat(og)` |
| S14-T03 | ✅ | Latin faces self-hosted (OFL), preloaded on `/en` only, metric-matched fallbacks; `/en` CLS 0 with brand fonts | `perf(perf)` |
| S14-T04 | ✅ | "In the media" on News (4 independent items) + BoT chair full name | `feat(news)` |
| S14-T05 | ✅ | Research, checklist, trackers | `docs(sprint)` |
| S14-T06 | ✅ | All typefaces self-hosted, per-locale preloads (next/font dropped) | `perf(perf)` |

### S14-T06 — why, and the numbers

The first S14 deploy (Latin preloaded on /en on top of next/font's shared Arabic preloads) measured live
`/en` 71 (LCP 5.8 s) — 8 font files competing. next/font cannot preload per locale, so every face is now
self-hosted (one file per subset) and each locale preloads only what it renders above the fold:
`/ar` Amiri 700 + Plex Arabic 400 (arabic subsets); `/en` Inter + EB Garamond 600.

| Local Lighthouse mobile | before (S13) | after |
|---|---|---|
| `/en` | 87 · LCP 3.9 s | **89–95 · LCP 2.6–3.2 s** |
| `/ar` | 89 · LCP 3.8 s | 84–85 · LCP 3.9 s (machine noisier this run: TBT 130–170 vs 60) |

Rendered fonts verified in Chromium: AR = Amiri 700, Plex Arabic 400/600; EN = Inter, EB Garamond 600.

Verification: lint ✅ · typecheck ✅ · unit 123/123 ✅ · build ✅ · e2e chromium + mobile 220/220 ✅ ·
local Lighthouse mobile `/en` 83 · `/ar` 86–88 · CLS 0 · nginx config tested in nginx 1.27.
