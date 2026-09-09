# OG Images & Brand Assets (Sprint 1)

> Specs for the generated and drawn assets the build needs. Real logo/photography from HRC
> is tracked separately in `docs/research/06-assets-inventory.md` + the review checklist.

## 1. Geometric motif

A single mark derived from **Hadrami architectural geometry** — the eight‑point star
(`najmah`) found in carved doors and window screens across the Wadi. One form, one weight,
used sparingly.

**Spec (SVG, `public/brand/motif.svg`):**
- 60×60 viewBox. An 8‑point star outline, `stroke-width: 2`, `stroke-linejoin: round`,
  no fill; a small solid center dot.
- Colours by context: outline `--bronze-fill` (`#A16207` / `#D8A24A` dark), center dot
  same. On navy grounds: outline/dot in `#D8A24A`.
- Provided as a React component `<Motif />` with `size` + `tone` props (currentColor‑driven).

**Where it appears (and nowhere else):**
- Header logo lockup (inside a navy rounded square — see §3).
- Favicon / touch icon basis.
- OG image background element (large, low‑opacity, bleeding off one corner).
- Footer: one instance beside the affiliation line.
- **Not** on every section, not as a bullet, not as a divider.

Draft geometry is in `docs/design/specimen.html` (the masthead `<svg>`). Finalize the path
in S2 when the component is built; keep it hand‑checkable (or generate via a short script,
not long hand‑authored path data).

## 2. Logo lockup (interim, until HRC supplies a mark)

```
[ navy rounded-square 52px ]   مركز بحوث حضرموت        ← Amiri 700, --color-heading
   └ motif in bronze          HADRAMOUT RESEARCH CENTER ← EB Garamond, 0.18em tracking,
                                                          uppercase, --color-text-muted
```
- Horizontal lockup for the header; stacked variant for narrow / OG.
- Clear space = height of the square on all sides.
- Min width: 160px horizontal / 96px stacked.
- Mono (single‑colour) version for footer + favicon.
- When HRC's real logo arrives: swap the square+motif for it, keep the type lockup rules,
  re‑confirm colour + clear space from their guidance. Logged as checklist I1.

## 3. Favicon & touch icons

- Basis: the navy rounded square + bronze motif, centered, generous padding.
- Deliverables (S2/S7): `favicon.ico` (32/16), `icon.svg` (mask‑safe), `apple-touch-icon.png`
  (180, no transparency, navy ground), `icon-192/512.png` for the web manifest.
- `manifest.webmanifest`: `name` "Hadramout Research Center" / localized `short_name`,
  `theme_color` `#1E3A5F`, `background_color` `#0A1420`, `display: browser`.

## 4. OpenGraph image template

Generated per‑page via `next/og` (`ImageResponse`) at build/request. **1200 × 630**,
< 300 KB, PNG.

**Layout (LTR; RTL mirrors — text block to the inline‑end, motif corner swaps):**

```
┌──────────────────────────────────────────────┐  ground: --navy-deep (#14283F)
│  ◆ HRC lockup (mono, top-inline-start)        │  → subtle navy radial top corner
│                                               │
│  KICKER (mono, bronze, tracked)               │  e.g. "TRAINING" / "مركز بحوث حضرموت"
│  Page title                                   │  EB Garamond 600 / Amiri 700,
│  (max ~2 lines, balanced)                     │  --d-heading, ~64–72px
│  ───────────                                   │  short bronze rule
│  one-line context / site name                 │  --d-text-muted, ~28px
│                                        ◆ motif │  large, 8% opacity, bleeds off
│                                        (corner)│  the bottom-inline-end corner
└──────────────────────────────────────────────┘
```

- Fonts: Amiri + EB Garamond + IBM Plex Mono, loaded as `ArrayBuffer` in the OG route
  (subset to the glyphs used where possible).
- `locale` sets text direction and which font renders the title.
- Variants: `default` (site), `article` (adds date), `program` (adds "Diploma/Course"
  chip), `event` (adds dates). One template, prop‑driven.
- `og:image:alt` = the page title + " — Hadramout Research Center", localized.
- Fallback static `public/og-default.png` for any route that can't generate.

## 5. Social profile art (handover / S9, for HRC to apply)

Not part of the website, but produced with the `banner-design` skill for the launch kit:
- Instagram/Facebook profile picture: mono lockup on navy, safe‑area circle‑cropped.
- Facebook cover / Instagram highlight covers: motif + wordmark, bronze on navy.
- Delivered as PNGs + the source, with placement notes. Tracked as checklist K3 / I3.

## 6. Decorative treatments (in place of missing photography)

Per the placeholder policy (`06-assets-inventory.md`):
- **Type‑forward panels:** oversized Amiri word (e.g. «حضرموت», «بحث», «تدريب») at low
  contrast behind a heading.
- **Navy → ink gradient mesh** with a single motif watermark.
- **Hairline geometric field:** a sparse tiling of the star outline at 4–6% opacity.
Never: stock photos of foreign campuses, AI‑generated faces, clip‑art.

## 7. Asset build checklist (S2 / S7)

- [ ] `<Motif />` component + `motif.svg`.
- [ ] `<Logo />` component (horizontal / stacked / mono).
- [ ] Favicon set + `manifest.webmanifest`.
- [ ] `app/[locale]/opengraph-image.tsx` + per‑collection variants + font loading.
- [ ] `public/og-default.png` fallback.
- [ ] Decorative panel components (`TypePanel`, `MotifField`).
- [ ] All verified in AR (RTL) and EN (LTR), light and dark where applicable.
