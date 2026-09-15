import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { background } from '@/content';
import { FadeIn } from './ui/motion';
import LiquidButton from './ui/LiquidButton';

/**
 * Section 3 — the background, kept deliberately short.
 *
 * The home page's job here is to make someone open the full story, not to tell
 * it. The stages, the figures and the rail live on /background; do not bring
 * them back into this section — the story would then be told twice on the same
 * visit, which is what this rewrite removed.
 */
export default function Background() {
  const { t, isRTL, navigate, href } = useLang();

  return (
    <section id="background" className="scroll-mt-20">
      <div className="container-page py-20 md:py-28 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-5">
            <p className="label eyebrow">{t(background.label)}</p>
            <h2 className="display mt-6 max-w-[16ch] text-[calc(clamp(1.875rem,4.6vw,3rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink">
              {t(background.title)}
            </h2>
          </FadeIn>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.06}>
              <p className="lede max-w-[46ch]">{t(background.intro)}</p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="display mt-8 max-w-[26ch] border-s-2 border-orange ps-5 text-[calc(clamp(1.125rem,2.2vw,1.5rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink md:ps-6">
                {t(background.intro2)}
              </p>

              <LiquidButton
                href={href(background.cta.route)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(background.cta.route);
                }}
                className="mt-9 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink"
              >
                {t(background.cta.label)}
                <ArrowUpRight aria-hidden size={16} className={isRTL ? '-scale-x-100' : ''} />
              </LiquidButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
