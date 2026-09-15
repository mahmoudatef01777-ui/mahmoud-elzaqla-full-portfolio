#!/usr/bin/env node
/**
 * Pre-deploy audit. Drives the built site in Chrome and reports, per route:
 *
 *   - console errors and page errors
 *   - horizontal overflow at 1440 / 1024 / 768 / 390, in Arabic and English
 *   - images with no alt, no width/height, or a missing file
 *   - links that point at a route the app does not serve
 *   - the word "profit" anywhere in the rendered text
 *
 *   npm run audit                      # against the preview server
 *   npm run audit -- --url=http://localhost:4173
 *
 * It exits non-zero if anything in the first four categories fails, so it can
 * gate a deploy.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const BASE = (args.url || 'http://localhost:4173').replace(/\/$/, '');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];
async function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* next */
    }
  }
  throw new Error('Chrome not found.');
}

const ROUTES = [
  '/', '/projects', '/background', '/about', '/landing',
  '/work/bloomy', '/work/cove', '/work/veloura', '/work/fakhama',
  '/work/dahab-decor', '/work/el-haramein', '/work/brilliant',
  '/work/yours-shoes', '/work/kayan', '/work/asloaraby',
];
const WIDTHS = [1440, 1024, 768, 390];
const LANGS = ['ar', 'en'];

const problems = { console: [], overflow: [], images: [], links: [], profit: [] };

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  args: ['--no-sandbox'],
});
const page = await browser.newPage();

const seen = new Set();
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') {
    const text = m.text();
    // The dev overlay and favicon 404s on a preview build are noise.
    if (/favicon\.ico/.test(text)) return;
    const key = page.url() + '|' + text;
    if (seen.has(key)) return;
    seen.add(key);
    problems.console.push(`${page.url()}  [${m.type()}] ${text}`);
  }
});
page.on('pageerror', (e) => problems.console.push(`${page.url()}  [pageerror] ${e.message}`));
page.on('requestfailed', (r) => {
  const u = r.url();
  if (u.startsWith(BASE)) problems.console.push(`${page.url()}  [404?] ${u}`);
});

const known = new Set();
for (const r of ROUTES) {
  known.add(r);
  known.add('/en' + (r === '/' ? '' : r));
}
known.add('/en');

for (const lang of LANGS) {
  for (const route of ROUTES) {
    const path = lang === 'en' ? '/en' + (route === '/' ? '' : route) : route;
    const url = BASE + path;

    for (const width of WIDTHS) {
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 450));

      const over = await page.evaluate(() => {
        const de = document.documentElement;
        const diff = de.scrollWidth - de.clientWidth;
        if (diff <= 1) return null;
        // Name the widest offender so the fix has somewhere to go.
        let worst = null;
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          const spill = Math.max(r.right - de.clientWidth, -r.left);
          if (spill > 1 && (!worst || spill > worst.spill)) {
            worst = {
              spill: Math.round(spill),
              tag: el.tagName.toLowerCase(),
              cls: (el.className || '').toString().slice(0, 70),
            };
          }
        }
        return { diff, worst };
      });
      if (over) {
        problems.overflow.push(
          `${path} @${width}  +${over.diff}px  ${over.worst ? over.worst.tag + '.' + over.worst.cls : '?'}`,
        );
      }
    }

    // One pass at desktop for content-level checks.
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 450));

    const found = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')].map((i) => ({
        src: i.getAttribute('src') || '',
        alt: i.getAttribute('alt'),
        hasDims: !!(i.getAttribute('width') && i.getAttribute('height')),
        broken: i.complete && i.naturalWidth === 0,
        hidden: i.getAttribute('aria-hidden') === 'true',
      }));
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      return { imgs, links, text: document.body.innerText };
    });

    for (const i of found.imgs) {
      if (i.broken) problems.images.push(`${path}  BROKEN  ${i.src}`);
      if (i.alt === null && !i.hidden) problems.images.push(`${path}  NO ALT  ${i.src}`);
      if (!i.hasDims) problems.images.push(`${path}  NO W/H  ${i.src}`);
    }
    for (const href of found.links) {
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) continue;
      const clean = href.split('#')[0].replace(/\/$/, '') || '/';
      if (!known.has(clean)) problems.links.push(`${path}  ->  ${href}`);
    }
    if (/\bprofit\b/i.test(found.text) || /أرباح|الربح/.test(found.text)) {
      const m = found.text.match(/.{0,60}(profit|أرباح|الربح).{0,60}/i);
      problems.profit.push(`${path}  ...${m ? m[0].replace(/\n/g, ' ') : ''}...`);
    }
  }
}

await browser.close();

let failed = false;
for (const [name, list] of Object.entries(problems)) {
  const unique = [...new Set(list)];
  console.log(`\n=== ${name.toUpperCase()} (${unique.length}) ===`);
  if (!unique.length) console.log('  clean');
  for (const l of unique.slice(0, 40)) console.log('  ' + l);
  if (unique.length > 40) console.log(`  ... and ${unique.length - 40} more`);
  if (unique.length && name !== 'profit') failed = true;
}
process.exit(failed ? 1 : 0);
