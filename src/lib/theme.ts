export type Theme = 'light' | 'dark';

const KEY = 'theme';

/**
 * Theme state lives on `<html data-theme>`, which is also what the inline
 * script in index.html sets before first paint — so a reload never flashes the
 * wrong palette. Keep the key and the attribute in sync with that script.
 */
/**
 * WHAT THE PAGE IS ACTUALLY SHOWING, which is not the same question as what
 * the operating system prefers.
 *
 * This used to fall back to `prefers-color-scheme`. The inline script does
 * not — it paints dark unless the visitor saved "light" — so on a machine set
 * to light the two disagreed: the page was dark, React thought it was light,
 * and the first press of the toggle computed "the opposite of light", stored
 * "dark", and changed nothing on screen. The control looked broken because
 * the two halves of it were reading different sources.
 *
 * Keep this identical to the script in index.html. Both mean: dark, unless
 * this visitor has chosen light.
 */
export function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement;

  // The transition class is added only for the length of the switch, so the
  // page is not permanently transitioning every colour it owns.
  if (animate) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 320);
  }

  root.setAttribute('data-theme', theme);

  // Keep the browser chrome (mobile address bar) in step with the page.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F0F0F' : '#FFFFFF');
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice just will not persist.
  }
}
