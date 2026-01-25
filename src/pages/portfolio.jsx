import { lazy, Suspense } from "react";

const VantaBg = lazy(() => import("../components/portfolio/vantaBg"));
const Navigation = lazy(() => import("../components/portfolio/navigation"));
const Headline = lazy(() => import("../components/portfolio/title/headline"));
const TimelineSection = lazy(() => import("../components/portfolio/timelineSection"));
const Skills = lazy(() => import("../components/portfolio/skills"));
const AboutMe = lazy(() => import("../components/portfolio/aboutMe"));
const Banner = lazy(() => import("../components/portfolio/banner"));
const ProjectsSection = lazy(() => import("../components/portfolio/projectsSection"));
const ContactSection = lazy(() => import("../components/portfolio/contactSection"));
const Footer = lazy(() => import("../components/portfolio/footer"));
const MainProjects = lazy(() => import("../components/portfolio/mainProjects"));

export default function Portfolio() {
  return (
    <div className="relative min-h-[100svh]" id="app-scroll">
      <Suspense fallback={null}><VantaBg /></Suspense>

      <header className="fixed top-0 inset-x-0 z-40">
        <Suspense fallback={null}><Navigation /></Suspense>
      </header>

      <section className="relative z-10 pt-20 md:pt-20 px-4 m-5 flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-6">
        <Suspense fallback={null}><Headline /></Suspense>
      </section>

      <section className="px-4 py-8 scroll-mt-24 md:scroll-mt-28" id="about">
        <Suspense fallback={null}><AboutMe /></Suspense>
      </section>

      <section className="px-4 py-8">
        <Suspense fallback={null}><TimelineSection /></Suspense>
      </section>

      <section className="px-4 py-8 scroll-mt-24 md:scroll-mt-28" id="skills">
        <Suspense fallback={null}><Skills /></Suspense>
      </section>

      <section id="projects">
        <Suspense fallback={null}><Banner /></Suspense>
      </section>

      <section className="px-4 py-8">
        <Suspense fallback={null}><MainProjects /></Suspense>
      </section>

      <section className="px-4 py-8">
        <Suspense fallback={null}><ProjectsSection /></Suspense>
      </section>

      <section id="contact">
        <Suspense fallback={null}><ContactSection /></Suspense>
      </section>

      <section className="px-4 py-8">
        <Suspense fallback={null}><Footer /></Suspense>
      </section>
    </div>
  );
}