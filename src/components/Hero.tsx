import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { hero } from '@/content';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero — two separate compositions, swapped at 1024px.
 *
 * The photograph leads and the copy follows it, at both sizes: the full
 * width of the viewport on a desktop, a tall full-bleed portrait on a phone,
 * then the eyebrow, the headline and the supporting line underneath.
 *
 * The photograph is a real composition of Mahmoud in front of real Shopify
 * dashboards (docs/master-context.md). It is never cropped so tightly that
 * the dashboards disappear, and it is NEVER blurred: they are the page's
 * credibility.
 *
 * NO BLEND MODE ANY MORE. The photograph used to be shot on a near-white
 * studio background and `mix-blend-multiply` dropped that rectangle into the
 * white page. The composition Mahmoud supplied on 2026-09-19 is a dark room,
 * and multiplying a dark image into a light page turns the whole frame to
 * mud. The image carries its own background now, so it is composited normally
 * in both themes.
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
      {/* ----------------------------------------------------------- photo */}

      {/*
        THE UPRIGHT FILE STOPS AT 768px, NOT AT 1024.

        It used to run to `lg`, which was survivable while the upright
        composition was 1080x1350. The pair Mahmoud supplied on 2026-09-19 is
        941x1672, and at full width that is 1365px tall at 768 and 1818px at
        1023 — two full screens of photograph before a visitor reaches a word.
        The wide file takes over at `md` now, inside its own fixed-height
        frame, which is the same breakpoint the mini portfolio already used.
      */}

      {/*
        NO ENTRANCE ANIMATION ON THIS ELEMENT, deliberately.

        The photograph is the largest thing on the first screen, which makes
        it the LCP element — and an LCP element that fades up from opacity 0
        does not count as painted until the fade finishes. With the 0.95s rise
        this used to carry, Lighthouse measured 6.1s of "render delay" on a
        throttled phone for an image that had already finished downloading.

        The copy below still rises. This does not: it is the thing the visitor
        came to see, and it should be there.
      */}
      <div
        ref={photoRef}
        /*
          No top margin: the photograph is the first thing in the section now,
          so the only space above it is the section's own `pt`. The gap that
          used to live here has moved onto the copy below, where it does the
          same job — keeping the busy top edge of the phone composition off
          the text.
        */
        className="relative"
      >
        <img
          src={hero.image.mobile}
          alt={t(hero.imageAlt)}
          width={1122}
          height={1402}
          decoding="async"
          className="hero-photo block h-auto w-full md:hidden"
          style={{ objectPosition: `${hero.focalPoint.mobile.x}% ${hero.focalPoint.mobile.y}%` }}
        />

        <div className="relative hidden h-[clamp(20rem,44vw,38rem)] overflow-hidden md:block">
          <motion.img
            src={hero.image.desktop}
            alt={t(hero.imageAlt)}
            width={1536}
            height={1024}
            decoding="async"
            className="hero-photo absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
            style={{
              objectPosition: `${hero.focalPoint.desktop.x}% ${hero.focalPoint.desktop.y}%`,
              y: reduce ? 0 : photoY,
            }}
          />
        </div>
        {/* Dissolve the bottom edge of the frame into the page. */}
        <div aria-hidden className="hero-blend-b pointer-events-none absolute inset-x-0 bottom-0 h-24 lg:h-32" />
      </div>

      {/*
        THE COPY SITS UNDER THE PHOTOGRAPH, and it used to sit above it.
        Mahmoud's choice on 2026-09-15; his other option was to delete this
        block outright so the photo could rise, which would have taken the
        only sentence on the page that says what he does with it.

        So: nothing here was cut. The order changed, and the photograph is
        now what a visitor meets first.
      */}
      <div className="container-page mt-10 md:mt-12 lg:mt-14">
        <motion.div
          {...rise(0.18)}
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
          {...rise(0.24)}
          className="display mt-7 max-w-[var(--display-measure)] text-balance text-display-lg text-ink md:mt-9"
        >
          {headline}
          <span className="text-orange">.</span>
        </motion.h1>

        <motion.p
          {...rise(0.32)}
          className="lede mt-8 max-w-[46ch] md:mt-10 lg:max-w-[52ch]"
        >
          {t(hero.subline)}
        </motion.p>
      </div>
    </section>
  );
}
