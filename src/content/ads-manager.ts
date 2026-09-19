import type { Localized } from './types';

/**
 * "Ads Manager" — real captures from the ad accounts Mahmoud ran.
 *
 * RULES, all load-bearing:
 *
 *  1. Every entry is a REAL capture supplied by Mahmoud. Never generate,
 *     redraw, retouch or reconstruct one, and never alter a figure inside one.
 *
 *  2. Captions state only what is legible ON the capture — platform, view and
 *     objective. No interpretation and no metric the image does not display.
 *
 *     DATES: print a range only when it is a window Mahmoud actually worked
 *     in. Meta's "Maximum" preset reports the date the AD ACCOUNT opened,
 *     which on these accounts is 2023 — printing that made the work read as
 *     if it had run for three years. Those ranges were removed on 2026-09-15
 *     and must not come back; the note tells the reader that a capture with
 *     no range is a full-period view.
 *
 *  3. READ THE RESULT COLUMN BEFORE WRITING A CAPTION. "Website purchases" and
 *     "Conversions" are purchases. "Messaging conversations" are NOT orders and
 *     must never be called orders (docs/CLAUDE.md: messages are not orders).
 *
 *  4. Spend is spend on that account in that view. Never pair it with a revenue
 *     figure here to imply a ROAS the capture does not itself state.
 *
 * ORDER (set by Mahmoud, 2026-09-14): the website/purchase campaigns come
 * first, the messaging campaigns after them, each group strongest first. The
 * `objective` field drives that grouping — keep it accurate.
 */

export interface AdsShot {
  id: string;
  src: string;
  width: number;
  height: number;
  /** The ad account the capture is from. */
  brand: string;
  /** 'web' = purchases/conversions. 'messaging' = messaging conversations. */
  objective: 'web' | 'messaging';
  caption: Localized;
  alt: Localized;
  feature?: boolean;
}

export const adsManager = {
  label: { ar: 'الإعلانات', en: 'Ads Manager' } satisfies Localized,
  title: {
    ar: 'صور من الـAds Manager',
    en: 'Ads Manager',
  } satisfies Localized,
  lede: {
    ar: 'بعض نتايج الإعلانات — شكل الشغل نفسه جوّه الحسابات.',
    en: 'Some of the ad results — what the work actually looked like inside the accounts.',
  } satisfies Localized,

  /** Group headings. They describe the objective, they do not claim anything. */
  groups: {
    web: {
      ar: 'حملات شراء من الموقع',
      en: 'Website purchase campaigns',
    } satisfies Localized,
    messaging: {
      ar: 'حملات المسجات',
      en: 'Messaging campaigns',
    } satisfies Localized,
  },

  note: {
    ar: 'لقطات من الحسابات نفسها. اضغط على أي صورة تقرأ الأرقام كاملة. اللقطة اللي مكتوب جنبها تاريخ، ده التاريخ اللي ظاهر في الصورة نفسها؛ والباقي معروض على كل فترة الحساب. و«Messaging conversations» دي محادثات، مش أوردرات.',
    en: 'Captures from the accounts themselves. Open any image to read the figures in full. Where a capture carries a date range, that is the range shown in the image itself; the rest are the account\'s full-period view. "Messaging conversations" are conversations, not orders.',
  } satisfies Localized,

  openLabel: { ar: 'اعرض الصورة كاملة', en: 'Open full size' } satisfies Localized,

  shots: [
    // ---------------------------------------------- website / purchases
    {
      id: 'veloura-adset-purchases',
      src: '/work/veloura/ads-adset-purchases.webp',
      width: 1836,
      height: 562,
      brand: 'Veloura',
      objective: 'web',
      caption: {
        ar: 'Meta · Ad set · 6 – 14 سبتمبر 2026',
        en: 'Meta · ad set · Sep 6 – 14, 2026',
      },
      alt: {
        ar: 'Meta Ads Manager: ad set باسم Broad Audience، 293 website purchase، تكلفة الشراء EGP 27.54، وصرف EGP 8,068.78.',
        en: 'Meta Ads Manager: an ad set named Broad Audience with 293 website purchases, EGP 27.54 per purchase and EGP 8,068.78 spent.',
      },
      feature: true,
    },
    {
      id: 'veloura-adsets-three',
      src: '/work/veloura/ads-adsets-three.webp',
      width: 1860,
      height: 604,
      brand: 'Veloura',
      objective: 'web',
      caption: {
        ar: 'Meta · 3 ad sets · 6 – 14 سبتمبر 2026',
        en: 'Meta · three ad sets · Sep 6 – 14, 2026',
      },
      alt: {
        ar: 'Meta Ads Manager: ثلاث ad sets بإجمالي 289 website purchase، تكلفة الشراء EGP 16.19، وصرف EGP 4,680.27.',
        en: 'Meta Ads Manager: three ad sets totalling 289 website purchases, EGP 16.19 per purchase and EGP 4,680.27 spent.',
      },
    },
    {
      id: 'veloura-active-all',
      src: '/work/veloura/ads-active-all.webp',
      width: 1867,
      height: 825,
      brand: 'Veloura',
      objective: 'web',
      caption: {
        ar: 'Meta · الإعلانات الشغّالة',
        en: 'Meta · active ads',
      },
      alt: {
        ar: 'Meta Ads Manager: نتايج من 19 إعلان بإجمالي 581 website purchase، تكلفة الشراء EGP 21.92، وصرف EGP 12,738.14.',
        en: 'Meta Ads Manager: results from 19 ads totalling 581 website purchases, EGP 21.92 per purchase and EGP 12,738.14 spent.',
      },
    },
    {
      id: 'bloomy-purchases-roas',
      src: '/work/bloomy/ads-purchases-roas.webp',
      width: 1875,
      height: 540,
      brand: 'Bloomy',
      objective: 'web',
      caption: {
        ar: 'Meta · حملات بأعمدة Purchases و Purchase ROAS',
        en: 'Meta · campaigns with Purchases and Purchase ROAS columns',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب Bloomy: جدول حملات بأعمدة الصرف، Purchases، Website purchases، Purchase ROAS، تكلفة النتيجة، والـ CTR.',
        en: "Meta Ads Manager for the Bloomy account: a campaign table with columns for amount spent, purchases, website purchases, purchase ROAS, cost per result and CTR.",
      },
    },
    {
      id: 'veloura-tiktok',
      src: '/work/veloura/tiktok-dashboard.webp',
      width: 1757,
      height: 779,
      brand: 'Veloura',
      objective: 'web',
      caption: {
        ar: 'TikTok Ads Manager · 9 – 14 سبتمبر 2026',
        en: 'TikTok Ads Manager · Sep 9 – 14, 2026',
      },
      alt: {
        ar: 'داشبورد TikTok Ads Manager: صرف EGP 3,672.48، تكلفة التحويل EGP 14.40، CTR 2.89%، و255 تحويل.',
        en: 'The TikTok Ads Manager dashboard: EGP 3,672.48 spent, EGP 14.40 cost per conversion, 2.89% CTR and 255 conversions.',
      },
    },
    {
      id: 'veloura-adset-daily',
      src: '/work/veloura/results-7.webp',
      width: 890,
      height: 295,
      brand: 'Veloura',
      objective: 'web',
      caption: {
        ar: 'Meta · Ad set مقسّم باليوم · 7 – 11 سبتمبر 2026',
        en: 'Meta · ad set, broken down by day · Sep 7 – 11, 2026',
      },
      alt: {
        ar: 'Meta Ads Manager: ad set باسم Broad Audience، 166 purchase، تكلفة الشراء EGP 34.31، وصرف EGP 5,488.92، مقسّمة على الأيام.',
        en: 'Meta Ads Manager: an ad set named Broad Audience with 166 purchases, EGP 34.31 per purchase and EGP 5,488.92 spent, broken down by day.',
      },
    },

    // ------------------------------------------------------- messaging
    {
      id: 'bloomy-messaging',
      src: '/work/bloomy/ads-messaging.webp',
      width: 1875,
      height: 765,
      brand: 'Bloomy',
      objective: 'messaging',
      caption: {
        ar: 'Meta · الحملات',
        en: 'Meta · campaigns',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب Bloomy: جدول حملات بنتيجة Messaging conversations، أعلاها 12,385 محادثة بتكلفة EGP 1.83 للمحادثة.',
        en: 'Meta Ads Manager for the Bloomy account: a campaign table reporting messaging conversations, the top row showing 12,385 conversations at EGP 1.83 each.',
      },
    },
    {
      id: 'veloura-campaigns-all',
      src: '/work/veloura/ads-campaigns-all.webp',
      width: 1858,
      height: 842,
      brand: 'Veloura',
      objective: 'messaging',
      caption: {
        ar: 'Meta · كل الحملات',
        en: 'Meta · all campaigns',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب Veloura: نتايج من 110 حملة، بإجمالي صرف EGP 191,377.52.',
        en: 'Meta Ads Manager for the Veloura account: results from 110 campaigns with EGP 191,377.52 total spent.',
      },
    },
    {
      id: 'dahab-campaigns',
      src: '/work/dahab-decor/ads-campaigns.webp',
      width: 1872,
      height: 588,
      brand: 'Dahab Decor',
      objective: 'messaging',
      caption: {
        ar: 'Meta · الحملات',
        en: 'Meta · campaigns',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب DAHAB DECOR: جدول حملات بنتيجة Messaging conversations، أعلاها 3,212 محادثة بتكلفة EGP 2.04 للمحادثة.',
        en: 'Meta Ads Manager for the DAHAB DECOR account: a campaign table reporting messaging conversations, the top row showing 3,212 conversations at EGP 2.04 each.',
      },
    },
    {
      id: 'el-haramein-ads',
      src: '/work/el-haramein/results-1.webp',
      width: 1920,
      height: 788,
      brand: 'El Haramein',
      objective: 'messaging',
      caption: {
        ar: 'Meta · كل الإعلانات',
        en: 'Meta · all ads',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب El Haramein For Lighting: جدول إعلانات بأعمدة النتيجة وتكلفة النتيجة والصرف والمشاهدات والوصول.',
        en: 'Meta Ads Manager for the El Haramein For Lighting account: an ad table with columns for results, cost per result, amount spent, impressions and reach.',
      },
    },
    {
      id: 'brilliant-campaigns',
      src: '/work/brilliant/ads-campaigns.webp',
      width: 1868,
      height: 691,
      brand: 'Brilliant',
      objective: 'messaging',
      caption: {
        ar: 'Meta · الحملات',
        en: 'Meta · campaigns',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب Brilliant Ads: جدول حملات بنتيجة Messaging conversations، أعلاها 1,142 محادثة بتكلفة EGP 10.56 للمحادثة.',
        en: 'Meta Ads Manager for the Brilliant Ads account: a campaign table reporting messaging conversations, the top row showing 1,142 conversations at EGP 10.56 each.',
      },
    },
    {
      id: 'pinky-mobile',
      src: '/work/pinky/ads-campaigns-mobile.webp',
      width: 453,
      height: 847,
      /*
        THE ACCOUNT NAME IS BLURRED IN THE CAPTURE, so it cannot be written
        here either. It was in three places this field reaches — the caption
        under the image, the lightbox caption and the button's accessible
        name — and a blurred name with the name printed beneath it is not a
        redaction. Every figure in the image is untouched; only the account
        it belongs to is withheld.
      */
      brand: 'Client account',
      objective: 'messaging',
      caption: {
        ar: 'Meta · الحملات من الموبايل',
        en: 'Meta · campaigns, from mobile',
      },
      alt: {
        ar: 'تطبيق Meta Ads على الموبايل لحساب عميل: مبلغ منفق 164,801.61 ج.م، وحملتين نشطتين — واحدة بـ 1,947 محادثة بتكلفة 1.92 ج.م، والتانية بـ 5,516 محادثة بتكلفة 2.06 ج.م.',
        en: 'The Meta Ads mobile app for a client account: EGP 164,801.61 spent, and two active campaigns — one with 1,947 messaging conversations at EGP 1.92 each, the other with 5,516 at EGP 2.06 each.',
      },
    },
    {
      id: 'fakhama-adsets',
      src: '/work/fakhama/ads-adsets.webp',
      width: 1872,
      height: 459,
      brand: 'Fakhama',
      objective: 'messaging',
      caption: {
        ar: 'Meta · Ad sets لحملة واحدة',
        en: 'Meta · ad sets in one campaign',
      },
      alt: {
        ar: 'Meta Ads Manager لحساب Fkhama: ad sets بنتيجة Messaging conversations، 2,824 محادثة بتكلفة EGP 0.54 للمحادثة على واحدة منها.',
        en: 'Meta Ads Manager for the Fkhama account: ad sets reporting messaging conversations, one showing 2,824 conversations at EGP 0.54 each.',
      },
    },
  ] satisfies AdsShot[],
};
