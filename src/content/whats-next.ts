import type { Localized } from './types';

/**
 * "What's next for me?" — the last section of the home page, added
 * 2026-09-15. Copy supplied by Mahmoud in both languages.
 *
 * THE FRAMING, which every future edit has to keep: he already works in
 * e-commerce growth and performance marketing. This section is about going
 * DEEPER into the system he already works inside — it is not a skills list, a
 * course list, or a junior person's "learning path". Anything that reads as
 * "starting from zero" is wrong.
 *
 * ACCURACY RULES (his):
 *  - Do NOT claim expertise in Google Ads, finance, analytics or automation.
 *    These are areas he is developing, and the copy says so in his own words.
 *  - Do NOT call him a developer. He builds internal tools for his own work;
 *    that is not a job title and not a service.
 *  - AI and automation are never a client service. They are how he works.
 *  - Invent no further project, tool, certificate or achievement. The four
 *    below are the four that exist.
 *  - The AI photography item is an experiment and must stay visually quieter
 *    than the other three — see `experiment` and the component.
 */

export interface NextArea {
  id: string;
  name: string;
  detail: Localized;
}

export interface NextProject {
  id: string;
  /** Kept in English in both languages: these are what he calls them. */
  name: string;
  detail: Localized;
  /** A side experiment, not a direction. Rendered quieter. */
  experiment?: boolean;
}

export const whatsNext = {
  label: { ar: 'تطوير مستمر', en: 'Continuous development' } satisfies Localized,

  title: {
    ar: 'الفترة الجاية، بطوّر إيه؟',
    en: "What's next for me?",
  } satisfies Localized,

  intro: {
    ar: 'مش واقف عند اللي بعرف أعمله النهارده. كل فترة بدخل أعمق في جزء جديد من الـE-commerce والـGrowth عشان أقدر أفهم الصورة كاملة وأاخد قرارات أحسن.',
    en: "I'm not stopping at what I can do today. I'm going deeper into new parts of e-commerce and growth so I can understand the full picture and make better decisions.",
  } satisfies Localized,

  areas: [
    {
      id: 'google-ads',
      name: 'Google Ads',
      detail: {
        ar: 'بوسّع خبرتي في Google Ads عشان مايبقاش فهمي للـPerformance Marketing معتمد على Meta وTikTok بس.',
        en: "I'm expanding my Google Ads experience so my performance marketing knowledge isn't limited to Meta and TikTok.",
      },
    },
    {
      id: 'finance',
      name: 'E-commerce Finance',
      detail: {
        ar: 'بتعمّق أكتر في الأرقام اللي ورا البيزنس: الـprofitability، الـcontribution margin، الـbreak-even، وتكلفة الأوردر الحقيقية.',
        en: "I'm going deeper into the financial side of e-commerce — profitability, contribution margin, break-even and the real cost of an order.",
      },
    },
    {
      id: 'data',
      name: 'Data & Analytics',
      detail: {
        ar: 'بطوّر نفسي في تحليل البيانات والـtracking عشان أقدر أربط بين الـad spend، الأوردرات، المبيعات، المنتجات والنتيجة الفعلية.',
        en: "I'm improving my data and analytics skills so I can connect ad spend, orders, sales, products and actual business results.",
      },
    },
    {
      id: 'ai',
      name: 'AI & Automation',
      detail: {
        ar: 'وده جزء أنا شغال عليه عمليًا، مش مجرد بتعلمه. ببني أنظمة تساعدني أختصر الشغل اليدوي وأوصل للمعلومة أسرع.',
        en: "This is something I'm actively building with, not just learning. I'm creating systems that reduce manual work and help me get to useful information faster.",
      },
    },
  ] satisfies NextArea[],

  building: {
    label: { ar: 'حاجات شغال عليها دلوقتي', en: "What I'm building now" } satisfies Localized,
    /** Marks the one item that is an experiment rather than a direction. */
    experimentTag: { ar: 'تجربة', en: 'experiment' } satisfies Localized,
    items: [
      {
        id: 'dashboard',
        name: 'Daily E-commerce Dashboard',
        detail: {
          ar: 'نظام بشتغل عليه عشان أتابع صرف كل عميل يوميًا، تكلفة الأوردر، عدد الأوردرات، وأداء كل منصة.',
          en: "A system I'm building to track each client's daily spend, cost per order, order volume and performance across platforms.",
        },
      },
      {
        id: 'assistant',
        name: 'AI E-commerce Assistant',
        detail: {
          ar: 'مساعد أقدر أسأله عن بيانات البيزنس بشكل طبيعي — زي أكتر منتج اتباع النهارده، كام قطعة اتباع من موديل معين، صرفنا كام، وأنهي Creative جاب أحسن نتيجة.',
          en: "An assistant I can question naturally about business data — like today's best-selling product, units sold by model, daily spend, or which creative performed best.",
        },
      },
      {
        id: 'internal',
        name: 'Internal Systems & Automation',
        detail: {
          ar: 'باستخدام Claude Code بشتغل على بناء أنظمة تحل مشاكل تشغيلية وتحليلية بدل ما أفضل أعتمد على شغل يدوي متكرر.',
          en: "Using Claude Code, I'm building internal systems that solve operational and analytical problems instead of relying on repetitive manual work.",
        },
      },
      {
        id: 'photography',
        name: 'AI Product Photography',
        experiment: true,
        detail: {
          ar: 'بجرّب workflows تساعدني أطلع صور منتجات واقعية للـe-commerce باستخدام صور المنتج وموديلات حقيقية، مع الحفاظ على شكل المنتج والموديل.',
          en: "I'm experimenting with workflows for creating realistic e-commerce product imagery from real product and model references, while keeping the actual product and model consistent.",
        },
      },
    ] satisfies NextProject[],
  },

  closing: {
    ar: 'الهدف مش إني أعرف كل حاجة، لكن إني أفضل أفهم الـsystem كله بشكل أعمق.',
    en: "The goal isn't to know everything. It's to keep getting better at understanding the whole system.",
  } satisfies Localized,
};
