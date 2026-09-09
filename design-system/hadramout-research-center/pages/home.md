# Page Override — Home

> Deviations from `../MASTER.md` for the Home (`Landing`) template only. Full section
> spec: `docs/design/07-wireframes.md` §1 + `docs/design/06-component-inventory.md`.

## Section order (overrides MASTER's generic pattern)

1. **Hero** — eyebrow · display `h1` (Amiri 700 / EB Garamond 600, ≤ ~14 words) · lede ·
   `▶ Explore programs` + `▷ Contact the Center` · affiliation line · motif bleeding off
   the inline‑end. Hero sized to its content — **not** `100vh`.
2. **PillarsGrid** — 3 pillars (البحث / الاستشارات / التدريب — Research / Consultancy /
   Training), icon + one‑line blurb + link each.
3. **FeaturedPrograms** — 3 cards from the `programs` collection (status‑aware) + "All programs".
4. **JournalFeature** — cover + scope line + `▷ Browse issues` / `▷ Submit research`.
5. **LatestNews** — 3 cards + RSS + "All news".
6. **AudiencePaths** — "I am a…" → Trainee / Researcher / Organization.
7. **CtaBand** — bronze‑tinted, `▷ Contact` + `▷ WhatsApp`.

## Home‑specific rules

- Only the hero image (if any) gets `priority`; everything else lazy.
- Hero headline may use a **word‑by‑word** fade (not char‑by‑char); reduced‑motion → plain.
- Motif background: ≤ 8px parallax drift, off on touch + reduced motion; never on text.
- Exactly **two** animated elements in the hero viewport (headline + CTA row via stagger).
- JSON‑LD: `EducationalOrganization` + `WebSite`.
- The mandate sentence must be readable in the first frame without scrolling.

## Motion dial for Home

Motion 3 (subtle) holds. The hero entrance is the one "moment"; the rest is standard
scroll‑reveal. No pinning, no scroll‑jacking, no SplitText on paragraphs.
