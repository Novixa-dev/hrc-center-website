import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';

import { locales, routing, type Locale } from '@/i18n/routing';
import { site } from '@/lib/site';

export const alt = 'Hadramout Research Center';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Brand OG template. S2 renders the Latin lockup + motif only; loading
 * Amiri / EB Garamond into satori for the localised bilingual title is an
 * S7 hardening task (docs/design/08 §4).
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background:
          'radial-gradient(1000px 700px at 100% 0%, #1f3a5c 0%, #14283f 45%, #0f1e30 100%)',
        color: '#f2f5f9',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <svg width="60" height="60" viewBox="0 0 48 48">
          <rect width="48" height="48" rx="12" fill="#1e3a5f" />
          <path
            d="M24 7 28.7 15 37.6 16.8 35.8 25.7 42 30 34.1 34.6 33.1 43.3 24 40.4 14.9 43.3 13.9 34.6 6 30 12.2 25.7 10.4 16.8 19.3 15Z"
            fill="none"
            stroke="#d8a24a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="25" r="3.6" fill="#d8a24a" />
        </svg>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#a9b6c6',
          }}
        >
          {site.name.en}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#e9b667',
          }}
        >
          {site.parent.name.en}
        </div>
        <div style={{ fontSize: 60, lineHeight: 1.15, maxWidth: 940 }}>
          {site.tagline.en}
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            background: '#a16207',
            borderRadius: 2,
          }}
        />
        <div
          style={{ fontSize: 24, color: '#a9b6c6' }}
        >{`${site.url.replace(/^https?:\/\//, '')} · ${l === 'ar' ? 'AR (Official Portal)' : 'EN (English Portal)'}`}</div>
      </div>
    </div>,
    size,
  );
}
