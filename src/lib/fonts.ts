import type { Locale } from '@/i18n/routing';

/**
 * Typography is self-hosted (src/styles/fonts.css, files in public/fonts —
 * SIL OFL). next/font was dropped in S14: its preloads are shared by every
 * route, so /en downloaded the Arabic faces and /ar the Latin ones. Each locale
 * now preloads only what it renders above the fold; the other faces still
 * load on demand (unicode-range) with metric-matched fallbacks.
 * CSS variable names match docs/design/02-design-tokens.md §1.7 / tokens.css.
 */
export const FONT_PRELOADS: Record<Locale, readonly string[]> = {
  // Amiri 700 = Arabic headings (the hero <h1> is the LCP element); Plex = body.
  ar: ['/fonts/amiri-700-arabic.woff2', '/fonts/plex-arabic-400-arabic.woff2'],
  // Inter (variable) = body + the LCP lede; EB Garamond 600 = headings.
  en: ['/fonts/inter-latin.woff2', '/fonts/eb-garamond-600-latin.woff2'],
};
