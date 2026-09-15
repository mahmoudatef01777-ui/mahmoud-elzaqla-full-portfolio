import { useLang } from '@/i18n/LanguageProvider';
import { whyMe } from '@/content';
import { FadeIn } from './ui/motion';

/**
 * "Why work with me?" — the positioning section.
 *
 * It replaced the capabilities list on 2026-09-15. The list was the same
 * numbered rows as this, plus a row of tag chips under every description —
 * and those chips were the problem: a line of "Meta Ads / TikTok Ads / Pixel
 * and CAPI" under a heading is a product card, however editorial the type
 * around it is. A reader scanned five cards and read five services for sale.
 *
 * So: same numbered rhythm the rest of the page uses, no chips, and rows set
 * tighter than the section it replaced so the five read in one pass rather
 * than as five stops. Each row is one claim and one sentence of evidence.
 *
 * The closing line is a coda, not a sixth reason. It gets the accent rule the
 * Positioning pull-quote uses and stays in the secondary text colour, so it
 * reads as an aside — AI and automation are how he works, not what he sells.
 *
 * See content/why-me.ts for what may and may not be claimed here.
 */
export default function WhyMe() {
  const { t } = useLang();

  return (
    <section id="why-me" className="scroll-mt-20 border-t border-line">
      <div className="container-page py-20 md:py-28">
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(whyMe.label)}</p>
          {/* The measure lives on the display-sized element: `ch` is font
              relative, so 26ch on a 16px wrapper would be a third of this. */}
          <h2 className="display mt-6 max-w-[26ch] text-display-sm text-ink">{t(whyMe.title)}</h2>
          <p className="lede mt-6">{t(whyMe.intro)}</p>
        </FadeIn>

        <ol className="mt-12 md:mt-16">
          {whyMe.reasons.map((reason, i) => (
            <FadeIn
              as="li"
              key={reason.id}
              delay={0.04 * (i % 3)}
              className="grid gap-x-8 gap-y-2 border-t border-line py-6 last:border-b md:grid-cols-12 md:py-7"
            >
              <p className="font-latin text-xs font-semibold text-orange-ink tabular md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 className="display text-display-xs text-ink md:col-span-4">{t(reason.name)}</h3>

              <p className="max-w-[58ch] text-[0.9375rem] leading-[1.65] text-ink-dim md:col-span-7 md:text-base">
                {t(reason.detail)}
              </p>
            </FadeIn>
          ))}
        </ol>

        <FadeIn delay={0.08}>
          <p className="mt-10 max-w-[62ch] border-s-2 border-orange ps-5 text-[0.9375rem] leading-[1.7] text-ink-dim md:mt-12 md:ps-6 md:text-base">
            {t(whyMe.closing)}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
