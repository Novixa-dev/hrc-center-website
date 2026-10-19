import { getTranslations } from 'next-intl/server';

import { Link } from '@/components/ui/link';

type Milestone = { date: string; text: string; href?: string };

/**
 * Verified milestones as a vertical timeline (an ordered list, oldest first).
 * Each entry is sourced — docs/research/02 §Refresh 2026-10.
 */
export async function Milestones({ id }: { id: string }) {
  const t = await getTranslations('about.milestones');
  const items = t.raw('items') as Milestone[];

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
      <ol className="mt-(--space-6) border-s-2 border-border">
        {items.map((m) => (
          <li key={m.text} className="relative ps-(--space-6) pb-(--space-5)">
            <span
              aria-hidden="true"
              className="absolute -start-[7px] top-1.5 size-3 rounded-full border-2 border-surface bg-accent"
            />
            <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
              {m.date}
            </p>
            <p className="mt-1 max-w-(--prose-measure) text-text">
              {m.href ? (
                <Link href={m.href} className="text-heading">
                  {m.text}
                </Link>
              ) : (
                m.text
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
