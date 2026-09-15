import type { Localized } from './types';

/**
 * The statement and the closing line of the Positioning section (section 2).
 * The closing line renders separately because it is set apart on the page, not
 * because it is a different idea.
 *
 * Wording supplied by Mahmoud, revised 2026-09-14. Do not rewrite it into
 * smoother English — this is how he puts it. It must not repeat the hero
 * headline.
 */
export const about = {
  statement: {
    ar: 'قبل ما أشغّل أي إعلان، كنت حضرت آلاف الأوردرات، سوّيت حسابات شركات الشحن، واشتغلت على ERP. عشان كده لما بشتغل على براند، مش ببص على الإعلان بس — ببص على الستور، والتشغيل، واللي بيحصل بعد الأوردر.',
    en: "Before I ran any ad, I had already handled thousands of orders, reconciled courier accounts, and worked with an ERP. So when I work on a brand, I don't just look at the ad — I look at the store, the operations, and what happens after the order.",
  } satisfies Localized,

  highlight: {
    ar: 'النجاح مش إنك تجيب أوردر. النجاح إن الأوردر يوصل للعميل ومايرجعش.',
    en: "Success isn't just getting an order. It's getting the order delivered — and not having it come back.",
  } satisfies Localized,
};
