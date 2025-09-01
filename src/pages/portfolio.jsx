import { lazy, Suspense, useEffect, useState } from "react";
const VantaBg = lazy(() => import("../components/portfolio/vantaBg"));
const Navigation = lazy(() => import("../components/portfolio/navigation"));
const Headline = lazy(() => import("../components/portfolio/title/headline"));
const TimelineSection = lazy(() => import("../components/portfolio/timelineSection"))
const Skills = lazy(() => import("../components/portfolio/skills"))
const AboutMe = lazy(() => import("../components/portfolio/aboutMe"))
const Banner = lazy(() => import("../components/portfolio/banner"))
const ProjectsSection = lazy(() => import("../components/portfolio/projectsSection"))
const ContactSection = lazy(() => import("../components/portfolio/contactSection"))
const Footer = lazy(() => import("../components/portfolio/footer"))

export default function Portfolio() {
  const [showUi, setShowUi] = useState(false);
const [showFx, setShowFx] = useState(false);
const [visible, setVisible] = useState(false);



useEffect(() => {
  const id1 = requestAnimationFrame(() => {
    setShowUi(true);
    const id2 = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id2);
  });
  const idle = "requestIdleCallback" in window
    ? window.requestIdleCallback
    : (fn) => setTimeout(fn, 180);
  const ric = idle(() => setShowFx(true));

  return () => {
    cancelAnimationFrame(id1);
    if ("cancelIdleCallback" in window) window.cancelIdleCallback(ric);
    else clearTimeout(ric);
  };
}, []);


  return (
     <div className="relative min-h-[100svh] " id="app-scroll">
   
        <Suspense fallback={<div style={{padding:16}}>Vanta</div>}>{showFx && <VantaBg />}</Suspense>
      

    <header className="fixed top-0 inset-x-0 z-40">
      <Suspense fallback={<div style={{padding:16}}>Nav</div>}>{showUi && <Navigation />}</Suspense>
    </header>

    <section className="relative z-10 pt-20 md:pt-20 px-4 m-5 flex flex-col md:flex-row items-stretch md:items-center gap-0 md:gap-6">
      <Suspense fallback={<div style={{padding:16}}>Headline</div>}>{showUi && <Headline />}</Suspense>
    </section>

    <section className="px-4 py-8 scroll-mt-24 md:scroll-mt-28" id="about"><Suspense fallback={<div style={{padding:16}}>aboutme</div>}>{showFx && <AboutMe />}</Suspense></section>
    <section className="px-4 py-8"><Suspense fallback={<div style={{padding:16}}>timeline</div>}>{showFx && <TimelineSection />}</Suspense></section>
    <section className="px-4 py-8 scroll-mt-24 md:scroll-mt-28"  id="skills"><Suspense fallback={<div style={{padding:16}}>skills</div>}>{showFx && <Skills />}</Suspense></section>
    <section  id="projects"><Suspense fallback={<div style={{padding:16}}>banner</div>}>{showFx && <Banner />}</Suspense></section>
    <section className="px-4 py-8" ><Suspense fallback={null}>{showFx && <ProjectsSection />}</Suspense></section>
    <section   id="contact"><Suspense fallback={null}>{showFx && <ContactSection />}</Suspense></section>
    <section className="px-4 py-8"><Suspense fallback={null}>{showFx && <Footer />}</Suspense></section>


  </div>
  );
}
