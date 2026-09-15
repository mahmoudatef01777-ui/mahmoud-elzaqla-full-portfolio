import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { results, projectsPage, linksForProject, splitLinks, brandColor } from '@/content';
import type { Localized } from '@/content';
import { SectionTitle } from './ui';
import SocialLinks from './ui/SocialLinks';
import { cn } from '@/lib/cn';

/**
 * /projects — all ten engagements, as one quiet list.
 *
 * TWO THINGS PER ROW, and only two: who it is on the reading-start side, what
 * it produced on the other. Everything else — the description, the status, the
 * social links — sits UNDER the name rather than beside it, so the eye tracks
 * two columns down the page instead of picking through five objects per row.
 *
 * That is the whole design. Earlier versions failed on exactly this: first two
 * stacked grids of cards in different sizes, then a three-column row whose
 * left-hand cluster held a logo, a name, an arrow, an orange pill and three
 * social icons all in a line. Both were legible and neither was restful.
 *
 * SO, DELIBERATELY ABSENT: pills (the status is small text, not a colour
 * block), an arrow on every row (it appears on hover, where it is useful),
 * rings around the logos and the social icons in light mode (the page is
 * white, so all a ring drew was a grey circle), and any card chrome at all.
 *
 * The row is not itself an <a>: the brand name carries the link and stretches
 * over the whole row with `after:inset-0`, which keeps the row clickable while
 * leaving the social icons as real, separate links. Nesting them inside an <a>
 * would be invalid HTML and browsers break it.
 *
 * A row is clickable only when its id has a route in projectsPage.caseStudies
 * — one without gets no arrow and no hover, so nothing looks clickable that
 * isn't. All ten are mapped as of 2026-09-14.
 */

interface Row {
  id: string;
  brand: string;
  logo: string;
  did: Localized;
  badge?: Localized;
  number?: Localized;
  numberLabel?: Localized;
  source?: Localized;
}

export default function Projects() {
  const { t, href, navigate, isRTL } = useLang();

  // The four with figures keep their place at the top — strongest first is
  // still the right order — but they are rows like every other row.
  const rows: Row[] = [...results.cards, ...results.compact];

  return (
    <article className="container-page py-12 md:py-20">
      <header className="mb-12 md:mb-16">
        <SectionTitle>{t(projectsPage.title)}</SectionTitle>
        <p className="mt-3 max-w-[64ch] text-sm text-ink-dim md:text-base">
          {t(projectsPage.subtitle)}
        </p>

        {/* A margin note: it answers "why isn't all of that visible on every
            project here?" before the reader answers it themselves. Small type,
            one hairline, three short lines — never a boxed disclaimer. */}
        <div className="mt-8 max-w-[68ch] space-y-1.5 border-t border-line pt-6 text-[0.8125rem] leading-[1.7] text-ink-dim md:text-sm">
          {t(projectsPage.scopeNote).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </header>

      <ul>
        {rows.map((row) => {
          const to = projectsPage.caseStudies[row.id];
          const { social } = splitLinks(linksForProject(row.id), row.brand);

          return (
            <li
              key={row.id}
              style={{ '--brand': brandColor(row.id) } as CSSProperties}
              className={cn(
                'group relative grid gap-x-10 gap-y-5 border-t border-line py-8 last:border-b md:grid-cols-12 md:py-11',
                to && 'transition-colors duration-200 hover:bg-ink/[0.02]',
              )}
            >
              {/* Who, and what I did. One block, so the row has one anchor on
                  this side rather than a line of competing objects. */}
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="logo-chip h-10 w-10 shrink-0">
                    <img
                      src={row.logo}
                      alt=""
                      aria-hidden
                      width={40}
                      height={40}
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-contain"
                    />
                  </span>

                  <span className="display text-[1.125rem] text-ink transition-colors duration-300 ease-out group-hover:text-[var(--brand)] md:text-[1.375rem]">
                    {to ? (
                      <a
                        href={href(to)}
                        onClick={(e) => {
                          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                          e.preventDefault();
                          navigate(to);
                        }}
                        className="after:absolute after:inset-0"
                      >
                        {row.brand}
                      </a>
                    ) : (
                      row.brand
                    )}
                  </span>

                  {/* Status as a word, not a colour block. */}
                  {row.badge && (
                    <span className="text-[0.6875rem] text-orange-ink md:text-xs">
                      {t(row.badge)}
                    </span>
                  )}

                  {to && (
                    <ArrowUpRight
                      aria-hidden
                      size={16}
                      className={cn(
                        'shrink-0 text-ink-dim opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100',
                        isRTL && '-scale-x-100',
                      )}
                    />
                  )}
                </div>

                <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-ink-dim md:text-base">
                  {t(row.did)}
                </p>

                {/* z-10 keeps these above the stretched link. */}
                <SocialLinks
                  links={social}
                  size="sm"
                  className="socials-plain relative z-10 mt-3"
                />
              </div>

              {/* What it produced. Empty for a project with no published
                  figure — the column is at the row's end, so it reads as a
                  short row rather than a gap in the middle. */}
              <div className="md:col-span-5 md:text-end">
                {row.number && (
                  <>
                    {/* `num` isolates the digits from the Arabic around them,
                        but it also sets direction: ltr — put it on an inner
                        span, or "text-end" flips on this one element and the
                        figure stops lining up with its own label. */}
                    <p className="display text-[calc(clamp(1.5rem,2.8vw,2.125rem)*var(--display-scale))] leading-none text-ink">
                      <span className="num">{t(row.number)}</span>
                    </p>
                    {row.numberLabel && (
                      <p className="mt-2.5 text-sm text-ink">{t(row.numberLabel)}</p>
                    )}
                    {row.source && (
                      <p className="mt-1 text-xs text-ink-dim">{t(row.source)}</p>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Fine print about the figures, tied to the rows above it... */}
      <p className="mt-10 max-w-[60ch] text-xs leading-relaxed text-ink-dim md:text-sm">
        {t(projectsPage.note)}
      </p>

      {/* ...then the last word, which is the message rather than the caveat:
          what he does with a brand now, at display size so it closes the page
          instead of trailing off it. */}
      <p className="display mt-12 max-w-[46ch] text-[calc(clamp(1.125rem,2.2vw,1.5rem)*var(--display-scale))] leading-[var(--statement-leading)] text-ink md:mt-16">
        {t(projectsPage.closing)}
      </p>
    </article>
  );
}
