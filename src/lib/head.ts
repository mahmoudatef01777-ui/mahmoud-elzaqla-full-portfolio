import { useEffect } from 'react';
import { seoFor } from '@/content/seo';
import type { Lang } from '@/i18n/config';

/**
 * Keeps <title>, the description, the canonical link and the hreflang pair in
 * step with the route and the language.
 *
 * WHY THIS IS NOT ENOUGH ON ITS OWN, and why index.html still carries a full
 * card: WhatsApp and LinkedIn read the raw HTML and never run the app, so the
 * preview for every url on the site comes from the static tags. What this
 * hook fixes is everything that DOES see the rendered page — the browser tab,
 * a bookmark, a shared screenshot of the tab bar, and Google, which renders.
 *
 * It also writes og:title / og:description / og:url, which costs nothing and
 * is correct for any scraper that renders. It deliberately does NOT touch
 * og:image: that file is fixed for the whole site and index.html owns it.
 */

/**
 * THE ONE HOST THIS SITE IS CANONICAL AT.
 *
 * It named mahmoudelzaqla.com for a long time, which has no DNS record: every
 * page published a canonical pointing at a url that does not resolve, which
 * tells a search engine not to index the page it is reading. It was then read
 * off `window.location.origin` while the final host was undecided, which was
 * always correct but made the deployment url and the domain each
 * self-canonical instead of one pointing at the other.
 *
 * It is the real domain now. index.html names the same host in og:url and
 * og:image, which a scraper reads without running any of this — change both
 * together or a shared card describes a different site from the one it opens.
 */
const ORIGIN = 'https://mahmoudelzaqla.site';

function meta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function link(rel: string, href: string, hreflang?: string) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useHead(route: string, lang: Lang) {
  useEffect(() => {
    const { title, description } = seoFor(route, lang);
    document.title = title;

    meta('meta[name="description"]', 'name', 'description', description);
    meta('meta[property="og:title"]', 'property', 'og:title', title);
    meta('meta[property="og:description"]', 'property', 'og:description', description);
    meta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    meta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    // English is the root and Arabic is prefixed, since 2026-09-19. Keep this
    // in step with i18n/config.ts — a canonical that disagrees with the url
    // the visitor is on is worse than no canonical at all.
    const path = route === '/' ? '' : route;
    const enUrl = `${ORIGIN}${path || '/'}`;
    const arUrl = `${ORIGIN}/ar${path}`;
    const self = lang === 'ar' ? arUrl : enUrl;

    meta('meta[property="og:url"]', 'property', 'og:url', self);
    meta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'ar' ? 'ar_EG' : 'en_US');
    link('canonical', self);
    // English is the default, so it is also x-default.
    link('alternate', arUrl, 'ar');
    link('alternate', enUrl, 'en');
    link('alternate', enUrl, 'x-default');
  }, [route, lang]);
}
