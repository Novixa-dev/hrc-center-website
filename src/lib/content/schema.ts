import { z } from 'zod';

/**
 * An ISO `YYYY-MM-DD` date. YAML frontmatter parsers turn a bare `2024-09-01`
 * into a `Date`, so normalize that back to the string form before validating.
 */
export const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().date(),
);

/** Shared frontmatter for every collection item. */
export const baseFrontmatter = z.object({
  title: z.string().min(1),
  /** Short plain-text summary for cards + meta descriptions. */
  summary: z.string().min(1),
  /** Sort key (lower = earlier). */
  order: z.number().int().default(0),
  /** Marks content drawn from research but not yet confirmed by HRC. */
  provisional: z.boolean().default(false),
  /** ISO date; optional for undated items. */
  date: isoDate.optional(),
});

export const programStatus = z.enum(['open', 'upcoming', 'archived']);
export type ProgramStatus = z.infer<typeof programStatus>;

export const programFrontmatter = baseFrontmatter.extend({
  /** Broad field, for filtering. e.g. "languages", "design", "digital-skills". */
  field: z.string().min(1),
  format: z.enum(['in-person', 'online', 'hybrid']).optional(),
  status: programStatus.default('archived'),
  /** Human string, e.g. "فصلان دراسيان" / "Two terms". */
  duration: z.string().optional(),
  /** Human string, e.g. "مساءً، ثلاثة أيام أسبوعياً". */
  schedule: z.string().optional(),
  /** Language(s) of instruction. */
  language: z.string().optional(),
  certificate: z.boolean().optional(),
  /** Fee note; omit entirely rather than guess. */
  cost: z.string().optional(),
  /** Award name, e.g. "دبلوم" / "diploma" / "course". */
  award: z.string().optional(),
});

export type ProgramFrontmatter = z.infer<typeof programFrontmatter>;

export const publicationKind = z.enum([
  'journal-issue',
  'book',
  'report',
  'paper',
]);
export type PublicationKind = z.infer<typeof publicationKind>;

export const publicationFrontmatter = baseFrontmatter.extend({
  kind: publicationKind,
  /** Journal name / publisher / series — the container the work sits in. */
  venue: z.string().optional(),
  /** Named authors/editors, only where confirmed. */
  authors: z.array(z.string().min(1)).optional(),
  /** DOI without the `https://doi.org/` prefix. */
  doi: z.string().optional(),
  /** External URL (publisher page, PDF, OJS). */
  url: z.string().url().optional(),
  /** Issue label for a journal issue, e.g. "العدد الأول" / "Issue 1". */
  issue: z.string().optional(),
});

export type PublicationFrontmatter = z.infer<typeof publicationFrontmatter>;

export const conferenceStatus = z.enum(['upcoming', 'past', 'planned']);
export type ConferenceStatus = z.infer<typeof conferenceStatus>;

export const conferenceFrontmatter = baseFrontmatter.extend({
  status: conferenceStatus.default('planned'),
  /** ISO date. `Event` JSON-LD is emitted only when startDate AND location exist. */
  startDate: isoDate.optional(),
  endDate: isoDate.optional(),
  /** Venue / city. */
  location: z.string().optional(),
  /** Conference theme / track line. */
  theme: z.string().optional(),
});

export type ConferenceFrontmatter = z.infer<typeof conferenceFrontmatter>;

export const newsFrontmatter = baseFrontmatter.extend({
  /** Every news item is dated (overrides the optional base `date`). */
  date: isoDate,
  /** Free-form tags for the list filter, e.g. ["journal", "training"]. */
  tags: z.array(z.string().min(1)).default([]),
});

export type NewsFrontmatter = z.infer<typeof newsFrontmatter>;
