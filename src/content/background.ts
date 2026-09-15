import type { Localized } from './types';

/**
 * Section 3 — the background, on the home page.
 *
 * Deliberately SHORT: label, headline, two lines, one button. The full story
 * and its timeline live on /background (see background-page.ts). Do not put
 * the stages back here — the home page's job is to make someone open the page,
 * not to tell the story twice.
 *
 * REMOVED AND NOT TO BE RESTORED (2026-09-14, Mahmoud's correction):
 *  - the "~20,000 orders" takeaway
 *  - the "~2,000 orders packed" chip
 *  - the "~12,000 moderation orders" figure
 *  - the "~EGP 2M courier accounts" chip
 *  - the childhood shop and poultry story
 * Those figures were wrong. The corrected ones live in background-page.ts and
 * in docs/master-context.md; none of the four above may appear anywhere again.
 */

export const background = {
  label: { ar: 'الخلفية', en: 'Background' } satisfies Localized,

  title: {
    ar: 'من التشغيل، للنمو.',
    en: 'From operations to growth.',
  } satisfies Localized,

  intro: {
    ar: 'بدأت من التشغيل، من تجهيز الأوردرات والمخزون والعملاء والشحن. بعدها دخلت أكتر في إدارة البيزنس والإنتاج، لحد ما بدأت مشروعي الخاص Bloomy. ومن هناك دخلت Shopify والـPerformance Marketing، وبدأت أفهم إزاي كل جزء في الـE-commerce بيأثر على التاني.',
    en: 'I started with operations — preparing orders, managing stock, dealing with customers and shipping. Then I moved deeper into business management and production, until I started my own brand, Bloomy. From there, I got into Shopify and performance marketing, and started understanding how every part of an e-commerce business affects the others.',
  } satisfies Localized,

  /** The one line the teaser leaves behind. Set apart on the page. */
  intro2: {
    ar: 'كل خطوة أخدتني للخطوة اللي بعدها.',
    en: 'Every step led to the next.',
  } satisfies Localized,

  cta: {
    route: '/background',
    label: { ar: 'الحكاية كاملة', en: 'Read the full story' } satisfies Localized,
  },
};
