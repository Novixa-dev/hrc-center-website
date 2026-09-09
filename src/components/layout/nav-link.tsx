'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { shouldPrefetch } from '@/lib/nav';

type NavLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onNavigate?: () => void;
};

/** A nav link that marks itself `aria-current="page"` when active. */
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const target = typeof href === 'string' ? href : '';
  const isActive =
    target === '/'
      ? pathname === '/'
      : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      prefetch={shouldPrefetch(href) ? undefined : false}
      aria-current={isActive ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
