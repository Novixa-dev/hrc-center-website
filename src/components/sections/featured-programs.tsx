import { getLocale, getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { ProgramCard } from '@/components/sections/program-card';
import { Section } from '@/components/sections/section';
import { Link } from '@/components/ui/link';
import type { Locale } from '@/i18n/routing';
import { getFeaturedPrograms } from '@/lib/content/programs';

export async function FeaturedPrograms() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('home.programs');
  const featured = getFeaturedPrograms(locale, 3);

  if (featured.length === 0) return null;

  return (
    <Section tone="muted" labelledBy="programs-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-(--prose-measure)">
          <h2 id="programs-heading" className="text-3xl">
            {t('heading')}
          </h2>
          <p className="mt-(--space-3) text-lg text-text-muted">{t('lede')}</p>
        </div>
        <Link
          href="/training"
          withArrow
          className="text-sm font-semibold no-underline"
        >
          {t('all')}
        </Link>
      </div>

      <RevealList className="mt-(--space-7) grid gap-(--space-5) sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </RevealList>
    </Section>
  );
}
