import type { ReactNode } from 'react';

import { Reveal } from '@/components/motion/reveal';

/**
 * Staggers its direct children into view. `className` defines the layout
 * (usually a grid or flex). CSS-based — see `Reveal` + globals.css.
 */
export function RevealList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <Reveal stagger className={className}>
      {children}
    </Reveal>
  );
}
