import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

/**
 * Per-request i18n config. `requestLocale` comes from the `[locale]` segment;
 * fall back to the default locale for unknown values.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    // Gregorian dates; localised formatting is applied per component via useFormatter.
    now: new Date(),
    timeZone: 'Asia/Aden',
  };
});
