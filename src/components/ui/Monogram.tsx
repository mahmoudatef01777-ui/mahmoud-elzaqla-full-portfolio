import { cn } from '@/lib/cn';

/**
 * The MZ mark.
 *
 * Drawn as ONE continuous stroke: the M's right stem runs down to the
 * baseline and keeps going as the Z's lower bar, so the two letters share a
 * line instead of sitting side by side. That shared baseline is what makes it
 * read as a monogram rather than as two typed letters.
 *
 * Geometry follows the display face — flat joins, square ends, no curves and
 * no ornament — so it belongs to the same typographic language as the rest of
 * the page. It is vector, so it stays sharp at any size, and it inherits
 * `currentColor`, which means one definition serves both themes.
 *
 * The stroke is deliberately heavy relative to the 24-unit height: at 20px in
 * a navbar a hairline monogram disappears.
 */
export default function Monogram({
  className,
  strokeWidth = 2.6,
}: {
  className?: string;
  /**
   * Weight of the single stroke, in viewBox units of the 24-unit height.
   * The default is the mark as the site header uses it; the landing page
   * sets it heavier, because its reference draws the lockup solid.
   */
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 44 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      className={cn('block h-5 w-auto md:h-[1.375rem]', className)}
    >
      {/*
        Subpath 1 — the M, whose right stem drops to the baseline and then
        runs on to x=40 as the Z's lower bar: the shared line.
        Subpath 2 — the Z's upper bar, then its diagonal down to the left,
        landing exactly on that shared baseline at (26,20).
      */}
      <path d="M4 20 V4 L12 14 L20 4 V20 H40 M26 4 H40 L26 20" />
    </svg>
  );
}
