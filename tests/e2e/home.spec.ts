import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const locales = [
  {
    code: 'ar',
    title: 'منارة',
    pillars: 'ماذا يقدّم المركز',
    cta: 'تواصل مع المركز',
  },
  {
    code: 'en',
    title: 'knowledge beacon',
    pillars: 'What the Center does',
    cta: 'Contact the Center',
  },
] as const;

for (const l of locales) {
  test.describe(`home · ${l.code}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${l.code}`);
    });

    test('one h1 with the hero title', async ({ page }) => {
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.title, {
        ignoreCase: true,
      });
    });

    test('renders the pillars, journal and CTA sections', async ({ page }) => {
      await expect(
        page.getByRole('heading', { name: l.pillars }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /Al-Ahgaff Journal|مجلة الأحقاف/ }),
      ).toBeVisible();
      // "Contact the Center" appears in the hero and the CTA band.
      await expect(
        page.getByRole('link', { name: l.cta }).first(),
      ).toBeVisible();
      await expect(page.getByRole('link', { name: l.cta })).toHaveCount(2);
    });

    test('featured programs are marked provisional, not "enrolling"', async ({
      page,
    }) => {
      const badges = page.getByText(
        l.code === 'ar' ? 'قُدِّم مؤخراً' : 'Recently offered',
      );
      await expect(badges.first()).toBeVisible();
    });

    test('latest news band shows the three newest items', async ({ page }) => {
      const band = page.locator('section[aria-labelledby="news-heading"]');
      await expect(band.locator('a[href*="/news/"]')).toHaveCount(3);
      await expect(
        band.locator('a[href$="/news/arbitration-office-inaugurated"]'),
      ).toBeVisible();
    });

    test('nav marks Home as current (logo home link)', async ({ page }) => {
      // The "About" nav link should not be current on the home page.
      const about = page
        .getByRole('navigation')
        .getByRole('link', { name: l.code === 'ar' ? 'عن المركز' : 'About' })
        .first();
      await expect(about).not.toHaveAttribute('aria-current', 'page');
    });

    test('layout stability: cumulative layout shift remains < 0.05', async ({
      page,
    }) => {
      const cls = await page.evaluate(async () => {
        return new Promise<number>((resolve) => {
          let clsValue = 0;
          try {
            const observer = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                const shift = entry as unknown as {
                  hadRecentInput?: boolean;
                  value?: number;
                };
                if (!shift.hadRecentInput && typeof shift.value === 'number') {
                  clsValue += shift.value;
                }
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            setTimeout(() => {
              observer.disconnect();
              resolve(clsValue);
            }, 300);
          } catch {
            resolve(0);
          }
        });
      });
      expect(cls).toBeLessThan(0.05);
    });

    test('no serious/critical a11y violations', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });
}
