#!/usr/bin/env node
/**
 * Captures a live client store for a case study's demo frame.
 *
 *   node scripts/capture-store.mjs --site=https://covestore.co \
 *     --out=public/work/cove --desktop=/collections/all \
 *     --phone=/products/tokyo-blouse
 *
 * Writes live-desktop.webp (1440x680 @2x) and live-product.webp (390x760 @3x)
 * — the sizes the demo frame in CaseStudy.tsx expects.
 *
 * These are REAL captures of the running store. Never hand-build, redraw or
 * retouch one: the whole point of the frame is that a visitor is looking at
 * the site as it actually is. If the store changes, run this again.
 *
 * Overlays are dismissed by clicking CLOSE CONTROLS ONLY. Do not add a
 * "click every button" pass — on the first store that did it, the click
 * navigated away from the page being captured.
 *
 * Uses the Chrome already on the machine, like scripts/shoot.mjs.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');

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

const SITE = (args.site || '').replace(/\/$/, '');
const OUT = path.resolve(args.out || 'public/work/store');
if (!SITE) {
  console.error('--site is required, e.g. --site=https://covestore.co');
  process.exit(1);
}

/**
 * Accepts "collections/all", "/collections/all" or a whole URL. Git Bash on
 * Windows rewrites a bare leading slash into a drive path, so the slashless
 * form is the one to use there.
 */
const at = (p) => {
  if (!p || p === true) return SITE + '/';
  if (/^https?:\/\//.test(p)) return p;
  return SITE + '/' + String(p).replace(/^\/+/, '');
};

/** The two shots the frame holds: one wide, one phone. */
const SHOTS = [
  {
    file: 'live-desktop.webp',
    url: at(args.desktop),
    viewport: { width: 1440, height: 680, deviceScaleFactor: 2 },
    scroll: Number(args['desktop-scroll'] ?? 0),
  },
  {
    file: 'live-product.webp',
    url: at(args.phone),
    viewport: {
      width: 390,
      height: 760,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    scroll: Number(args['phone-scroll'] ?? 0),
    /** 1-based gallery slide to rest on, e.g. --phone-slide=2. */
    slide: Number(args['phone-slide'] ?? 1),
  },
];

/**
 * Gallery "next" controls, in order of preference. Used only to advance a
 * product gallery to the requested slide — never to click anything else.
 */
const NEXTS = [
  'button.swiper-button-next',
  '[aria-label="Next"]',
  '[aria-label*="next slide" i]',
  'button[class*="next"]',
];

/** Close controls only — never a blanket click. */
const CLOSERS = [
  '[aria-label="Close"]',
  '[aria-label*="close" i]',
  '[aria-label*="dismiss" i]',
  'button.m-modal--close',
  '.m-modal--close',
  '[class*="popup"] [class*="close"]',
  '[class*="modal"] [class*="close"]',
  '[class*="toast"] [class*="close"]',
  '[class*="banner"] [class*="close"]',
  '#shopify-pc__banner__btn-decline',
  '[class*="cookie"] [class*="decline" i]',
];

/**
 * Runs twice per page: some overlays (discount toasts, AI widgets) only
 * mount after the first scroll, so dismissing once is not enough.
 */
async function dismissOverlays(page) {
  for (const sel of CLOSERS) {
    try {
      for (const el of await page.$$(sel)) {
        await el.click({ delay: 20 }).catch(() => {});
        await new Promise((r) => setTimeout(r, 250));
      }
    } catch {
      /* every selector here is optional by design */
    }
  }

  // Third-party widgets (Shopify's AI pill, chat launchers) live in shadow
  // roots, which no CSS selector from outside can reach. Walk them and click
  // only controls that name themselves as a close.
  await page
    .evaluate(() => {
      const isCloser = (el) => {
        const label = (
          el.getAttribute('aria-label') ||
          el.getAttribute('title') ||
          el.textContent ||
          ''
        ).trim();
        return /^(close|dismiss|×|✕|✖|x)$/i.test(label);
      };
      const walk = (root, depth = 0) => {
        if (depth > 6) return;
        for (const el of root.querySelectorAll('*')) {
          if (el.shadowRoot) walk(el.shadowRoot, depth + 1);
          if ((el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') && isCloser(el)) {
            el.click();
          }
        }
      };
      walk(document);
    })
    .catch(() => {});
}

async function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* try the next one */
    }
  }
  throw new Error('No Chrome found. Install Chrome or edit CHROME_CANDIDATES.');
}

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-features=IsolateOrigins'],
});

await fs.mkdir(OUT, { recursive: true });

for (const shot of SHOTS) {
  const page = await browser.newPage();
  await page.setViewport(shot.viewport);
  await page.goto(shot.url, { waitUntil: 'networkidle2', timeout: 60_000 });

  // Overlays usually appear a beat after load.
  await new Promise((r) => setTimeout(r, 2500));
  await dismissOverlays(page);

  /**
   * Some themes print a broken tag as visible text at the very top of the
   * document — a real bug on the store, but not one this frame should put
   * on show. Measure it and start the shot just below it, so the capture
   * still begins at the top of the page as a visitor sees it. Stores with
   * no such text measure 0 and are unaffected.
   */
  const stray = await page.evaluate(() => {
    let bottom = 0;
    for (const n of document.body.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      const r = document.createRange();
      r.selectNode(n);
      const b = r.getBoundingClientRect();
      if (b.top < 80 && b.height) bottom = Math.max(bottom, Math.ceil(b.bottom));
    }
    return bottom;
  });

  // Nudge every lazy image into loading, then return to the framing scroll.
  await page.evaluate(async (to) => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, to);
  }, shot.scroll + stray);
  await new Promise((r) => setTimeout(r, 1200));

  await dismissOverlays(page);
  await new Promise((r) => setTimeout(r, 900));

  /**
   * Rest the gallery on the requested slide.
   *
   * Driving the Swiper instance is exact; clicking "next" is the fallback
   * for a gallery that is not Swiper. A product page carries several
   * sliders (main media, thumbnails, "you may also like"), so pick the one
   * with the most slides rather than the first in the DOM — the first is
   * usually the thumbnail strip, and advancing that moves nothing visible.
   */
  if ((shot.slide || 1) > 1) {
    const moved = await page.evaluate((n) => {
      const swipers = [...document.querySelectorAll('.swiper, [class*="swiper-container"]')]
        .map((el) => el.swiper)
        .filter((s) => s && s.slides && s.slides.length > 1);
      if (!swipers.length) return false;
      const main = swipers.sort((a, b) => b.slides.length - a.slides.length)[0];
      if (typeof main.slideToLoop === 'function' && main.params?.loop) main.slideToLoop(n - 1, 0);
      else main.slideTo(n - 1, 0);
      return true;
    }, shot.slide);

    if (!moved) {
      for (let i = 1; i < shot.slide; i++) {
        for (const sel of NEXTS) {
          const el = await page.$(sel);
          if (el) {
            await el.click({ delay: 20 }).catch(() => {});
            break;
          }
        }
        await new Promise((r) => setTimeout(r, 900));
      }
    }
    await new Promise((r) => setTimeout(r, 1400));
  }

  const png = await page.screenshot({ type: 'png' });
  const dest = path.join(OUT, shot.file);
  await sharp(png).webp({ quality: 82 }).toFile(dest);

  const meta = await sharp(dest).metadata();
  console.log(`${shot.file}  ${meta.width}x${meta.height}  ${shot.url}`);
  await page.close();
}

await browser.close();
