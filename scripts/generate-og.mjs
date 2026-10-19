#!/usr/bin/env node
/**
 * Per-page Open Graph images (1200×630) for every route in both locales.
 *
 * Satori (next/og) cannot shape Arabic, so the cards are rendered by a real
 * Chromium (Playwright) from an HTML template with the site's own typefaces,
 * and written to public/og/<locale><path>.jpg (home → index.jpg).
 * buildMetadata() points og:image / twitter:image at these files when they
 * exist and falls back to the brand card otherwise.
 *
 * Usage: node scripts/generate-og.mjs   (run before `pnpm build`; CI does)
 */
import fs from 'node:fs';
import path from 'node:path';

import { chromium } from '@playwright/test';
import matter from 'gray-matter';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'public', 'og');
const LOCALES = ['ar', 'en'];
const DOMAIN = 'hrc.novixa.dev';

const messages = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    JSON.parse(
      fs.readFileSync(path.join(ROOT, 'src/messages', `${l}.json`), 'utf8'),
    ),
  ]),
);

/** Static routes: path → message namespace holding { eyebrow, title }. */
const STATIC = [
  ['', 'home', 'hero'],
  ['/about', 'about', 'header'],
  ['/services', 'services', 'header'],
  ['/training', 'training', 'header'],
  ['/research', 'research', 'header'],
  ['/conferences', 'conferences', 'header'],
  ['/team', 'team', 'header'],
  ['/news', 'news', 'header'],
  ['/contact', 'contact', 'header'],
  ['/privacy', 'privacy', 'header'],
  ['/accessibility', 'accessibility', 'header'],
];

/** Collections: content dir → route prefix + the namespace whose eyebrow labels it. */
const COLLECTIONS = [
  ['news', '/news', 'news'],
  ['programs', '/training', 'training'],
  ['publications', '/research', 'research'],
  ['conferences', '/conferences', 'conferences'],
];

function pages() {
  const list = [];
  for (const locale of LOCALES) {
    const m = messages[locale];
    for (const [p, ns, block] of STATIC) {
      const b = m[ns]?.[block] ?? {};
      list.push({
        locale,
        path: p,
        eyebrow: b.eyebrow ?? '',
        title: b.title ?? '',
      });
    }
    for (const [dir, prefix, ns] of COLLECTIONS) {
      const base = path.join(ROOT, 'src/content', dir, locale);
      if (!fs.existsSync(base)) continue;
      for (const file of fs
        .readdirSync(base)
        .filter((f) => f.endsWith('.md'))) {
        const { data } = matter(fs.readFileSync(path.join(base, file), 'utf8'));
        list.push({
          locale,
          path: `${prefix}/${file.replace(/\.md$/, '')}`,
          eyebrow: m[ns]?.header?.eyebrow ?? '',
          title: String(data.title ?? ''),
        });
      }
    }
  }
  return list;
}

const esc = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  );

const MARK = `<svg width="64" height="64" viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="#1e3a5f"/><path d="M24 7 28.7 15 37.6 16.8 35.8 25.7 42 30 34.1 34.6 33.1 43.3 24 40.4 14.9 43.3 13.9 34.6 6 30 12.2 25.7 10.4 16.8 19.3 15Z" fill="none" stroke="#d8a24a" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="25" r="3.6" fill="#d8a24a"/></svg>`;

function html({ locale, eyebrow, title }) {
  const ar = locale === 'ar';
  const display = ar ? "'Amiri', serif" : "'EB Garamond', serif";
  const body = ar
    ? "'IBM Plex Sans Arabic', sans-serif"
    : "'Inter', sans-serif";
  const size = title.length > 70 ? 54 : title.length > 42 ? 64 : 76;
  return `<!doctype html><html lang="${locale}" dir="${ar ? 'rtl' : 'ltr'}"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=EB+Garamond:wght@600&family=IBM+Plex+Sans+Arabic:wght@400;600&family=Inter:wght@400;600&display=block" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
html,body{overflow:hidden}
body{width:1200px;height:630px;overflow:hidden;font-family:${body};color:#f2f5f9;
background:radial-gradient(900px 640px at ${ar ? '0%' : '100%'} 0%,#24456b 0%,#16304c 48%,#0f1e30 100%);}
.wrap{position:relative;overflow:hidden;height:100%;padding:72px 84px;display:flex;flex-direction:column;justify-content:space-between}
.motif{position:absolute;${ar ? 'left' : 'right'}:-90px;bottom:-110px;opacity:.07}
.brand{display:flex;align-items:center;gap:20px}
.names{display:flex;flex-direction:column;gap:4px}
.n1{font-size:30px;font-weight:600;color:#fff}
.n2{font-size:19px;letter-spacing:${ar ? '0' : '.04em'};color:#a9b6c6}
.eyebrow{font-size:26px;font-weight:600;color:#e9b667;letter-spacing:${ar ? '0' : '.12em'};text-transform:uppercase}
h1{font-family:${display};font-weight:${ar ? 700 : 600};font-size:${size}px;line-height:${ar ? 1.45 : 1.12};
max-width:1010px;margin-top:18px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.foot{display:flex;align-items:center;justify-content:space-between;font-size:22px;color:#a9b6c6}
.rule{width:120px;height:4px;border-radius:2px;background:#a16207;margin-top:30px}
.domain{direction:ltr;font-family:'Inter',sans-serif;letter-spacing:.02em}
</style></head><body><div class="wrap">
<svg class="motif" width="520" height="520" viewBox="0 0 48 48"><path d="M24 7 28.7 15 37.6 16.8 35.8 25.7 42 30 34.1 34.6 33.1 43.3 24 40.4 14.9 43.3 13.9 34.6 6 30 12.2 25.7 10.4 16.8 19.3 15Z" fill="none" stroke="#e9b667" stroke-width="1.2"/></svg>
<div class="brand">${MARK}<div class="names"><div class="n1">${ar ? 'مركز بحوث حضرموت' : 'Hadramout Research Center'}</div><div class="n2">${ar ? 'Hadramout Research Center' : 'مركز بحوث حضرموت'}</div></div></div>
<div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><div class="rule"></div></div>
<div class="foot"><span>${ar ? 'جامعة الأحقاف · المكلا، حضرموت' : 'Al-Ahgaff University · Mukalla, Hadramout'}</span><span class="domain">${DOMAIN}</span></div>
</div></body></html>`;
}

const outFile = ({ locale, path: p }) =>
  path.join(OUT, locale, `${p || '/index'}.jpg`);

const list = pages();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let done = 0;
for (const item of list) {
  await page.setContent(html(item), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const file = outFile(item);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, type: 'jpeg', quality: 88 });
  done += 1;
}
await browser.close();
console.log(`og: ${done} images → public/og/`);
