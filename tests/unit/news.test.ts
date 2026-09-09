import { describe, expect, it } from 'vitest';

import { getNews, getNewsByTag, getNewsTags, news } from '@/lib/content/news';
import { newsFrontmatter } from '@/lib/content/schema';

describe('news collection', () => {
  it('loads every AR and EN file with valid frontmatter', () => {
    for (const locale of ['ar', 'en'] as const) {
      const all = news.getAll(locale);
      expect(all.length).toBeGreaterThanOrEqual(4);
      for (const n of all) {
        expect(n.frontmatter.title).toBeTruthy();
        expect(n.frontmatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Array.isArray(n.frontmatter.tags)).toBe(true);
      }
    }
  });

  it('AR and EN expose the same slugs', () => {
    expect(news.getSlugs('ar').sort()).toEqual(news.getSlugs('en').sort());
  });

  it('getNews is strictly newest-first', () => {
    const dates = getNews('en').map((n) => n.frontmatter.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it('getNewsTags returns the distinct sorted tags', () => {
    const tags = getNewsTags('en');
    expect(tags).toContain('journal');
    expect(tags).toEqual([...tags].sort());
    expect(new Set(tags).size).toBe(tags.length);
  });

  it('getNewsByTag filters to that tag only', () => {
    const items = getNewsByTag('en', 'training');
    expect(items.length).toBeGreaterThanOrEqual(1);
    expect(items.every((n) => n.frontmatter.tags.includes('training'))).toBe(
      true,
    );
  });

  it('getBySlug returns null for an unknown slug', () => {
    expect(news.getBySlug('en', 'nope')).toBeNull();
  });
});

describe('newsFrontmatter schema', () => {
  it('requires a date (unlike the optional base date)', () => {
    expect(
      newsFrontmatter.safeParse({ title: 't', summary: 's' }).success,
    ).toBe(false);
  });

  it('defaults tags to an empty array', () => {
    const r = newsFrontmatter.parse({
      title: 't',
      summary: 's',
      date: '2025-01-01',
    });
    expect(r.tags).toEqual([]);
  });

  it('rejects a malformed date', () => {
    expect(
      newsFrontmatter.safeParse({
        title: 't',
        summary: 's',
        date: '2025-13-40',
      }).success,
    ).toBe(false);
  });
});
