import type { Localized } from './types';

export interface CaseFigure {
  value: string;
  label: Localized;
  source: Localized;
}

export interface CaseEvidence {
  src: string;
  width: number;
  height: number;
  type?: 'image' | 'video';
  poster?: string;
  caption: Localized;
  alt: Localized;
  /**
   * Photographs only. Lays the item out as a square tile in a contact-sheet
   * grid, cropped to fill it, instead of the default frame that shows the
   * whole image at its natural size.
   *
   * NEVER set this on a screenshot, a dashboard or a document: cropping one
   * cuts figures out of the evidence. A photo of stock loses nothing to a
   * crop, and the lightbox still opens the uncropped original.
   *
   * All items in one evidence group must agree — a group is a tile grid only
   * when every item is `fit: 'cover'`.
   */
  fit?: 'cover';
}

export interface CaseQuestion {
  /** Used as the anchor, so a single question can be shared as a link. */
  id: string;
  question: Localized;
  /** Paragraphs. */
  answer: Localized<string[]>;
  /** Pulled out and set larger — the line the answer is really about. */
  pullquote?: Localized;
  /** Rendered as a small numbered list under the answer. */
  list?: Localized<string[]>;
  evidence?: CaseEvidence[];
}

/**
 * The Bloomy case study at /work/bloomy.
 *
 * Every figure here traces to docs/context.md ("Confirmed figures").
 * Never publish: the "+70% conversion" comparison, any profit or
 * delivery-rate claim, or the partner disagreement.
 *
 * Arabic drafted by Claude is marked // REVIEW — it is written as Egyptian
 * Arabic rather than translated from the English.
 */
export const bloomy = {
  logo: '/work/bloomy/logo.webp',
  badge: { ar: 'براندي أنا', en: 'my own brand' } satisfies Localized,
  title: 'Bloomy',
  intro: {
    ar: 'بنيت البراند من الصفر: المنتج، الستور، الإعلانات، والتشغيل.',
    en: 'I built the brand from scratch: product, store, ads, and operations.',
  } satisfies Localized,

  figures: [
    {
      value: 'EGP 3.17M',
      label: { ar: 'إجمالي المبيعات', en: 'total sales' },
      source: { ar: 'Odoo ERP', en: 'Odoo ERP' },
    },
    {
      value: '4,544',
      label: { ar: 'أوردر', en: 'orders' },
      source: { ar: 'Odoo ERP', en: 'Odoo ERP' },
    },
    {
      value: 'EGP 145K',
      label: { ar: 'صرف إعلانات', en: 'ad spend' },
      // Lifetime figure from the ERP, not the Meta-only Feb-Jun number (139K).
      source: { ar: 'Odoo ERP · كل الفترة', en: 'Odoo ERP · whole period' },
    },
    {
      value: '5.44%',
      label: { ar: 'conversion rate للستور', en: 'store conversion rate' },
      source: { ar: 'Shopify · 47 يوم', en: 'Shopify · 47 days' },
    },
  ] satisfies CaseFigure[],

  figuresNote: {
    ar: 'دي مبيعات وأوردرات متسجلة، مش أرباح. مفيش عندي رقم مؤكد للأوردرات اللي اتسلّمت.',
    en: "These are recorded sales and orders, not profit. I don’t have a confirmed delivered-orders figure.",
  } satisfies Localized,

  questions: [
    {
      id: 'start',
      question: { ar: 'بدأت البراند إزاي؟', en: 'How did I start the brand?' },
      answer: {
        // REVIEW
        ar: [
          'قبل ما أنتج أي حاجة، درست المنافسين وأسعار السوق، وحسبت تكلفة القماش والتصنيع والإعلانات والتشغيل مقابل السعر اللي أقدر أبيع بيه — عشان أعرف من الأول هل الأرقام بتقفل ولا لأ.',
          'وبعدين اختبرت الطلب بـ Message Ads قبل ما ألتزم بأي إنتاج. التست نجح، فدخلت أنتج حوالي 1,500 قطعة. أول منتج كان طقم صلاة رمضاني، قبل رمضان.',
        ],
        en: [
          'Before producing anything, I studied the competitors and the market prices, and I costed the fabric, the manufacturing, the ads and the operations against the price I could sell at — so I would know whether the unit economics worked at all.',
          'Then I tested demand with Message Ads before committing to production. The test worked, and I moved into producing around 1,500 pieces. First product: a Ramadan prayer set, before Ramadan.',
        ],
      },
      /*
        The Ramadan reel (creative-1.mp4) sat here until 2026-09-15. Replaced
        at Mahmoud's request with the fabric on the cutting table, which is
        the step this answer is actually about: he costed the fabric before
        committing to production. It also retires a provenance question —
        docs/context.md marks creative-1..3 [NV], unverified as his own
        creative. The file stays in public/work/bloomy, unreferenced.
      */
      evidence: [
        {
          src: '/work/bloomy/ops-fabric.webp',
          width: 960,
          height: 1280,
          caption: {
            ar: 'القماش مفرود على ترابيزة القص قبل التفصيل',
            en: 'The fabric laid out on the cutting table, before it was cut',
          },
          alt: {
            ar: 'قماش وردي بنقشة قلوب حمراء مفرود على ترابيزة القص في الورشة، وإيدين بتفرده من ناحية آخر الترابيزة.',
            en: 'Pink heart-print fabric laid out along the cutting table in the workshop, hands spreading it at the far end.',
          },
        },
      ],
    },
    {
      id: 'store',
      question: { ar: 'الستور؟', en: 'The store?' },
      answer: {
        // REVIEW
        ar: [
          'بنيت ستور Shopify بنفسي، بعد ما درست تطوير Shopify في E-Cart. ثيم Kalles، والشغل كله كان مركّز على صفحة المنتج وتجربة الشرا: الريفيوهات، الباندلز، تسعير واضح مقارن بالمنافسين، صور المنتج، تكلفة الشحن مكتوبة من الأول، والسياسات.',
          'استخدمت AI في تجهيز جزء من صور المنتجات، مع إن المنتج نفسه يفضل باين وواضح.',
        ],
        en: [
          'I built the Shopify store myself, after studying Shopify development at E-Cart. Kalles theme, with the work concentrated on the product page and the buying experience: reviews, bundles, clear pricing benchmarked against competitors, product images, shipping cost stated up front, and policies.',
          'I used AI to prepare some of the product images, keeping the product itself clearly visible.',
        ],
      },
      pullquote: {
        ar: 'الـ 5.44% دي نتيجة الستور كله، مش عنصر واحد — ماعملتش A/B test يثبت إن حاجة بعينها هي السبب.',
        en: 'The 5.44% is the result of the whole store, not any one element — I never ran an A/B test that would prove one particular thing caused it.',
      },
      evidence: [
        {
          src: '/work/bloomy/results-shopify.webp',
          width: 869,
          height: 331,
          caption: {
            ar: 'Shopify — 21.9 ألف زيارة · EGP 1.02M · 1,229 أوردر · 5.44% تحويل · 28 أبريل – 14 يونيو 2026',
            en: 'Shopify — 21.9K sessions · EGP 1.02M · 1,229 orders · 5.44% conversion · Apr 28 – Jun 14, 2026',
          },
          alt: {
            ar: 'داشبورد Shopify لستور Bloomy على مدى 47 يوم.',
            en: "Bloomy’s Shopify dashboard across 47 days.",
          },
        },
      ],
    },
    {
      id: 'ads',
      question: { ar: 'الإعلانات؟', en: 'The ads?' },
      answer: {
        // REVIEW
        ar: [
          'ABO من أول يوم لآخر يوم، لأن البراند كان لسه بيتجرّب وماكنتش عايز أفترض إن عندي وصفة ناجحة. جرّبت كرياتيفات وزوايا واهتمامات وbroad.',
          'شغّلت Message Ads وSales جنب بعض — كان عندي فريق موديريشن، فالرسايل كانت جزء من عملية البيع نفسها. أول ما زاوية تشتغل كنت أبني منها نسخ وأوسّع أفقياً ورأسياً.',
          'تكلفة الأوردر بدأت حوالي 15 جنيه ووصلت لحوالي 30. وقّفت التست مع نهاية رمضان بدل ما أكمل ضغط لآخر الموسم.',
        ],
        en: [
          "ABO throughout, because the brand was still in testing and I didn't want to assume I had a winning formula. I tested creatives, angles, interests and broad.",
          'I ran Message Ads and Sales campaigns together — I had a moderation team, so messages were part of the sales process. When an angle worked I built variations and scaled horizontally and vertically.',
          'CPO started around EGP 15 and rose to about EGP 30; I stopped the test as Ramadan ended rather than push through the end of the season.',
        ],
      },
      pullquote: {
        ar: 'مش لازم كل creative يعمل كل حاجة — واحد يلفت النظر، وواحد يقنع، وواحد يبني ثقة.',
        en: 'Not every creative has to do everything — one catches attention, another convinces, another builds trust.',
      },
      // No published Meta screenshot for Bloomy exists yet, and the ERP table
      // shows sales rather than ads, so this answer stands on its own.
    },
    {
      id: 'creative',
      question: { ar: 'الكريتيف؟', en: 'The creative?' },
      answer: {
        // REVIEW
        ar: [
          'الزوايا كانت بتطلع من دراسة المنافسين، ومن المناسبة أو المشكلة اللي المنتج بيحلها. في العيد عملنا ريل على إحساس إنك رايحة صلاة العيد من غير طقم الصلاة المناسب — اللحظة نفسها، مش «اشتري من عندنا».',
          'استخدمنا مودلز عشان المنتج يبان في سياق العميلة تقدر تتخيّل نفسها فيه.',
        ],
        en: [
          'Angles came from competitor research and from the occasion or problem the product solves. For Eid we built a reel on the feeling of going to Eid prayer without the right prayer set — the moment, not "buy ours".',
          'Models were used so the product appears in a context the customer can picture herself in.',
        ],
      },
      evidence: [
        {
          src: '/work/bloomy/creative-4.mp4',
          type: 'video',
          poster: '/work/bloomy/creative-4-poster.webp',
          width: 720,
          height: 1280,
          // Captioned for what the reel actually shows — the Ramadan prayer
          // set, the first product — not the Eid reel the answer describes.
          caption: {
            ar: 'ريل طقم الصلاة — أول منتج عملته',
            en: 'The prayer-set reel — the first product I made',
          },
          alt: {
            ar: 'ريل إعلاني لـ Bloomy: مودل بتعرض طقم صلاة بنقشة قلوب باللون الوردي والأبيض.',
            en: 'A Bloomy ad reel: a model presenting the heart-print prayer set in pink and white.',
          },
        },
      ],
    },
    {
      id: 'operations',
      question: { ar: 'التشغيل؟', en: 'Operations?' },
      answer: {
        // REVIEW
        ar: [
          'أنا اللي كنت بختار المنتج والمودلز، وبشتري القماش، وبتابع التصنيع والمخزون، وبراقب تحضير الأوردرات. في الأول كنت بحضّر الأوردرات بنفسي؛ ولما كبرت، درّبت ناس وسلّمت أجزاء — متابعة الشحن، المخزن، الموديريشن، إدخال البيانات — وبقيت أراقب الأداء بدل ما أعمل كل حاجة بإيدي.',
          'خلفيتي ساعدتني: قبل Bloomy كنت شتغلت في معظم عمليات الـ e-commerce، فكنت قادر أوصل الخط كله — إعلان ← أوردر ← إنتاج ← مخزون ← شحن ← عميل.',
        ],
        en: [
          'I chose the product and the models, bought the fabric, followed manufacturing and inventory, and tracked order preparation. At the start I prepared orders myself; as it grew I trained people and handed parts over — shipping follow-up, the warehouse, moderation, data entry — and moved to overseeing performance instead of doing everything.',
          "My background helped: before Bloomy I'd worked across most of e-commerce operations, so I could connect ads to orders to production to inventory to shipping to customer.",
        ],
      },
      /**
       * Two photographs of the end of the line the answer describes: orders
       * picked with their invoices, then stacked for the courier. They are
       * tiles rather than framed shots (see `fit`) so the pair reads as one
       * block instead of two cards of different heights.
       *
       * A fabric shot and a colourway shot were here on 2026-09-14 and were
       * removed at Mahmoud's request; the files stay in public/work/bloomy
       * (ops-fabric, ops-colourways) unreferenced.
       */
      evidence: [
        {
          src: '/work/bloomy/ops-orders.webp',
          width: 960,
          height: 1280,
          fit: 'cover',
          caption: {
            ar: 'من التحضير اليومي للأوردرات — كل أوردر بفاتورته',
            en: 'From the daily order preparation — each order with its invoice',
          },
          alt: {
            ar: 'أوردرات متغلّفة مرصوصة على الأرض وكل واحدة عليها فاتورتها.',
            en: 'Packed orders laid out on the floor, each one with its invoice attached.',
          },
        },
        {
          src: '/work/bloomy/ops-ready.webp',
          width: 1400,
          height: 1050,
          fit: 'cover',
          caption: {
            ar: 'من التحضير اليومي للأوردرات — جاهزة لشركة الشحن',
            en: 'From the daily order preparation — ready for the courier',
          },
          alt: {
            ar: 'أوردرات متغلّفة مرصوصة في أستاكات جاهزة لتسليمها لشركة الشحن.',
            en: 'Packed orders stacked in piles, ready to hand over to the courier.',
          },
        },
      ],
    },
    {
      id: 'erp',
      question: { ar: 'الـ ERP؟', en: 'The ERP?' },
      answer: {
        // REVIEW
        ar: [
          'الـ Ads Manager بيقولك إنه جابلك أوردرات. الـ ERP بيقولك حصل إيه للأوردرات دي بعد كده — حالتها، إيه اللي لسه ما اتشحنش، مبيعات اليوم، أكتر الموديلات مبيعًا، عدد القطع لكل موديل، الألوان، الأسعار.',
          'الأوردرات كانت مقسومة تقريبًا نص بنص بين الصفحة والموقع، وكنت أقدر أشوف كل أوردر جاي من أنهي قناة.',
          'والصفوف التانية في الجدول دي مش براندات منافسة — دول ناس كانوا شغالين معايا وبيبيعوا منتجاتي على صفحاتهم. الأوردر كان بييجي لي على جروب، وأنا اللي بشغّله: بجهّزه، وأشحنه، وأتابعه لحد ما يوصل للعميل. وأول ما يوصل بدفع لصاحب الصفحة عمولته — اللي هو نفسه كان حاططها على الأوردر.',
          'فالإجمالي اللي في اللقطة — 6,785,810 جنيه — ده كل اللي عدّى على التشغيل بتاعي، مش مبيعات صفحة Bloomy لوحدها. صفوف Bloomy التلاتة (3.17 مليون) هي الرقم اللي فوق في أول الصفحة.',
        ],
        en: [
          'Ads Manager tells you it brought you orders. The ERP tells you what happened to those orders afterwards — status, what has not shipped, daily sales, best-selling models, pieces per model, colours, prices.',
          'Orders split roughly half between the page and the website, and I could see which channel each one came from.',
          'The other rows in this table are not competing brands — they are people who worked with me and sold my products on their own pages. The order reached me on a group, and I ran it: picked it, shipped it and followed it until it reached the customer. Once it arrived I paid that page its commission — the one they had set on the order themselves.',
          "So the total in the shot — EGP 6,785,810 — is everything that passed through my operation, not Bloomy's own page alone. The three Bloomy rows (EGP 3.17M) are the figure at the top of this page.",
        ],
      },
      /*
        The FULL export, uncovered. Until 2026-09-15 this was a redacted crop
        (results-2.webp) because the other rows were read as other brands'
        revenue and a grand total that was not Mahmoud's. He corrected that:
        those pages were resellers who sold HIS products, sent him the orders
        on a group, and took a commission they set themselves while he ran
        fulfilment — so the whole table is his operation. See docs/CLAUDE.md.

        What is still cropped away is the browser chrome: the ERP's admin URL
        and his open tabs. That is a security crop, not an evidence one — no
        row, name or number in the table is touched. Never publish a frame
        that shows the admin URL, and never publish a customer-level view.
      */
      evidence: [
        {
          src: '/work/bloomy/erp-by-page.webp',
          width: 1600,
          height: 532,
          caption: {
            ar: 'Odoo ERP مجمّع بصفحة الفيسبوك اللي جابت الأوردر. صفوف Bloomy التلاتة = 3.17 مليون، وهي الرقم اللي فوق. باقي الصفوف صفحات كانت بتبيع منتجاتي بعمولة وأنا اللي بشغّل الأوردر. الإجمالي 6,785,810 جنيه.',
            en: 'Odoo ERP grouped by the Facebook page an order came from. The three Bloomy rows = EGP 3.17M, the figure at the top of this page. The rest are pages that sold my products on commission while I ran the order. Total EGP 6,785,810.',
          },
          alt: {
            ar: 'جدول Odoo ERP مجمّع بصفحة الفيسبوك: صفوف Bloomy وصفوف الصفحات الشريكة بأعداد أوردراتها وإجمالياتها، وإجمالي كلي 6,785,810 جنيه.',
            en: 'An Odoo ERP table grouped by Facebook page: the Bloomy rows and the partner pages’ rows with their order counts and totals, and a grand total of EGP 6,785,810.',
          },
        },
      ],
    },
    {
      id: 'hardest',
      question: { ar: 'أصعب موقف؟', en: 'The hardest problem?' },
      answer: {
        // REVIEW
        ar: [
          'كان في منتج ماشي كويس، بس المرتجع حواليه 50%. قعدت أراجع الأوردرات الراجعة وكلام العملاء، وطلع إن المشكلة إن مقاس واحد مكانش بيظبط على عدد كفاية من الناس. ضفت مقاس تاني، والمرتجع نزل لحوالي 30%.',
          'وبعدين ظهرت مشكلة تانية: عملاء بيقولوا إن المنتج مش زي اللي شافوه في الفيديو. هو هو نفس المنتج — بس طريقة عرض القماش في الكريتيف كانت بتبني توقع مختلف. فصوّرناه بشكل أبسط وأقرب للحقيقة، وظبّطنا طريقة العرض، وعملنا سيل، والمنتج خلص.',
        ],
        en: [
          'A product was selling well, but returns were around 50%. I went through the returned orders and the customer feedback, and the problem was that one size did not fit enough people. I added a second size and returns came down to about 30%.',
          "Then a second problem showed up: customers said the product wasn't what they saw in the video. It was the same product — but the way the fabric was shown in the creative set a different expectation. So we shot it more plainly and realistically, fixed how it was presented, ran a sale, and the product sold out.",
        ],
      },
      pullquote: {
        ar: 'المرتجع مش خسارة، المرتجع داتا. بيقولك العميل رجّع ليه: المقاس غلط، ولا الكريتيف وعد بحاجة المنتج مش بيوفيها.',
        en: "A return isn’t a loss, it’s data. It tells you why the customer sent it back: wrong size, or a creative that promised something the product couldn’t keep.",
      },
    },
    {
      id: 'differently',
      question: { ar: 'لو رجعت تاني؟', en: 'What would I do differently?' },
      answer: {
        // REVIEW
        ar: [
          'أبني البراند والـ PR من إطلاق كل موديل. أضرب على TikTok أقوى بكتير بدل ما أتكل على Meta. أشتغل مع وش UGC ثابت عشان يبقى في شخص معروف ورا المحتوى. وأدفع على الموقع أكتر.',
          'وقبل ده كله: أركّز على تأكيد الأوردر والتسليم — لأن اللي بيفرق مش الـ CPO ولا عدد الأوردرات ولا حتى الإيراد، اللي بيفرق كام أوردر اتأكد واتشحن واتسلّم، وكام فلوس وصلت فعلًا للبيزنس.',
        ],
        en: [
          'Build the brand and PR from the launch of each model. Go much harder on TikTok instead of leaning on Meta. Work with a consistent UGC face so the brand has a recognisable person behind the content. Push further on the website.',
          "And above all, focus on order confirmation and delivery — because what matters isn't the CPO or the number of orders or even the revenue, it's how many orders were confirmed, shipped, delivered, and how much money actually reached the business.",
        ],
      },
    },
    {
      id: 'what-sells',
      question: {
        ar: 'إيه اللي بيخلي بيزنس e-commerce يبيع؟',
        en: 'What actually makes an e-commerce business sell?',
      },
      answer: {
        // REVIEW
        ar: ['تلات حاجات لازم يشتغلوا مع بعض:'],
        en: ['Three things have to work together:'],
      },
      list: {
        // REVIEW
        ar: [
          'منتج الناس عايزاه',
          'تسعير مناسب للسوق ولحسبة الأرقام',
          'تشغيل يستحمل لما المبيعات تزيد',
        ],
        en: [
          'a product people want',
          'pricing that fits the market and the unit economics',
          'operations that hold up when sales rise',
        ],
      },
      /*
        The budget item ("a budget that allows testing and learning") was the
        fourth entry until 2026-09-15. Mahmoud removed it: it is a condition
        for running ads, not a reason a business sells, and it made the list
        read as a list of what the advertiser needs rather than what the
        business needs.

        The pull-quote carries the point he wanted a client to leave with —
        that ads are not what produces the sales. It says it without dismissing
        ads, because ads are the service he is selling: they bring people, and
        they multiply whatever the three above are already doing.
      */
      pullquote: {
        ar: 'الإعلان مش هو اللي بيجيب المبيعات. الإعلان بيجيب ناس — اللي بيبيع هو المنتج والسعر والتشغيل اللي وراهم. لو التلاتة دول مظبوطين، الإعلان بيكبّر النتيجة؛ ولو مش مظبوطين، مفيش إعلان هيصلّحهم.',
        en: 'Ads are not what brings the sales. Ads bring people — what sells is the product, the price and the operation behind them. Get those three right and the ads multiply the result; get them wrong and no ad will fix them.',
      },
    },
    {
      id: 'now',
      /*
        Renamed 2026-09-15. "Where Bloomy is now" made the reader find out it
        had stopped halfway through the answer, which reads like something
        being admitted. Asking it outright puts the reason first and makes the
        answer a decision instead of a confession. The anchor id stays `now`
        so any link already shared still lands here.
      */
      question: {
        ar: 'ليه أوقّف Bloomy وهو شغّال كويس؟',
        en: 'Why stop Bloomy while it was working?',
      },
      answer: {
        // REVIEW
        ar: [
          'Bloomy اشتغل حوالي تلات لأربع شهور، ودلوقتي واقف. أنا اللي اخترت أوقّفه وأبني خبرة وعلاقات أعمق من خلال شغل الوكالات والفريلانس قبل ما أرجعله.',
          'التجربة طلّعت نتايج قوية — إني أوقّف مش معناه إني فشلت.',
        ],
        en: [
          'Bloomy ran for about three to four months and is currently stopped. I chose to pause it and build deeper experience and connections through agency and freelance work before coming back to it.',
          'The experience produced strong results — stopping was not the same as failing.',
        ],
      },
    },
  ] satisfies CaseQuestion[],

  next: {
    /**
     * Set `brand` and `href` once a second case study exists. Until then the
     * page ends with the projects link alone — a "next project" pointing at a
     * route that silently falls back to the home page is worse than none.
     */
    label: { ar: 'المشروع اللي بعده', en: 'Next project' } satisfies Localized,
    brand: null as string | null,
    href: null as string | null,
    backLabel: { ar: 'كل المشاريع', en: 'All projects' } satisfies Localized,
    backHref: '/projects',
  },
};
