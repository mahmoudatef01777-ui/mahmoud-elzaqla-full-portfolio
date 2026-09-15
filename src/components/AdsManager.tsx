import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { adsManager, type AdsShot } from '@/content';
import { FadeIn } from './ui/motion';
import Lightbox, { type LightboxImage } from './ui/Lightbox';
import { cn } from '@/lib/cn';

/**
 * "Ads Manager" — captures from the ad accounts, shown as evidence.
 *
 * Two groups, in the order Mahmoud set: the website/purchase campaigns first,
 * the messaging campaigns after them. The split is not decorative — a purchase
 * and a messaging conversation are different things, and putting them in one
 * undifferentiated grid would invite a reader to treat the big messaging
 * numbers as orders.
 *
 * Deliberately a sibling of, not a variant of, the Results section: that one
 * shows store and ERP dashboards, this one shows ad accounts, and the two are
 * allowed to diverge. Kept self-contained so a change here cannot alter it.
 *
 * Captures are never cropped and never scaled past natural width — a blown-up
 * Ads Manager table looks doctored, and these are the proof. The page shows
 * them at a readable scale; the lightbox is where the figures are read.
 */
export default function AdsManager() {
  const { t } = useLang();
  const [open, setOpen] = useState<LightboxImage | null>(null);

  const Shot = ({ shot }: { shot: AdsShot }) => (
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
        aria-label={`${t(adsManager.openLabel)} — ${shot.brand}`}
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

      <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-latin text-sm font-semibold text-ink">{shot.brand}</span>
        <span className="text-xs text-ink-dim">{t(shot.caption)}</span>
      </figcaption>
    </figure>
  );

  /** Lead capture wide, its partner beside it, the rest two-up underneath. */
  const Group = ({ shots, heading }: { shots: AdsShot[]; heading: string }) => {
    if (shots.length === 0) return null;
    const [lead, second, ...tail] = shots;
    return (
      <>
        <FadeIn>
          <h3 className="label eyebrow mt-16 border-t border-line pt-8 first:mt-0 md:mt-20">
            {heading}
          </h3>
        </FadeIn>

        <div className="mt-8 grid gap-8 md:gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <Shot shot={lead} />
          </FadeIn>
          {second && (
            <FadeIn delay={0.06} className="lg:col-span-5 lg:self-end">
              <Shot shot={second} />
            </FadeIn>
          )}
        </div>

        {tail.length > 0 && (
          <div className="mt-8 grid gap-8 md:mt-10 md:gap-10 lg:grid-cols-2">
            {tail.map((shot, i) => (
              <FadeIn key={shot.id} delay={0.06 * (i % 2)}>
                <Shot shot={shot} />
              </FadeIn>
            ))}
          </div>
        )}
      </>
    );
  };

  const web = adsManager.shots.filter((s) => s.objective === 'web');
  const messaging = adsManager.shots.filter((s) => s.objective === 'messaging');
  // The featured capture leads its group.
  const lead = (list: AdsShot[]) => [
    ...list.filter((s) => s.feature),
    ...list.filter((s) => !s.feature),
  ];

  return (
    <section id="ads-manager" className="scroll-mt-20 border-t border-line bg-soft">
      <div className="container-page py-20 md:py-28 lg:py-32">
        <FadeIn className="max-w-[52ch]">
          <p className="label eyebrow">{t(adsManager.label)}</p>
          <h2 className="display mt-6 text-display-sm text-ink">{t(adsManager.title)}</h2>
          <p className="lede mt-5">{t(adsManager.lede)}</p>
        </FadeIn>

        <div className="mt-12 md:mt-16">
          <Group shots={lead(web)} heading={t(adsManager.groups.web)} />
          <Group shots={lead(messaging)} heading={t(adsManager.groups.messaging)} />
        </div>

        <FadeIn>
          <p className="mt-10 max-w-[64ch] text-xs leading-[1.7] text-ink-dim md:mt-12">
            {t(adsManager.note)}
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
