import { defineCollection } from '@/lib/content/collection';
import { newsFrontmatter } from '@/lib/content/schema';
import type { Locale } from '@/i18n/routing';

export const news = defineCollection('news', newsFrontmatter);

export type NewsItem = NonNullable<ReturnType<typeof news.getBySlug>>;

/** All news, newest first, then `order` as a tiebreak for same-day items. */
export function getNews(locale: Locale) {
  return news.getAll(locale).sort((a, b) => {
    if (a.frontmatter.date !== b.frontmatter.date) {
      return b.frontmatter.date.localeCompare(a.frontmatter.date);
    }
    return a.frontmatter.order - b.frontmatter.order;
  });
}

/** News filtered to a single tag (newest first). */
export function getNewsByTag(locale: Locale, tag: string) {
  return getNews(locale).filter((n) => n.frontmatter.tags.includes(tag));
}

/** Distinct tags present, sorted — for the list filter. */
export function getNewsTags(locale: Locale): string[] {
  return [
    ...new Set(news.getAll(locale).flatMap((n) => n.frontmatter.tags)),
  ].sort();
}

/** The `limit` most recent items — for the Home "latest news" band (S7+). */
export function getLatestNews(locale: Locale, limit = 3) {
  return getNews(locale).slice(0, limit);
}
