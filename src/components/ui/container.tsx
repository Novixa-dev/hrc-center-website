import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Narrow variant for prose/forms. */
  size?: 'default' | 'narrow';
};

export function Container({
  as: Tag = 'div',
  children,
  className,
  size = 'default',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-(--container-pad)',
        size === 'default' ? 'max-w-(--container-max)' : 'max-w-3xl',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
