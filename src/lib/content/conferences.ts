import { defineCollection } from '@/lib/content/collection';
import {
  conferenceFrontmatter,
  type ConferenceFrontmatter,
} from '@/lib/content/schema';
import type { Locale } from '@/i18n/routing';

export const conferences = defineCollection(
  'conferences',
  conferenceFrontmatter,
);

export type Conference = NonNullable<ReturnType<typeof conferences.getBySlug>>;

/** All conferences, upcoming first, then by date (newest first), then `order`. */
export function getConferences(locale: Locale) {
  const rank: Record<ConferenceFrontmatter['status'], number> = {
    upcoming: 0,
    planned: 1,
    past: 2,
  };
  return conferences.getAll(locale).sort((a, b) => {
    const byStatus = rank[a.frontmatter.status] - rank[b.frontmatter.status];
    if (byStatus !== 0) return byStatus;
    const da = a.frontmatter.startDate ?? a.frontmatter.date ?? '';
    const db = b.frontmatter.startDate ?? b.frontmatter.date ?? '';
    if (da !== db) return db.localeCompare(da);
    return a.frontmatter.order - b.frontmatter.order;
  });
}

/**
 * `Event` structured data is only honest when we have a real date and place.
 * Everything else renders as a plain informational page.
 */
export function hasEventData(fm: ConferenceFrontmatter): boolean {
  return Boolean(fm.startDate && fm.location);
}
