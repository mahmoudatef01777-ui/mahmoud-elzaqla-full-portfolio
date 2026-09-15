import { useState } from 'react';
import { ArrowUpRight, Expand } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { byLabel, caseStudyById, projectsStrip, splitLinks } from '@/content';
import type { By, CaseSection, CaseShot } from '@/content';
import { Chip, SectionTitle } from './ui';
import StoreDemo from './ui/StoreDemo';
import Lightbox, { type LightboxImage } from './ui/Lightbox';
import { cn } from '@/lib/cn';

/**
 * One case study, rendered from data.
 *
 * Only the sections a project actually has are in its data, so nothing is
 * padded out to fill a template. Every claim carries a credit tag, every
 * figure carries its source and period, and a section with no verified number
 * says so instead of showing one.
 *
 * Bloomy has its own deeper page and does not come through here.
 */
const BY_TONE: Record<By, string> = {
  did: 'bg-orange text-on-orange',
  advised: 'border border-ink/20 text-ink',
  client: 'border border-ink/20 text-ink-dim',
  existing: 'border border-ink/20 text-ink-dim',
  result: 'border border-ink/20 text-ink',
};

function Shots({ shots, onOpen }: { shots: CaseShot[]; onOpen: (i: LightboxImage) => void }) {
  const { t } = useLang();
  return (
    <div className={cn('mt-7 grid gap-5', shots.length > 1 && 'md:grid-cols-2')}>
      {shots.map((s) => (
        <figure key={s.src} className="overflow-hidden rounded-card border border-ink/10 bg-cream">
          <button
            type="button"
            onClick={() => onOpen({ src: s.src, width: s.width, height: s.height, alt: t(s.alt), caption: t(s.caption) })}
            className="group relative block w-full"
          >
            <img
              src={s.src}
              alt={t(s.alt)}
              width={s.width}
              height={s.height}
              loading="lazy"
              decoding="async"
              // Never upscaled — a soft upscale makes real numbers look doctored.
              className="mx-auto block h-auto w-full object-contain p-3"
              style={{ maxWidth: `min(100%, ${s.width}px)` }}
            />
            <span
              aria-hidden
              className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-on-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              <Expand size={14} />
            </span>
          </button>
          <figcaption className="px-4 pb-3 text-xs leading-relaxed text-ink-dim">
            {t(s.caption)}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function Section({ s, n, onOpen }: { s: CaseSection; n: number; onOpen: (i: LightboxImage) => void }) {
  const { t } = useLang();
  return (
    <section id={s.id} className="scroll-mt-24 border-t border-ink/15 py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
        <div className="flex items-baseline gap-3">
          <span className="display text-sm text-ink-dim">{String(n).padStart(2, '0')}</span>
          <h2 className="display text-[clamp(1.125rem,3vw,1.625rem)] text-ink">{t(s.title)}</h2>
        </div>

        <div>
          {s.body && (
            <div className="max-w-[62ch] space-y-4">
              {t(s.body).map((p) => (
                <p key={p} className="text-sm leading-relaxed text-ink-dim md:text-base">{p}</p>
              ))}
            </div>
          )}

          {s.points && (
            <ul className="mt-1 flex flex-col gap-3">
              {s.points.map((pt) => (
                <li key={pt.text.en} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-sm text-ink md:text-base">{t(pt.text)}</span>
                  <span
                    className={cn(
                      'whitespace-nowrap rounded-full px-2.5 py-1 text-[0.625rem] font-medium',
                      BY_TONE[pt.by],
                    )}
                  >
                    {t(byLabel[pt.by])}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {s.facts && (
            <dl
              className={cn(
                'mt-2 grid gap-6 sm:grid-cols-2',
                // Four tiles is the common case and stays on one row. Five or
                // six would leave a single tile stranded on a second row under
                // a four-column grid, so those drop to three columns and wrap
                // 3 + 2 or 3 + 3 instead. Nothing with four or fewer moves.
                s.facts.length === 5 || s.facts.length === 6
                  ? 'lg:grid-cols-3'
                  : 'lg:grid-cols-4',
              )}
            >
              {s.facts.map((f) => (
                <div key={f.value} className="border-t border-ink/15 pt-3">
                  {/* `num` isolates the value from the Arabic around it.
                      Without it "~40" rendered as "40~" and "~70–100" as
                      "100–70~", which reverses a range and is simply wrong. */}
                  <dt className="display num text-[clamp(1.25rem,3.5vw,1.875rem)] leading-none text-ink">
                    {f.value}
                  </dt>
                  <dd className="mt-2.5">
                    <p className="text-sm font-medium text-ink">{t(f.label)}</p>
                    <p className="mt-1 text-xs text-ink-dim">{t(f.source)}</p>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {s.shots && <Shots shots={s.shots} onOpen={onOpen} />}

          {s.note && (
            <p className="mt-6 max-w-[62ch] border-s-2 border-orange ps-4 text-xs leading-relaxed text-ink-dim md:text-sm">
              {t(s.note)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CaseStudy({ id }: { id: string }) {
  const { t, href, isRTL } = useLang();
  const [open, setOpen] = useState<LightboxImage | null>(null);
  const study = caseStudyById(id);

  if (!study) return null;

  // A store or a domain keeps its text link, because there the address is the
  // point. The brand's Instagram/Facebook icons used to sit beside the name
  // here and were removed on 2026-09-15: on a case study the reader is here
  // for the work, and a row of platform icons under the brand name sent them
  // off the page. They still sit on every card on /projects.
  const { other } = splitLinks(study.links, study.brand);

  const order = projectsStrip.items.map((p) => p.id);
  const at = order.indexOf(study.id);
  const next = order[(at + 1) % order.length];
  const nextItem = projectsStrip.items.find((p) => p.id === next);

  return (
    <article className="pb-16 md:pb-24">
      <header className="container-page pt-10 md:pt-16">
        <a
          href={href('/')}
          className="text-xs text-ink-dim underline-offset-4 hover:text-ink hover:underline md:text-sm"
        >
          {isRTL ? '→' : '←'} {isRTL ? 'كل المشاريع' : 'All projects'}
        </a>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-ink/10 bg-paper p-2">
            <img src={study.logo} alt="" aria-hidden width={56} height={56} className="h-full w-full rounded-full object-contain" />
          </span>
          <SectionTitle>{study.brand}</SectionTitle>
          {study.status && <Chip tone="orange">{t(study.status)}</Chip>}
        </div>

        <p className="mt-2 text-sm text-ink-dim md:text-base">{t(study.role)}</p>
        <p className="mt-5 max-w-[46ch] text-lg leading-snug text-ink md:text-2xl">{t(study.intro)}</p>

        {other.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {other.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-ink-dim underline-offset-4 hover:text-ink hover:underline"
              >
                {l.label}
                <ArrowUpRight size={14} aria-hidden className={isRTL ? '-scale-x-100' : undefined} />
              </a>
            ))}
          </div>
        )}

        {study.demo && <StoreDemo demo={study.demo} />}
      </header>

      <div className="container-page mt-10 md:mt-14">
        {study.sections.map((s, i) => (
          <Section key={s.id} s={s} n={i + 1} onOpen={setOpen} />
        ))}
      </div>

      {nextItem && (
        <nav className="container-page mt-12 border-t border-ink/15 pt-8 md:mt-16">
          <a href={href(`/work/${nextItem.id}`)} className="group inline-flex items-center gap-3">
            <span className="text-xs text-ink-dim md:text-sm">
              {isRTL ? 'المشروع اللي بعده' : 'Next project'}
            </span>
            <span className="display text-2xl text-ink transition-colors group-hover:text-orange md:text-3xl">
              {nextItem.name}
            </span>
            <ArrowUpRight size={18} aria-hidden className={cn('text-ink-dim', isRTL && '-scale-x-100')} />
          </a>
        </nav>
      )}

      <Lightbox image={open} onClose={() => setOpen(null)} closeLabel={isRTL ? 'إغلاق' : 'Close'} />
    </article>
  );
}
