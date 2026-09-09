/** Primary navigation. `key` maps to messages `nav.<key>`. Order is meaningful. */
export const primaryNav = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'training', href: '/training' },
  { key: 'research', href: '/research' },
  { key: 'conferences', href: '/conferences' },
  { key: 'team', href: '/team' },
  { key: 'news', href: '/news' },
] as const;

export type NavKey = (typeof primaryNav)[number]['key'];

/**
 * Routes not built yet (Sprints 3–6). Links to these render without prefetch so
 * Next doesn't fire background requests to routes that 404. Remove a path from
 * this set in the sprint that ships its page.
 */
export const routesInProgress = new Set<string>([
  // All routes are live! (S3: about, S4: services/training,
  // S5: research/conferences/team, S6: news/contact/privacy/accessibility)
]);

/** Whether a route should be prefetched (false while it's still in progress). */
export function shouldPrefetch(href: unknown): boolean {
  if (typeof href !== 'string') return true;
  const pathname = href.split(/[?#]/)[0] ?? href;
  return !routesInProgress.has(pathname);
}
