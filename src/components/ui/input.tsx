import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

const base =
  'w-full rounded-md border border-border-interactive bg-surface px-(--space-4) py-(--space-3) text-base text-text placeholder:text-text-muted/60 focus-visible:outline-none focus-visible:shadow-(--focus-ring) aria-[invalid=true]:border-danger';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(base, 'min-h-(--control-min-h)', className)}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea className={cn(base, 'min-h-32 resize-y', className)} {...props} />
  );
}
