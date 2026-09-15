import type { Localized } from './types';

/**
 * Section 6 — Selected work, the dark stacking deck.
 *
 * The cards read their brand, figure and link from `projects.ts`, so a number
 * still only ever lives in one place. This file decides which four are
 * featured, what the section around them says, and which real screenshots
 * each card shows.
 */

/**
 * One image inside a card's evidence grid.
 *
 * `fit: 'contain'` exists because several of the real assets are phone
 * screenshots only ~300px wide. Stretched to fill a card column they go soft,
 * and a soft screenshot reads as a fake one — so those sit inside the frame at
 * their own size instead, on a slightly lifted surface.
 */
export interface WorkShot {
  src: string;
  width: number;
  height: number;
  fit: 'cover' | 'contain';
  alt: Localized;
}

export const work = {
  eyebrow: { ar: 'شغلي', en: 'Selected work' } satisfies Localized,

  title: {
    ar: 'أربع براندات، وكل واحد فيهم مشكلة مختلفة',
    en: 'Four brands, four different problems',
  } satisfies Localized,

  intro: {
    ar: 'مش نفس الشغل اتكرر أربع مرات. كل براند فيهم كان محتاج حاجة تانية خالص — واحد محتاج ستور، وواحد محتاج تشغيل، وواحد محتاج محتوى.',
    en: 'Not the same job four times over. Each of these needed something different — one needed a store, one needed operations, one needed content.',
  } satisfies Localized,

  /** Order matters — this is the order they stack in. */
  featured: ['bloomy', 'cove', 'veloura', 'fakhama'],

  /**
   * Up to three real assets per card: two wide ones stacked, and a tall one
   * beside them. Cards with fewer images render fewer — inventing a filler
   * image to balance a grid would be the one dishonest pixel on the page.
   */
  shots: {
    bloomy: [
      {
        src: '/work/bloomy/results-shopify.webp',
        width: 869,
        height: 331,
        fit: 'contain',
        alt: {
          ar: 'داشبورد Shopify لـ Bloomy على 47 يوم: 21.9 ألف زيارة، مليون و20 ألف جنيه مبيعات، 1,229 أوردر، 5.44% conversion.',
          en: "Bloomy's 47-day Shopify dashboard: 21.9K sessions, EGP 1.02M in sales, 1,229 orders, 5.44% conversion.",
        },
      },
      {
        src: '/work/bloomy/ops-2.webp',
        width: 1920,
        height: 1080,
        fit: 'cover',
        alt: {
          ar: 'ستوك Bloomy المطبوع قلوب، متغلّف ومرصوص في المخزن.',
          en: "Bloomy's heart-print stock, bagged and stacked in the storeroom.",
        },
      },
      /*
       * The fabric, not the invoice for it. `ops-1` is the stronger single
       * piece of operational evidence, but it carries a supplier's name and
       * handwritten fabric prices, and the home page is not the place for
       * either. It keeps its slot inside the Bloomy case study, where there
       * is copy around it. Here the roll of heart-print cotton says the same
       * thing — he was in the supply chain, not just the ad account — and it
       * pairs with `ops-2` above it, which is that same print finished,
       * bagged and stacked.
       */
      {
        src: '/work/bloomy/ops-4.webp',
        width: 960,
        height: 1101,
        fit: 'cover',
        alt: {
          ar: 'توب قماش قطن مطبوع قلوب مفرود على ترابيزة القص — نفس البرنت اللي في الستوك المتغلّف.',
          en: 'A roll of heart-print cotton laid out on the cutting table — the same print as the bagged stock.',
        },
      },
    ],
    cove: [
      {
        src: '/work/cove/results-1.webp',
        width: 692,
        height: 395,
        fit: 'contain',
        alt: {
          ar: 'داشبورد Shopify لـ Cove: مليون و13 ألف جنيه مبيعات، 1,526 أوردر، 35.7 ألف زيارة، 4.14% conversion.',
          en: "Cove's Shopify dashboard: EGP 1.01M in sales, 1,526 orders, 35.7K sessions, 4.14% conversion.",
        },
      },
      {
        src: '/work/cove/creative-1.webp',
        width: 563,
        height: 440,
        fit: 'cover',
        alt: {
          ar: 'كرييتف من Cove.',
          en: 'A Cove creative.',
        },
      },
      {
        src: '/work/cove/ops-1.webp',
        width: 1500,
        height: 2000,
        fit: 'cover',
        alt: {
          ar: 'مخزن Cove — الاستوك مترتّب على الرفوف.',
          en: "Cove's storeroom, stock arranged on the shelves.",
        },
      },
    ],
    veloura: [
      {
        src: '/work/veloura/results-8.webp',
        width: 1223,
        height: 440,
        fit: 'contain',
        alt: {
          ar: 'داشبورد Shopify لـ Veloura من 7 لـ 12 سبتمبر 2026: 465,925 جنيه مبيعات و563 أوردر.',
          en: "Veloura's Shopify dashboard, 7-12 September 2026: EGP 465,925 in sales and 563 orders.",
        },
      },
      {
        src: '/work/veloura/results-7.webp',
        width: 1223,
        height: 440,
        fit: 'contain',
        alt: {
          ar: 'جدول الـ ad sets في Meta Ads Manager لحملات Veloura.',
          en: "The Meta Ads Manager ad-set table for Veloura's campaigns.",
        },
      },
      {
        src: '/work/veloura/website-3.webp',
        width: 293,
        height: 521,
        fit: 'contain',
        alt: {
          ar: 'صفحة منتج من ستور Veloura على الموبايل.',
          en: "A product page from Veloura's store on mobile.",
        },
      },
    ],
    fakhama: [
      {
        src: '/work/fakhama/creative-1.webp',
        width: 1536,
        height: 326,
        fit: 'contain',
        alt: {
          ar: 'حساب Fakhama على TikTok — 43.6 ألف متابع.',
          en: "Fakhama's TikTok account — 43.6K followers.",
        },
      },
    ],
  } as Record<string, WorkShot[]>,

  /** Shown on a card only when that project has its own page. */
  readCase: { ar: 'اقرا الحالة كاملة', en: 'Read the case study' } satisfies Localized,

  allHref: '/projects',
  allLabel: {
    ar: 'كل المشاريع (8)',
    en: 'All projects (8)',
  } satisfies Localized,
};
