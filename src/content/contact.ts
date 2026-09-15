import type { Localized } from './types';

/**
 * Section 7 — the dark final CTA (#111111), which doubles as the site footer.
 * The WhatsApp URL lives here so it is editable in one place.
 */
// Named `footer` because `contact` is already the identity block in site.ts.
export const footer = {
  label: { ar: 'يلا نتكلم', en: "Let's talk" } satisfies Localized,

  heading: {
    ar: 'يلا نبني حاجة تكبر بجد.',
    en: "Let's build something that actually grows.",
  } satisfies Localized,

  body: {
    ar: 'لو عندك براند e-commerce ومحتاج حد يشوف الصورة كاملة — الستور والإعلانات والتشغيل — ابعتلي على واتساب وقولي انت فين دلوقتي.',
    en: 'If you have an e-commerce brand and want someone who sees the whole picture \u2014 the store, the ads and the operation \u2014 message me on WhatsApp and tell me where you are right now.',
  } satisfies Localized,

  cta: {
    href: 'https://wa.me/201008726224',
    label: { ar: 'كلمني على واتساب', en: 'Message me on WhatsApp' } satisfies Localized,
  },

  email: { href: 'mailto:mahmoudelzaqla@gmail.com', label: 'mahmoudelzaqla@gmail.com' },
  linkedin: {
    href: 'https://linkedin.com/in/mahmoudelzaqla',
    label: 'linkedin.com/in/mahmoudelzaqla',
  },

  availability: {
    ar: 'متاح لوظيفة full-time',
    en: 'Open to full-time roles',
  } satisfies Localized,
};
