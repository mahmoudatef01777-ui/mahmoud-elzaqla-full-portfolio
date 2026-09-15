import { useLang } from '@/i18n/LanguageProvider';
import { capabilities } from '@/content';
import { FadeIn } from './ui/motion';

/**
 * Section 6 — capabilities.
 *
 * Deliberately one list with hairlines between the rows rather than six
 * cards in a grid: cards would read as six separable services on a price
 * list, and the whole argument of the page is that they are used on the same
 * business at the same time. The intro line says it; the layout should not
 * contradict it.
 */
export default function Capabilities() {
  const { t } = useLang();

  return (
    <section id="capabilities" className="scroll-mt-20 border-t border-line">
      <div className="container-page py-20 md:py-28 lg:py-36">
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(capabilities.label)}</p>
          <h2 className="display mt-6 text-display-sm text-ink">{t(capabilities.title)}</h2>
          <p className="lede mt-6">{t(capabilities.intro)}</p>
        </FadeIn>

        <ol className="mt-14 md:mt-20">
          {capabilities.items.map((cap, i) => (
            <FadeIn
              as="li"
              key={cap.id}
              delay={0.04 * (i % 3)}
              className="grid gap-x-8 gap-y-3 border-t border-line py-7 last:border-b md:grid-cols-12 md:py-9"
            >
              <p className="font-latin text-xs font-semibold text-orange-ink tabular md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 className="display text-display-xs text-ink md:col-span-4">{t(cap.name)}</h3>

              <div className="md:col-span-7">
                <p className="max-w-[58ch] text-[0.9375rem] leading-[1.65] text-ink-dim md:text-base">
                  {t(cap.detail)}
                </p>

                <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                  {t(cap.items).map((label) => (
                    <li
                      key={label}
                      className="rounded-md border border-line bg-soft px-2.5 py-1 text-xs text-ink-dim"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
