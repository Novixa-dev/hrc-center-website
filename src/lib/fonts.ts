import {
  Amiri,
  EB_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Inter,
} from 'next/font/google';

/**
 * Self-hosted at build time (no runtime request). Subset to Arabic + Latin.
 * CSS variable names match docs/design/02-design-tokens.md §1.7 / src/styles/tokens.css.
 * Only Amiri 700 + IBM Plex Sans Arabic 400 are preloaded (the /ar above-the-fold pair).
 */

export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--next-font-amiri',
  display: 'swap',
  preload: true,
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600'],
  variable: '--next-font-plex-ar',
  display: 'swap',
  preload: true,
});

export const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--next-font-garamond',
  display: 'swap',
  preload: false,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--next-font-inter',
  display: 'swap',
  preload: false,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--next-font-plex-mono',
  display: 'swap',
  preload: false,
});

/** All font CSS-variable classes, for the <html> element. */
export const fontVariables = [
  amiri.variable,
  plexArabic.variable,
  garamond.variable,
  inter.variable,
  plexMono.variable,
].join(' ');
