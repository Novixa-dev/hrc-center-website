import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

/**
 * Next 16 "proxy" convention (formerly middleware). next-intl's request handler
 * works unchanged here: it negotiates the locale, redirects `/` -> `/ar`, and
 * rewrites locale-prefixed routes.
 */
export default createMiddleware(routing);

export const config = {
  // Everything except Next internals, API routes, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
