import { getFormatter, getTranslations } from 'next-intl/server';

import { Link } from '@/components/ui/link';
import type { CollectionItem } from '@/lib/content/collection';
import type { PublicationFrontmatter } from '@/lib/content/schema';

export async function PublicationCard({
  item,
}: {
  item: CollectionItem<PublicationFrontmatter>;
}) {
  const t = await getTranslations('research');
  const format = await getFormatter();
  const { slug, frontmatter: f } = item;

  return (
    <Link
      href={`/research/${slug}`}
      className="group flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5) no-underline shadow-1 transition-shadow duration-(--duration-base) hover:shadow-2"
    >
      <span className="text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
        {t(`detail.kind.${f.kind}`)}
        {f.date
          ? ` · ${format.dateTime(new Date(f.date), { year: 'numeric', month: 'long' })}`
          : null}
      </span>
      <span className="mt-(--space-2) flex-1 text-xl font-semibold text-heading group-hover:text-link">
        {f.title}
      </span>
      <span className="mt-(--space-2) text-sm text-text-muted">
        {f.summary}
      </span>
    </Link>
  );
}
