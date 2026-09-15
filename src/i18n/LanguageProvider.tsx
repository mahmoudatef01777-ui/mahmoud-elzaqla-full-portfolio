import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DIR, hrefFor, langFromPath, pathForLang, routeFromPath, type Lang } from './config';
import type { Localized } from '@/content/types';

interface LanguageValue {
  lang: Lang;
  /** Current path with the language prefix stripped. */
  route: string;
  /** Go to a route, keeping the current language. */
  navigate: (route: string) => void;
  /** Build an href for a route in the current language. */
  href: (route: string) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  setLang: (next: Lang) => void;
  /** Pick the current language out of a { en, ar } value. */
  t: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    langFromPath(typeof window === 'undefined' ? '/' : window.location.pathname),
  );
  const [route, setRoute] = useState<string>(() =>
    routeFromPath(typeof window === 'undefined' ? '/' : window.location.pathname),
  );

  // Keep <html lang dir> in sync — drives RTL and the Arabic font swap.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = DIR[lang];
  }, [lang]);

  // Back/forward buttons change the language too.
  useEffect(() => {
    const onPop = () => {
      setLangState(langFromPath(window.location.pathname));
      setRoute(routeFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const setLang = useCallback((next: Lang) => {
    const path = pathForLang(next, window.location.pathname);
    window.history.pushState({}, '', path + window.location.hash);
    setLangState(next);
  }, []);

  const navigate = useCallback(
    (next: string) => {
      window.history.pushState({}, '', hrefFor(lang, next));
      setRoute(next);
      window.scrollTo(0, 0);
    },
    [lang],
  );

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      route,
      navigate,
      href: (r: string) => hrefFor(lang, r),
      dir: DIR[lang],
      isRTL: lang === 'ar',
      setLang,
      t: <T,>(v: Localized<T>) => v[lang],
    }),
    [lang, route, navigate, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
