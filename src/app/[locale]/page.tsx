import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { AudiencePaths } from '@/components/sections/audience-paths';
import { CtaBand } from '@/components/sections/cta-band';
import { FeaturedPrograms } from '@/components/sections/featured-programs';
import { Hero } from '@/components/sections/hero';
import { JournalFeature } from '@/components/sections/journal-feature';
import { LatestNews } from '@/components/sections/latest-news';
import { PillarsGrid } from '@/components/sections/pillars-grid';
import { locales, routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'home.meta' });
  return buildMetadata({
    locale: l,
    path: '',
    title: t('title'),
    description: t('description'),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PillarsGrid />
      <FeaturedPrograms />
      <JournalFeature />
      <LatestNews />
      <AudiencePaths />
      <CtaBand />
    </>
  );
}
