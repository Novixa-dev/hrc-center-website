import { getTranslations } from 'next-intl/server';

import { Logo } from '@/components/brand/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { MobileNav } from '@/components/layout/mobile-nav';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { primaryNav } from '@/lib/nav';

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-(--z-index-header) border-b border-border bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] backdrop-blur">
      <Container className="flex h-(--header-height) items-center justify-between gap-4">
        <Link
          href="/"
          className="flex-none rounded-sm focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
        >
          <Logo locale={locale} />
        </Link>

        <nav
          aria-label={t('common.menu')}
          className="hidden items-center gap-1 lg:flex"
        >
          {primaryNav.map((item) => (
            <NavLink
              key={item.key}
              href={item.href}
              className="rounded-sm px-3 py-2 text-sm text-text-muted no-underline transition-colors hover:text-heading focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
              activeClassName="font-semibold text-heading"
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden lg:flex" />
          <Button as="link" href="/contact" className="hidden lg:inline-flex">
            {t('nav.contact')}
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
