import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Shared motion primitives — direction v3 (Hybrid).
 *
 * The reference portfolio's *staging* is what we are borrowing: things reveal
 * once, cards stack, a statement resolves as you read it. None of it is
 * decoration for its own sake, and every primitive here has the same two
 * obligations:
 *
 *   1. `prefers-reduced-motion` collapses it to a plain fade, or to nothing.
 *   2. Nothing it does may depend on reading direction, or it mirrors in RTL.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ FadeIn */

/**
 * Reveal once, when the element comes into view.
 *
 * `x` is in *logical* pixels: positive means "from the end edge", so a value
 * of 40 slides in from the right in English and from the left in Arabic
 * without the caller having to know which language is active.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span' | 'p';
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const from = reduce ? { opacity: 0 } : { opacity: 0, x, y };
  const to = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <Tag
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: reduce ? 0.3 : duration, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------- RevealText */

/**
 * Scroll-driven reveal, word by word.
 *
 * The reference does this per character. Arabic is cursive — its letters join,
 * and their shape depends on their neighbours — so splitting a word into
 * separately-styled characters breaks the shaping and looks wrong. Splitting
 * on spaces is safe in both scripts, and at reading distance a word-by-word
 * resolve is barely distinguishable from a character one anyway.
 */
export function RevealText({
  text,
  className,
  dim = 0.2,
}: {
  text: string;
  className?: string;
  dim?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  const words = text.split(' ');

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      {/* A real space, so selecting and copying the paragraph still works. */}
      <span> </span>
    </>
  );
}

/* ----------------------------------------------------------------- Magnet */

/**
 * Magnetic hover. The element drifts toward the cursor once the cursor is
 * within `padding` of its box, and eases back when it leaves.
 *
 * Pointer-driven only: it listens for `mousemove`, so touch devices never
 * trigger it, and it is skipped entirely under reduced motion.
 */
export function Magnet({
  children,
  padding = 90,
  strength = 4,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // A coarse pointer has no hover to speak of, and the listener would only
    // fire on tap — which would make the element jump.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const inside =
        Math.abs(dx) < box.width / 2 + padding && Math.abs(dy) < box.height / 2 + padding;

      setActive(inside);
      setOffset(inside ? { x: dx / strength, y: dy / strength } : { x: 0, y: 0 });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength, reduce]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
          willChange: 'transform',
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- StackCards */

/**
 * Sticky stacking cards: each card pins, and shrinks a little as the next one
 * slides over it, so the set reads as one deck rather than a list.
 *
 * Enabled from `lg` up only. Below that a card is nearly as tall as the
 * viewport, sticky positioning has nothing left to pin against, and the
 * shrink just makes the type smaller on the screen that can least afford it.
 * Mobile gets the same cards in a plain column - same content, same order.
 */

/** The scale a card settles at once every later card has stacked on top. */
export function targetScaleFor(index: number, total: number) {
  return 1 - (total - 1 - index) * 0.035;
}

/**
 * One slot in the deck. `progress` is the parent's scroll progress; `index`
 * decides both how far the card shrinks and when it starts.
 */
export function StackSlot({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [index / total, 1], [1, targetScaleFor(index, total)]);

  return (
    <div className="lg:sticky lg:top-[14vh] lg:h-[74vh]">
      <motion.div
        style={
          reduce
            ? undefined
            : { scale, top: `${index * 18}px`, transformOrigin: 'top center', position: 'relative' }
        }
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Wrapper that gives the deck the scroll length it needs to stack. */
export function Deck({
  children,
  className,
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <div ref={ref} className={cn('flex flex-col gap-8 lg:gap-0', className)}>
      {children(scrollYProgress)}
    </div>
  );
}
