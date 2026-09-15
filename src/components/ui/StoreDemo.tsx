import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import type { Localized } from '@/content';

/**
 * A live site shown as a demo rather than described.
 *
 * These are real captures of the running store (scripts/capture-store.mjs),
 * dropped into a browser frame with the site's own address in the bar. They
 * are deliberately NOT an <iframe>: the store answers with
 * `X-Frame-Options: DENY` and `frame-ancestors 'none'`, so any browser
 * refuses to embed it — an iframe here would render an empty box.
 *
 * The whole frame is the outbound link, so tapping the demo opens the store.
 */
export interface Demo {
  href: string;
  domain: string;
  label: Localized;
  caption: Localized;
  open: Localized;
  desktop: { src: string; width: number; height: number; alt: Localized };
  phone: { src: string; width: number; height: number; alt: Localized };
}

export default function StoreDemo({ demo }: { demo: Demo }) {
  const { t, isRTL } = useLang();

  return (
    <figure className="mt-7 max-w-[46rem]">
      <a
        href={demo.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block rounded-media border border-line bg-soft p-3 transition-colors duration-300 ease-out hover:border-ink/30 md:p-4"
      >
        <div className="relative">
          {/* Browser frame */}
          <div className="overflow-hidden rounded-lg border border-line bg-paper">
            <div className="flex items-center gap-3 border-b border-line bg-soft px-3 py-2">
              <span aria-hidden className="flex shrink-0 gap-1.5">
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
              </span>
              <span
                dir="ltr"
                className="font-latin min-w-0 flex-1 truncate rounded-full bg-cream px-3 py-1 text-center text-[0.6875rem] text-ink-dim"
              >
                {demo.domain}
              </span>
            </div>

            <img
              src={demo.desktop.src}
              alt={t(demo.desktop.alt)}
              width={demo.desktop.width}
              height={demo.desktop.height}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>

          {/* Phone, overlapping the frame. It carries its own screen, so on
              narrow viewports it drops below instead of covering the page. */}
          <div className="mt-3 w-[7.5rem] sm:absolute sm:-bottom-4 sm:end-4 sm:mt-0 sm:w-[8.5rem] md:w-[10rem]">
            <div className="overflow-hidden rounded-[1.1rem] border-[3px] border-ink bg-ink shadow-[0_10px_30px_-12px_rgba(17,17,17,0.45)]">
              <img
                src={demo.phone.src}
                alt={t(demo.phone.alt)}
                width={demo.phone.width}
                height={demo.phone.height}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        <span className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 sm:mt-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange" />
            {t(demo.label)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors duration-300 group-hover:text-orange-ink">
            {t(demo.open)}
            <ArrowUpRight aria-hidden size={14} className={isRTL ? '-scale-x-100' : undefined} />
          </span>
        </span>
      </a>

      <figcaption className="mt-3 max-w-[52ch] text-xs leading-[1.7] text-ink-dim">
        {t(demo.caption)}
      </figcaption>
    </figure>
  );
}
