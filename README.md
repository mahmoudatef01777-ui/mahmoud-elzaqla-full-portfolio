# Mahmoud Atef — portfolio

A bilingual (Arabic / English) personal site for an e-commerce growth and
performance marketing specialist. Arabic is the default and the site is
right-to-left; `/en` serves the English side of every route.

React 18 · TypeScript · Vite 5 · Tailwind 3 · Framer Motion 11.
**No backend, no database, no API keys, no environment variables.**

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer. Check with `node -v`.

Install the dependencies once:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open **http://localhost:5173** for Arabic, or **http://localhost:5173/en** for
English. Save a file and the page updates by itself — no refresh needed.

Stop the server with `Ctrl + C`.

---

## 2. Where everything is

**No text, number or image path is written inside a component.** Everything is
in `src/content/`. To change what the site says, you edit a file there and
nothing else.

Every file has a comment at the top explaining the rules for its own section —
what may be claimed, where a number came from, what must never be said about
it. **Read that comment before editing the section.**

### What you are most likely to want to change

| I want to change… | Open this file |
| --- | --- |
| The headline and the line under it | `src/content/hero.ts` |
| The platforms band (Meta / TikTok / Shopify) | `src/content/tools.ts` |
| "I learned e-commerce from the inside" + its figures | `src/content/experience.ts` |
| The dashboard screenshots strip | `src/content/results-showcase.ts` |
| The Ads Manager screenshots | `src/content/ads-manager.ts` |
| "In one line" / the positioning statement | `src/content/positioning.ts`, `src/content/about.ts` |
| The spinning brand orbit | `src/content/projects-strip.ts` |
| "Why work with me?" | `src/content/why-me.ts` |
| "What's next for me?" | `src/content/whats-next.ts` |
| The dark footer, WhatsApp, email, LinkedIn | `src/content/contact.ts` |
| Your name, job title, phone, CV link | `src/content/site.ts` |
| Nav labels and shared button text | `src/content/ui.ts`, `src/content/shell.ts` |
| The `/projects` list and its figures | `src/content/results.ts`, `src/content/projects-page.ts` |
| Any case study except Bloomy | `src/content/case-studies.ts` |
| The Bloomy page | `src/content/bloomy.ts` |
| The `/background` page | `src/content/background-page.ts` |
| The `/about` page | `src/content/about-page.ts` |
| The `/landing` page | `src/content/landing.ts` |
| Page titles and descriptions for search | `src/content/seo.ts` |
| Brand colours used on hover | `src/content/brand-colors.ts` |

### Two languages, side by side

Every piece of text is written twice, in the same place:

```ts
title: { ar: 'كل المشاريع', en: 'All projects' }
```

`ar` is Arabic, `en` is English. **Change both**, or the English side of the
site will still say the old thing.

### Colour, type and spacing

- **Colours** — `src/styles/tokens.css`. One file, light and dark. Only four
  files outside it are allowed to name a colour, and that file lists them.
- **Fonts** — `src/styles/fonts.css`, plus the `<link>` in `index.html`.
  Changing a font means changing both.
- **Everything else** — `src/styles/index.css` and Tailwind classes in the
  components.

### Images

All images live in **`public/work/`**, one folder per brand:

```
public/work/bloomy/      public/work/cove/       public/work/veloura/
public/work/fakhama/     public/work/personal/   …
```

`public/work/personal/` holds your photographs — the hero, the cut-out in the
orbit, the one at the foot of the page.

To swap an image: put the new file in the right folder and change the path in
the matching `src/content/*.ts` file. **Nothing in the code names an image
path**, so that one line is the whole change.

Use **`.webp`**, and keep each file under about 300 KB. To convert and resize:

```bash
node scripts/shrink-logos.mjs
```

---

## 3. Commands

| command | what it does |
| --- | --- |
| `npm run dev` | development server at localhost:5173 |
| `npm run build` | typecheck, then build for production into `dist/` |
| `npm run preview` | serve the built `dist/` — this is what the live site will be |
| `npm run typecheck` | check types only, no build |
| `npm run audit` | **the pre-launch check** — see below |
| `npm run og` | re-render the link-preview card and the favicons |
| `npm run stores` | re-capture the live client-store demos |
| `npm run shoot` | screenshot the running site at real device sizes |
| `npm run check:hero` | measure real WCAG contrast over the hero copy |

### The audit

`npm run audit` drives the built site in Chrome and checks, on all 15 routes,
in both languages, at nine widths, in both light and dark:

- console errors and failed requests
- horizontal overflow
- images with no alt text, no dimensions, or a file that did not load
- links pointing at a page that does not exist
- heading structure (one `h1` per page, no skipped levels)
- buttons and links with no accessible name

It exits with an error if anything fails, so you can trust it as a gate before
you push. It needs the preview server running in another terminal:

```bash
npm run preview -- --port 4173
```

```bash
npm run audit -- --url=http://localhost:4173
```

---

## 4. Publishing a change

The whole loop:

```bash
npm run dev
```

Edit → look at it in the browser → when it is right:

```bash
npm run build
```

If the build passes:

```bash
git add -A
```

```bash
git commit -m "say what you changed"
```

```bash
git push
```

**Vercel deploys by itself** within about a minute of the push. Nothing else to
do. You can watch it at vercel.com under the project.

If the build fails, the site is **not** published — the old version stays up.
Fix the error and push again.

---

## 5. Deployment

Vercel, from the `main` branch.

| setting | value |
| --- | --- |
| Framework preset | **Vite** |
| Root directory | `./` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |
| Environment variables | **none** |

`vercel.json` rewrites every path to `index.html`, because routing happens in
the browser. Without it, opening `/work/bloomy` directly — or refreshing on it
— would return a 404.

### The routes that exist

```
/                /projects        /background      /about       /landing
/work/bloomy     /work/cove       /work/veloura    /work/fakhama
/work/dahab-decor  /work/el-haramein  /work/brilliant
/work/yours-shoes  /work/kayan     /work/asloaraby
```

Each also exists under `/en` — `/en/work/bloomy`, and so on.

### One limit worth knowing

The link preview card — the image and text WhatsApp and LinkedIn show — comes
from the static tags in `index.html`, and is the same for every url on the
site. Those scrapers fetch the HTML and never run the app, so the per-page
titles in `src/content/seo.ts` cannot reach them.

The card image is `public/og.png`, rebuilt with `npm run og`. Both it and the
canonical urls assume the domain written in **`index.html`** and
**`src/lib/head.ts`** — if the domain changes, change it in both.

---

## 6. The store demos are screenshots, not embeds

Every "the store, running now" frame on a case study is a real capture of that
client's live storefront. They are not iframes — Shopify sends
`X-Frame-Options: DENY`, so no browser will embed them — which means a change
on a client's store does **not** show up here by itself.

```bash
npm run stores
```

```bash
npm run stores -- veloura
```

Per-store arguments (which page, which product, which gallery slide) live in
`scripts/refresh-stores.mjs` and nowhere else.

---

## 7. Ground rules for the content

The copy and the figures are not decoration. Several are governed by rules
written beside them, and `docs/` carries the rest:

- Never invent, edit or regenerate a number, a screenshot or a dashboard.
- Every published figure carries its source and its period.
- Sales are sales. They are never called profit, and messaging conversations
  are never called orders.
- Figures from two platforms are never added together.
- Client logos and photographs are used as supplied. If a logo is missing it
  stays missing — nothing is redrawn.
- Nothing that identifies a customer goes on the site: no names, no phone
  numbers, no addresses, no shipping labels.

`docs/` holds the working context the site was built from — the claim rules,
the per-project facts and where each came from. It is the reason any figure
here can be traced back to a source. Start with `docs/CLAUDE.md`.

These are internal working notes, and a good reason to keep the repository
private.
