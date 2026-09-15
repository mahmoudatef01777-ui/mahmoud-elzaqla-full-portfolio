import type { Localized } from './types';

/**
 * The line that runs through the whole site: business to profitability.
 *
 * This exists because the site's job is to say "Mahmoud understands the
 * business behind the marketing" — and the quickest way to say it is to show
 * the whole chain and point out that most people only own one box of it.
 *
 * Arabic drafted by Claude is marked // REVIEW.
 */
export const chain = {
  label: { ar: 'الشغل كله خط واحد', en: "It's all one line" } satisfies Localized,

  statement: {
    // REVIEW
    ar: 'معظم الناس بتشتغل على مربع واحد من الخط ده. أنا بشتغل على الخط كله — وعشان كده بعرف المشكلة فين لما الأرقام تبوظ.',
    en: 'Most people own one box in this line. I work across all of it — which is why I can tell you where the problem is when the numbers go wrong.',
  } satisfies Localized,

  steps: [
    { ar: 'البيزنس', en: 'Business' },
    { ar: 'المنتج', en: 'Product' },
    { ar: 'السوق', en: 'Market' },
    { ar: 'الكرياتيف', en: 'Creative' },
    { ar: 'الإعلانات', en: 'Ads' },
    { ar: 'الموقع', en: 'Website' },
    { ar: 'الأوردرات', en: 'Orders' },
    { ar: 'التشغيل', en: 'Operations' },
    { ar: 'الربحية', en: 'Profitability' },
  ] satisfies Localized[],

  /** The boxes most people stop at — highlighted so the contrast lands. */
  commonScope: ['Creative', 'Ads'],

  footnote: {
    // REVIEW
    ar: 'الملوّن هو اللي معظم الميديا بايرز بيقفوا عنده.',
    en: 'The highlighted boxes are where most media buyers stop.',
  } satisfies Localized,
};
