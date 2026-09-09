# Component Inventory

> Draft catalog. Each entry gets full state specs + a Storybook‑style reference in
> Sprint 1, then is built in Sprint 2 (`ui/`, `layout/`, `motion/`) and Sprints 3–6
> (`sections/`). "States" = default / hover / focus‑visible / active‑pressed / disabled /
> loading / error / selected‑current, as applicable, in **light + dark** and **RTL + LTR**.

## `components/ui/` — primitives

| Component | Purpose | Key props | Notes / a11y |
|---|---|---|---|
| `Button` | Actions | `variant: primary\|secondary\|ghost\|link`, `size`, `iconStart/End`, `loading`, `as` | Real `<button>`/`<a>`; loading disables + spinner + `aria-busy`; primary = bronze, one per view |
| `Link` | Locale‑aware nav | `href`, `locale?`, `external?` | Wraps `next-intl` Link; external → icon + `rel="noopener"` |
| `Container` | Max‑width + padding | `size?` | Logical padding; `--container-max` |
| `SectionHeader` | Kicker + title + lede | `kicker`, `title`, `lede`, `align` | Renders correct heading level via `as` |
| `Card` | Content container | `interactive?`, `media?` | Hairline + `--shadow-1`; interactive → whole‑card link pattern |
| `Badge` | Status/label | `tone: neutral\|open\|upcoming\|archived` | Text + shape, not color‑only |
| `Field` | Label + control + help + error wrapper | `label`, `hint`, `error`, `required`, `id` | Wires `for`/`aria-describedby`/`aria-invalid` |
| `Input` / `Textarea` / `Select` | Form controls | standard + `invalid` | 44px min height; correct `type`/`inputmode`/`autocomplete` |
| `Checkbox` / `Radio` | Choice | `label` | 24px+ target, visible focus, label clickable |
| `Disclosure` | Expand/collapse | `summary`, `defaultOpen` | `aria-expanded`; animated per motion guide |
| `Accordion` | Grouped disclosures | `items`, `type: single\|multiple` | Radix; keyboard per WAI |
| `Tabs` | Sectioned content | `items` | Radix; `aria-selected`; arrow keys |
| `Breadcrumbs` | Location | `items` | `<nav aria-label>`, last = `aria-current="page"` |
| `Pagination` / `LoadMore` | List paging | `page`, `total` / `onMore` | Announce new items; keep focus sane |
| `Prose` | MDX body wrapper | — | Script‑aware measure, link/quote/table styles |
| `Callout` | MDX note | `type: info\|note\|warning` | Icon + text; role appropriate |
| `Figure` | MDX image + caption | `src`, `alt`, `caption` | `next/image`, sized |
| `KeyFacts` | MDX/detail aside | `items: {label,value}[]` | `<dl>`; tabular values |
| `Stat` | Single number + label | `value`, `label`, `source?` | **Only real, sourced numbers**; tabular figures |
| `VisuallyHidden` | SR‑only text | — | |
| `Spinner` | Loading indicator | `label` | `role="status"` + label |
| `Toast` (opt) | Ephemeral feedback | `tone` | `aria-live=polite`, auto + manual dismiss |

## `components/layout/`

| Component | Purpose | Notes |
|---|---|---|
| `SkipLink` | Skip to `#main` | First tab stop, visible on focus |
| `Header` | Logo + nav + locale + CTA | Sticky, `--z-header`; shrinks on scroll (optional, no CLS); active route marked |
| `MobileNav` | Full‑height menu sheet | Disclosure/dialog; focus trap; `Esc`; CTA pinned; locale at top |
| `LocaleSwitcher` | AR ⇄ EN | Keeps path; `lang` on options; announces target language |
| `Footer` | Contact + links + social + affiliation + Novixa credit + legal row | 4 columns → 1 on mobile; affiliation lockup; motif divider |
| `AffiliationLockup` | "A center of Al‑Ahgaff University" | Link to ahgaff.edu; both scripts |
| `Container` | (shared with ui) | |

## `components/motion/`

| Component | Purpose |
|---|---|
| `Reveal` | Single element scroll‑in (opacity + y), reduced‑motion aware |
| `Stagger` | Parent that staggers up to 8 children |
| `ParallaxLite` | ≤ 8px drift for backgrounds; off on touch + reduced motion |
| `PageTransition` | Fade `main` on route change + focus move |

## `components/sections/`

| Section | Page(s) | Contents |
|---|---|---|
| `Hero` | Home | Kicker, headline, sub, 1–2 CTAs, motif bg |
| `PillarsGrid` | Home | 3 pillars (Research / Consultancy / Training) w/ icon + blurb + link |
| `FeaturedPrograms` | Home | 3 program cards from `programs` collection + "all programs" link |
| `JournalFeature` | Home, Research | Journal cover + scope line + "submit / browse issues" |
| `LatestNews` | Home | 3 news cards + RSS + "all news" |
| `AudiencePaths` | Home | "I'm a… trainee / researcher / organization" → routed |
| `CtaBand` | Home + others | Full‑width bronze‑accented contact prompt |
| `VisionMission` | About | Labeled Vision / Mission / Objectives block (verbatim) |
| `Lineage` | About | University → HRC story + affiliation |
| `OrgUnits` | About | The 6 departments |
| `ServiceList` | Services | 7 services, each: name, desc, "how to commission", CTA; sticky sub‑nav |
| `ProgramCatalog` | Training | Filter bar + card grid + empty states |
| `ProgramDetail` | Training/[program] | Outcome, who‑for, facts aside, schedule, register CTA |
| `ResearchAreas` | Research | Agenda / themes |
| `JournalSection` | Research | Aims & scope, editorial board, author guidelines, issue archive, ethics, submit |
| `PublicationList` | Research | Books/reports cards |
| `EventList` | Conferences | Upcoming / Past split |
| `EventDetail` | Conferences/[slug] | Theme, dates, outcomes, proceedings, gallery |
| `TeamGrid` | Team | Grouped (leadership / board / staff / advisors); `confirmed` handling |
| `PersonCard` | Team | Name, role, bio (expand), photo or initials |
| `ContactForm` | Contact | Smart subject, validation, a11y, server action |
| `ContactDetails` | Contact, Footer | Address + map + phone + email + WhatsApp + hours + social |
| `NewsList` | News | Tag filter + cards |
| `ArticleBody` | News/[slug] | Prose + share + related |
| `LinkHub` | /links | Compact destination list |

## Iconography rules (S1-T06)

- **One family: Lucide** (`lucide-react`). No second icon set. No emoji as icons, ever.
- **Sizes are tokens:** `--icon-sm 16` · `--icon-md 20` (default, inline with body) ·
  `--icon-lg 24` (standalone / touch). Never arbitrary sizes.
- **Stroke:** Lucide default (2px). Do not mix stroke widths in one view.
- **Colour:** `currentColor` — inherits the text colour of its context. Meaningful icons
  and control boundaries need ≥ 3:1 vs adjacent colour; decorative icons carry no info.
- **Alignment:** vertically centered to the text baseline; `gap` (not margin) between icon
  and label; icon before the label in LTR, after in RTL (logical order handles this).
- **Directional icons flip in RTL:** `ArrowRight`/`ArrowLeft`, `ChevronRight`/`ChevronLeft`,
  `MoveRight`, `CornerDownRight`, `Undo/Redo`, breadcrumb separators, "next/prev" carousel
  controls. Use a `<DirectionalIcon>` wrapper or `rtl:-scale-x-100` on the specific glyph.
  **Do not flip:** clocks, search, mail, phone, external‑link, social marks, checkmarks,
  play (media is not reading‑direction), the motif.
- **Decorative vs meaningful:**
  - Beside visible text → `aria-hidden="true"`, no label.
  - Icon‑only control → `aria-label` in the active locale + visible focus + state
    (`aria-expanded`/`aria-pressed`/`aria-current`).
  - Meaningful standalone icon (e.g. a status glyph) → adjacent text or `role="img"` +
    `aria-label`; never rely on the icon alone (`color-not-only`).
- **Curated set** (extend from the full Lucide set as needed, keeping the style):
  nav/ui — `Menu` `X` `ChevronDown` `ArrowRight` `ExternalLink` `Search` `Check` `Minus`
  `Plus` · contact — `Mail` `Phone` `MessageCircle` (WhatsApp) `MapPin` `Clock`
  `Instagram` `Facebook` · content — `GraduationCap` (training) `Scale` (arbitration)
  `BookOpen` (journal/research) `Languages` (translation) `Handshake` (consultancy)
  `Users` (team) `CalendarDays` (events) `Newspaper` (news) `FileText` (publications)
  `Building2` (the university) · feedback — `CircleCheck` `CircleAlert` `Info` `Loader2`.
- Brand marks (Instagram/Facebook) use their **official glyphs** (Lucide's brand icons or
  official SVGs), correct proportions, not recoloured beyond mono.

## State documentation template (S1)

```
### <Component>
- Anatomy: <parts>
- Variants: <...>
- States: default | hover | focus-visible | pressed | disabled | loading | error | current
- Tokens used: <list>
- Motion: <ref to 04-motion-guidelines>
- A11y: role | name | keyboard | SR announcement
- RTL notes: <what mirrors / flips>
- Responsive: <mobile → desktop behavior>
- Content limits: <max chars, wrap/truncate behavior>
```

---

## Built in Sprint 2 — state specs

> Source of truth for behavior is the implementation in `src/components/`; this records
> the decisions. New primitives get an entry here in the commit that builds them.

### `Button` — `src/components/ui/button.tsx`
- **Anatomy:** optional leading spinner · label · optional trailing icon.
- **Variants:** `primary` (bronze `--color-accent` bg + `--color-on-accent`), `secondary`
  (navy `--color-primary`), `ghost` (interactive-border, transparent). Sizes `md` / `lg`.
  `as="link"` renders a locale-aware `<IntlLink>` (prefetch skipped for in-progress routes).
- **States:** hover → `--color-accent-hover` / `opacity-95` / `surface-muted`; `:active` →
  `scale(0.98)`; `:focus-visible` → `--focus-ring`; `disabled`/`aria-disabled` →
  `opacity-50` + `pointer-events-none`; `loading` → `disabled` + `aria-busy` + `Loader2`.
- **Tokens:** `--radius-md`, `--control-min-h` (44px), `--space-5/3`, `--duration-fast`,
  `--ease-out`, accent/primary/on-* colours.
- **Motion:** press-scale only (`04` §3); no layout shift.
- **A11y:** real `<button>` / `<a>`; label is the accessible name; `aria-busy` while loading;
  never remove focus ring. Icon‑only usage is disallowed — pass a visible label.
- **RTL:** trailing icon sits at the inline-end automatically; `gap` not margin.
- **Content limits:** single line (`whitespace-nowrap`); keep labels ≤ ~24 chars.

### `Link` — `src/components/ui/link.tsx`
- Internal (locale-aware) or `external` (new tab + `rel="noopener noreferrer"`).
- `withArrow` renders `ArrowRight` that flips via `rtl:-scale-x-100` and nudges on hover.
- Prefetch disabled for routes in `routesInProgress`.
- A11y: descriptive text expected (no bare "here"); external links are visually/pro­grammatically distinguishable by context + new-tab.

### `Container` — max-width `--container-max` (1200), logical `--container-pad` (16→32 at lg). `size="narrow"` = `max-w-3xl` for prose/forms.

### `Card` — `--color-surface` + hairline `--color-border` + `--shadow-1` + `--radius-lg`.
`interactive` adds `hover:--shadow-2` (transition `--duration-base`). `cursor-pointer` is
**not** set here — only the wrapping link (when the whole card links) carries it.

### `Badge` — pill; `before` dot in `currentColor` (shape, not colour-only). Tones:
`neutral`, `open` (success tint), `upcoming` (accent-fill tint), `archived` (muted).

### `Field` + `Input` / `Textarea`
- `Field` renders `<label htmlFor>`, optional persistent hint (`#id-hint`), inline error
  (`#id-error`, `role="alert"`), required `*` (`aria-hidden`, real state via `aria-required`).
  Passes `aria-describedby` (hint + error) and `aria-invalid` into the control via a render prop.
- `Input`/`Textarea`: `--color-border-interactive` (≥3:1), `--field` radius/pad,
  `min-h` 44px, `aria-[invalid=true]:border-danger`, visible focus. Textarea `resize-y`.
- **A11y:** wired for `focus-management` + `aria-live-errors` (`03`/`05`); the full
  submit-time error-summary lives in `ContactForm` (S6).

### `SectionHeader` — mono kicker (`--color-accent`, `--tracking-overline`, no uppercase
transform needed for AR) · heading (`as` = h1/h2/h3, sized `--text-4xl`/`--text-3xl`) ·
optional lede (`--text-lg` muted). Constrained to `--prose-measure`.

### `Prose` — script-aware `max-width` (`--prose-measure`); element styles for p / h2 / h3 /
ul / ol / li / a / blockquote / hr via arbitrary variants (no typography plugin). Blockquote
uses `border-s` (logical).

### `VisuallyHidden` / `Spinner` — `sr-only`; Spinner is `role="status"` + `Loader2` +
hidden label.

### Layout: `SkipLink` (first tab stop, `sr-only` → visible on focus, jumps to `#main`) ·
`Header` (sticky, `--z-index-header`, translucent `backdrop-blur`, `--header-height`) ·
`MobileNav` (`role="dialog"` `aria-modal`, focus moved to close on open + restored on close,
`Esc` closes, `documentElement` scroll locked, CTA pinned with `env(safe-area-inset-bottom)`) ·
`NavLink` (`aria-current="page"` on match) · `LocaleSwitcher` (`role="group"`, each option
`lang`-tagged, `aria-current` on active, keeps the path via `router.replace({pathname, params})`) ·
`Footer` (4-col → 1, affiliation lockup, Novixa credit in the legal row) ·
`AffiliationLockup` (motif + "a center of Al-Ahgaff University" → `ahgaff.edu`).

### Brand: `Motif` (8-point star, `currentColor`, `aria-hidden`) · `Logo` (navy square +
motif + wordmark; primary line in the locale's display font, secondary line `aria-hidden`
decorative) · `social-icons` (Instagram/Facebook inline SVG, Simple Icons paths, mono).

### Motion: `Reveal` (opacity+y, `useReducedMotion` → `initial={false}`, `whileInView once`) ·
`Stagger` + `Stagger.Item` (parent `staggerChildren 0.06`, cap ~8).

**Not yet built (later sprints):** `Disclosure`, `Accordion`, `Tabs`, `Breadcrumbs`,
`Pagination`/`LoadMore`, `Callout`, `Figure`, `KeyFacts`, `Stat`, `Toast`, all `sections/*`,
`ContactForm`, the filter bar.
