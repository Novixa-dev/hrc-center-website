import { Amiri, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';

/**
 * Self-hosted at build time (no runtime request). Subset to Arabic + Latin.
 * CSS variable names match docs/design/02-design-tokens.md §1.7 / src/styles/tokens.css.
 * Only Amiri + IBM Plex Sans Arabic are preloaded (the /ar above-the-fold pair).
 */

// Amiri only sets Arabic headings, always at --weight-bold; a 400 face was preloaded
// (~120 KB) on every /ar page without ever being used.
export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['700'],
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

/*
 * Latin faces (Inter, EB Garamond) are self-hosted in public/fonts and declared in
 * globals.css, so the [locale] layout can preload them on /en only — next/font
 * preloads are shared by both locales (S14: /en CLS fix without taxing /ar).
 */
export const LATIN_FONT_PRELOADS = [
  '/fonts/inter-latin.woff2',
  '/fonts/eb-garamond-600-latin.woff2',
] as const;

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
  plexMono.variable,
].join(' ');
