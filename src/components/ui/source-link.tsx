import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/cn';

type SourceLinkProps = {
  source: { name: string; url: string };
  className?: string;
};

/**
 * "Source: <publisher>" — where the facts on a page were published. Opens in a
 * new tab; the new-tab behaviour is announced to screen readers.
 */
export async function SourceLink({ source, className }: SourceLinkProps) {
  const t = await getTranslations('common.source');
  return (
    <p className={cn('text-xs text-text-muted', className)}>
      <span>{t('label')}</span>{' '}
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-link underline-offset-2 hover:text-link-hover"
      >
        {source.name}
        <ExternalLink
          aria-hidden="true"
          className="ms-1 inline-block size-3.5 align-[-0.125em]"
        />
        <span className="sr-only"> {t('newTab')}</span>
      </a>
    </p>
  );
}
