import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { chain } from '@/content';
import { SectionLabel } from './ui';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The business-to-profitability chain.
 *
 * Wraps rather than scrolls: an agency reader should be able to take the whole
 * line in at a glance, and a horizontal scroller hides half of it. The arrow
 * flips with the reading direction.
 */
export default function Chain() {
  const { t, lang, isRTL } = useLang();
  const reduce = useReducedMotion();
  const Arrow = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section id="chain" className="container-page pb-14 md:pb-24">
      <div className="rounded-media border border-ink/10 bg-paper/50 p-6 md:p-10">
        <SectionLabel>{t(chain.label)}</SectionLabel>

        <p className="mt-4 max-w-[52ch] text-lg font-semibold leading-snug text-ink md:text-2xl">
          {t(chain.statement)}
        </p>

        <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 md:mt-10 md:gap-x-3">
          {chain.steps.map((step, i) => {
            const common = chain.commonScope.includes(step.en);
            return (
              <motion.li
                key={step.en}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <span
                  className={cn(
                    'whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium md:px-4 md:py-2 md:text-sm',
                    common
                      ? 'bg-orange text-on-orange'
                      : 'border border-ink/15 text-ink',
                  )}
                >
                  {step[lang]}
                </span>
                {i < chain.steps.length - 1 && (
                  <Arrow size={14} aria-hidden className="shrink-0 text-ink-dim/50" />
                )}
              </motion.li>
            );
          })}
        </ol>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-dim md:text-sm">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-orange" />
          {t(chain.footnote)}
        </p>
      </div>
    </section>
  );
}
