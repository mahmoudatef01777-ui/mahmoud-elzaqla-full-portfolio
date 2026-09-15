import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { experience } from '@/content';
import { FadeIn } from './ui/motion';
import LiquidButton from './ui/LiquidButton';

/**
 * "Experience" — the one section that explains why he reads e-commerce the way
 * he does, placed before the evidence so a visitor knows who is showing them
 * the screenshots.
 *
 * Headline, two sentences, two figures, one button — and nothing else. The
 * five milestone rows that used to sit between the lede and the figures were
 * removed on 2026-09-15 because /background tells the same progression at
 * length, so anyone who pressed the button read it twice. Keep this section
 * short: its job is to make the long version worth opening.
 *
 * It absorbed the home page's old Background teaser on 2026-09-14 — the two
 * were telling the same story in two places, and the teaser ended on "Shopify
 * and performance marketing", which turned the story into a tool list. The
 * long version still lives at /background, which the button goes to.
 *
 * See content/experience.ts for what may and may not be said here.
 */
export default function Experience() {
  const { t, isRTL, navigate, href } = useLang();

  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="container-page py-20 md:py-28 lg:py-32">
        <FadeIn className="max-w-[62ch]">
          <p className="label eyebrow">{t(experience.label)}</p>
          <h2 className="display mt-6 max-w-[18ch] text-display-sm text-ink">
            {t(experience.title)}
          </h2>
          <p className="lede mt-6 max-w-[54ch]">{t(experience.body)}</p>
        </FadeIn>

        {/* The five milestone rows that used to sit here were removed on
            2026-09-15: /background tells the same progression in more depth,
            and a visitor who follows the button below was reading it twice.
            The stats take the spacing the list used to have. */}
        <div className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2 md:mt-20">
          {experience.stats.map((stat, i) => (
            <FadeIn key={stat.id} delay={0.07 * i}>
              <p className="font-latin num text-[calc(clamp(2rem,5vw,3.25rem)*var(--display-scale))] font-bold leading-none text-orange">
                {stat.value}
              </p>
              <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-[1.5] text-ink">
                {t(stat.label)}
              </p>
              {/* Tight under the label and quieter than it, so it reads as
                  part of the same fact rather than a second one. */}
              {stat.note && (
                <p className="mt-1 text-[0.9375rem] leading-[1.5] text-ink-dim">
                  {t(stat.note)}
                </p>
              )}
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <LiquidButton
            href={href(experience.cta.route)}
            onClick={(e) => {
              e.preventDefault();
              navigate(experience.cta.route);
            }}
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink md:mt-14"
          >
            {t(experience.cta.label)}
            <ArrowUpRight aria-hidden size={16} className={isRTL ? '-scale-x-100' : ''} />
          </LiquidButton>
        </FadeIn>
      </div>
    </section>
  );
}
