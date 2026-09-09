import { defineCollection } from '@/lib/content/collection';
import { programFrontmatter, type ProgramStatus } from '@/lib/content/schema';
import type { Locale } from '@/i18n/routing';

export const programs = defineCollection('programs', programFrontmatter);

export type Program = ReturnType<typeof programs.getBySlug>;

const STATUS_RANK: Record<ProgramStatus, number> = {
  open: 0,
  upcoming: 1,
  archived: 2,
};

/** All programs, ordered by status (open first) then `order`. */
export function getPrograms(locale: Locale) {
  return programs
    .getAll(locale)
    .sort(
      (a, b) =>
        STATUS_RANK[a.frontmatter.status] - STATUS_RANK[b.frontmatter.status] ||
        a.frontmatter.order - b.frontmatter.order,
    );
}

/** Up to `limit` programs for the Home feature — prefer open/upcoming. */
export function getFeaturedPrograms(locale: Locale, limit = 3) {
  return getPrograms(locale).slice(0, limit);
}

/** Distinct `field` values present, for the filter bar. */
export function getProgramFields(locale: Locale): string[] {
  return [
    ...new Set(programs.getAll(locale).map((p) => p.frontmatter.field)),
  ].sort();
}
