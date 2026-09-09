import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/** Scan the current page; fail on any serious/critical violation. */
export async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );

  if (blocking.length > 0) {
    console.error(
      'Accessibility violations:\n' +
        blocking
          .map(
            (v) =>
              `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`,
          )
          .join('\n'),
    );
  }

  expect(blocking, 'no serious/critical accessibility violations').toEqual([]);
}
