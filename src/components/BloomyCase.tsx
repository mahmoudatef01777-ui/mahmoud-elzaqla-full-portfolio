import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Expand, Play } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { bloomy, linksForProject, splitLinks } from '@/content';
import type { CaseEvidence } from '@/content';
import { Chip, SectionTitle } from './ui';
import SocialLinks from './ui/SocialLinks';
import Lightbox, { type LightboxImage } from './ui/Lightbox';
import { cn } from '@/lib/cn';

/**
 * The Bloomy case study at /work/bloomy — the deepest page on the site.
 *
 * The ten answers are native <details>/<summary>, so they are real disclosure
 * widgets: keyboard operable, findable by in-page search, and open by default
 * for anyone who prefers reduced motion or has JS disabled. The first one is
 * open on load; each has an id so a single question can be linked to.
 *
 * Type scale, spacing and components are the home page's — nothing new here.
 */
/**
 * True when a group is a photo contact sheet rather than framed evidence.
 * Takes the array so `satisfies` can keep the literal types in content/.
 */
const isTileSet = (evidence: CaseEvidence[]) => evidence.every((e) => e.fit === 'cover');

function Evidence({ item, onOpen }: { item: CaseEvidence; onOpen: (i: LightboxImage) => void }) {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);

  if (item.type === 'video') {
    return (
      <figure className="overflow-hidden rounded-card border border-ink/10 bg-cream">
        {playing ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            muted
            playsInline
            className="mx-auto block max-h-[32rem] w-auto"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block w-full"
            aria-label={t(item.alt)}
          >
            <img
              src={item.poster}
              alt={t(item.alt)}
              loading="lazy"
              decoding="async"
              className="mx-auto block max-h-[32rem] w-auto"
            />
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-black/70 text-on-dark transition-transform duration-200 group-hover:scale-105">
                <Play size={20} className="ms-0.5" />
              </span>
            </span>
          </button>
        )}
        <figcaption className="px-4 py-3 text-xs leading-relaxed text-ink-dim">
          {t(item.caption)}
        </figcaption>
      </figure>
    );
  }

  const open = () =>
    onOpen({
      src: item.src,
      width: item.width,
      height: item.height,
      alt: t(item.alt),
      caption: t(item.caption),
    });

  /*
    Photographs, laid out as square tiles so a set of them reads as one tidy
    block. The crop is the tile's alone — the lightbox opens the full frame —
    which is why this is allowed for photos and never for screenshots.

    `h-full` plus `mt-auto` on the caption keeps the bottom edges of a row
    level even when one caption wraps to two lines.
  */
  if (item.fit === 'cover') {
    return (
      <figure className="flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-cream">
        <button
          type="button"
          onClick={open}
          className="group relative block w-full overflow-hidden"
          aria-label={t(item.caption)}
        >
          <img
            src={item.src}
            alt={t(item.alt)}
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
            className="block aspect-square w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="absolute end-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-on-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Expand size={14} />
          </span>
        </button>
        <figcaption className="mt-auto px-3 py-2.5 text-[0.6875rem] leading-relaxed text-ink-dim md:px-3.5 md:py-3 md:text-xs">
          {t(item.caption)}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-card border border-ink/10 bg-cream">
      <button type="button" onClick={open} className="group relative block w-full">
        <img
          src={item.src}
          alt={t(item.alt)}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          // Never upscaled — a soft upscale makes real numbers look doctored.
          className="mx-auto block h-auto w-full object-contain p-3"
          style={{ maxWidth: `min(100%, ${item.width}px)` }}
        />
        <span
          aria-hidden
          className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-on-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Expand size={14} />
        </span>
      </button>
      <figcaption className="px-4 pb-3 text-xs leading-relaxed text-ink-dim">
        {t(item.caption)}
      </figcaption>
    </figure>
  );
}

export default function BloomyCase() {
  const { t, href, isRTL } = useLang();
  const [open, setOpen] = useState<LightboxImage | null>(null);

  return (
    <article className="pb-20 md:pb-28">
      {/* Header */}
      <header className="container-page pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-ink/10 bg-cream p-2">
            <img
              src={bloomy.logo}
              alt=""
              aria-hidden
              width={56}
              height={56}
              className="h-full w-full rounded-full object-contain"
            />
          </span>
          <SectionTitle>{bloomy.title}</SectionTitle>
          <Chip tone="orange">{t(bloomy.badge)}</Chip>
          <SocialLinks
            links={splitLinks(linksForProject('bloomy'), bloomy.title).social}
            className="ms-1"
          />
        </div>
        <p className="mt-5 max-w-[46ch] text-lg leading-snug text-ink md:text-2xl">
          {t(bloomy.intro)}
        </p>
      </header>

      {/* Numbers strip */}
      <section className="container-page mt-10 md:mt-14">
        <dl className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {bloomy.figures.map((figure) => (
            <div key={figure.value} className="border-t border-ink/15 pt-4">
              <dt className="display text-[clamp(1.75rem,4.5vw,2.5rem)] leading-none text-ink">
                {figure.value}
              </dt>
              <dd className="mt-3">
                <p className="text-sm font-medium text-ink">{t(figure.label)}</p>
                <p className="mt-1 text-xs text-ink-dim">{t(figure.source)}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-[60ch] text-xs leading-relaxed text-ink-dim md:text-sm">
          {t(bloomy.figuresNote)}
        </p>
      </section>

      {/* Ten questions */}
      <section className="container-page mt-12 md:mt-20">
        <ul className="border-t border-ink/15">
          {bloomy.questions.map((q, i) => (
            <li key={q.id} id={q.id} className="border-b border-ink/15 scroll-mt-24">
              <details open={i === 0} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 md:py-7 [&::-webkit-details-marker]:hidden">
                  <h2 className="display text-[clamp(1.125rem,3vw,1.625rem)] text-ink">
                    {t(q.question)}
                  </h2>
                  <span
                    aria-hidden
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 text-ink transition-transform duration-200 group-open:rotate-180"
                  >
                    <ChevronDown size={16} />
                  </span>
                </summary>

                <div className="grid gap-8 pb-8 md:pb-10 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-12">
                  <div>
                  <div className="space-y-4">
                    {t(q.answer).map((para) => (
                      <p key={para} className="text-sm leading-relaxed text-ink-dim md:text-base">
                        {para}
                      </p>
                    ))}
                  </div>

                  {q.list && (
                    <ol className="mt-5 max-w-[62ch] space-y-2.5">
                      {t(q.list).map((item, n) => (
                        <li key={item} className="flex gap-3 text-sm text-ink md:text-base">
                          <span className="display shrink-0 text-ink-dim">{n + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {q.pullquote && (
                    <p
                      className={cn(
                        'mt-6 max-w-[42ch] font-semibold leading-snug text-orange-ink',
                        // The return-is-data line is the point of the page.
                        q.id === 'hardest'
                          ? 'text-xl md:text-3xl'
                          : 'text-base md:text-xl',
                      )}
                    >
                      {t(q.pullquote)}
                    </p>
                  )}

                  </div>

                  {q.evidence && (
                    <div
                      className={cn(
                        'grid gap-4 lg:mt-0',
                        // A set of photo tiles stays two-up at every width —
                        // that is the contact sheet. Framed evidence (the
                        // screenshots) goes full width again on large screens,
                        // where the column is narrow enough to need it.
                        isTileSet(q.evidence)
                          ? 'grid-cols-2 gap-3 md:gap-4'
                          : q.evidence.length > 1
                            ? 'sm:grid-cols-2 lg:grid-cols-1'
                            : '',
                      )}
                    >
                      {q.evidence.map((item) => (
                        <Evidence key={item.src} item={item} onOpen={setOpen} />
                      ))}
                    </div>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom */}
      <nav className="container-page mt-14 flex flex-wrap items-center justify-between gap-5 md:mt-20">
        {bloomy.next.brand && bloomy.next.href ? (
          <a href={href(bloomy.next.href)} className="group inline-flex items-center gap-3">
            <span className="text-xs text-ink-dim md:text-sm">{t(bloomy.next.label)}</span>
            <span className="display text-2xl text-ink transition-colors group-hover:text-orange md:text-3xl">
              {bloomy.next.brand}
            </span>
            <ArrowUpRight size={18} aria-hidden className="text-ink-dim" />
          </a>
        ) : (
          <span />
        )}
        <a
          href={href(bloomy.next.backHref)}
          className="inline-flex items-center gap-2 text-sm text-ink-dim underline-offset-4 hover:text-ink hover:underline"
        >
          {t(bloomy.next.backLabel)}
          <ArrowUpRight size={15} aria-hidden className={isRTL ? '-scale-x-100' : undefined} />
        </a>
      </nav>

      <Lightbox image={open} onClose={() => setOpen(null)} closeLabel="Close" />
    </article>
  );
}
