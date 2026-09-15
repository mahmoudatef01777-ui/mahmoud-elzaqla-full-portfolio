import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { behind } from '@/content';
import { Capsule } from './ui';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Section 4 — the order's journey in four photos.
 *
 * Below 1024 the row scrolls horizontally: four capsules cannot share a
 * narrow line without becoming thumbnails, and a 2x2 grid would break the
 * left-to-right reading of a sequence. At 1024 and up they share one row,
 * sized as fractions of the container so the page never scrolls sideways.
 *
 * Alternating capsule and circle is what stops it reading as a plain gallery.
 */
/** A very wide source in a tall capsule would crop to a sliver, so the shape
 *  follows the image rather than a fixed pattern. */
function shapeFor(width: number, height: number, index: number) {
  const ratio = width / height;
  if (ratio > 1.4) return { shape: 'capsule' as const, aspect: 'aspect-[16/9]' };
  return index % 2 === 0
    ? { shape: 'capsule' as const, aspect: 'aspect-[3/4]' }
    : { shape: 'circle' as const, aspect: 'aspect-square' };
}

export default function Behind() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section id="behind" className="py-14 md:py-24">
      <div className="container-page">
        <p className="label mb-6 text-ink-dim md:mb-9">{t(behind.caption)}</p>
      </div>

      <div className="overflow-x-auto lg:overflow-visible">
        <ul
          className="container-page flex snap-x snap-mandatory items-start gap-4 pb-2 lg:grid lg:snap-none lg:grid-cols-[1.15fr_1fr_1.3fr_1fr] lg:gap-6 lg:pb-0"
        >
          {behind.steps.map((step, i) => {
            const { shape, aspect } = shapeFor(step.width, step.height, i);
            return (
            <motion.li
              key={step.src}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="flex w-[62vw] max-w-[16rem] shrink-0 snap-start flex-col sm:w-[38vw] lg:w-auto lg:max-w-none"
            >
              {/* Fixed media box so every caption lands on the same line. */}
              <div className="flex h-[15rem] items-center md:h-[19rem]">
                <Capsule
                  src={step.src}
                  alt={t(step.alt)}
                  width={step.width}
                  height={step.height}
                  shape={shape}
                  className={`w-full ${aspect} max-h-full`}
                />
              </div>
              <figcaption className="mt-3 text-xs text-ink-dim md:text-sm">
                {t(step.caption)}
              </figcaption>
            </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
