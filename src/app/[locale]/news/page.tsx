import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { NewsCard } from '@/components/sections/news-card';
import { PageHeader } from '@/components/sections/page-header';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/cn';
import { press } from '@/lib/press';
import { getNews, getNewsByTag, getNewsTags } from '@/lib/content/news';
import { locales, routing, type Locale } from '@/i18n/routing';
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
};
const PATH = '/news';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'news.meta' });
  const meta = buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { 'application/rss+xml': `/${l}/news/rss.xml` },
    },
  };
}

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { tag } = await searchParams;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('news');
  const format = await getFormatter();
  const tb = await getTranslations('breadcrumb');

  const allTags = getNewsTags(l);
  const activeTag = tag && allTags.includes(tag) ? tag : undefined;
  const items = activeTag ? getNewsByTag(l, activeTag) : getNews(l);

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3 py-1.5 text-sm no-underline transition-colors',
      active
        ? 'border-accent bg-[color-mix(in_srgb,var(--color-accent-fill)_16%,transparent)] font-semibold text-heading'
        : 'border-border-interactive text-text-muted hover:text-heading',
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            collectionPageSchema(l, {
              name: t('meta.title'),
              description: t('meta.description'),
              path: PATH,
            }),
            breadcrumbSchema(
              [
                { name: tb('home'), path: '' },
                { name: t('header.eyebrow'), path: PATH },
              ],
              l,
            ),
          ]),
        }}
      />

      <PageHeader
        eyebrow={t('header.eyebrow')}
        title={t('header.title')}
        lede={t('header.lede')}
      />

      <Container className="py-(--space-6)">
        <Breadcrumbs
          label={tb('label')}
          items={[
            { label: tb('home'), href: '/' },
            { label: t('header.eyebrow') },
          ]}
        />
      </Container>

      <Container className="pb-(--space-9)">
        {allTags.length > 0 ? (
          <nav
            aria-label={t('filterLabel')}
            className="flex flex-wrap items-center gap-(--space-2)"
          >
            <Link href="/news" className={chip(!activeTag)}>
              {t('allTags')}
            </Link>
            {allTags.map((tg) => (
              <Link
                key={tg}
                href={`/news?tag=${tg}`}
                aria-current={activeTag === tg ? 'page' : undefined}
                className={chip(activeTag === tg)}
              >
                {t(`tags.${tg}`)}
              </Link>
            ))}
          </nav>
        ) : null}

        <p
          aria-live="polite"
          className="mt-(--space-3) text-sm text-text-muted"
        >
          {t('results', { count: items.length })}
        </p>

        {items.length > 0 ? (
          <RevealList className="mt-(--space-6) grid gap-(--space-5) sm:grid-cols-2">
            {items.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </RevealList>
        ) : (
          <div className="mt-(--space-6) rounded-lg border border-border bg-surface p-(--space-7) text-center">
            <h2 className="text-2xl">{t('empty.title')}</h2>
            <p className="mx-auto mt-(--space-3) max-w-(--prose-measure) text-text-muted">
              {t('empty.body')}
            </p>
            <Link
              href="/news"
              withArrow
              className="mt-(--space-4) inline-block font-semibold no-underline"
            >
              {t('allTags')}
            </Link>
          </div>
        )}

        <p className="mt-(--space-7) max-w-(--prose-measure) text-xs text-text-muted">
          {t('historyNote')}
        </p>
      </Container>

      <section
        aria-labelledby="media-h"
        className="border-t border-border py-(--space-8) lg:py-(--space-9)"
      >
        <Container>
          <h2 id="media-h" className="text-3xl">
            {t('media.heading')}
          </h2>
          <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text-muted">
            {t('media.lede')}
          </p>
          <ul className="mt-(--space-6) divide-y divide-border border-y border-border">
            {press.map((item) => (
              <li key={item.url} className="py-(--space-5)">
                <p className="text-xs font-(--font-mono) text-text-muted">
                  <time dateTime={item.date}>
                    {format.dateTime(new Date(item.date), {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {' · '}
                  {item.outlet[l]}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  lang="ar"
                  dir="rtl"
                  className="mt-(--space-2) inline-block font-semibold text-heading underline-offset-4 hover:text-link hover:underline"
                >
                  {item.title}
                  <span className="sr-only"> {t('media.newTab')}</span>
                </a>
                <p className="mt-1 text-sm text-text-muted">{item.gist[l]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
