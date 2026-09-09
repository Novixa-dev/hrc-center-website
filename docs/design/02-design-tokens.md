# Design Tokens — FINAL (Sprint 1)

> Signed off S1. Three layers: **primitive → semantic → component**. Transcribed to
> `src/styles/tokens.css` + `tailwind.config.ts` in Sprint 2. Names here **are** the final
> CSS custom-property names. Contrast verified — see
> [`05-accessibility-standards.md`](05-accessibility-standards.md) §Matrix.

**Theme decision (S1-T01):** ship **system‑only** dark mode for v1 (follows
`prefers-color-scheme`). No manual toggle in v1; the token architecture uses a
`:root` / `@media (prefers-color-scheme: dark)` / `:root[data-theme="dark"]` pattern so a
toggle is a small additive change later. Recorded in `planning/04` decisions log.

---

## 1. Primitive tokens

### 1.1 Color ramps

```
/* Navy — brand + institutional */
--navy-50  #EEF2F7   --navy-100 #D9E2EE   --navy-200 #B3C4DC   --navy-300 #849DBF
--navy-400 #4E6B92   --navy-500 #1E3A5F   --navy-600 #1A324F   --navy-700 #14283F
--navy-800 #0F1E30   --navy-900 #0A1420

--ink      #0F172A   /* body text on light */

/* Blue — links / scholarly accent */
--blue-500 #2563EB   --blue-600 #1D4ED8   --blue-700 #1E40AF

/* Bronze — CTA / highlight (FILL + large only; never body text on light) */
--bronze-400 #C7861B  --bronze-500 #A16207  --bronze-600 #854D0E  --bronze-700 #713F12

/* Slate — neutrals */
--slate-50 #F8FAFC  --slate-100 #F1F5F9  --slate-200 #E9EEF5  --slate-300 #CBD5E1
--slate-400 #94A3B8 --slate-500 #64748B  --slate-600 #475569  --slate-700 #334155

/* Status */
--green-700 #15803D  --green-800 #166534
--red-600 #DC2626    --red-700 #B91C1C
--amber-600 #D97706  --amber-700 #B45309

--white #FFFFFF  --black #000000

/* Dark-theme-only primitives */
--d-bg #0A1420  --d-surface #0F1E30  --d-surface-muted #14283F
--d-text #E7ECF3  --d-text-muted #A9B6C6  --d-heading #F2F5F9
--d-link #7CA9FF  --d-primary #3D6099  --d-accent #D8A24A
--d-border-interactive #647CA6  --d-border-divider #24374F
```

### 1.2 Spacing — 8pt base, 4pt half-steps

```
--space-0 0      --space-0-5 2px  --space-1 4px   --space-2 8px   --space-3 12px
--space-4 16px   --space-5 24px   --space-6 32px  --space-7 40px  --space-8 48px
--space-9 64px   --space-10 80px  --space-11 96px --space-12 128px --space-13 160px
```

Vertical rhythm: **inside a section** 16 / 24 / 32 / 48 · **between sections** 64 (mobile)
→ 96 → 128 (desktop, fluid).

### 1.3 Radius

```
--radius-xs 2px  --radius-sm 4px  --radius-md 8px  --radius-lg 12px
--radius-xl 20px --radius-2xl 28px --radius-full 9999px
```
Buttons/inputs `--radius-md`; cards `--radius-lg`; pills/badges `--radius-full`;
media/large panels `--radius-xl`.

### 1.4 Border width

```
--border-hairline 1px  --border-thick 2px  --border-focus 2px
```

### 1.5 Shadow — restrained elevation scale

```
--shadow-0 none
--shadow-1 0 1px 2px rgb(15 23 42 / .06)
--shadow-2 0 4px 12px rgb(15 23 42 / .08)
--shadow-3 0 12px 32px rgb(15 23 42 / .12)
/* dark theme */
--shadow-1-dark 0 1px 2px rgb(0 0 0 / .40)
--shadow-2-dark 0 4px 12px rgb(0 0 0 / .48)
--shadow-3-dark 0 12px 32px rgb(0 0 0 / .55)
```
Cards: `--shadow-1` + hairline border. Hover: `--shadow-2`. Overlays/menus: `--shadow-3`.

### 1.6 Z-index

```
--z-base 0  --z-raised 10  --z-sticky 20  --z-header 30
--z-overlay 40  --z-modal 50  --z-toast 60  --z-max 1000
```

### 1.7 Typography primitives

```
--font-ar-display  "Amiri", "Noto Naskh Arabic", Georgia, serif
--font-ar-body     "IBM Plex Sans Arabic", "Noto Sans Arabic", system-ui, sans-serif
--font-latin-display "EB Garamond", Georgia, "Times New Roman", serif
--font-latin-body  "Inter", system-ui, -apple-system, Segoe UI, Roboto, sans-serif
--font-mono        ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace

/* Fluid scale — clamp(min, preferred, max); preferred tuned for 375→1440 */
--text-xs   0.75rem
--text-sm   0.875rem
--text-base 1rem                                   /* 16px floor */
--text-lg   1.125rem
--text-xl   clamp(1.25rem, 1.14rem + 0.45vw, 1.5rem)
--text-2xl  clamp(1.5rem,  1.33rem + 0.71vw, 2rem)
--text-3xl  clamp(1.875rem, 1.6rem + 1.1vw,  2.5rem)
--text-4xl  clamp(2.25rem, 1.9rem + 1.5vw,   3rem)
--text-display clamp(2.5rem, 1.9rem + 2.6vw, 3.75rem)

--leading-tight 1.15  --leading-snug 1.3  --leading-normal 1.6
--leading-relaxed 1.7 --leading-arabic 1.85

--tracking-tighter -0.02em --tracking-tight -0.01em --tracking-normal 0
--tracking-wide 0.02em --tracking-overline 0.08em

--weight-regular 400 --weight-medium 500 --weight-semibold 600 --weight-bold 700
```
Loaded weights: Amiri 400/700 · IBM Plex Sans Arabic 400/500/600 · EB Garamond 500/600/700
· Inter 400/500/600. All subset (Arabic + Latin), `display: swap`.

### 1.8 Motion primitives

```
--duration-instant 80ms  --duration-fast 160ms  --duration-base 240ms
--duration-slow 360ms    --duration-slower 500ms
--ease-out   cubic-bezier(0.16, 1, 0.3, 1)
--ease-in    cubic-bezier(0.7, 0, 0.84, 0)
--ease-inout cubic-bezier(0.65, 0, 0.35, 1)
/* Framer Motion spring */  --spring-soft { type: "spring", stiffness: 170, damping: 26 }
```

### 1.9 Layout

```
--bp-sm 375  --bp-md 768  --bp-lg 1024  --bp-xl 1440  --bp-2xl 1920   /* px, min-width */
--container-max 1200px
--container-pad 16px        /* mobile */
--container-pad-lg 32px     /* ≥ lg */
--measure-latin 68ch
--measure-arabic 46em       /* Arabic runs wider per glyph; ~55–60 chars */
--header-h 56px             /* mobile */
--header-h-lg 72px          /* ≥ lg */
```

---

## 2. Semantic tokens

| Semantic token | Light | Dark | Notes |
|---|---|---|---|
| `--color-bg` | `--slate-50` | `--d-bg` | page |
| `--color-surface` | `--white` | `--d-surface` | cards, header |
| `--color-surface-muted` | `--slate-200` | `--d-surface-muted` | alt sections |
| `--color-text` | `--ink` | `--d-text` | body — 17.9:1 / 15.6:1 |
| `--color-text-muted` | `--slate-600` | `--d-text-muted` | secondary — 7.6:1 / 9.0:1 |
| `--color-heading` | `--navy-500` | `--d-heading` | headings — 11.5:1 / 16.9:1 |
| `--color-link` | `--bronze-600` | `--d-link` | 6.9:1 / 7.9:1 · underlined |
| `--color-link-hover` | `--bronze-700` | `#A7C4FF` | |
| `--color-primary` | `--navy-500` | `--d-primary` | primary surfaces/buttons |
| `--color-on-primary` | `--white` | `--white` | 11.5:1 / 5.3:1 |
| `--color-accent` | `--bronze-600` | `--d-accent` | **one CTA per view** |
| `--color-on-accent` | `--white` | `--navy-900` | 6.9:1 / 8.1:1 |
| `--color-border` | `--slate-300` | `--d-border-divider` | decorative hairline/divider |
| `--color-border-interactive` | `--slate-500` | `--d-border-interactive` | form fields, focusable UI edges — ≥ 3:1 |
| `--color-focus-ring` | `--blue-600` | `--d-link` | 6.7:1 / 7.9:1 |
| `--color-success` | `--green-700` | `#4ADE80` | + icon + text, never color-only |
| `--color-danger` | `--red-600` | `#F87171` | " |
| `--color-warning` | `--amber-700` | `#FBBF24` | large/icon; body copy stays `--color-text` |
| `--color-on-status` | `--white` | `--navy-900` | text on a filled status chip |

**Bronze rule:** `--bronze-600` is the lightest bronze allowed for **text/links on light**
(6.9:1). `--bronze-500` and lighter are **fill / ≥24px / iconography only**. CTA button =
`--bronze-600` background + white label.

## 3. Component tokens

```
/* Button */
--btn-radius             var(--radius-md)
--btn-pad-y              var(--space-3)
--btn-pad-x              var(--space-5)
--btn-font               var(--weight-semibold)
--btn-primary-bg         var(--color-accent)        /* bronze-600 / d-accent */
--btn-primary-fg         var(--color-on-accent)
--btn-primary-bg-hover   var(--bronze-700)          /* dark: #E6B667 */
--btn-secondary-bg       var(--color-primary)
--btn-secondary-fg       var(--color-on-primary)
--btn-ghost-fg           var(--color-heading)
--btn-ghost-bg-hover     var(--slate-100)           /* dark: var(--d-surface-muted) */
--btn-min-h              44px

/* Card */
--card-bg                var(--color-surface)
--card-border            var(--border-hairline) solid var(--color-border)
--card-radius            var(--radius-lg)
--card-pad               var(--space-5)
--card-shadow            var(--shadow-1)
--card-shadow-hover      var(--shadow-2)

/* Field */
--field-bg               var(--color-surface)
--field-border           var(--border-hairline) solid var(--color-border-interactive)
--field-border-invalid   var(--color-danger)
--field-radius           var(--radius-md)
--field-pad-y            var(--space-3)
--field-pad-x            var(--space-4)
--field-min-h            44px
--field-label-weight     var(--weight-medium)

/* Focus (applied to :focus-visible everywhere) */
--focus-ring             0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-focus-ring)

/* Header */
--header-height          var(--header-h)            /* lg: var(--header-h-lg) */
--header-bg              color-mix(in srgb, var(--color-surface) 92%, transparent)
--header-border          var(--border-hairline) solid var(--color-border)

/* Section */
--section-gap            var(--space-9)             /* lg: var(--space-12) */
--section-header-gap     var(--space-6)

/* Prose */
--prose-measure          var(--measure-latin)       /* [lang=ar]: var(--measure-arabic) */
--prose-lead-color       var(--color-text-muted)
--prose-hr-color         var(--color-border)
```

## 4. Usage rules

1. Components use **semantic** or **component** tokens only — never a primitive directly
   (the token files are the sole place primitives are referenced).
2. No literal color/space/radius/shadow/duration in components. Missing token → add it
   here **and** in `tokens.css`, then use it. Log the addition in the sprint report.
3. Tailwind theme maps utilities → these variables, so the authoring API is
   `bg-surface text-muted rounded-lg shadow-1 duration-base` etc. `tailwind.config.ts` is
   generated from this file's tables in S2.
4. Directional spacing/borders use **logical** utilities (`ps-* pe-* border-s`); tokens
   themselves are direction-agnostic.
5. Status is never conveyed by color alone — always icon + text.
6. `color-mix()` and `clamp()` are allowed in the token layer; components just consume the
   resulting token.

## 5. `tokens.css` skeleton (built in S2)

```css
:root {
  /* primitives … */
  /* semantic (light) … */
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* semantic (dark) … */ }
}
:root[data-theme="dark"] { /* semantic (dark) … */ }   /* future toggle */
:root[data-theme="light"] { /* semantic (light) … */ }
```
