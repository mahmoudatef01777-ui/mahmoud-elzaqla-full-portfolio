#!/usr/bin/env node
/**
 * Caps the images that ship far larger than they are ever drawn.
 *
 *   node scripts/shrink-logos.mjs
 *
 * Brand logos render at 24-56 CSS px (the projects list, the case-study
 * header, the orbit). 192px covers the largest of those on a 3x screen with
 * room to spare, and several were shipping at over a thousand pixels.
 *
 * The phone hero is capped at 1080, which is the widest a 3x 360pt phone can
 * actually use. It is preloaded and it is the LCP element, so its bytes are
 * on the critical path in a way nothing else here is.
 *
 * Nothing is re-cropped and nothing is sharpened — this only removes pixels
 * no screen was going to draw.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const CAPS = [
  [/logo\.webp$/, 192],
  [/hero-mobile\.webp$/, 1080],
];

const files = [];
(function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
})('public/work');

let saved = 0;
for (const file of files) {
  const rule = CAPS.find(([re]) => re.test(file.replace(/\\/g, '/')));
  if (!rule) continue;
  const cap = rule[1];

  // Read to a Buffer first. Handing sharp a PATH keeps the file open on
  // Windows, and the swap below then fails with EPERM.
  const input = fs.readFileSync(file);
  const before = input.length;
  const meta = await sharp(input).metadata();
  if (meta.width <= cap) {
    console.log('  skip  %s (%dpx)', path.basename(file), meta.width);
    continue;
  }

  const buf = await sharp(input)
    .resize({ width: cap, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  fs.writeFileSync(file, buf);

  saved += before - buf.length;
  console.log(
    '  %-42s %dx -> %dpx   %dKB -> %dKB',
    file.replace(/\\/g, '/').replace('public/work/', ''),
    meta.width,
    cap,
    Math.round(before / 1024),
    Math.round(buf.length / 1024),
  );
}
console.log('\nsaved %d KB', Math.round(saved / 1024));
