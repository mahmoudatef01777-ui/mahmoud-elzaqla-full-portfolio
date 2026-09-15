import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageProvider';
import { nav, navCta, ui, wordmark } from '@/content';
import { cn } from '@/lib/cn';
import { navTarget } from '@/lib/nav';
import Monogram from './ui/Monogram';
import { applyTheme, readTheme, storeTheme, type Theme } from '@/lib/theme';

export default function Nav() {
  const { lang, t, setLang, href, route, navigate } = useLang();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // The inline script in index.html already set the attribute; this just
  // mirrors it into React so the button can show the right icon.
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => setTheme(readTheme()), []);

  /**
   * The mark goes home. Already home, it takes you back to the top instead of
   * reloading the route — and honours reduced motion, which a bare CSS
   * `scroll-behavior: smooth` on <html> would also do, but this path is
   * explicit about it.
   */
  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (route !== '/') {
      navigate('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storeTheme(next);
    applyTheme(next, true);
  };

  // Close the drawer when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
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

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  const langLabel = lang === 'ar' ? ui.langToggle.toEn.label : ui.langToggle.toAr.label;
  const langAria = t(lang === 'ar' ? ui.langToggle.toEn.aria : ui.langToggle.toAr.aria);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-gutter focus:top-3 focus:z-50 focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-on-dark"
      >
        {t(ui.skipToContent)}
      </a>

      {/* Three tracks, the outer two elastic: the mark stays dead centre
          whatever the side groups weigh, at every width. */}
      <div className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-4 md:py-5">
        <div className="flex items-center justify-start gap-2">
          {/* On a phone the menu takes the left track, so the mark can hold
              the middle and the controls the right. */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(ui.menu)}
            aria-expanded={open}
            className="rounded-full border border-ink/20 p-2 text-ink md:hidden"
          >
            <Menu size={18} aria-hidden />
          </button>

          <nav aria-label={t(ui.menu)} className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                {...navTarget(item, { href, route, navigate, reduce: Boolean(reduce) })}
                className="text-sm text-ink-dim transition-colors duration-200 hover:text-ink"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>
        </div>

        <a
          href={href('/')}
          onClick={toTop}
          aria-label={t(wordmark)}
          className="justify-self-center text-orange transition-opacity duration-200 hover:opacity-70"
        >
          <Monogram />
        </a>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t(ui.themeToggle)}
            aria-pressed={theme === 'dark'}
            title={t(ui.themeToggle)}
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream"
          >
            {theme === 'dark' ? (
              <Sun size={15} aria-hidden />
            ) : (
              <Moon size={15} aria-hidden />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={langAria}
            className="rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream"
          >
            {langLabel}
          </button>

          <a
            href={navCta.href}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden rounded-full bg-orange px-5 py-2 text-sm font-medium text-on-orange transition-transform duration-200 ease-out hover:scale-[1.03] md:inline-block"
          >
            {t(navCta.label)}
          </a>

        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-cream md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-page flex items-center justify-between py-4">
              <span className="text-orange" aria-label={t(wordmark)} role="img">
                <Monogram />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(ui.close)}
                className="rounded-full border border-ink/20 p-2 text-ink"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <nav className="container-page mt-8 flex flex-col gap-1">
              {nav.map((item, i) => {
                const target = navTarget(item, {
                  href,
                  route,
                  navigate,
                  reduce: Boolean(reduce),
                });
                return (
                <motion.a
                  key={item.id}
                  href={target.href}
                  onClick={(e) => {
                    setOpen(false);
                    target.onClick(e);
                  }}
                  className={cn(
                    'display border-b border-ink/10 py-4 text-display-sm text-ink',
                    'transition-colors duration-200 hover:text-orange-ink',
                  )}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t(item.label)}
                </motion.a>
                );
              })}

              <a
                href={navCta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 rounded-full bg-orange px-6 py-3.5 text-center text-base font-medium text-on-orange"
              >
                {t(navCta.label)}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
