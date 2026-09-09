import { getTranslations } from 'next-intl/server';

import { Motif } from '@/components/brand/motif';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

/** "A center of Al-Ahgaff University" — links to the university. */
export async function AffiliationLockup({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const t = await getTranslations('footer');
  return (
    <a
      href={site.parent.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 text-sm text-text-muted no-underline transition-colors hover:text-heading focus-visible:shadow-(--focus-ring) focus-visible:outline-none',
        className,
      )}
    >
      <Motif size={18} className="flex-none text-accent-fill" />
      <span>
        {t('affiliation')}
        <span className="ms-1 text-text-muted">
          · {site.parent.name[locale]}
        </span>
      </span>
    </a>
  );
}
