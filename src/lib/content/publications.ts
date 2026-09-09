import { defineCollection } from '@/lib/content/collection';
import { publicationFrontmatter } from '@/lib/content/schema';
import type { Locale } from '@/i18n/routing';

export const publications = defineCollection(
  'publications',
  publicationFrontmatter,
);

export type Publication = NonNullable<
  ReturnType<typeof publications.getBySlug>
>;

/** All publications, newest first (undated last), then `order`. */
export function getPublications(locale: Locale) {
  return publications.getAll(locale).sort((a, b) => {
    const da = a.frontmatter.date ?? '';
    const db = b.frontmatter.date ?? '';
    if (da !== db) return db.localeCompare(da);
    return a.frontmatter.order - b.frontmatter.order;
  });
}

/** Just the journal issues, newest first — for the Journal archive block. */
export function getJournalIssues(locale: Locale) {
  return getPublications(locale).filter(
    (p) => p.frontmatter.kind === 'journal-issue',
  );
}
