import type { MetadataRoute } from 'next';

import { locales } from '@/i18n/routing';
import { conferences } from '@/lib/content/conferences';
import { news } from '@/lib/content/news';
import { programs } from '@/lib/content/programs';
import { publications } from '@/lib/content/publications';
import { routesInProgress } from '@/lib/nav';
import { site } from '@/lib/site';

/** All content routes. Entries still in `routesInProgress` are omitted until they ship. */
const ALL_ROUTES = [
  '',
  '/about',
  '/services',
  '/training',
  '/research',
  '/conferences',
  '/team',
  '/news',
  '/contact',
  '/privacy',
  '/accessibility',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const liveRoutes = ALL_ROUTES.filter((r) => !routesInProgress.has(r));

  const staticEntries = liveRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${route}`]),
        ),
      },
    })),
  );

  const detailEntries = [
    ...programs.getSlugs('en').map((slug) => `/training/${slug}`),
    ...publications.getSlugs('en').map((slug) => `/research/${slug}`),
    ...conferences.getSlugs('en').map((slug) => `/conferences/${slug}`),
    ...news.getSlugs('en').map((slug) => `/news/${slug}`),
  ].flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}${route}`]),
        ),
      },
    })),
  );

  return [...staticEntries, ...detailEntries];
}
