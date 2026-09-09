import type { SVGProps } from 'react';

import { cn } from '@/lib/cn';

type MotifProps = SVGProps<SVGSVGElement> & {
  /** Pixel size (width = height). */
  size?: number;
};

/**
 * The Hadrami eight-point star (نجمة) — the Center's mark.
 * Outline + centre dot, single weight, `currentColor`. Decorative by default.
 * See docs/design/08-og-and-brand-assets.md §1.
 */
export function Motif({ size = 32, className, ...props }: MotifProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('text-accent-fill', className)}
      {...props}
    >
      <path
        d="M24 3.5 29.6 13l10.7 2.1-2.1 10.7L48 30l-9.5 5.6L36.4 46 24 42.5 11.6 46l-1.1-10.4L0 30l9.7-4.2L7.6 15.1 18.3 13 24 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24.5" r="4.4" fill="currentColor" />
    </svg>
  );
}
