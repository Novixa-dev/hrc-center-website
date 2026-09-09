import { expect, test } from '@playwright/test';

import { expectNoA11yViolations } from './_axe';

const locales = [
  {
    code: 'ar',
    h1: 'يسعدنا الاستماع إليك',
    nameLabel: 'الاسم الكامل',
    emailLabel: 'البريد الإلكتروني',
    subjectLabel: 'الموضوع',
    messageLabel: 'الرسالة',
    submitButton: 'إرسال الاستفسار',
    privacyH1: 'سياسة الخصوصية',
    a11yH1: 'بيان إمكانية الوصول',
  },
  {
    code: 'en',
    h1: 'We welcome your enquiries',
    nameLabel: 'Full name',
    emailLabel: 'Email address',
    subjectLabel: 'Subject',
    messageLabel: 'Message',
    submitButton: 'Send enquiry',
    privacyH1: 'Privacy Policy',
    a11yH1: 'Accessibility Statement',
  },
] as const;

for (const l of locales) {
  test.describe(`contact & utilities · ${l.code}`, () => {
    test('contact page has one h1, labels, and preselects subject query', async ({
      page,
    }) => {
      await page.goto(`/${l.code}/contact?subject=training`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.h1);

      // Visible labels
      await expect(page.getByLabel(l.nameLabel)).toBeVisible();
      await expect(page.getByLabel(l.emailLabel)).toBeVisible();
      await expect(page.getByLabel(l.subjectLabel)).toBeVisible();
      await expect(page.getByLabel(l.messageLabel)).toBeVisible();

      // Preselected subject
      const subjectSelect = page.getByLabel(l.subjectLabel);
      await expect(subjectSelect).toHaveValue('training');
    });

    test('submitting empty form displays validation feedback', async ({
      page,
    }) => {
      await page.goto(`/${l.code}/contact`);
      const submitBtn = page.getByRole('button', { name: l.submitButton });
      await submitBtn.click();

      // Live region or alerts become visible
      const alert = page.locator('form [aria-live="polite"]');
      await expect(alert).toBeVisible();
    });

    test('successful submission shows confirmation and can reset', async ({
      page,
    }) => {
      await page.goto(`/${l.code}/contact`);

      await page.getByLabel(l.nameLabel).fill('زائر تجريبي');
      await page.getByLabel(l.emailLabel).fill('visitor@example.com');
      await page
        .getByLabel(l.messageLabel)
        .fill(
          'هذه رسالة استفسار تجريبية تتجاوز عشرين حرفاً لغرض الاختبار المؤتمت.',
        );

      // Wait at least 3 seconds for anti-spam time-trap
      await page.waitForTimeout(3200);

      const submitBtn = page.getByRole('button', { name: l.submitButton });
      await submitBtn.click();

      const successRegion = page.locator('[role="status"]');
      await expect(successRegion).toBeVisible({ timeout: 8000 });
    });

    test('utility pages privacy and accessibility render cleanly', async ({
      page,
    }) => {
      await page.goto(`/${l.code}/privacy`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.privacyH1);

      await page.goto(`/${l.code}/accessibility`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toContainText(l.a11yH1);
    });

    test('axe check on contact, privacy, and accessibility', async ({
      page,
    }) => {
      await page.goto(`/${l.code}/contact`);
      await expectNoA11yViolations(page);

      await page.goto(`/${l.code}/privacy`);
      await expectNoA11yViolations(page);

      await page.goto(`/${l.code}/accessibility`);
      await expectNoA11yViolations(page);
    });
  });
}
