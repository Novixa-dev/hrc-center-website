import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';

/** Labeled Vision / Mission / Purpose block. Vision + Mission are verbatim (research/02). */
export async function VisionMission({ id }: { id: string }) {
  const t = await getTranslations('about');

  const blocks = [
    { label: t('visionMission.visionLabel'), body: t('visionMission.vision') },
    {
      label: t('visionMission.missionLabel'),
      body: t('visionMission.mission'),
    },
    {
      label: t('visionMission.purposeLabel'),
      body: t('visionMission.purpose'),
    },
  ];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-[calc(var(--header-height)+var(--space-4))] py-(--space-8) lg:py-(--space-9)"
    >
      <h2 id={`${id}-h`} className="text-3xl">
        {t('sections.visionMission')}
      </h2>
      <Reveal className="mt-(--space-6) flex flex-col gap-(--space-6)">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="border-s-2 border-accent-fill ps-(--space-5)"
          >
            <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
              {b.label}
            </p>
            <p className="mt-(--space-2) max-w-(--prose-measure) text-lg text-text">
              {b.body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
