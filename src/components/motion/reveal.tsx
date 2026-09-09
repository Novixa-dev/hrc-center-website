'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string | undefined;
  as?: ElementType;
  /** Stagger direct children instead of the element itself. */
  stagger?: boolean;
  /** Anchor id (when `as` renders a landmark). */
  id?: string | undefined;
  'aria-labelledby'?: string | undefined;
};

/**
 * CSS scroll reveal — no animation library.
 *
 * Correctness guarantees (docs/design/04-motion-guidelines.md):
 * - No-JS / reduced-motion / `IntersectionObserver` missing → renders visible, never hidden.
 * - Above/at the fold at mount → shown immediately, no animation (no flash).
 * - Below the fold → animates in when scrolled to, OR after an 800 ms fallback,
 *   whichever comes first — so content can never be parked at opacity:0 waiting on
 *   an observer (thumbnails, "find in page", slow scrollers).
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  stagger = false,
  id,
  'aria-labelledby': ariaLabelledby,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.dataset.reveal = '';
    const show = () => {
      el.dataset.shown = '';
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          show();
          io.disconnect();
          clearTimeout(fallback);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    const fallback = window.setTimeout(() => {
      show();
      io.disconnect();
    }, 800);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      data-reveal-stagger={stagger ? '' : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
