import type { Locale } from '@/i18n/routing';

/**
 * Independent coverage of the Center ("In the media"). Titles stay in their
 * original language; every item links to the outlet. Verified 2026-10-19 —
 * docs/research/02 §Refresh 2026-10 (media).
 */
export type PressItem = {
  outlet: Record<Locale, string>;
  /** Headline exactly as published (Arabic). */
  title: string;
  /** One-line factual gist, per locale. */
  gist: Record<Locale, string>;
  date: string;
  url: string;
};

export const press: readonly PressItem[] = [
  {
    outlet: { ar: 'تاربة اليوم', en: 'Tarebah Today' },
    title:
      'مركز بحوث حضرموت بجامعة الأحقاف يدشّن المكتب الدولي للتحكيم وتسوية المنازعات بالمكلا',
    gist: {
      ar: 'تغطية تدشين المكتب وتخرّج الدفعة الأولى من دبلوم التحكيم التجاري الدولي (25 مشاركاً، 120 ساعة).',
      en: 'Coverage of the office opening and the first International Commercial Arbitration Diploma cohort (25 participants, 120 hours).',
    },
    date: '2026-10-10',
    url: 'https://www.tarebhtoday.online/2026/10/10/326756/',
  },
  {
    outlet: { ar: 'تاربة اليوم', en: 'Tarebah Today' },
    title:
      'الوكيل الجهوري يدشن المكتب الدولي للتحكيم وتسوية المنازعات ويشهد تخرج الدفعة الأولى من دبلوم التحكيم التجاري',
    gist: {
      ar: 'وكيل محافظة حضرموت لشؤون التنمية رياض الجهوري يدشّن المكتب ويكرّم الجهات الداعمة.',
      en: "Hadramout's Deputy Governor for Development, Riyadh Al-Juhouri, opens the office and honours supporting bodies.",
    },
    date: '2026-10-10',
    url: 'https://www.tarebhtoday.online/2026/10/10/326722/',
  },
  {
    outlet: { ar: 'صدى الساحل', en: 'Sada Al-Sahel' },
    title:
      'محافظ حضرموت يبحث مع قيادة جامعة الأحقاف تعزيز البحث العلمي والتحكيم القانوني الدولي في المحافظة',
    gist: {
      ar: 'محافظ حضرموت يطّلع على ترتيبات افتتاح المكتب الدولي للتحكيم التابع لمركز بحوث حضرموت.',
      en: "Hadramout's governor is briefed on preparations to open the Center's international arbitration office.",
    },
    date: '2026-04-11',
    url: 'https://www.sada-alsahel.net/news/179161',
  },
  {
    outlet: {
      ar: 'رابطة الجامعات الإسلامية',
      en: 'League of Islamic Universities',
    },
    title:
      'الأمين العام لرابطة الجامعات الإسلامية يشارك في افتتاح المؤتمر الدولي الثاني «الحضارمة في شرق أفريقيا»',
    gist: {
      ar: 'مشاركة الأمين العام للرابطة في افتتاح المؤتمر الذي عقده المركز عن بُعد.',
      en: "The League's Secretary General addresses the opening of the Center's online conference.",
    },
    date: '2025-12-27',
    url: 'https://iul1969.org/node/732',
  },
];
