export const LANGS = ['ar', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/**
 * ENGLISH IS THE DEFAULT AND LIVES AT THE ROOT: "/" serves English, "/ar"
 * serves Arabic. It was the other way round until 2026-09-19.
 *
 * WHY IT MATTERS BEYOND TASTE: this portfolio is sent to agencies and
 * companies, and a bare link has to open the same page for everyone who
 * receives it. The url is the only thing that decides language — nothing
 * stored in a browser can change what a link means — which is also what lets
 * the static tags in index.html describe the page a scraper actually fetches.
 */
export const DEFAULT_LANG: Lang = 'en';

export const DIR: Record<Lang, 'rtl' | 'ltr'> = { ar: 'rtl', en: 'ltr' };

export function langFromPath(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0];
  return first === 'ar' ? 'ar' : 'en';
}

/** Canonical path for a language, preserving anything after the prefix. */
export function pathForLang(lang: Lang, pathname: string): string {
  const rest = pathname.split('/').filter(Boolean);
  if (rest[0] === 'en' || rest[0] === 'ar') rest.shift();
  const tail = rest.join('/');
  const prefix = lang === 'ar' ? '/ar' : '';
  return `${prefix}/${tail}`.replace(/\/+$/, '') || '/';
}

/** The path with any language prefix stripped, e.g. "/ar/work/bloomy" -> "/work/bloomy". */
export function routeFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'en' || parts[0] === 'ar') parts.shift();
  return `/${parts.join('/')}`;
}

/** Build an href for a route in a given language. */
export function hrefFor(lang: Lang, route: string): string {
  const prefix = lang === 'ar' ? '/ar' : '';
  const clean = route === '/' ? '' : route;
  return `${prefix}${clean}` || '/';
}
