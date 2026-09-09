import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { OnThisPage } from '@/components/sections/on-this-page';
import { PageHeader } from '@/components/sections/page-header';
import { PublicationCard } from '@/components/sections/publication-card';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import { getJournalIssues, getPublications } from '@/lib/content/publications';
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/research';
const BOARD_URL = 'https://ahgaff.edu/magazines/13/editorial-board/';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'research.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function ResearchPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('research');
  const tb = await getTranslations('breadcrumb');

  const areas = t.raw('focus.areas') as { title: string; body: string }[];
  const issues = getJournalIssues(l);
  const otherPublications = getPublications(l).filter(
    (p) => p.frontmatter.kind !== 'journal-issue',
  );

  const nav = [
    { id: 'focus', label: t('sections.focus') },
    { id: 'commission', label: t('sections.commission') },
    { id: 'journal', label: t('sections.journal') },
    { id: 'publications', label: t('sections.publications') },
  ];

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
        <div className="grid gap-(--space-8) lg:grid-cols-[220px_1fr]">
          <OnThisPage items={nav} />

          <div>
            {/* Focus areas */}
            <section
              id="focus"
              aria-labelledby="focus-h"
              className="scroll-mt-[calc(var(--header-height)+var(--space-4))]"
            >
              <h2 id="focus-h" className="text-3xl">
                {t('sections.focus')}
              </h2>
              <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text-muted">
                {t('focus.lede')}
              </p>
              <RevealList className="mt-(--space-6) grid gap-(--space-4) sm:grid-cols-2">
                {areas.map((a) => (
                  <div
                    key={a.title}
                    className="flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5)"
                  >
                    <h3 className="text-lg font-semibold text-heading">
                      {a.title}
                    </h3>
                    <p className="mt-(--space-2) text-sm text-text-muted">
                      {a.body}
                    </p>
                  </div>
                ))}
              </RevealList>
            </section>

            {/* Commissioning */}
            <section
              id="commission"
              aria-labelledby="commission-h"
              className="mt-(--space-9) scroll-mt-[calc(var(--header-height)+var(--space-4))]"
            >
              <h2 id="commission-h" className="text-3xl">
                {t('sections.commission')}
              </h2>
              <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text">
                {t('commission.body')}
              </p>
              <div className="mt-(--space-5) flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button as="link" href="/contact">
                  {t('commission.cta')}
                </Button>
                <Link
                  href="/services#research"
                  withArrow
                  className="text-sm font-semibold no-underline"
                >
                  {t('commission.servicesCta')}
                </Link>
              </div>
            </section>

            {/* Journal */}
            <section
              id="journal"
              aria-labelledby="journal-h"
              className="mt-(--space-9) scroll-mt-[calc(var(--header-height)+var(--space-4))]"
            >
              <h2 id="journal-h" className="text-3xl">
                {t('sections.journal')}
              </h2>
              <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text">
                {t('journal.body')}
              </p>

              <div className="mt-(--space-6) grid gap-(--space-5) md:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-(--space-5)">
                  <h3 className="text-lg font-semibold text-heading">
                    {t('journal.submitHeading')}
                  </h3>
                  <p className="mt-(--space-2) text-sm text-text-muted">
                    {t('journal.submitBody')}
                  </p>
                  <a
                    href={`mailto:${t('journal.submitEmail')}`}
                    className="mt-(--space-2) inline-block text-sm font-(--font-mono) text-link"
                  >
                    {t('journal.submitEmail')}
                  </a>
                  <p className="mt-(--space-3) text-xs text-text-muted">
                    {t('journal.submitNote')}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-surface p-(--space-5)">
                  <h3 className="text-lg font-semibold text-heading">
                    {t('journal.boardHeading')}
                  </h3>
                  <p className="mt-(--space-2) text-sm text-text-muted">
                    {t('journal.boardBody')}
                  </p>
                  <Link
                    href={BOARD_URL}
                    external
                    withArrow
                    className="mt-(--space-3) inline-block text-sm font-semibold no-underline"
                  >
                    {t('journal.boardCta')}
                  </Link>
                </div>
              </div>

              <h3 className="mt-(--space-7) text-lg font-semibold text-heading">
                {t('journal.archiveHeading')}
              </h3>
              {issues.length > 0 ? (
                <RevealList
                  className={`mt-(--space-4) grid gap-(--space-4) ${
                    issues.length === 1 ? 'max-w-xl' : 'sm:grid-cols-2'
                  }`}
                >
                  {issues.map((item) => (
                    <PublicationCard key={item.slug} item={item} />
                  ))}
                </RevealList>
              ) : (
                <p className="mt-(--space-3) text-sm text-text-muted">
                  {t('journal.archiveEmpty')}
                </p>
              )}
            </section>

            {/* Other publications */}
            <section
              id="publications"
              aria-labelledby="publications-h"
              className="mt-(--space-9) scroll-mt-[calc(var(--header-height)+var(--space-4))]"
            >
              <h2 id="publications-h" className="text-3xl">
                {t('sections.publications')}
              </h2>
              <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text-muted">
                {t('publications.lede')}
              </p>
              {otherPublications.length > 0 ? (
                <RevealList
                  className={`mt-(--space-6) grid gap-(--space-4) ${
                    otherPublications.length === 1
                      ? 'max-w-xl'
                      : 'sm:grid-cols-2'
                  }`}
                >
                  {otherPublications.map((item) => (
                    <PublicationCard key={item.slug} item={item} />
                  ))}
                </RevealList>
              ) : (
                <p className="mt-(--space-4) text-sm text-text-muted">
                  {t('publications.empty')}
                </p>
              )}
            </section>
          </div>
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
