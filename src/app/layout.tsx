import type { ReactNode } from 'react';

import '@/styles/globals.css';

/**
 * Root layout is a pass-through: the real <html>/<body> live in
 * `[locale]/layout.tsx` so `lang` and `dir` can be set per locale.
 * A layout file is still required here for the root `not-found.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
