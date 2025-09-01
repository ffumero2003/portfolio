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
  { imageUrl: UniversidadesImg, title: "Universidades", learning: "Consumo de API, rutas dinámicas con React Router, paginación y tablas con Tailwind.", githubUrl: "https://github.com/ffumero2003/universidades", liveUrl: "https://universidadesporpais.netlify.app/?page=1" },
  { imageUrl: AgeCalcApp, title: "Age Calculator App", learning: "Validación de formularios, fechas en JS y @font-face.", githubUrl: "https://github.com/ffumero2003/ageCalcApp/tree/main/age-calculator-app-main", liveUrl: "https://agecalcapplication.netlify.app/" },
  { imageUrl: WeatherApp, title: "Weather App", learning: "Autocomplete, OpenWeather API y guardado de ciudades.", githubUrl: "https://github.com/ffumero2003/WeatherApp/tree/main/weather-website-portfolio", liveUrl: "https://weatherapp663.netlify.app/" },
  { imageUrl: BootstrapPort, title: "Bootstrap Portfolio", learning: "Bootstrap 5, AOS, Spline 3D e íconos.", githubUrl: "https://github.com/ffumero2003/bootstrapPortfolio", liveUrl: "https://bootstrapportfolio663.netlify.app/" },
  { imageUrl: Formulario, title: "Formulario con Validación", learning: "React Hook Form + Zod, Context API, Tailwind.", githubUrl: "https://github.com/ffumero2003/formsPortfolio", liveUrl: "https://formsportfolio.netlify.app/" },
  { imageUrl: Dashboard, title: "CRM MVP", learning: "React Router, vistas detalle y diseño atómico.", githubUrl: "https://github.com/ffumero2003/CrmMvp", liveUrl: "https://crmmvp663.netlify.app/" },
  { imageUrl: Laboq, title: "Laboq Practice", learning: "Router multipage, blog posts y 404 con Tailwind.", githubUrl: "https://github.com/ffumero2003/laboqRouter", liveUrl: "https://laboqrouter.netlify.app/" },
  { imageUrl: StaticEcommerce, title: "Static E-commerce", learning: "Maquetación completa con HTML/CSS.", githubUrl: "https://github.com/ffumero2003/practica-examen-html-css", liveUrl: "https://practicahtmlcssexamen.netlify.app/" },
  { imageUrl: TailwindPort, title: "Tailwind Portfolio", learning: "Portafolio con HTML + Tailwind.", githubUrl: "https://github.com/ffumero2003/TailwindPortfolio", liveUrl: "https://tailwindportfolio663.netlify.app/" },
  { imageUrl: Woop, title: "Woop React Component Practice", learning: "Dashboard responsivo y componentes reutilizables.", githubUrl: "https://github.com/ffumero2003/woopReactPractice", liveUrl: "https://woopreactpractice.netlify.app/" },
  { imageUrl: ToDoList, title: "To Do List", learning: "DOM, validaciones y responsive con CSS.", githubUrl: "https://github.com/ffumero2003/ToDoListApp", liveUrl: "https://todolist663.netlify.app/" },
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
        {PROJECTS.map((p, i) => {
          const hidden = !showAll && i >= PAGE_SIZE; // render ALWAYS, only hide visually
          return (
            <RevealOnScroll
              key={ids[i]}                 // stable key
              enableOnMobile={false}       // no animation on mobile
              duration={0.6}
              once={!isDesktop}
              from={{ y: 14, autoAlpha: 0 }}
              to={{ y: 0, autoAlpha: 1 }}
              ease="power2.out"
              start={isDesktop ? "top 90%" : "top 95%"}
              toggleActions={isDesktop ? "play none none reverse" : "play none none none"}
              className={hidden ? "hidden" : ""}
            >
              <div>
                {/* If your card supports passing props to the <img>, do this: */}
                {/* <DirectionAwareHoverCard imgProps={{ loading:'lazy', decoding:'async', draggable:false }} ... /> */}
                <DirectionAwareHoverCard
                  imageUrl={p.imageUrl}
                  title={p.title}
                  learning={p.learning}
                  githubUrl={p.githubUrl}
                  liveUrl={p.liveUrl}
                  className="w-full aspect-[4/3] md:aspect-[1/1]"
                />
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      {PROJECTS.length > PAGE_SIZE && (
        <div className="mt-6 md:mt-8 flex justify-center">
          <ButtonPrimary text={showAll ? "Ver Menos" : "Ver más"} onClick={toggleShowAll} />
        </div>
      )}
    </section>
  );
}
