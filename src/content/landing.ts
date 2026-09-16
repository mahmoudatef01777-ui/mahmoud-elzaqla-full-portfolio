import type { Localized } from './types';

/**
 * The one-page landing (route `/landing`), rebuilt against Mahmoud's
 * 2026-09-15 design reference. It is being built ONE SECTION AT A TIME, and
 * this file grows the same way: hero first, nothing else.
 *
 * Nothing here is copy invented on our side except where marked `// REVIEW`.
 * The figures come from Mahmoud's own brief for this page; the sources are
 * noted beside each one so a later section can cite them properly.
 */

/* ------------------------------------------------------------------- nav */

export interface LandingNavItem {
  /** The section id this scrolls to, once that section is on the page. */
  id: string;
  label: Localized;
  /**
   * false = the section is not built yet, so the item renders as plain text
   * instead of an anchor. An anchor pointing at an id that does not exist is
   * a link that silently does nothing — the same mistake `ui.ts` documents.
   * Flip this to true in the same commit that mounts the section.
   */
  ready: boolean;
}

export const landingNav: LandingNavItem[] = [
  { id: 'home', label: { ar: 'الرئيسية', en: 'Home' }, ready: true },
  { id: 'about', label: { ar: 'من أنا', en: 'About' }, ready: false },
  { id: 'results', label: { ar: 'النتائج', en: 'Results' }, ready: false },
  { id: 'sites', label: { ar: 'المواقع', en: 'Websites' }, ready: false },
  { id: 'contact', label: { ar: 'تواصل', en: 'Contact' }, ready: false },
];

/* ------------------------------------------------------------------ hero */

export const landingHero = {
  eyebrow: {
    ar: 'E-commerce Growth Specialist',
    en: 'E-commerce Growth Specialist',
  } satisfies Localized,

  /**
   * One string per line, so a line never breaks where it should not — Arabic
   * takes two, English three. The component renders however many are here.
   * The closing full stop is NOT in these strings: it is appended to the last
   * line in the accent colour, the way the reference does.
   */
  headline: {
    ar: ['بدأت من الأوردرات،', 'مش من الإعلانات'],
    en: ['I started with', 'the orders,', 'not the ads'],
  } satisfies Localized<string[]>,

  subline: {
    ar: 'فاهم الـ E-commerce من جوّه — من التشغيل والأوردرات لحد Shopify والـ Performance Marketing، وعيني على البيزنس مش الإعلان بس.',
    en: 'I understand e-commerce from the inside — from operations and orders to Shopify and performance marketing, with my eye on the business, not just the ad.',
  } satisfies Localized,

  /**
   * Mahmoud's own photograph, cut out of `personal/_cutout/portrait-1-cutout.png`
   * and written to WebP with its alpha intact. It is a real photo of him — no
   * regeneration, no retouching, no face touched. What was done to it is
   * background work only: the existing cut-out's MASK was made at a coarse
   * resolution, so its alpha channel was smoothed and re-hardened (the stair
   * steps around his hair were the mask, not the photo) and the result scaled
   * up for 2x screens. The page then only crops, positions and scales it.
   *
   * PLACEHOLDER: this is the portrait already approved for the old hero. The
   * photo Mahmoud picked for THIS design (olive bomber jacket, phone and
   * cash) is not in the repo yet.
   *
   * REPLACING IT: drop the new file in `personal/`, convert it, and change
   * this one path. Nothing else in the code names an image.
   */
  photo: {
    src: '/work/personal/hero-cutout.webp',
    width: 1000,
    height: 1254,
    /**
     * A CEILING on how much of the hero's height the figure may fill,
     * bottom-anchored. From lg the portrait is actually sized by its width
     * (68% of the photo column, which is the reference's 482px in its 790px
     * column) so its inner edge stops just short of the page centre and stays
     * clear of the figures and the scroll cue. This cap only matters for a
     * photograph tall enough to run off the top; 93% is where the reference's
     * own figure ends.
     */
    fill: '93%',
    alt: {
      ar: 'محمود عاطف.',
      en: 'Mahmoud Atef.',
    } satisfies Localized,
  },

  /**
   * The hand-written marginalia from the reference. Decoration, not claims —
   * both are hidden from assistive tech in the component.
   */
  notes: {
    hand: {
      ar: ['E-commerce', 'Marketing', 'Growth'],
      en: ['E-commerce', 'Marketing', 'Growth'],
    } satisfies Localized<string[]>,
    paper: {
      ar: ['Better', 'Products', 'Happier', 'Customers'],
      en: ['Better', 'Products', 'Happier', 'Customers'],
    } satisfies Localized<string[]>,
  },

  primary: {
    href: 'https://wa.me/201008726224',
    label: {
      ar: 'تواصل معي على واتساب',
      en: 'Message me on WhatsApp',
    } satisfies Localized,
  },

  /** Secondary CTA. The href and the enabled flag come from `site.ts` (`cv`). */
  secondary: {
    label: {
      ar: 'شاهد سيرتي الذاتية',
      en: 'View my CV',
    } satisfies Localized,
    /** Shown while no PDF exists, so the state is never mistaken for a bug. */
    pending: {
      ar: 'الـ CV لسه مترفعش',
      en: 'The CV has not been uploaded yet',
    } satisfies Localized,
  },

  /**
   * Credibility strip — deliberately secondary to the headline.
   *
   * The three figures are Mahmoud's, given for this page on 2026-09-15:
   *   +25,000       orders handled
   *   EGP 7M+       sales ACROSS the e-commerce businesses he worked on
   *                 (the Odoo operation alone totals EGP 6,785,810; the rest
   *                 sits on other stores, so the "+" is doing real work here)
   *   ~6 months     hands-on e-commerce experience — matches master-context.md
   *
   * None of these is profit, and none is attributed to paid ads. When the
   * results section lands, each figure gets its period and its source there.
   */
  stats: [
    {
      icon: 'orders' as const,
      value: '+25,000',
      label: { ar: 'أوردر اتشغّلوا', en: 'Orders handled' } satisfies Localized, // REVIEW
    },
    {
      icon: 'sales' as const,
      value: 'EGP 7M+',
      label: {
        ar: 'مبيعات في براندات e-commerce',
        en: 'Sales across e-commerce businesses',
      } satisfies Localized, // REVIEW
    },
    {
      icon: 'time' as const,
      /**
       * `value` is the figure ALONE and any word that follows it lives in
       * `unit`. The figure renders inside an LTR isolate so bidi cannot
       * reorder it; a unit left inside that isolate would be dragged to the
       * wrong side of the number in Arabic, which is how "~6 شهور" ends up
       * reading as "شهور 6~".
       */
      value: '~6',
      unit: { ar: 'شهور', en: 'months' } satisfies Localized,
      label: {
        ar: 'خبرة e-commerce عملية',
        en: 'Hands-on e-commerce experience',
      } satisfies Localized, // REVIEW
    },
  ],

  scrollCue: { ar: 'اسحب للأسفل', en: 'Scroll down' } satisfies Localized,
};
