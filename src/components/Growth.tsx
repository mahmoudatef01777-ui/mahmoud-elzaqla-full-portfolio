import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { growth, type GrowthBlock } from '@/content';
import { FadeIn, RevealText } from './ui/motion';
import { cn } from '@/lib/cn';

/**
 * "إزاي بفكر في النمو" — the growth section.
 *
 * WHAT IT HAS TO DO. A business owner should scroll this and come away with
 * one idea: growth is a system, and advertising is one part of it. Six blocks
 * of prose in a column say that badly — they read as a service list, and a
 * service list is the one thing this section must not be. So the six live as
 * a system you can see: a spine on the left that shows where you are, cards on
 * the right that open when you want the detail.
 *
 * THE COPY IS CLOSED. Everything rendered here comes from content/growth.ts
 * and every string in it is approved. This file decides how it looks and
 * nothing about what it says.
 *
 * WHAT THE LAYOUT DOES AT EACH SIZE
 *
 *   lg and up   A sticky spine in a 4-column rail, and the cards in the other
 *               8. The spine's active node follows whichever card is being
 *               read, and clicking a node moves to that card. The spine is
 *               navigation and orientation — it carries no copy of its own.
 *
 *   below lg    No spine. It would eat a third of a phone screen to show six
 *               words, and there is no hover to drive it. Each card carries
 *               its own glyph inline instead, and the column is the order.
 *
 * REDUCED MOTION. Every moving part here is either a `FadeIn` (which collapses
 * to a plain fade on its own) or gated on `useReducedMotion` below. Nothing
 * animates on a loop, nothing moves on hover except a colour, and the section
 * is fully readable with motion off.
 *
 * DIRECTION. No horizontal arrows anywhere: the decision flow runs downwards,
 * which means the same thing in both scripts. Every inset uses logical
 * properties, so the whole section mirrors without a single RTL special case.
 */

/* ------------------------------------------------------------------ glyphs */

/**
 * One geometric mark per block. Drawn rather than imported: these are six
 * specific ideas, not six generic icons, and an icon set would give the
 * section a stock look that the rest of the site does not have.
 *
 * All six share a 24-box, a 1.5 stroke and `currentColor`, so they sit at the
 * same visual weight as the type beside them. None carries meaning on its own
 * — the block's name is always next to it — so all are hidden from assistive
 * tech.
 */
function Glyph({ id, className }: { id: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    // The market: a field of players, one of them ours.
    business: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    // The product: one box, and the seam that says it opens.
    product: (
      <>
        <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7z" />
        <path d="M3.5 7 12 11.3 20.5 7" />
        <path d="M12 11.3v9.9" />
      </>
    ),
    // Marketing: a message going out, in widening arcs.
    marketing: (
      <>
        <circle cx="5.5" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <path d="M11 7.4a6.4 6.4 0 0 1 0 9.2" />
        <path d="M15.2 4.4a11 11 0 0 1 0 15.2" />
        <path d="M19.4 1.8a15.4 15.4 0 0 1 0 20.4" />
      </>
    ),
    // Scaling: it climbs, and it is not only the last bar that moves.
    scaling: (
      <>
        <path d="M3.5 20.5h17" />
        <rect x="5" y="13" width="3.6" height="5" rx="1" />
        <rect x="10.2" y="9" width="3.6" height="9" rx="1" />
        <rect x="15.4" y="4.5" width="3.6" height="13.5" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    // Operations: links in a chain, and a chain is only as good as its weakest.
    operations: (
      <>
        <circle cx="6" cy="12" r="3.2" />
        <circle cx="18" cy="12" r="3.2" />
        <path d="M9.2 12h5.6" />
        <path d="M6 5.4v3.4M18 15.2v3.4" />
      </>
    ),
    // The numbers: a line that went up, and the baseline it is measured from.
    numbers: (
      <>
        <path d="M3.5 20.5h17" />
        <path d="M4.5 16.5 9 11l3.5 3 6-7.5" />
        <circle cx="18.5" cy="6.5" r="1.8" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[id]}
    </svg>
  );
}

/* ------------------------------------------------------------------- spine */

/**
 * The system, as one object. Six nodes on a single line, with the line filling
 * down to whichever block is being read.
 *
 * It is a list of buttons rather than a picture with hotspots, so a keyboard
 * reaches every node in order and a screen reader is told what the set is
 * (`growth.systemLabel`) instead of being read six orphaned words.
 */
function Spine({
  blocks,
  active,
  onPick,
}: {
  blocks: GrowthBlock[];
  active: number;
  onPick: (i: number) => void;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  // The fill stops at the centre of the active node, not past it, so the line
  // reads as "you are here" rather than "this much is done".
  const fill = `${((active + 0.5) / blocks.length) * 100}%`;

  return (
    <div className="relative">
      <p className="sr-only">{t(growth.systemLabel)}</p>

      {/* The rail, and the accent that fills it. `start-[1.125rem]` puts it
          through the middle of the 2.25rem nodes in both directions. */}
      <span aria-hidden className="absolute inset-y-3 start-[1.125rem] w-px bg-line">
        {/* Reduced motion changes how it gets there, not where it stops. It
            used to fill the whole rail with motion off, which said "all six"
            while the node beside it said "01". */}
        <motion.span
          className="block w-px bg-orange"
          initial={false}
          animate={{ height: fill }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>

      <ol className="relative space-y-1">
        {blocks.map((b, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={isActive ? 'step' : undefined}
                className="group flex w-full cursor-pointer items-center gap-4 rounded-lg py-2 text-start transition-colors duration-200 hover:bg-ink/[0.03]"
              >
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-cream transition-colors duration-300',
                    isActive
                      ? 'border-orange text-orange'
                      : isPast
                        ? 'border-orange/40 text-orange/60'
                        : 'border-line text-ink-dim group-hover:border-ink/30',
                  )}
                >
                  <Glyph id={b.id} className="h-[1.05rem] w-[1.05rem]" />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'font-latin block text-[0.6875rem] font-semibold tabular transition-colors duration-300',
                      isActive ? 'text-orange-ink' : 'text-ink-dim',
                    )}
                  >
                    {b.n}
                  </span>
                  <span
                    className={cn(
                      'block text-[0.9375rem] leading-snug transition-colors duration-300',
                      isActive ? 'font-semibold text-ink' : 'text-ink/50',
                    )}
                  >
                    {t(b.name)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------- cards */

/**
 * One block.
 *
 * The number, the name and the lead are always visible — that is the part a
 * reader who never opens anything still gets, and it is written to stand on
 * its own. The points sit in a native <details>, so they are in the document
 * for a crawler and for find-in-page whether or not they are on screen, and
 * the disclosure works with JavaScript off.
 *
 * The first one ships open. Six closed rows in a column look like a FAQ, and
 * the reader has no reason yet to believe there is anything worth opening.
 */
function Card({
  block,
  index,
  registerRef,
}: {
  block: GrowthBlock;
  index: number;
  registerRef: (i: number, el: HTMLLIElement | null) => void;
}) {
  const { t } = useLang();

  return (
    <li
      ref={(el) => registerRef(index, el)}
      id={`growth-${block.id}`}
      className="scroll-mt-28 border-t border-line first:border-t-0 lg:first:border-t lg:border-t"
    >
      <FadeIn delay={0.03} y={18}>
        <details open={index === 0} className="group/d py-7 md:py-9">
          <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden md:gap-6">
            {/* The glyph is the spine's job on a laptop; on a phone there is
                no spine, so the card carries its own. */}
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink-dim transition-colors duration-300 group-open/d:border-orange group-open/d:text-orange lg:hidden">
              <Glyph id={block.id} className="h-[1.15rem] w-[1.15rem]" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="font-latin block text-[0.6875rem] font-semibold tabular text-orange-ink">
                {block.n}
              </span>
              <h3 className="display mt-1.5 text-[1.125rem] text-ink md:text-[1.375rem] lg:text-[1.5rem]">
                {t(block.name)}
              </h3>
              <p className="mt-2.5 max-w-[52ch] text-sm leading-[1.75] text-ink-dim md:text-base">
                {t(block.lead)}
              </p>
            </span>

            {/* The affordance. A caret alone on a row this tall is easy to
                miss, so it is labelled — and the label is hidden from the
                accessibility tree because <summary> already announces state. */}
            <span
              aria-hidden
              className="mt-1 flex shrink-0 items-center gap-2 text-ink-dim transition-colors duration-200 group-hover/d:text-ink"
            >
              <span className="hidden text-xs font-semibold sm:inline">{t(growth.more)}</span>
              <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-transform duration-300 group-open/d:rotate-45">
                {/* A plus that becomes an x. Rotation only, so it reads the
                    same in both directions. */}
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                  <path d="M8 2.5v11M2.5 8h11" />
                </svg>
              </span>
            </span>
          </summary>

          <div
            className={cn(
              'ps-14 pt-5 md:ps-16 lg:ps-0',
              // The image slot, when the block has one, sits beside the points
              // on a wide screen and under them otherwise.
              block.art ? 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10' : '',
            )}
          >
            <div>
              <ul className="space-y-2.5">
                {block.points.map((p) => (
                  <li key={t(p)} className="flex gap-3 text-sm leading-[1.7] text-ink md:text-[0.9375rem]">
                    <span aria-hidden className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-orange" />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>

              {block.close && (
                <p className="mt-5 max-w-[62ch] border-s-2 border-orange ps-4 text-[0.8125rem] leading-[1.8] text-ink-dim md:text-sm">
                  {t(block.close)}
                </p>
              )}
            </div>

            {block.art && (
              <img
                src={block.art.src}
                alt={t(block.art.alt)}
                width={block.art.width}
                height={block.art.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded-media border border-line"
              />
            )}
          </div>
        </details>
      </FadeIn>
    </li>
  );
}

/* ---------------------------------------------------------------- decision */

/**
 * The decision, as a path rather than a list.
 *
 * Six questions on one line, each with its own node, and the line ends in the
 * answer. It runs downwards on purpose — a horizontal flow would have to
 * mirror, and a mirrored arrow is a different arrow.
 */
function Decision() {
  const { t } = useLang();
  const steps = growth.decision.steps;

  return (
    <FadeIn className="mt-16 md:mt-24">
      {/*
        TWO COLUMNS ON A LAPTOP. Six short questions stacked under a heading
        used about a third of the card and left the rest of it white, which on
        a 1280 screen read as a mistake rather than as space. The question the
        section is answering sits on one side and the path sits on the other,
        and the card is the same single column on anything narrower.
      */}
      <div className="rounded-media border border-line bg-soft p-6 md:p-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-12">
        <h3 className="display text-[1.25rem] text-ink md:text-[1.625rem] lg:col-span-5 lg:text-[1.625rem] lg:leading-[1.3]">
          {t(growth.decision.title)}
        </h3>

        <ol className="relative mt-8 md:mt-10 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {/* One continuous hairline behind the nodes, stopping short of the
              last one so the resolution sits off the end of the path. */}
          <span
            aria-hidden
            className="absolute start-[0.6875rem] top-3 w-px bg-line"
            style={{ bottom: `calc(100% / ${steps.length} + 0.25rem)` }}
          />

          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            return (
              <FadeIn as="li" key={t(s)} delay={0.05 * i} y={14} className="relative flex gap-4 pb-6 last:pb-0 md:gap-5">
                <span
                  aria-hidden
                  className={cn(
                    'relative z-10 mt-[0.15rem] grid shrink-0 place-items-center rounded-full transition-colors',
                    isLast
                      ? 'h-6 w-6 bg-orange text-on-orange'
                      : 'h-6 w-6 border border-line bg-cream',
                  )}
                >
                  {isLast ? (
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  ) : (
                    <span className="font-latin text-[0.625rem] font-semibold tabular text-ink-dim">
                      {i + 1}
                    </span>
                  )}
                </span>

                <p
                  className={cn(
                    'max-w-[46ch] leading-snug',
                    isLast
                      ? 'display text-[1.0625rem] text-ink md:text-[1.25rem]'
                      : 'text-[0.9375rem] text-ink md:text-base',
                  )}
                >
                  {t(s)}
                </p>
              </FadeIn>
            );
          })}
        </ol>
      </div>
    </FadeIn>
  );
}

/* --------------------------------------------------------------- component */

export default function Growth() {
  const { t } = useLang();
  const blocks = growth.blocks;
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const registerRef = useCallback((i: number, el: HTMLLIElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  /**
   * The spine follows the reading position.
   *
   * ONE LINE, A THIRD OF THE WAY DOWN THE VIEWPORT, and the active block is
   * the last one whose top has passed it. That is all of it: measured from
   * the scroll position every frame it changes, so the answer is a function
   * of where the page is rather than of what happened on the way there.
   *
   * WHY NOT AN IntersectionObserver, which is the obvious tool. Two attempts
   * with one are in the history of this file and both were wrong in the same
   * way: a callback is handed only the elements whose intersection CHANGED,
   * so any state derived from it drifts, and — worse — a jump that changes no
   * intersection at all fires nothing. Scrolling up to this section from
   * further down the page is exactly that jump, and it left the spine lit on
   * block 06 with block 01 in front of the reader. Six getBoundingClientRect
   * calls on a frame the browser was already painting is not worth being
   * clever about.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const els = cardRefs.current;
      const line = window.innerHeight * 0.32;
      let next = 0;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el && el.getBoundingClientRect().top <= line) next = i;
      }
      setActive(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // A node on the spine moves to its card. `scroll-mt-28` on the card keeps it
  // clear of the sticky header.
  const goTo = useCallback((i: number) => {
    setActive(i);
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id="growth" className="scroll-mt-20 border-t border-line">
      {/* The bottom padding is shorter than the top on purpose: the dark band
          below is part of this section, and the section's full rhythm between
          the decision card and it left a band of dead white. */}
      <div className="container-page pb-16 pt-20 md:pb-20 md:pt-28 lg:pb-24 lg:pt-36">
        {/* ------------------------------------------------------- opening */}
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(growth.label)}</p>
          <h2 className="display mt-6 text-display-sm text-ink">{t(growth.title)}</h2>
          <p className="lede mt-6">{t(growth.intro)}</p>
        </FadeIn>

        {/* ----------------------------------------------- spine and cards */}
        <div className="mt-12 grid gap-8 md:mt-16 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="hidden lg:col-span-4 lg:block">
            <div className="lg:sticky lg:top-[16vh]">
              <Spine blocks={blocks} active={active} onPick={goTo} />
            </div>
          </div>

          <ol className="lg:col-span-8 lg:col-start-5">
            {blocks.map((b, i) => (
              <Card key={b.id} block={b} index={i} registerRef={registerRef} />
            ))}
          </ol>
        </div>

        {/* ------------------------------------------------------ decision */}
        <Decision />
      </div>

      {/*
        THE PAYOFF, and it gets its own band.

        Everything above is HOW he thinks. This is WHY, and it is the sentence
        a business owner should still have in their head at the end of the
        page — so it is not another paragraph in the same column. It is the
        full width, on the dark surface the footer uses, resolving word by word
        as it is read. `RevealText` falls back to plain text under reduced
        motion, so nothing here depends on the animation to be legible.
      */}
      <div className="bg-black text-on-dark">
        <div className="container-page py-16 md:py-24 lg:py-28">
          <RevealText
            text={t(growth.statement)}
            dim={0.38}
            className="display mx-auto max-w-[24ch] text-center text-[clamp(1.375rem,4.2vw,2.75rem)] leading-[1.28] text-on-dark"
          />
        </div>
      </div>
    </section>
  );
}
