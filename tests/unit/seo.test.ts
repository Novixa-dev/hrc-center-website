import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { site } from '@/lib/site';
import { buildMetadata, pageTitle } from '@/lib/seo';

describe('buildMetadata', () => {
  const md = buildMetadata({
    locale: 'ar',
    path: '/about',
    title: 'عن المركز',
    description: 'وصف',
  });

  it('sets a locale-prefixed canonical', () => {
    expect(md.alternates?.canonical).toMatch(/\/ar\/about$/);
  });

  it('emits ar, en and x-default hreflang alternates', () => {
    const langs = md.alternates?.languages as Record<string, string>;
    expect(Object.keys(langs).sort()).toEqual(['ar', 'en', 'x-default']);
    expect(langs['x-default']).toMatch(/\/ar\/about$/);
    expect(langs.en).toMatch(/\/en\/about$/);
  });

  it('carries OpenGraph title, url and a 1200x630 image', () => {
    expect(md.openGraph?.title).toBe('عن المركز');
    expect((md.openGraph as { url?: string }).url).toMatch(/\/ar\/about$/);
    const img = (md.openGraph?.images as { width?: number }[])[0];
    expect(img?.width).toBe(1200);
  });

  it('uses the per-page card when generated, else the locale brand card', () => {
    // public/og/<locale><path>.jpg comes from scripts/generate-og.mjs (run in CI
    // before the build); without it the brand route is the only valid image.
    const img = (md.openGraph?.images as { url: string }[])[0];
    const generated = existsSync(join(process.cwd(), 'public/og/ar/about.jpg'));
    expect(img?.url).toMatch(
      generated ? /\/og\/ar\/about\.jpg$/ : /\/ar\/opengraph-image$/,
    );
  });

  it('honours noindex', () => {
    const priv = buildMetadata({
      locale: 'en',
      path: '/privacy',
      title: 't',
      description: 'd',
      noindex: true,
    });
    expect((priv.robots as { index?: boolean }).index).toBe(false);
  });

  it('treats "" and "/" as the home path', () => {
    const a = buildMetadata({
      locale: 'en',
      path: '',
      title: 't',
      description: 'd',
    });
    const b = buildMetadata({
      locale: 'en',
      path: '/',
      title: 't',
      description: 'd',
    });
    expect(a.alternates?.canonical).toBe(b.alternates?.canonical);
    expect(a.alternates?.canonical).toMatch(/\/en$/);
  });
});

describe('pageTitle', () => {
  it('composes "<page> — <site>" per locale', () => {
    expect(pageTitle('News', 'en')).toBe('News — Hadramout Research Center');
    expect(pageTitle('الأخبار', 'ar')).toBe('الأخبار — مركز بحوث حضرموت');
  });
});

describe('all route paths metadata audit', () => {
  const allPaths = [
    '',
    '/about',
    '/services',
    '/training',
    '/training/sample-prog',
    '/research',
    '/research/sample-pub',
    '/conferences',
    '/conferences/sample-conf',
    '/team',
    '/news',
    '/news/sample-article',
    '/contact',
    '/privacy',
    '/accessibility',
  ];

  for (const path of allPaths) {
    for (const locale of ['ar', 'en'] as const) {
      it(`builds valid metadata for ${locale}:${path || '/'}`, () => {
        const meta = buildMetadata({
          locale,
          path,
          title: pageTitle('Test Page', locale),
          description: 'A test description for audit verification.',
        });

        expect(meta.title).toContain(
          locale === 'ar' ? 'مركز بحوث حضرموت' : 'Hadramout Research Center',
        );
        expect(meta.description).toBe(
          'A test description for audit verification.',
        );
        expect(meta.alternates?.canonical).toBe(`${site.url}/${locale}${path}`);
        const langs = meta.alternates?.languages as Record<string, string>;
        expect(langs.ar).toBe(`${site.url}/ar${path}`);
        expect(langs.en).toBe(`${site.url}/en${path}`);
        expect(langs['x-default']).toBe(`${site.url}/ar${path}`);
        expect(meta.openGraph?.images).toBeDefined();
        expect((meta.twitter as { card?: string })?.card).toBe(
          'summary_large_image',
        );
      });
    }
  }
});

describe('sitemap & robots audit', () => {
  it('generates complete sitemap entries covering static and detail routes', async () => {
    const { default: sitemap } = await import('@/app/sitemap');
    const entries = sitemap();
    expect(entries.length).toBeGreaterThan(20);

    // Verify all entries have valid URLs and locale alternates
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https?:\/\//);
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry.alternates?.languages).toBeDefined();
    }

    // Verify key core routes exist
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${site.url}/ar`);
    expect(urls).toContain(`${site.url}/en`);
    expect(urls).toContain(`${site.url}/ar/about`);
    expect(urls).toContain(`${site.url}/en/about`);
    expect(urls).toContain(`${site.url}/ar/contact`);
    expect(urls).toContain(`${site.url}/en/contact`);
    expect(urls).toContain(`${site.url}/ar/news`);
  });

  it('generates valid robots.txt rules', async () => {
    const { default: robots } = await import('@/app/robots');
    const rob = robots();
    expect(rob.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(rob.host).toBe(site.url);
    expect(rob.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
  });
});
