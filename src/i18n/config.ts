export const LANGS = ['ar', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** Arabic is the default: "/" serves Arabic, "/en" serves English. */
export const DEFAULT_LANG: Lang = 'ar';

export const DIR: Record<Lang, 'rtl' | 'ltr'> = { ar: 'rtl', en: 'ltr' };

export function langFromPath(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0];
  return first === 'en' ? 'en' : 'ar';
}

/** Canonical path for a language, preserving anything after the prefix. */
export function pathForLang(lang: Lang, pathname: string): string {
  const rest = pathname.split('/').filter(Boolean);
  if (rest[0] === 'en' || rest[0] === 'ar') rest.shift();
  const tail = rest.join('/');
  const prefix = lang === 'en' ? '/en' : '';
  return `${prefix}/${tail}`.replace(/\/+$/, '') || '/';
}

/** The path with any language prefix stripped, e.g. "/en/work/bloomy" -> "/work/bloomy". */
export function routeFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'ar') parts.shift();
  return `/${parts.join('/')}`;
}

/** Build an href for a route in a given language. */
export function hrefFor(lang: Lang, route: string): string {
  const prefix = lang === 'en' ? '/en' : '';
  const clean = route === '/' ? '' : route;
  return `${prefix}${clean}` || '/';
}
