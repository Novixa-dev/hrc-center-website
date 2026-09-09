import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const locales = [
  { code: 'ar', dir: 'rtl', h1: 'منارة', nav: 'عن المركز' },
  { code: 'en', dir: 'ltr', h1: 'knowledge beacon', nav: 'About' },
] as const;

test.describe('bilingual shell', () => {
  test('/ redirects to a locale', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.url()).toMatch(/\/(ar|en)$/);
  });

  for (const l of locales) {
    test.describe(`locale: ${l.code}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(`/${l.code}`);
      });

      test('sets lang and dir on <html>', async ({ page }) => {
        const html = page.locator('html');
        await expect(html).toHaveAttribute('lang', l.code);
        await expect(html).toHaveAttribute('dir', l.dir);
      });

      test('has exactly one h1 with the hero title', async ({ page }) => {
        const h1s = page.locator('h1');
        await expect(h1s).toHaveCount(1);
        await expect(h1s.first()).toContainText(l.h1, { ignoreCase: true });
      });

      test('primary navigation is present', async ({ page }) => {
        await expect(
          page.getByRole('navigation').getByText(l.nav).first(),
        ).toBeVisible();
      });

      test('skip link is the first focusable element', async ({ page }) => {
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        await expect(focused).toHaveAttribute('href', '#main');
      });

      test('locale switcher keeps you on the same page', async ({ page }) => {
        const other = l.code === 'ar' ? 'en' : 'ar';
        const visibleSwitch = page.locator(`button[lang="${other}"]:visible`);
        if ((await visibleSwitch.count()) === 0) {
          // below lg the switcher lives inside the mobile nav sheet
          await page
            .getByRole('button', {
              name: l.code === 'ar' ? 'فتح القائمة' : 'Open menu',
            })
            .click();
        }
        await visibleSwitch.first().click();
        await expect(page).toHaveURL(new RegExp(`/${other}$`));
      });

      test('respects prefers-reduced-motion media query', async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(`/${l.code}`);
        const revealCount = await page.locator('[data-reveal]').count();
        expect(revealCount).toBe(0);
      });

      test('has no serious or critical a11y violations', async ({ page }) => {
        await expectNoA11yViolations(page);
      });
    });
  }
});

test('localized 404', async ({ page }) => {
  const res = await page.goto('/ar/this-route-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toBeVisible();
});

test('renders full document and forms without client JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/ar');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'استكشف' })).toBeVisible();

  await page.goto('/ar/contact');
  await expect(page.locator('form')).toBeVisible();
  await expect(page.getByLabel('الاسم الكامل')).toBeVisible();
  await context.close();
});
