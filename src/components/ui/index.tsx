import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Shared primitives. Anything that appears in more than one section lives
 * here, so a change to a pill or a capsule lands everywhere at once.
 */

/** Section eyebrow — the small label above a section title. */
export function SectionLabel({ children, tone = 'ink' }: { children: ReactNode; tone?: 'ink' | 'onOrange' }) {
  return (
    <p
      className={cn(
        'label',
        tone === 'onOrange' ? 'text-on-orange/70' : 'text-ink-dim',
      )}
    >
      {children}
    </p>
  );
}

/** Section title, at the one display size every section shares. */
export function SectionTitle({
  children,
  tone = 'ink',
  className,
}: {
  children: ReactNode;
  tone?: 'ink' | 'onOrange';
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'display text-display-sm',
        tone === 'onOrange' ? 'text-on-orange' : 'text-ink',
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** The rounded media shape used for photos across the site. */
export function Capsule({
  src,
  alt,
  width,
  height,
  shape = 'capsule',
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  shape?: 'capsule' | 'circle' | 'card';
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden bg-ink/5',
        shape === 'circle' && 'rounded-full',
        shape === 'capsule' && 'rounded-[999px]',
        shape === 'card' && 'rounded-card',
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/** Pill button. `tone` picks the surface it is sitting on. */
export function Pill({
  href,
  children,
  tone = 'orange',
  className,
  external = true,
}: {
  href: string;
  children: ReactNode;
  tone?: 'orange' | 'ink' | 'onOrange';
  className?: string;
  external?: boolean;
}) {
  const tones = {
    orange: 'bg-orange text-on-orange',
    ink: 'bg-black text-on-dark',
    onOrange: 'bg-cream text-on-orange',
  };
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-transform duration-200 ease-out hover:scale-[1.02]',
        tones[tone],
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Small rounded label — availability, status, tags. */
export function Chip({
  children,
  tone = 'outline',
  className,
}: {
  children: ReactNode;
  tone?: 'outline' | 'orange' | 'cream' | 'onOrange';
  className?: string;
}) {
  const tones = {
    outline: 'border border-ink/15 text-ink',
    orange: 'bg-orange text-on-orange',
    cream: 'bg-cream text-ink',
    onOrange: 'border border-cream/30 text-cream',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.6875rem] font-medium md:px-3.5 md:text-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
