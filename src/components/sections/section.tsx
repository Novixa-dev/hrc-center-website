import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/cn';

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Alternate background for visual rhythm. */
  tone?: 'default' | 'muted';
  /** `aria-labelledby` target for a landmark region. */
  labelledBy?: string;
};

/** A page section: `<section>` landmark + container + consistent vertical rhythm. */
export function Section({
  children,
  id,
  className,
  tone = 'default',
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)',
        tone === 'muted' && 'bg-surface-muted',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
