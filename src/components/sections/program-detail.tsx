import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Prose } from '@/components/ui/prose';
import type { CollectionItem } from '@/lib/content/collection';
import type { ProgramFrontmatter } from '@/lib/content/schema';

const TONE = {
  open: 'open',
  upcoming: 'upcoming',
  archived: 'archived',
} as const;

export async function ProgramDetail({
  program,
}: {
  program: CollectionItem<ProgramFrontmatter>;
}) {
  const t = await getTranslations('training');
  const f = program.frontmatter;

  const facts: { label: string; value: string }[] = [];
  if (f.duration)
    facts.push({ label: t('detail.duration'), value: f.duration });
  if (f.format)
    facts.push({ label: t('detail.format'), value: t(`format.${f.format}`) });
  if (f.language)
    facts.push({ label: t('detail.language'), value: f.language });
  if (f.certificate)
    facts.push({ label: t('detail.certificate'), value: t('detail.yes') });
  if (f.award) facts.push({ label: t('detail.award'), value: f.award });
  if (f.cost) facts.push({ label: t('detail.cost'), value: f.cost });

  return (
    <div className="grid gap-(--space-8) lg:grid-cols-[1fr_300px]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={TONE[f.status]}>{t(`status.${f.status}`)}</Badge>
          <span className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
            {t(`fields.${f.field}`)}
          </span>
        </div>
        <h1 className="mt-(--space-3) text-4xl">{f.title}</h1>
        <p className="mt-(--space-4) max-w-(--prose-measure) text-lg text-text-muted">
          {f.summary}
        </p>

        {program.html ? (
          <Prose className="mt-(--space-7)" html={program.html} />
        ) : null}
      </div>

      <aside className="lg:sticky lg:top-[calc(var(--header-height)+var(--space-5))] lg:self-start">
        <div className="rounded-lg border border-border bg-surface p-(--space-5)">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-text-muted uppercase">
            {t('detail.keyFacts')}
          </h2>
          {facts.length > 0 ? (
            <dl className="mt-(--space-3) space-y-(--space-3) text-sm">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-text-muted">{fact.label}</dt>
                  <dd className="mt-0.5 font-medium text-heading">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mt-(--space-5) flex flex-col gap-2">
            <Button as="link" href="/contact" className="w-full">
              {t('detail.register')}
            </Button>
            <Button
              as="link"
              href="/contact"
              variant="ghost"
              className="w-full"
            >
              {t('detail.ask')}
            </Button>
          </div>
          {f.provisional ? (
            <p className="mt-(--space-4) text-xs text-text-muted">
              {t('detail.provisionalNote')}
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
