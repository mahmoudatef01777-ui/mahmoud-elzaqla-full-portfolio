import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';

/**
 * The one-page landing, route `/landing`.
 *
 * Built ONE SECTION AT A TIME against Mahmoud's 2026-09-15 reference. Right
 * now that is the header and the hero, and nothing else — no placeholders for
 * the sections still to come, because an empty section is a thing a visitor
 * can scroll into.
 *
 * It renders outside the older Nav/Contact chrome (see STANDALONE in
 * App.tsx), so the existing home page and case studies are untouched.
 */
export default function LandingPage() {
  return (
    <div data-surface="landing" className="min-h-svh bg-cream">
      <LandingHeader />
      <main id="main">
        <LandingHero />
      </main>
    </div>
  );
}
