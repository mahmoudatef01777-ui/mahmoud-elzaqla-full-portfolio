import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { landingNav, ui } from '@/content';
import { cn } from '@/lib/cn';
import { applyTheme, readTheme, storeTheme, type Theme } from '@/lib/theme';
import Monogram from '@/components/ui/Monogram';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Header for the one-page landing.
 *
 * Three tracks with the mark dead centre, exactly as the reference draws it:
 * navigation on the reading-START side, the two round utility buttons (EN and
 * light/dark) on the END side, the MZ mark in the middle. In Arabic that puts
 * the nav on the right and the toggles on the left; English mirrors it, and
 * neither side has to know which language is active.
 *
 * Mobile is its own layout, not the desktop one shrunk: the nav collapses
 * into a round menu button that takes the start track, and the two toggles
 * stay where they are, so the three-track balance survives at 375px.
 */
export default function LandingHeader() {
  const { lang, t, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // The inline script in index.html already set the attribute before paint;
  // this only mirrors it into React so the button can show the right icon.
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => setTheme(readTheme()), []);

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

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storeTheme(next);
    applyTheme(next, true);
  };

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  const langLabel = lang === 'ar' ? ui.langToggle.toEn.label : ui.langToggle.toAr.label;
  const langAria = t(lang === 'ar' ? ui.langToggle.toEn.aria : ui.langToggle.toAr.aria);

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-cream"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-gutter focus:top-3 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-on-dark"
      >
        {t(ui.skipToContent)}
      </a>

      <div className="container-landing grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 md:py-5 lg:py-8">
        {/* START: navigation on desktop, the menu button on a phone. */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(ui.menu)}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink lg:hidden"
          >
            <Menu size={18} strokeWidth={1.8} aria-hidden />
          </button>

          <nav aria-label={t(ui.menu)} className="hidden items-center gap-9 lg:flex lg:gap-10 xl:gap-11">
            {landingNav.map((item, i) => (
              <NavItem key={item.id} item={item} active={i === 0} />
            ))}
          </nav>
        </div>

        {/* CENTRE: the MZ mark, in the accent. */}
        <a
          href="#home"
          onClick={toTop}
          aria-label="Mahmoud Atef"
          className="justify-self-center text-orange transition-opacity duration-200 hover:opacity-70"
        >
          <Monogram strokeWidth={3.7} className="h-6 md:h-7 lg:h-[2.35rem]" />
        </a>

        {/* END: light/dark first in the DOM so that LANGUAGE lands on the
            outer edge of the header, which is where the reference puts it.
            Both are the same round outline button at the same size. */}
        <div className="flex items-center justify-end gap-2 lg:gap-6">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t(ui.themeToggle)}
            aria-pressed={theme === 'dark'}
            title={t(ui.themeToggle)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink lg:h-12 lg:w-12"
          >
            {theme === 'dark' ? (
              <Sun size={16} strokeWidth={1.8} aria-hidden />
            ) : (
              <Moon size={16} strokeWidth={1.8} aria-hidden />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={langAria}
            title={langAria}
            className="font-latin grid h-11 w-11 place-items-center rounded-full border border-line text-[0.8125rem] font-medium text-ink transition-colors duration-200 hover:border-ink lg:h-12 lg:w-12 lg:text-sm"
          >
            {langLabel}
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
            <div className="container-landing grid grid-cols-[1fr_auto_1fr] items-center py-4 md:py-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(ui.close)}
                className="grid h-11 w-11 place-items-center justify-self-start rounded-full border border-line text-ink"
              >
                <X size={18} strokeWidth={1.8} aria-hidden />
              </button>
              <span className="justify-self-center text-orange">
                <Monogram strokeWidth={3.7} className="h-6" />
              </span>
              <span />
            </div>

            <nav aria-label={t(ui.menu)} className="container-landing mt-4 flex flex-col">
              {landingNav.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.045, duration: 0.3, ease: EASE }}
                  className="border-b border-line"
                >
                  <DrawerItem item={item} active={i === 0} onDone={() => setOpen(false)} />
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/**
 * One desktop nav item. The current section carries an accent dot BEFORE its
 * label, so the marker sits on the reading-start side in both scripts.
 *
 * A section that is not built yet renders as text rather than as an anchor:
 * an href pointing at an id that does not exist is a link that silently does
 * nothing when clicked. Flip `ready` in landing.ts as each section lands.
 */
function NavItem({ item, active }: { item: (typeof landingNav)[number]; active: boolean }) {
  const { t } = useLang();

  const label = (
    <span className="inline-flex items-center gap-2">
      {active && <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-orange" />}
      {t(item.label)}
    </span>
  );

  const tone = active ? 'text-orange-ink' : 'text-ink-dim';

  if (!item.ready) return <span className={cn('text-[0.9375rem] lg:text-[1.0625rem]', tone)}>{label}</span>;

  return (
    <a
      href={'#' + item.id}
      aria-current={active ? 'true' : undefined}
      className={cn('text-[0.9375rem] transition-colors duration-200 lg:text-[1.0625rem]', tone, !active && 'hover:text-ink')}
    >
      {label}
    </a>
  );
}

/** The same item at drawer size. */
function DrawerItem({
  item,
  active,
  onDone,
}: {
  item: (typeof landingNav)[number];
  active: boolean;
  onDone: () => void;
}) {
  const { t } = useLang();

  const inner = (
    <span className="inline-flex items-center gap-2.5">
      {active && <span aria-hidden className="block h-2 w-2 rounded-full bg-orange" />}
      {t(item.label)}
    </span>
  );

  const cls = cn('display block py-4 text-display-xs', active ? 'text-orange-ink' : 'text-ink');

  if (!item.ready) return <span className={cls}>{inner}</span>;

  return (
    <a href={'#' + item.id} onClick={onDone} className={cls}>
      {inner}
    </a>
  );
}
