import { getTranslations } from 'next-intl/server';

import { AffiliationLockup } from '@/components/layout/affiliation-lockup';
import { Reveal } from '@/components/motion/reveal';
import type { Locale } from '@/i18n/routing';

export async function Lineage({ id, locale }: { id: string; locale: Locale }) {
  const t = await getTranslations('about');

  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)"
    >
      <h2 id={`${id}-h`} className="text-3xl">
        {t('sections.university')}
      </h2>
      <Reveal className="mt-(--space-5)">
        <p className="max-w-(--prose-measure) text-lg text-text">
          {t('university.body')}
        </p>
        <div className="mt-(--space-5)">
          <AffiliationLockup locale={locale} />
        </div>
      </Reveal>
    </section>
  );
}
