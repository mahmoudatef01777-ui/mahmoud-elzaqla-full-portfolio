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

  availability: {
    ar: 'متاح لوظيفة full-time',
    en: 'Open to full-time roles',
  } satisfies Localized,

  headline: {
    ar: 'بدأت من الأوردرات، مش من الإعلانات',
    en: 'I started with the orders, not the ads.',
  } satisfies Localized,

  subline: {
    ar: 'ببني ستورات Shopify، وبشغّل إعلانات Meta وTikTok، وعيني على الأوردر لحد ما يوصل للعميل.',
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
