import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/content';

export async function ServiceList() {
  const t = await getTranslations('services');

  return (
    <div className="flex flex-col gap-(--space-8) lg:gap-(--space-9)">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <Reveal
            key={s.id}
            as="section"
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className="scroll-mt-[calc(var(--header-height)+var(--space-4))]"
          >
            <div className="flex items-start gap-(--space-4)">
              <span
                aria-hidden="true"
                className="mt-1 flex size-10 flex-none items-center justify-center rounded-md bg-surface-muted text-accent"
              >
                <Icon className="size-5" />
              </span>
              <div className="max-w-(--prose-measure)">
                <h2 id={`${s.id}-h`} className="text-2xl">
                  {t(`items.${s.id}.name`)}
                </h2>
                <p className="mt-(--space-3) text-text">
                  {t(`items.${s.id}.body`)}
                </p>
                <p className="mt-(--space-4) text-sm">
                  <span className="font-semibold text-heading">
                    {t('commissionLabel')}:{' '}
                  </span>
                  <span className="text-text-muted">{t('commission')}</span>
                </p>
                <div className="mt-(--space-4)">
                  <Button
                    as="link"
                    href={`/contact?subject=consultation&service=${s.id}`}
                    variant="ghost"
                  >
                    {t('requestCta')}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
