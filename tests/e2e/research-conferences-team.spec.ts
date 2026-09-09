import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const L = {
  ar: {
    researchH1: 'بحثٌ علميٌّ في خدمة حضرموت',
    journalHeading: 'مجلة الأحقاف للعلوم الاجتماعية',
    issueTitle: 'مجلة الأحقاف للعلوم الاجتماعية — العدد الأول',
    confH1: 'مؤتمراتٌ وندواتٌ وورشُ عملٍ علمية',
    confStatus: 'قيد الإعداد',
    confTitle: 'المؤتمر العلمي الثاني',
    confTba: 'يُعلَن لاحقاً',
    teamH1: 'مَن وراء المركز',
    teamPending: 'يُعلَن التعيين قريباً',
    teamRole: 'المدير التنفيذي',
  },
  en: {
    researchH1: 'Research in the service of Hadramout',
    journalHeading: 'Al-Ahgaff Journal for Social Sciences',
    issueTitle: 'Al-Ahgaff Journal for Social Sciences — Issue 1',
    confH1: 'Conferences, seminars and scholarly workshops',
    confStatus: 'In preparation',
    confTitle: 'The Second Scientific Conference',
    confTba: 'To be announced',
    teamH1: 'The people behind the Center',
    teamPending: 'Appointment announced soon',
    teamRole: 'Executive Director',
  },
} as const;

// Client-brief names that must never render (docs/research/02 §Leadership).
const FORBIDDEN_NAMES = /Maknoon|Bin-?Dohry|Baharoon|مكنون|بن دحري/;

for (const loc of ['ar', 'en'] as const) {
  const l = L[loc];

  test.describe(`research · ${loc}`, () => {
    test.beforeEach(({ page }) => page.goto(`/${loc}/research`));

    test('h1, journal section, submission email', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText(l.researchH1);
      await expect(
        page.getByRole('heading', { level: 2, name: l.journalHeading }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'law.m@ahgaff.edu' }),
      ).toHaveAttribute('href', 'mailto:law.m@ahgaff.edu');
    });

    test('editorial board link is external to the university', async ({
      page,
    }) => {
      const board = page.getByRole('link', {
        name:
          loc === 'ar'
            ? 'الاطّلاع على هيئة التحرير'
            : 'View the editorial board',
      });
      await expect(board).toHaveAttribute('href', /ahgaff\.edu/);
      await expect(board).toHaveAttribute('target', '_blank');
    });

    test('issue card links to the publication detail', async ({ page }) => {
      await page.getByRole('link', { name: new RegExp(l.issueTitle) }).click();
      await expect(page).toHaveURL(/\/research\/al-ahgaff-journal-issue-1$/);
      await expect(page.locator('h1')).toHaveText(l.issueTitle);
    });

    test('emits CollectionPage JSON-LD', async ({ page }) => {
      const ld = (
        await page
          .locator('script[type="application/ld+json"]')
          .allTextContents()
      ).join(' ');
      expect(ld).toContain('"CollectionPage"');
    });

    test('axe clean (overview + detail)', async ({ page }) => {
      await expectNoA11yViolations(page);
      await page.goto(`/${loc}/research/class-and-politics`);
      await expect(page.getByText(FORBIDDEN_NAMES)).toHaveCount(0);
      await expectNoA11yViolations(page);
    });
  });

  test.describe(`conferences · ${loc}`, () => {
    test.beforeEach(({ page }) => page.goto(`/${loc}/conferences`));

    test('h1 and the in-preparation conference', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText(l.confH1);
      await expect(
        page.getByRole('link', { name: new RegExp(l.confTitle) }),
      ).toBeVisible();
      await expect(page.getByText(l.confStatus).first()).toBeVisible();
    });

    test('past section points to news', async ({ page }) => {
      await expect(
        page.getByRole('link', {
          name: loc === 'ar' ? 'أخبار المركز' : 'Center news',
        }),
      ).toBeVisible();
    });

    test('event detail has no Event JSON-LD without a date and place', async ({
      page,
    }) => {
      await page.goto(`/${loc}/conferences/second-scientific-conference`);
      await expect(page.locator('h1')).toHaveText(l.confTitle);
      await expect(page.getByText(l.confTba).first()).toBeVisible();
      const ld = (
        await page
          .locator('script[type="application/ld+json"]')
          .allTextContents()
      ).join(' ');
      expect(ld).not.toContain('"Event"');
      expect(ld).toContain('"BreadcrumbList"');
      await expectNoA11yViolations(page);
    });

    test('axe clean', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });

  test.describe(`team · ${loc}`, () => {
    test.beforeEach(({ page }) => page.goto(`/${loc}/team`));

    test('h1, pending note, roles — and no unconfirmed names', async ({
      page,
    }) => {
      await expect(page.locator('h1')).toHaveText(l.teamH1);
      await expect(page.getByText(l.teamPending).first()).toBeVisible();
      await expect(page.getByText(l.teamRole).first()).toBeVisible();
      await expect(page.getByText(FORBIDDEN_NAMES)).toHaveCount(0);
    });

    test('nav marks Team as current, breadcrumb ends here', async ({
      page,
    }) => {
      await expect(page.locator('ol [aria-current="page"]')).toBeVisible();
    });

    test('axe clean', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });
}
