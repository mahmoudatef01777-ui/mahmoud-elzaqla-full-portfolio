#!/usr/bin/env node
/**
 * Renders the sharing card and the raster favicons.
 *
 *   npm run og
 *
 * WHY A BROWSER AND NOT sharp's SVG PATH: the card carries Arabic, and
 * Arabic needs shaping and bidi. sharp rasterises SVG through resvg, whose
 * text support depends on the machine's fontconfig — on Windows it silently
 * drops to unshaped, disconnected letterforms. Chrome already shapes Arabic
 * correctly and already has the webfonts, so the card is laid out as HTML
 * and photographed at exactly 1200x630.
 *
 * The photograph is the cut-out that already ships with the site. Nothing is
 * generated, retouched or invented here — it is the site's own type, colour
 * and image, composed at card size.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

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
  throw new Error('Chrome not found — add its path to CHROME_CANDIDATES.');
}

const photo = await fs.readFile(path.join(PUBLIC, 'work/personal/orbit-centre.webp'));
const photoData = `data:image/webp;base64,${photo.toString('base64')}`;

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=IBM+Plex+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: #FFFFFF; color: #111111;
    font-family: 'IBM Plex Sans Arabic', system-ui, sans-serif;
    display: flex; align-items: center; overflow: hidden;
  }
  .copy { flex: 1; padding: 0 72px 0 48px; }
  .eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-family: 'Archivo', system-ui, sans-serif;
    font-size: 21px; font-weight: 600; letter-spacing: .16em;
    text-transform: uppercase; color: #111111;
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; background: #C96A3D; }
  h1 {
    margin-top: 30px; font-size: 82px; font-weight: 700; line-height: 1.28;
    letter-spacing: 0; color: #111111;
  }
  h1 .accent { color: #C96A3D; }
  p {
    margin-top: 28px; font-size: 27px; line-height: 1.6; color: #6B6B6B;
    max-width: 24ch;
  }
  .rule { margin-top: 34px; width: 132px; height: 3px; background: #C96A3D; }
  /* The figure stands on the bottom edge and is sized by HEIGHT, not width:
     the cut-out is wider than it is tall, so width-sizing left it small with
     a bank of empty white above it. */
  .shot {
    width: 470px; height: 630px; display: flex;
    align-items: flex-end; justify-content: center;
  }
  .shot img { height: 560px; width: auto; max-width: none; object-fit: contain; }
</style>
</head>
<body>
  <div class="copy">
    <div class="eyebrow"><span class="dot"></span>E-commerce Growth Specialist</div>
    <h1>محمود عاطف<span class="accent">.</span></h1>
    <p>ستورات Shopify، إعلانات Meta وTikTok، والتشغيل لحد ما الأوردر يوصل.</p>
    <div class="rule"></div>
  </div>
  <div class="shot"><img src="${photoData}" alt=""></div>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  args: ['--no-sandbox', '--font-render-hinting=none'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));

  const buf = await page.screenshot({ type: 'png' });
  await fs.writeFile(path.join(PUBLIC, 'og.png'), buf);
  console.log('og.png        1200x630  %d KB', Math.round(buf.length / 1024));

  // Raster favicons from the same SVG the browser tab uses, so the two can
  // never drift apart.
  const svg = await fs.readFile(path.join(PUBLIC, 'favicon.svg'));
  for (const [name, size] of [['favicon.png', 96], ['apple-touch-icon.png', 180]]) {
    const out = await sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();
    await fs.writeFile(path.join(PUBLIC, name), out);
    console.log('%-13s %dx%d     %d KB', name, size, size, Math.round(out.length / 1024));
  }
} finally {
  await browser.close();
}
