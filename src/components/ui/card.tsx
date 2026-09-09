import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type CardProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Adds hover elevation. Use only when the whole card is a link. */
  interactive?: boolean;
};

export function Card({
  as: Tag = 'div',
  children,
  className,
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-lg border border-border bg-surface p-(--space-5) shadow-1',
        interactive &&
          'transition-shadow duration-(--duration-base) ease-(--ease-out) hover:shadow-2',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
