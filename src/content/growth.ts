import type { Localized } from './types';

/**
 * "إزاي بفكر في النمو" — how Mahmoud thinks about growth.
 *
 * THE COPY HERE IS APPROVED AND CLOSED. Every string was reviewed and signed
 * off section by section; it came over from the mini portfolio unchanged on
 * 2026-09-19 and it is the same text in both sites on purpose. Presentation is
 * open to change. Wording is not — do not rewrite, trim, merge or "tighten"
 * any of it without Mahmoud approving the new line first.
 *
 * WHAT IT IS NOT. Six named blocks in order look like a productised framework,
 * and that is the one thing this must never be badged as (docs/master-context.
 * md). There is no name for it, there is no trademark, and the intro says out
 * loud that not every growth problem starts with an ad. Keep it that way.
 *
 * TWO STANDING CONSTRAINTS carried over with the text, both from
 * docs/CLAUDE.md:
 *
 *   - Google Ads is something he is EXPANDING INTO. It is never listed as
 *     expertise, and block 03 says so in its own words.
 *   - Block 06 closes with the honesty clause. Every figure on this site is
 *     real and sourced, and that sentence is what stops the set of them
 *     reading as a promise. It is business context, not a legal disclaimer.
 *     Do not cut it for length.
 */

export interface GrowthBlock {
  id: string;
  /** Pre-formatted, "01".."06" — shown, so it lives with the copy. */
  n: string;
  name: Localized;
  /** The one line that has to survive if the reader never expands anything. */
  lead: Localized;
  points: Localized[];
  /** A closing line under the points. Only some blocks have one. */
  close?: Localized;
  /**
   * A supporting image for THIS block, shown beside its points once the block
   * is expanded.
   *
   * Mahmoud supplies these one at a time and says which block each belongs to.
   * Drop the file into public/work/ and add the entry here — nothing in
   * components/Growth.tsx needs touching, and a block with no `art` simply
   * renders none.
   *
   * RULES, the same ones the rest of the site runs on: the capture is real and
   * unretouched, `alt` describes what is IN it, and nothing in an image may
   * turn into a claim the copy does not already make. No invented dashboards,
   * no illustrative fakes.
   */
  art?: {
    src: string;
    width: number;
    height: number;
    alt: Localized;
  };
}

export const growth = {
  label: { ar: 'النمو', en: 'Growth' } satisfies Localized,
  title: {
    ar: 'إزاي بفكر في النمو',
    en: 'How I think about growth',
  } satisfies Localized,
  intro: {
    ar: 'مش كل نمو بيبدأ من الإعلان، ومش كل Scaling معناه Budget أكبر.',
    en: "Not every growth opportunity starts with ads, and scaling doesn't always mean a bigger budget.",
  } satisfies Localized,

  /**
   * The short label under each node on the system diagram. These are NOT new
   * copy: each one is the block's own `name`, shortened only where the full
   * name will not fit a node, and the full name is always the heading of the
   * card it points at.
   */
  blocks: [
    {
      id: 'business',
      n: '01',
      name: { ar: 'البيزنس والسوق', en: 'The business and the market' } satisfies Localized,
      lead: {
        ar: 'قبل ما أفكر في الإعلان، بفهم إحنا بنحاول نكبّر إيه أصلًا.',
        en: "Before I think about ads, I want to understand what we're actually trying to grow.",
      } satisfies Localized,
      points: [
        { ar: 'المنتج بيتباع ليه؟ ومين اللي بيشتريه؟', en: 'Why the product sells, and who is buying it' },
        { ar: 'السوق والمنافسين شكلهم إيه؟', en: 'What the market and the competition look like' },
        { ar: 'فين الفرصة اللي البراند يدخل منها؟', en: 'Where the opening for this brand is' },
        { ar: 'وهل المشكلة أصلًا محتاجة إعلانات؟', en: 'And whether the problem even needs more ads' },
      ] as Localized[],
    },
    {
      id: 'product',
      n: '02',
      name: { ar: 'المنتج والـOffer', en: 'The product and the offer' } satisfies Localized,
      lead: {
        ar: 'قبل ما أزوّد الطلب، بشوف المنتج نفسه عنده مساحة يكبر ولا لأ.',
        en: 'Before I push for more demand, I look at whether the product has room to grow.',
      } satisfies Localized,
      points: [
        { ar: 'في طلب حقيقي على المنتج؟', en: 'Is there real demand for it?' },
        { ar: 'السعر والـoffer مظبوطين؟', en: 'Are the price and the offer right?' },
        { ar: 'في variations أو features تزوّد قيمته؟', en: 'Are there variations or features that add value?' },
        { ar: 'نقدر نرفع الـAOV؟', en: 'Can we raise the average order value?' },
        {
          ar: 'ولا نوسّع من المنتج الناجح بدل ما ندوّر على منتج جديد؟',
          en: 'Or extend the product that already works, instead of hunting for a new one?',
        },
      ] as Localized[],
    },
    {
      id: 'marketing',
      n: '03',
      name: { ar: 'الـMarketing', en: 'Marketing' } satisfies Localized,
      lead: {
        ar: 'هنا الإعلان بيدخل الصورة — كجزء من السيستم، مش كالسيستم كله.',
        en: 'This is where advertising comes in — as part of the system, not as the system.',
      } satisfies Localized,
      points: [
        { ar: 'الكرياتيف والزوايا والرسالة', en: 'Creative, angles and the message' },
        { ar: 'شرايح وجمهور مكناش بنكلمه', en: "Segments and audiences we weren't reaching" },
        /* Google Ads is EXPANDING INTO, never expertise. docs/CLAUDE.md. */
        {
          ar: 'Meta وTikTok وقنوات تانية لما تستاهل — وبوسّع خبرتي في Google Ads',
          en: "Meta, TikTok and other channels when they earn it — and I'm expanding into Google Ads",
        },
        { ar: 'الستور نفسه: الـCRO وتجربة الشرا', en: 'The store itself: CRO and the buying experience' },
        {
          ar: 'اقتصاديات الأوردر: MAR والـROAS، والـROI لما بيانات البيزنس تسمح',
          en: 'Unit economics: MAR and ROAS — and ROI when the business data allows it',
        },
      ] as Localized[],
    },
    {
      id: 'scaling',
      n: '04',
      name: { ar: 'الـScaling', en: 'Scaling' } satisfies Localized,
      lead: {
        ar: 'Scaling مش معناه إننا نزوّد الـBudget وخلاص.',
        en: "Scaling doesn't just mean raising the budget.",
      } satisfies Localized,
      points: [
        {
          ar: 'الـBudget — نزوّد الصرف لما الأرقام والتشغيل يستحملوا',
          en: 'Budget — spend more when the economics and the operation can carry it',
        },
        { ar: 'شرايح جديدة — نوصل لعميل مكناش بنكلمه', en: "Segments — reach a customer we weren't talking to" },
        {
          ar: 'أسواق جديدة — محافظة أو بلد فيها فرصة حقيقية',
          en: 'Markets — a governorate or a country where the opportunity is real',
        },
        { ar: 'الجملة — نفتح قناة بيع تانية', en: 'Wholesale — open a second sales channel' },
        {
          ar: 'توسيع المنتج — مقاسات، variations، bundles، استخدامات جديدة',
          en: 'Product — sizes, variations, bundles, new use cases around what works',
        },
        {
          ar: 'الـAOV — نرفع قيمة الأوردر بدل ما نجري ورا أوردرات أكتر',
          en: 'AOV — raise the value of the order instead of always chasing more orders',
        },
      ] as Localized[],
      close: {
        ar: 'زيادة الـbudget والكرياتيف أدوات كويسة — بس دول بعض الطرق، مش كل الطرق.',
        en: "More budget and more creatives are useful levers — they're just some of them, not all of them.",
      } satisfies Localized,
    },
    {
      id: 'operations',
      n: '05',
      name: { ar: 'الـOperations', en: 'Operations' } satisfies Localized,
      lead: {
        ar: 'ممكن الإعلانات تكون شغالة كويس جدًا، والبيزنس نفسه مش جاهز يستوعب نمو أكبر.',
        en: "The ads can be working very well while the business isn't ready to absorb more.",
      } satisfies Localized,
      points: [
        { ar: 'المصنع متأخر أو الستوك بيخلص', en: 'The factory is behind, or stock is running out' },
        { ar: 'المخزن مش لاحق على الكمية', en: "The warehouse can't keep up with the volume" },
        { ar: 'فريق الموديريشن مضغوط', en: 'The moderation team is overloaded' },
        { ar: 'الشحن والتسليم فيهم مشاكل', en: 'Shipping and delivery are breaking' },
        { ar: 'المرتجعات بتكبر', en: 'Returns are climbing' },
      ] as Localized[],
      close: {
        ar: 'لو الـOperations مش قادرة تستوعب الطلب، ممكن القرار الصح يكون إننا نهدّي النمو، نصلّح الـbottleneck، وبعدين نرجع نسكيل.',
        en: "If the operation can't handle more demand, the right move may be to slow down, fix the bottleneck, and then scale again.",
      } satisfies Localized,
    },
    {
      id: 'numbers',
      n: '06',
      name: { ar: 'الأرقام مش كل الحكاية', en: "The numbers aren't the whole story" } satisfies Localized,
      lead: {
        ar: 'رقم مبيعات كبير ممكن يبان مبهر والبيزنس لسه عنده مشاكل.',
        en: 'A big sales number can look impressive while the business still has problems.',
      } satisfies Localized,
      points: [
        { ar: 'المبيعات مش أرباح', en: 'Sales are not profit' },
        { ar: 'الأوردر اللي اتعمل مش الأوردر اللي وصل', en: 'An order taken is not an order delivered' },
        { ar: 'الـROAS مش الـROI', en: 'ROAS is not ROI' },
        { ar: 'صرف أكتر مش بالضرورة قيمة أكتر للبيزنس', en: 'More spend is not automatically more value' },
      ] as Localized[],
      /*
        THE HONESTY CLAUSE. Every figure on this site is real and sourced, and
        this is the sentence that stops the set of them reading as a promise.
        It is business context, not a legal disclaimer — keep it in that voice,
        and do not cut it for length.
      */
      close: {
        ar: 'والأرقام اللي في البورتفوليو ده نتايج حقيقية لبيزنسات ومنتجات وأسواق وتشغيل وميزانيات وظروف معيّنة. دي دليل على شغل حصل — مش وعد إن أي بيزنس هيطلّع نفس الأرقام.',
        en: "And the figures in this portfolio are real results from specific businesses, products, markets, operations, budgets and circumstances. They're evidence of work that happened — not a promise that every business will produce the same numbers.",
      } satisfies Localized,
    },
  ] as GrowthBlock[],

  /**
   * THE DECISION, DRAWN DOWNWARDS. A vertical arrow needs no direction flip —
   * it means the same thing in Arabic and in English, which a horizontal one
   * does not. The last step is the resolution, and the component styles it as
   * one; it is still just the sixth string in this list.
   */
  decision: {
    title: { ar: 'قبل ما أقول «Scale»، بسأل:', en: 'Before I say "scale", I ask:' } satisfies Localized,
    steps: [
      { ar: 'هل المنتج جاهز؟', en: 'Is the product ready?' },
      { ar: 'هل السوق لسه فيه مساحة؟', en: 'Is there still room in the market?' },
      { ar: 'هل الـeconomics صح؟', en: 'Do the economics make sense?' },
      { ar: 'هل الـOperations تستوعب؟', en: 'Can the operation handle more demand?' },
      { ar: 'فين فرصة النمو الجاية؟', en: 'Where is the next growth opportunity?' },
      { ar: 'وبعدين نقرر نسكيل إيه وإزاي.', en: 'Then we decide what to scale and how.' },
    ] as Localized[],
  },

  /** The payoff. Everything above is HOW; this is WHY. */
  statement: {
    ar: 'أنا مش بدوّر على طريقة نخلي الإعلانات تصرف أكتر. بدوّر على المكان اللي البيزنس يقدر ينمو منه فعلًا.',
    en: "I'm not looking for a way to make the ads spend more. I'm looking for where the business can actually grow.",
  } satisfies Localized,

  /** Screen-reader label for the diagram that sits beside the six blocks. */
  systemLabel: {
    ar: 'الترتيب اللي بمشي بيه: البيزنس والسوق، المنتج والعرض، الماركتنج، الـScaling، الـOperations، والأرقام.',
    en: 'The order I move through: the business and the market, the product and the offer, marketing, scaling, operations, and the numbers.',
  } satisfies Localized,

  /** The affordance on a collapsed block. */
  more: { ar: 'التفاصيل', en: 'The detail' } satisfies Localized,
};
