import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Tools from '@/components/Tools';
import Experience from '@/components/Experience';
import Results from '@/components/Results';
import AdsManager from '@/components/AdsManager';
import Positioning from '@/components/Positioning';
import ProjectsOrbit from '@/components/ProjectsOrbit';
import WhyMe from '@/components/WhyMe';
import WhatsNext from '@/components/WhatsNext';
import Contact from '@/components/Contact';
import BackgroundPage from '@/components/BackgroundPage';
import BloomyCase from '@/components/BloomyCase';
import CaseStudy from '@/components/CaseStudy';
import Projects from '@/components/Projects';
import AboutPage from '@/components/about/AboutPage';
import LandingPage from '@/components/landing/LandingPage';
import { caseStudies } from '@/content';
import { useLang } from '@/i18n/LanguageProvider';

/**
 * Home page architecture:
 *   hero -> tools -> experience -> results -> ads manager -> positioning ->
 *   how I work -> projects -> why me -> what's next -> the dark call (which
 *   is also the site footer).
 *
 * `WhyMe` is the positioning section, not a service list: it replaced
 * `Capabilities` on 2026-09-15 and that component is no longer mounted.
 *
 * `Results` is the evidence strip: real dashboard screenshots, shown before
 * any of the writing, so a visitor sees proof before they are asked to read.
 *
 * The Projects marquee carries no figures of its own: it is navigation, and
 * its job is to make a visitor curious enough to open a case study, where the
 * numbers live with their source and period. `Work.tsx` is not mounted — its
 * data lives on in `content/results.ts`, which the case studies draw from.
 */
function Home() {
  return (
    <>
      <Hero />
      <Tools />
      <Experience />
      <Results />
      <AdsManager />
      <Positioning />
      {/*
        <Approach /> — "طريقة شغلي", the twelve steps with the sticky stage and
        its per-step illustrations. Unmounted 2026-09-15 at Mahmoud's request,
        NOT deleted: he may call it back at any time.

        To bring it back: restore the import and this line, and put
        `{ id: 'approach', label: { ar: 'طريقة شغلي', en: 'How I work' } }`
        back at the top of `nav` in content/ui.ts — the nav entry was removed
        with it, because a `#approach` anchor with no section on the page is a
        link that silently does nothing.
      */}
      <ProjectsOrbit />
      <WhyMe />
      <WhatsNext />
    </>
  );
}

const ROUTES: Record<string, () => JSX.Element> = {
  '/projects': Projects,
  '/background': BackgroundPage,
  '/work/bloomy': BloomyCase,
  // Every other project renders from case-studies.ts, so no project in the
  // marquee can ever point at a route that does not exist.
  ...Object.fromEntries(
    caseStudies.map((c) => [`/work/${c.id}`, () => <CaseStudy id={c.id} />]),
  ),
};

/**
 * Pages rebuilt against the 2026-09-13 design reference bring their own
 * header and footer, so they render outside the older Nav/Contact chrome.
 * The list grows as each page is converted.
 */
const STANDALONE: Record<string, () => JSX.Element> = {
  '/about': AboutPage,
  // The one-page landing, built section by section from 2026-09-15.
  '/landing': LandingPage,
};

export default function App() {
  const { route } = useLang();

  const Standalone = STANDALONE[route];
  if (Standalone) return <Standalone />;

  const Page = ROUTES[route] ?? Home;
  return (
    <>
      <Nav />
      <main id="main">
        <Page />
      </main>
      <Contact />
    </>
  );
}
