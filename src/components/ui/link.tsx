import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { Link as IntlLink } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { shouldPrefetch } from '@/lib/nav';

type IntlHref = ComponentProps<typeof IntlLink>['href'];

type LinkProps = {
  href: IntlHref | string;
  children: ReactNode;
  className?: string;
  /** Directional arrow that mirrors in RTL. */
  withArrow?: boolean;
  /** External links open in a new tab with a safe rel. */
  external?: boolean;
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>;

/** Locale-aware link. Internal keeps the locale prefix; external is new-tab + safe rel. */
export function Link({
  href,
  children,
  className,
  withArrow = false,
  external = false,
  ...rest
}: LinkProps) {
  // `group` for the arrow hover; nothing else — an unconditional `items-center`
  // here silently centred every card that uses <Link> as a flex-col wrapper.
  const classes = cn('group', className);
  const arrow = withArrow ? (
    <ArrowRight
      aria-hidden="true"
      className="ms-1 inline-block size-4 align-[-0.125em] transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
    />
  ) : null;

  if (external) {
    return (
      <a
        {...rest}
        href={typeof href === 'string' ? href : '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <IntlLink
      {...rest}
      href={href as IntlHref}
      prefetch={shouldPrefetch(href) ? undefined : false}
      className={classes}
    >
      {children}
      {arrow}
    </IntlLink>
  );
}
