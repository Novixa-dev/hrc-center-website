import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { CtaBand } from '@/components/sections/cta-band';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { Prose } from '@/components/ui/prose';
import { locales, routing, type Locale } from '@/i18n/routing';
import { conferences, hasEventData } from '@/lib/content/conferences';
import { breadcrumbSchema, eventSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const TONE = {
  upcoming: 'upcoming',
  planned: 'upcoming',
  past: 'archived',
} as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    conferences.getSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const item = conferences.getBySlug(l, slug);
  if (!item) return {};
  return buildMetadata({
    locale: l,
    path: `/conferences/${slug}`,
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
  });
}

export default async function ConferencePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const item = conferences.getBySlug(l, slug);
  if (!item) notFound();

  const t = await getTranslations('conferences');
  const tb = await getTranslations('breadcrumb');
  const format = await getFormatter();
  const f = item.frontmatter;
  const path = `/conferences/${slug}`;

  const facts: { label: string; value: string }[] = [
    {
      label: t('detail.date'),
      value: f.startDate
        ? format.dateTime(new Date(f.startDate), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : t('detail.tba'),
    },
    {
      label: t('detail.location'),
      value: f.location ?? t('detail.tba'),
    },
  ];
  if (f.theme) facts.push({ label: t('detail.theme'), value: f.theme });

  const schemas = [
    breadcrumbSchema(
      [
        { name: tb('home'), path: '' },
        { name: t('header.eyebrow'), path: '/conferences' },
        { name: f.title, path },
      ],
      l,
    ),
  ];
  // Only claim an Event when a real date and place exist.
  if (hasEventData(f)) {
    schemas.unshift(
      eventSchema(l, {
        name: f.title,
        description: f.summary,
        path,
        startDate: f.startDate!,
        endDate: f.endDate,
        location: f.location!,
      }),
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(schemas) }}
      />

      <Container className="py-(--space-6)">
        <Breadcrumbs
          label={tb('label')}
          items={[
            { label: tb('home'), href: '/' },
            { label: t('header.eyebrow'), href: '/conferences' },
            { label: f.title },
          ]}
        />
      </Container>

      <Container className="pb-(--space-9)">
        <div className="grid gap-(--space-8) lg:grid-cols-[1fr_300px]">
          <div>
            <Badge tone={TONE[f.status]}>{t(`status.${f.status}`)}</Badge>
            <h1 className="mt-(--space-3) text-4xl">{f.title}</h1>
            <p className="mt-(--space-4) max-w-(--prose-measure) text-lg text-text-muted">
              {f.summary}
            </p>
            {item.html ? (
              <Prose className="mt-(--space-7)" html={item.html} />
            ) : null}

            <p className="mt-(--space-8)">
              <Link
                href="/conferences"
                withArrow
                className="text-sm font-semibold no-underline"
              >
                {t('detail.back')}
              </Link>
            </p>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-height)+var(--space-5))] lg:self-start">
            <div className="rounded-lg border border-border bg-surface p-(--space-5)">
              <dl className="space-y-(--space-3) text-sm">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-text-muted">{fact.label}</dt>
                    <dd className="mt-0.5 font-medium text-heading">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Button
                as="link"
                href="/contact"
                variant="ghost"
                className="mt-(--space-5) w-full"
              >
                {t('detail.ask')}
              </Button>
              {f.provisional ? (
                <p className="mt-(--space-4) text-xs text-text-muted">
                  {t('detail.provisionalNote')}
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </Container>

      <CtaBand />
    </>
  );
}
