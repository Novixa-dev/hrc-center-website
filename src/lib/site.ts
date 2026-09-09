import type { Locale } from '@/i18n/routing';

/**
 * Single source of truth for site-wide constants. Values that HRC still needs to
 * confirm are marked and tracked in docs/content/content-review-checklist.md.
 */
export const site = {
  /** Canonical origin. Overridden by NEXT_PUBLIC_SITE_URL at build/deploy. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'http://localhost:3000',

  name: {
    ar: 'مركز بحوث حضرموت',
    en: 'Hadramout Research Center',
  } satisfies Record<Locale, string>,

  shortName: {
    ar: 'مركز بحوث حضرموت',
    en: 'Hadramout Research Center',
  } satisfies Record<Locale, string>,

  tagline: {
    // [NEEDS HRC CONFIRMATION: J3] — draft wording from docs/design/01-brand-identity.md
    ar: 'البحث العلمي والاستشارات والتدريب في حضرموت',
    en: 'Research, consultancy and training for Hadramout',
  } satisfies Record<Locale, string>,

  description: {
    ar: 'مركز علمي تابع لجامعة الأحقاف، تأسس عام 2013، يعمل في البحث والدراسات والاستشارات والتحكيم والترجمة والتدريب وخدمة المجتمع في حضرموت.',
    en: 'A scholarly center of Al-Ahgaff University, established in 2013, working in research and studies, consultancy, arbitration, translation and training across Hadramout.',
  } satisfies Record<Locale, string>,

  parent: {
    name: { ar: 'جامعة الأحقاف', en: 'Al-Ahgaff University' },
    url: 'https://ahgaff.edu',
  },

  founded: '2013',

  /** Mukalla, Hadramout. Approximate — confirm exact address (checklist A3). */
  geo: { latitude: 14.5426, longitude: 49.1242 },

  contact: {
    // [NEEDS HRC CONFIRMATION: A4, A5, A6] — not surfaced in the UI until confirmed.
    phone: null as string | null,
    email: null as string | null,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? null,
  },

  social: {
    instagram: 'https://www.instagram.com/hrc.centre',
    facebook: 'https://www.facebook.com/share/1BfVmMeqf2/',
  },

  /** Novixa credit — footer only. */
  studio: {
    name: 'Novixa',
    url: {
      ar: 'https://novixa-cyan.vercel.app/ar',
      en: 'https://novixa-cyan.vercel.app/en',
    },
  },
} as const;

export type Site = typeof site;
