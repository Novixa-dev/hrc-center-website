import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { ProgramCatalog } from '@/components/sections/program-catalog';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { locales, routing, type Locale } from '@/i18n/routing';
import { getProgramFields, getPrograms } from '@/lib/content/programs';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const PATH = '/training';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'training.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export default async function TrainingPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const sp = await searchParams;
  const t = await getTranslations('training');
  const tb = await getTranslations('breadcrumb');

  const all = getPrograms(l);
  const fields = getProgramFields(l);
  const howtoSteps = t.raw('howto.steps') as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbSchema(
              [
                { name: tb('home'), path: '' },
                { name: t('header.eyebrow'), path: PATH },
              ],
              l,
            ),
          ),
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
        <ProgramCatalog
          all={all}
          fields={fields}
          activeFields={toArray(sp.field)}
          activeStatuses={toArray(sp.status)}
        />
      </Container>

      <section
        aria-labelledby="howto-h"
        className="bg-surface-muted py-(--space-8) lg:py-(--space-9)"
      >
        <Container>
          <h2 id="howto-h" className="text-3xl">
            {t('howto.heading')}
          </h2>
          <ol className="mt-(--space-6) grid gap-(--space-5) sm:grid-cols-3">
            {howtoSteps.map((step, i) => (
              <li key={i} className="flex flex-col gap-(--space-2)">
                <span className="text-sm font-(--font-mono) text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-text">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
