import { useMemo, useRef, useState } from "react";
import ButtonPrimary from "../portfolio/buttonPrimary";
import RevealOnScroll from "../gsap/revealOnScroll";
import { DirectionAwareHoverCard } from "../ui/directionalAwareCard";

import UniversidadesImg from "../../assets/projectImages/universidadesImg.png";
import AgeCalcApp from "../../assets/projectImages/ageCalcApp.png";
import WeatherApp from "../../assets/projectImages/weatherApp.png";

import TailwindPort from "../../assets/projectImages/portfolioTailwind.png";
import Woop from "../../assets/projectImages/woopPracticeReact.png";
import ToDoList from "../../assets/projectImages/toDoList.png";
import TipCalculator from "../../assets/projectImages/tipCalculator.png";
import PasteJson from "../../assets/projectImages/rickAndMortyPasteJson.png";
import FinanceLogger from "../../assets/projectImages/financeLoggerNetNinja.png";
import DiscountCalc from "../../assets/projectImages/discountCalculator.png";
import CalorieCalculator from "../../assets/projectImages/calorieCalculator.png";
import ToyotaApi from "../../assets/projectImages/toyotaApiPhoto.png";
import ChampionsLeague from "../../assets/projectImages/playerChampionsLeague.png";

const PROJECTS = [
  {
    imageUrl: ToyotaApi,
    title: "Toyota Cars",
    learning:
      "Atomic Design methodology, component structuring, and data manipulation with Node.js (XLSX to JSON).",
    githubUrl:
      "https://github.com/ffumero2003/disenoAtomico/tree/main/card-component",
    liveUrl: "https://toyotaapi.netlify.app/",
    tags: ["React", "Tailwind", "Node.js", "JavaScript"],
  },

  {
    imageUrl: ChampionsLeague,
    title: "Football Slider",
    learning:
      "Implemented Atomic Design for consistent UI structure. Carousel built with TailwindCSS and Framer Motion for smooth animations.",
    githubUrl:
      "https://github.com/ffumero2003/disenoAtomico/tree/main/gallery-component",
    liveUrl: "https://championsleague663.netlify.app/",
    tags: ["React", "Tailwind", "Responsive Design"],
  },

  {
    imageUrl: TipCalculator,
    title: "Tip Calculator",
    learning:
      "Built an interactive form with React, Tailwind and TypeScript, handling state, validations, and conditional rendering to calculate tips with multi-currency support.",
    githubUrl:
      "https://github.com/ffumero2003/typescript-practices/tree/main/propinas-calc",
    liveUrl: "https://propinascalculator663.netlify.app/",
    tags: ["React", "Tailwind", "Typescript", "Responsive Design"],
  },

  {
    imageUrl: PasteJson,
    title: "Paste Json",
    learning:
      "Learned to fetch paginated API data with Promise.all, apply TypeScript types generated from PasteJSON, and display results with responsive TailwindCSS cards.",
    githubUrl:
      "https://github.com/ffumero2003/typescript-practices/tree/main/paste-json-typescript",
    liveUrl: "https://pastejsontypescript.netlify.app/",
    tags: ["React", "Typescript", "Tailwind"],
  },

  {
    imageUrl: FinanceLogger,
    title: "Finance Logger",
    learning:
      "Followed the Net Ninja TypeScript course to build a Finance Logger, practicing classes, interfaces, generics, and form handling with DOM manipulation.",
    githubUrl:
      "https://github.com/ffumero2003/typescript-practices/tree/main/netNinjaCourse/typescript-tutorial",
    liveUrl: "https://financeloggernetninja.netlify.app/",
    tags: ["React", "Typescript", "Responsive Design"],
  },

  {
    imageUrl: DiscountCalc,
    title: "Discount Calculator",
    learning:
      "Practiced building a modular discount calculator with React and TypeScript, using a custom hook for business logic, reusable components, input validation, and TailwindCSS styling.",
    githubUrl:
      "https://github.com/ffumero2003/typescript-practices/tree/main/discount-calculator",
    liveUrl: "https://discountcalculator663.netlify.app/",
    tags: ["React", "Typescript", "Tailwind", "Responsive Design"],
  },

  {
    imageUrl: CalorieCalculator,
    title: "Calorie Calculator",
    learning:
      "Developed a Calorie Calculator with React and TypeScript, applying formulas for BMR, TDEE, and BMI through a custom hook, reusable form components, and TailwindCSS styling.",
    githubUrl:
      "https://github.com/ffumero2003/typescript-practices/tree/main/calorie-calculator",
    liveUrl: "https://caloriecalculator663.netlify.app/",
    tags: ["React", "Typescript", "Tailwind", "Responsive Design"],
  },

  {
    imageUrl: UniversidadesImg,
    title: "Universities",
    learning:
      "API consumption, dynamic routes with React Router, pagination, and tables with Tailwind.",
    githubUrl: "https://github.com/ffumero2003/universidades",
    liveUrl: "https://universidadesporpais.netlify.app/?page=1",
    tags: ["React", "Tailwind", "Responsive Design"],
  },

  {
    imageUrl: AgeCalcApp,
    title: "Age Calculator App",
    learning: "Form validation, date handling in JS, and @font-face.",
    githubUrl:
      "https://github.com/ffumero2003/ageCalcApp/tree/main/age-calculator-app-main",
    liveUrl: "https://agecalcapplication.netlify.app/",
    tags: ["Css", "JavaScript", "Responsive Design"],
  },

  {
    imageUrl: WeatherApp,
    title: "Weather App",
    learning: "Autocomplete, OpenWeather API, and saving cities.",
    githubUrl:
      "https://github.com/ffumero2003/WeatherApp/tree/main/weather-website-portfolio",
    liveUrl: "https://weatherapp663.netlify.app/",
    tags: ["React", "Css", "JavaScript"],
  },

  {
    imageUrl: TailwindPort,
    title: "Tailwind Portfolio",
    learning: "Portfolio with HTML + Tailwind.",
    githubUrl: "https://github.com/ffumero2003/TailwindPortfolio",
    liveUrl: "https://tailwindportfolio663.netlify.app/",
    tags: ["Tailwind", "Css"],
  },

  {
    imageUrl: Woop,
    title: "Woop React Component Practice",
    learning: "Responsive dashboard and reusable components.",
    githubUrl: "https://github.com/ffumero2003/woopReactPractice",
    liveUrl: "https://woopreactpractice.netlify.app/",
    tags: ["React", "Tailwind", "Responsive Design"],
  },

  {
    imageUrl: ToDoList,
    title: "To Do List",
    learning: "DOM manipulation, validations, and responsive design with CSS.",
    githubUrl: "https://github.com/ffumero2003/ToDoListApp",
    liveUrl: "https://todolist663.netlify.app/",
    tags: ["Css", "JavaScript", "Responsive Design"],
  },
];

const PAGE_SIZE = 6;

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    PROJECTS.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleShowAll = () => {
    const next = !showAll;
    setShowAll(next);

    if (!next && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const FILTERED =
    selectedTags.length === 0
      ? PROJECTS
      : PROJECTS.filter((p) =>
          selectedTags.some((tag) => p.tags?.includes(tag)),
        );

  const VISIBLE = showAll ? FILTERED : FILTERED.slice(0, PAGE_SIZE);

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[var(--color-text)]">
        Other Projects/Practices
      </h2>

      {/* Outer container: scrollable on mobile, wraps on md+ */}
      <div className="flex gap-1 mb-6 md:mb-8 bg-surface border border-color-outline border-[var(--color-outline)] rounded-3xl p-4 overflow-x-auto md:flex-wrap">
        <button
          onClick={() => setSelectedTags([])}
          className={`px-3 py-1.5 rounded-full text-sm md:text-md transition-colors ${
            selectedTags.length === 0
              ? "bg-[var(--color-primary)] text-white font-bold "
              : "bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-primary-hover)]"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-2 rounded-full text-sm md:text-md transition-colors whitespace-nowrap ${
              selectedTags.includes(tag)
                ? "bg-[var(--color-primary)] text-white font-bold"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text)] hover:bg-[var(--color-primary-hover)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="
          grid justify-center
          gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6
          [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]
          max-w-5xl mx-auto"
      >
        {VISIBLE.map((p, i) => (
          <RevealOnScroll
            key={p.githubUrl}
            enableOnMobile={true}
            from={{ y: 14, autoAlpha: 0, scale: 0.985 }}
            to={{ y: 0, autoAlpha: 1, scale: 1 }}
            duration={0.55}
            ease="power3.out"
            start="top 85%"
            end="+=180"
            once={false}
            toggleActions="play none restart none"
            refreshOnLoad={true}
          >
            <DirectionAwareHoverCard
              imageUrl={p.imageUrl}
              title={p.title}
              learning={p.learning}
              githubUrl={p.githubUrl}
              liveUrl={p.liveUrl}
              className="w-full aspect-[4/3] md:aspect-[1/1]"
            />
          </RevealOnScroll>
        ))}
      </div>

      {FILTERED.length > PAGE_SIZE && (
        <div className="mt-6 md:mt-8 flex justify-center">
          <ButtonPrimary
            text={showAll ? "See Less" : "See More"}
            onClick={toggleShowAll}
          />
        </div>
      )}
    </section>
  );
}
