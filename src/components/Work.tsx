import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { projects, work, type WorkShot } from '@/content';
import { Pill } from './ui';
import { Deck, FadeIn, StackSlot } from './ui/motion';
import { cn } from '@/lib/cn';

/**
 * Section 6 — Selected work.
 *
 * The one dark block in the middle of the page. Everything above it is cream
 * or orange, so the switch to #0C0C0C is the page's loudest gear change, and
 * it is spent on the section that has to do the most convincing.
 *
 * The cards stack: each one pins and shrinks slightly as the next slides over
 * it (see `StackSlot`). Below `lg` they are a plain column — same cards, same
 * order, no stacking, because a card that is already as tall as the viewport
 * has nothing left to pin against.
 *
 * Only a project with its own page gets a link and an arrow. The other three
 * are not anchors at all: nothing on this site may look clickable when there
 * is nothing behind it.
 */
export default function Work() {
  const { t, isRTL, href } = useLang();

  const featured = work.featured
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      id="work"
      className="relative z-10 -mt-8 rounded-t-[2rem] bg-black text-on-dark md:-mt-12 md:rounded-t-[3rem] lg:rounded-t-[3.75rem]"
    >
      <div className="container-page py-16 md:py-24 lg:py-28">
        <header className="max-w-[48rem]">
          <FadeIn as="p" y={16} className="label text-orange-ink">
            {t(work.eyebrow)}
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="display mt-4 text-display-sm text-on-dark md:mt-5">{t(work.title)}</h2>
          </FadeIn>
          <FadeIn
            as="p"
            delay={0.16}
            y={16}
            className="mt-4 max-w-[52ch] text-sm leading-relaxed text-on-dark/70 md:mt-5 md:text-base"
          >
            {t(work.intro)}
          </FadeIn>
        </header>

        <Deck className="mt-12 md:mt-16">
          {(progress) =>
            featured.map((project, i) => {
              const shots = work.shots[project.id] ?? [];
              const to = project.href;

              return (
                <StackSlot key={project.id} index={i} total={featured.length} progress={progress}>
                  <article
                    className={cn(
                      'flex h-full flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-cream/15 bg-black p-5',
                      'md:gap-6 md:rounded-[2.5rem] md:p-7 lg:p-8',
                    )}
                  >
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                      <div className="flex items-start gap-4 md:gap-5">
                        <span
                          aria-hidden
                          className="display text-[clamp(2rem,5vw,3.5rem)] leading-none text-orange"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="display text-[clamp(1.25rem,3vw,2rem)] leading-tight text-on-dark">
                            {project.name}
                          </h3>
                          {project.cardResult && (
                            <p className="tabular mt-2 max-w-[42ch] text-sm text-on-dark/70 md:text-base">
                              {t(project.cardResult)}
                            </p>
                          )}
                        </div>
                      </div>

                      {to && (
                        <a
                          href={href(to)}
                          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-xs font-medium text-on-dark transition-colors duration-200 hover:border-orange hover:bg-orange hover:text-cream md:text-sm"
                        >
                          {t(work.readCase)}
                          <ArrowUpRight
                            size={15}
                            aria-hidden
                            className={cn(
                              'transition-transform duration-200 group-hover:-translate-y-0.5',
                              isRTL && '-scale-x-100',
                            )}
                          />
                        </a>
                      )}
                    </div>

                    <ShotGrid shots={shots} />
                  </article>
                </StackSlot>
              );
            })
          }
        </Deck>

        <div className="mt-12 md:mt-16">
          <Pill href={href(work.allHref)} tone="orange" external={false}>
            {t(work.allLabel)}
          </Pill>
        </div>
      </div>
    </section>
  );
}

/**
 * The evidence grid: two wide shots stacked beside one tall one.
 *
 * Grid line numbers follow the inline direction, so the tall column lands on
 * the correct side in Arabic without a single RTL-specific rule.
 */
function ShotGrid({ shots }: { shots: WorkShot[] }) {
  const { t } = useLang();
  if (shots.length === 0) return null;

  const single = shots.length === 1;

  return (
    <div
      className={cn(
        'grid min-h-0 flex-1 gap-3',
        !single && 'lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-2',
      )}
    >
      {shots.map((shot, i) => (
        <figure
          key={shot.src}
          className={cn(
            'relative m-0 overflow-hidden rounded-[1.25rem] bg-cream/[0.06] md:rounded-[1.75rem]',
            // Mobile does not stack, so each frame carries its own height.
            'h-40 sm:h-52 lg:h-full',
            !single && i === 2 && 'lg:col-start-2 lg:row-span-2 lg:row-start-1',
          )}
        >
          <img
            src={shot.src}
            alt={t(shot.alt)}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            className={cn(
              'h-full w-full',
              // A ~300px screenshot blown up to fill a column goes soft, and a
              // soft screenshot reads as a fabricated one. Those sit inside the
              // frame at their own size instead.
              shot.fit === 'contain' ? 'object-contain p-3 md:p-4' : 'object-cover',
            )}
          />
        </figure>
      ))}
    </div>
  );
}
