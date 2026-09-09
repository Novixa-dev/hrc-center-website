# Novixa — Studio Brand & Design References

> Novixa is the studio delivering this project pro‑bono. The HRC site is **not** a Novixa
> site — but the footer credit, the case study, and the overall craft level should be
> consistent with Novixa's positioning.

## Positioning

| Field | Value | Confidence |
|---|---|---|
| Name | Novixa (نوڤيكسا / sometimes نوفكسا) | ✅ |
| Tagline (AR) | "هندسة البرمجيات والمنتجات الرقمية" — *Software engineering & digital products* | ✅ (site `<title>`) |
| Stage | Yemeni software startup | ✅ (client brief) |
| Site | https://novixa-cyan.vercel.app/ar (bilingual, `/ar` + `/en`) | ✅ |
| Domain referenced | `novixa.dev` (in the Aqar project's `package.json` `homepage`) | 🟡 |
| Hosting pattern | Vercel | ✅ |

## Reference project — Novixa Aqar (عقاري)

- **What:** bilingual real‑estate platform for the Yemeni market ("عقاري").
- **URL:** https://aqar-landing-page.vercel.app/ar/
- **Stack (from its `package.json`):** Laravel + Vite 8 + **Tailwind CSS v4** + Alpine.js
  3 + Flowbite/Preline + Leaflet + three.js + `@google/model-viewer`. So Novixa's actual
  toolset today is **Tailwind v4 + Alpine + Vite** (not React) — our Next.js choice is a
  deliberate upgrade for this content site, but Tailwind v4 keeps us close to their DNA.
- **Design language observed:**
  - Bilingual toggle AR/EN; full **RTL‑first** layout, footer and nav included.
  - Generous whitespace, clear type hierarchy, Arabic‑optimized typography.
  - Card‑based content, numbered step indicators ("Search → Compare → Contact"),
    thin section dividers, primary/secondary button variants.
  - Professional, minimal, neutral base palette with an accent reserved for CTAs.
  - Trust framing ("verified listings, no fakes, transparent").
  - Subtle motion; 3D/model‑viewer used sparingly for hero interest.

## What we borrow for HRC

| Borrow | Adapt |
|---|---|
| RTL‑first bilingual structure, AR/EN toggle | Same discipline, `next-intl` instead of Alpine |
| Generous whitespace + strong type hierarchy | Lean more **editorial / institutional** (Swiss modernism) than "product" |
| Numbered process indicators, card grids, thin dividers | Reuse for Services / Training / "How to enroll" |
| Accent-for-CTA-only color strategy | HRC palette (navy + bronze), not Novixa's |
| Restrained, purposeful motion | Framer Motion, `prefers-reduced-motion` guarded |
| Trust/credibility framing | Frame around academic credibility + community, not commerce |

## What we do NOT borrow

- Novixa's own colors, logo, or wordmark (footer credit uses a small Novixa mark/lockup only).
- Product/startup tone — HRC is a scholarly institution.
- Heavy 3D — not appropriate for this audience or Yemen bandwidth realities.

## Footer credit spec (draft)

> Small, single line, end of footer, both locales:
> AR: "تصميم وتطوير: نوڤكسا" → links to `https://novixa-cyan.vercel.app/ar`
> EN: "Designed & developed by Novixa" → links to `https://novixa-cyan.vercel.app/en`
> Optional tiny Novixa mark (SVG) if provided. No banner, no popup, no tracking.

## Assets needed from Novixa

- [ ] Novixa logo / wordmark as SVG (light + dark variants).
- [ ] Preferred credit wording + link targets (confirm `.dev` vs Vercel URL).
- [ ] Whether Novixa wants a `humans.txt` / `<meta name="author">` credit too.
- [ ] Case‑study permission + any brand guidelines to keep the credit on‑brand.
