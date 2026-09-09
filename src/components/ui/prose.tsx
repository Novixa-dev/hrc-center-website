import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

const PROSE = cn(
  'max-w-(--prose-measure) text-text',
  '[&_p]:my-(--space-4) [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
  '[&_h2]:mt-(--space-8) [&_h2]:mb-(--space-3) [&_h2]:text-2xl',
  '[&_h3]:mt-(--space-6) [&_h3]:mb-(--space-2) [&_h3]:text-xl',
  '[&_ul]:my-(--space-4) [&_ul]:list-disc [&_ul]:ps-(--space-5)',
  '[&_ol]:my-(--space-4) [&_ol]:list-decimal [&_ol]:ps-(--space-5)',
  '[&_li]:my-(--space-2)',
  '[&_a]:text-link [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2',
  '[&_blockquote]:my-(--space-5) [&_blockquote]:border-s-2 [&_blockquote]:border-accent-fill [&_blockquote]:ps-(--space-4) [&_blockquote]:text-text-muted',
  '[&_hr]:my-(--space-7) [&_hr]:border-border',
);

type ProseProps =
  | { children: ReactNode; html?: undefined; className?: string }
  | { html: string; children?: undefined; className?: string };

/**
 * Long-form content wrapper. Script-aware measure via --prose-measure. Element
 * styles scoped here (no typography plugin). `html` renders trusted, in-repo,
 * PR-reviewed markdown output.
 */
export function Prose({ children, html, className }: ProseProps) {
  if (html !== undefined) {
    return (
      <div
        className={cn(PROSE, className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <div className={cn(PROSE, className)}>{children}</div>;
}
