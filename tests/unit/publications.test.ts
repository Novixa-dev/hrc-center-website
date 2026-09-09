import { describe, expect, it } from 'vitest';

import {
  getJournalIssues,
  getPublications,
  publications,
} from '@/lib/content/publications';
import { publicationFrontmatter } from '@/lib/content/schema';

describe('publications collection', () => {
  it('loads every AR and EN file with valid frontmatter', () => {
    for (const locale of ['ar', 'en'] as const) {
      const all = publications.getAll(locale);
      expect(all.length).toBeGreaterThanOrEqual(2);
      for (const p of all) {
        expect(p.frontmatter.title).toBeTruthy();
        expect(['journal-issue', 'book', 'report', 'paper']).toContain(
          p.frontmatter.kind,
        );
      }
    }
  });

  it('AR and EN expose the same slugs', () => {
    expect(publications.getSlugs('ar').sort()).toEqual(
      publications.getSlugs('en').sort(),
    );
  });

  it('getPublications sorts newest first', () => {
    const dates = getPublications('en')
      .map((p) => p.frontmatter.date)
      .filter((d): d is string => Boolean(d));
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it('getJournalIssues returns only journal issues', () => {
    const issues = getJournalIssues('en');
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues.every((p) => p.frontmatter.kind === 'journal-issue')).toBe(
      true,
    );
  });

  it('getBySlug returns null for an unknown slug', () => {
    expect(publications.getBySlug('en', 'nope')).toBeNull();
  });
});

describe('publicationFrontmatter schema', () => {
  it('requires a valid kind', () => {
    expect(
      publicationFrontmatter.safeParse({
        title: 't',
        summary: 's',
        kind: 'blog',
      }).success,
    ).toBe(false);
  });

  it('rejects a non-URL url', () => {
    expect(
      publicationFrontmatter.safeParse({
        title: 't',
        summary: 's',
        kind: 'book',
        url: 'not a url',
      }).success,
    ).toBe(false);
  });
});
