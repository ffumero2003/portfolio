import React, { useMemo } from "react";
import { MarqueeTooltipRow } from "../ui/marqueeTooltipRow";
import { getCategory } from "./skillsMeta";
import Html from "../../assets/html.png";
import Css from "../../assets/css-3.png";
import Js from "../../assets/js.png";
import Python from "../../assets/python.png";
import Jquery from "../../assets/jQuery.png";
import Bootstrap from "../../assets/bootstrap.png";
import Git from "../../assets/git.png";
import Github from "../../assets/github.png";
import Shopify from "../../assets/shopify.png";
import VsCode from "../../assets/vsCode.png";
import Figma from "../../assets/figma.png";
import ChatGpt from "../../assets/chat-gpt.png";
import FramerMotionLogo from "../../assets/framerMotion.png";
import Gsap from "../../assets/gsap.webp";
import ReactLogo from "../../assets/react.svg";
import Tailwind from "../../assets/tailwind.svg";
import Netlify from "../../assets/Netlify.png";
import Postman from "../../assets/postman.svg";
import Sass from "../../assets/sass.png";
import JsonServer from "../../assets/jsonServer.png";
import Vite from "../../assets/vite.png";
import TypeScript from "../../assets/typescript.png";
import PageSpeed from "../../assets/pageSpeed.svg";
import Lighthouse from "../../assets/lighthouse-logo.svg";
import Vercel from "../../assets/vercel.png";
import Redux from "../../assets/redux-logo.svg";
import Expo from "../../assets/expo.png";
import SupabaseLogo from "../../assets/supabase.png";
import GoogleLogo from "../../assets/google-auth.png";
import ReactNavLogo from "../../assets/react-nav.png";
import Cursor from "../../assets/cursor-ai.png";
import BigQuery from "../../assets/BigQuery.png";
import Dbt from "../../assets/dbt.png";
import Airflow from "../../assets/airflow.png";
import Snowflake from "../../assets/snowflake.png";
import Postgres from "../../assets/postgres.png";
import Docker from "../../assets/docker.png";
import Looker from "../../assets/looker-icon.png";
import Claude from "../../assets/claude-logo.png";
import Flask from "../../assets/flask.png";
import Pandas from "../../assets/pandas.png";
import Django from "../../assets/django.svg";
import Redis from "../../assets/redis.svg";
import Leaflet from "../../assets/leaflet.png";

const SKILLS = [
  { src: BigQuery, alt: "BigQuery", href: "https://cloud.google.com/bigquery" },
  { src: Dbt, alt: "dbt", href: "https://www.getdbt.com/" },
  { src: Airflow, alt: "Apache Airflow", href: "https://airflow.apache.org/" },
  { src: Snowflake, alt: "Snowflake", href: "https://www.snowflake.com/" },
  { src: Postgres, alt: "PostgreSQL", href: "https://www.postgresql.org/" },
  { src: Docker, alt: "Docker", href: "https://www.docker.com/" },
  {
    src: Django,
    alt: "Django (REST Framework)",
    href: "https://www.djangoproject.com/",
  },
  { src: Redis, alt: "Redis", href: "https://redis.io/" },
  {
    src: Looker,
    alt: "Looker Studio",
    href: "https://lookerstudio.google.com/",
  },
  {
    src: Claude,
    alt: "Claude (Anthropic API)",
    href: "https://www.anthropic.com/claude",
  },
  { src: Flask, alt: "Flask", href: "https://flask.palletsprojects.com/" },
  { src: Pandas, alt: "pandas", href: "https://pandas.pydata.org/" },
  {
    src: Html,
    alt: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    src: Css,
    alt: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    src: Js,
    alt: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { src: Python, alt: "Python", href: "https://www.python.org/" },
  { src: Jquery, alt: "jQuery", href: "https://jquery.com/" },
  { src: Bootstrap, alt: "Bootstrap", href: "https://getbootstrap.com/" },
  { src: Git, alt: "Git", href: "https://git-scm.com/" },
  { src: Github, alt: "GitHub", href: "https://github.com/" },
  { src: Shopify, alt: "Shopify", href: "https://www.shopify.dev/" },
  { src: VsCode, alt: "VS Code", href: "https://code.visualstudio.com/" },
  { src: Figma, alt: "Figma", href: "https://www.figma.com/" },
  { src: ChatGpt, alt: "ChatGPT / OpenAI", href: "https://openai.com/chatgpt" },
  {
    src: FramerMotionLogo,
    alt: "Framer Motion",
    href: "https://www.framer.com/motion/",
  },
  { src: Gsap, alt: "GSAP", href: "https://greensock.com/gsap/" },
  { src: ReactLogo, alt: "React", href: "https://react.dev/" },
  { src: Tailwind, alt: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { src: Netlify, alt: "Netlify", href: "https://www.netlify.com/" },
  { src: Sass, alt: "Sass", href: "https://sass-lang.com/" },
  {
    src: JsonServer,
    alt: "JSON Server",
    href: "https://www.npmjs.com/package/json-server",
  },
  { src: Postman, alt: "Postman", href: "https://www.postman.com/" },
  { src: Vite, alt: "Vite", href: "https://vite.dev/" },
  {
    src: TypeScript,
    alt: "TypeScript",
    href: "https://www.typescriptlang.org/",
  },
  { src: PageSpeed, alt: "PageSpeed", href: "https://pagespeed.web.dev/" },
  {
    src: Lighthouse,
    alt: "Lighthouse",
    href: "https://developer.chrome.com/docs/lighthouse/overview",
  },
  { src: Vercel, alt: "Vercel", href: "https://vercel.com/" },
  { src: Redux, alt: "Redux", href: "https://react-redux.js.org/" },
  { src: Expo, alt: "Expo", href: "https://expo.dev/" },
  { src: SupabaseLogo, alt: "Supabase", href: "https://supabase.com/" },
  {
    src: GoogleLogo,
    alt: "Google Sign-In",
    href: "https://developers.google.com/identity",
  },
  {
    src: ReactNavLogo,
    alt: "Auth Guards (Navigation)",
    href: "https://reactnavigation.org/",
  },
  { src: Cursor, alt: "Cursor AI", href: "https://www.cursor.com/" },
  { src: Leaflet, alt: "Leaflet", href: "https://leafletjs.com/" },
];

// One entry per scrolling row: direction and how many seconds a full loop
// takes. Higher duration is slower. Adding a row here automatically
// redistributes the skills across all rows.
const ROWS = [
  { direction: "left", duration: 55 },
  { direction: "right", duration: 70 },
  { direction: "left", duration: 55 },
];

export default function SkillsInfinite() {
  // Deal skills round-robin so each row mixes categories rather than clumping
  // all the data tools onto one line.
  const rows = useMemo(() => {
    const buckets = ROWS.map(() => []);
    SKILLS.forEach((skill, i) => {
      buckets[i % ROWS.length].push({
        id: i,
        name: skill.alt,
        designation: getCategory(skill.alt),
        image: skill.src,
      });
    });
    return buckets;
  }, []);

  return (
    <section
      aria-labelledby="skills-title"
      className="relative w-full px-4 sm:px-6"
    >
      <h2
        id="skills-title"
        className="text-3xl md:text-4xl font-bold text-[var(--color-text)]"
      >
        Skills
      </h2>
      <p className="mt-1 text-sm opacity-70 text-[var(--color-text)]">
        Hover or tap a logo for its name.
      </p>

      {/* Every row reserves ~80px above itself so its tooltip is not clipped.
          That space is empty until something is hovered, so the whole stack is
          pulled up under the heading and each row after the first is pulled up
          again — otherwise the reserved space reads as a large blank gap.
          DOM order matters: later rows paint on top, so a row's tooltip is
          never hidden behind the row above it. */}
      <div className="-mt-12 flex flex-col">
        {rows.map((items, i) => (
          <div key={i} className={i > 0 ? "-mt-14" : ""}>
            <MarqueeTooltipRow
              items={items}
              direction={ROWS[i].direction}
              duration={ROWS[i].duration}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
