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
     * THE SAME TWO PICTURES IN AVIF, AND THEY ARE THE ONES ACTUALLY SERVED.
     *
     * The hero is the largest thing on the first screen, so it is the LCP
     * element, and at 164 KB and 143 KB the two WebP files were most of what a
     * phone downloaded before it could see anything. At quality 58 AVIF is
     * 68 KB and 56 KB — about 60% off — and at 2x zoom the figures on the
     * dashboards are indistinguishable from the WebP.
     *
     * The WebP above stays as the fallback in the <picture>, so a browser
     * without AVIF still gets the hero.
     */
    desktopAvif: '/work/personal/hero-desktop.avif',
    mobileAvif: '/work/personal/hero-mobile.avif',
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
