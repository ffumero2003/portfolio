import DirectionAwareHoverCardMain from "../ui/directionalAwareCardMain";
import RevealOnScroll from "../gsap/revealOnScroll";

// Import your project images - update these with your actual main project images
import Slip from "../../assets/mainProjects/slip-image.png";
import PuffZero from "../../assets/mainProjects/puffzero-image.png";
import AuthFlow from "../../assets/mainProjects/auth-flow.png";
import UnderConstruction from "../../assets/underConstruction/progress.png";

const MAIN_PROJECTS = [
  {
    imageUrl: Slip,
    title: "Slip",
    learning:
      "Habit-tracking mobile app with React Native, Zustand state management, persistent storage, and custom logic for streaks and patterns.",
    githubUrl: "https://github.com/ffumero2003/slip",
    liveUrl: "https://slip-landing-dbr7fwtxp-ffumero2003s-projects.vercel.app/",
    githubComingSoon: false,
    tags: ["React Native", "Expo", "Zustand", "Product Logic", "TypeScript"],
  },
  {
    imageUrl: PuffZero,
    title: "PuffZero",
    learning:
      "Building a full-stack mobile app with React Native and Supabase, featuring authentication, onboarding, multi-currency logic, and real-time tracking.",
    githubUrl: "https://github.com/ffumero2003/project2",
    liveUrl: "https://puffzero-landing.vercel.app/",
    githubComingSoon: true,
    tags: ["React Native", "Expo", "Supabase", "Full-Stack", "TypeScript"],
  },
  {
    imageUrl: AuthFlow,
    title: "Auth Flow",
    learning:
      "Built a full-stack authentication system using React, Node.js, Zod, and PostgreSQL. Using Vercel for deployment and Render for the backend.",
    githubUrl: "https://github.com/ffumero2003/auth-flow",
    liveUrl: "https://auth-flow-kappa.vercel.app",
    githubComingSoon: false,
    comingSoon: false,
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Full-Stack"],
  },
  {
    imageUrl: UnderConstruction,
    title: "Micro SaaS",
    learning: "Description of project 4",
    githubUrl: "https://github.com/ffumero2003/project4",
    liveUrl: "https://project4.netlify.app/",
    githubComingSoon: false,
    comingSoon: true,
  },
  {
    imageUrl: UnderConstruction,
    title: "Search/Filter System",
    learning: "Description of project 5",
    githubUrl: "https://github.com/ffumero2003/project5",
    liveUrl: "https://project5.netlify.app/",
    githubComingSoon: false,
    comingSoon: true,
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
            <DirectionAwareHoverCardMain
              imageUrl={p.imageUrl}
              title={p.title}
              learning={p.learning}
              githubUrl={p.githubUrl}
              githubComingSoon={p.githubComingSoon}
              liveUrl={p.liveUrl}
              tags={p.tags}
              className="w-full aspect-[4/3]"
              comingSoon={p.comingSoon}
            />
          </RevealOnScroll>
        ))}
      </div>

      {/* Bottom row - 2 projects centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        {MAIN_PROJECTS.slice(3, 5).map((p, i) => (
          <RevealOnScroll key={p.githubUrl}>
            <DirectionAwareHoverCardMain
              imageUrl={p.imageUrl}
              title={p.title}
              learning={p.learning}
              githubUrl={p.githubUrl}
              liveUrl={p.liveUrl}
              tags={p.tags}
              className="w-full aspect-[4/3]"
              comingSoon={p.comingSoon}
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
