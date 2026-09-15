import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useAnimationFrame, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { brandColor, projectsStrip } from '@/content';
import { FadeIn } from './ui/motion';

/**
 * Section 5 — Projects, as an orbit.
 *
 * The brands circle a centre the way planets circle a sun: the one at the
 * near point of the ellipse is large and solid, the one opposite it is small
 * and faded behind, and every project takes its turn at the front. It
 * replaced a horizontal marquee on 2026-09-15.
 *
 * This row is navigation, not evidence: a logo and a name, no figures and no
 * dashboards. Those live inside the case studies, and putting them here would
 * turn the home page into a claim sheet.
 *
 * HOW IT MOVES. One angle advances in a `useAnimationFrame` loop and the
 * positions are written straight onto the elements' `style`. React is
 * deliberately kept out of the loop — re-rendering ten items sixty times a
 * second on a page this long costs frames for nothing. The only state the
 * loop sets is which project is at the front, and that changes about once a
 * second, not once a frame.
 *
 * DEPTH is `sin(angle)`: +1 at the near point (bottom of the ellipse, full
 * size and opacity, on top), −1 at the far point (top, smallest, faded, at the
 * back). Scale, opacity and z-index all read off that one number, so nothing
 * can drift out of agreement with anything else.
 *
 * THE CENTRE is Mahmoud, and the ellipse is deliberately shallow so the
 * brands travel AROUND him rather than arcing over his head and under his
 * feet. The photo sits at z-index 50, exactly half way up the depth range, so
 * the far half of the ring passes behind his shoulders and the near half
 * passes in front of his chest. That crossing is the whole effect; without it
 * the ring would read as a flat row of circles.
 *
 * `RING_SHIFT` drops the ring below the box's centre so the sweep never
 * crosses his face.
 *
 * It pauses whenever the pointer is inside the ring, not just on an icon: the
 * icons are moving, so waiting for a hover on one of them would make clicking
 * a matter of timing. Touch never pauses — a tap fires enter with no matching
 * leave and would strand the orbit stopped for the rest of the visit.
 *
 * Under `prefers-reduced-motion` the loop never starts. The ring is laid out
 * once and stays put, every logo still visible and every link still reachable.
 */

/** Radians per second. One full turn takes about 40s. */
const SPEED = (Math.PI * 2) / 40;

/** Scale at the far point and at the near point. */
const SCALE_BACK = 0.64;
const SCALE_FRONT = 1;

/** Opacity at the far point. The near point is always 1. */
const OPACITY_BACK = 0.38;

/** How far below the box centre the ring runs, as a share of the box height. */
const RING_SHIFT = 0.16;

export default function ProjectsOrbit() {
  const { t, href, navigate, isRTL } = useLang();
  const reduce = useReducedMotion();
  const items = projectsStrip.items;
  const count = items.length;

  const boxRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLLIElement | null)[]>([]);
  const angleRef = useRef(Math.PI / 2); // start with the first project at the front
  const pausedRef = useRef(false);
  /**
   * Whether the ring is anywhere near the viewport.
   *
   * It starts false. The section sits most of a page below the fold, and
   * before 2026-09-15 the loop ran from the moment the app mounted — writing
   * transforms onto ten elements sixty times a second while the visitor was
   * still reading the hero, and before they had scrolled far enough to ever
   * see it. That was most of the page's style-and-layout cost in a Lighthouse
   * run, spent on something nobody was looking at.
   */
  const visibleRef = useRef(false);
  /** Last z-index written per cell, so an unchanged one is not re-written. */
  const zRef = useRef<number[]>([]);

  /**
      * Ellipse radii and the ring's vertical offset, in px.
      *
      * `shift` lives here, measured once per resize, and NOT read inside the
      * animation loop. Reading `clientHeight` per frame — which is what this
      * used to do — forces a synchronous layout flush after the previous
      * frame's writes, and turns a ten-element ring into a full reflow sixty
      * times a second.
      */
  const [radii, setRadii] = useState({ rx: 320, ry: 96, shift: 0 });

  /* The ellipse is wide and shallow on a desktop — a ring seen at an angle —
     and rounder on a phone, where a shallow one would stack every logo onto
     the same horizontal line as the label in the middle. */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const w = box.clientWidth;
      // Shallow on purpose: the brands orbit around him, not over him.
      const rx = Math.min(w * 0.46, 420);
      setRadii({
        rx,
        ry: rx * (w < 640 ? 0.36 : 0.17),
        shift: box.clientHeight * RING_SHIFT,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);

    // `rootMargin` starts it a little before it scrolls in, so the ring is
    // already turning rather than snapping to life at the edge of the screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(box);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /** Writes every cell's transform for the current angle. */
  const layout = useCallback(() => {
    const { rx, ry, shift } = radii;
    for (let i = 0; i < count; i += 1) {
      const el = cellRefs.current[i];
      if (!el) continue;

      const theta = angleRef.current + (i * Math.PI * 2) / count;
      const depth = (Math.sin(theta) + 1) / 2; // 0 far, 1 near
      const scale = SCALE_BACK + (SCALE_FRONT - SCALE_BACK) * depth;

      el.style.transform = `translate3d(calc(${Math.cos(theta) * rx}px - 50%), calc(${
        Math.sin(theta) * ry + shift
      }px - 50%), 0) scale(${scale})`;
      el.style.opacity = String(OPACITY_BACK + (1 - OPACITY_BACK) * depth);

      // z-index only when it actually changes: transform and opacity are
      // composited, but a z-index write re-orders the stacking context and
      // costs a style recalculation every time.
      const z = Math.round(depth * 100);
      if (zRef.current[i] !== z) {
        zRef.current[i] = z;
        el.style.zIndex = String(z);
      }
    }
  }, [count, radii]);

  // Lay out once on mount and whenever the box resizes, so a static ring is
  // correct even when the loop below never runs.
  useEffect(layout, [layout]);

  useAnimationFrame((_, delta) => {
    if (reduce || pausedRef.current || !visibleRef.current) return;
    // Guard against the tab being backgrounded: a long delta would jump the
    // ring rather than animate it.
    angleRef.current += (Math.min(delta, 50) / 1000) * SPEED;
    layout();
  });

  const hold = (pointerType: string) => {
    if (pointerType === 'mouse') pausedRef.current = true;
  };
  const release = (pointerType: string) => {
    if (pointerType === 'mouse') pausedRef.current = false;
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

      <div className="container-page">
        <div
          ref={boxRef}
          className="orbit"
          style={{ '--orbit-ry': `${radii.ry}px` } as CSSProperties}
          onPointerEnter={(e) => hold(e.pointerType)}
          onPointerLeave={(e) => release(e.pointerType)}
          onPointerCancel={(e) => release(e.pointerType)}
        >
          {/* The sun. A cut-out, so there is no plate or frame around him —
              he simply stands in the middle and the work circles him.

              The photo is Mahmoud's own choice (2026-09-15), made after being
              told what it costs him: it is the centre of the section that says
              "brands I worked on from the inside", and his face is behind the
              notes. Swapping it is one line — personal/hero-cutout.webp is a
              clean, face-forward cut-out already in the project. */}
          <img
            className="orbit-photo"
            src="/work/personal/orbit-centre.webp"
            alt={t({
              ar: 'محمود عاطف ماسك مروحة من ورق الدولار قدام وشه وفي إيده التانية تليفون.',
              en: 'Mahmoud Atef holding a fan of dollar notes in front of his face, a phone in his other hand.',
            })}
            width={1100}
            height={927}
            loading="lazy"
            decoding="async"
          />

          <ul className="orbit-ring">
            {items.map((p, i) => {
              const route = `/work/${p.id}`;
              return (
                <li
                  key={p.id}
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  className="orbit-cell"
                >
                  <a
                    className="orbit-item"
                    style={{ '--brand': brandColor(p.id) } as CSSProperties}
                    href={href(route)}
                    title={p.name}
                    // A link that is drifting under the cursor has to stop
                    // when it is focused, or a keyboard user loses it.
                    onFocus={() => {
                      pausedRef.current = true;
                    }}
                    onBlur={() => {
                      pausedRef.current = false;
                    }}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      navigate(route);
                    }}
                  >
                    <img src={p.logo} alt="" aria-hidden width={72} height={72} loading="lazy" />
                    <span className="sr-only">{p.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
