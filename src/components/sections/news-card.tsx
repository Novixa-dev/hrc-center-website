import { getFormatter, getTranslations } from 'next-intl/server';

import { Link } from '@/components/ui/link';
import type { CollectionItem } from '@/lib/content/collection';
import type { NewsFrontmatter } from '@/lib/content/schema';

export async function NewsCard({
  item,
}: {
  item: CollectionItem<NewsFrontmatter>;
}) {
  const t = await getTranslations('news');
  const format = await getFormatter();
  const { slug, frontmatter: f } = item;

  return (
    <Link
      href={`/news/${slug}`}
      className="group flex w-full flex-col rounded-lg border border-border bg-surface p-(--space-5) no-underline shadow-1 transition-shadow duration-(--duration-base) hover:shadow-2"
    >
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
        <time dateTime={f.date} className="font-(--font-mono)">
          {format.dateTime(new Date(f.date), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {f.tags.map((tag) => (
          <span
            key={tag}
            className="tracking-(--tracking-overline) text-accent uppercase"
          >
            {t(`tags.${tag}`)}
          </span>
        ))}
      </span>
      <span className="mt-(--space-3) flex-1 text-xl font-semibold text-heading group-hover:text-link">
        {f.title}
      </span>
      <span className="mt-(--space-2) text-sm text-text-muted">
        {f.summary}
      </span>
    </Link>
  );
}
