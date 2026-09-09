import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import type { CollectionItem } from '@/lib/content/collection';
import type { ProgramFrontmatter } from '@/lib/content/schema';

const TONE = {
  open: 'open',
  upcoming: 'upcoming',
  archived: 'archived',
} as const;

export async function ProgramCard({
  program,
}: {
  program: CollectionItem<ProgramFrontmatter>;
}) {
  const t = await getTranslations('training');
  const { slug, frontmatter: f } = program;

  return (
    <Link
      href={`/training/${slug}`}
      className="group flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5) no-underline shadow-1 transition-shadow duration-(--duration-base) hover:shadow-2"
    >
      <span className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
        {t(`fields.${f.field}`)}
        {f.award ? ` · ${f.award}` : null}
      </span>
      <span className="mt-(--space-2) flex-1 text-xl font-semibold text-heading group-hover:text-link">
        {f.title}
      </span>
      <span className="mt-(--space-2) text-sm text-text-muted">
        {f.summary}
      </span>
      <span className="mt-(--space-4) flex flex-wrap items-center gap-2">
        <Badge tone={TONE[f.status]}>{t(`status.${f.status}`)}</Badge>
        {f.duration ? (
          <span className="text-xs text-text-muted">{f.duration}</span>
        ) : null}
      </span>
    </Link>
  );
}
