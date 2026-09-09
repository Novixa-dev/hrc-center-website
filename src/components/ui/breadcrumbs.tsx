import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

import { Link } from '@/components/ui/link';

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail. The last item is the current page (`aria-current`). */
export function Breadcrumbs({
  items,
  label,
}: {
  items: Crumb[];
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="no-underline hover:text-heading"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="text-heading"
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5 rtl:-scale-x-100" />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
