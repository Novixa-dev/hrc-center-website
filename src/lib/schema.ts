import type { Locale } from '@/i18n/routing';
import { site } from '@/lib/site';

/** JSON-LD builders. Values must match visible content — no hidden/inflated data. */

type JsonLd = Record<string, unknown>;

export function organizationSchema(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'ResearchOrganization'],
    '@id': `${site.url}/#organization`,
    name: site.name[locale],
    alternateName: locale === 'ar' ? site.name.en : site.name.ar,
    url: `${site.url}/${locale}`,
    description: site.description[locale],
    foundingDate: site.founded,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: site.parent.name[locale],
      url: site.parent.url,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'ar' ? 'المكلا' : 'Mukalla',
      addressRegion: locale === 'ar' ? 'حضرموت' : 'Hadramout',
      addressCountry: 'YE',
    },
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

export function websiteSchema(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name[locale],
    url: `${site.url}/${locale}`,
    inLanguage: locale,
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function aboutPageSchema(
  locale: Locale,
  opts: { name: string; description: string; path: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: locale,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
  };
}

export function contactPageSchema(
  locale: Locale,
  opts: { name: string; description: string; path: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: locale,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
  };
}

export function courseSchema(
  locale: Locale,
  opts: {
    name: string;
    description: string;
    path: string;
    inLanguage?: string | undefined;
    award?: string | undefined;
  },
): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: opts.inLanguage ?? locale,
    provider: {
      '@type': 'Organization',
      name: site.name[locale],
      '@id': `${site.url}/#organization`,
    },
  };
  // Only assert an award when we actually have one — never fabricate offers/instances.
  if (opts.award) schema.educationalCredentialAwarded = opts.award;
  return schema;
}

export function collectionPageSchema(
  locale: Locale,
  opts: { name: string; description: string; path: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: locale,
    isPartOf: { '@id': `${site.url}/#website` },
    about: { '@id': `${site.url}/#organization` },
  };
}

const CREATIVE_WORK_TYPE = {
  'journal-issue': 'PublicationIssue',
  book: 'Book',
  report: 'Report',
  paper: 'ScholarlyArticle',
} as const;

/**
 * A publication. Only confirmed fields are emitted — no fabricated ISSN,
 * page counts, or citations.
 */
export function creativeWorkSchema(
  locale: Locale,
  opts: {
    kind: keyof typeof CREATIVE_WORK_TYPE;
    name: string;
    description: string;
    path: string;
    datePublished?: string | undefined;
    authors?: readonly string[] | undefined;
    isPartOf?: string | undefined;
    sameAs?: string | undefined;
  },
): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': CREATIVE_WORK_TYPE[opts.kind],
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: locale,
    publisher: { '@id': `${site.url}/#organization` },
  };
  if (opts.datePublished) schema.datePublished = opts.datePublished;
  if (opts.authors?.length) {
    schema.author = opts.authors.map((name) => ({ '@type': 'Person', name }));
  }
  if (opts.isPartOf) {
    schema.isPartOf = { '@type': 'Periodical', name: opts.isPartOf };
  }
  if (opts.sameAs) schema.sameAs = opts.sameAs;
  return schema;
}

/**
 * An `Event`. Call this only when a real start date AND location exist
 * (`hasEventData`) — otherwise the page renders without event markup.
 */
export function eventSchema(
  locale: Locale,
  opts: {
    name: string;
    description: string;
    path: string;
    startDate: string;
    endDate?: string | undefined;
    location: string;
  },
): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    startDate: opts.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: opts.location },
    organizer: {
      '@type': 'Organization',
      name: site.name[locale],
      '@id': `${site.url}/#organization`,
    },
  };
  if (opts.endDate) schema.endDate = opts.endDate;
  return schema;
}

export function newsArticleSchema(
  locale: Locale,
  opts: {
    headline: string;
    description: string;
    path: string;
    datePublished: string;
    image?: string | undefined;
  },
): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: opts.headline,
    description: opts.description,
    url: `${site.url}/${locale}${opts.path}`,
    inLanguage: locale,
    datePublished: opts.datePublished,
    publisher: { '@id': `${site.url}/#organization` },
    isPartOf: { '@id': `${site.url}/#website` },
  };
  if (opts.image) schema.image = opts.image;
  return schema;
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  locale: Locale,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}/${locale}${item.path}`,
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
