import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const L = {
  ar: {
    researchH1: 'بحثٌ علميٌّ في خدمة حضرموت',
    journalHeading: 'مجلة الأحقاف للعلوم الاجتماعية',
    issueTitle: 'مجلة الأحقاف للعلوم الاجتماعية — العدد الأول',
    boardRole: 'رئيس التحرير',
    confH1: 'مؤتمراتٌ وندواتٌ وورشُ عملٍ علمية',
    confStatus: 'سابق',
    confTitle: 'المؤتمر العلمي الدولي الثاني: الحضارمة في شرق أفريقيا',
    confOnline: 'عن بُعد — منصة زوم',
    teamH1: 'مَن وراء المركز',
    teamPending: 'يُعلَن التعيين قريباً',
    teamRole: 'المدير التنفيذي',
  },
  en: {
    researchH1: 'Research in the service of Hadramout',
    journalHeading: 'Al-Ahgaff Journal of Social Sciences',
    issueTitle: 'Al-Ahgaff Journal of Social Sciences — Issue 1',
    boardRole: 'Editor-in-Chief',
    confH1: 'Conferences, seminars and scholarly workshops',
    confStatus: 'Past',
    confTitle: 'Second International Scientific Conference: Hadramis in East Africa',
    confOnline: 'Online (Zoom)',
    teamH1: 'The people behind the Center',
    teamPending: 'Appointment announced soon',
    teamRole: 'Executive Director',
  },
} as const;

// Client-brief spellings that no official source uses — they must never render.
// (Officially published names render with a source link; docs/research/02 §Refresh.)
const FORBIDDEN_NAMES = /Bin-?Dohry|بن دحري/;

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

    test('journal facts: ISSN, editorial board, criteria PDF', async ({
      page,
    }) => {
      await expect(page.getByText('E-ISSN 3106-9053')).toBeVisible();
      await expect(page.getByText(l.boardRole, { exact: true })).toBeVisible();
      const issn = page.getByRole('link', {
        name: loc === 'ar' ? 'السجل الدولي للرقم المعياري' : 'ISSN register entry',
      });
      await expect(issn).toHaveAttribute('href', /issn\.org/);
      await expect(issn).toHaveAttribute('target', '_blank');
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

    test('h1 and the held conference', async ({ page }) => {
      await expect(page.locator('h1')).toHaveText(l.confH1);
      await expect(
        page.getByRole('link', { name: new RegExp(l.confTitle) }),
      ).toBeVisible();
      await expect(page.getByText(l.confStatus).first()).toBeVisible();
    });

    test('past section lists the held conference', async ({ page }) => {
      const past = page.locator('section[aria-labelledby="past-h"]');
      await expect(
        past.getByRole('link', { name: new RegExp(l.confTitle) }),
      ).toBeVisible();
    });

    test('event detail: online Event JSON-LD and a source link', async ({
      page,
    }) => {
      await page.goto(`/${loc}/conferences/second-scientific-conference`);
      await expect(page.locator('h1')).toHaveText(l.confTitle);
      await expect(page.getByText(l.confOnline).first()).toBeVisible();
      const ld = (
        await page
          .locator('script[type="application/ld+json"]')
          .allTextContents()
      ).join(' ');
      expect(ld).toContain('"Event"');
      expect(ld).toContain('"VirtualLocation"');
      expect(ld).toContain('OnlineEventAttendanceMode');
      expect(ld).toContain('"BreadcrumbList"');
      await expect(page.locator('a[href*="iul1969.org"]')).toBeVisible();
      await expectNoA11yViolations(page);
    });

    test('axe clean', async ({ page }) => {
      await expectNoA11yViolations(page);
    });
  });

  test.describe(`team · ${loc}`, () => {
    test.beforeEach(({ page }) => page.goto(`/${loc}/team`));

    test('h1, roles, sourced names — and no unsourced spellings', async ({
      page,
    }) => {
      await expect(page.locator('h1')).toHaveText(l.teamH1);
      await expect(page.getByText(l.teamPending).first()).toBeVisible();
      await expect(page.getByText(l.teamRole).first()).toBeVisible();
      await expect(page.getByText(FORBIDDEN_NAMES)).toHaveCount(0);
      // Every published name carries a link to its official source.
      await expect(
        page.locator('#main a[href^="https://ahgaff.edu/"][target="_blank"]'),
      ).toHaveCount(4);
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
