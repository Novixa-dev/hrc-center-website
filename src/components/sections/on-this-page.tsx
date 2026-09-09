import { getTranslations } from 'next-intl/server';

type Item = { id: string; label: string };

/**
 * Section index. Sticky rail on desktop, a `<details>` disclosure on mobile
 * (works without JS). Anchors rely on `scroll-mt` on each section.
 */
export async function OnThisPage({ items }: { items: Item[] }) {
  const t = await getTranslations('common');

  const list = (
    <ul className="space-y-1 text-sm">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            className="block rounded-sm px-2 py-1.5 text-text-muted no-underline hover:bg-surface-muted hover:text-heading"
          >
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <details className="mb-(--space-6) rounded-md border border-border bg-surface p-2 lg:hidden">
        <summary className="cursor-pointer px-2 py-1.5 text-sm font-semibold text-heading">
          {t('onThisPage')}
        </summary>
        <div className="mt-1">{list}</div>
      </details>

      <nav
        aria-label={t('onThisPage')}
        className="sticky top-[calc(var(--header-height)+var(--space-5))] hidden lg:block"
      >
        <p className="mb-2 text-xs font-(--font-mono) tracking-(--tracking-overline) text-text-muted uppercase">
          {t('onThisPage')}
        </p>
        {list}
      </nav>
    </>
  );
}
