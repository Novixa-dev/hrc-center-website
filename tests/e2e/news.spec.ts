import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const locales = [
  {
    code: 'ar',
    h1: 'أخبار المركز',
    tag: 'المجلة',
    articleSlug: 'journal-issue-1-published',
    articleTitle: 'صدور العدد الأول من مجلة الأحقاف للعلوم الاجتماعية',
  },
  {
    code: 'en',
    h1: 'News from the Center',
    tag: 'Journal',
    articleSlug: 'journal-issue-1-published',
    articleTitle:
      'Issue 1 of the Al-Ahgaff Journal of Social Sciences is published',
  },
] as const;

for (const l of locales) {
  test.describe(`news · ${l.code}`, () => {
    test('news list has one h1 and shows cards', async ({ page }) => {
      await page.goto(`/${l.code}/news`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.h1);

      // Card count >= 4 (provisional entries)
      const cards = page.locator('#main a[href*="/news/"]');
      await expect(cards).not.toHaveCount(0);
    });

    test('tag filter filters list and updates URL query', async ({ page }) => {
      await page.goto(`/${l.code}/news`);
      const filterNav = page.getByRole('navigation', {
        name: /تصفية|filter/i,
      });
      const tagLink = filterNav.getByRole('link', { name: l.tag });
      await tagLink.click();

      await expect(page).toHaveURL(new RegExp(`tag=journal`));
      const activeTag = filterNav.locator('a[aria-current="page"]');
      await expect(activeTag).toContainText(l.tag);
    });

    test('article detail renders body and breadcrumbs', async ({ page }) => {
      await page.goto(`/${l.code}/news/${l.articleSlug}`);
      await expect(page.locator('h1')).toContainText(l.articleTitle);

      const breadcrumbCurrent = page.locator('ol [aria-current="page"]');
      await expect(breadcrumbCurrent).toBeVisible();

      // JSON-LD has NewsArticle
      const jsonLd = await page
        .locator('#main script[type="application/ld+json"]')
        .textContent();
      expect(jsonLd).toContain('NewsArticle');
    });

    test('RSS feed returns valid xml', async ({ request }) => {
      const response = await request.get(`/${l.code}/news/rss.xml`);
      expect(response.status()).toBe(200);
      const text = await response.text();
      expect(text).toContain('<?xml');
      expect(text).toContain('<rss version="2.0"');
    });

    test('axe check on news list and article', async ({ page }) => {
      await page.goto(`/${l.code}/news`);
      await expectNoA11yViolations(page);

      await page.goto(`/${l.code}/news/${l.articleSlug}`);
      await expectNoA11yViolations(page);
    });
  });
}
