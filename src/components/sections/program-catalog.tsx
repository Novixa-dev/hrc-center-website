import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

import { RevealList } from '@/components/motion/reveal-list';
import { FilterBar } from '@/components/sections/filter-bar';
import { ProgramCard } from '@/components/sections/program-card';
import { Button } from '@/components/ui/button';
import type { CollectionItem } from '@/lib/content/collection';
import type { ProgramFrontmatter } from '@/lib/content/schema';

type ProgramCatalogProps = {
  all: CollectionItem<ProgramFrontmatter>[];
  fields: string[];
  activeFields: string[];
  activeStatuses: string[];
};

export async function ProgramCatalog({
  all,
  fields,
  activeFields,
  activeStatuses,
}: ProgramCatalogProps) {
  const t = await getTranslations('training');
  const messages = (await getMessages()) as { training: unknown };

  const filtered = all.filter((p) => {
    const fieldOk =
      activeFields.length === 0 || activeFields.includes(p.frontmatter.field);
    const statusOk =
      activeStatuses.length === 0 ||
      activeStatuses.includes(p.frontmatter.status);
    return fieldOk && statusOk;
  });

  return (
    <div>
      {/* FilterBar is a client island; give it just the `training` namespace. */}
      <NextIntlClientProvider messages={{ training: messages.training }}>
        <FilterBar fields={fields} count={filtered.length} />
      </NextIntlClientProvider>

      {filtered.length === 0 ? (
        <div className="mt-(--space-7) rounded-lg border border-border bg-surface-muted p-(--space-7) text-center">
          <h2 className="text-xl">{t('empty.title')}</h2>
          <p className="mx-auto mt-(--space-3) max-w-[46ch] text-text-muted">
            {t('empty.body')}
          </p>
          <div className="mt-(--space-5) flex justify-center">
            <Button as="link" href="/contact">
              {t('empty.cta')}
            </Button>
          </div>
        </div>
      ) : (
        <RevealList className="mt-(--space-7) grid gap-(--space-5) sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </RevealList>
      )}
    </div>
  );
}
