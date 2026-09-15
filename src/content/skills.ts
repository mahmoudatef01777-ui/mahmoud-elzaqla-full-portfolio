import type { Localized } from './types';

export interface Skill {
  id: string;
  label: Localized;
  /**
   * Proof image for this row. Not rendered right now — the skills block is a
   * clean list (see Skills.tsx) — but kept so the capsule can return once
   * there are pictures worth showing.
   */
  proof?: {
    src: string;
    width: number;
    height: number;
    /** Must describe what the image actually shows. */
    caption: Localized;
    alt: Localized;
  };
}

/**
 * Section 5 — the orange block. Hovering (or tapping) a row highlights it and
 * swaps the capsule beside the list. Arabic drafted by Claude is // REVIEW.
 */
export const skills = {
  title: { ar: 'بشتغل في إيه', en: 'What I do' } satisfies Localized,

  learning: {
    ar: 'بتعلّم دلوقتي: GA4 · GTM',
    en: 'Currently learning: GA4 · GTM',
  } satisfies Localized,

  items: [
    {
      id: 'meta-ads',
      label: {
        ar: 'إعلانات Meta: تشغيل وتحليل وتحسين',
        en: 'Meta Ads: setup, analysis, optimization',
      },
      // docs/context.md marks bloomy/creative-1..3 [NV]: some early creatives
      // were a supplier's reels. Nothing verified to show here yet.
    },
    {
      id: 'shopify',
      label: {
        ar: 'ستورات Shopify والـ CRO',
        en: 'Shopify stores & CRO',
      },
      proof: {
        src: '/work/cove/website-1.webp',
        width: 323,
        height: 482,
        // REVIEW
        caption: { ar: 'ستور Cove على الموبايل', en: "Cove's store on mobile" },
        alt: {
          ar: 'شاشة من ستور Cove على Shopify معروضة على الموبايل.',
          en: "A screen from Cove's Shopify store on mobile.",
        },
      },
    },
    {
      id: 'operations',
      label: {
        ar: 'تشغيل الـ e-commerce: أوردرات ومرتجعات وERP',
        en: 'E-commerce operations: orders, returns, ERP',
      },
      proof: {
        src: '/work/personal/work-3.webp',
        width: 959,
        height: 1280,
        // REVIEW
        caption: { ar: 'أوردرات متجهّزة للشحن', en: 'Orders staged for dispatch' },
        alt: {
          ar: 'محمود عاطف وسط أوردرات متجهّزة قبل تسليمها لشركة الشحن.',
          en: 'Mahmoud Atef among packed orders before the courier collects them.',
        },
      },
    },
    {
      id: 'creative',
      label: {
        ar: 'الكريتيف والتصوير',
        en: 'Creative direction & shoots',
      },
      proof: {
        src: '/work/fakhama/creative-1.webp',
        width: 1536,
        height: 326,
        // REVIEW
        caption: { ar: 'كرياتيف لـ Fakhama', en: 'Creative for Fakhama' },
        alt: {
          ar: 'كرياتيف من شغل Fakhama.',
          en: 'A creative produced for Fakhama.',
        },
      },
    },
    // No published TikTok asset yet that matches this row honestly.
    {
      id: 'tiktok',
      label: { ar: 'إعلانات TikTok', en: 'TikTok Ads' },
    },
    // Nothing to show here that is not a stock illustration, so no image.
    {
      id: 'ai',
      label: {
        ar: 'AI وأتمتة بـ Claude Code',
        en: 'AI & automation with Claude Code',
      },
    },
  ] satisfies Skill[],
};
