import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { preload } from 'react-dom';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SkipLink } from '@/components/layout/skip-link';
import { ResearchAssistant } from '@/components/assistant/research-assistant';
import { localeDirection, locales, routing, type Locale } from '@/i18n/routing';
import { fontVariables, LATIN_FONT_PRELOADS } from '@/lib/fonts';
import { organizationSchema, websiteSchema, jsonLdScript } from '@/lib/schema';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e3a5f' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1420' },
  ],
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = hasLocale(locales, locale) ? locale : routing.defaultLocale;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.name[l],
      template: `%s — ${site.name[l]}`,
    },
    description: site.description[l],
    applicationName: site.name[l],
    authors: [{ name: site.studio.name, url: site.studio.url[l] }],
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      // ?v=2: the bare URL was pinned as a 404 at the Cloudflare edge before the file existed.
      apple: '/apple-touch-icon.png?v=2',
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();

  setRequestLocale(locale);
  const l = locale as Locale;
  const dir = localeDirection[l];
  const t = await getTranslations('common');

  // Only the namespaces the client components (MobileNav, LocaleSwitcher, ContactForm, ErrorBoundary) need —
  // keeps the serialized message payload small.
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    (
      [
        'common',
        'assistant',
        'nav',
        'languageSwitcher',
        'contact',
        'error',
        'notFound',
      ] as const
    )
      .filter((k) => k in messages)
      .map((k) => [k, messages[k]]),
  );

  // Latin faces matter above the fold only on English pages (see lib/fonts.ts).
  if (l === 'en') {
    for (const href of LATIN_FONT_PRELOADS) {
      preload(href, {
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      });
    }
  }

  return (
    <html lang={l} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-text antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          <SkipLink>{t('skipToContent')}</SkipLink>
          <div className="flex min-h-dvh flex-col">
            <Header locale={l} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={l} />
          </div>
          <ResearchAssistant />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([organizationSchema(l), websiteSchema(l)]),
          }}
        />
      </body>
    </html>
  );
}
