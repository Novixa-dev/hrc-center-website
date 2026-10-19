import { existsSync } from 'node:fs';
import { join } from 'node:path';

import type { Metadata } from 'next';

import { defaultLocale, locales, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';

type BuildMetadataOptions = {
  locale: Locale;
  /** Path AFTER the locale segment, leading slash, no trailing slash. "" for home. */
  path?: string;
  title: string;
  description: string;
  /**
   * Absolute or root-relative OG image URL. Defaults to the page's own card
   * from `scripts/generate-og.mjs` (public/og/<locale><path>.jpg) when it was
   * generated for this build, otherwise the locale-level brand card.
   */
  image?: string;
  type?: 'website' | 'article';
  /** Set true on utility pages that should not be indexed. */
  noindex?: boolean;
};

/** Per-page card rendered at build time (see scripts/generate-og.mjs), if present. */
function pageOgImage(locale: Locale, cleanPath: string): string | null {
  const rel = `og/${locale}${cleanPath || '/index'}.jpg`;
  return existsSync(join(process.cwd(), 'public', rel))
    ? `${site.url}/${rel}`
    : null;
}

const OG_LOCALE: Record<Locale, string> = {
  ar: 'ar_YE',
  en: 'en_US',
};

/** Build a complete Metadata object: canonical + hreflang + OpenGraph + Twitter. */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  type = 'website',
  noindex = false,
}: BuildMetadataOptions): Metadata {
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  const canonical = `${site.url}/${locale}${cleanPath}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${site.url}/${l}${cleanPath}`;
  }
  languages['x-default'] = `${site.url}/${defaultLocale}${cleanPath}`;

  const perPage = image ? null : pageOgImage(locale, cleanPath);
  const ogImage = image ?? perPage ?? `${site.url}/${locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      siteName: site.name[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          ...(perPage ? { type: 'image/jpeg' } : {}),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Compose a page title as "<page> — <site>" in the active locale. */
export function pageTitle(page: string, locale: Locale): string {
  return `${page} — ${site.name[locale]}`;
}
