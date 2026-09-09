# Information Architecture

## Sitemap

```
/ (redirect → /ar)
/[locale]/                         Home
/[locale]/about                    About HRC
/[locale]/services                 Services & Consultancy
   /[locale]/services/#<slug>      (anchored service detail; single page)
/[locale]/training                 Training & Programs (catalog, filterable)
   /[locale]/training/[program]    Program detail
/[locale]/research                 Research & Publications
   /[locale]/research/journal      Al-Ahgaff Journal for Social Sciences (section/anchor)
   /[locale]/research/publications/[slug]   Publication detail
/[locale]/conferences              Conferences & Events
   /[locale]/conferences/[slug]    Event detail
/[locale]/team                     Team & Governance
/[locale]/news                     News (list, filterable)
   /[locale]/news/[slug]           Article
/[locale]/contact                  Contact & Enquiry
/[locale]/links                    Link hub (for social bios)
/[locale]/privacy                  Privacy & data note
/[locale]/accessibility            Accessibility statement
/[locale]/not-found                404 (localized)

/sitemap.xml   /robots.txt   /news/rss.xml   /[locale]/opengraph-image
```

Decision: **Services** is one page with in‑page sections (7 services is not enough to
justify child routes). **Training**, **Research/publications**, **Conferences**, **News**
have child detail routes backed by content collections.

## Primary navigation

Order (both locales; RTL mirrors automatically):

`About · Services · Training · Research · Conferences · Team · News` + **Contact** (CTA button) + locale switch.

- 7 nav items + 1 CTA. Under the ≤ 7 guideline for a top bar.
- On mobile: hamburger → full‑height sheet, same order, CTA pinned at bottom, locale switch at top.
- Active route highlighted (weight + underline/indicator, not color alone).
- "Training" may carry a small badge when an intake is open (optional, Sprint 4+).

## Secondary navigation

- **Footer**: 4 columns → (1) Contact block + map link, (2) Quick links (all pages),
  (3) Programs/Research highlights, (4) Social + affiliation + Novixa credit. Legal row
  underneath (Privacy · Accessibility · © year).
- **In‑page**: Services and About get a sticky sub‑nav / "on this page" list on desktop.
- **Breadcrumbs**: on all detail pages (`Training / <program>`), 3rd level and deeper.

## Page templates

| Template | Used by | Structure |
|---|---|---|
| `Landing` | Home | Hero → Pillars → Featured programs → Journal/Publication feature → Latest news → Audiences → CTA band → Footer |
| `Overview` | About, Services, Research, Team | Page header (title, kicker, lede) → sectioned content → related CTA |
| `Catalog` | Training, News, Conferences (list), Publications | Page header → filter/sort bar → grid/list of cards → pagination/load‑more → CTA |
| `Detail` | Program, Article, Event, Publication | Breadcrumb → header (title, meta) → hero media → body (MDX) → key facts aside → related → CTA |
| `Form` | Contact | Page header → form (left) + contact details/map (right) → hours → social |
| `Utility` | Privacy, Accessibility, Links, 404 | Page header → prose / list |

## Content collections → routes

| Collection | List route | Detail route | Card fields | Detail extras |
|---|---|---|---|---|
| `programs` | `/training` | `/training/[program]` | title, field, format, status, duration, next intake | who it's for, schedule, language, certificate, cost/subsidy, registration CTA |
| `news` | `/news` | `/news/[slug]` | title, date, excerpt, cover, tags | share, related, RSS |
| `conferences` | `/conferences` | `/conferences/[slug]` | title, date, theme, status | outcomes, proceedings link, gallery |
| `publications` | `/research` (section) | `/research/publications/[slug]` | type, title, date, cover, authors | abstract, download/link, issue no. |
| `team` | `/team` (grouped) | — (modal or expand) | name, role, group, photo, confirmed | full bio |

## Filtering & sorting

- **Training**: filter by field (multi), format (in‑person/online/hybrid), status
  (open/upcoming/archived); sort by next‑intake date. URL‑encoded (`?field=…&status=open`)
  for shareable/deep‑linkable filters. SSR the default, client‑enhance the interaction.
- **News**: filter by tag; sort newest first.
- **Conferences**: split "Upcoming" / "Past".
- Filter chips: wrap before shrinking; `+n` overflow is an operable disclosure; keyboard
  operable; announce result count via a polite live region as a full phrase.

## URL & slug rules

- Locale is the first segment, always. No locale → redirect to `/ar` (or `Accept‑Language`
  negotiated, `/ar` fallback).
- Slugs: kebab‑case, ASCII, stable. Arabic content keeps an ASCII slug; the visible title
  is localized. Same slug across locales (`/ar/training/english-diploma` ↔ `/en/training/english-diploma`).
- Trailing slash: off (Next default). Canonical is the no‑trailing‑slash form.

## hreflang / canonical map

Every localized page emits:
- `<link rel="canonical" href="…/{locale}/{path}">`
- `<link rel="alternate" hreflang="ar" href="…/ar/{path}">`
- `<link rel="alternate" hreflang="en" href="…/en/{path}">`
- `<link rel="alternate" hreflang="x-default" href="…/ar/{path}">`

## Empty / edge states

| Situation | Behavior |
|---|---|
| No open programs | Catalog shows upcoming + archived; banner "No open intakes right now — register interest" → Contact |
| No upcoming conferences | Show archive only; "Next conference to be announced" |
| Team names unconfirmed | Show role cards with "Appointment announced soon"; never invent |
| Publication has no PDF | Link to journal/OJS or show "Print only — contact HRC" |
| News empty (unlikely) | Home hides the news band; `/news` shows friendly empty state |
| A locale missing a translation | Fall back to AR content with a small "not yet available in English" note; never show raw keys |
