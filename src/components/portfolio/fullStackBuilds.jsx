"use client";
import ProjectDeepCard from "./projectDeepCard";
// Slip and PuffZero use background-stripped copies of their mockups: the original
// exports bake a flat grey canvas behind the phone, which clashes with the card
// surface. Regenerate these if the mockups are ever re-exported.
import Slip from "../../assets/mainProjects/slip-image-transparent.png";
import PuffZero from "../../assets/mainProjects/puffzero-image-transparent.png";
import AuthFlow from "../../assets/mainProjects/auth-flow.png";
import JobFlow from "../../assets/mainProjects/job-flow.png";
import SearchFilterSystem from "../../assets/mainProjects/search-system.png";

// Shipped full-stack applications. These are the short card variant: photo,
// overview, and links only — no demo video, architecture diagram, screenshot
// gallery, or feature list, since each project's live page carries the real
// explanation. Adding a `features` array to any single entry makes that block
// appear for that card alone; the card handles it.
//
// DRAFT COPY — every `overview` below is written from the one-line description
// and tags that were already on these projects, not from their READMEs. Review
// and correct.
const PROJECTS = [
  {
    title: "Slip",
    oneLiner:
      "Habit-tracking mobile app with Zustand, persistent storage, and custom streak logic.",
    overview:
      "A habit tracker built around streak logic written from scratch rather than pulled from a library — the rules for what continues a streak, what breaks it, and what a missed day costs are the product. State lives in Zustand with persistent storage, so progress survives closing and reopening the app. Built in TypeScript on React Native and Expo.",
    tech: ["React Native", "Expo", "Zustand", "Product Logic", "TypeScript"],
    poster: Slip,
    githubUrl: "https://github.com/ffumero2003/slip",
    liveUrl: "https://slip-landing-dbr7fwtxp-ffumero2003s-projects.vercel.app/",
    liveLabel: "Live",
  },

  {
    title: "PuffZero",
    oneLiner:
      "Full-stack mobile app with Supabase auth, onboarding, multi-currency, and real-time tracking.",
    overview:
      "A quit-tracking mobile app with a real backend behind it: Supabase handles authentication and persistence, and tracking updates in real time rather than on refresh. Includes a guided onboarding flow and multi-currency support, so the money-saved figures make sense outside a single locale. Built in TypeScript on React Native and Expo.",
    tech: ["React Native", "Expo", "Supabase", "Full-Stack", "TypeScript"],
    poster: PuffZero,
    githubUrl: "https://github.com/ffumero2003/portfolio",
    githubComingSoon: false, // repo not public yet — renders a disabled chip
    liveUrl: "https://puffzero-landing.vercel.app/",
    liveLabel: "Live",
  },

  {
    title: "Auth Flow",
    oneLiner: "Full-stack auth system with React, Node.js, Zod, and PostgreSQL.",
    overview:
      "A complete authentication system built end to end rather than handed to a provider — React on the front, Node.js and PostgreSQL behind it, with Zod validating input at the boundary so malformed data never reaches the database. Built to understand the full path a credential travels, from form to persisted user.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Full-Stack"],
    poster: AuthFlow,
    githubUrl: "https://github.com/ffumero2003/auth-flow",
    liveUrl: "https://auth-flow-kappa.vercel.app",
    liveLabel: "Live",
  },

  {
    title: "JobFlow (Micro SaaS)",
    oneLiner:
      "Job-application CRM with kanban, filters, analytics, and local-first persistence.",
    overview:
      "A CRM for tracking job applications through their stages: a kanban board for pipeline, filters for narrowing a long list, and an analytics view for the shape of a search over time. Persistence is local-first, so the data belongs to the browser and the app works without an account or a backend to keep running.",
    tech: [
      "React",
      "State Management",
      "LocalStorage",
      "Dashboard",
      "Micro SaaS",
      "Tailwind",
    ],
    poster: JobFlow,
    githubUrl: "https://github.com/ffumero2003/job-flow",
    liveUrl: "https://job-flow-navy.vercel.app/",
    liveLabel: "Live",
  },

  {
    title: "Search/Filter System",
    oneLiner:
      "Book discovery dashboard with OpenLibrary API, debounced search, dynamic filters, and localStorage persistence.",
    overview:
      "A book discovery dashboard over the OpenLibrary API, built as a study of search UX done properly: typing is debounced so a keystroke doesn't become a request, filters derive from the result set rather than a hardcoded list, and selections persist to localStorage. Shared state runs through the Context API with the fetching logic pulled into custom hooks.",
    tech: [
      "React",
      "API Integration",
      "Context API",
      "Custom Hooks",
      "Tailwind CSS",
      "LocalStorage",
    ],
    poster: SearchFilterSystem,
    githubUrl: "https://github.com/ffumero2003/search-system",
    liveUrl: "https://search-system-pi.vercel.app/",
    liveLabel: "Live",
  },
];

// Second project section. Reorder PROJECTS above to change the card order.
export default function FullStackBuilds() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="full-stack-builds"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        Full-Stack Builds
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        Shipped applications, mobile and web — auth, real-time data, product
        logic, and the state management that holds it together.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectDeepCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
