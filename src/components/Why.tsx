import { useLang } from '@/i18n/LanguageProvider';
import { why } from '@/content';
import { SectionTitle } from './ui';
import { Plus } from 'lucide-react';

/**
 * Section — why hire me. Orange block, numbered rows that expand on tap.
 *
 * Native <details>/<summary> again: keyboard operable and open by default
 * when JS or animation is unavailable. Cream on orange is only 3.6:1, so the
 * headline is large display type and every small string is near-black.
 */
export default function Why() {
  const { t } = useLang();

  return (
    <section id="why" className="bg-orange py-20 text-on-orange md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-20">
        <SectionTitle tone="onOrange">{t(why.title)}</SectionTitle>

        <ul className="border-t border-cream/25">
          {why.reasons.map((reason, i) => (
            <li key={reason.id} className="border-b border-cream/25">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-4 py-6 md:gap-6 md:py-8 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden className="display mt-0.5 shrink-0 text-sm text-on-orange/60 md:text-base">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="display flex-1 text-[clamp(1.125rem,3.2vw,1.625rem)] text-on-orange transition-colors duration-200 group-open:text-cream">
                    {t(reason.headline)}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-on-orange/30 text-on-orange transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus size={14} />
                  </span>
                </summary>
                <p className="max-w-[58ch] pb-7 text-sm leading-relaxed text-on-orange/80 md:ms-12 md:pb-9 md:text-base">
                  {t(reason.detail)}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
