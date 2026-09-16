import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { footer, nav, wordmark } from '@/content';
import { FadeIn } from './ui/motion';
import { navTarget } from '@/lib/nav';
import LiquidButton from './ui/LiquidButton';
import Monogram from './ui/Monogram';
import { SocialMark } from './ui/SocialLinks';

/**
 * Section 7 — the final call, on #111111. It is the site footer too, so it
 * renders on every route.
 *
 * Deliberately minimal: one heading, one paragraph, one button. The address
 * block underneath is small on purpose — the button is the action.
 */
export default function Contact() {
  const { t, href, isRTL, route, navigate } = useLang();

  return (
    <footer id="contact" className="bg-black text-on-dark">
      <div className="container-page py-20 md:py-28 lg:py-32">
        <FadeIn>
          <p className="label eyebrow text-on-dark/60">{t(footer.label)}</p>
        </FadeIn>

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <h2 className="display max-w-[16ch] text-display-md text-on-dark">
              {t(footer.heading)}
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-on-dark/70 md:text-lg">
              {t(footer.body)}
            </p>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-5">
            {/* The mark signs the call block. It is decorative here — the
                footer's own <nav> already carries the name for assistive
                tech — so it stays hidden rather than repeating it. */}
            <Monogram aria-hidden className="mb-6 h-7 text-orange md:h-8" />
            {/*
              The one button on the site that fills with a colour that is not
              ours: #25D366 is WhatsApp's own green, and the CTA goes to
              WhatsApp. Same liquid rise as the rest, so it reads as the site's
              motion rather than a borrowed widget. The label stays near-black
              in both states — 10:1 on the green — so nothing flickers while
              the surface passes the text.
            */}
            <LiquidButton
              href={footer.cta.href}
              external
              className="group flex w-full items-center rounded-full bg-on-dark px-7 py-5 text-base font-semibold text-black [--liquid-fill:#25D366] [--liquid-label:rgb(var(--c-black))]"
              labelClassName="w-full justify-between gap-4"
            >
              {t(footer.cta.label)}
              <ArrowUpRight
                aria-hidden
                size={20}
                className={`shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isRTL ? '-scale-x-100' : ''}`}
              />
            </LiquidButton>

            <ul className="mt-7 flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={footer.email.href}
                  className="font-latin text-on-dark/70 underline-offset-4 transition-colors hover:text-on-dark hover:underline"
                >
                  {footer.email.label}
                </a>
              </li>
              <li>
                <a
                  href={footer.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 font-latin text-on-dark/70 transition-colors hover:text-on-dark"
                >
                  <SocialMark
                    platform="linkedin"
                    className="shrink-0 transition-colors duration-300 ease-out group-hover:text-[#0A66C2]"
                  />
                  <span className="underline-offset-4 group-hover:underline">
                    {footer.linkedin.label}
                  </span>
                </a>
              </li>
            </ul>
          </FadeIn>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-on-dark/15 pt-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <nav aria-label={t(wordmark)}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    {...navTarget(item, { href, route, navigate })}
                    className="text-on-dark/70 transition-colors hover:text-on-dark"
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="flex items-center gap-2.5 font-latin text-xs text-on-dark/60">
            <Monogram aria-hidden className="h-3.5 w-auto md:h-4" />
            {t(wordmark)}
          </p>
        </div>

        {/* Closes the page. Centred and mid-sized on purpose — it is a sign-off,
            not a second hero, so it sits inside the container's own bottom
            padding rather than standing on the edge of the viewport. */}
        <FadeIn className="mt-12 flex justify-center md:mt-16">
          <img
            src={footer.photo.src}
            alt={t(footer.photo.alt)}
            width={footer.photo.width}
            height={footer.photo.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-52 md:w-64 lg:w-72"
          />
        </FadeIn>
      </div>
    </footer>
  );
}
