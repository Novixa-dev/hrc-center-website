import type { ReactNode } from 'react';

import { Reveal } from '@/components/motion/reveal';

type ProseSectionProps = {
  id: string;
  heading: string;
  children: ReactNode;
  tone?: 'default' | 'muted';
};

/** A titled section of body prose (About establishment / governance, etc.). */
export function ProseSection({
  id,
  heading,
  children,
  tone = 'default',
}: ProseSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={
        'scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)' +
        (tone === 'muted' ? ' bg-surface-muted' : '')
      }
    >
      <h2 id={`${id}-h`} className="text-3xl">
        {heading}
      </h2>
      <Reveal className="mt-(--space-5) max-w-(--prose-measure) text-lg text-text">
        {children}
      </Reveal>
    </section>
  );
}
