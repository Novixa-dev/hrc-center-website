import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { OnThisPage } from '@/components/sections/on-this-page';
import { PageHeader } from '@/components/sections/page-header';
import { ServiceList } from '@/components/sections/service-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { locales, routing, type Locale } from '@/i18n/routing';
import { services } from '@/lib/content';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/services';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'services.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('services');
  const tb = await getTranslations('breadcrumb');

  const nav = services.map((s) => ({
    id: s.id,
    label: t(`items.${s.id}.name`),
  }));

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
        <div className="grid gap-(--space-8) lg:grid-cols-[220px_1fr]">
          <OnThisPage items={nav} />
          <ServiceList />
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
