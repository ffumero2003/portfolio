import { useMemo, useRef, useState } from "react";
import ButtonPrimary from "../portfolio/buttonPrimary";
import RevealOnScroll from "../gsap/revealOnScroll";
import { DirectionAwareHoverCard } from "../ui/directionalAwareCard";
import useIsDesktop from "../hooks/isDesktop";

import UniversidadesImg from "../../assets/projectImages/universidadesImg.png";
import AgeCalcApp from "../../assets/projectImages/ageCalcApp.png";
import WeatherApp from "../../assets/projectImages/weatherApp.png";
import BootstrapPort from "../../assets/projectImages/portfolioBootstrap.png";
import Formulario from "../../assets/projectImages/formulario.png";
import Dashboard from "../../assets/projectImages/dashboard.png";
import Laboq from "../../assets/projectImages/laboqPractice.png";
import StaticEcommerce from "../../assets/projectImages/staticEcommerce.png";
import TailwindPort from "../../assets/projectImages/portfolioTailwind.png";
import Woop from "../../assets/projectImages/woopPracticeReact.png";
import ToDoList from "../../assets/projectImages/toDoList.png";

const PROJECTS = [
  { imageUrl: UniversidadesImg, title: "Universities", learning: "API consumption, dynamic routes with React Router, pagination, and tables with Tailwind.", githubUrl: "https://github.com/ffumero2003/universidades", liveUrl: "https://universidadesporpais.netlify.app/?page=1" },
  { imageUrl: AgeCalcApp, title: "Age Calculator App", learning: "Form validation, date handling in JS, and @font-face.", githubUrl: "https://github.com/ffumero2003/ageCalcApp/tree/main/age-calculator-app-main", liveUrl: "https://agecalcapplication.netlify.app/" },
  { imageUrl: WeatherApp, title: "Weather App", learning: "Autocomplete, OpenWeather API, and saving cities.", githubUrl: "https://github.com/ffumero2003/WeatherApp/tree/main/weather-website-portfolio", liveUrl: "https://weatherapp663.netlify.app/" },
  { imageUrl: BootstrapPort, title: "Bootstrap Portfolio", learning: "Bootstrap 5, AOS, Spline 3D, and icons.", githubUrl: "https://github.com/ffumero2003/bootstrapPortfolio", liveUrl: "https://bootstrapportfolio663.netlify.app/" },
  { imageUrl: Formulario, title: "Form with Validation", learning: "React Hook Form + Zod, Context API, Tailwind.", githubUrl: "https://github.com/ffumero2003/formsPortfolio", liveUrl: "https://formsportfolio.netlify.app/" },
  { imageUrl: Dashboard, title: "CRM MVP", learning: "React Router, detail views, and atomic design.", githubUrl: "https://github.com/ffumero2003/CrmMvp", liveUrl: "https://crmmvp663.netlify.app/" },
  { imageUrl: Laboq, title: "Laboq Practice", learning: "Multipage router, blog posts, and 404 with Tailwind.", githubUrl: "https://github.com/ffumero2003/laboqRouter", liveUrl: "https://laboqrouter.netlify.app/" },
  { imageUrl: StaticEcommerce, title: "Static E-commerce", learning: "Full layout with HTML/CSS.", githubUrl: "https://github.com/ffumero2003/practica-examen-html-css", liveUrl: "https://practicahtmlcssexamen.netlify.app/" },
  { imageUrl: TailwindPort, title: "Tailwind Portfolio", learning: "Portfolio with HTML + Tailwind.", githubUrl: "https://github.com/ffumero2003/TailwindPortfolio", liveUrl: "https://tailwindportfolio663.netlify.app/" },
  { imageUrl: Woop, title: "Woop React Component Practice", learning: "Responsive dashboard and reusable components.", githubUrl: "https://github.com/ffumero2003/woopReactPractice", liveUrl: "https://woopreactpractice.netlify.app/" },
  { imageUrl: ToDoList, title: "To Do List", learning: "DOM manipulation, validations, and responsive design with CSS.", githubUrl: "https://github.com/ffumero2003/ToDoListApp", liveUrl: "https://todolist663.netlify.app/" },
];

const PAGE_SIZE = 6;

export default function ProjectsSection() {
  const isDesktop = useIsDesktop(900);
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef(null);

  const ids = useMemo(() => PROJECTS.map((p) => p.githubUrl), []);

  const toggleShowAll = () => {
    const next = !showAll;
    setShowAll(next);
    
    if (!next && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Solo renderiza los visibles (esto hace que el botón funcione)
  const VISIBLE = showAll ? PROJECTS : PROJECTS.slice(0, PAGE_SIZE);

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-[var(--color-text)]">
        Proyectos / Prácticas
      </h2>

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

      {PROJECTS.length > PAGE_SIZE && (
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
