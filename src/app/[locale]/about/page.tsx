import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { Lineage } from '@/components/sections/lineage';
import { OnThisPage } from '@/components/sections/on-this-page';
import { OrgUnits } from '@/components/sections/org-units';
import { PageHeader } from '@/components/sections/page-header';
import { ProseSection } from '@/components/sections/prose-section';
import { VisionMission } from '@/components/sections/vision-mission';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import { aboutPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/about';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'about.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('about');
  const tb = await getTranslations('breadcrumb');

  const sections = [
    { id: 'establishment', label: t('sections.establishment') },
    { id: 'vision-mission', label: t('sections.visionMission') },
    { id: 'university', label: t('sections.university') },
    { id: 'departments', label: t('sections.departments') },
    { id: 'governance', label: t('sections.governance') },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            aboutPageSchema(l, {
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

      <Container>
        <div className="grid gap-(--space-8) lg:grid-cols-[200px_1fr]">
          <OnThisPage items={sections} />

          <div>
            <ProseSection
              id="establishment"
              heading={t('sections.establishment')}
            >
              {t('establishment.body')}
            </ProseSection>

            <VisionMission id="vision-mission" />

            <Lineage id="university" locale={l} />

            <OrgUnits id="departments" />

            <ProseSection id="governance" heading={t('sections.governance')}>
              {t('governance.body')}
              <Link
                href="/team"
                withArrow
                className="mt-(--space-4) block text-base font-semibold no-underline"
              >
                {t('governance.cta')}
              </Link>
            </ProseSection>
          </div>
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
