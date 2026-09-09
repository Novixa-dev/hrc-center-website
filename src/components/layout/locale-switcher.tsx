'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { localeLabel, locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Switches locale while staying on the same route. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params carries the dynamic segments for this route
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('label')}
    >
      {locales.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => switchTo(l)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={
              isActive ? undefined : t('switchTo', { language: localeLabel[l] })
            }
            disabled={isPending}
            className={cn(
              'rounded-sm px-2 py-1 text-sm transition-colors',
              'focus-visible:shadow-(--focus-ring) focus-visible:outline-none',
              isActive
                ? 'font-semibold text-heading'
                : 'text-text-muted hover:text-heading',
            )}
          >
            {localeLabel[l]}
          </button>
        );
      })}
    </div>
  );
}
