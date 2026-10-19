import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Building2, MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';

import { ContactForm } from '@/components/sections/contact-form';
import { PageHeader } from '@/components/sections/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import {
  contactPageSchema,
  breadcrumbSchema,
  jsonLdScript,
} from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ subject?: string }>;
};

const PATH = '/contact';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'contact.meta' });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { subject } = await searchParams;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations('contact');
  const tb = await getTranslations('breadcrumb');
  const tNav = await getTranslations('nav');
  const tFooter = await getTranslations('footer');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            contactPageSchema(l, {
              name: t('meta.title'),
              description: t('meta.description'),
              path: PATH,
            }),
            breadcrumbSchema([{ name: tNav('contact'), path: PATH }], l),
          ]),
        }}
      />

      <article className="py-(--space-8)">
        <Container>
          <Breadcrumbs
            label={tb('label')}
            items={[{ label: tNav('contact') }]}
          />

          <PageHeader
            eyebrow={t('header.eyebrow')}
            title={t('header.title')}
            lede={t('header.lede')}
          />

          <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm defaultSubject={subject} locale={l} />
            </div>

            {/* Information Column */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Location Card */}
              <div className="bg-surface-elevated flex flex-col gap-4 rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-heading">
                    {t('info.locationTitle')}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed font-medium text-text">
                  {t('info.locationAddress')}
                </p>
                <p className="text-xs leading-relaxed text-text-muted">
                  {t('info.locationNote')}
                </p>
              </div>

              {/* Registration & enquiries — published lines, with source */}
              <div className="bg-surface-elevated flex flex-col gap-3 rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-heading">
                    {t('info.registerTitle')}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  {t('info.registerText')}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                  {site.registration.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="text-link underline-offset-2 hover:text-link-hover"
                      >
                        <bdi dir="ltr">{phone.display}</bdi>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${site.registration.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-surface-hover inline-flex w-fit items-center gap-2 rounded-md border border-border-interactive bg-surface px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-primary focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{t('info.whatsapp')}</span>
                  <bdi dir="ltr">{site.registration.whatsappDisplay}</bdi>
                  <span className="sr-only"> {t('info.newTab')}</span>
                </a>
                <p className="text-xs text-text-muted">
                  {t('info.sourceLabel')}{' '}
                  <a
                    href={site.registration.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:text-link"
                  >
                    {t('info.sourceName')}
                    <span className="sr-only"> {t('info.newTab')}</span>
                  </a>
                </p>
              </div>

              {/* Social Channels Card */}
              <div className="bg-surface-elevated flex flex-col gap-4 rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center gap-3 text-primary">
                  <Share2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-heading">
                    {t('info.channelsTitle')}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-text-muted">
                  {t('info.channelsText')}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-surface-hover inline-flex items-center gap-2 rounded-md border border-border-interactive bg-surface px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-primary focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
                  >
                    <span>{tFooter('instagram')}</span>
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-surface-hover inline-flex items-center gap-2 rounded-md border border-border-interactive bg-surface px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-primary focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
                  >
                    <span>{tFooter('facebook')}</span>
                  </a>
                </div>
              </div>

              {/* University Affiliation Box */}
              <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-surface/50 p-6">
                <Building2
                  className="mt-1 h-5 w-5 shrink-0 text-text-muted"
                  aria-hidden="true"
                />
                <div className="text-xs leading-relaxed text-text-muted">
                  <p className="mb-1 font-semibold text-text">
                    {site.parent.name[l]}
                  </p>
                  <p>{tFooter('affiliation')}</p>
                  <Link
                    href={site.parent.url}
                    external
                    className="mt-2 inline-block text-primary hover:underline"
                  >
                    {site.parent.url.replace(/^https?:\/\//, '')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
