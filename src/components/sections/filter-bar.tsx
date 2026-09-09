'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { ProgramStatus } from '@/lib/content/schema';

const STATUSES: ProgramStatus[] = ['open', 'upcoming', 'archived'];

type FilterBarProps = {
  fields: string[];
  /** Result count for the current filter — announced politely on change. */
  count: number;
};

/**
 * Field × status filter. State lives in the URL (`?field=…&status=…`), so the
 * server component does the actual filtering and the result is shareable and
 * works without JS (chips are links). JS upgrades navigation to `router.replace`
 * and announces the count.
 */
export function FilterBar({ fields, count }: FilterBarProps) {
  const t = useTranslations('training');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const liveRef = useRef<HTMLParagraphElement>(null);
  const first = useRef(true);

  const activeFields = params.getAll('field');
  const activeStatuses = params.getAll('status');

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (liveRef.current) {
      liveRef.current.textContent = t('results', { count });
    }
  }, [count, t]);

  function toggle(key: 'field' | 'status', value: string) {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll(key);
    next.delete(key);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    for (const v of updated) next.append(key, v);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-3 py-1.5 text-sm transition-colors',
      'focus-visible:outline-none focus-visible:shadow-(--focus-ring)',
      active
        ? 'border-accent bg-[color-mix(in_srgb,var(--color-accent-fill)_16%,transparent)] font-semibold text-heading'
        : 'border-border-interactive text-text-muted hover:text-heading',
    );

  return (
    <div className="flex flex-col gap-(--space-3)">
      <div className="flex flex-wrap items-center gap-(--space-2)">
        <span className="me-1 text-sm font-semibold text-heading">
          {t('filterField')}
        </span>
        {fields.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={activeFields.includes(f)}
            onClick={() => toggle('field', f)}
            className={chip(activeFields.includes(f))}
          >
            {t(`fields.${f}`)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-(--space-2)">
        <span className="me-1 text-sm font-semibold text-heading">
          {t('filterStatus')}
        </span>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={activeStatuses.includes(s)}
            onClick={() => toggle('status', s)}
            className={chip(activeStatuses.includes(s))}
          >
            {t(`status.${s}`)}
          </button>
        ))}
      </div>

      <p ref={liveRef} aria-live="polite" className="text-sm text-text-muted">
        {t('results', { count })}
      </p>
    </div>
  );
}
