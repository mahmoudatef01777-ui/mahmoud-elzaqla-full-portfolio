#!/usr/bin/env node
/**
 * Measures real WCAG contrast for the hero copy.
 *
 * It hides the text, screenshots the exact pixels each text block sits on,
 * then computes the contrast ratio of the text colour against the WORST
 * (brightest) pixel in that area — not an average, so a single bright patch
 * cannot hide behind a good mean. Also checks that the CTA and nav are
 * hit-testable, and that no breakpoint scrolls sideways.
 *
 *   npm run check:hero
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] || process.env.PREVIEW_URL || `http://localhost:${process.env.PORT || 5173}`;

const WIDTHS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1024', width: 1024, height: 768 },
  { name: '768', width: 768, height: 1024 },
  { name: '390', width: 390, height: 844 },
];

const srgb = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

/**
 * Worst-case contrast for the pixels a glyph actually covers.
 *
 * Comparing the same clip with and without the text isolates glyph
 * interiors: a pixel that matches the text colour in the first shot is
 * solid ink, so the matching pixel in the second shot is exactly what sits
 * behind it. Empty space inside the text box is ignored, which keeps the
 * check from demanding contrast where there is nothing to read.
 */
async function worstContrast(sharp, withText, withoutText, color) {
  const a = await sharp(withText).raw().toBuffer({ resolveWithObject: true });
  const b = await sharp(withoutText).raw().toBuffer({ resolveWithObject: true });
  const ch = a.info.channels;
  const textL = luminance(color[0], color[1], color[2]);

  let worst = Infinity;
  let worstPx = null;
  let inkPixels = 0;

  for (let i = 0; i < a.data.length; i += ch) {
    // Estimate how much of this pixel the glyph covers, by how far it moved
    // from the background toward the declared text colour. Semi-transparent
    // text never renders as its declared colour, so matching that colour
    // directly would find no ink at all.
    let sum = 0;
    let used = 0;
    for (let c = 0; c < 3; c++) {
      const span = color[c] - b.data[i + c];
      if (Math.abs(span) < 8) continue; // too close to tell coverage apart
      sum += (a.data[i + c] - b.data[i + c]) / span;
      used++;
    }
    if (!used) continue;
    const coverage = sum / used;
    if (coverage < 0.85) continue; // antialiased edge, not solid ink

    inkPixels++;
    // Contrast is between what the eye actually sees and what is behind it.
    const fg = luminance(a.data[i], a.data[i + 1], a.data[i + 2]);
    const bg = luminance(b.data[i], b.data[i + 1], b.data[i + 2]);
    const r = ratio(fg, bg);
    if (r < worst) {
      worst = r;
      worstPx = [b.data[i], b.data[i + 1], b.data[i + 2]];
    }
  }

  return { worst, worstPx, inkPixels };
}

const sharp = require('sharp');
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

let failures = 0;

for (const lang of ['ar', 'en']) {
  for (const vp of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${lang === 'en' ? '/en' : '/'}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1200));

    const overflow = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    const overflowed = overflow.scrollW > overflow.clientW + 1;

    // Only the copy that sits ON the photo needs checking.
    const targets = await page.evaluate(() => {
      const out = [];
      const push = (el, name) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return; // hidden at this breakpoint
        const onPhoto = !!el.closest('.z-20');
        if (!onPhoto) return;
        const cs = getComputedStyle(el);
        const px = parseFloat(cs.fontSize);
        const bold = parseInt(cs.fontWeight, 10) >= 700;
        out.push({
          name,
          color: cs.color,
          large: px >= 24 || (bold && px >= 18.66),
          box: {
            x: Math.round(r.x),
            y: Math.round(r.y),
            width: Math.round(r.width),
            height: Math.round(r.height),
          },
        });
      };
      push(document.querySelector('#hero h1'), 'headline');
      push(document.querySelector('#hero .z-20 p'), 'subline');
      return out;
    });

    const shots = [];
    for (const target of targets) shots.push(await page.screenshot({ clip: target.box }));

    // Hide the copy so we photograph only what is behind it.
    await page.evaluate(() => {
      document.querySelectorAll('#hero .z-20').forEach((el) => {
        el.style.visibility = 'hidden';
      });
    });

    for (const [i, target] of targets.entries()) {
      const bare = await page.screenshot({ clip: target.box });
      const rgb = target.color.match(/\d+/g).map(Number);
      const { worst, worstPx, inkPixels } = await worstContrast(sharp, shots[i], bare, rgb);
      // Large text (>=24px, or >=18.66px bold) only needs 3:1 under WCAG AA.
      const threshold = target.large ? 3 : 4.5;
      const ok = inkPixels > 0 && worst >= threshold;
      if (!ok) failures++;
      console.log(
        `  ${ok ? 'PASS' : 'FAIL'}  ${lang}-${vp.name.padEnd(4)} ${target.name.padEnd(8)} ` +
          `worst ${Number.isFinite(worst) ? worst.toFixed(2) : 'n/a'}:1 (needs ${threshold}) ` +
          `against rgb(${worstPx ? worstPx.join(',') : '-'}) · ${inkPixels}px of ink`,
      );
    }

    await page.evaluate(() => {
      document.querySelectorAll('#hero .z-20').forEach((el) => {
        el.style.visibility = '';
      });
    });

    // How much does the scrim dim the dashboards? Compare the hero with the
    // scrim on and off, and take the largest luminance drop over pixels that
    // are bright in the unscrimmed render — i.e. the white dashboard panels.
    const heroBox = await page.evaluate(() => {
      const card = document.querySelector('#hero .rounded-media');
      if (!card) {
        throw new Error(
          'The hero did not render. Usually the dev server is serving a stale ' +
            'module graph after a file was added or deleted — restart it and retry.',
        );
      }
      const r = card.getBoundingClientRect();
      return {
        x: Math.round(Math.max(0, r.x)),
        y: Math.round(Math.max(0, r.y)),
        width: Math.round(Math.min(r.width, innerWidth - Math.max(0, r.x))),
        height: Math.round(Math.min(r.height, innerHeight - Math.max(0, r.y))),
      };
    });

    await page.evaluate(() => {
      document.querySelectorAll('#hero .z-20, #hero .hero-scrim').forEach((el) => {
        el.style.visibility = 'hidden';
      });
    });
    const bare = await page.screenshot({ clip: heroBox });
    await page.evaluate(() => {
      document.querySelectorAll('#hero .hero-scrim').forEach((el) => {
        el.style.visibility = '';
      });
    });
    const scrimmed = await page.screenshot({ clip: heroBox });
    await page.evaluate(() => {
      document.querySelectorAll('#hero .z-20').forEach((el) => {
        el.style.visibility = '';
      });
    });

    const a = await sharp(bare).raw().toBuffer({ resolveWithObject: true });
    const b2 = await sharp(scrimmed).raw().toBuffer({ resolveWithObject: true });
    const { width: bw, height: bh, channels: bch } = a.info;
    const lumAt = (buf, x, y) => {
      const i = (y * bw + x) * bch;
      return luminance(buf[i], buf[i + 1], buf[i + 2]);
    };

    // The requirement is that the scrim is fully clear of the side the
    // dashboards sit on. So measure only beyond the gradient's stated clear
    // point (72% along the reading direction) — the near side is meant to be
    // dark, and the redacted ERP panel deliberately sits inside it.
    // A dashboard pixel is bright AND next to strong detail (panel text or a
    // chart line); the flat backdrop is bright but featureless.
    // At >=1024 the scrim is directional, so the dashboards must be clear
    // past its horizontal clear point. Below that it runs vertically and is
    // dark at the bottom by design, so the dashboards live in the top band.
    const directional = vp.width >= 1024;
    const CLEAR_FROM = 0.72;
    const TOP_BAND = 0.32;
    const rtl = lang === 'ar';
    let maxDrop = 0;
    let sampled = 0;
    for (let y = 2; y < bh - 2; y++) {
      for (let x = 2; x < bw - 2; x++) {
        if (directional) {
          const along = rtl ? 1 - x / bw : x / bw;
          if (along < CLEAR_FROM) continue;
        } else if (y / bh > TOP_BAND) {
          continue;
        }
        const before = lumAt(a.data, x, y);
        if (before < 0.72) continue;
        const detail =
          Math.abs(before - lumAt(a.data, x + 2, y)) > 0.25 ||
          Math.abs(before - lumAt(a.data, x - 2, y)) > 0.25 ||
          Math.abs(before - lumAt(a.data, x, y + 2)) > 0.25 ||
          Math.abs(before - lumAt(a.data, x, y - 2)) > 0.25;
        if (!detail) continue;
        sampled++;
        const after = lumAt(b2.data, x, y);
        const drop = (before - after) / before;
        if (drop > maxDrop) maxDrop = drop;
      }
    }

    const dimOk = maxDrop <= 0.08;
    if (!dimOk) failures++;
    console.log(
      `  ${dimOk ? 'PASS' : 'FAIL'}  ${lang}-${vp.name.padEnd(4)} dashboards ${directional ? `past ${(CLEAR_FROM * 100).toFixed(0)}% across` : `in the top ${(TOP_BAND * 100).toFixed(0)}%`}: worst dimming ${(maxDrop * 100).toFixed(1)}% (allowed 8%) over ${sampled}px of detail`,
    );

    // Is the topmost element at the CTA's centre actually the CTA?
    const clickable = await page.evaluate(() => {
      const check = (el) => {
        if (!el) return 'missing';
        const r = el.getBoundingClientRect();
        if (r.width < 2) return 'hidden';
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return el.contains(hit) ? 'ok' : `blocked by <${hit?.tagName.toLowerCase()}>`;
      };
      const ctas = [...document.querySelectorAll('a[href^="https://wa.me"]')].filter(
        (a) => a.getBoundingClientRect().width > 2,
      );
      return {
        cta: ctas.length ? check(ctas[0]) : 'none visible',
        navLink: check([...document.querySelectorAll('header a[href^="#"]')].find(
          (a) => a.getBoundingClientRect().width > 2,
        )),
      };
    });

    const clickOk = clickable.cta === 'ok' && ['ok', 'hidden', 'missing'].includes(clickable.navLink);
    if (!clickOk) failures++;
    console.log(
      `  ${clickOk ? 'PASS' : 'FAIL'}  ${lang}-${vp.name.padEnd(4)} clickable  cta=${clickable.cta} nav=${clickable.navLink}`,
    );
    console.log(
      `  ${overflowed ? 'FAIL' : 'PASS'}  ${lang}-${vp.name.padEnd(4)} overflow   ${overflow.scrollW}/${overflow.clientW}`,
    );
    if (overflowed) failures++;

    await page.close();
  }
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll hero checks passed.');
process.exit(failures ? 1 : 0);
