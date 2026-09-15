import type { MouseEvent } from 'react';

/**
 * Turns a nav entry into an href plus a click handler.
 *
 * The header nav holds two kinds of item and used to render both as bare
 * `#id` anchors:
 *
 *  - a SECTION on the home page (`{ id: 'approach' }`), and
 *  - a PAGE (`{ id: 'projects', route: '/projects' }`).
 *
 * That was wrong twice over. "Projects" went to the home page's marquee
 * instead of the full projects page, and from any sub-page every anchor
 * pointed at a section that is not on that page, so the link silently did
 * nothing. Both are fixed here, in one place, so the header, the mobile menu
 * and the footer cannot drift apart again.
 */
export interface NavTargetItem {
  id: string;
  /** Present when the item is a page rather than a section anchor. */
  route?: string;
}

export interface NavContext {
  href: (route: string) => string;
  /** The route the visitor is on right now. */
  route: string;
  navigate: (route: string) => void;
  /** Honour prefers-reduced-motion when jumping to a section. */
  reduce?: boolean;
}

export function navTarget(item: NavTargetItem, ctx: NavContext) {
  if (item.route) {
    const to = item.route;
    return {
      href: ctx.href(to),
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        ctx.navigate(to);
      },
    };
  }

  // A section anchor. The href carries the home path as well as the hash, so
  // it still resolves if JS never runs or the link is opened in a new tab.
  return {
    href: `${ctx.href('/')}#${item.id}`,
    onClick: (e: MouseEvent) => {
      if (ctx.route === '/') return; // already home: let the browser jump
      e.preventDefault();
      ctx.navigate('/');
      // The section only exists after the home route renders.
      window.setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({
          behavior: ctx.reduce ? 'auto' : 'smooth',
          block: 'start',
        });
      }, 80);
    },
  };
}
