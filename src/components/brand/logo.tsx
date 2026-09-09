import { Motif } from '@/components/brand/motif';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

type LogoProps = {
  locale: Locale;
  /** `full` = mark + bilingual wordmark; `mark` = the star only (name in sr-only). */
  variant?: 'full' | 'mark';
  className?: string;
};

/**
 * Interim typographic lockup (docs/design/08 §2). When HRC supplies an official
 * mark, swap the square+motif here and keep the wordmark rules.
 */
export function Logo({ locale, variant = 'full', className }: LogoProps) {
  const primary = site.name[locale];
  const secondary =
    locale === 'ar' ? 'HADRAMOUT RESEARCH CENTER' : site.name.ar;
  const primaryFont =
    locale === 'ar'
      ? 'font-(--font-ar-display) text-xl font-bold'
      : 'font-(--font-latin-display) text-lg font-semibold';

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span
        className="flex size-11 flex-none items-center justify-center rounded-md bg-primary"
        aria-hidden="true"
      >
        <Motif size={26} className="text-accent-fill" />
      </span>
      {variant === 'full' ? (
        <span className="flex flex-col leading-none">
          <span className={cn('text-heading', primaryFont)}>{primary}</span>
          <span
            aria-hidden="true"
            className="mt-1 text-[0.7rem] font-(--font-latin-display) tracking-[0.16em] text-text-muted uppercase"
          >
            {secondary}
          </span>
        </span>
      ) : (
        <span className="sr-only">{primary}</span>
      )}
    </span>
  );
}
