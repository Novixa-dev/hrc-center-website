# Assets Inventory & Provenance

> Every image/logo/font used on the site is tracked here with its source and licensing
> status. **Nothing ships without a clear "OK to use" line.** Store originals in
> `assets-source/`; optimized derivatives live in `src/` / `public/` and are generated,
> not hand‑edited.

## Status legend

- 🟢 **Cleared** — we have rights (owned by HRC/university, provided by client, or open license).
- 🟡 **Pending** — identified, need permission or a higher‑res/vector version.
- 🔴 **Do not use** — rights unclear or third‑party.
- ⚙️ **Generated** — produced by us (OG images, illustrations, icons from Lucide, patterns).

## Logos

| Asset | Source | Format found | Status | Action |
|---|---|---|---|---|
| HRC logo | Referenced on center pages as `/static/frontend/images/logo.png` (this is the **university** logo on the shared CMS; a distinct HRC mark may exist on social avatars) | PNG (raster) | 🟡 | Request official HRC logo as **SVG** or ≥1024px PNG with transparency; capture Instagram/Facebook avatar as interim reference only |
| Al‑Ahgaff University logo | `https://en.ahgaff.edu/static/frontend/images/logo.png` | PNG | 🟡 | Request vector; needed for the "affiliated with" lockup |
| Novixa logo/wordmark | Novixa | — | 🟡 | Request SVG (light+dark) for footer credit |

## Photography (from en.ahgaff.edu center page, 2026‑09‑09 capture)

Base host: `https://en.ahgaff.edu` — these are CMS‑resized derivatives; originals likely
larger. **All 🟡 pending permission** (they are HRC's own event photos → permission should
be straightforward, but must be explicit).

| # | URL (path) | Likely subject | Notes |
|---|---|---|---|
| 1 | `/static/media/uploads/2026/08/7d14e623e1d544c7bd3f7bdfc75ce160.jpg…400x124…` | Banner (wide) | Aspect 400×124 → header/banner crop |
| 2 | `/static/media/uploads/2026/08/cdd8a18c6e6245e0988e9e62f246f7b0.jpg…230x296…` | Portrait | Person / cover |
| 3–7 | `/static/media/uploads/2026/08/{914554c4…,4afa8fb6…,ea8fdc90…,b2bd52eb…,ea0629c5…}.jpg…694x540…` | Event / activity photos | 694×540 gallery set (Aug 2026) |
| 8 | `/static/media/uploads/2026/08/ccd8bc19b30a409cb9cd38a242097094.jpeg…311x242…` | News thumbnail | |
| 9–10 | `/static/media/uploads/2026/05/{c8530d69…,5d452625…}.jpeg…311x242…` | News thumbnails (May 2026) | |
| 11 | `/static/media/uploads/2026/05/e882d188c98d4f1497bfae629c2b16c5.jpg…311x242…` | News thumbnail | |
| 12–15 | `/static/media/uploads/2024/09/{a06557c2…,ae1ec4a9…,5da267a0…,e0395fe0…}.jpeg…311x242…` | News thumbnails (Sep 2024 — journal launch era) | |
| 16 | `/static/media/uploads/2024/07/422d5a1f1e76405f9700ed8b6d8b95b8.jpg` | *Al‑Ahgaff Journal* cover | Journal page cover image |

> ⚠️ Do **not** hotlink these in production. If cleared, download originals to
> `assets-source/images/`, record here, then optimize into the app.

## Fonts

| Font | Use | License | Status |
|---|---|---|---|
| Noto Naskh Arabic | Arabic headings (option) | SIL OFL 1.1 | 🟢 |
| Noto Sans Arabic | Arabic body | SIL OFL 1.1 | 🟢 |
| IBM Plex Sans Arabic | Arabic UI/body (alt) | SIL OFL 1.1 | 🟢 |
| EB Garamond | Latin headings (option) | SIL OFL 1.1 | 🟢 |
| Crimson Pro | Latin headings (alt) | SIL OFL 1.1 | 🟢 |
| Inter / Atkinson Hyperlegible | Latin body / a11y option | SIL OFL 1.1 | 🟢 |

Final pairing decided in [`docs/design/03-typography-system.md`](../design/03-typography-system.md).
Self‑host via `next/font` (no runtime Google Fonts request).

## Icons & illustration

| Asset | Source | License | Status |
|---|---|---|---|
| UI icons | Lucide (`lucide-react`) | ISC | 🟢 ⚙️ |
| Decorative patterns (e.g. Hadrami architectural motif, geometric) | Custom SVG by Novixa | Owned | ⚙️ to create |
| Map | OpenStreetMap tiles / static map, or a styled SVG map | ODbL (attribution) | 🟢 with attribution |
| OG images | Generated via `next/og` at build/request | Owned | ⚙️ |

## Placeholder policy

Until cleared photography arrives, use **tasteful abstract/typographic treatments**
(brand pattern, gradient mesh in brand colors, large Arabic typography) — never stock
photos of foreign campuses, never AI‑generated faces. Any placeholder is tracked in the
content review checklist.

## To request from HRC (bundle)

- [ ] HRC logo — vector (SVG/AI/EPS) or ≥1024px transparent PNG; usage guidance.
- [ ] Al‑Ahgaff University logo — vector.
- [ ] 10–20 high‑res photos: building/office, training sessions, conferences, journal,
      team headshots — with written permission to publish.
- [ ] Any existing brand colors / style guide.
- [ ] Portraits + short bios for leadership & board (for the Team page).
