import { useState } from 'react';
import { useLang } from '@/i18n/LanguageProvider';
import { skills } from '@/content';
import { SectionTitle } from './ui';
import { cn } from '@/lib/cn';

/**
 * Section 5 — the orange block.
 *
 * No image beside the list. The only candidates were portrait screenshots
 * that had to be cropped hard to fit a capsule, and a clean list reads better
 * than a badly cropped photo. `skills.items[].proof` stays in the content
 * layer, so the capsule can come back the day there is a picture worth it.
 *
 * Cream on orange is only 3.6:1, and dimming it fails 3:1 outright, so the
 * resting row is near-black (5.4:1) and the active row is the cream one.
 */
export default function Skills() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="skills" className="bg-orange py-20 text-on-orange md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-20">
        <SectionTitle tone="onOrange">{t(skills.title)}</SectionTitle>

        <div>
          <ul className="border-t border-cream/25">
            {skills.items.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id} className="border-b border-cream/25">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(item.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(item.id)}
                    onBlur={() => setActiveId(null)}
                    onClick={() => setActiveId(active ? null : item.id)}
                    aria-pressed={active}
                    className={cn(
                      'display flex w-full items-center gap-3 py-6 text-start text-[clamp(1.25rem,3.6vw,1.75rem)] transition-colors duration-200 ease-out md:py-8',
                      active ? 'text-on-orange' : 'text-on-orange/70',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'h-1.5 w-1.5 shrink-0 rounded-full transition-opacity duration-200',
                        active ? 'bg-cream opacity-100' : 'opacity-0',
                      )}
                    />
                    {t(item.label)}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 inline-flex rounded-full border border-on-orange/30 px-4 py-2 text-xs font-medium text-on-orange md:mt-12 md:text-sm">
            {t(skills.learning)}
          </p>
        </div>
      </div>
    </section>
  );
}
