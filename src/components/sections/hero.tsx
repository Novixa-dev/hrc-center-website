import { getTranslations } from 'next-intl/server';

import { Motif } from '@/components/brand/motif';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

/** Home hero. Sized to its content (never 100vh). One "moment" per the home override. */
export async function Hero() {
  const t = await getTranslations('home.hero');

  return (
    <section className="relative overflow-hidden border-b border-border">
      <Motif
        aria-hidden="true"
        size={520}
        className="pointer-events-none absolute end-[-8rem] -top-24 text-accent-fill opacity-[0.06] motion-reduce:opacity-[0.04]"
      />
      <Container className="relative py-(--section-gap)">
        <Reveal>
          <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-accent uppercase">
            {t('eyebrow')}
          </p>
          <h1 className="mt-(--space-4) max-w-[18ch] text-display">
            {t('title')}
          </h1>
          <p className="mt-(--space-5) max-w-(--prose-measure) text-lg text-text-muted">
            {t('lede')}
          </p>
          <div className="mt-(--space-6) flex flex-wrap gap-3">
            <Button as="link" href="/training">
              {t('ctaPrimary')}
            </Button>
            <Button as="link" href="/contact" variant="ghost">
              {t('ctaSecondary')}
            </Button>
          </div>
          <p className="mt-(--space-7) flex items-center gap-2 border-t border-border pt-(--space-4) text-sm text-text-muted">
            <Motif size={16} className="flex-none text-accent-fill" />
            {t('affiliation')}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
