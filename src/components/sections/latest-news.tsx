import { getLocale, getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { NewsCard } from '@/components/sections/news-card';
import { Section } from '@/components/sections/section';
import { Link } from '@/components/ui/link';
import type { Locale } from '@/i18n/routing';
import { getLatestNews } from '@/lib/content/news';

/** Home band: the three most recent (sourced) news items. */
export async function LatestNews() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('home.news');
  const latest = getLatestNews(locale, 3);

  if (latest.length === 0) return null;

  return (
    <Section tone="muted" labelledBy="news-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-(--prose-measure)">
          <h2 id="news-heading" className="text-3xl">
            {t('heading')}
          </h2>
          <p className="mt-(--space-3) text-lg text-text-muted">{t('lede')}</p>
        </div>
        <Link
          href="/news"
          withArrow
          className="text-sm font-semibold no-underline"
        >
          {t('all')}
        </Link>
      </div>

      <RevealList className="mt-(--space-7) grid gap-(--space-5) sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((n) => (
          <NewsCard key={n.slug} item={n} />
        ))}
      </RevealList>
    </Section>
  );
}
