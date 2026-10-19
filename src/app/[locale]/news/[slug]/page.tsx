import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/sections/cta-band';
import { NewsCard } from '@/components/sections/news-card';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { Prose } from '@/components/ui/prose';
import { SourceLink } from '@/components/ui/source-link';
import { getNews, news } from '@/lib/content/news';
import { locales, routing, type Locale } from '@/i18n/routing';
import {
  breadcrumbSchema,
  jsonLdScript,
  newsArticleSchema,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    news.getSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const item = news.getBySlug(l, slug);
  if (!item) return {};
  return buildMetadata({
    locale: l,
    path: `/news/${slug}`,
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
    type: 'article',
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const item = news.getBySlug(l, slug);
  if (!item) notFound();

  const t = await getTranslations('news');
  const tb = await getTranslations('breadcrumb');
  const format = await getFormatter();
  const f = item.frontmatter;
  const path = `/news/${slug}`;

  const related = getNews(l)
    .filter((n) => n.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            newsArticleSchema(l, {
              headline: f.title,
              description: f.summary,
              path,
              datePublished: f.date,
              isBasedOn: f.source?.url,
            }),
            breadcrumbSchema(
              [
                { name: tb('home'), path: '' },
                { name: t('header.eyebrow'), path: '/news' },
                { name: f.title, path },
              ],
              l,
            ),
          ]),
        }}
      />

      <Container className="py-(--space-6)">
        <Breadcrumbs
          label={tb('label')}
          items={[
            { label: tb('home'), href: '/' },
            { label: t('header.eyebrow'), href: '/news' },
            { label: f.title },
          ]}
        />
      </Container>

      <Container className="pb-(--space-9)">
        <article className="mx-auto max-w-(--prose-measure)">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
            <time dateTime={f.date} className="font-(--font-mono)">
              {format.dateTime(new Date(f.date), {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {f.tags.map((tag) => (
              <Link
                key={tag}
                href={`/news?tag=${tag}`}
                className="tracking-(--tracking-overline) text-accent uppercase no-underline"
              >
                {t(`tags.${tag}`)}
              </Link>
            ))}
          </div>

          <h1 className="mt-(--space-3) text-4xl">{f.title}</h1>
          <p className="mt-(--space-4) text-lg text-text-muted">{f.summary}</p>

          {item.html ? (
            <Prose className="mt-(--space-6)" html={item.html} />
          ) : null}

          {f.provisional ? (
            <p className="mt-(--space-6) border-s-2 border-border ps-(--space-4) text-xs text-text-muted">
              {t('detail.provisionalNote')}
            </p>
          ) : null}

          {f.source ? (
            <SourceLink source={f.source} className="mt-(--space-6)" />
          ) : null}

          <p className="mt-(--space-8)">
            <Link
              href="/news"
              withArrow
              className="text-sm font-semibold no-underline"
            >
              {t('detail.back')}
            </Link>
          </p>
        </article>
      </Container>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-h"
          className="bg-surface-muted py-(--space-8) lg:py-(--space-9)"
        >
          <Container>
            <h2 id="related-h" className="text-2xl">
              {t('detail.related')}
            </h2>
            <RevealList className="mt-(--space-6) grid gap-(--space-5) sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NewsCard key={n.slug} item={n} />
              ))}
            </RevealList>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
