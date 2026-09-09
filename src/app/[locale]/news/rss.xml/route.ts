import { getTranslations } from 'next-intl/server';

import { getNews } from '@/lib/content/news';
import { locales, routing, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const l = (
    locales.includes(locale as Locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'news' });

  const base = `${site.url}/${l}`;
  const self = `${base}/news/rss.xml`;
  const items = getNews(l)
    .map((n) => {
      const url = `${base}/news/${n.slug}`;
      const pub = new Date(`${n.frontmatter.date}T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${xmlEscape(n.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${xmlEscape(n.frontmatter.summary)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(t('rssTitle'))}</title>
    <link>${base}/news</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(t('meta.description'))}</description>
    <language>${l}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
