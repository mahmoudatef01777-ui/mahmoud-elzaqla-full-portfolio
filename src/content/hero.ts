import type { Localized } from './types';

/**
 * Hero — direction v2.
 * Two separate compositions, one per format. They are NOT crops of each
 * other: the landscape file is for desktop, the portrait file for mobile.
 * Swapping either is a one-line change here; the component never names a path.
 *
 * `focalPoint` feeds object-position, so the crop can be nudged per format
 * without touching the component. x/y are percentages.
 */
export const hero = {
  image: {
    desktop: '/work/personal/hero-desktop.webp',
    mobile: '/work/personal/hero-mobile.webp',

    /**
     * THE SAME DESKTOP COMPOSITION, IN TWO LAYERS.
     *
     * `desktop` above is the flat version: Mahmoud and the dashboards baked
     * into one rectangle, which is all there was until he supplied the
     * dashboards on their own. It is still the mobile source and still the
     * fallback, so nothing here is thrown away.
     *
     * These two are the same artwork split apart, both exported on ONE
     * 1708x921 canvas — the background as supplied, and Mahmoud composited
     * onto a transparent copy of it at the position he occupies. Sharing a
     * canvas is the whole point: `object-cover` then crops both identically
     * at every viewport, so the layers can never drift out of register and
     * there is no per-breakpoint maths to keep in step.
     *
     * Hero.tsx moves only `desktopPerson`. The dashboards do not move.
     */
    desktopBg: '/work/personal/hero-desktop-bg.webp',
    desktopPerson: '/work/personal/hero-desktop-person.webp',
  },

  focalPoint: {
    desktop: { x: 50, y: 30 },
    mobile: { x: 50, y: 22 },
  },

  imageAlt: {
    ar: 'محمود عاطف قدام داشبوردات Shopify بتوضّح نتايج المتاجر اللي اشتغل عليها.',
    en: 'Mahmoud Atef in front of Shopify dashboards showing results from the stores he has worked on.',
  } satisfies Localized,

  label: {
    ar: 'E-commerce Growth Specialist',
    en: 'E-commerce Growth Specialist',
  } satisfies Localized,

  /*
    Arabic rewritten 2026-09-15 to position him as more than a media buyer:
    the first line a visitor reads should say he does not look at Ads Manager
    in isolation. The trailing full stop is deliberate — Hero.tsx strips it
    and re-sets it in the accent colour, so the headline must end with one.

    THE ENGLISH IS DELIBERATELY UNTOUCHED, on his instruction, and it still
    makes the OLD claim. The two languages disagree until he sends the new
    English line.
  */
  headline: {
    ar: 'أنا مش بشوف الإعلان لوحده.',
    en: 'I started with the orders, not the ads.',
  } satisfies Localized,

  subline: {
    ar: 'بشوف المنافسين والـbenchmark، المنتج، السوق، العميل، الـwebsite، الـoperations والأرقام — وبعدها بشوف الإعلان.',
    en: 'I build Shopify stores, run Meta and TikTok ads, and keep an eye on every order until it reaches the customer.',
  } satisfies Localized,

  cta: {
    href: 'https://wa.me/201008726224',
    label: {
      ar: 'كلمني على واتساب',
      en: 'Message me on WhatsApp',
    } satisfies Localized,
  },
};
