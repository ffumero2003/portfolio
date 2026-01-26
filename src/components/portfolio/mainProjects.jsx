import { DirectionAwareHoverCard } from "../ui/directionalAwareCard";
import RevealOnScroll from "../gsap/revealOnScroll";

// Import your project images - update these with your actual main project images
import Slip from "../../assets/mainProjects/slip-image.png";
import PuffZero from "../../assets/mainProjects/puffzero-image.png";
import Project3 from "../../assets/projectImages/tipCalculator.png";
import Project4 from "../../assets/projectImages/universidadesImg.png";
import Project5 from "../../assets/projectImages/weatherApp.png";

const MAIN_PROJECTS = [
  {
    imageUrl: Slip,
    title: "Slip",
    learning: "Built a habit-tracking mobile app with React Native and Expo, featuring Zustand for state management, AsyncStorage for persistence, and custom hooks for streak calculations and pattern detection.",
    githubUrl: "https://github.com/ffumero2003/slip",
    liveUrl: "https://slip-landing-dbr7fwtxp-ffumero2003s-projects.vercel.app/",
    githubComingSoon: false,
  },
  {
    imageUrl: PuffZero,
    title: "PuffZero",
    learning: "Building a full-stack mobile app with React Native and Supabase, featuring advanced authentication flows, multi-step onboarding, multi-currency logic, MVVM architecture, and real-time progress tracking with analytics.",
    githubUrl: "https://github.com/ffumero2003/project2",
    liveUrl: "https://puffzero-landing.vercel.app/",
    githubComingSoon: true,
  },
  {
    imageUrl: Project3,
    title: "Project 3",
    learning: "Description of project 3",
    githubUrl: "https://github.com/ffumero2003/project3",
    liveUrl: "https://project3.netlify.app/",
    githubComingSoon: false,
  },
  {
    imageUrl: Project4,
    title: "Project 4",
    learning: "Description of project 4",
    githubUrl: "https://github.com/ffumero2003/project4",
    liveUrl: "https://project4.netlify.app/",
    githubComingSoon: false,
  },
  {
    imageUrl: Project5,
    title: "Project 5",
    learning: "Description of project 5",
    githubUrl: "https://github.com/ffumero2003/project5",
    liveUrl: "https://project5.netlify.app/",
    githubComingSoon: false,
  },
];

export default function MainProjects() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[var(--color-text)]">
        Main Projects
      </h2>

      {/* Top row - 3 projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {MAIN_PROJECTS.slice(0, 3).map((p, i) => (
          <RevealOnScroll key={p.githubUrl}>
            <DirectionAwareHoverCard
              imageUrl={p.imageUrl}
              title={p.title}
              learning={p.learning}
              githubUrl={p.githubUrl}
              githubComingSoon={p.githubComingSoon}
              liveUrl={p.liveUrl}
              className="w-full aspect-[4/3]"
            />
          </RevealOnScroll>
        ))}
      </div>

      {/* Bottom row - 2 projects centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        {MAIN_PROJECTS.slice(3, 5).map((p, i) => (
          <RevealOnScroll key={p.githubUrl}>
            <DirectionAwareHoverCard
              imageUrl={p.imageUrl}
              title={p.title}
              learning={p.learning}
              githubUrl={p.githubUrl}
              liveUrl={p.liveUrl}
              className="w-full aspect-[4/3]"
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}