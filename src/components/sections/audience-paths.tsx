import { getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { Section } from '@/components/sections/section';
import { Link } from '@/components/ui/link';
import { audiencePaths } from '@/lib/content';

export async function AudiencePaths() {
  const t = await getTranslations('home.audiences');

  return (
    <Section tone="muted" labelledBy="audiences-heading">
      <h2 id="audiences-heading" className="text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-(--space-3) text-lg text-text-muted">{t('prompt')}</p>

      <RevealList className="mt-(--space-5) grid gap-(--space-4) sm:grid-cols-3">
        {audiencePaths.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.id}
              href={a.href}
              className="group flex w-full items-center gap-3 rounded-md border border-border-interactive bg-surface p-(--space-4) text-heading no-underline transition-colors hover:border-accent"
            >
              <Icon
                aria-hidden="true"
                className="size-5 flex-none text-accent"
              />
              <span className="font-semibold">{t(a.id)}</span>
            </Link>
          );
        })}
      </RevealList>
    </Section>
  );
}
