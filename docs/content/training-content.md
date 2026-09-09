# Training — content brief & copy

**Goal:** Let a prospective trainee browse the programs, understand each one, and find the
path to enrol. Filterable catalog + a per‑program detail page.
**Primary CTA:** "Register interest" (program detail) / "Contact the Center" (empty state).
**SEO title:** AR `التدريب والبرامج — مركز بحوث حضرموت` · EN `Training & Programs — …`
**JSON‑LD:** `BreadcrumbList` (catalog); `Course` + `BreadcrumbList` (detail).

## Structure

- **Catalog** (`/training`): page header → breadcrumb → **filter bar** (field × status) +
  result count → program cards → "how enrolment works" (3 steps) → CTA band.
  Empty state when the filter matches nothing.
- **Detail** (`/training/[program]`): breadcrumb → status badge + field + `h1` + summary →
  markdown body (About / Who it's for / How to enrol) → **KeyFacts aside** → register CTA
  → related programs → CTA band.

## Content model — `programs` collection

`src/content/programs/{ar,en}/<slug>.md`, Zod frontmatter:
`title · summary · field · award · status(open|upcoming|archived) · provisional · order ·
duration? · schedule? · language? · certificate? · format? · cost?` + markdown body.

## Provisional entries (S4)

Four, from `research/02`, **all `provisional: true` + `status: archived`** — never shown
as "open" (checklist E1/E6):

| slug | AR title | field | award |
|---|---|---|---|
| english-diploma | الدبلوم المتوسط في اللغة الإنجليزية | languages | دبلوم |
| motion-graphics | دبلوم الموشن جرافيك | design | دبلوم |
| ai-productivity | دورة الذكاء الاصطناعي ورفع الإنتاجية | digital-skills | دورة |
| soroban | دورة الحساب الذهني (سوروبان) | digital-skills | دورة |

Bodies are **our summaries** from the department mandate + typical program shape — 🟡
confirm all details (E2–E5, E7).

## Fixed copy (`messages.training.*`)

- **filter labels:** المجال / الحالة ; result count is an ICU plural
  (`{count, plural, ...}` — AR one/two/few/other, EN one/other).
- **status:** التسجيل مفتوح / قريباً / قُدِّم مؤخراً (open / upcoming / archived).
- **empty state:** "لا توجد دفعات مفتوحة حالياً — تُعلَن مواعيد الدفعات… سجّل اهتمامك" —
  **our phrasing**.
- **how enrolment works:** 3 steps (browse → contact about the next intake → complete
  enrolment) — **our phrasing**, since the real process isn't confirmed (E5).
- **detail:** KeyFacts labels; "سجّل اهتمامك" / "اسأل عن هذا البرنامج"; provisional note.

## Flags → checklist

| Flag | Row |
|---|---|
| Which programs are actually open / upcoming | E1 |
| Per‑program duration / schedule / format / language | E2 |
| Prerequisites / audience / certificate | E3 |
| Fees / subsidy | E4 |
| Real registration process | E5 |
| Which archived programs to keep + correct names | E6 |
| English Diploma levels / CEFR / graduation | E7 |
