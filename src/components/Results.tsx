import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { resultsShowcase, type ResultShot } from '@/content';
import { FadeIn } from './ui/motion';
import Lightbox, { type LightboxImage } from './ui/Lightbox';
import { cn } from '@/lib/cn';

/**
 * "Some Results" — the evidence strip directly under the hero.
 *
 * The screenshots are the argument, so the design gets out of their way: no
 * card chrome, no shadows, no gradients, one hairline frame each.
 *
 * LAYOUT. An asymmetric 12-column grid, not a gallery. Each capture's `span`
 * (content/results-showcase.ts) is chosen so it renders at or just under its
 * natural pixel width, which is why the sizes differ — a uniform grid would
 * either upscale the small captures into mush or strand the wide ones in half
 * a column. Rows align on `items-end`, so bottom edges and the captions
 * beneath them line up however tall each capture happens to be.
 *
 * Because the frame is sized by the image rather than by the cell, a capture
 * narrower than its column sits at the start of it. That is deliberate, and
 * preferable to stretching evidence.
 *
 * MOBILE is one column in the same reading order — strongest result first.
 * These are wide dashboard tables, so a phone cannot render them legibly at
 * full width; the lightbox, which zooms, is where the figures are read.
 */
const SPAN: Record<ResultShot['span'], string> = {
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  12: 'lg:col-span-12',
};

export default function Results() {
  const { t } = useLang();
  const [open, setOpen] = useState<LightboxImage | null>(null);

  return (
    <section id="results" className="scroll-mt-20 border-t border-line">
      <div className="container-page py-20 md:py-28 lg:py-32">
        <FadeIn className="max-w-[52ch]">
          <p className="label eyebrow">{t(resultsShowcase.label)}</p>
          <h2 className="display mt-6 text-display-sm text-ink">{t(resultsShowcase.title)}</h2>
          <p className="lede mt-5">{t(resultsShowcase.lede)}</p>
        </FadeIn>

        <div className="mt-12 grid items-end gap-x-8 gap-y-10 md:mt-16 md:gap-x-10 md:gap-y-12 lg:grid-cols-12">
          {resultsShowcase.shots.map((shot, i) => (
            <FadeIn key={shot.id} delay={0.05 * (i % 2)} className={SPAN[shot.span]}>
              <figure className="flex flex-col">
                <button
                  type="button"
                  onClick={() =>
                    setOpen({
                      src: shot.src,
                      width: shot.width,
                      height: shot.height,
                      alt: t(shot.alt),
                      caption: `${shot.brand} — ${t(shot.caption)}`,
                    })
                  }
                  aria-label={`${t(resultsShowcase.openLabel)} — ${shot.brand}`}
                  // Never past natural size. Upscaling a dashboard blurs the
                  // figures, and a blurred figure looks like a doctored one.
                  style={{ maxWidth: shot.width }}
                  className={cn(
                    'group relative block w-full overflow-hidden rounded-media border border-line bg-soft',
                    'transition-colors duration-300 ease-out hover:border-ink/25',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
                  )}
                >
                  <img
                    src={shot.src}
                    alt={t(shot.alt)}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />

                  {/* The only overlay: a small hint that the shot opens. */}
                  <span
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full',
                      'border border-line bg-cream/90 text-ink-dim backdrop-blur-[1px]',
                      'opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100',
                    )}
                  >
                    <Maximize2 size={14} strokeWidth={1.5} />
                  </span>
                </button>

                {/* The logo stands in for the brand name. `items-center` rather
                    than baseline so the mark sits level with the tool and
                    period beside it. A brand with no logo asset keeps its name
                    as text — never substitute a drawn one. */}
                <figcaption className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  {shot.logo ? (
                    <img
                      src={shot.logo}
                      alt={shot.brand}
                      width={24}
                      height={24}
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 shrink-0 rounded-md border border-line bg-paper object-contain p-px"
                    />
                  ) : (
                    <span className="font-latin text-sm font-semibold text-ink">{shot.brand}</span>
                  )}
                  <span className="text-xs text-ink-dim">{t(shot.caption)}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <p className="mt-10 max-w-[60ch] text-xs leading-[1.7] text-ink-dim md:mt-12">
            {t(resultsShowcase.note)}
          </p>
        </FadeIn>
      </div>

      <Lightbox
        image={open}
        onClose={() => setOpen(null)}
        closeLabel={t({ ar: 'إغلاق', en: 'Close' })}
      />
    </section>
  );
}
