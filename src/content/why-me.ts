import type { Localized } from './types';

/**
 * "Why work with me?" — the positioning section, replacing the old
 * capabilities list on 2026-09-15.
 *
 * THE ONE THING IT MUST ANSWER: why is Mahmoud different from a normal media
 * buyer? Not "what can you buy from him". The section it replaced listed five
 * capabilities with tag chips under each, which read as five separable
 * services on a price list — the opposite of the positioning.
 *
 * Copy supplied by Mahmoud, in both languages. Do not rewrite it into
 * service language.
 *
 * ACCURACY RULES (his, verbatim in intent):
 *  - Do not invent experience, and add no metric that is not already on the
 *    site with a source beside it.
 *  - He is NOT a Shopify developer and NOT a web developer. Shopify appears
 *    here only as what lets him understand and improve the e-commerce layer
 *    AFTER acquisition — never as a build-me-a-site service.
 *  - He is NOT a financial analyst. Reason 03 is an owner's feel for cost,
 *    pricing, stock and profitability, not an analyst's title.
 *  - AI and automation belong to the closing line only, as his own continuous
 *    development and internal systems. Never present them as a client service.
 *  - Never say he personally produced the sales figures shown elsewhere on
 *    the site; those carry their own sources on their own pages.
 */

export interface Reason {
  id: string;
  name: Localized;
  detail: Localized;
}

export const whyMe = {
  label: { ar: 'ليه ممكن نشتغل سوا؟', en: 'Why work with me?' } satisfies Localized,

  title: {
    ar: 'لأني مش ببص للإعلان لوحده. ببص للبيزنس اللي الإعلان المفروض يكبّره.',
    en: "I don’t look at the ad alone. I look at the business the ad is supposed to grow.",
  } satisfies Localized,

  intro: {
    ar: 'بفهم البيزنس، السوق والعميل قبل ما أقرر إن الإعلانات هي الخطوة الصح. وبعدها ببص على الرحلة كاملة — من المنتج والـstore لحد الأوردر والتشغيل والنتيجة.',
    en: 'I understand the business, the market and the customer before deciding whether ads are even the right next step. Then I look at the full journey — from the product and store to the order, operations and outcome.',
  } satisfies Localized,

  /** Five pieces of evidence for the headline. Not five services. */
  reasons: [
    {
      id: 'business-first',
      name: {
        ar: 'ببدأ من البيزنس، مش من الإعلانات',
        en: 'Business first, not ads first',
      },
      detail: {
        ar: 'بفهم طبيعة البيزنس، المنتج، العميل، المنافسين والسوق قبل ما أبدأ. ولو في حاجة محتاجة تتصلح الأول، بقولها بصراحة بدل ما أبدأ إعلانات وخلاص.',
        en: 'I study the business, product, customer, market and competitors before I start. If something needs fixing first, I say so instead of pushing for ads.',
      },
    },
    {
      id: 'inside',
      name: {
        ar: 'فاهم الـE-commerce من جوّه',
        en: 'I understand e-commerce from the inside',
      },
      detail: {
        ar: 'عدّيت على تجهيز الأوردرات، المخزون، الشحن، العملاء، المرتجعات، الإنتاج والتشغيل. عشان كده بفهم إيه اللي بيحصل قبل الأوردر وبعده، مش بس إزاي أجيبه.',
        en: "I’ve worked through order preparation, inventory, shipping, customers, returns, production and operations. So I understand what happens before and after the order — not just how to generate one.",
      },
    },
    {
      id: 'owner',
      name: { ar: 'بفكر كـBusiness Owner', en: 'I think like a business owner' },
      detail: {
        ar: 'لأني جربت أبني وأدير بيزنس بنفسي، فأنا فاهم ضغط التكلفة، التسعير، المخزون، المرتجعات والتشغيل والربحية — مش بس أرقام الـAds Manager.',
        en: 'Having built and operated a business myself, I understand the pressure around costs, pricing, inventory, returns, operations and profitability — not just Ads Manager numbers.',
      },
    },
    {
      id: 'after-the-ad',
      name: { ar: 'فاهم اللي بيحصل بعد الإعلان', en: 'I understand what happens after the ad' },
      detail: {
        ar: 'لو عندك Shopify، أقدر أراجع الـstore وأفهم الـUX والـCRO والـAOV. الهدف مش Traffic وخلاص؛ الهدف إن الزيارة تتحول لطلب، والطلب يبقى قابل للنمو.',
        en: "When a business has a Shopify store, I can audit the experience and work across UX, CRO and AOV. The goal isn’t traffic for its own sake — it’s turning visits into orders that can actually grow.",
      },
    },
    {
      id: 'performance',
      name: {
        ar: 'Performance Marketing جزء من الصورة',
        en: 'Performance marketing is part of the picture',
      },
      detail: {
        ar: 'بشتغل على Meta وTikTok وGoogle، وبشتغل على الـcreative والـangles والـtesting والـscaling. لكن القرار بيبدأ من احتياج البيزنس، مش من المنصة.',
        en: 'I work across Meta, TikTok and Google, with hands-on experience in creative, angles, testing and scaling. But the decision starts with the business need, not the platform.',
      },
    },
  ] satisfies Reason[],

  /** A coda, not a sixth reason — keep it quieter than the rows above it. */
  closing: {
    ar: 'وبطوّر نفسي باستمرار — من الـe-commerce والـmarketing لحد الـAI والـautomation وبناء الأنظمة اللي تساعدني أشتغل بشكل أذكى.',
    en: 'I keep developing beyond marketing and e-commerce — including AI, automation and building systems that help me work smarter.',
  } satisfies Localized,
};
