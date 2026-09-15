import SiteHeader from '@/components/SiteHeader';
import AboutHero from './AboutHero';

/**
 * About page, built section by section against the design reference.
 * Done: header + hero. Next: the journey timeline, "what I learned from the
 * other side", how I work / tools, and the dark call — each appended here.
 */
export default function AboutPage() {
  return (
    <>
      <SiteHeader current="/about" />
      <main id="main">
        <AboutHero />
      </main>
    </>
  );
}
