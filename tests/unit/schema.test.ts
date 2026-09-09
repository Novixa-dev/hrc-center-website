import { describe, expect, it } from 'vitest';

import {
  breadcrumbSchema,
  jsonLdScript,
  organizationSchema,
  websiteSchema,
} from '@/lib/schema';

describe('organizationSchema', () => {
  const org = organizationSchema('en') as Record<string, unknown>;

  it('is an EducationalOrganization under Al-Ahgaff University', () => {
    expect(org['@type']).toContain('EducationalOrganization');
    const parent = org.parentOrganization as Record<string, unknown>;
    expect(parent.name).toBe('Al-Ahgaff University');
  });

  it('states the 2013 founding and links social profiles', () => {
    expect(org.foundingDate).toBe('2013');
    expect((org.sameAs as string[]).length).toBe(2);
  });
});

describe('websiteSchema', () => {
  it('references the organization by @id', () => {
    const site = websiteSchema('ar') as Record<string, unknown>;
    expect((site.publisher as Record<string, string>)['@id']).toMatch(
      /#organization$/,
    );
    expect(site.inLanguage).toBe('ar');
  });
});

describe('breadcrumbSchema', () => {
  it('numbers items from 1 and builds locale-prefixed URLs', () => {
    const bc = breadcrumbSchema(
      [
        { name: 'Training', path: '/training' },
        { name: 'English Diploma', path: '/training/english-diploma' },
      ],
      'en',
    ) as Record<string, unknown>;
    const items = bc.itemListElement as { position: number; item: string }[];
    expect(items[0]?.position).toBe(1);
    expect(items[1]?.item).toMatch(/\/en\/training\/english-diploma$/);
  });
});

describe('jsonLdScript', () => {
  it('escapes "<" to prevent breaking out of the script tag', () => {
    const out = jsonLdScript({ name: 'a < b' });
    expect(out).not.toContain('<');
    expect(out).toContain('\\u003c');
  });
});

describe('all schema builders audit', () => {
  it('validates courseSchema required fields', async () => {
    const { courseSchema } = await import('@/lib/schema');
    const course = courseSchema('ar', {
      name: 'دبلوم اللغة الإنجليزية',
      description: 'برنامج تدريبي',
      path: '/training/english-diploma',
      award: 'شهادة دبلوم',
    });
    expect(course['@context']).toBe('https://schema.org');
    expect(course['@type']).toBe('Course');
    expect(course.name).toBe('دبلوم اللغة الإنجليزية');
    expect(course.educationalCredentialAwarded).toBe('شهادة دبلوم');
    expect((course.provider as Record<string, string>)['@type']).toBe(
      'Organization',
    );
  });

  it('validates creativeWorkSchema required fields for publications', async () => {
    const { creativeWorkSchema } = await import('@/lib/schema');
    const work = creativeWorkSchema('ar', {
      kind: 'journal-issue',
      name: 'العدد الأول',
      description: 'افتتاحية المجلة',
      path: '/research/issue-1',
      datePublished: '2020-01-01',
      authors: ['هيئة التحرير'],
    });
    expect(work['@context']).toBe('https://schema.org');
    expect(work['@type']).toBe('PublicationIssue');
    expect(work.name).toBe('العدد الأول');
    expect(work.datePublished).toBe('2020-01-01');
    expect(Array.isArray(work.author)).toBe(true);
  });

  it('validates eventSchema required fields for conferences', async () => {
    const { eventSchema } = await import('@/lib/schema');
    const event = eventSchema('ar', {
      name: 'المؤتمر العلمي الأول',
      description: 'مؤتمر سنوي',
      path: '/conferences/annual-2024',
      startDate: '2024-11-01',
      location: 'المكلا، حضرموت',
    });
    expect(event['@context']).toBe('https://schema.org');
    expect(event['@type']).toBe('Event');
    expect(event.name).toBe('المؤتمر العلمي الأول');
    expect(event.startDate).toBe('2024-11-01');
    expect((event.location as Record<string, string>)['@type']).toBe('Place');
  });

  it('validates newsArticleSchema required fields for news posts', async () => {
    const { newsArticleSchema } = await import('@/lib/schema');
    const article = newsArticleSchema('ar', {
      headline: 'إعلان ندوة علمية',
      description: 'تفاصيل الندوة',
      path: '/news/symposium-announcement',
      datePublished: '2024-10-15',
    });
    expect(article['@context']).toBe('https://schema.org');
    expect(article['@type']).toBe('NewsArticle');
    expect(article.headline).toBe('إعلان ندوة علمية');
    expect(article.datePublished).toBe('2024-10-15');
    expect((article.publisher as Record<string, string>)['@id']).toBeDefined();
  });

  it('validates page schemas (about, contact, collection)', async () => {
    const { aboutPageSchema, contactPageSchema, collectionPageSchema } =
      await import('@/lib/schema');
    const about = aboutPageSchema('ar', {
      name: 'عن المركز',
      description: 'وصف',
      path: '/about',
    });
    const contact = contactPageSchema('en', {
      name: 'Contact',
      description: 'desc',
      path: '/contact',
    });
    const coll = collectionPageSchema('ar', {
      name: 'الأبحاث',
      description: 'دليل',
      path: '/research',
    });

    expect(about['@type']).toBe('AboutPage');
    expect(contact['@type']).toBe('ContactPage');
    expect(coll['@type']).toBe('CollectionPage');
  });
});
