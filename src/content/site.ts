import type { Localized } from './types';

export const identity = {
  name: { ar: 'محمود عاطف', en: 'Mahmoud Atef' } satisfies Localized,
  title: {
    ar: 'E-commerce Growth Specialist — Shopify · Performance · Operations',
    en: 'E-commerce Growth Specialist — Shopify · Performance · Operations',
  } satisfies Localized,
};

export const contact = {
  whatsapp: {
    href: 'https://wa.me/201008726224',
    display: '+20 100 872 6224',
    label: { ar: 'كلمني على واتساب', en: 'Message me on WhatsApp' } satisfies Localized,
  },
  email: {
    href: 'mailto:mahmoudelzaqla@gmail.com',
    display: 'mahmoudelzaqla@gmail.com',
    label: { ar: 'إيميل', en: 'Email' } satisfies Localized,
  },
  linkedin: {
    href: 'https://linkedin.com/in/mahmoudelzaqla',
    display: 'linkedin.com/in/mahmoudelzaqla',
    label: { ar: 'لينكدإن', en: 'LinkedIn' } satisfies Localized,
  },
};

/**
 * CV download. Hidden until the PDF exists — drop the file in
 * site/public/ and flip `enabled` to true.
 */
export const cv = {
  enabled: false,
  href: '/mahmoud-atef-cv.pdf',
  label: { ar: 'حمّل الـ CV', en: 'Download CV' } satisfies Localized,
};
