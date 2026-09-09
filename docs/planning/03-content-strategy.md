# Content Strategy

## Principles

1. **Arabic is the original.** Write AR first, then localize to EN as real prose. EN is
   not a word‑for‑word mirror; it may reorder, tighten, or re‑explain for a non‑local reader.
2. **Cite or flag.** Every factual sentence traces to `docs/research/`. Unsourced facts →
   `[NEEDS HRC CONFIRMATION: …]` in the draft and a row in the review checklist.
3. **Institutional, not corporate.** Credible, scholarly, community‑minded. No hype, no
   growth‑hacking verbs, no "revolutionary". Warmth through service and specificity.
4. **Show the work.** Prefer concrete nouns (a named diploma, a journal issue, a
   conference theme) over adjectives ("excellent", "leading").
5. **Every page earns its CTA.** One primary action per page, phrased as a benefit.

## Voice & tone

| Attribute | On‑brand | Off‑brand |
|---|---|---|
| Register | Formal Modern Standard Arabic; measured English | Slang, exclamation marks, emoji in body |
| Person | Third person for the institution ("يقدّم المركز…" / "The Center provides…"); second person only in CTAs and forms | First‑person plural everywhere ("we're so excited…") |
| Sentence length | Medium; one idea per sentence | Run‑on academic sentences; Twitter fragments |
| Claims | Specific, verifiable, sourced | Superlatives, unverifiable numbers |
| Cultural frame | Rooted in Hadramout; respectful of the university's charitable, scholarly identity | Generic "innovation" language; Western stock framing |

Detailed voice guidance also in [`docs/design/01-brand-identity.md`](../design/01-brand-identity.md)
and via the `brand` skill.

## Bilingual mechanics

- UI strings: `src/messages/{ar,en}.json`, namespaced by area (`nav`, `footer`, `forms`,
  `home`, …). Keys are English, dot‑namespaced.
- Long‑form content: MDX collections, one file per locale
  (`src/content/news/ar/<slug>.mdx`, `.../en/<slug>.mdx`).
- Dates: localized (`Intl.DateTimeFormat`). AR uses Gregorian by default; add Hijri in
  parentheses where meaningful (confirm HRC preference). 
- Numbers/digits: confirm whether HRC wants Arabic‑Indic (٠١٢٣) or Western digits in AR.
  Default: Western digits for phone/stats, Arabic‑Indic optional — **checklist item**.
- Names of people/places: provide both scripts on first mention where useful.
- Never leave a raw i18n key or an English fallback sitting in the AR UI in production.

## Terminology (glossary — lock in content sprint)

| Concept | AR | EN | Note |
|---|---|---|---|
| The Center | مركز بحوث حضرموت / المركز | Hadramout Research Center / the Center | Not "institute" in EN |
| The University | جامعة الأحقاف | Al‑Ahgaff University | "Al‑Ahgaff" spelling (not Ahqaf) for consistency with brief |
| Region | حضرموت | Hadramout | Not "Hadhramaut" |
| Journal | مجلة الأحقاف للعلوم الاجتماعية | Al‑Ahgaff Journal for Social Sciences | |
| Training unit output | دبلوم / دورة | diploma / course | Keep the distinction |
| Consultancy | استشارات | consultancy / consultations | |
| Arbitration | تحكيم | arbitration | |
| Board of Trustees | مجلس الأمناء | Board of Trustees | |
| Executive Director | المدير التنفيذي | Executive Director | |

## Per‑page content briefs

Each page's brief (goal, sections, word‑count target, required facts, CTA, SEO title +
description, JSON‑LD type) is authored in `docs/content/<locale>/<page>.md` during the
relevant sprint. Template:

```
# <Page> — content brief
Goal:
Primary CTA:
SEO title (≤ 60): | Meta description (≤ 155):
JSON-LD: <type>
Sections:
  1. <name> — <purpose> — ~<words> — facts: [research refs] — flags: [...]
Open questions → review checklist:
```

## SEO content rules

- One `h1` per page = the page's real title. Headings describe content, nest correctly.
- Title format: `<Page> — Hadramout Research Center` (AR: `<الصفحة> — مركز بحوث حضرموت`).
  Home: `Hadramout Research Center — Research, Consultancy & Training in Hadramout`.
- Meta description: a real 140–155‑char sentence, unique per page, with the primary term.
- Internal links use descriptive anchor text (never "here"/"read more" alone — pair with context).
- Alt text: describes the image's role/content in the active locale; decorative → empty alt.
- Structured data: `EducationalOrganization` (site), `Course` (programs),
  `ScholarlyArticle`/`Periodical` (journal), `NewsArticle` (news), `Event` (conferences),
  `BreadcrumbList`, `WebSite` + `SearchAction` (if search added later).

## Content review workflow

1. Draft in `docs/content/` with flags.
2. Self‑review against research + tone.
3. Move to MDX/messages with flags intact as `[NEEDS HRC CONFIRMATION]` (visible only in
   drafts, replaced by neutral copy or an explicit "to be announced" in the app).
4. Compile the flags into `docs/content/content-review-checklist.md`.
5. HRC confirms/edits → we finalize → remove flags → note in sprint report.

## Anti‑AI‑smell checklist (every page)

- [ ] No "In today's fast‑paced world…" / "Whether you're X or Y…" openers.
- [ ] No triads of adjectives ("modern, innovative, and dynamic").
- [ ] No empty transition sentences ("It's worth noting that…").
- [ ] Specific numbers, names, dates — or an honest absence, not vague filler.
- [ ] Varied sentence and paragraph length; at least one concrete example per section.
- [ ] Arabic reads as written by a person, not translated from English.
- [ ] CTAs say what happens ("Request a consultation", not "Learn more") where possible.
