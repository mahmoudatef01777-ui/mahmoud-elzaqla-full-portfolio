import type { Localized } from './types';
import { caseStudies } from './case-studies';

/**
 * Page titles and descriptions, per route and per language.
 *
 * WHAT THIS DOES AND DOES NOT DO. These are written into the document by
 * `useHead` after React mounts, so they are correct in the browser tab, in
 * bookmarks, and for crawlers that render JavaScript — Google does.
 *
 * They are NOT what WhatsApp or LinkedIn read. Those scrapers take the raw
 * HTML and never run the app, so the link card for EVERY url comes from the
 * static tags in index.html. That is a property of shipping a single-page
 * app from one index.html, not something a longer title list here can fix;
 * per-page cards would need the routes prerendered at build time.
 *
 * So: index.html carries the sharing card for the site as a whole, and this
 * file carries the per-page truth for everything else.
 *
 * NOTHING HERE MAY MAKE A CLAIM THE PAGE DOES NOT. Descriptions are drawn
 * from copy that already exists on the page — no figures, no superlatives,
 * and never a number without the source that the page itself gives it.
 */

export interface PageMeta {
  title: Localized;
  description: Localized;
}

const NAME: Localized = { ar: 'محمود عاطف', en: 'Mahmoud Atef' };

/** Appended to every title except the home page, which is already the name. */
function suffix(lang: 'ar' | 'en') {
  return NAME[lang];
}

const ROUTES: Record<string, PageMeta> = {
  '/': {
    title: {
      ar: 'محمود عاطف — E-commerce Growth Specialist',
      en: 'Mahmoud Atef — E-commerce Growth Specialist',
    },
    description: {
      ar: 'ببني ستورات Shopify، وبشغّل إعلانات Meta وTikTok، وبشوف المنتج والسوق والعميل والتشغيل والأرقام — وبعدها بشوف الإعلان.',
      en: 'I build Shopify stores, run Meta and TikTok ads, and read the product, the market, the customer, the operation and the numbers before I read the ad.',
    },
  },
  '/projects': {
    title: { ar: 'كل المشاريع', en: 'All projects' },
    description: {
      ar: 'عشر شغلانات في الـ e-commerce — الستور والإعلانات والتشغيل — وكل رقم منشور جنبه مصدره وفترته.',
      en: 'Ten e-commerce engagements — the store, the ads and the operation — with every published figure next to its source and period.',
    },
  },
  '/background': {
    title: { ar: 'الخلفية', en: 'Background' },
    description: {
      ar: 'إزاي اتعلّمت الـ e-commerce من جوّه العملية نفسها: المخزن، الأوردرات، العملاء، وبعدها الإعلانات.',
      en: 'How I learned e-commerce from inside the operation: the stock, the orders, the customers — and only then the ads.',
    },
  },
  '/about': {
    title: { ar: 'عني', en: 'About' },
    description: {
      ar: 'محمود عاطف — E-commerce Growth Specialist. مين أنا، وإزاي بشتغل مع البراندات.',
      en: 'Mahmoud Atef — E-commerce Growth Specialist. Who I am, and how I work with brands.',
    },
  },
  '/landing': {
    title: { ar: 'محمود عاطف', en: 'Mahmoud Atef' },
    description: {
      ar: 'ببني ستورات Shopify، وبشغّل إعلانات Meta وTikTok، وعيني على الأوردر لحد ما يوصل للعميل.',
      en: 'I build Shopify stores, run Meta and TikTok ads, and keep an eye on every order until it reaches the customer.',
    },
  },
};

/**
 * Case studies describe themselves. Their `intro` is the one sentence the
 * page opens with, so the description is never a second, looser version of
 * the same claim.
 */
const CASES: Record<string, PageMeta> = Object.fromEntries(
  caseStudies.map((c) => [
    `/work/${c.id}`,
    { title: { ar: c.brand, en: c.brand }, description: c.intro },
  ]),
);

/** Bloomy has its own page and is not in `caseStudies`. */
const BLOOMY: PageMeta = {
  title: { ar: 'Bloomy', en: 'Bloomy' },
  description: {
    ar: 'براندي أنا — من أول أوردر لحد تشغيل عملية كاملة. الستور والإعلانات والمخزن والتوصيل.',
    en: 'My own brand — from the first order to running the whole operation: the store, the ads, the stock and the delivery.',
  },
};

export function seoFor(route: string, lang: 'ar' | 'en'): { title: string; description: string } {
  const meta = route === '/work/bloomy' ? BLOOMY : (ROUTES[route] ?? CASES[route] ?? ROUTES['/']);
  const base = meta.title[lang];
  const title = route === '/' || route === '/landing' ? base : `${base} — ${suffix(lang)}`;
  return { title, description: meta.description[lang] };
}
