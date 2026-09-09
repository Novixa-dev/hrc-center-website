import { getFormatter, getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/components/ui/link';
import type { CollectionItem } from '@/lib/content/collection';
import type { ConferenceFrontmatter } from '@/lib/content/schema';

const TONE = {
  upcoming: 'upcoming',
  planned: 'upcoming',
  past: 'archived',
} as const;

export async function ConferenceCard({
  item,
}: {
  item: CollectionItem<ConferenceFrontmatter>;
}) {
  const t = await getTranslations('conferences');
  const format = await getFormatter();
  const { slug, frontmatter: f } = item;

  return (
    <Link
      href={`/conferences/${slug}`}
      className="group flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5) no-underline shadow-1 transition-shadow duration-(--duration-base) hover:shadow-2"
    >
      <span className="flex flex-wrap items-center gap-2">
        <Badge tone={TONE[f.status]}>{t(`status.${f.status}`)}</Badge>
        {f.startDate ? (
          <span className="text-xs text-text-muted">
            {format.dateTime(new Date(f.startDate), {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        ) : null}
      </span>
      <span className="mt-(--space-3) flex-1 text-xl font-semibold text-heading group-hover:text-link">
        {f.title}
      </span>
      <span className="mt-(--space-2) text-sm text-text-muted">
        {f.summary}
      </span>
      {f.location ? (
        <span className="mt-(--space-3) text-xs text-text-muted">
          {f.location}
        </span>
      ) : null}
    </Link>
  );
}
