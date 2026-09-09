import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/** Full-bleed contact prompt. Reused across pages. */
export async function CtaBand() {
  const t = await getTranslations('cta');

  return (
    <section
      aria-labelledby="cta-heading"
      className="border-y border-border bg-primary text-on-primary"
    >
      <Container className="py-(--space-8) lg:py-(--space-9)">
        <Reveal className="flex flex-col items-start gap-(--space-5) md:flex-row md:items-center md:justify-between">
          <div className="max-w-[46ch]">
            <h2 id="cta-heading" className="text-2xl text-on-primary">
              {t('heading')}
            </h2>
            <p className="mt-(--space-2) text-[color-mix(in_srgb,var(--color-on-primary)_80%,transparent)]">
              {t('body')}
            </p>
          </div>
          <Button as="link" href="/contact" className="flex-none">
            {t('action')}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
