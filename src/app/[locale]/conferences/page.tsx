import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ConferenceCard } from '@/components/sections/conference-card';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import { getConferences } from '@/lib/content/conferences';
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/conferences';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'conferences.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function ConferencesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('conferences');
  const tb = await getTranslations('breadcrumb');

  const all = getConferences(l);
  const current = all.filter((c) => c.frontmatter.status !== 'past');
  const past = all.filter((c) => c.frontmatter.status === 'past');

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
        <p className="max-w-(--prose-measure) text-lg text-text-muted">
          {t('intro')}
        </p>

        {all.length === 0 ? (
          <div className="mt-(--space-8) rounded-lg border border-border bg-surface p-(--space-7) text-center">
            <h2 className="text-2xl">{t('empty.title')}</h2>
            <p className="mx-auto mt-(--space-3) max-w-(--prose-measure) text-text-muted">
              {t('empty.body')}
            </p>
            <Button as="link" href="/contact" className="mt-(--space-5)">
              {t('empty.cta')}
            </Button>
          </div>
        ) : (
          <>
            <section aria-labelledby="upcoming-h" className="mt-(--space-8)">
              <h2 id="upcoming-h" className="text-2xl">
                {t('upcomingHeading')}
              </h2>
              <RevealList
                className={`mt-(--space-5) grid gap-(--space-5) ${
                  current.length === 1 ? 'max-w-xl' : 'sm:grid-cols-2'
                }`}
              >
                {current.map((item) => (
                  <ConferenceCard key={item.slug} item={item} />
                ))}
              </RevealList>
            </section>

            <section aria-labelledby="past-h" className="mt-(--space-9)">
              <h2 id="past-h" className="text-2xl">
                {t('pastHeading')}
              </h2>
              {past.length > 0 ? (
                <RevealList className="mt-(--space-5) grid gap-(--space-5) sm:grid-cols-2">
                  {past.map((item) => (
                    <ConferenceCard key={item.slug} item={item} />
                  ))}
                </RevealList>
              ) : (
                <p className="mt-(--space-3) text-text-muted">
                  {t('pastEmpty')}{' '}
                  <Link
                    href="/news"
                    withArrow
                    className="font-semibold no-underline"
                  >
                    {t('newsCta')}
                  </Link>
                </p>
              )}
            </section>
          </>
        )}
      </Container>

      <CtaBand />
    </>
  );
}
