'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';

import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';
import { primaryNav } from '@/lib/nav';

/** Full-height nav sheet for small screens. Focus-trapped, Esc to close. */
export function MobileNav() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t('common.openMenu')}
        className="inline-flex size-11 items-center justify-center rounded-md text-heading focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={t('common.menu')}
          className="fixed inset-0 z-(--z-index-modal) flex flex-col bg-bg"
        >
          <div className="flex items-center justify-between px-(--container-pad) py-3">
            <LocaleSwitcher />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('common.close')}
              className="inline-flex size-11 items-center justify-center rounded-md text-heading focus-visible:shadow-(--focus-ring) focus-visible:outline-none"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={t('common.menu')}
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-(--container-pad) py-4"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                onNavigate={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-lg text-text no-underline hover:bg-surface-muted"
                activeClassName="font-semibold text-heading bg-surface-muted"
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-border p-(--container-pad) pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button
              as="link"
              href="/contact"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
