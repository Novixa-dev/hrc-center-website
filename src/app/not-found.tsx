import Link from 'next/link';

import { defaultLocale } from '@/i18n/routing';

/**
 * Global catch-all 404 (routes with no locale). The middleware normally adds a
 * locale, so this is a rare fallback; it renders its own minimal document.
 */
export default function RootNotFound() {
  return (
    <html lang={defaultLocale} dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#f8fafc',
          color: '#0f172a',
        }}
      >
        <main style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontFamily: 'monospace', color: '#475569' }}>404</p>
          <h1 style={{ marginBlock: '0.5rem' }}>الصفحة غير موجودة</h1>
          <p style={{ color: '#475569' }}>Page not found.</p>
          <p style={{ marginTop: '1.5rem' }}>
            <Link href={`/${defaultLocale}`} style={{ color: '#854d0e' }}>
              العودة إلى الرئيسية · Back to home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
