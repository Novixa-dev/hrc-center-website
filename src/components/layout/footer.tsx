import { getTranslations } from 'next-intl/server';

import { FacebookIcon, InstagramIcon } from '@/components/brand/social-icons';
import { AffiliationLockup } from '@/components/layout/affiliation-lockup';
import { NavLink } from '@/components/layout/nav-link';
import { Container } from '@/components/ui/container';
import { Link } from '@/components/ui/link';
import type { Locale } from '@/i18n/routing';
import { primaryNav } from '@/lib/nav';
import { site } from '@/lib/site';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-(--section-gap) border-t border-border bg-surface">
      <Container className="grid gap-(--space-8) py-(--space-9) sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="text-lg font-(--font-latin-display) text-heading">
            {site.name[locale]}
          </p>
          <p className="max-w-[42ch] text-sm text-text-muted">
            {site.description[locale]}
          </p>
          <AffiliationLockup locale={locale} />
        </div>

        <nav aria-label={t('footer.explore')} className="space-y-3">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-text-muted uppercase">
            {t('footer.explore')}
          </h2>
          <ul className="space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  className="text-text no-underline hover:text-link"
                  activeClassName="font-semibold text-heading"
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-text-muted uppercase">
            {t('footer.connect')}
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text no-underline hover:text-link"
              >
                <InstagramIcon className="size-4" />
                {t('footer.instagram')}
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text no-underline hover:text-link"
              >
                <FacebookIcon className="size-4" />
                {t('footer.facebook')}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-sm text-text-muted">
          <p>{site.name.ar}</p>
          <p className="font-(--font-mono)">المكلا · حضرموت</p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-4 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer.rights', { year })}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="no-underline hover:text-heading">
              {t('footer.privacy')}
            </Link>
            <Link
              href="/accessibility"
              className="no-underline hover:text-heading"
            >
              {t('footer.accessibility')}
            </Link>
            <a
              href={site.studio.url[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-(--font-latin-display) no-underline hover:text-heading"
            >
              {t('footer.credit', { studio: site.studio.name })}
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
