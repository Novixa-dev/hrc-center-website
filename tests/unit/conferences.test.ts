import { describe, expect, it } from 'vitest';

import {
  conferences,
  getConferences,
  hasEventData,
} from '@/lib/content/conferences';
import { conferenceFrontmatter } from '@/lib/content/schema';

describe('conferences collection', () => {
  it('loads every AR and EN file with valid frontmatter', () => {
    for (const locale of ['ar', 'en'] as const) {
      const all = conferences.getAll(locale);
      expect(all.length).toBeGreaterThanOrEqual(1);
      for (const c of all) {
        expect(c.frontmatter.title).toBeTruthy();
        expect(['upcoming', 'past', 'planned']).toContain(c.frontmatter.status);
      }
    }
  });

  it('AR and EN expose the same slugs', () => {
    expect(conferences.getSlugs('ar').sort()).toEqual(
      conferences.getSlugs('en').sort(),
    );
  });

  it('getConferences puts upcoming before past', () => {
    const order = getConferences('en').map((c) => c.frontmatter.status);
    const rank = { upcoming: 0, planned: 1, past: 2 } as const;
    const ranks = order.map((s) => rank[s]);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it('hasEventData is false without both a date and a location', () => {
    expect(
      hasEventData(conferenceFrontmatter.parse({ title: 't', summary: 's' })),
    ).toBe(false);
    expect(
      hasEventData(
        conferenceFrontmatter.parse({
          title: 't',
          summary: 's',
          startDate: '2026-01-01',
        }),
      ),
    ).toBe(false);
    expect(
      hasEventData(
        conferenceFrontmatter.parse({
          title: 't',
          summary: 's',
          startDate: '2026-01-01',
          location: 'Mukalla',
        }),
      ),
    ).toBe(true);
  });

  it('the provisional "second scientific conference" carries no Event data', () => {
    const c = conferences.getBySlug('en', 'second-scientific-conference');
    expect(c).not.toBeNull();
    expect(hasEventData(c!.frontmatter)).toBe(false);
  });
});

describe('conferenceFrontmatter schema', () => {
  it('defaults status to planned', () => {
    expect(
      conferenceFrontmatter.parse({ title: 't', summary: 's' }).status,
    ).toBe('planned');
  });

  it('rejects a bad status', () => {
    expect(
      conferenceFrontmatter.safeParse({
        title: 't',
        summary: 's',
        status: 'cancelled',
      }).success,
    ).toBe(false);
  });
});
