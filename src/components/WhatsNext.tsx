import { useLang } from '@/i18n/LanguageProvider';
import { whatsNext } from '@/content';
import { FadeIn } from './ui/motion';
import { cn } from '@/lib/cn';

/**
 * "What's next for me?" — the last section before the dark footer.
 *
 * It sits immediately after WhyMe, so its job is to look nothing like it. Two
 * different shapes do that work:
 *
 *  - The four areas are a 2x2 MATRIX with a hairline over each cell, not the
 *    full-width numbered rows used by WhyMe and Experience. The index sits
 *    above the name as a small label rather than in its own accent column.
 *  - "What I'm building now" is a raised panel on --c-soft with its own
 *    frame, because it is a different kind of claim: the areas are direction,
 *    the panel is what already exists on his machine.
 *
 * The photography item is an experiment, not a direction, so it carries a
 * small tag and a quieter title. Do not promote it to look like the other
 * three — see content/whats-next.ts.
 *
 * Everything is tokens, so dark mode follows without a second definition.
 */
export default function WhatsNext() {
  const { t } = useLang();

  return (
    <section id="next" className="scroll-mt-20 border-t border-line">
      <div className="container-page py-20 md:py-28">
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(whatsNext.label)}</p>
          <h2 className="display mt-6 max-w-[22ch] text-display-sm text-ink">
            {t(whatsNext.title)}
          </h2>
          <p className="lede mt-6">{t(whatsNext.intro)}</p>
        </FadeIn>

        {/* The four directions. `gap-y-0` so the hairlines do the spacing. */}
        <div className="mt-12 grid gap-x-10 gap-y-0 md:mt-16 md:grid-cols-2 lg:gap-x-16">
          {whatsNext.areas.map((area, i) => (
            <FadeIn
              key={area.id}
              delay={0.04 * (i % 2)}
              className="border-t border-line py-7 md:py-8"
            >
              <p className="label text-ink-dim">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="display mt-3 text-display-xs text-ink">{area.name}</h3>
              <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-ink-dim md:text-base">
                {t(area.detail)}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* What already exists. A panel, because this is evidence, not intent. */}
        <FadeIn delay={0.06} className="mt-14 md:mt-20">
          <div className="rounded-card border border-line bg-soft p-6 md:p-10">
            <p className="label eyebrow">{t(whatsNext.building.label)}</p>

            <div className="mt-7 grid gap-x-10 gap-y-7 md:mt-9 md:grid-cols-2 lg:gap-x-14">
              {whatsNext.building.items.map((item, i) => (
                <FadeIn key={item.id} delay={0.03 * (i % 2)}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <h4
                      className={cn(
                        'display text-[1.0625rem] md:text-xl',
                        // An experiment is not a direction: same family,
                        // quieter voice.
                        item.experiment ? 'text-ink-dim' : 'text-ink',
                      )}
                    >
                      {item.name}
                    </h4>
                    {item.experiment && (
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] text-ink-dim">
                        {t(whatsNext.building.experimentTag)}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-[1.65] text-ink-dim">
                    {t(item.detail)}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="display mt-12 max-w-[34ch] text-[calc(clamp(1.125rem,2.4vw,1.625rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink md:mt-16">
            {t(whatsNext.closing)}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
