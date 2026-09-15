import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * A button whose hover fills it like liquid rising from the bottom.
 *
 * The fill is one block translated up from below the button with a wave
 * riding on its top edge, so the surface reads as water rather than a
 * growing rectangle. Only `transform` and `color` animate — the box, radius,
 * padding, type and arrow are identical in both states, and nothing here can
 * move the page. All of it lives in `.btn-liquid*` in styles/index.css.
 *
 * On touch the fill runs on tap and the link then navigates, so a stuck
 * hover state cannot be left behind; `:focus-visible` gets the same fill so
 * keyboard users see what pointer users see.
 *
 * The fill colour and the hovered label colour are the CSS variables
 * `--liquid-fill` and `--liquid-label`. They default to ink-on-page; set them
 * per button when the fill should be something else, e.g. the WhatsApp CTA in
 * the footer fills with WhatsApp green.
 */
export default function LiquidButton({
  href,
  onClick,
  external = false,
  className,
  labelClassName,
  children,
}: {
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
  className?: string;
  /**
   * Layout for the label span. The children sit inside it, not directly in
   * the <a>, so a button that spreads its text and arrow apart has to put
   * `w-full justify-between` here rather than on the anchor.
   */
  labelClassName?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={cn('btn-liquid', className)}
    >
      <span aria-hidden className="btn-liquid-fill">
        <svg
          className="btn-liquid-wave"
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path d="M0 10 C 12.5 2, 37.5 2, 50 10 C 62.5 18, 87.5 18, 100 10 C 112.5 2, 137.5 2, 150 10 C 162.5 18, 187.5 18, 200 10 L200 20 L0 20 Z" />
        </svg>
      </span>

      <span className={cn('btn-liquid-label', labelClassName)}>{children}</span>
    </a>
  );
}
