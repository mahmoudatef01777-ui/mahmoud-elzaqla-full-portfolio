import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { backgroundPage, ui } from '@/content';
import { FadeIn } from './ui/motion';
import StoryTimeline from './ui/StoryTimeline';

/**
 * The /background route — where the full story now lives.
 *
 * The home page carries only the headline and two lines; everything else is
 * here, told once, on the scroll-driven rail that used to sit on the home page.
 * Do not add a second prose retelling above or below the rail: the page had one
 * before and it read as the same story twice.
 */
export default function BackgroundPage() {
  const { t, navigate, href, isRTL } = useLang();

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page py-14 md:py-20">
          <FadeIn>
            <a
              href={href('/')}
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {isRTL ? '→' : '←'} {t(ui.back)}
            </a>

            <p className="label eyebrow mt-10">{t(backgroundPage.label)}</p>
            <h1 className="display mt-6 max-w-[var(--display-measure)] text-display-md text-ink">
              {t(backgroundPage.title)}
            </h1>
            <p className="lede mt-7 max-w-[58ch]">{t(backgroundPage.intro)}</p>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------- the story */}
      <section className="container-page py-16 md:py-24">
        <div className="lg:mx-auto lg:max-w-[46rem]">
          <StoryTimeline stages={backgroundPage.story} />

          <FadeIn>
            <p className="mt-12 max-w-[60ch] border-t border-line pt-5 text-xs leading-[1.7] text-ink-dim">
              {t(backgroundPage.evidenceNote)}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ------------------------------------------------------------ roles */}
      <section className="border-t border-line">
        <div className="container-page py-16 md:py-24">
          <FadeIn>
            <h2 className="display text-display-xs text-ink">{t(backgroundPage.roles.title)}</h2>
          </FadeIn>

          <ul className="mt-8 flex flex-col">
            {backgroundPage.roles.rows.map((row, i) => (
              <FadeIn
                as="li"
                key={row.name}
                delay={0.04 * i}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-5"
              >
                <span className="font-latin text-lg font-semibold text-ink">{row.name}</span>
                <span className="text-sm text-ink-dim">{t(row.role)}</span>
              </FadeIn>
            ))}
          </ul>

          <FadeIn>
            <h2 className="display mt-16 text-display-xs text-ink">
              {t(backgroundPage.closing.title)}
            </h2>
            <p className="lede mt-5 max-w-[60ch]">{t(backgroundPage.closing.body)}</p>

            <a
              href={href('/projects')}
              onClick={(e) => {
                e.preventDefault();
                navigate('/projects');
              }}
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 ease-out hover:bg-ink hover:text-on-dark"
            >
              {t({ ar: 'شوف الشغل نفسه', en: 'See the work itself' })}
              <ArrowUpRight aria-hidden size={16} className={isRTL ? '-scale-x-100' : ''} />
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
