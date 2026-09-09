import type { ReactNode } from 'react';

/** First focusable element; visually hidden until focused. */
export function SkipLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-(--z-index-toast) focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-heading focus:shadow-(--focus-ring)"
    >
      {children}
    </a>
  );
}
