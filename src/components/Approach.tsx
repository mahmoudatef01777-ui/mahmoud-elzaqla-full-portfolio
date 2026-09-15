import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '@/i18n/LanguageProvider';
import { approach } from '@/content';
import { FadeIn } from './ui/motion';
import { cn } from '@/lib/cn';

/**
 * Section 4 — how Mahmoud works, as twelve steps.
 *
 * Desktop pins a stage on one side. Which step it shows is chosen by the
 * reader — hover, focus or click a row — and NOT by scroll position. Scrolling
 * used to drive it, which meant the panel flipped through all twelve on the
 * way past and nothing could be read; the reader now stops on a step
 * deliberately. Do not reattach this to scroll.
 *
 * Below `lg` there is no stage at all — every step shows its own line, because
 * a sticky panel on a phone just eats the screen, and there is no hover on
 * touch to drive one.
 *
 * It must never be badged as a framework. The intro line says so out loud
 * (docs/master-context.md), so do not replace it with a name.
 */
export default function Approach() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const total = approach.steps.length;
  const step = approach.steps[active];

  // The rail marks how far down the list the chosen step sits, so it follows
  // the selection rather than the scrollbar. Nothing in this section reacts to
  // scroll any more.
  const railHeight = `${((active + 1) / total) * 100}%`;

  return (
    <section id="approach" className="scroll-mt-20 border-y border-line bg-soft">
      <div className="container-page py-20 md:py-28 lg:py-36">
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(approach.label)}</p>
          <h2 className="display mt-6 text-display-sm text-ink">{t(approach.title)}</h2>
          <p className="lede mt-6">{t(approach.intro)}</p>
        </FadeIn>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* ------------------------------------------------------- stage */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="lg:sticky lg:top-[18vh]">
              <motion.p
                key={`n-${step.id}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-latin text-[5rem] font-bold leading-none text-orange tabular"
              >
                {String(active + 1).padStart(2, '0')}
              </motion.p>

              <motion.div
                key={step.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
              >
                <h3 className="display mt-5 text-display-sm text-ink">{t(step.name)}</h3>
                <p className="lede mt-5 max-w-[42ch]">{t(step.detail)}</p>
              </motion.div>

              {/*
                The chosen step's own illustration, when it has one.
                content/approach.ts carries them; a step with no `art` simply
                renders nothing here.

                It lives INSIDE the stage, so it inherits three things for
                free: it only exists at lg and up (the stage is
                `hidden lg:block`, so a phone neither shows it nor reserves
                space for it), it only shows while its own step is the chosen
                one, and it re-enters whenever the reader comes back to it.

                No frame, no plate, no card: the files are transparent
                cut-outs and the section's own background shows through. The
                small negative margin lets one breathe past the text column
                without reaching the list beside it — the grid gap is 4rem.
              */}
              {step.art && (
                <motion.img
                  key={`art-${step.id}`}
                  src={step.art.src}
                  alt={t(step.art.alt)}
                  width={step.art.width}
                  height={step.art.height}
                  loading="lazy"
                  decoding="async"
                  initial={reduce ? false : { opacity: 0, y: 14, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                  className="mt-8 -mx-5 block h-auto w-[calc(100%+2.5rem)] max-w-none"
                />
              )}
            </div>
          </div>

          {/* -------------------------------------------------------- list */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            {/* Rail: a hairline the accent fills to the step the reader picked. */}
            <span aria-hidden className="absolute inset-y-0 start-0 hidden w-px bg-line lg:block">
              <motion.span
                className="block w-px bg-orange"
                initial={false}
                animate={{ height: reduce ? '100%' : railHeight }}
                transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>

            <ol className="lg:ps-8">
              {approach.steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id} className="border-b border-line last:border-b-0">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'flex w-full cursor-pointer items-start gap-4 py-4 text-start md:gap-6 md:py-5',
                        // Scroll no longer changes anything here, so the row
                        // has to say on its own that it can be pointed at.
                        'transition-colors duration-200 ease-out lg:hover:bg-ink/[0.03]',
                        'lg:-mx-3 lg:rounded-lg lg:px-3',
                      )}
                    >
                      <span
                        className={cn(
                          'font-latin mt-[0.2rem] text-xs font-semibold tabular transition-colors duration-300',
                          isActive ? 'text-orange-ink' : 'text-ink-dim',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'display block text-[1.0625rem] transition-colors duration-300 md:text-xl lg:text-[1.375rem]',
                            // Below lg every row carries its own line, so
                            // dimming the inactive ones would just make the
                            // phone layout harder to read.
                            isActive ? 'text-ink' : 'text-ink lg:text-ink/45',
                          )}
                        >
                          {t(s.name)}
                        </span>
                        {/* The stage carries this on desktop. */}
                        <span className="mt-2 block text-[0.875rem] leading-[1.65] text-ink-dim lg:hidden">
                          {t(s.detail)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
