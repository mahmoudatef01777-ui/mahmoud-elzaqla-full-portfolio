import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Factory,
  Megaphone,
  MessageSquare,
  Package,
  Store,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import type { StoryStage } from '@/content';
import { FadeIn } from './motion';
import { cn } from '@/lib/cn';

/**
 * One thin line mark per stage, keyed by id — presentation, so it lives here
 * rather than in the content file. Deliberately small (15px) and set at stroke
 * 1.5 so it reads as a mark beside the number, not as an illustration: the dot
 * on the rail is what carries progress, and the icon must not outweigh it.
 *
 * A stage without an entry simply renders no icon, so adding a stage cannot
 * break the rail.
 */
const ICONS: Record<string, LucideIcon> = {
  operations: Package,
  customers: MessageSquare,
  managing: Users,
  production: Factory,
  bloomy: Store,
  shopify: Megaphone,
  growth: TrendingUp,
};

/**
 * The story rail, with its reading indicator.
 *
 * Lifted out of the home page's Background section on 2026-09-14 when the full
 * story moved to /background. The behaviour is unchanged: it is driven directly
 * by scroll position rather than by a one-shot reveal — a line at 55% of the
 * viewport is treated as the reader's eye, the accent fills the rail down to
 * it, and the marker it has passed is the active one. Scroll back up and the
 * fill recedes, because it is a function of position and nothing is latched. A
 * spring smooths the value so neither the fill nor the active marker can
 * flicker between two stages.
 *
 * Under prefers-reduced-motion none of it runs: the rail renders full and every
 * marker reads as reached, which is the same information without the motion.
 */

export default function StoryTimeline({ stages }: { stages: StoryStage[] }) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const railRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [markers, setMarkers] = useState<number[]>([]);
  const [railHeight, setRailHeight] = useState(0);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.55', 'end 0.55'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // The track is inset 8px at each end (inset-y-2) while progress is measured
  // across the whole rail, so the fill is converted into the track's own
  // coordinates. Without this the line stops ~8px short of the active marker.
  const INSET = 8;
  const fillScale = useTransform(progress, (v) => {
    const span = railHeight - INSET * 2;
    if (span <= 0) return 0;
    return Math.min(1, Math.max(0, (v * railHeight - INSET) / span));
  });

  /** Marker centres relative to the rail, so the fill can land on them. */
  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const railTop = rail.getBoundingClientRect().top;
    setRailHeight(rail.offsetHeight);
    setMarkers(
      markerRefs.current.map((el) => {
        if (!el) return 0;
        const box = el.getBoundingClientRect();
        return box.top + box.height / 2 - railTop;
      }),
    );
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce || !railHeight || markers.length === 0) return;
    const y = v * railHeight;
    let next = -1;
    // A small tolerance stops the active marker flickering exactly on a dot.
    for (let i = 0; i < markers.length; i++) if (markers[i] <= y + 4) next = i;
    setActive((cur) => (cur === next ? cur : next));
  });

  return (
    <ol ref={railRef} className="relative">
      <span
        aria-hidden
        className="absolute inset-y-2 start-[0.4375rem] w-px bg-line lg:start-[0.5625rem]"
      >
        {/* scaleY rather than height: it is composited, so the fill cannot
            cause layout work on every scroll frame. */}
        <motion.span
          className="block h-full w-px origin-top bg-orange"
          style={reduce ? { scaleY: 1 } : { scaleY: fillScale }}
        />
      </span>

      {stages.map((stage, i) => (
        <FadeIn
          as="li"
          key={stage.id}
          delay={0.04 * (i % 3)}
          className="relative ps-9 pb-10 last:pb-0 md:ps-12"
        >
          <span
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
            aria-hidden
            className={cn(
              'absolute start-0 top-[0.3125rem] grid h-[0.875rem] w-[0.875rem] place-items-center rounded-full border-2 bg-cream lg:h-[1.125rem] lg:w-[1.125rem]',
              'transition-colors duration-500 ease-out',
              reduce || i < active
                ? 'border-orange'
                : i === active
                  ? 'border-orange bg-orange'
                  : 'border-line',
            )}
          />

          {(() => {
            const Icon = ICONS[stage.id];
            return (
              <p className="flex items-center gap-2">
                {Icon && (
                  <Icon
                    aria-hidden
                    size={15}
                    strokeWidth={1.5}
                    className={cn(
                      'shrink-0 transition-colors duration-500 ease-out',
                      // Monochrome throughout; the accent marks only where the
                      // reader is, so it never competes with the rail's dots.
                      reduce
                        ? 'text-ink'
                        : i === active
                          ? 'text-orange-ink'
                          : i < active
                            ? 'text-ink'
                            : 'text-ink-dim/45',
                    )}
                  />
                )}
                <span className="font-latin text-xs font-semibold text-ink-dim tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </p>
            );
          })()}
          <h3 className="display mt-1.5 text-display-xs text-ink">{t(stage.name)}</h3>

          {t(stage.body).map((para, k) => (
            <p
              key={k}
              className="mt-2.5 max-w-[56ch] text-[0.9375rem] leading-[1.65] text-ink-dim md:text-base"
            >
              {para}
            </p>
          ))}

          {stage.stats && (
            <div className="mt-4 flex flex-wrap gap-2.5">
              {stage.stats.map((stat) => (
                <p
                  key={stat.value}
                  className="inline-flex max-w-full flex-wrap items-baseline gap-x-2.5 gap-y-1 rounded-lg border border-line bg-soft px-4 py-2.5"
                >
                  <span className="font-latin num text-lg font-bold text-orange-ink md:text-xl">
                    {stat.value}
                  </span>
                  <span className="text-[0.8125rem] text-ink-dim">{t(stat.label)}</span>
                </p>
              ))}
            </div>
          )}
        </FadeIn>
      ))}
    </ol>
  );
}
