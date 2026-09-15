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
 * Each mark is the platform's official glyph. Resting state is monochrome so
 * the band reads as one quiet row rather than four competing logos; the real
 * colours arrive on hover, over 650ms.
 *
 * HOW THE FILL WORKS. Two copies of the mark sit in the same grid cell. The
 * grey one is always fully opaque; the coloured one lies on top of it and
 * fades 0 -> 1. It is deliberately NOT a cross-fade — fading the grey out as
 * the colour comes in would put both layers near 50% halfway through, and a
 * solid glyph would visibly go pale before it went coloured. Painting over an
 * opaque base instead means the mark only ever gains colour, which is what
 * "filling in" should look like. The same ease runs in both directions, so
 * leaving drains exactly the way entering filled.
 *
 * Marks with more than one colour (TikTok, Google Ads) carry their parts in
 * `layers`; a single-colour mark falls back to its own `brand`. Either way
 * the top layer is built the same, so nothing here special-cases a brand.
 *
 * HOVER IS GATED on `@media (hover: hover)`. Without it a tap on a phone
 * latches :hover and the mark stays coloured until something else is
 * touched — the whole row then reads as though one tool is selected.
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

        <ul
          /*
            The phone gap is tighter than the desktop one so all FOUR marks
            sit on one line. With the old five it did not matter — they broke
            3 + 2, which looks deliberate. Four at the desktop gap break
            3 + 1, and a single mark alone on a second row reads as a mistake.
          */
          className="mt-7 flex flex-wrap items-start justify-center gap-x-3 gap-y-7 min-[420px]:gap-x-6 sm:gap-x-8 md:mt-9 md:gap-x-12"
        >
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
                  'grid h-12 w-12 place-items-center rounded-full border border-line text-ink-dim md:h-14 md:w-14 ' +
                  '[@media(hover:hover)]:group-hover:-translate-y-0.5 ' +
                  '[@media(hover:hover)]:group-hover:scale-[1.04] ' +
                  '[@media(hover:hover)]:group-hover:border-[var(--brand)]'
                }
              >
                {/* The base. Grey, and never fades. */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="col-start-1 row-start-1 h-[1.1rem] w-[1.1rem] md:h-5 md:w-5"
                >
                  <path d={tool.path} />
                </svg>

                {/* The colour, painted over it. */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  style={{
                    transition: 'opacity 650ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className={
                    'col-start-1 row-start-1 h-[1.1rem] w-[1.1rem] opacity-0 md:h-5 md:w-5 ' +
                    '[@media(hover:hover)]:group-hover:opacity-100'
                  }
                >
                  {(tool.layers ?? [{ d: tool.path, fill: tool.brand }]).map((layer, li) => (
                    <path
                      key={li}
                      d={layer.d}
                      // `style`, not the `fill` attribute: a layer may be
                      // `rgb(var(--c-ink))`, and an attribute would not
                      // expand the custom property.
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
