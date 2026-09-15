import { useLang } from '@/i18n/LanguageProvider';
import { about, positioning } from '@/content';
import { FadeIn, RevealText } from './ui/motion';

/**
 * Section 2 — positioning. Type only: no cards, no icons, no figures. The
 * statement resolves word by word as it is read (RevealText), which is the
 * one piece of motion the section gets.
 */
export default function Positioning() {
  const { t } = useLang();

  return (
    <section id="positioning" className="border-y border-line bg-soft">
      <div className="container-page py-20 md:py-28 lg:py-36">
        <FadeIn>
          <p className="label eyebrow">{t(positioning.label)}</p>
        </FadeIn>

        {/*
         * The statement is two sentences that wrap, not one giant line, so it
         * sets its own size and leading rather than borrowing the hero's:
         *  - 34ch measure — the second sentence is 67 characters, so it breaks
         *    onto exactly two lines and the whole block stays at three.
         *  - the size floors at 1.5rem so the first sentence (24 characters)
         *    still fits on one line at 390px instead of dropping "ads." alone.
         *  - --display-scale keeps Arabic in proportion, --statement-leading
         *    gives each script its own line height (see styles/fonts.css).
         * The measure belongs on the paragraphs, not the wrapper: `ch` is
         * font-relative and the wrapper is 16px.
         */}
        <div className="mt-8 md:mt-10">
          <RevealText
            text={t(positioning.statement.lead)}
            className="display max-w-[34ch] text-[calc(clamp(1.5rem,4.2vw,3.25rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink"
            dim={0.3}
          />
          {/*
            Set in ink, not the accent. The accent is reserved for dots,
            numbers, active states and small highlights; a two-line display
            headline in orange was the largest block of accent on the site
            and read as decoration. The emphasis here comes from the break
            between the negation and the claim, not from colour. The section
            keeps its accent on the eyebrow dot and the pull-quote rule.
          */}
          <RevealText
            text={t(positioning.statement.accent)}
            className="display mt-2 max-w-[34ch] text-[calc(clamp(1.5rem,4.2vw,3.25rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink"
            dim={0.32}
          />
        </div>

        <FadeIn className="mt-14 border-t border-line pt-10 md:mt-20 md:pt-12">
          <p className="lede max-w-[58ch]">{t(about.statement)}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="display mt-14 max-w-[30ch] border-s-2 border-orange ps-5 text-[calc(clamp(1.25rem,2.6vw,2rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink md:mt-20 md:ps-6">
            {t(about.highlight)}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
