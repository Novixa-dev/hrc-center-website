# Content Editing & Authoring Guide

> Practical guide for editors, researchers, and administrators managing content on the Hadramout Research Center website.

---

## 1. How Content Works

The HRC website uses a **Git-based file content architecture**.
All articles, training programs, research publications, and conferences are stored as clean Markdown (`.md`) files in `src/content/`.

### Core Rules
1. **Bilingual Parity:** Every item exists in two files with the **exact same filename (`<slug>.md`)**:
   - Arabic file: `src/content/<collection>/ar/<slug>.md`
   - English file: `src/content/<collection>/en/<slug>.md`
2. **Institutional Truth:** If a date, name, or detail is not yet confirmed by the Center, keep `provisional: true` in the frontmatter. Never publish speculative facts.

---

## 2. Managing News & Announcements

News entries live in `src/content/news/{ar,en}/`.

### File Location
- Arabic: `src/content/news/ar/<slug>.md`
- English: `src/content/news/en/<slug>.md`

### Frontmatter Schema
```yaml
---
title: عنوان الخبر الرسمي باللغة العربية
summary: ملخص موجز من سطرين يظهر في بطاقات الأخبار ومحركات البحث.
date: 2026-09-01
tags: [journal, training, conference, announcement]
provisional: false
order: 0
---

نص الخبر هنا باستخدام لغة الماركداون العادية...
```

### Adding a New News Post
1. Choose a URL slug in English (e.g. `academic-year-launch`).
2. Create `src/content/news/ar/academic-year-launch.md`.
3. Create `src/content/news/en/academic-year-launch.md`.
4. Fill in the frontmatter and write the body content.
5. Save, run `pnpm test:unit` to verify schema validation, and commit.

---

## 3. Managing Training Programs

Programs live in `src/content/programs/{ar,en}/`.

### Frontmatter Schema
```yaml
---
title: اسم البرنامج التدريبي
summary: نبذة تعريفية بالبرنامج وأهدافه الرئيسية.
field: languages          # options: languages | management | technical | legal
award: دبلوم              # e.g. دبلوم | شهادة تدريبية | ورشة عمل
status: open              # options: open | upcoming | archived
provisional: false
order: 10
language: العربية         # language of instruction
certificate: true         # boolean: true | false
---

## عن البرنامج
تفاصيل البرنامج ومحاوره العلمية...

## لمن هذا البرنامج
الفئات المستهدفة وشروط الالتحاق...

## كيف تسجّل
طريقة التسجيل ومواعيد الدفعات...
```

---

## 4. Managing Research & Journal Publications

Publications live in `src/content/publications/{ar,en}/`.

### Frontmatter Schema
```yaml
---
title: مجلة الأحقاف للعلوم الاجتماعية — العدد الثاني
summary: ملخص محتويات العدد أو ملخص البحث الأكاديمي.
kind: journal-issue       # options: journal-issue | book | study | working-paper
venue: مجلة الأحقاف للعلوم الاجتماعية
issue: العدد الثاني
date: 2026-10-01
provisional: false
order: 0
---

## عن هذا العدد / البحث
المقدمة والموضوعات التي يغطيها...

## المحتويات والأبحاث المنشورة
- عنوان البحث الأول — اسم الباحث
- عنوان البحث الثاني — اسم الباحث

## تحميل العدد أو طلب نسخة
تفاصيل الحصول على النسخة الإلكترونية أو المطبوعة...
```

---

## 5. Managing Conferences & Events

Conferences live in `src/content/conferences/{ar,en}/`.

### Frontmatter Schema
```yaml
---
title: المؤتمر العلمي الثاني لمركز بحوث حضرموت
summary: المحاور العلمية وأهداف المؤتمر السنوي.
status: planned           # options: planned | current | past
date: 2026-11-15          # leave empty or omit if date is not yet fixed
venue: جامعة الأحقاف، المكلا
provisional: false
order: 0
---

## محاور المؤتمر
...
```

---

## 6. Managing Leadership & Team

Governance and team roles are defined in `src/lib/team.ts`.

### Confirming a Person's Appointment
When HRC officially confirms a team member's appointment, update their entry in `src/lib/team.ts`:

```typescript
{
  id: 'executive-director',
  role: {
    ar: 'المدير التنفيذي',
    en: 'Executive Director',
  },
  name: {
    ar: 'أ. د. صادق عمر مكنون',
    en: 'Prof. Sadiq Omar Maknoon',
  },
  affiliation: {
    ar: 'نائب رئيس جامعة الأحقاف',
    en: 'Vice President, Al-Ahgaff University',
  },
  confirmed: true, // change from false to true to display name on site
}
```
Setting `confirmed: true` automatically reveals their name and affiliation on the live Team page. When `false`, the site safely renders a neutral "Appointment announced soon" badge.

---

## 7. Editing UI Translations

General site text (headers, footers, buttons, form labels) is kept in standard JSON message catalogs:
- Arabic: `src/messages/ar.json`
- English: `src/messages/en.json`

Always edit both files simultaneously to maintain bilingual symmetry.

---

## 8. Verification Workflow

Before committing content updates, run:
```bash
# 1. Verify schema validation across all collections
pnpm test:unit

# 2. Verify static pages compile without error
pnpm build
```
Once both commands pass with 0 errors, commit and push your changes.
