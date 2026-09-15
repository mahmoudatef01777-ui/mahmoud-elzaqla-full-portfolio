#!/usr/bin/env node
/**
 * Screenshots the running dev server at real device sizes.
 *
 *   npm run shoot                 # all four: ar/en x desktop/mobile
 *   npm run shoot -- --full       # full page instead of just the viewport
 *   npm run shoot -- --url=http://localhost:5173 --out=../shots
 *   npm run shoot -- --at=work        # park on one section instead of the top
 *
 * Uses the Chrome already installed on the machine — no browser download.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
];

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

const BASE = args.url || process.env.PREVIEW_URL || `http://localhost:${process.env.PORT || 5173}`;
const OUT = path.resolve(args.out || 'shots');
const FULL = Boolean(args.full);

const ALL_VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false },
  laptop: { width: 1280, height: 800, deviceScaleFactor: 2, isMobile: false },
  small: { width: 1024, height: 768, deviceScaleFactor: 2, isMobile: false },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  'mobile-375': { width: 375, height: 812, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};

// Default to the two headline sizes; `--all` sweeps every breakpoint.
const VIEWPORTS = args.all
  ? ALL_VIEWPORTS
  : { desktop: ALL_VIEWPORTS.desktop, mobile: ALL_VIEWPORTS.mobile };

const LANGS = { ar: '/', en: '/en' };

/** Shoot a sub-page instead of the home page: --route=/about */
const ROUTE = typeof args.route === 'string' ? args.route.replace(/\/$/, '') : '';

async function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* keep looking */
    }
  }
  throw new Error('Chrome not found — add its path to CHROME_CANDIDATES.');
}

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

await fs.mkdir(OUT, { recursive: true });

for (const [lang, route] of Object.entries(LANGS)) {
  for (const [device, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(BASE + route + ROUTE, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    // Scroll the whole page so in-view reveals have fired, then return to
    // the top. Without this a full-page shot catches them still hidden.
    // Two passes: lazy images load on the first one and make the page taller,
    // so a single pass can stop short of the last sections.
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let pass = 0; pass < 2; pass++) {
        const step = Math.round(window.innerHeight * 0.6);
        for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await sleep(160);
        }
      }
      window.scrollTo(0, 0);
      await sleep(300);
    });

    // Park on one section when asked, so a single section can be reviewed
    // without wading through a full-page shot of the whole site.
    if (typeof args.at === 'string') {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
      }, args.at.replace(/^#/, ''));
    }

    // Let entrance animations settle so the shot shows the resting state.
    await new Promise((r) => setTimeout(r, 1400));

    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    if (overflow.scrollW > overflow.clientW + 1) {
      console.warn(
        `  ! ${lang}-${device}: horizontal overflow ${overflow.scrollW} > ${overflow.clientW}`,
      );
    }

    const suffix =
      (ROUTE ? ROUTE.replace(/\//g, '-') : '') +
      (typeof args.at === 'string' ? `-${args.at.replace(/^#/, '')}` : '');
    const file = path.join(OUT, `${lang}-${device}${suffix}.png`);
    await page.screenshot({ path: file, fullPage: FULL });
    console.log(`  ✓ ${lang}-${device}  ${viewport.width}x${viewport.height}@${viewport.deviceScaleFactor}x`);
    await page.close();
  }
}

await browser.close();
console.log(`\nSaved to ${OUT}`);
