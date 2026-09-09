import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const L = {
  ar: {
    servicesH1: 'ماذا نقدّم للجهات والباحثين',
    service1: 'البحث والدراسات',
    trainingH1: 'برامج تُعِدُّ جيلاً من الكوادر',
    filterField: 'المجال',
    open: 'التسجيل مفتوح',
    empty: 'لا توجد دفعات مفتوحة حالياً',
    program: 'الدبلوم المتوسط في اللغة الإنجليزية',
    provisional: 'أولية',
  },
  en: {
    servicesH1: 'What we offer organizations and researchers',
    service1: 'Research & studies',
    trainingH1: 'Programs that prepare a generation of local talent',
    filterField: 'Field',
    open: 'Enrolling',
    empty: 'No open intakes right now',
    program: 'Intermediate English Diploma',
    provisional: 'provisional',
  },
} as const;

for (const loc of ['ar', 'en'] as const) {
  const l = L[loc];

  test.describe(`services · ${loc}`, () => {
    test.beforeEach(({ page }) => page.goto(`/${loc}/services`));

    test('one h1 and the 7 service headings', async ({ page }) => {
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.servicesH1);
      await expect(
        page.getByRole('heading', { level: 2, name: l.service1 }),
      ).toBeVisible();
      // 7 services + the CTA-band heading + 2 footer column headings.
      await expect(page.getByRole('heading', { level: 2 })).toHaveCount(10);
    });

    test('nav marks Services as current, breadcrumb ends here', async ({
      page,
    }) => {
      await expect(
        page
          .getByRole('navigation')
          .getByRole('link', { name: loc === 'ar' ? 'الخدمات' : 'Services' })
          .first(),
      ).toHaveAttribute('aria-current', 'page');
      await expect(page.locator('[aria-current="page"]').last()).toBeVisible();
    });

    test('axe clean', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });

  test.describe(`training · ${loc}`, () => {
    test('catalog: h1, filter bar, 4 program cards', async ({ page }) => {
      await page.goto(`/${loc}/training`);
      await expect(page.locator('h1')).toContainText(l.trainingH1);
      await expect(
        page.getByText(l.filterField, { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: new RegExp(l.program) }),
      ).toBeVisible();
    });

    test('filter is deep-linkable and shows the empty state for open', async ({
      page,
    }) => {
      await page.goto(`/${loc}/training?status=open`);
      await expect(page.getByRole('heading', { name: l.empty })).toBeVisible();
      // the "open" chip reflects the URL
      await expect(page.getByRole('button', { name: l.open })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });

    test('toggling a chip updates the URL and result count', async ({
      page,
    }) => {
      await page.goto(`/${loc}/training`);
      await page.getByRole('button', { name: l.open }).click();
      await expect(page).toHaveURL(/status=open/);
      await expect(page.getByRole('heading', { name: l.empty })).toBeVisible();
    });

    test('catalog axe clean', async ({ page }) => {
      await page.goto(`/${loc}/training`);
      await expectNoA11yViolations(page);
    });

    test('program detail: h1, KeyFacts, Course JSON-LD, provisional note', async ({
      page,
    }) => {
      await page.goto(`/${loc}/training/english-diploma`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.program);
      await expect(page.getByText(l.provisional)).toBeVisible();
      const ld = (
        await page
          .locator('script[type="application/ld+json"]')
          .allTextContents()
      ).join(' ');
      expect(ld).toContain('"Course"');
      await expectNoA11yViolations(page);
    });
  });
}
