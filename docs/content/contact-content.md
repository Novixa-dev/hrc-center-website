# Contact — content brief & copy

**Goal:** A direct, accessible enquiry channel for the Center. Works reliably for
researchers, students, organizations, and the press without publishing unverified
direct contact details until HRC confirms them.
**Primary CTA:** Submit enquiry.
**SEO title:** AR `تواصل معنا — مركز بحوث حضرموت` · EN `Contact Us — Hadramout Research Center`
**JSON-LD:** `ContactPage` + `BreadcrumbList`.

## Structure

- **Page header** (`/contact`): eyebrow ("Contact" / "تواصل معنا"), title, lede.
- **Two-column layout (desktop) / stacked (mobile):**
  - **Column 1 — The Contact Form (`<ContactForm>`):**
    - Visible labels for every input.
    - Fields: Full name (`name`), Email (`email`), Subject (`subject`), Message (`message`).
    - Subject options: `general` (عام), `research` (بحث ونشر), `consultancy` (استشارات وتحكيم),
      `training` (تدريب وبرامج), `program` (استفسار عن برنامج), `media` (إعلام وتواصل).
    - Pre-selection via URL query: `?subject=<key>` (anchors from Services, Training, Conferences).
    - Honeypot: visually-hidden input `website` that bots fill; must remain empty.
    - Time-trap: timestamp tracking render-to-submit; rejects submissions under 3 seconds.
    - Errors: grouped in one polite `aria-live="polite"` region as complete sentences; inline `aria-invalid` and `aria-describedby` per field.
    - Progressive enhancement: `<form action={serverAction}>` works with JS disabled; enhances to inline submission without page reload.
  - **Column 2 — Location & Channels:**
    - **Physical address:** Al-Ahgaff University Presidency Building, 3rd Floor, Fuah – Al-Masaken, Mukalla, Hadramout (flagged A3).
    - **Location note:** Static location card with descriptive directions; no third-party tracking map embed.
    - **Institutional channels:** Links to official Facebook and Instagram channels (A8, A9).
    - **Phone / Email / WhatsApp:** Hidden or generic ("via form") until HRC confirms canonical numbers/addresses (A4, A5, A6).
    - **Working hours:** Note indicating regular academic working hours (A7).

## Privacy note

A short, plain-language privacy note below the form:
- "The information submitted via this form (name, email, message) is used solely to respond to your enquiry and is not shared with third parties. We do not use advertising or tracking cookies."
- Flagged for HRC / Novixa confirmation (Checklist L1).

## Copy keys

Mapped under `messages.contact.*` in `src/messages/{ar,en}.json`:
- `meta`: title, description
- `header`: eyebrow, title, lede
- `form`:
  - `nameLabel`, `namePlaceholder`
  - `emailLabel`, `emailPlaceholder`
  - `subjectLabel`, `subjectPlaceholder`
  - `messageLabel`, `messagePlaceholder`
  - `submit`, `submitting`
  - `successTitle`, `successMessage`, `sendAnother`
  - `errorTitle`, `errorMessage`
- `subjects`: `general`, `research`, `consultancy`, `training`, `program`, `media`
- `errors`: `name`, `nameLong`, `email`, `emailLong`, `subject`, `messageShort`, `messageLong`, `generic`
- `info`:
  - `locationTitle`, `locationAddress`
  - `hoursTitle`, `hoursText`
  - `channelsTitle`
  - `privacyNote`

## Flags → checklist

| Flag | Row | Note |
|---|---|---|
| Physical address wording | A3 | Floor, building, and district phrasing confirmed with HRC |
| Direct phone number | A4 | Hidden until confirmed |
| Canonical email address | A5 | Hidden until confirmed; form acts as primary channel |
| WhatsApp contact | A6 | Hidden until confirmed |
| Working hours | A7 | Standard academic hours shown conditionally |
| Privacy statement wording | L1 | Legal / institutional review before launch |
