import type { Localized } from './types';

/**
 * About page — hero.
 *
 * IMAGE NOTE (replaceable): the design reference shows a cut-out portrait in
 * a white tee on a near-white studio ground. No such asset exists in
 * public/work/personal yet, so the hero points at the two existing personal
 * compositions — landscape for the desktop block, portrait for the mobile
 * one. They are the right person, the right aspect ratios and the right
 * near-white ground. Drop the real cut-out in and change the two paths
 * below; no component names an image path.
 *
 * `focal` feeds object-position (percentages) so each crop can be nudged
 * here rather than in the component.
 */
export const aboutHero = {
  label: { ar: 'عني', en: 'About Me' } satisfies Localized,

  headline: {
    ar: ['بدأت من البيع،', 'مش من الإعلانات.'],
    en: ['I Started With', 'Sales, Not Ads.'],
  } satisfies Localized<string[]>,

  /** Paragraph two is desktop-only — the reference drops it on mobile. */
  paragraphs: {
    ar: [
      'رحلتي في الإي-كوميرس ما بدأتش بإعلانات ولا أدوات فاخرة. بدأت ببيع منتجات، وكلام مع عملاء، وتجهيز أوردرات، وفهم اللي بيحصل فعلًا ورا كل عملية بيع.',
      'الخبرة دي جوه شركات الإي-كوميرس إدّتني منظور مختلف — المنظور اللي ساعدني بعد كده في Shopify وإعلانات الأداء ونمو المتاجر.',
    ],
    en: [
      "My journey in e-commerce didn't start with ads or fancy tools. It started with selling products, talking to customers, handling orders, and understanding what really happens behind every sale.",
      'That hands-on experience inside e-commerce businesses gave me a different perspective — one that later helped me in Shopify, performance marketing, and e-commerce growth.',
    ],
  } satisfies Localized<string[]>,

  cta: {
    href: 'https://wa.me/201008726224',
    label: { ar: 'كلمني', en: "Let's Talk" } satisfies Localized,
  },

  /** Scrolls to the section under the hero. */
  more: {
    href: '#journey',
    label: { ar: 'اعرف عني أكتر', en: 'More About Me' } satisfies Localized,
  },

  /**
   * Hand-written marginalia. Latin is set in Caveat; Arabic has no cursive
   * cut in the stack and falls back to the body face.
   */
  notes: {
    left: {
      ar: ['نفس', 'الشخص،', 'أفكار', 'أكبر.'],
      en: ['Same', 'Person,', 'Bigger', 'Ideas.'],
    } satisfies Localized<string[]>,
    right: {
      ar: ['نمو', 'إي-كوميرس', 'من خبرة', 'حقيقية.'],
      en: ['E-commerce', 'Growth', 'Through', 'Real', 'Experience.'],
    } satisfies Localized<string[]>,
  },

  credential: {
    name: { ar: 'محمود عاطف', en: 'Mahmoud Atef' } satisfies Localized,
    role: {
      ar: 'أخصائي نمو إي-كوميرس وإعلانات أداء',
      en: 'E-commerce Growth & Performance Marketing Specialist',
    } satisfies Localized,
  },

  image: {
    desktop: '/work/personal/hero-desktop.webp',
    mobile: '/work/personal/hero-mobile.webp',
  },

  focal: {
    desktop: { x: 50, y: 26 },
    mobile: { x: 50, y: 18 },
  },

  imageAlt: {
    ar: 'محمود عاطف مبتسم قدام داشبوردات المتاجر اللي اشتغل عليها.',
    en: 'Mahmoud Atef, smiling, in front of dashboards from the stores he has worked on.',
  } satisfies Localized,
};
