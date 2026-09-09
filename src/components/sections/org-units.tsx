import { getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { departments } from '@/lib/content';

/** The six administrative units. AR names verbatim (research/02). */
export async function OrgUnits({ id }: { id: string }) {
  const t = await getTranslations('about');

  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)"
    >
      <h2 id={`${id}-h`} className="text-3xl">
        {t('sections.departments')}
      </h2>
      <p className="mt-(--space-3) text-lg text-text-muted">
        {t('departments.lede')}
      </p>

      <RevealList className="mt-(--space-6) grid gap-(--space-4) sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.id}
              className="flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5)"
            >
              <Icon aria-hidden="true" className="size-5 text-accent" />
              <h3 className="mt-(--space-3) text-lg font-semibold text-heading">
                {t(`departments.${d.id}.name`)}
              </h3>
              <p className="mt-(--space-2) text-sm text-text-muted">
                {t(`departments.${d.id}.blurb`)}
              </p>
            </div>
          );
        })}
      </RevealList>
    </section>
  );
}
