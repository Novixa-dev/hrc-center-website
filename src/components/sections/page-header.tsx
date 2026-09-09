import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
};

/** Standard top-of-page header for non-home templates. Renders the page `<h1>`. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-(--section-gap)">
        {eyebrow ? (
          <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-(--space-3) max-w-[20ch] text-4xl">{title}</h1>
        {lede ? (
          <p className="mt-(--space-4) max-w-(--prose-measure) text-lg text-text-muted">
            {lede}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
