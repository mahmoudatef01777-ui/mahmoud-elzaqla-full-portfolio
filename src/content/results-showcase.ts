import type { Localized } from './types';

/**
 * "Some Results" — the evidence strip under the hero.
 *
 * RULES FOR THIS FILE, all load-bearing:
 *
 *  1. Every entry points at a REAL screenshot supplied by Mahmoud. Never
 *     generate, redraw, retouch or reconstruct one, and never alter a number
 *     inside one. The screenshots are the evidence; a rebuilt one is a forgery.
 *
 *  2. Captions may only state what is legible ON the screenshot — the tool it
 *     came from, the period it shows, nothing else. Do not add a metric, a
 *     percentage, an interpretation or a claim that the image does not show.
 *
 *  3. Sales are not profit, and store sales are not ad-attributed sales
 *     (docs/CLAUDE.md). Captions say "sales" only when the screenshot does.
 *
 *  4. Nothing here may show another business's figures. The Odoo order list is
 *     the redacted crop for exactly that reason — the full export includes
 *     other stores' rows and a combined total that is not Bloomy's and not
 *     Mahmoud's.
 *
 * LAYOUT: `span` is the item's width on the desktop 12-column grid, picked so
 * each capture lands at or just under its own natural pixel width — nothing is
 * ever upscaled. Swap a screenshot and you must re-check its span against the
 * new natural width, or it will either blur or leave a hole in the grid.
 *
 * The array order is the reading order, on desktop and on mobile: strongest
 * result first.
 */

export interface ResultShot {
  id: string;
  src: string;
  width: number;
  height: number;
  /** Names the shot in alt text even when the logo replaces it visually. */
  brand: string;
  /** The brand's real logo from the project. Omit it and the name shows as
   *  text instead — never substitute a drawn or generated mark. */
  logo?: string;
  /** Tool + period, exactly as legible on the screenshot. */
  caption: Localized;
  alt: Localized;
  /** Desktop grid width, out of 12. */
  span: 4 | 5 | 7 | 8 | 12;
}

export const resultsShowcase = {
  label: { ar: 'نتايج', en: 'Results' } satisfies Localized,
  title: { ar: 'بعض النتائج', en: 'Some Results' } satisfies Localized,
  lede: {
    ar: 'أرقام حقيقية من شغل حقيقي.',
    en: 'Real numbers from real work.',
  } satisfies Localized,

  /** Says where the pictures come from without adding a claim to them. */
  note: {
    ar: 'لقطات من الداشبوردات نفسها. اضغط على أي صورة تشوفها كاملة.',
    en: 'Screenshots from the dashboards themselves. Open any image to read it in full.',
  } satisfies Localized,

  openLabel: { ar: 'اعرض الصورة كاملة', en: 'Open full size' } satisfies Localized,

  shots: [
    {
      id: 'bloomy-shopify',
      src: '/work/bloomy/results-shopify.webp',
      width: 869,
      height: 331,
      brand: 'Bloomy',
      logo: '/work/bloomy/logo.webp',
      caption: {
        ar: 'Shopify · آخر 47 يوم · 28 أبريل – 14 يونيو 2026',
        en: 'Shopify · last 47 days · Apr 28 – Jun 14, 2026',
      },
      alt: {
        ar: 'داشبورد Shopify لستور Bloomy: 21.9K جلسة، إجمالي مبيعات EGP 1.02M، 1,229 أوردر، ومعدل تحويل 5.44%.',
        en: "Bloomy's Shopify dashboard: 21.9K sessions, EGP 1.02M total sales, 1,229 orders and a 5.44% conversion rate.",
      },
      span: 8,
    },
    {
      id: 'cove-shopify',
      src: '/work/cove/results-1.webp',
      width: 692,
      height: 395,
      brand: 'Cove',
      logo: '/work/cove/logo.webp',
      caption: {
        ar: 'Shopify · 9 مايو – 14 يوليو 2026',
        en: 'Shopify · May 9 – Jul 14, 2026',
      },
      alt: {
        ar: 'داشبورد Shopify لستور Cove: 35.7K جلسة، إجمالي مبيعات EGP 1,013,875، 1,526 أوردر، ومعدل تحويل 4.14%.',
        en: "Cove's Shopify dashboard: 35.7K sessions, EGP 1,013,875 total sales, 1,526 orders and a 4.14% conversion rate.",
      },
      span: 4,
    },
    {
      id: 'veloura-shopify',
      src: '/work/veloura/results-shopify-7-14.webp',
      width: 768,
      height: 438,
      brand: 'Veloura',
      logo: '/work/veloura/logo.webp',
      caption: {
        ar: 'Shopify · 7–14 سبتمبر 2026',
        en: 'Shopify · Sep 7–14, 2026',
      },
      alt: {
        ar: 'داشبورد Shopify لستور Veloura: 20.1K جلسة، إجمالي مبيعات EGP 773.9K، 988 أوردر، ومتوسط قيمة الأوردر EGP 718.46.',
        en: "Veloura's Shopify dashboard: 20.1K sessions, EGP 773.9K total sales, 988 orders and an EGP 718.46 average order value.",
      },
      span: 7,
    },
    {
      id: 'bloomy-erp-orders',
      src: '/work/bloomy/results-2.webp',
      width: 1413,
      height: 410,
      brand: 'Bloomy',
      logo: '/work/bloomy/logo.webp',
      caption: {
        ar: 'Odoo ERP · إجماليات أوردرات Bloomy · بيانات العملاء متخفية',
        en: "Odoo ERP · Bloomy's order totals · customer data redacted",
      },
      alt: {
        ar: 'قائمة أوردرات في Odoo ERP بإجماليات صفوف Bloomy، وأعمدة بيانات العملاء متخفية.',
        en: "An Odoo ERP order list showing the totals on Bloomy's rows, with the customer data columns redacted.",
      },
      span: 8,
    },
    {
      id: 'bloomy-erp-monthly',
      src: '/work/bloomy/results-1.webp',
      width: 257,
      height: 172,
      brand: 'Bloomy',
      logo: '/work/bloomy/logo.webp',
      caption: {
        ar: 'Odoo ERP · إجماليات شهرية · فبراير – يونيو 2026',
        en: 'Odoo ERP · monthly totals · Feb – Jun 2026',
      },
      alt: {
        ar: 'إجماليات شهرية من Odoo ERP لشهور فبراير حتى يونيو 2026.',
        en: 'Monthly totals in Odoo ERP for February through June 2026.',
      },
      span: 4,
    },
  ] satisfies ResultShot[],
};
