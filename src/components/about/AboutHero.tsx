import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { aboutHero } from '@/content';
import { HandArrow, Sparks } from '@/components/ui/marks';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * About hero — two compositions, swapped at 1024px.
 *
 * Desktop is a spread: the copy holds the left ~46% of the measure while the
 * photograph runs from just under the header down to the section's bottom
 * edge and bleeds past the gutter to the viewport edge. The hand-written
 * notes, the accent strokes and the name plate all sit on the photograph.
 *
 * Mobile is a different order, not the same layout narrowed: label, headline,
 * one paragraph, then the portrait, then the name plate under it, then a
 * full-width call. The second paragraph and the right-hand note are dropped
 * because the reference drops them.
 */
export default function AboutHero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const headline = t(aboutHero.headline);
  const paragraphs = t(aboutHero.paragraphs);

  return (
    <section className="bleed-clip relative border-b border-line/70">
      <div className="container-page lg:grid lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-x-10 xl:gap-x-14">
        {/* ------------------------------------------------------- copy */}
        <div className="pt-7 lg:col-start-1 lg:row-start-1 lg:self-start lg:pb-16 lg:pt-9">
          <motion.p {...rise(0.04)} className="label eyebrow">
            {t(aboutHero.label)}
          </motion.p>

          <motion.h1 {...rise(0.1)} className="display-hero mt-5 text-ink lg:mt-6">
            {headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.div {...rise(0.18)} className="mt-6 space-y-4 lg:mt-8 lg:space-y-5">
            {paragraphs.map((copy, i) => (
              <p
                key={copy}
                className={cn(
                  'max-w-[46ch] text-[1.0625rem] leading-[1.62] text-ink-dim lg:max-w-none lg:text-[1.1875rem] lg:leading-[1.55]',
                  // The reference shows only the opening paragraph on mobile.
                  i > 0 && 'hidden lg:block',
                )}
              >
                {copy}
              </p>
            ))}
          </motion.div>

          {/* Desktop call. Mobile gets its own full-width one under the plate. */}
          <motion.div {...rise(0.26)} className="mt-9 hidden items-center gap-8 lg:flex">
            <CallPill />
            <a
              href={aboutHero.more.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-opacity duration-200 hover:opacity-60"
            >
              {t(aboutHero.more.label)}
              <ArrowDown size={15} strokeWidth={2.2} aria-hidden />
            </a>
          </motion.div>
        </div>

        {/* ------------------------------------------------------ photo */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.4 : 0.9, ease: EASE, delay: 0.2 }}
          className={cn(
            'bleed-end relative mt-7',
            // Stretched, not intrinsic: the photograph runs to the bottom of
            // the section the way the reference sets it, whatever the copy
            // beside it happens to measure.
            'lg:col-start-2 lg:row-start-1 lg:mt-1 lg:self-stretch',
          )}
        >
          <figure className="relative m-0 aspect-[9/10] overflow-hidden bg-soft sm:aspect-[4/3] lg:aspect-auto lg:h-full">
            <img
              src={aboutHero.image.mobile}
              alt={t(aboutHero.imageAlt)}
              width={1122}
              height={1402}
              decoding="async"
              className="h-full w-full object-cover sm:hidden"
              style={{
                objectPosition: `${aboutHero.focal.mobile.x}% ${aboutHero.focal.mobile.y}%`,
              }}
            />
            <img
              src={aboutHero.image.desktop}
              alt={t(aboutHero.imageAlt)}
              width={1672}
              height={941}
              decoding="async"
              className="hidden h-full w-full object-cover sm:block"
              style={{
                objectPosition: `${aboutHero.focal.desktop.x}% ${aboutHero.focal.desktop.y}%`,
              }}
            />

            {/*
              The reference sets its portrait on a near-white studio ground,
              which is what makes the hand-written notes and the name plate
              readable on top of it. The placeholder photograph is busier
              than that, so these two washes restore the same ground. When
              the real cut-out lands they can go.
            */}
            <div aria-hidden className="photo-wash-s pointer-events-none absolute inset-0" />
            <div aria-hidden className="photo-wash-b pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />

            {/* ---------------------------------------------- marginalia */}
            <Note lines={t(aboutHero.notes.left)} className="absolute start-[4%] top-[7%]" />
            <HandArrow className="absolute start-[11%] top-[38%] h-[3.5rem] w-[3.2rem] text-ink/55 lg:top-[37%] lg:h-[5.5rem] lg:w-[5rem]" />

            {/* The second note is a wide-desktop moment. Below 1280 the
                photograph is too narrow to carry it without landing on the
                face, so it drops rather than competing with the portrait. */}
            <Note
              lines={t(aboutHero.notes.right)}
              className="absolute end-[4%] top-[18%] hidden text-end xl:block"
            />

            <Sparks className="absolute end-[9%] top-[9%] h-6 w-6 text-orange lg:end-[27%] lg:top-[11%] lg:h-7 lg:w-7" />
            <Sparks
              count={2}
              className="absolute end-[8%] top-[48%] hidden h-7 w-7 text-orange xl:block"
            />

            {/* Desktop: the name plate sits on the photograph. */}
            <Credential className="absolute bottom-[10%] end-[4%] hidden max-w-[14rem] lg:block" />
          </figure>
        </motion.div>

        {/* -------------------------------- mobile plate + full-width call */}
        <motion.div {...rise(0.3)} className="pb-12 lg:hidden">
          <Credential stacked className="mt-6" />
          <CallPill className="mt-7 w-full py-4 text-base" />
        </motion.div>
      </div>
    </section>
  );
}

/** A stack of hand-written words, one per line, as the reference sets them. */
function Note({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <p className={cn('hand text-[1.5rem] text-ink/75 lg:text-[1.75rem] xl:text-[2rem]', className)}>
      {lines.map((word) => (
        <span key={word} className="block">
          {word}
        </span>
      ))}
    </p>
  );
}

/**
 * Name and title. On the photograph it hangs under a short accent rule; under
 * the photograph on mobile it hangs off an accent bar on the start edge.
 */
function Credential({ stacked = false, className }: { stacked?: boolean; className?: string }) {
  const { t } = useLang();
  return (
    <div className={cn(stacked && 'border-s-[3px] border-orange ps-3.5', className)}>
      {!stacked && <span aria-hidden className="mb-2.5 block h-[3px] w-7 bg-orange" />}
      <p className="text-[0.9375rem] font-semibold leading-tight text-ink lg:text-base">
        {t(aboutHero.credential.name)}
      </p>
      <p className="label mt-1.5 leading-[1.5]">{t(aboutHero.credential.role)}</p>
    </div>
  );
}

/** The black call pill, hero size. */
function CallPill({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <a
      href={aboutHero.cta.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-black px-7 py-4 text-[0.9375rem] font-medium text-on-dark',
        'transition-transform duration-200 ease-out hover:scale-[1.03]',
        className,
      )}
    >
      {t(aboutHero.cta.label)}
      <ArrowRight size={16} strokeWidth={2.2} aria-hidden className="rtl:-scale-x-100" />
    </a>
  );
}
