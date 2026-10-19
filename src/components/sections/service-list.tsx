import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
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
                {t.has(`items.${s.id}.highlights`) ? (
                  <div className="mt-(--space-4) rounded-md border-s-2 border-accent bg-surface-muted p-(--space-4)">
                    <p className="text-xs font-semibold tracking-(--tracking-overline) text-accent uppercase">
                      {t('highlightsLabel')}
                    </p>
                    <ul className="mt-(--space-2) list-disc space-y-1 ps-(--space-5) text-sm text-text">
                      {(t.raw(`items.${s.id}.highlights`) as string[]).map(
                        (h) => (
                          <li key={h}>{h}</li>
                        ),
                      )}
                    </ul>
                    {t.has(`items.${s.id}.more`) ? (
                      <Link
                        href={t(`items.${s.id}.more.href`)}
                        withArrow
                        className="mt-(--space-3) inline-block text-sm font-semibold no-underline"
                      >
                        {t(`items.${s.id}.more.label`)}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
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
