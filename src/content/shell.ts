import type { Localized } from './types';

/**
 * Site chrome for the reference design: the monogram, the six-item nav and
 * the black call pill. Kept apart from `ui.ts` (which still feeds the older
 * anchor-based `Nav.tsx` on the home page) so the two can coexist while the
 * site is rebuilt page by page.
 */

/** The lockup in the header. Reads the same in both languages. */
export const monogram = 'MA';

export interface ShellNavItem {
  /** Route with no language prefix, matching the keys in App.tsx ROUTES. */
  route: string;
  label: Localized;
  /** false = the page is not built yet, so the link falls back to home. */
  ready: boolean;
}

export const shellNav: ShellNavItem[] = [
  { route: '/', label: { ar: 'الرئيسية', en: 'Home' }, ready: true },
  { route: '/about', label: { ar: 'عني', en: 'About' }, ready: true },
  { route: '/services', label: { ar: 'الخدمات', en: 'Services' }, ready: false },
  { route: '/projects', label: { ar: 'المشاريع', en: 'Projects' }, ready: true },
  { route: '/blog', label: { ar: 'المدونة', en: 'Blog' }, ready: false },
  { route: '/contact', label: { ar: 'تواصل', en: 'Contact' }, ready: false },
];

export const shellCta = {
  href: 'https://wa.me/201008726224',
  label: { ar: 'كلمني', en: "Let’s Talk" } satisfies Localized,
};
