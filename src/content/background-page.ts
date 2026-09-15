import type { Localized } from './types';

/**
 * The /background page — the full story, told once, here.
 *
 * SOURCE OF TRUTH (2026-09-14): Mahmoud's own account, supplied directly. It
 * replaced an earlier version whose figures were wrong. The Arabic in `story`
 * is his wording and should not be "improved" into cleaner Arabic; the English
 * follows it sentence for sentence.
 *
 * Two standing cautions, both load-bearing:
 *  - The factory work was getting closer to production, NOT manufacturing
 *    expertise. Never describe him as a manufacturer or a production
 *    specialist.
 *  - The EGP 6.5M is the BUSINESS's sales over that period. It is not his
 *    attributed result. The chip label says so and must keep saying so.
 *
 * These figures are his own count of work he did, not dashboard exports, which
 * is what `evidenceNote` is for. They are counts rather than estimates, so
 * they do not carry the "approx." qualifier.
 *
 * WITHDRAWN, do not reintroduce: the childhood shop and poultry story, and the
 * figures ~20,000 orders / ~2,000 packed / ~12,000 moderation / ~EGP 2M
 * courier accounts.
 */

export interface StoryStage {
  id: string;
  name: Localized;
  /** One entry per paragraph. */
  body: Localized<string[]>;
  stats?: Array<{ value: string; label: Localized }>;
}

export const backgroundPage = {
  label: { ar: 'الحكاية كاملة', en: 'The full background' } satisfies Localized,

  title: {
    ar: 'من المخزن للأوردرات للتشغيل، وبعدين Bloomy',
    en: 'From the warehouse, to the orders, to the operation — and then Bloomy',
  } satisfies Localized,

  intro: {
    ar: 'دي الحكاية بالترتيب اللي حصلت بيه. كل اللي هنا شغل عدّى عليّ بنفسي.',
    en: 'This is the story in the order it happened. Everything here is work that passed through my own hands.',
  } satisfies Localized,

  story: [
    {
      id: 'operations',
      name: { ar: 'تشغيل الـ e-commerce', en: 'E-commerce operations' },
      body: {
        ar: [
          'دخلت بيزنس الملابس من المخزن وتحضير الأوردرات. جهّزت أكتر من 5,000 أوردر، واتسلّمت في المخزن أكتر من 11,000 قطعة.',
          'هنا بدأت أفهم إن كل أوردر وراه مخزون، تكلفة، وترتيب في التشغيل.',
        ],
        en: [
          'I came into the clothing business through the warehouse and preparing orders. I prepared more than 5,000 orders, and received more than 11,000 pieces into the warehouse.',
          'This is where I started to understand that behind every order there is stock, cost, and a place in the operation.',
        ],
      },
      stats: [
        { value: '+5,000', label: { ar: 'أوردر جهّزتها', en: 'orders I prepared' } },
        {
          value: '+11,000',
          label: { ar: 'قطعة استلمتها في المخزن', en: 'pieces received into the warehouse' },
        },
      ],
    },
    {
      id: 'customers',
      name: { ar: 'العملاء والأوردرات', en: 'Customers & orders' },
      body: {
        ar: [
          'بعدها بدأت أتعامل مع العملاء بشكل مباشر، واتعاملت مع أكتر من 4,000 أوردر من حالات المرتجعات وإعادة الطلبات.',
          'هنا بدأت أفهم مشاكل العملاء بشكل حقيقي: ليه العميل مش بيستلم؟ ليه الأوردر بيرجع؟ وإيه المشاكل اللي بتحصل مع شركات الشحن؟',
        ],
        en: [
          'Then I started dealing with customers directly, and handled more than 4,000 orders that involved returns and replacement orders.',
          'This is where I started to understand the real customer problems: why a customer does not receive an order, why an order comes back, and what goes wrong with the courier companies.',
        ],
      },
      stats: [
        {
          value: '+4,000',
          label: {
            ar: 'أوردر مرتجعات وإعادة طلبات',
            en: 'orders involving returns and replacements',
          },
        },
      ],
    },
    {
      id: 'managing',
      name: { ar: 'إدارة التشغيل', en: 'Managing the operation' },
      body: {
        ar: [
          'بعدها انتقلت لشركة تانية تبع ابن عمي، وهناك بدأت أدير جزء كبير من الشغل بدل ما أكون مسؤول عن جزء واحد بس.',
          'إدارة فريق الـmoderation، متابعة المخزون والاستلامات، والتنسيق مع المصنع ومتابعة التشغيل اليومي.',
          'خلال حوالي 6 شهور، البيزنس حقق حوالي EGP 6.5M في المبيعات.',
        ],
        en: [
          'After that I moved to another company that belongs to my cousin, and there I started managing a large part of the work instead of being responsible for one piece of it.',
          'Managing the moderation team, following the inventory and what came in, coordinating with the factory, and running the daily operation.',
          'Over about six months, the business did around EGP 6.5M in sales.',
        ],
      },
      stats: [
        {
          value: 'EGP 6.5M',
          label: {
            ar: 'مبيعات البيزنس في حوالي 6 شهور — مبيعات الشركة، مش نتيجة منسوبة ليا',
            en: "the business's sales over about six months — the company's figure, not a result attributed to me",
          },
        },
      ],
    },
    {
      id: 'production',
      name: { ar: 'الإنتاج', en: 'Production' },
      body: {
        ar: [
          'بعدها فتحنا مصنع، وبدأت أنزل وأقف مع الصنايعية وأفهم بعض مراحل الشغل والإنتاج بنفسي.',
          'أنا مش مصنع ولا متخصص تصنيع، لكن التجربة دي خلتني أشوف بشكل مباشر العلاقة بين الإنتاج، المخزون، المنتج، وفي الآخر العميل.',
        ],
        en: [
          'After that we opened a factory, and I started going there, standing with the workers and learning some of the production stages myself.',
          'I am not a manufacturer and not a production specialist, but that experience let me see directly how production, stock, the product and — in the end — the customer are connected.',
        ],
      },
    },
    {
      id: 'bloomy',
      name: { ar: 'Bloomy', en: 'Bloomy' },
      body: {
        ar: [
          'بعد ما وقفت شغلي مع ابن عمي، بدأت رحلتي مع Bloomy. هنا بدأت أطبّق اللي اتعلمته بدل ما أكون بس جزء من بيزنس موجود.',
          'بدأت من المنتج، درست السوق والمنافسين والتكلفة، اختبرت الطلب من خلال Message Ads، وبعدها بدأت أبني البيزنس خطوة بخطوة.',
        ],
        en: [
          'After I stopped working with my cousin, I started my own journey with Bloomy. This is where I began applying what I had learned, instead of being one part of a business that already existed.',
          'I started from the product: I studied the market, the competitors and the cost, tested demand with Message Ads, and then built the business step by step.',
        ],
      },
    },
    {
      id: 'shopify',
      name: { ar: 'Shopify والـ Performance Marketing', en: 'Shopify & performance marketing' },
      body: {
        ar: [
          'مع Bloomy دخلت بشكل أعمق في الـShopify والـCRO والـAOV، وبنيت الستور بنفسي.',
          'وبعدها بدأت أشغل Meta Ads، أختبر الـcreatives والـangles، وأقرأ النتايج مش بس من الـAds Manager، لكن من اللي بيحصل بعد الأوردر كمان.',
        ],
        en: [
          'With Bloomy I went deeper into Shopify, CRO and AOV, and built the store myself.',
          'Then I started running Meta Ads, testing creatives and angles, and reading the results not only in Ads Manager but in what happens after the order as well.',
        ],
      },
    },
    {
      id: 'growth',
      name: { ar: 'نمو الـ e-commerce', en: 'E-commerce growth' },
      body: {
        ar: [
          'وده وصلني لطريقتي الحالية في الشغل:',
          'الإعلان ممكن يجيب الأوردر، لكن البيزنس كله هو اللي بيحدد إذا كان الأوردر ده مربح فعلًا ولا لأ.',
        ],
        en: [
          'That is what brought me to the way I work now:',
          'The ad can bring the order, but the whole business decides whether that order is actually profitable.',
        ],
      },
    },
  ] satisfies StoryStage[],

  /** Verbatim from master-context: role per brand, nothing added. */
  roles: {
    title: { ar: 'الأدوار بالترتيب', en: 'The roles, in order' },
    rows: [
      { name: 'Plan G', role: { ar: 'تشغيل وقيادة فريق', en: 'Operations & leadership' } },
      { name: 'Cove', role: { ar: 'تشغيل + Shopify و e-commerce', en: 'Operations + Shopify & e-commerce' } },
      { name: 'Bloomy', role: { ar: 'مؤسس + نمو البيزنس', en: 'Founder + business growth' } },
    ] as Array<{ name: string; role: Localized }>,
  },

  closing: {
    title: { ar: 'اللي خرجت بيه', en: 'What I took from it' },
    body: {
      ar: 'إن المبيعات مش أرباح، وإن الأوردر اللي اتعمل مش زي الأوردر اللي وصل. والمشكلة لما الأرقام تبوظ غالبًا مش في الإعلان — في المنتج أو الموقع أو اللي بيحصل بعد الأوردر. عشان كده بحب أشوف الصورة كاملة قبل ما أقول رأيي.',
      en: 'That sales are not profit, and an order taken is not an order delivered. And when the numbers go wrong the cause is usually not the ad — it is the product, the site, or what happens after the order. Which is why I want to see the whole picture before I give an opinion.',
    } satisfies Localized,
  },

  /** These are counts of his own work, not dashboard exports. Keep it. */
  evidenceNote: {
    ar: 'الأرقام دي عدّي أنا لشغل عملته بنفسي، مش لقطات من داشبورد. ورقم المبيعات ده مبيعات الشركة في الفترة دي، مش نتيجة منسوبة ليا.',
    en: 'These are my own count of work I did myself, not dashboard exports. And the sales figure is the company’s sales in that period, not a result attributed to me.',
  } satisfies Localized,
};
