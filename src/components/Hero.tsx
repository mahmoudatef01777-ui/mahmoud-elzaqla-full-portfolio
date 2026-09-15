import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { hero } from '@/content';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — two separate compositions, swapped at 1024px.
 *
 * Desktop reads as a spread: eyebrow, one very large headline, a line of
 * supporting copy with the call beside it, then the photograph running the
 * full width of the viewport underneath. Mobile is not that layout scaled
 * down — the headline shortens, the portrait becomes a tall full-bleed
 * moment, and the call becomes a full-width button under it.
 *
 * The photograph is a real composition of Mahmoud in front of real Shopify
 * dashboards (docs/master-context.md). It is never cropped so tightly that
 * the dashboards disappear, and it is NEVER blurred: they are the page's
 * credibility. `mix-blend-multiply` drops its near-white studio background
 * into the cream page so the portrait reads as part of the composition
 * rather than a photo pasted into a card.
 */
export default function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);

  // Desktop only: the photograph drifts against the scroll inside its frame.
  // The image is 12% taller than the frame, so a 4% drift never exposes an
  // edge. Under reduced motion it does not move at all.
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  /** The headline, with its final full stop set in the accent. */
  const headline = t(hero.headline).replace(/\.$/, '');

  return (
    <section className="relative overflow-hidden pb-12 pt-4 md:pt-8 lg:pb-20">
      <div className="container-page">
        <motion.div
          {...rise(0.04)}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 border-b border-line pb-5 md:pb-6"
        >
          {/*
            Centred and set heavier than a normal section label, on Mahmoud's
            instruction. This is the only eyebrow on the site that is not a
            quiet grey marker at the start of its line — it is the first thing
            read on the home page, so it carries the job title at a size that
            can actually be read rather than scanned past.

            The overrides are local on purpose. `.label` is shared by fifteen
            other eyebrows that should stay quiet; utilities beat it because
            it lives in @layer components.
          */}
          <p className="label eyebrow text-[0.8125rem] font-bold text-ink md:text-sm">
            {t(hero.label)}
          </p>
        </motion.div>

        {/* The one thing a visitor must read. Two lines on desktop. */}
        <motion.h1
          {...rise(0.1)}
          className="display mt-7 max-w-[var(--display-measure)] text-balance text-display-lg text-ink md:mt-9"
        >
          {headline}
          <span className="text-orange">.</span>
        </motion.h1>

        <motion.p
          {...rise(0.18)}
          className="lede mt-8 max-w-[46ch] md:mt-10 lg:max-w-[52ch]"
        >
          {t(hero.subline)}
        </motion.p>
      </div>

      {/* ----------------------------------------------------------- photo */}

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.4 : 0.95, ease: EASE, delay: 0.24 }}
        ref={photoRef}
        /*
          MOBILE ONLY: the gap under the description is 4rem, not the 2.5rem
          it was. The phone composition has a dashboard card within a few
          pixels of its top edge, so at the old spacing the busiest part of
          the photograph began right under the last line of copy and the two
          read as one block. `md:` and `lg:` are unchanged — the desktop
          composition puts the photo the full width of the viewport under a
          much wider column of text and never had the problem.
        */
        className="relative mt-16 md:mt-12 lg:mt-14"
      >
        <img
          src={hero.image.mobile}
          alt={t(hero.imageAlt)}
          width={1122}
          height={1402}
          decoding="async"
          className="hero-photo block h-auto w-full mix-blend-multiply lg:hidden"
          style={{ objectPosition: `${hero.focalPoint.mobile.x}% ${hero.focalPoint.mobile.y}%` }}
        />

        <div className="relative hidden h-[clamp(20rem,44vw,38rem)] overflow-hidden lg:block">
          <motion.img
            src={hero.image.desktop}
            alt={t(hero.imageAlt)}
            width={1672}
            height={941}
            decoding="async"
            className="hero-photo absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover mix-blend-multiply"
            style={{
              objectPosition: `${hero.focalPoint.desktop.x}% ${hero.focalPoint.desktop.y}%`,
              y: reduce ? 0 : photoY,
            }}
          />
        </div>
        {/* Dissolve the bottom edge of the frame into the page. */}
        <div aria-hidden className="hero-blend-b pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:h-32" />
      </motion.div>
    </section>
  );
}
