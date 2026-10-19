import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/sections/cta-band';
import { PublicationCard } from '@/components/sections/publication-card';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { Prose } from '@/components/ui/prose';
import { SourceLink } from '@/components/ui/source-link';
import { locales, routing, type Locale } from '@/i18n/routing';
import { getPublications, publications } from '@/lib/content/publications';
import {
  breadcrumbSchema,
  creativeWorkSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publications.getSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const item = publications.getBySlug(l, slug);
  if (!item) return {};
  return buildMetadata({
    locale: l,
    path: `/research/${slug}`,
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
    type: 'article',
  });
}

export default async function PublicationPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const item = publications.getBySlug(l, slug);
  if (!item) notFound();

  const t = await getTranslations('research');
  const tb = await getTranslations('breadcrumb');
  const format = await getFormatter();
  const f = item.frontmatter;
  const path = `/research/${slug}`;

  const facts: { label: string; value: string }[] = [];
  if (f.date) {
    facts.push({
      label: t('detail.published'),
      value: format.dateTime(new Date(f.date), {
        year: 'numeric',
        month: 'long',
      }),
    });
  }
  if (f.venue) facts.push({ label: t('detail.venue'), value: f.venue });
  if (f.authors?.length) {
    facts.push({ label: t('detail.authors'), value: f.authors.join('، ') });
  }

  const related = getPublications(l)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const externalUrl = f.url ?? (f.doi ? `https://doi.org/${f.doi}` : undefined);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            creativeWorkSchema(l, {
              kind: f.kind,
              name: f.title,
              description: f.summary,
              path,
              datePublished: f.date,
              authors: f.authors,
              isPartOf: f.venue,
              sameAs: externalUrl,
            }),
            breadcrumbSchema(
              [
                { name: tb('home'), path: '' },
                { name: t('header.eyebrow'), path: '/research' },
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
            { label: t('header.eyebrow'), href: '/research' },
            { label: f.title },
          ]}
        />
      </Container>

      <Container className="pb-(--space-9)">
        <div className="grid gap-(--space-8) lg:grid-cols-[1fr_300px]">
          <div>
            <span className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
              {t(`detail.kind.${f.kind}`)}
            </span>
            <h1 className="mt-(--space-3) text-4xl">{f.title}</h1>
            <p className="mt-(--space-4) max-w-(--prose-measure) text-lg text-text-muted">
              {f.summary}
            </p>
            {item.html ? (
              <Prose className="mt-(--space-7)" html={item.html} />
            ) : null}

            {f.contents?.length ? (
              <section aria-labelledby="contents-h" className="mt-(--space-8)">
                <h2 id="contents-h" className="text-2xl">
                  {t('detail.contents')}
                </h2>
                <ol className="mt-(--space-4) divide-y divide-border border-y border-border">
                  {f.contents.map((entry, i) => (
                    <li
                      key={entry.title}
                      className="flex gap-(--space-4) py-(--space-4)"
                    >
                      <span
                        aria-hidden="true"
                        className="w-6 shrink-0 font-(--font-mono) text-sm text-text-muted"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-heading">
                          {entry.title}
                        </p>
                        {entry.authors.length ? (
                          <p className="mt-1 text-sm text-text-muted">
                            {entry.authors.join(' · ')}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-height)+var(--space-5))] lg:self-start">
            <div className="rounded-lg border border-border bg-surface p-(--space-5)">
              <dl className="space-y-(--space-3) text-sm">
                {facts.map((fact, i) => (
                  <div key={`${fact.label}-${i}`}>
                    <dt className="text-text-muted">{fact.label}</dt>
                    <dd className="mt-0.5 font-medium text-heading">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {externalUrl ? (
                <Link
                  href={externalUrl}
                  external
                  withArrow
                  className="mt-(--space-5) inline-block text-sm font-semibold no-underline"
                >
                  {externalUrl.toLowerCase().endsWith('.pdf')
                    ? t('detail.download')
                    : t('detail.link')}
                </Link>
              ) : null}
              {f.provisional ? (
                <p className="mt-(--space-4) text-xs text-text-muted">
                  {t('detail.provisionalNote')}
                </p>
              ) : null}
              {f.source ? (
                <SourceLink source={f.source} className="mt-(--space-4)" />
              ) : null}
            </div>
          </aside>
        </div>

        <p className="mt-(--space-8)">
          <Link
            href="/research"
            withArrow
            className="text-sm font-semibold no-underline"
          >
            {t('detail.back')}
          </Link>
        </p>
      </Container>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-h"
          className="bg-surface-muted py-(--space-8) lg:py-(--space-9)"
        >
          <Container>
            <h2 id="related-h" className="text-2xl">
              {t('sections.publications')}
            </h2>
            <RevealList className="mt-(--space-6) grid gap-(--space-4) sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PublicationCard key={p.slug} item={p} />
              ))}
            </RevealList>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
