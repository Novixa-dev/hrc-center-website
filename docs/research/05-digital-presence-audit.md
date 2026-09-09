# HRC Digital Presence Audit (2026‑09‑09)

## Current footprint

| Channel | URL | State | Notes |
|---|---|---|---|
| Website | https://ahgaff.edu/centers/1/index/ | ⚠️ Dependent sub‑page | Lives inside the university CMS; no independent identity, URL, or nav. EN mirror at `en.ahgaff.edu/centers/1/` is richer. |
| Website (rebuild) | https://site.ahgaff.opalstacked.com/centers/1/ | 🚧 Staging | University appears to be rebuilding its site (Opalstack hosting). TLS cert mismatch. HRC still a sub‑section. |
| Instagram | https://www.instagram.com/hrc.centre | ✅ Active‑ish | Handle `hrc.centre`. Posts about journal issues, courses, events. Auth‑walled to crawlers. |
| Facebook | https://www.facebook.com/share/1BfVmMeqf2/ | ✅ Exists | Share link only; page name/handle to be captured. |
| Email | `hrc12938@gmail.com` (brief) / `info@ahgaff.edu` / `law.m@ahgaff.edu` (journal) | ⚠️ Fragmented | A consumer Gmail plus shared university addresses. No `@hrc…` domain. |
| Phone | +967 5 360303 / 00967‑361288 | ⚠️ Shared | Appears to be a university switchboard number. |
| YouTube / X / LinkedIn | — | ❌ None found | Opportunity, out of scope for v1. |
| Google Business Profile | ❓ | Unknown | Should be claimed for local SEO (Mukalla). Recommend in handover. |

## Gaps

1. **No independent domain or site** — everything is a child of `ahgaff.edu`.
2. **No canonical identity** — logo usage, name spelling ("Hadramout" vs "Hadhramaut"),
   contact details, and course lists differ across surfaces.
3. **No structured content** — services, programs, publications, events are prose blocks,
   not queryable/filterable content. No RSS, no sitemap for the center.
4. **Weak English** — EN mirror exists but is uneven; some machine‑translation feel.
5. **No conversion paths** — no enrollment form, no research‑submission flow on‑page, no
   consultation request, no map.
6. **No SEO/OG** — center sub‑pages are not optimized; social shares render poorly.
7. **Social is under‑leveraged** — decent cadence, but no link‑in‑bio hub, inconsistent
   branding, content not mirrored anywhere durable.

## Opportunities (what the new site unlocks)

- A **single source of truth** URL to put in every bio, letterhead, and conference program.
- **Structured, filterable** programs / publications / news / events (content collections).
- **Bilingual parity** done properly (AR‑first, real EN localization).
- **Conversion**: enroll in a program, request a consultation, submit research, contact —
  each a first‑class flow.
- **Discoverability**: full metadata + JSON‑LD (`Organization`, `EducationalOrganization`,
  `Course`, `ScholarlyArticle`, `Event`) → eligible for rich results.
- **Shareability**: per‑page OG images (auto‑generated), so every link looks intentional.
- **A link hub** for Instagram/Facebook bios (`/ar`, `/en`, `/ar/training`, etc.).
- **Analytics** (privacy‑friendly) to actually measure interest by program/region.

## Naming / spelling decisions to lock (content sprint)

| Question | Recommendation | Confirm with HRC |
|---|---|---|
| "Hadramout" vs "Hadhramaut" vs "Hadramawt" (EN) | Use **"Hadramout"** (matches the brief, the Instagram handle `hrc.centre`, and common usage) consistently | ✅ needed |
| Center name EN | "Hadramout Research Center" (US spelling of "Center", matches brief) | ✅ |
| Acronym | **HRC** | ✅ |
| Tagline EN | "Research · Consultancy · Training for Hadramout" (draft) | ✅ |

## Recommended (post‑launch, in handover doc, not v1 scope)

- Register a dedicated domain (e.g. `hrc.ahgaff.edu` subdomain, or `hadramout-rc.org`).
- Set up a branded email on that domain.
- Claim Google Business Profile for the Mukalla location.
- Add LinkedIn + YouTube; standardize social handles and profile art.
- Move Instagram/Facebook "link in bio" to the new site's link hub.
