# Services — content brief & copy

**Goal:** Let an organization or researcher see exactly what HRC can do for them, and how to
ask. One page, seven anchored services, a consultation CTA per service + one page‑level.
**Primary CTA:** "Request a consultation".
**SEO title:** AR `الخدمات — مركز بحوث حضرموت` · EN `Services — Hadramout Research Center`
**JSON‑LD:** `BreadcrumbList` (Home / Services).

Source: `docs/research/02` §Services + §Departments. The seven services map to the mandate
verbatim ("مركز علمي متخصص في إجراء البحوث والدراسات والاستشارات والتحكيم والتدريب والترجمة").

## The 7 services

| id | AR name | EN name | AR one‑liner (in `messages`) | Flag |
|---|---|---|---|---|
| research | البحث والدراسات | Research & studies | إجراء البحوث والدراسات العلمية في قضايا حضرموت… بتكليفٍ أو بمبادرة | — |
| consultancy | الاستشارات | Consultancy | استشاراتٌ ودراساتٌ ماليةٌ واقتصاديةٌ واجتماعيةٌ وقانونيةٌ وتقنية | — |
| arbitration | التحكيم | Arbitration | التحكيم وتسوية المنازعات والدراسات القانونية | D3 — confirm scope / any unit / credentials |
| translation | الترجمة والتدقيق اللغوي | Translation & language editing | ترجمة الأعمال العلمية والتدقيق اللغوي لها | D4 — confirm languages + process |
| training | التدريب وبناء القدرات | Training & capacity building | دبلوماتٌ ودوراتٌ… عبر قسم التدريب (رابط لصفحة التدريب) | — |
| conferences | تنظيم المؤتمرات والندوات | Conferences & seminars | تنظيم واستضافة المؤتمرات والندوات وورش العمل العلمية | — |
| publishing | النشر العلمي | Scholarly publishing | إصدار الكتب والدوريات المحكّمة، ومن أبرزها مجلة الأحقاف للعلوم الاجتماعية | — |

## "How to commission it"

Same line under every service (AR): *تواصل مع المركز موضّحاً حاجتك، ويتولّى القسم المختص
التنسيق معك.* — **our phrasing** (checklist D2: confirm the real process/contact per
service if it differs).

## Copy

All strings live in `src/messages/{ar,en}.json` under `services.*`. The service descriptions
above are ours, drawn from the department names + the mandate — 🟡 confirm (D1).

## Flags → checklist

| Flag | Row |
|---|---|
| Service descriptions + "how to commission" line are ours | D1, D2 |
| Arbitration scope / international unit / credentials | D3 |
| Translation — languages offered, request process | D4 |
