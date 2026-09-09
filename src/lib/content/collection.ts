import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import type { z } from 'zod';

import type { Locale } from '@/i18n/routing';
import { renderMarkdown } from '@/lib/content/render';

const CONTENT_ROOT = join(process.cwd(), 'src', 'content');

export type CollectionItem<T> = {
  slug: string;
  locale: Locale;
  frontmatter: T;
  /** Rendered HTML of the markdown body ('' when the body is empty). */
  html: string;
};

/**
 * A file-backed content collection: `src/content/<name>/<locale>/<slug>.md`.
 * Frontmatter is Zod-validated at read time — an invalid file throws, which
 * fails the build.
 */
export function defineCollection<S extends z.ZodTypeAny>(
  name: string,
  schema: S,
) {
  type FM = z.infer<S>;

  function dir(locale: Locale) {
    return join(CONTENT_ROOT, name, locale);
  }

  function readOne(locale: Locale, slug: string): CollectionItem<FM> {
    const raw = readFileSync(join(dir(locale), `${slug}.md`), 'utf8');
    const { data, content } = matter(raw);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/${name}/${locale}/${slug}.md:\n` +
          parsed.error.issues
            .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
            .join('\n'),
      );
    }
    return {
      slug,
      locale,
      frontmatter: parsed.data as FM,
      html: content.trim() ? renderMarkdown(content) : '',
    };
  }

  function getSlugs(locale: Locale): string[] {
    return readdirSync(dir(locale))
      .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
      .map((f) => f.replace(/\.md$/, ''));
  }

  function getAll(locale: Locale): CollectionItem<FM>[] {
    return getSlugs(locale)
      .map((slug) => readOne(locale, slug))
      .sort(
        (a, b) =>
          (a.frontmatter as { order: number }).order -
          (b.frontmatter as { order: number }).order,
      );
  }

  function getBySlug(locale: Locale, slug: string): CollectionItem<FM> | null {
    try {
      return readOne(locale, slug);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
  }

  return { name, getAll, getBySlug, getSlugs };
}
