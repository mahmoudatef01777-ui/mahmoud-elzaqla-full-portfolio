import type { CSSProperties } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import { tools } from '@/content';
import { FadeIn } from './ui/motion';

/**
 * The tools band, directly under the hero.
 *
 * Deliberately light: a small label, one row of outlined marks, a name under
 * each. It sits immediately below the portrait and must not compete with it,
 * so there is no heading scale, no card, and no fill — only a hairline circle.
 *
 * Each mark is the platform's official glyph and takes the platform's own
 * colour on hover (see content/tools.ts). Resting state is monochrome so the
 * band reads as one quiet row rather than five competing logos.
 *
 * The colours are solid, not gradients, even for the two brands whose marks
 * are multi-coloured. `fill` cannot animate between a colour and a gradient,
 * so a gradient would snap on hover instead of easing — and the slow fill is
 * the point of the interaction.
 *
 * This replaced a WhatsApp button that used to sit here. Do not put a call to
 * action back in this slot — the hero's own call, the nav and the dark footer
 * already carry it.
 */
export default function Tools() {
  const { t } = useLang();

  return (
    <section id="tools" className="border-t border-line">
      <div className="container-page py-10 md:py-14">
        <FadeIn>
          <p className="label eyebrow justify-center text-center">{t(tools.title)}</p>
        </FadeIn>

        <ul className="mt-7 flex flex-wrap items-start justify-center gap-x-8 gap-y-7 md:mt-9 md:gap-x-12">
          {tools.items.map((tool, i) => (
            <FadeIn
              as="li"
              key={tool.id}
              delay={0.05 * i}
              className="group flex w-[4.5rem] flex-col items-center gap-2.5 md:w-20"
            >
              <span
                style={
                  {
                    '--brand': tool.brand,
                    // Colour eases slowly so the mark reads as filling with
                    // its brand colour; the lift stays quick, because a
                    // 600ms scale feels sluggish rather than elegant. Same
                    // curve in both directions, so leaving drains just as
                    // smoothly as entering fills.
                    transition:
                      'color 600ms cubic-bezier(0.22, 1, 0.36, 1),' +
                      'border-color 600ms cubic-bezier(0.22, 1, 0.36, 1),' +
                      'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                  } as CSSProperties
                }
                className={
                  'grid h-12 w-12 place-items-center rounded-full border border-line text-ink-dim md:h-14 md:w-14 ' +
                  'group-hover:-translate-y-0.5 group-hover:scale-[1.04] ' +
                  'group-hover:border-[var(--brand)] group-hover:text-[var(--brand)]'
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="h-[1.1rem] w-[1.1rem] md:h-5 md:w-5"
                >
                  <path d={tool.path} />
                </svg>
              </span>

              <span className="text-center text-[0.6875rem] leading-tight text-ink-dim transition-colors duration-[600ms] ease-out group-hover:text-ink md:text-xs">
                {tool.name}
              </span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
