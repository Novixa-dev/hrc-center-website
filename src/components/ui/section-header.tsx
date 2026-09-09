import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  /** Small mono kicker above the title. */
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Heading level for the title. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'start' | 'center';
  className?: string;
};

export function SectionHeader({
  kicker,
  title,
  lede,
  as: Heading = 'h2',
  align = 'start',
  className,
}: SectionHeaderProps) {
  const titleSize = Heading === 'h1' ? 'text-4xl' : 'text-3xl';

  return (
    <div
      className={cn(
        'flex flex-col gap-(--space-3)',
        align === 'center' && 'items-center text-center',
        'max-w-(--prose-measure)',
        className,
      )}
    >
      {kicker ? (
        <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-accent uppercase">
          {kicker}
        </p>
      ) : null}
      <Heading className={titleSize}>{title}</Heading>
      {lede ? <p className="text-lg text-text-muted">{lede}</p> : null}
    </div>
  );
}
