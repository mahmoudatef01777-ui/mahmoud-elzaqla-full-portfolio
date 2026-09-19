#!/usr/bin/env node
/**
 * Pre-launch audit. Drives the built site in Chrome and reports, per route:
 *
 *   - console errors, page errors and failed requests
 *   - horizontal overflow at nine widths, in both languages AND both themes
 *   - images with no alt, no width/height, or a file that did not load
 *   - links pointing at a route the app does not serve
 *   - heading hierarchy (no h1 / more than one h1 / a skipped level)
 *   - links and buttons with no accessible name
 *   - the word "profit" anywhere in the rendered text
 *
 *   npm run audit -- --url=http://localhost:4173
 *
 * SPEED. Each route/language is loaded ONCE; the widths and the themes are
 * then swept by resizing and by flipping `data-theme` on the same document.
 * Reloading for all 540 combinations would take half an hour and tell us
 * nothing extra — layout is recomputed either way.
 *
 * Exits non-zero if anything outside the "profit" list fails, so it can gate
 * a deploy.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';

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
function findChrome() {
  for (const p of CHROME_CANDIDATES) if (fs.existsSync(p)) return p;
  throw new Error('Chrome not found.');
}

const ROUTES = [
  '/', '/projects', '/background', '/about', '/landing',
  '/work/bloomy', '/work/cove', '/work/veloura', '/work/fakhama',
  '/work/dahab-decor', '/work/el-haramein', '/work/brilliant',
  '/work/yours-shoes', '/work/kayan', '/work/asloaraby',
];
const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const LANGS = ['ar', 'en'];
const THEMES = ['light', 'dark'];

const problems = {
  console: [], overflow: [], images: [], links: [], headings: [], labels: [], profit: [],
};
const add = (bucket, line) => problems[bucket].push(line);

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  args: ['--no-sandbox'],
});
const page = await browser.newPage();

let current = '';
const seen = new Set();
page.on('console', (m) => {
  if (m.type() !== 'error' && m.type() !== 'warning') return;
  const text = m.text();
  if (/favicon\.ico/.test(text)) return;
  const key = current + '|' + text;
  if (seen.has(key)) return;
  seen.add(key);
  add('console', `${current}  [${m.type()}] ${text}`);
});
page.on('pageerror', (e) => add('console', `${current}  [pageerror] ${e.message}`));
page.on('requestfailed', (r) => {
  if (r.url().startsWith(BASE)) add('console', `${current}  [failed] ${r.url()}`);
});

const known = new Set(['/ar']);
for (const r of ROUTES) {
  known.add(r);
  known.add('/ar' + (r === '/' ? '' : r));
}

for (const lang of LANGS) {
  for (const route of ROUTES) {
    const path = lang === 'ar' ? '/ar' + (route === '/' ? '' : route) : route;
    current = path;

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 500));

    // ---- content checks, once per route -------------------------------
    const found = await page.evaluate(() => {
      const imgs = [...document.querySelectorAll('img')].map((i) => ({
        src: i.getAttribute('src') || '',
        alt: i.getAttribute('alt'),
        dims: !!(i.getAttribute('width') && i.getAttribute('height')),
        broken: i.complete && i.naturalWidth === 0,
        hidden: i.getAttribute('aria-hidden') === 'true',
      }));
      const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));

      // A button or link takes its name from its CONTENTS too, so an <img>
      // with real alt text inside one is named. Counting only innerText
      // reported every image button on the site as unnamed.
      const name = (el) => {
        const own =
          el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || '';
        if (own.trim()) return own.trim();
        return [...el.querySelectorAll('img[alt]')]
          .map((i) => i.getAttribute('alt'))
          .join(' ')
          .trim();
      };
      const unnamed = [...document.querySelectorAll('a, button')]
        .filter((el) => !name(el) && el.offsetParent !== null)
        .map((el) => el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 50));

      const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
        Number(h.tagName[1]),
      );

      return { imgs, links, unnamed, levels, text: document.body.innerText };
    });

    for (const i of found.imgs) {
      if (i.broken) add('images', `${path}  BROKEN  ${i.src}`);
      if (i.alt === null && !i.hidden) add('images', `${path}  NO ALT  ${i.src}`);
      if (!i.dims) add('images', `${path}  NO W/H  ${i.src}`);
    }
    for (const href of found.links) {
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) continue;
      const clean = href.split('#')[0].replace(/\/$/, '') || '/';
      if (!known.has(clean)) add('links', `${path}  ->  ${href}`);
    }
    for (const u of found.unnamed) add('labels', `${path}  unnamed  ${u}`);

    const h1s = found.levels.filter((l) => l === 1).length;
    if (h1s === 0) add('headings', `${path}  no <h1>`);
    if (h1s > 1) add('headings', `${path}  ${h1s} <h1> elements`);
    for (let k = 1; k < found.levels.length; k += 1) {
      if (found.levels[k] - found.levels[k - 1] > 1) {
        add('headings', `${path}  h${found.levels[k - 1]} -> h${found.levels[k]}`);
        break;
      }
    }
    if (/\bprofit\b/i.test(found.text) || /أرباح|الربح/.test(found.text)) {
      const m = found.text.match(/.{0,50}(profit|أرباح|الربح).{0,50}/i);
      add('profit', `${path}  ...${m ? m[0].replace(/\n/g, ' ') : ''}...`);
    }

    // ---- the width x theme sweep, without reloading --------------------
    for (const theme of THEMES) {
      await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
      for (const width of WIDTHS) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        await new Promise((r) => setTimeout(r, 120));
        const over = await page.evaluate(() => {
          const de = document.documentElement;
          const diff = de.scrollWidth - de.clientWidth;
          if (diff <= 1) return null;
          let worst = null;
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (!r.width) continue;
            const spill = Math.max(r.right - de.clientWidth, -r.left);
            if (spill > 1 && (!worst || spill > worst.spill)) {
              worst = {
                spill: Math.round(spill),
                tag: el.tagName.toLowerCase(),
                cls: String(el.className).slice(0, 60),
              };
            }
          }
          return { diff, worst };
        });
        if (over) {
          add(
            'overflow',
            `${path} @${width} ${theme}  +${over.diff}px  ${
              over.worst ? over.worst.tag + '.' + over.worst.cls : '?'
            }`,
          );
        }
      }
    }
  }
}

await browser.close();

let failed = false;
for (const [name, list] of Object.entries(problems)) {
  const unique = [...new Set(list)];
  console.log(`\n=== ${name.toUpperCase()} (${unique.length}) ===`);
  if (!unique.length) console.log('  clean');
  for (const l of unique.slice(0, 30)) console.log('  ' + l);
  if (unique.length > 30) console.log(`  ... and ${unique.length - 30} more`);
  if (unique.length && name !== 'profit') failed = true;
}
console.log(
  `\nswept ${ROUTES.length} routes x ${LANGS.length} languages x ${WIDTHS.length} widths x ${THEMES.length} themes`,
);
process.exit(failed ? 1 : 0);
