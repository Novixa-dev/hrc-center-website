import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { Link as IntlLink } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { shouldPrefetch } from '@/lib/nav';

const button = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md font-semibold',
    'min-h-(--control-min-h) px-(--space-5) py-(--space-3)',
    'text-[0.95rem] leading-none transition-[transform,background-color,color] duration-(--duration-fast) ease-(--ease-out)',
    'focus-visible:outline-none focus-visible:shadow-(--focus-ring)',
    'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent hover:bg-accent-hover',
        secondary: 'bg-primary text-on-primary hover:opacity-95',
        ghost:
          'border border-border-interactive bg-transparent text-heading hover:bg-surface-muted',
      },
      size: {
        md: '',
        lg: 'min-h-12 px-(--space-6) text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonVariants = VariantProps<typeof button>;

type ButtonAsButton = ButtonVariants & {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  as?: 'button';
} & ComponentProps<'button'>;

type ButtonAsLink = ButtonVariants & {
  children: ReactNode;
  className?: string;
  as: 'link';
  href: ComponentProps<typeof IntlLink>['href'];
} & Omit<ComponentProps<typeof IntlLink>, 'href' | 'className'>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const classes = cn(
    button({ variant: props.variant, size: props.size }),
    props.className,
  );

  if (props.as === 'link') {
    const { as, variant, size, className, children, href, ...rest } = props;
    return (
      <IntlLink
        href={href}
        prefetch={shouldPrefetch(href) ? undefined : false}
        className={classes}
        {...rest}
      >
        {children}
      </IntlLink>
    );
  }

  const {
    as,
    variant,
    size,
    className,
    children,
    loading = false,
    disabled,
    ...rest
  } = props;

  return (
    <button
      className={classes}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}
