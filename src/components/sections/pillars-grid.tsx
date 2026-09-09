import { getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { Section } from '@/components/sections/section';
import { Link } from '@/components/ui/link';
import { pillars } from '@/lib/content';

export async function PillarsGrid() {
  const t = await getTranslations('home.pillars');

  return (
    <Section labelledBy="pillars-heading">
      <div className="max-w-(--prose-measure)">
        <h2 id="pillars-heading" className="text-3xl">
          {t('heading')}
        </h2>
        <p className="mt-(--space-3) text-lg text-text-muted">{t('lede')}</p>
      </div>

      <RevealList className="mt-(--space-7) grid gap-(--space-5) md:grid-cols-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.id}
              href={p.href}
              className="group flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5) no-underline shadow-1 transition-shadow duration-(--duration-base) hover:shadow-2"
            >
              <Icon aria-hidden="true" className="size-6 text-accent" />
              <h3 className="mt-(--space-3) text-xl text-heading group-hover:text-link">
                {t(`${p.id}.name`)}
              </h3>
              <p className="mt-(--space-2) text-text-muted">
                {t(`${p.id}.blurb`)}
              </p>
            </Link>
          );
        })}
      </RevealList>
    </Section>
  );
}
