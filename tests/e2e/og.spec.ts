import { expect, test } from '@playwright/test';

// Per-page Open Graph cards (scripts/generate-og.mjs): every page points at its
// own card, and the card is a real 1200×630 JPEG.
const PAGES = [
  ['/ar', '/og/ar/index.jpg'],
  ['/en/about', '/og/en/about.jpg'],
  [
    '/ar/news/arbitration-office-inaugurated',
    '/og/ar/news/arbitration-office-inaugurated.jpg',
  ],
  [
    '/en/research/al-ahgaff-journal-issue-2',
    '/og/en/research/al-ahgaff-journal-issue-2.jpg',
  ],
  [
    '/ar/training/arbitration-diploma',
    '/og/ar/training/arbitration-diploma.jpg',
  ],
] as const;

for (const [page, card] of PAGES) {
  test(`og:image for ${page} is its own card`, async ({ page: p, request }) => {
    await p.goto(page);
    const og = await p
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute('content');
    expect(og).toMatch(new RegExp(`${card.replace(/\./g, '\\.')}$`));
    const tw = await p
      .locator('meta[name="twitter:image"]')
      .first()
      .getAttribute('content');
    expect(tw).toBe(og);
    const res = await request.get(card);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toBe('image/jpeg');
  });
}
