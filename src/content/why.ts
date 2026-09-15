import type { Localized } from './types';

export interface WhyReason {
  id: string;
  headline: Localized;
  detail: Localized;
}

/**
 * Section — why hire me. An orange numbered block; each row expands on tap.
 * Arabic drafted by Claude is marked // REVIEW.
 */
export const why = {
  title: { ar: 'ليه تضمني لفريقك', en: 'Why hire me' } satisfies Localized,

  reasons: [
    {
      id: 'owner',
      headline: {
        ar: 'بفكر زي صاحب البيزنس، لأني كنت صاحب بيزنس فعلاً',
        en: 'I think like an owner — because I was one',
      },
      detail: {
        // REVIEW
        ar: 'بنيت Bloomy من الصفر: المنتج، الستور، الإعلانات، والتشغيل. يعني لما بشوف رقم، بشوف وراه التكلفة والمخزون والشحن، مش بس الـ dashboard.',
        en: 'I built Bloomy from scratch — product, store, ads and operations. So when I look at a number I see the cost, the stock and the shipping behind it, not just the dashboard.',
      },
    },
    {
      id: 'diagnose',
      headline: {
        ar: 'بكتشف المشكلة قبل ما الـ budget يتحرق',
        en: 'I find the problem before the budget burns',
      },
      detail: {
        // REVIEW
        ar: 'لما النتيجة تبقى ضعيفة، ببص على أربع طبقات بالترتيب: المنتج، الإعلان، الموقع، واللي بيحصل بعد الأوردر. غالبًا المشكلة مش في الإعلان.',
        en: 'When results are weak I work through four layers in order: the product, the ad, the website, and what happens after the order. Most of the time the problem is not the ad.',
      },
    },
    {
      id: 'end-to-end',
      headline: {
        ar: 'بشتغل من الستور للإعلان للتشغيل — تسليمات أقل في الفريق',
        en: 'I work from store to ads to operations — fewer handoffs',
      },
      detail: {
        // REVIEW
        ar: 'مش محتاج حد يترجملي بين الميديا باينج والـ CRO والتشغيل. ده بيقلل الوقت الضايع في التنسيق، وبيخلي القرار أسرع.',
        en: 'Nobody has to translate between media buying, CRO and operations for me. That cuts the coordination overhead and makes decisions faster.',
      },
    },
    {
      id: 'sourced',
      headline: {
        ar: 'كل رقم بقوله ليه مصدر',
        en: 'Every number I share has a source',
      },
      detail: {
        // REVIEW
        ar: 'كل رقم على الموقع ده مكتوب جنبه مصدره وفترته، ولو الرقم ذاتي بقول كده. ومفيش كلمة «أرباح» في أي مكان، لأن دي مبيعات متسجلة مش أرباح.',
        en: 'Every figure on this site carries its source and period, and says so when it is self-reported. The word profit appears nowhere, because these are recorded sales, not profit.',
      },
    },
  ] satisfies WhyReason[],
};
