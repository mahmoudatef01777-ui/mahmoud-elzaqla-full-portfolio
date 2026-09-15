import type { CSSProperties, SVGProps } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Clock, Download, Package } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { cv, landingHero } from '@/content';
import { cn } from '@/lib/cn';
import { HandArrow } from '@/components/ui/marks';

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS = { orders: Package, sales: BarChart3, time: Clock } as const;

/**
 * Landing hero — a recreation of the 2026-09-15 design reference.
 *
 * The geometry is measured off that reference rather than invented. On its
 * 1536x1024 frame: the photograph occupies the end half and runs to the
 * bottom of the viewport, the copy column is ~655px wide on the start side,
 * the headline sets at ~76px on a ~117px line, the accent pill is 330x68, the
 * figures sit in one row under the buttons, and the scroll cue is centred on
 * the PAGE, not on the copy column. Everything here is expressed as a share
 * of the viewport so those proportions survive at other widths.
 *
 * Reading direction is never hard-coded: the copy takes the start column and
 * the photo the end one, so Arabic puts the photograph on the left and
 * English mirrors the whole composition.
 *
 * Mobile is its own composition, also measured: a full-bleed photo band at
 * roughly 1.15:1 under the header, then the eyebrow CENTRED (the one element
 * the reference centres), the headline and paragraph start-aligned, two
 * full-width buttons, and the figures in a two-column grid.
 */
export default function LandingHero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const h = landingHero;
  const lines = t(h.headline);

  /** Load reveal, in reading order. Reduced motion keeps only the fade. */
  const anim = (i: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, ease: EASE, delay: 0.12 + i * 0.09 },
        };

  /**
   * The stagger position of everything BELOW the headline, counted from the
   * last line — so a three-line English headline pushes the paragraph one
   * step later instead of arriving on top of it.
   */
  const after = (n: number) => anim(lines.length + 1 + n);

  return (
    <section id="home" className="bleed-clip relative">
      <div className="container-landing">
        <div className="grid items-stretch gap-6 md:gap-8 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)] lg:gap-10">
          {/* ------------------------------------------------- photograph */}
          <motion.div
            className="order-1 lg:order-2 lg:self-stretch"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.4 : 1, ease: EASE }}
          >
            {/*
              The reference photograph has no frame and no hard edge — its own
              light background simply merges into the page. A cut-out does the
              same thing, so there is no card here: only a barely-there warm
              block on a phone, where the reference reads as a distinct band.
            */}
            <div className="hero-photo-bleed relative flex aspect-[23/20] items-end justify-start bg-blush sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:bg-transparent lg:ps-[10%]">
              <img
                src={h.photo.src}
                alt={t(h.photo.alt)}
                width={h.photo.width}
                height={h.photo.height}
                loading="eager"
                decoding="async"
                style={{ '--photo-fill': h.photo.fill } as CSSProperties}
                className="relative z-10 max-h-full w-auto max-w-[80%] object-contain object-bottom sm:max-w-[45%] lg:max-h-[var(--photo-fill)] lg:max-w-[68%]"
              />

              {/*
                The wall notes from the reference, at the same places: the
                hand-written stack about a tenth of the way in from the outer
                edge and a tenth down, the pinned note just under halfway. Both
                are decoration and carry no claim, so both are hidden from
                assistive tech and neither is clickable.
              */}
              <div
                aria-hidden
                className="pointer-events-none absolute end-[7%] top-[9%] z-20 flex flex-col items-start lg:top-[11%] lg:end-[9%]"
              >
                <p className="hand text-[0.95rem] leading-[1.2] text-ink-dim/60 md:text-[1.1rem] lg:text-[1.2rem]">
                  {t(h.notes.hand).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                {/* The arrow runs from the note toward the portrait, which is
                    on the opposite side from the About hero this mark was
                    drawn for — so it is flipped once more than HandArrow
                    flips itself. */}
                <span className="mt-2 inline-block -scale-x-100">
                  <HandArrow className="h-7 w-6 text-ink-dim/40 md:h-9 md:w-8" />
                </span>
              </div>

              <div
                aria-hidden
                className="hero-note pointer-events-none absolute end-[5%] top-[42%] z-20 hidden px-3 py-2.5 shadow-[0_14px_36px_-26px_rgb(var(--c-ink)/0.55)] sm:block lg:end-[5.5%] lg:top-[47%]"
              >
                <p className="hand text-[0.95rem] leading-[1.35] text-ink lg:text-[1.25rem]">
                  {t(h.notes.paper).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------- the copy */}
          <div className="order-2 flex flex-col justify-center text-start lg:order-1 lg:pb-[6.25rem]">
            {/* The one element the reference centres on a phone. From lg it
                lines up with everything else on the start edge. */}
            <motion.p
              {...anim(0)}
              className="font-latin text-center text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink-dim md:text-[0.8125rem] md:tracking-[0.22em] lg:text-start lg:text-[0.875rem]"
            >
              {t(h.eyebrow)}
            </motion.p>

            {/* The break points are given per language, so `text-balance` is
                only a guard for a viewport narrow enough that one of those
                given lines still has to wrap. */}
            <h1 className="display-landing mt-4 text-balance text-ink md:mt-5">
              {lines.map((line, i) => (
                <motion.span key={line} {...anim(1 + i)} className="block">
                  {line}
                  {i === lines.length - 1 && <span className="text-orange">.</span>}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...after(0)}
              className="mt-5 text-[1.0625rem] leading-[1.9] text-ink-dim md:mt-6 md:text-[1.1875rem] md:leading-[2.1] lg:max-w-[35.5vw] lg:text-[clamp(1.0625rem,1.37vw,1.375rem)]"
            >
              {t(h.subline)}
            </motion.p>

            <motion.div
              {...after(1)}
              className="mt-7 flex flex-col gap-3 md:mt-9 md:flex-row md:gap-4 lg:flex-col lg:gap-3 xl:flex-row xl:gap-5"
            >
              <a
                href={h.primary.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-orange px-8 py-4 text-[0.9375rem] font-medium text-on-orange transition-transform duration-200 ease-out hover:scale-[1.02] lg:px-10 lg:py-[1.3rem] lg:text-[1.0625rem] xl:min-w-[21.5vw]"
              >
                {t(h.primary.label)}
                <WhatsAppMark className="h-[1.15rem] w-[1.15rem]" />
              </a>

              <CvButton />
            </motion.div>

            {/* ----------------------------------------- credibility strip */}
            <motion.ul
              {...after(2)}
              className="mt-9 grid grid-cols-2 md:mt-11 md:grid-cols-3 lg:mt-[5rem]"
            >
              {h.stats.map((stat, i) => {
                const Icon = ICONS[stat.icon];
                const unit = 'unit' in stat ? stat.unit : undefined;
                return (
                  <li
                    key={stat.icon}
                    className={cn(
                      'flex items-start gap-3 py-3 md:items-center md:py-0',
                      // A two-column grid on a phone, one row from md. The
                      // rules are logical, so they land on the reading-start
                      // edge of every cell but the first in its row.
                      i % 2 === 1 && 'border-s border-line ps-4',
                      // Alone on the second row, so it spans both columns and
                      // its rule runs edge to edge like the reference's.
                      i === 2 && 'col-span-2 border-t border-line md:col-span-1 md:border-t-0',
                      i > 0 && 'md:ms-4 md:border-s md:border-t-0 md:ps-4 lg:ms-5 lg:ps-5',
                    )}
                  >
                    <span className="text-start">
                      {/* The figure alone is isolated LTR so bidi cannot
                          reorder it; a unit beside it stays in the
                          paragraph's direction, so Arabic reads the number
                          first and the word after it. */}
                      <span className="block leading-[1.15]">
                        <span className="num font-latin text-[1.25rem] font-bold tracking-[-0.02em] text-ink lg:text-[clamp(1.25rem,1.75vw,1.625rem)]">
                          {stat.value}
                        </span>
                        {unit && (
                          <span className="ms-1 text-[0.875rem] font-semibold text-ink lg:text-[0.9375rem]">
                            {t(unit)}
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 block text-[0.6875rem] leading-snug text-ink-dim lg:text-[clamp(0.6875rem,0.8vw,0.75rem)]">
                        {t(stat.label)}
                      </span>
                    </span>
                    <Icon
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden
                      className="order-first mt-0.5 shrink-0 text-ink-dim/55 md:order-none md:mt-0"
                    />
                  </li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Centred on the PAGE, not on the copy column — which is where the
          reference puts it, just past the inner edge of the photograph. */}
      <div className="z-20 mt-10 flex justify-center pb-12 lg:absolute lg:bottom-[4.5%] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 lg:pb-0">
        <motion.div {...after(3)}>
          <ScrollCue />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The CV button.
 *
 * There is no CV PDF yet (`cv.enabled` in site.ts) and inventing a URL for
 * one would ship a link to a 404, so until the file exists the button keeps
 * its place in the composition but is genuinely disabled and says why on
 * hover. Drop the PDF in site/public/ and flip `cv.enabled` to true — nothing
 * in this file changes.
 */
function CvButton() {
  const { t } = useLang();
  const label = t(landingHero.secondary.label);

  const shape =
    'hero-pill inline-flex items-center justify-center gap-2.5 rounded-full border border-line px-8 py-4 text-[0.9375rem] font-medium text-ink lg:px-10 lg:py-[1.3rem] lg:text-[1.0625rem] xl:min-w-[19.2vw]';

  const inner = (
    <>
      {label}
      <Download size={18} strokeWidth={1.7} aria-hidden />
    </>
  );

  if (!cv.enabled) {
    return (
      <button
        type="button"
        disabled
        title={t(landingHero.secondary.pending)}
        className={cn(shape, 'cursor-not-allowed text-ink-dim')}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={cv.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(shape, 'transition-colors duration-200 hover:border-ink')}
    >
      {inner}
    </a>
  );
}

/**
 * Scroll cue. A slow drift inside the outline, nothing that bounces — and
 * under `prefers-reduced-motion` the dot simply sits still.
 */
function ScrollCue() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <div
      // The cue sits at the page centre, which on a wide screen is right at the
      // inner edge of the photograph. A scrim in the page colour keeps it
      // readable if a portrait reaches that far — never a blur, which the
      // project forbids over photographs.
      className="flex flex-col items-center gap-2.5 [text-shadow:0_1px_8px_rgb(var(--c-cream)),0_0_16px_rgb(var(--c-cream))]"
    >
      <span
        aria-hidden
        className="flex h-9 w-[1.3rem] items-start justify-center rounded-full border border-ink/25 p-[4px]"
      >
        <motion.span
          className="block h-2 w-[3px] rounded-full bg-ink/50"
          animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
        />
      </span>
      <span className="whitespace-nowrap text-[0.75rem] text-ink-dim">{t(landingHero.scrollCue)}</span>
    </div>
  );
}

/**
 * The WhatsApp mark. lucide carries no brand glyphs and an outline lookalike
 * reads as a generic speech bubble at this size, so it is drawn here — in
 * `currentColor`, which on the accent pill is the on-accent ink.
 */
function WhatsAppMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.98 11.98 0 0 0 5.723 1.452h.005c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
    </svg>
  );
}
