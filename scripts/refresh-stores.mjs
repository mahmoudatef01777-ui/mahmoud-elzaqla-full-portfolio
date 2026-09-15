#!/usr/bin/env node
/**
 * Re-captures every live store demo on the site.
 *
 *   npm run stores              # all of them
 *   npm run stores -- veloura   # just one, by id
 *
 * WHY THIS EXISTS: the demo frames are real screenshots, not live embeds. A
 * Shopify store sends `X-Frame-Options: DENY`, so a browser refuses to put it
 * in an iframe — which means a change on a client's store does NOT appear on
 * the portfolio by itself. Run this after a store is redesigned, rebranded or
 * restocked, and commit the new files.
 *
 * The per-store arguments live here and nowhere else. If you change a product
 * or a gallery slide, change it in this table.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** id -> the exact capture-store.mjs arguments for that store. */
const STORES = {
  cove: {
    site: 'https://covestore.co',
    out: 'public/work/cove',
    desktop: 'collections/all',
    phone: 'products/relaxed-fit-raglan-t-shirt',
    extra: ['--desktop-scroll=680'],
  },
  veloura: {
    site: 'https://veloura5.com',
    out: 'public/work/veloura',
    desktop: 'collections/all',
    phone: 'products/the-polo-chic-dress',
  },
  'yours-shoes': {
    site: 'https://yoursshoes-eg.myshopify.com',
    out: 'public/work/yours-shoes',
    desktop: 'collections/all',
    phone: 'products/colored-slippy',
    /**
     * OFFLINE as of 2026-09-15: the store answers "This store is currently
     * unavailable" — Shopify's frozen/lapsed-plan page. Capturing it would
     * replace a real storefront with that error page, which is exactly what
     * happened once. The files in public/work/yours-shoes are from when it
     * was live and must be kept. Delete this flag the day it loads again.
     */
    skip: 'store is unavailable (frozen Shopify plan) — existing captures kept',
  },
  kayan: {
    site: 'https://kayaan.com.co',
    out: 'public/work/kayan',
    desktop: 'collections/all',
    phone: 'products/zaahr-off-white-tee',
    // Rest the gallery on the second image, the one Mahmoud picked.
    extra: ['--phone-slide=2'],
  },
  asloaraby: {
    site: 'https://asloaraby.myshopify.com',
    out: 'public/work/asloaraby',
    desktop: 'collections/all',
    // Arabic handle, percent-encoded so the shell does not mangle it.
    phone:
      'products/%D8%AA%D9%8A%D8%B4%D9%8A%D8%B1%D8%AA-%D8%A3%D8%B5%D9%84%D9%87-%D8%B9%D8%B1%D8%A8%D9%8A',
  },
};

const asked = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const ids = asked.length ? asked : Object.keys(STORES);

let failed = 0;
for (const id of ids) {
  const s = STORES[id];
  if (!s) {
    console.error(`  ! unknown store "${id}". Known: ${Object.keys(STORES).join(', ')}`);
    failed++;
    continue;
  }
  if (s.skip) {
    console.log(`
— ${id}: skipped — ${s.skip}`);
    continue;
  }
  console.log(`\n— ${id} (${s.site})`);
  const res = spawnSync(
    process.execPath,
    [
      path.join(HERE, 'capture-store.mjs'),
      `--site=${s.site}`,
      `--out=${s.out}`,
      `--desktop=${s.desktop}`,
      `--phone=${s.phone}`,
      ...(s.extra ?? []),
    ],
    { stdio: 'inherit' },
  );
  if (res.status !== 0) failed++;
}

if (failed) {
  console.error(`\n${failed} store(s) failed.`);
  process.exit(1);
}
console.log('\nAll demos refreshed. Check the new files before committing them.');
