#!/usr/bin/env node
/**
 * Copies project assets out of the read-only source folders into
 * site/public/work/<project>/ as web-ready files.
 *
 *   npm run assets              # every project
 *   npm run assets -- bloomy    # one or more projects
 *
 * Rules enforced here (docs/CLAUDE.md):
 *  - Source folders are never written to, renamed or deleted.
 *  - Output names are lowercase kebab-case: no spaces, brackets or Arabic.
 *  - Images become WebP, long edge <= 2000px, quality 80.
 *  - Videos become H.264 MP4 with a poster frame, target under 8 MB.
 *  - Numbers inside screenshots are never altered. Only crop/blur/resize.
 *  - Files holding customer data are SKIPPED until a redacted copy exists.
 */
import { createRequire } from 'node:module';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs/promises';

const require = createRequire(import.meta.url);
const run = promisify(execFile);

const SRC_ROOT = path.resolve(import.meta.dirname, '../..');
const OUT_ROOT = path.resolve(import.meta.dirname, '../public/work');

const PROJECTS = [
  'bloomy',
  'cove',
  'veloura',
  'brilliant',
  'el-haramein',
  'dahab-decor',
  'fakhama',
  'yours-shoes',
  'personal',
];

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v']);

const MAX_EDGE = 2000;
const WEBP_QUALITY = 80;

/**
 * Files that show customer names, phones, addresses, or other brands'
 * figures. They are skipped until a manually redacted copy is placed in
 * <project>/_redacted/<same name>. Source of truth: docs/context.md.
 */
const NEEDS_REDACTION = {
  'bloomy/orders-1.jpg': 'blur the shipping labels',
  'bloomy/orders-2.jpg': 'blur the shipping labels',
  'bloomy/ops-1.jpeg': 'blur the phone numbers on the invoice',
  'bloomy/ops-4.jpg': 'crop off the top edge — other people are in shot',
  'bloomy/results-shopify.jpeg':
    'cover the period-over-period deltas (+70% etc) — the prior window was near-empty',
  'bloomy/results-2.jpeg': 'show Bloomy rows only — blur other brands AND the grand total',
  'dahab-decor/results-1.png':
    'Meta Ads Manager — crop the account name row and the personal avatar',
  'cove/results-1.png': 'crop the browser tabs out',
  'fakhama/ops-1.png': 'blur names and numbers in the chat list',
  'fakhama/results-2.mp4': 'blur names and numbers in the WhatsApp video',
  'veloura/results-1.png': 'blur customer data',
  'veloura/results-2.png': 'blur customer data',
  'veloura/results-3.png': 'blur customer data',
  'veloura/results-4.png': 'blur customer data',
  'veloura/results-5.png': 'blur customer data',
  'veloura/results-8.png.png':
    'Shopify — trim the partial composer bar at the bottom',
  'veloura/results-6.png':
    'Shopify — keep the metrics band only: drop the store handle, avatar, live-visitor tooltip and taskbar',
  'veloura/results-7.png':
    'Meta Ads — keep the ad-set table only: drop the account id, avatar and banner',
  'veloura/results-2026-09-11 081231.png':
    'TikTok Ads Manager — crop the account balance block before publishing',
  'fakhama/results-1.png':
    'Meta Ads Manager — crop the personal avatar and the account id before publishing',
  'personal/work-1.jpg': 'depth-of-field pass — shipping labels and the bystander must be out of focus',
  'personal/work-3.jpg': 'depth-of-field pass — shipping labels must be out of focus',
  'personal/hero-desktop.png.png':
    'ERP panel: blur every non-Bloomy row, the grand total, and the admin URL bar',
  'personal/hero-mobile.png.png':
    'ERP panel: blur every non-Bloomy row, the grand total, and the admin URL bar',
};

const slug = (name) =>
  name
    // Strip repeated extensions too: "hero-desktop.png.png" -> "hero-desktop".
    .replace(/(\.(png|jpe?g|webp|heic|mp4|mov|m4v))+$/i, '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const exists = (p) =>
  fs
    .access(p)
    .then(() => true)
    .catch(() => false);

async function toWebp(sharp, input, output) {
  const image = sharp(input, { failOn: 'none' });
  const meta = await image.metadata();
  const info = await image
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(output);
  return { width: info.width, height: info.height, from: `${meta.width}x${meta.height}` };
}

/** sharp's prebuilt binaries have no HEIC decoder — fall back to ffmpeg. */
async function heicToWebp(sharp, ffmpeg, input, output) {
  try {
    return await toWebp(sharp, input, output);
  } catch {
    const tmp = `${output}.tmp.png`;
    await run(ffmpeg, ['-y', '-loglevel', 'error', '-i', input, tmp]);
    const info = await toWebp(sharp, tmp, output);
    await fs.rm(tmp, { force: true });
    return info;
  }
}

async function toMp4(ffmpeg, input, output, poster) {
  await run(ffmpeg, [
    '-y', '-loglevel', 'error', '-i', input,
    '-vf', `scale='min(1280,iw)':-2`,
    '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-profile:v', 'high',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '96k',
    output,
  ]);
  await run(ffmpeg, ['-y', '-loglevel', 'error', '-i', output, '-frames:v', '1', '-q:v', '4', poster]);
}

async function processProject(sharp, ffmpeg, project) {
  const srcDir = path.join(SRC_ROOT, project);
  if (!(await exists(srcDir))) {
    console.warn(`  ! ${project}: source folder not found, skipping`);
    return [];
  }

  const outDir = path.join(OUT_ROOT, project);
  await fs.mkdir(outDir, { recursive: true });

  const entries = (await fs.readdir(srcDir, { withFileTypes: true }))
    .filter((e) => e.isFile())
    .map((e) => e.name);

  const manifest = [];
  // Two sources can slug to the same name (work-3.jpg and work-3.png).
  // First one keeps the clean name; later ones carry their extension.
  const taken = new Set();

  for (const name of entries) {
    const ext = path.extname(name).toLowerCase();
    const key = `${project}/${name}`;
    const redacted = path.join(srcDir, '_redacted', name);
    let input = path.join(srcDir, name);

    if (NEEDS_REDACTION[key]) {
      if (await exists(redacted)) {
        input = redacted;
      } else {
        console.warn(`  - skip ${name} — ${NEEDS_REDACTION[key]} → put the fixed copy in ${project}/_redacted/`);
        continue;
      }
    }

    let base = slug(name);
    if (taken.has(base)) base = `${base}-${ext.slice(1)}`;
    taken.add(base);

    try {
      if (IMAGE_EXT.has(ext)) {
        const output = path.join(outDir, `${base}.webp`);
        const info =
          ext === '.heic'
            ? await heicToWebp(sharp, ffmpeg, input, output)
            : await toWebp(sharp, input, output);
        manifest.push({
          src: `/work/${project}/${base}.webp`,
          type: 'image',
          width: info.width,
          height: info.height,
        });
        console.log(`  ✓ ${name} → ${base}.webp (${info.from} → ${info.width}x${info.height})`);
      } else if (VIDEO_EXT.has(ext)) {
        const output = path.join(outDir, `${base}.mp4`);
        const poster = path.join(outDir, `${base}-poster.webp`);
        await toMp4(ffmpeg, input, output, poster);
        const { size } = await fs.stat(output);
        const mb = (size / 1024 / 1024).toFixed(1);
        manifest.push({
          src: `/work/${project}/${base}.mp4`,
          type: 'video',
          poster: `/work/${project}/${base}-poster.webp`,
        });
        console.log(`  ✓ ${name} → ${base}.mp4 (${mb} MB)${size > 8e6 ? '  ⚠ over 8 MB' : ''}`);
      }
    } catch (err) {
      console.error(`  ✗ ${name}: ${err.message}`);
    }
  }

  await fs.writeFile(path.join(outDir, 'index.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

async function main() {
  let sharp;
  let ffmpeg;
  try {
    sharp = require('sharp');
    ffmpeg = require('ffmpeg-static');
  } catch {
    console.error('Missing dependencies. Run `npm install` inside site/ first.');
    process.exit(1);
  }

  const picked = process.argv.slice(2).filter((a) => !a.startsWith('-'));
  const targets = picked.length ? picked : PROJECTS;

  for (const project of targets) {
    console.log(`\n${project}`);
    await processProject(sharp, ffmpeg, project);
  }

  console.log('\nDone. Optimized copies are in site/public/work/. Source folders untouched.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
