import { cn } from '@/lib/cn';

/**
 * Hand-drawn marginalia from the design reference. Both are inline SVG so
 * they inherit `currentColor` and stay crisp at any size; neither carries
 * meaning, so both are hidden from assistive tech.
 */

/** The curved arrow that runs from a hand-written note toward the portrait. */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 62 72"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('rtl:-scale-x-100', className)}
    >
      <path d="M3 3c1.5 19.5 8 37 20.5 49.5 5.5 5.5 12 10 19.5 13.5" />
      <path d="M43 66 27.5 64.5" />
      <path d="M43 66 38 51" />
    </svg>
  );
}

/**
 * The little fan of accent strokes that sits beside the portrait. `count`
 * picks how many of the three show, so a tight corner can carry two.
 */
export function Sparks({ className, count = 3 }: { className?: string; count?: 2 | 3 }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 26 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      className={cn('rtl:-scale-x-100', className)}
    >
      <path d="M2.5 10.5 10 3.5" />
      <path d="M4.5 19 13.5 11" />
      {count === 3 && <path d="M9 25.5 17 19" />}
    </svg>
  );
}
