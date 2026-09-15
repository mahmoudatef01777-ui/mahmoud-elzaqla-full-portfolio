import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { monogram, shellCta, shellNav, ui } from '@/content';

/**
 * Only the pages that exist. `shellNav` carries `ready: false` for routes
 * that were planned and never built — Services, Blog, Contact — and before
 * 2026-09-15 the flag was declared and then ignored, so the header shipped
 * three links to pages the router does not serve. A nav item that goes
 * nowhere is worse than one that is absent, so they are filtered out here
 * rather than rendered and disabled.
 */
const NAV = shellNav.filter((item) => item.ready);
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Site header for the reference design.
 *
 * Desktop: monogram at the start, the six-item nav floating in the middle of
 * the space between it and the call, and a black call pill at the end. The
 * current page carries a dot under its label rather than a colour change.
 *
 * Mobile is its own layout, not the desktop one shrunk: the nav disappears
 * entirely and the call pill sits beside a solid black menu square.
 */
export default function SiteHeader({ current }: { current?: string }) {
  const { t, href, navigate } = useLang();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close the drawer when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (route: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate(route);
  };

  return (
    <header className="relative z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-gutter focus:top-3 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-on-dark"
      >
        {t(ui.skipToContent)}
      </a>

      <div className="container-page flex items-center justify-between gap-4 py-4 md:py-6 lg:py-8">
        <Monogram onClick={go('/')} href={href('/')} />

        <nav
          aria-label={t(ui.menu)}
          className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-11"
        >
          {NAV.map((item) => {
            const active = item.route === current;
            return (
              <a
                key={item.route}
                href={href(item.route)}
                onClick={go(item.route)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative pb-2 text-sm transition-colors duration-200',
                  active ? 'font-semibold text-ink' : 'font-medium text-ink/70 hover:text-ink',
                )}
              >
                {t(item.label)}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 mx-auto h-[3px] w-[3px] rounded-full bg-ink"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <CallPill className="px-5 py-2.5 text-[0.8125rem] md:px-7 md:py-3.5 md:text-sm" />

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(ui.menu)}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-[0.7rem] bg-black text-on-dark transition-opacity duration-200 hover:opacity-85 lg:hidden"
          >
            <Menu size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-cream lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="container-page flex items-center justify-between py-4">
              <Monogram href={href('/')} onClick={go('/')} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(ui.close)}
                className="grid h-10 w-10 place-items-center rounded-[0.7rem] bg-black text-on-dark"
              >
                <X size={18} strokeWidth={2} aria-hidden />
              </button>
            </div>

            <nav aria-label={t(ui.menu)} className="container-page mt-6 flex flex-col">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.route}
                  href={href(item.route)}
                  onClick={go(item.route)}
                  className="display border-b border-line py-4 text-display-sm text-ink transition-colors duration-200 hover:text-orange"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.3, ease: EASE }}
                >
                  {t(item.label)}
                </motion.a>
              ))}
              <CallPill className="mt-8 w-full px-6 py-4 text-base" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * The MA lockup. Set as type rather than drawn, so it inherits the display
 * face; the negative tracking is what closes the two letters into one mark.
 */
function Monogram({ href, onClick }: { href: string; onClick: (e: React.MouseEvent) => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label="Mahmoud Atef — home"
      className="shrink-0 font-display text-[1.5rem] font-black leading-none tracking-[-0.09em] text-ink transition-opacity duration-200 hover:opacity-70 md:text-[1.75rem]"
    >
      {monogram}
    </a>
  );
}

/** The black call pill, header size by default. */
function CallPill({ className }: { className?: string }) {
  const { t } = useLang();
  return (
    <a
      href={shellCta.href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-black font-medium text-on-dark',
        'transition-transform duration-200 ease-out hover:scale-[1.03]',
        className,
      )}
    >
      {t(shellCta.label)}
      <ArrowRight size={15} strokeWidth={2.2} aria-hidden className="rtl:-scale-x-100" />
    </a>
  );
}
