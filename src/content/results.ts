import type { Localized } from './types';

export interface ResultCard {
  id: string;
  brand: string;
  logo: string;
  badge?: Localized;
  /** The headline figure, pre-formatted. */
  number: Localized;
  /** What the number is. */
  numberLabel: Localized;
  /** What Mahmoud did. */
  did: Localized;
  /** Spend, where it is known. */
  spend?: Localized;
  /** Source and period. Never ship a number without this. */
  source: Localized;
  /** Optional: a card waiting on its screenshot shows none at all rather
   *  than borrowing one that shows different figures. */
  image?: {
    src: string;
    width: number;
    height: number;
    /**
     * What the screenshot itself shows. It is not always the headline figure
     * — e.g. Veloura's headline counts store orders while the screenshot is
     * the Meta ad-set view — so the caption states the screenshot's own
     * numbers rather than letting it imply the headline.
     */
    caption: Localized;
    alt: Localized;
  };
}

export interface CompactCard {
  id: string;
  brand: string;
  logo: string;
  did: Localized;
}

/**
 * Section — Results. Every figure traces to docs/context.md.
 * Sales are never called profit. Self-reported figures say so.
 * Arabic drafted by Claude is marked // REVIEW.
 */
export const results = {
  title: { ar: 'النتايج', en: 'Results' } satisfies Localized,
  subtitle: { ar: 'كل رقم ومصدره', en: 'Every number, with its source' } satisfies Localized,

  cards: [
    {
      id: 'bloomy',
      brand: 'Bloomy',
      logo: '/work/bloomy/logo.webp',
      badge: { ar: 'براندي أنا', en: 'my own brand' },
      number: { ar: 'EGP 3.17M', en: 'EGP 3.17M' },
      numberLabel: {
        ar: 'إجمالي مبيعات البراند المتسجّلة',
        en: "the brand's total recorded sales",
      },
      did: {
        ar: 'بنيت الستور وشغّلت الإعلانات والتشغيل',
        en: 'built the store, ran the ads and the operations',
      },
      spend: { ar: 'صرف إعلانات: EGP 145K', en: 'ad spend: EGP 145K' },
      source: {
        ar: 'Odoo ERP · كل فترة البراند',
        en: "Odoo ERP · the brand's whole run",
      },
      image: {
        src: '/work/bloomy/results-1.webp',
        width: 257,
        height: 172,
        /*
         * The screenshot totals EGP 2.94M and the headline says 3.17M. They
         * are not in conflict: this screen is the Feb-Jun monthly view, one
         * slice of the ERP record, while the headline is the brand's whole
         * run. The caption has to say that outright — an unexplained gap
         * between a figure and the evidence under it reads as inflation.
         */
        // REVIEW
        caption: {
          ar: 'Odoo ERP — شاشة المبيعات شهر بشهر: فبراير 540,970 · مارس 383,621 · أبريل 311,636 · مايو 1,234,532 · يونيو 473,306، يعني EGP 2.94M. الشاشة دي بتغطي الخمس شهور دول بس — إجمالي البراند على كل فترته EGP 3.17M.',
          en: "Odoo ERP — the month-by-month sales screen: Feb 540,970 · Mar 383,621 · Apr 311,636 · May 1,234,532 · Jun 473,306, or EGP 2.94M. This screen covers those five months only — the brand's total across its whole run is EGP 3.17M.",
        },
        alt: {
          ar: 'جدول من Odoo ERP بمبيعات Bloomy الشهرية من فبراير لحد يونيو 2026.',
          en: "An Odoo ERP table of Bloomy's monthly sales from February to June 2026.",
        },
      },
    },
    {
      id: 'cove',
      brand: 'Cove',
      logo: '/work/cove/logo.webp',
      number: { ar: 'EGP 1.01M', en: 'EGP 1.01M' },
      numberLabel: { ar: '1,526 أوردر organic', en: '1,526 organic orders' },
      did: {
        ar: 'بنيت الستور وشغّلت العمليات والمبيعات',
        en: 'built the store, ran operations and sales',
      },
      spend: { ar: 'من غير صرف إعلانات', en: 'no ad spend' },
      source: { ar: 'Shopify · مايو–يوليو 2026', en: 'Shopify · May–Jul 2026' },
      image: {
        src: '/work/cove/results-1.webp',
        width: 692,
        height: 395,
        // REVIEW
        caption: {
          ar: 'Shopify — 1,013,875 جنيه · 1,526 أوردر · 35.7 ألف زيارة · 4.14% تحويل',
          en: 'Shopify — EGP 1,013,875 · 1,526 orders · 35.7K sessions · 4.14% conversion',
        },
        alt: {
          ar: 'داشبورد Shopify لستور Cove من 9 مايو لحد 14 يوليو 2026.',
          en: "Cove's Shopify dashboard covering May 9 to July 14, 2026.",
        },
      },
    },
    {
      id: 'veloura',
      brand: 'Veloura',
      logo: '/work/veloura/logo.webp',
      badge: { ar: 'شغال دلوقتي', en: 'live' },
      number: { ar: '988 أوردر', en: '988 orders' },
      numberLabel: {
        ar: 'EGP 773.9K مبيعات الستور · أول 7 أيام إعلانات',
        en: 'EGP 773.9K in store sales · first 7 days of ads',
      },
      did: {
        ar: 'بنيت الستور وبشغّل Meta وTikTok',
        en: 'built the store, running Meta and TikTok',
      },
      spend: {
        ar: 'صرف إعلانات: EGP 13,629 على Meta + EGP 4,061 على TikTok',
        en: 'ad spend: EGP 13,629 on Meta + EGP 4,061 on TikTok',
      },
      source: {
        ar: 'Shopify · 7–14 سبتمبر 2026 · نتايج مبكرة',
        en: 'Shopify · Sep 7–14, 2026 · early results',
      },
      image: {
        src: '/work/veloura/results-shopify-7-14.webp',
        width: 768,
        height: 438,
        // REVIEW
        caption: {
          ar: 'Shopify — 988 أوردر · EGP 773.9K · 20.1 ألف زيارة · متوسط أوردر EGP 718.46 · 7–14 سبتمبر 2026',
          en: 'Shopify — 988 orders · EGP 773.9K · 20.1K sessions · EGP 718.46 average order · Sep 7–14, 2026',
        },
        alt: {
          ar: 'داشبورد Shopify لستور Veloura من 7 لـ 14 سبتمبر 2026: 988 أوردر وEGP 773.9K مبيعات.',
          en: "Veloura's Shopify dashboard for Sep 7-14, 2026: 988 orders and EGP 773.9K in sales.",
        },
      },
    },
    {
      /*
        Moved out of `compact` on 2026-09-15. It sat there with no figure
        because there was none to publish; Mahmoud supplied the sales that
        day, so the row now carries them like every other funded case.

        The headline is the sales, not the door count, because EGP 770,000
        against EGP 11,000 of spend is the whole point of the case. Both
        numbers are the owner's, which is what `source` says — nothing here
        came off a dashboard, unlike the spend beside it.
      */
      id: 'dahab-decor',
      brand: 'Dahab Decor',
      logo: '/work/dahab-decor/logo.webp',
      number: { ar: '~EGP 770,000', en: '~EGP 770,000' },
      numberLabel: {
        ar: 'مبيعات ~70 باب من كامبين صرفه EGP 11,000',
        en: 'sales across ~70 doors from an EGP 11,000 campaign',
      },
      did: {
        ar: 'بنيت البنية الإعلانية لمنتج high-ticket ودرّبت الأونرز',
        en: 'built the ad setup for a high-ticket product and trained the owners',
      },
      spend: { ar: 'صرف إعلانات: EGP 11,000', en: 'ad spend: EGP 11,000' },
      source: { ar: 'رقم تقديري من البيزنس', en: 'Approximate, reported by the business' },
    },
    {
      id: 'fakhama',
      brand: 'Fakhama',
      logo: '/work/fakhama/logo.webp',
      number: { ar: '1.5M مشاهدة', en: '1.5M views' },
      numberLabel: {
        ar: 'على ريل واحد · 43.6K متابع على TikTok',
        en: 'on a single reel · 43.6K TikTok followers',
      },
      did: {
        ar: 'ظبطت البراند وأدرت الكريتيف والتصوير',
        en: 'rebuilt the brand, directed creative and shoots',
      },
      // No spend line: docs/master-context.md still lists Fakhama's spend and
      // period as needing verification, and this section promises a source for
      // every number on it.
      source: { ar: 'TikTok · 2026', en: 'TikTok · 2026' },
      image: {
        src: '/work/fakhama/creative-1.webp',
        width: 1536,
        height: 326,
        // REVIEW
        caption: {
          ar: 'أعلى ٦ ريلز على TikTok: 1.5M · 1.2M · 1.2M · 889.1K · 474.3K · 401K مشاهدة',
          en: 'Top six TikTok reels: 1.5M · 1.2M · 1.2M · 889.1K · 474.3K · 401K views',
        },
        alt: {
          ar: 'ستة ريلز من TikTok لـ Fakhama وتحت كل واحد عدد مشاهداته.',
          en: 'Six TikTok reels for Fakhama, each showing its view count.',
        },
      },
    },
  ] satisfies ResultCard[],

  /** No numbers here: these engagements have no verified figures, and
   *  inventing parity would undermine the section. */
  compact: [
    {
      id: 'el-haramein',
      brand: 'El Haramein',
      logo: '/work/el-haramein/logo.webp',
      did: {
        ar: 'بنيت البنية الإعلانية وظبطت السوشيال وتجربة العميل',
        en: 'built the ad infrastructure, social presence and customer experience',
      },
    },
    {
      id: 'brilliant',
      brand: 'Brilliant',
      logo: '/work/brilliant/logo.webp',
      did: {
        ar: 'إعلانات ميسنجر + ببني ستور',
        en: 'messenger ads + building their store',
      },
    },
    {
      id: 'yours-shoes',
      brand: 'Yours Shoes',
      logo: '/work/yours-shoes/imgi-57-593287240-1126488553026048-5494534627175785149-n.webp',
      did: { ar: 'بنيت ستور Shopify', en: 'built their Shopify store' },
    },
    {
      id: 'kayan',
      brand: 'KAYAN',
      logo: '/work/kayan/logo.webp',
      did: {
        ar: 'بنيت ستور Shopify لبراند ستريت وير أطفال',
        en: 'built the Shopify store for a kids streetwear brand',
      },
    },
    {
      id: 'asloaraby',
      brand: 'أصله عربي',
      logo: '/work/asloaraby/logo.webp',
      did: {
        ar: 'بنيت ستور Shopify لبراند مستوحى من الإرث العربي',
        en: 'built the Shopify store for a heritage-led clothing brand',
      },
    },
  ] satisfies CompactCard[],
};
