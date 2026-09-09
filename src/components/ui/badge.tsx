import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const badge = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold before:size-1.5 before:rounded-full before:bg-current',
  {
    variants: {
      tone: {
        neutral: 'bg-surface-muted text-text-muted',
        open: 'bg-[color-mix(in_srgb,var(--color-success)_16%,transparent)] text-success',
        upcoming:
          'bg-[color-mix(in_srgb,var(--color-accent-fill)_18%,transparent)] text-accent',
        archived: 'bg-surface-muted text-text-muted',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

type BadgeProps = VariantProps<typeof badge> & {
  children: ReactNode;
  className?: string;
};

export function Badge({ tone, children, className }: BadgeProps) {
  return <span className={cn(badge({ tone }), className)}>{children}</span>;
}
