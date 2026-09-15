import type { Localized } from './types';

export interface JourneyStep {
  src: string;
  /** Natural size, so the layout can reserve space and never upscale past it. */
  width: number;
  height: number;
  /** Shown under the capsule. Each one names the stage it actually shows. */
  caption: Localized;
  alt: Localized;
}

/**
 * Section 4 — the order's journey, told in four real photos.
 * No heading; the caption carries it.
 *
 * Every image here is publishable as-is or comes from <project>/_redacted/.
 * Arabic drafted by Claude is marked // REVIEW.
 */
export const behind = {
  caption: {
    ar: 'من قلب الشغل',
    en: 'Behind the orders',
  } satisfies Localized,

  steps: [
    {
      src: '/work/bloomy/ops-4.webp',
      width: 960,
      height: 1101,
      // REVIEW
      caption: { ar: 'الخامة قبل ما تتقص', en: 'Fabric, before it is cut' },
      alt: {
        ar: 'قماش وردي بنقشة قلوب مفرود على ترابيزة القص في المصنع.',
        en: 'Pink heart-print fabric laid out on the cutting table.',
      },
    },
    {
      src: '/work/cove/ops-1.webp',
      width: 1500,
      height: 2000,
      // REVIEW
      caption: { ar: 'المخزن بيتظبط', en: 'Stock, kept in order' },
      alt: {
        ar: 'أرفف مخزن Cove مرصوصة بالمنتجات مقسّمة بالموديل واللون.',
        en: "Cove's stockroom shelves, sorted by style and colour.",
      },
    },
    {
      src: '/work/bloomy/orders-1.webp',
      width: 2000,
      height: 543,
      // REVIEW
      caption: { ar: 'المنتج متغلّف وجاهز', en: 'Packed and ready' },
      alt: {
        ar: 'قطع من منتجات Bloomy متغلّفة ومرصوصة استعدادًا للشحن.',
        en: 'Bloomy pieces bagged and stacked, ready to be dispatched.',
      },
    },
    {
      src: '/work/personal/work-3.webp',
      width: 959,
      height: 1280,
      // REVIEW
      caption: { ar: 'الأوردرات قبل ما تتسلّم', en: 'Orders, before handover' },
      alt: {
        ar: 'محمود عاطف وسط أوردرات متجهّزة على الأرض قبل تسليمها لشركة الشحن.',
        en: 'Mahmoud Atef among packed orders on the floor before the courier collects them.',
      },
    },
  ] satisfies JourneyStep[],
};
