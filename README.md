# Mahmoud Atef — portfolio

A bilingual (Arabic / English) personal site for an e-commerce growth and
performance marketing specialist. React + TypeScript + Vite + Tailwind.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
```

## Scripts

| command | what it does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | `tsc --noEmit` then `vite build` |
| `npm run typecheck` | types only |
| `npm run shoot` | screenshots the running dev server at real device sizes |
| `npm run stores` | re-captures the live client-store demos (see below) |
| `npm run check:hero` | measures real WCAG contrast over the hero copy |

## The store demos are screenshots, not embeds

Every "the store, running now" frame on a case study is a real capture of that
client's live storefront. They are not iframes — Shopify sends
`X-Frame-Options: DENY`, so no browser will embed them — which means a change
on a client's store does **not** show up here by itself.

```bash
npm run stores              # refresh all of them
npm run stores -- veloura   # just one
```

Per-store arguments (which page, which product, which gallery slide) live in
`scripts/refresh-stores.mjs` and nowhere else.

## Ground rules for the content

The copy and the figures are not decoration, and several of them are governed
by rules written down beside them:

- Never invent, edit or regenerate a number, a screenshot or a dashboard.
- Every published figure carries its source and its period.
- Sales are sales. They are never called profit, and messaging conversations
  are never called orders.
- Client logos and photographs are used as supplied. If a logo is missing, it
  stays missing — nothing is redrawn.

Each `src/content/*.ts` file carries the specific rules for its own section in
a comment at the top. Read it before editing that section.

## Deployment

Vercel, from `main`. `vercel.json` rewrites every path to `index.html` because
routing is client-side.
