import type { Localized } from './types';

/**
 * Nav — the home page anchors plus the accent CTA pill.
 *
 * EVERY id here must match a section id actually rendered on the home page:
 * these are plain `#id` anchors, so an id with no section is a link that
 * silently does nothing. "background" was removed on 2026-09-14 for exactly
 * that reason — the Background teaser had been unmounted from the home page
 * and the anchor was left pointing at nothing. The long version still lives
 * at /background, reached from the Experience section's button.
 */
export const nav: Array<{ id: string; label: Localized; route?: string }> = [
  /*
    `{ id: 'approach', label: { ar: 'طريقة شغلي', en: 'How I work' } }` sat
    here until 2026-09-15. It went out with the section itself — see App.tsx.
    Put it back the moment <Approach /> is mounted again, and not before: the
    rule below is what this file exists to protect.
  */
  /**
   * A PAGE, not an anchor. `#projects` used to land on the home page's
   * marquee — a scrolling strip of eight logos — when what the label
   * promises is the full grid with every project and its figures.
   */
  { id: 'projects', label: { ar: 'المشاريع', en: 'Projects' }, route: '/projects' },
  { id: 'why-me', label: { ar: 'ليه أنا', en: 'Why me' } },
];

/** The handle, not the display name — it reads the same in both languages. */
export const wordmark = { ar: 'mahmoudelzaqla', en: 'mahmoudelzaqla' } satisfies Localized;

export const navCta = {
  href: 'https://wa.me/201008726224',
  label: { ar: 'كلمني', en: "Let's talk" } satisfies Localized,
};

export const ui = {
  langToggle: {
    // Each label names the language you are switching TO.
    toEn: { label: 'EN', aria: { ar: 'Switch to English', en: 'Switch to English' } },
    toAr: { label: 'عربي', aria: { ar: 'التبديل للعربية', en: 'Switch to Arabic' } },
  },
  skipToContent: { ar: 'تخطَّ إلى المحتوى', en: 'Skip to content' } satisfies Localized,
  menu: { ar: 'القائمة', en: 'Menu' } satisfies Localized,
  close: { ar: 'إغلاق', en: 'Close' } satisfies Localized,
  themeToggle: { ar: 'بدّل بين الفاتح والداكن', en: 'Switch between light and dark' } satisfies Localized,
  viewProof: { ar: 'اعرض الصورة كاملة', en: 'View the full screenshot' } satisfies Localized,
  approx: { ar: 'تقريبًا', en: 'approx.' } satisfies Localized,
  back: { ar: 'رجوع للرئيسية', en: 'Back to home' } satisfies Localized,
};
