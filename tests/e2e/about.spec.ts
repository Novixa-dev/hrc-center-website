import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const locales = [
  {
    code: 'ar',
    h1: 'مركزٌ علميٌّ في خدمة حضرموت',
    vision: 'التميز والريادة في البحوث',
    dept: 'قسم التدريب المهني والتقني والفني',
    nav: 'عن المركز',
  },
  {
    code: 'en',
    h1: 'A scholarly center in the service of Hadramout',
    vision: 'Excellence and leadership in research',
    dept: 'Vocational, Technical & Professional Training',
    nav: 'About',
  },
] as const;

for (const l of locales) {
  test.describe(`about · ${l.code}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${l.code}/about`);
    });

    test('one h1 = the page title', async ({ page }) => {
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.h1);
    });

    test('shows the verbatim vision and a department name', async ({
      page,
    }) => {
      await expect(page.getByText(l.vision)).toBeVisible();
      await expect(page.getByText(l.dept)).toBeVisible();
    });

    test('breadcrumb ends on the current page', async ({ page }) => {
      // scope to the breadcrumb <ol> — the header nav link also carries
      // aria-current but is display:none below lg
      const current = page.locator('ol [aria-current="page"]');
      await expect(current).toBeVisible();
    });

    test('governance section names no unconfirmed people', async ({ page }) => {
      const body = await page.locator('#governance').innerText();
      // Placeholder director/board names from the brief must not appear.
      expect(body).not.toMatch(/Maknoon|Bin-?Dohry|Baharoon|مكنون|بن دحري/i);
    });

    test('nav marks About as current', async ({ page }) => {
      const about = page
        .getByRole('navigation')
        .getByRole('link', { name: l.nav })
        .first();
      await expect(about).toHaveAttribute('aria-current', 'page');
    });

    test('emits AboutPage + BreadcrumbList JSON-LD', async ({ page }) => {
      const scripts = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const joined = scripts.join(' ');
      expect(joined).toContain('"AboutPage"');
      expect(joined).toContain('"BreadcrumbList"');
    });

    test('no serious/critical a11y violations', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });
}
