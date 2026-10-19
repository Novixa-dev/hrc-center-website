import { getTranslations } from 'next-intl/server';

import { Link } from '@/components/ui/link';

type Partner = { name: string; kind: string; date: string; href: string };

/**
 * Institutions the Center has a documented agreement or joint program with —
 * only those stated in official news (docs/research/02 §Refresh 2026-10).
 */
export async function Partners({ id }: { id: string }) {
  const t = await getTranslations('about.partners');
  const items = t.raw('items') as Partner[];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)"
    >
      <h2 id={`${id}-h`} className="text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-(--space-3) max-w-(--prose-measure) text-lg text-text-muted">
        {t('lede')}
      </p>
      <ul className="mt-(--space-6) grid gap-(--space-4) sm:grid-cols-2">
        {items.map((p) => (
          <li
            key={p.name}
            className="flex flex-col rounded-lg border border-border bg-surface p-(--space-5)"
          >
            <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
              {p.date}
            </p>
            <p className="mt-(--space-2) font-semibold text-heading">{p.name}</p>
            <p className="mt-1 text-sm text-text-muted">{p.kind}</p>
            <Link
              href={p.href}
              withArrow
              className="mt-auto pt-(--space-3) text-sm font-semibold no-underline"
            >
              {t('more')}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
