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
 * EACH MARK CARRIES ITS OWN COLOURS AT REST. Until 2026-09-16 the row was
 * monochrome until hovered, on the argument that four grey marks read as one
 * quiet band rather than as competing logos. Mahmoud asked for the real
 * colours, and he is right that on a phone — where there is no hover at all —
 * the old version meant nobody ever saw them.
 *
 * A mark with more than one colour (TikTok) carries its parts in `layers`; a
 * single-colour mark falls back to its own `brand`. Nothing here
 * special-cases a brand.
 *
 * HOVER, WHERE THERE IS ONE, tints the hairline ring to the platform's colour
 * and lifts the circle a little. It is gated on `@media (hover: hover)`:
 * without that a tap on a phone latches :hover and one mark stays lifted
 * until something else is touched, so the row reads as though a tool is
 * selected.
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
                    // The ring eases as slowly as the fill; the lift stays
                    // quick, because a 650ms scale feels sluggish rather than
                    // elegant. Same curve in both directions.
                    transition:
                      'border-color 650ms cubic-bezier(0.22, 1, 0.36, 1),' +
                      'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                  } as CSSProperties
                }
                className={
                  'grid h-12 w-12 place-items-center rounded-full border border-line md:h-14 md:w-14 ' +
                  '[@media(hover:hover)]:group-hover:-translate-y-0.5 ' +
                  '[@media(hover:hover)]:group-hover:scale-[1.04] ' +
                  '[@media(hover:hover)]:group-hover:border-[var(--brand)]'
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-[1.1rem] w-[1.1rem] md:h-5 md:w-5"
                >
                  {(tool.layers ?? [{ d: tool.path, fill: tool.brand }]).map((layer, li) => (
                    <path
                      key={li}
                      d={layer.d}
                      // `style`, not the `fill` attribute: a layer may be
                      // `rgb(var(--c-ink))` — TikTok's top layer is, so it is
                      // near-black on the light page and near-white on the
                      // dark one — and an attribute would not expand the
                      // custom property.
                      style={{ fill: layer.fill }}
                      transform={
                        'dx' in layer || 'dy' in layer
                          ? `translate(${layer.dx ?? 0} ${layer.dy ?? 0})`
                          : undefined
                      }
                    />
                  ))}
                </svg>
              </span>

              <span className="text-center text-[0.6875rem] leading-tight text-ink-dim transition-colors duration-[650ms] ease-out [@media(hover:hover)]:group-hover:text-ink md:text-xs">
                {tool.name}
              </span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
