import { defineRouting } from 'next-intl/routing';

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

/** Text direction per locale. */
export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};

/** Human name of each locale, written in that locale. */
export const localeLabel: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Always prefix: /ar/... and /en/..., never an unprefixed route.
  localePrefix: 'always',
  // Do not auto-redirect based on a stored cookie; honour the URL and Accept-Language.
  localeDetection: true,
});
