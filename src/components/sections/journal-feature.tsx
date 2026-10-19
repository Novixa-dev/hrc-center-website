import { BookOpen } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/motion/reveal';
import { Section } from '@/components/sections/section';
import { Link } from '@/components/ui/link';

export async function JournalFeature() {
  const t = await getTranslations('home.journal');

  return (
    <Section labelledBy="journal-heading">
      <Reveal className="grid items-center gap-(--space-7) md:grid-cols-[auto_1fr]">
        <div
          aria-hidden="true"
          className="flex aspect-3/4 w-40 flex-none items-center justify-center rounded-md bg-primary text-accent-fill"
        >
          <BookOpen className="size-12" />
        </div>
        <div className="max-w-(--prose-measure)">
          <p className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-accent uppercase">
            {t('eyebrow')}
          </p>
          <h2 id="journal-heading" className="mt-(--space-2) text-2xl">
            {t('title')}
          </h2>
          <p className="mt-(--space-3) text-text-muted">{t('body')}</p>
          <p className="mt-(--space-2) text-sm font-(--font-mono) text-text-muted">
            <bdi dir="ltr">{t('issn')}</bdi>
          </p>
          <div className="mt-(--space-5) flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/research#journal"
              withArrow
              className="text-sm font-semibold no-underline"
            >
              {t('browse')}
            </Link>
            <Link
              href="/research#journal"
              withArrow
              className="text-sm font-semibold no-underline"
            >
              {t('guidelines')}
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
