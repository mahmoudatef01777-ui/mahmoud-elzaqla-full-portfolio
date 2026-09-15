import type { Localized } from './types';

/**
 * Section 4 — how Mahmoud thinks.
 *
 * This is NOT a productised framework and must never be named or badged like
 * one (docs/master-context.md: "This is NOT a fixed proprietary methodology").
 * It is the order he actually works in, written as twelve plain steps.
 */

export interface ApproachStep {
  id: string;
  name: Localized;
  detail: Localized;
  /**
   * A supporting illustration for THIS step, shown on the desktop stage only
   * and only while this step is the one the reader has picked.
   *
   * Mahmoud supplies these one at a time and says which step each belongs to.
   * Add the file to public/work/personal/, then add the entry here — nothing
   * in the component needs touching.
   *
   * RULES: the file must be a transparent cut-out (it sits straight on the
   * section, with no card, plate or frame behind it), it is used as supplied,
   * and `alt` describes what is DRAWN. Never let the alt turn a number inside
   * an illustration into a claim.
   */
  art?: {
    src: string;
    width: number;
    height: number;
    alt: Localized;
  };
}

export const approach = {
  label: { ar: 'طريقة شغلي', en: 'How I work' } satisfies Localized,

  title: {
    ar: 'الترتيب اللي ببدأ بيه، كل مرة',
    en: 'The order I start in, every time',
  } satisfies Localized,

  intro: {
    ar: 'ده مش منهج مسجّل ولا اسم اخترعته. ده ببساطة الترتيب اللي بفكر بيه لما براند عايز يكبر — وغالبًا المشكلة مش في الإعلان.',
    en: 'This is not a registered method or a name I invented. It is simply the order I think in when a brand wants to grow \u2014 and most of the time, the problem is not the ad.',
  } satisfies Localized,

  steps: [
    {
      id: 'business',
      name: { ar: 'افهم البيزنس', en: 'Understand the business' },
      art: {
        src: '/work/personal/approach-01.webp',
        width: 1100,
        height: 917,
        alt: {
          ar: 'رسم توضيحي: محمود قدام اللابتوب وحواليه عناصر البيزنس — المنتج والتسعير والماركتينج والتشغيل، والستور، والمبيعات.',
          en: 'An illustration: Mahmoud at a laptop, surrounded by the parts of the business — product, pricing, marketing and operations, the store, and sales.',
        },
      },
      detail: {
        ar: 'ليه البراند عايز يكبر أونلاين؟ يزوّد مبيعات، يبدأ من الصفر، يبني حضور، ولا يصلّح مبيعات ضعيفة؟ الإجابة بتغيّر كل اللي بعدها.',
        en: 'Why does this brand want to grow online \u2014 more revenue, a start from zero, presence, or fixing weak sales? The answer changes everything that follows.',
      },
    },
    {
      id: 'market',
      name: { ar: 'ادرس السوق', en: 'Study the market' },
      art: {
        src: '/work/personal/approach-02.webp',
        width: 1100,
        height: 851,
        alt: {
          ar: 'رسم توضيحي: محمود بيقرا تحليل سوق، وحواليه لوحات نظرة عامة على السوق، والجمهور المستهدف، والمنافسين، وتحليل التسعير.',
          en: 'An illustration: Mahmoud reading a market analysis, surrounded by panels for a market overview, the target audience, competitors and pricing analysis.',
        },
      },
      detail: {
        ar: 'المنتج، التسعير، الجمهور، ووجع العميل الحقيقي. بستخدم 7Ps وSWOT وبحث سوق عادي — مش عشان الشكل، عشان أعرف فين الفرصة.',
        en: 'Product, pricing, audience and the real customer pain. Plain market research, 7Ps and SWOT \u2014 not for show, but to find where the opening is.',
      },
    },
    {
      id: 'competitors',
      name: { ar: 'ادرس المنافسين', en: 'Study competitors' },
      art: {
        src: '/work/personal/approach-03.webp',
        width: 1100,
        height: 914,
        alt: {
          ar: 'رسم توضيحي: مقارنة بين البراند ومنافسين على السعر والجودة والتنوّع، وجنبها لوحة فجوة السوق.',
          en: 'An illustration: the brand compared with competitors on price, quality and range, beside a market-gap panel.',
        },
      },
      detail: {
        ar: 'إعلاناتهم، زواياهم، أسعارهم، وشكل حضورهم. بشوف اللي شغّال عندهم واللي سايبينه فاضي — الفراغ ده هو الميزة.',
        en: 'Their ads, their angles, their pricing, their presence. What is working for them and what they have left empty \u2014 that gap is the advantage.',
      },
    },
    {
      id: 'problem',
      name: { ar: 'حدّد المشكلة', en: 'Find the problem' },
      art: {
        src: '/work/personal/approach-04.webp',
        width: 1100,
        height: 896,
        alt: {
          ar: 'رسم توضيحي: صفحة منتج وقمع مبيعات ولوحة «حدّد المشكلة» فيها معدل تحويل ضعيف وتكلفة عميل عالية وترك السلة.',
          en: 'An illustration: a product page, a sales funnel, and an "identify the issue" panel listing low conversion, high CAC and cart abandonment.',
        },
      },
      detail: {
        ar: 'بمشي على أربع طبقات بالترتيب: المنتج والسوق، الكرياتيف، الموقع، واللي بيحصل بعد الأوردر. مفيش افتراض إن المشكلة في الإعلان.',
        en: 'I work through four layers in order: product\u2013market, creative, the website, and what happens after the order. I never assume the ad is the problem.',
      },
    },
    {
      id: 'foundation',
      name: { ar: 'صلّح الأساس', en: 'Fix the foundation' },
      /*
        Placed on 05 because Mahmoud said 05. Worth knowing if it is ever
        revisited: what it draws — a product shoot, an edit timeline, a
        content checklist, a palette and type — is nearer step 06, "وجّه
        الكونتنت والتصميم". The overlap with 05 is the product photography
        this step already names.
      */
      art: {
        src: '/work/personal/approach-05.webp',
        width: 1100,
        height: 914,
        alt: {
          ar: 'رسم توضيحي: تصوير منتج وتايم لاين مونتاج وتشيك ليست محتوى، وجنبهم لوحة ألوان وخطوط وكاميرا.',
          en: 'An illustration: a product shoot, an editing timeline and a content checklist, beside a colour palette, type samples and a camera.',
        },
      },
      detail: {
        ar: 'قبل أي ميزانية: التسعير، صفحة المنتج، الصور، الشحن، والسياسات. صرف فلوس على أساس مكسور بيكبّر الخسارة مش المبيعات.',
        en: 'Before any budget: pricing, the product page, the photography, shipping and policies. Spending on a broken foundation scales the loss, not the sales.',
      },
    },
    /*
      This step is DIRECTION, not production. Mahmoud does not shoot or design
      here — he briefs the people who do, off the back of steps 01-05, and
      defers to them on craft. Corrected 2026-09-15: the old wording ("Build
      the creative & offer") read as if he made the creative himself.
    */
    {
      id: 'creative',
      name: { ar: 'وجّه الكونتنت والتصميم', en: 'Direct the content & design' },
      detail: {
        ar: 'من تحليل كل اللي فات، بحدّد نوع المحتوى اللي بيشتغل مع البراند ده والزوايا اللي تتقال، وأوجّه بيها اللي بيعمل الكونتنت واللي بيعمل التصميم. وبستشيرهم في الأول — هما فاهمين في شغلهم أكتر مني.',
        en: 'From everything the earlier steps turned up, I decide what kind of content works for this brand and which angles are worth saying — and I brief the content person and the designer with it. And I ask them first: they know their craft better than I do.',
      },
    },
    {
      id: 'traffic',
      name: { ar: 'جيب الترافيك', en: 'Acquire traffic' },
      detail: {
        ar: 'Meta وTikTok. تجربة منظّمة، وتوسيع اللي بيشتغل أفقي ورأسي، والقرار على تكلفة الأوردر مش على رقم لوحده.',
        en: 'Meta and TikTok. Structured testing, then scaling what works horizontally and vertically \u2014 decided on cost per order, not on one flattering number.',
      },
    },
    {
      id: 'conversion',
      name: { ar: 'حسّن التحويل', en: 'Improve conversion' },
      detail: {
        ar: 'نفس الترافيك يطلع مبيعات أكتر: صفحة المنتج، الريفيوهات، الباندلز، سرعة الموبايل، ومتوسط قيمة الأوردر.',
        en: 'Getting more out of the same traffic: the product page, reviews, bundles, mobile speed, and average order value.',
      },
    },
    {
      id: 'returns',
      name: { ar: 'اقرا الأوردرات والمرتجعات', en: 'Analyse orders & returns' },
      detail: {
        ar: 'المرتجع بيتكلّم. في Bloomy المقاس الواحد كان بيرجّع حوالي 50% — لما ضفنا مقاس تاني نزلت لحوالي 30%. ده مش رقم إعلانات، ده رقم بيزنس.',
        en: 'Returns talk. At Bloomy, one-size sent about 50% back; adding a second size brought it to roughly 30%. That is not an ads number, it is a business number.',
      },
    },
    {
      id: 'operations',
      name: { ar: 'افهم التشغيل', en: 'Understand operations' },
      detail: {
        ar: 'التأكيد، التجهيز، المخزون، الشحن، والتوصيل. الإعلان ممكن يجيب الأوردر، لكن التشغيل هو اللي بيقرر يوصل ولا لأ.',
        en: 'Confirmation, fulfilment, stock, shipping, delivery. The ad can bring the order; operations decide whether it arrives.',
      },
    },
    {
      id: 'profit',
      name: { ar: 'احسب الربحية', en: 'Evaluate profitability' },
      detail: {
        ar: 'تكلفة المنتج، الإعلان، الشحن، التشغيل، المرتجعات. من هنا بيطلع break-even CPO والـ contribution margin. المبيعات مش أرباح.',
        en: 'Product cost, ads, shipping, operations, returns \u2014 which is where break-even CPO and contribution margin come from. Sales are not profit.',
      },
    },
    {
      id: 'scale',
      name: { ar: 'وبعدين كبّر', en: 'Then scale' },
      /*
        The last step is the one that decides whether the eleven before it
        were worth anything, so it says the quiet part out loud: volume is not
        the goal. Mahmoud's framing (2026-09-15) — sales an operation cannot
        carry take a business down rather than grow it. Keep that sentence;
        it is the difference between a media buyer and someone who has stood
        in the warehouse when the orders outran the packing.
      */
      detail: {
        ar: 'قبل ما الميزانية تزيد، لازم التشغيل يكون قادر يستحمّل المبيعات الجديدة. الهدف عمره ما كان مبيعات كتير — مبيعات كتير على تشغيل مش قدّها بتهدّ البيزنس مش بتكبّره.',
        en: 'Before the budget goes up, the operation has to be able to carry the new volume. More sales was never the goal — sales an operation cannot carry take a business down rather than grow it.',
      },
    },
  ] satisfies ApproachStep[],
};
