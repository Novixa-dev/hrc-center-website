# Sprint 3 — Progress Log

**Sprint status:** ✅ complete
**Tasks:** 12 / 12 done
**Started:** 2026-09-09 · **Closed:** 2026-09-09

User: continue autonomously; performance deferred to S7 as planned.

---

## Log

### 2026-09-09 — S3-T01..T02 content
- Did: re-fetched `ahgaff.edu/centers/1/` → captured **verbatim Arabic** for the vision,
  mission, definition and the 6 department names; updated `research/02`. Wrote
  `docs/content/{home,about}-content.md` — bilingual copy, every unverified item flagged.
- Result: content ready; ~10 checklist rows added/refined.
- Skills: `brand` voice guidance applied; anti-AI-smell checklist run.
- Commit: `c91b5ad`.

### 2026-09-09 — S3-T03..T10 sections + pages + tests
- Did: built the `sections/` layer (13 components); composed Home (`/[locale]`) and About
  (`/[locale]/about`); `lib/content.ts` (typed structure) + `messages` strings by id;
  `aboutPageSchema` + `BreadcrumbList`; `Breadcrumbs` ui component; `/about` off
  `routesInProgress`. `tests/e2e/{home,about}.spec.ts` (24 cases).
- Result: build green; e2e 36→(later 38) pass.
- Commit: `33f6ed5`.

### 2026-09-09 — S3-T11 Lighthouse + design review
- Did: first Lighthouse of the rich Home = **P 45** (6 Framer Motion islands, TBT 940ms,
  LCP 6.6s). → replaced Framer Motion with a CSS `<Reveal>`, removed the `motion` package,
  scoped `NextIntlClientProvider` to 3 namespaces → LCP ~3.3-4.4s, −38KB JS.
  Design-review pass (7 dimensions + anti-AI-smell): 2 High (section whitespace ~256px;
  `--breakpoint-sm` 375px firing `sm:` on every phone) + 4 Medium — **all fixed**:
  section padding space-12→space-8/9, breakpoint-sm 375→640, pillar cards whole-card
  links, audience prompt text-lg, locale switcher → `lg:`, arbitrary Tailwind values →
  canonical utilities across 28 files. axe then flagged a **serious** contrast issue
  (below-fold reveal content at opacity:0, 281 nodes) → made the reveal a translate-only
  rise (opacity stays 1) → axe clean, e2e 38/38.
- Result: **a11y/BP/SEO = 100** all 4 pages; performance 64-79 (→ S7).
- Skills: `design-review` (rubric), `artifact-design` (screenshots via Playwright),
  `ui-ux-pro-max` reference.
- Commits: `dda258a`, `f9cf035`, `c34da77`.

### 2026-09-09 — S3-T12 close
- Did: design-review doc, `tests.md`, `report.md`, LH summary, globals, S4 folder, tag.
- Commit: `(close)`.

---

## Blockers encountered

| Date | Blocker | Resolution |
|---|---|---|
| 2026-09-09 | `commitlint` rejects `content(...)` type and capitalized subjects | `content` is a scope not a type → `docs(content):`; lowercase subjects |
| 2026-09-09 | `fullPage` screenshots showed reveal sections blank | IO never fires without scrolling → screenshot script scrolls the page first; also added the 800ms Reveal fallback + later the opacity fix |
| 2026-09-09 | stale `next start` on the port → Lighthouse tested old builds | `taskkill //F //IM node.exe //T` + fresh ports each run; **build and serve must use the same `NEXT_PUBLIC_SITE_URL`** (it's inlined at build) |

## Deviations from the plan

| Planned | Actual | Why |
|---|---|---|
| `docs/content/{ar,en}/home.md` (per locale) | one bilingual `home-content.md` / `about-content.md` | easier to review translation parity side by side |
| `Stagger` component (Framer Motion), ≤ 8 | CSS `RevealList` (`<Reveal stagger>`), nth-child delays | perf — `motion` removed |
| Motion via Framer Motion (design/04 as signed off) | CSS transitions | perf; design (what/timing/easing) unchanged, logged in `design/00` §9 |
| `programs` stub as `provisional: true` frontmatter | typed `lib/content.ts` array | MDX collections are S4 |
