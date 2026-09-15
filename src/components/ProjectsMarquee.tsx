import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { brandColor, projectsStrip } from '@/content';
import { FadeIn } from './ui/motion';

/**
 * Section 5 — Projects, as a slow horizontal marquee.
 *
 * This row is navigation, not evidence: logo, name, one short category. No
 * figures, no dashboards, no result cards — those belong inside the case
 * study, and putting them here would turn the home page into a claim sheet.
 *
 * The row is rendered twice and the track translated by -50%, so the loop is
 * seamless; the copy is hidden from assistive tech and removed from the tab
 * order. Direction flips for Arabic, and under prefers-reduced-motion the
 * animation stops and the row becomes an ordinary scroller (see index.css),
 * so every project stays reachable either way.
 *
 * Hovering a plate pauses the whole track and resumes it from the same
 * offset, so the plate under the cursor stays put and a click cannot land on
 * its neighbour. Hovering the band's empty space does nothing — that is why
 * the handlers sit on the plates rather than on `.strip`.
 */
export default function ProjectsMarquee() {
  const { t, href, navigate, isRTL } = useLang();
  const items = projectsStrip.items;

  // Paused while the pointer is on a plate. Touch is excluded on purpose:
  // a tap fires enter without a matching leave, which would strand the
  // marquee stopped for the rest of the visit.
  const [paused, setPaused] = useState(false);
  const hold = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse') setPaused(true);
  };
  const release = (e: ReactPointerEvent) => {
    if (e.pointerType === 'mouse') setPaused(false);
  };

  const item = (p: (typeof items)[number], copy: boolean) => {
    const route = `/work/${p.id}`;
    return (
      <li key={`${p.id}${copy ? '-copy' : ''}`} aria-hidden={copy || undefined}>
        <a
          className="strip-item"
          style={{ '--brand': brandColor(p.id) } as CSSProperties}
          href={href(route)}
          tabIndex={copy ? -1 : undefined}
          onPointerEnter={hold}
          onPointerLeave={release}
          onPointerCancel={release}
          // Keyboard users need it to stop too, or the link they tabbed to
          // walks out from under them.
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            navigate(route);
          }}
        >
          <span className="strip-logo">
            <img src={p.logo} alt="" aria-hidden width={72} height={72} loading="lazy" />
          </span>
          <span>
            <span className="strip-name">{p.name}</span>
            <span className="strip-role">{t(p.role)}</span>
          </span>
        </a>
      </li>
    );
  };

  return (
    <section id="projects" className="scroll-mt-20 py-20 md:py-28 lg:py-32">
      <FadeIn className="container-page mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-14">
        <div>
          <p className="label eyebrow">{t(projectsStrip.label)}</p>
          <h2 className="display mt-6 max-w-[18ch] text-display-sm text-ink">
            {t(projectsStrip.title)}
          </h2>
          <p className="lede mt-5 max-w-[44ch]">{t(projectsStrip.hint)}</p>
        </div>

        <a
          href={href(projectsStrip.cta.route)}
          onClick={(e) => {
            e.preventDefault();
            navigate(projectsStrip.cta.route);
          }}
          className="inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-sm font-semibold text-ink transition-colors duration-300 hover:border-orange hover:text-orange-ink"
        >
          {t(projectsStrip.cta.label)}
          <ArrowUpRight aria-hidden size={15} className={isRTL ? '-scale-x-100' : ''} />
        </a>
      </FadeIn>

      <div className="strip">
        <ul
          className="strip-track"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {items.map((p) => item(p, false))}
          {items.map((p) => item(p, true))}
        </ul>
      </div>
    </section>
  );
}
