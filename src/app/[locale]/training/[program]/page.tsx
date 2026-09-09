import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/sections/cta-band';
import { ProgramDetail } from '@/components/sections/program-detail';
import { RevealList } from '@/components/motion/reveal-list';
import { ProgramCard } from '@/components/sections/program-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { locales, routing, type Locale } from '@/i18n/routing';
import { getPrograms, programs } from '@/lib/content/programs';
import { breadcrumbSchema, courseSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; program: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    programs.getSlugs(locale).map((program) => ({ locale, program })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, program } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const item = programs.getBySlug(l, program);
  if (!item) return {};
  return buildMetadata({
    locale: l,
    path: `/training/${program}`,
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
  });
}

export default async function ProgramPage({ params }: PageProps) {
  const { locale, program } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const item = programs.getBySlug(l, program);
  if (!item) notFound();

  const t = await getTranslations('training');
  const tb = await getTranslations('breadcrumb');
  const path = `/training/${program}`;
  const related = getPrograms(l)
    .filter((p) => p.slug !== program)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            courseSchema(l, {
              name: item.frontmatter.title,
              description: item.frontmatter.summary,
              path,
              inLanguage: item.frontmatter.language,
              award: item.frontmatter.award,
            }),
            breadcrumbSchema(
              [
                { name: tb('home'), path: '' },
                { name: t('header.eyebrow'), path: '/training' },
                { name: item.frontmatter.title, path },
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
            { label: t('header.eyebrow'), href: '/training' },
            { label: item.frontmatter.title },
          ]}
        />
      </Container>

      <Container className="pb-(--space-9)">
        <ProgramDetail program={item} />
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
              {related.map((p) => (
                <ProgramCard key={p.slug} program={p} />
              ))}
            </RevealList>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
