import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { RevealList } from '@/components/motion/reveal-list';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import {
  breadcrumbSchema,
  collectionPageSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { getTeamGroups, isTeamFullyPending } from '@/lib/team';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/team';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'team.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function TeamPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations('team');
  const tb = await getTranslations('breadcrumb');

  const groups = getTeamGroups();
  const pending = isTeamFullyPending();

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
        {pending ? (
          <p className="max-w-(--prose-measure) rounded-md border border-border bg-surface-muted p-(--space-4) text-sm text-text-muted">
            {t('pendingNote')}
          </p>
        ) : null}

        <div className="mt-(--space-8) flex flex-col gap-(--space-9)">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-h`}>
              <h2 id={`${group.id}-h`} className="text-2xl">
                {t(`groups.${group.id}`)}
              </h2>
              <RevealList className="mt-(--space-5) grid gap-(--space-4) sm:grid-cols-2 lg:grid-cols-3">
                {group.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5)"
                  >
                    <p className="text-base font-semibold text-heading">
                      {member.name ?? t(`roles.${member.roleKey}`)}
                    </p>
                    <p className="mt-(--space-2) text-sm text-text-muted">
                      {member.name
                        ? t(`roles.${member.roleKey}`)
                        : t('pending')}
                    </p>
                  </div>
                ))}
              </RevealList>
            </section>
          ))}
        </div>

        <section
          aria-labelledby="affiliation-h"
          className="mt-(--space-9) rounded-lg border border-border bg-surface p-(--space-6)"
        >
          <h2
            id="affiliation-h"
            className="text-sm font-semibold tracking-[0.08em] text-text-muted uppercase"
          >
            {t('affiliation.heading')}
          </h2>
          <p className="mt-(--space-3) max-w-(--prose-measure) text-text">
            {t('affiliation.body')}
          </p>
          <Link
            href="/about#university"
            withArrow
            className="mt-(--space-3) inline-block text-sm font-semibold no-underline"
          >
            {t('affiliation.cta')}
          </Link>
        </section>
      </Container>

      <CtaBand />
    </>
  );
}
