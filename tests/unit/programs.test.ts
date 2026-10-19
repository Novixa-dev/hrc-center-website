import { describe, expect, it } from 'vitest';

import {
  getFeaturedPrograms,
  getProgramFields,
  programs,
} from '@/lib/content/programs';
import { programFrontmatter } from '@/lib/content/schema';

describe('programs collection', () => {
  it('every confirmed (non-provisional) program cites its source', () => {
    for (const locale of ['ar', 'en'] as const) {
      for (const p of programs.getAll(locale)) {
        if (p.frontmatter.provisional) continue;
        expect(p.frontmatter.source?.url, p.slug).toMatch(/^https:\/\//);
      }
    }
  });

  it('loads every AR and EN file with valid frontmatter', () => {
    for (const locale of ['ar', 'en'] as const) {
      const all = programs.getAll(locale);
      expect(all.length).toBeGreaterThanOrEqual(4);
      for (const p of all) {
        expect(p.frontmatter.title).toBeTruthy();
        expect(p.frontmatter.summary).toBeTruthy();
        expect(['open', 'upcoming', 'archived']).toContain(
          p.frontmatter.status,
        );
      }
    }
  });

  it('AR and EN have the same set of slugs', () => {
    expect(programs.getSlugs('ar').sort()).toEqual(
      programs.getSlugs('en').sort(),
    );
  });

  it('all provisional programs are archived (not shown as "open")', () => {
    for (const p of programs.getAll('en')) {
      if (p.frontmatter.provisional) {
        expect(p.frontmatter.status).toBe('archived');
      }
    }
  });

  it('getBySlug returns null for an unknown slug', () => {
    expect(programs.getBySlug('en', 'does-not-exist')).toBeNull();
  });

  it('getFeaturedPrograms caps the count', () => {
    expect(getFeaturedPrograms('ar', 3).length).toBeLessThanOrEqual(3);
  });

  it('getProgramFields returns the distinct fields', () => {
    const fields = getProgramFields('en');
    expect(fields).toContain('languages');
    expect(new Set(fields).size).toBe(fields.length);
  });
});

describe('programFrontmatter schema', () => {
  it('rejects a bad status', () => {
    const r = programFrontmatter.safeParse({
      title: 't',
      summary: 's',
      field: 'x',
      status: 'enrolling',
    });
    expect(r.success).toBe(false);
  });

  it('requires title, summary and field', () => {
    expect(programFrontmatter.safeParse({ title: 't' }).success).toBe(false);
  });

  it('defaults order=0, provisional=false, status=archived', () => {
    const r = programFrontmatter.parse({
      title: 't',
      summary: 's',
      field: 'x',
    });
    expect(r).toMatchObject({
      order: 0,
      provisional: false,
      status: 'archived',
    });
  });
});
