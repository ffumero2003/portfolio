import React, { useMemo } from "react";
import { InfiniteMovingCards } from "../ui/infiniteMovingCards.jsx";

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
import Vercel from "../../assets/vercel.png"
import Redux from "../../assets/redux-logo.svg"
import Expo from "../../assets/expo.png"
import SupabaseLogo from "../../assets/supabase.png";
import GoogleLogo from "../../assets/google-auth.png";
import ReactNavLogo from "../../assets/react-nav.png"


const SKILLS = [
  { src: Html, alt: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { src: Css, alt: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { src: Js, alt: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { src: Python, alt: "Python", href: "https://www.python.org/" },
  { src: Jquery, alt: "jQuery", href: "https://jquery.com/" },
  { src: Bootstrap, alt: "Bootstrap", href: "https://getbootstrap.com/" },
  { src: Git, alt: "Git", href: "https://git-scm.com/" },
  { src: Github, alt: "GitHub", href: "https://github.com/" },
  { src: Shopify, alt: "Shopify", href: "https://www.shopify.dev/" },
  { src: VsCode, alt: "VS Code", href: "https://code.visualstudio.com/" },
  { src: Figma, alt: "Figma", href: "https://www.figma.com/" },
  { src: ChatGpt, alt: "ChatGPT / OpenAI", href: "https://openai.com/chatgpt" },
  { src: FramerMotionLogo, alt: "Framer Motion", href: "https://www.framer.com/motion/" },
  { src: Gsap, alt: "GSAP", href: "https://greensock.com/gsap/" },
  { src: ReactLogo, alt: "React", href: "https://react.dev/" },
  { src: Tailwind, alt: "Tailwind CSS", href: "https://tailwindcss.com/" },
  { src: Netlify, alt: "Netlify", href: "https://www.netlify.com/" },
  { src: Sass, alt: "Sass", href: "https://sass-lang.com/" },
  { src: JsonServer, alt: "JSON Server", href: "https://www.npmjs.com/package/json-server" },
  { src: Postman, alt: "Postman", href: "https://www.postman.com/" },
  { src: Vite, alt: "Vite", href: "https://vite.dev/" },
  { src: TypeScript, alt: "TypeScript", href: "https://www.typescriptlang.org/" },
  { src: PageSpeed, alt: "PageSpeed", href: "https://pagespeed.web.dev/" },
  { src: Lighthouse, alt: "Lighthouse", href: "https://developer.chrome.com/docs/lighthouse/overview" },
  { src: Vercel, alt: "Vercel", href: "https://vercel.com/" },
  { src: Redux, alt: "Redux", href: "https://react-redux.js.org/"},
  { src: Expo, alt: "Expo", href: "https://expo.dev/"},
  { src: SupabaseLogo, alt: "Supabase", href: "https://supabase.com/" },
  { src: GoogleLogo, alt: "Google Sign-In", href: "https://developers.google.com/identity" },
  { src: ReactNavLogo, alt: "Auth Guards (Navigation)", href: "https://reactnavigation.org/" },

];

export default function SkillsInfinite() {
  const [row1, row2, row3] = useMemo(() => {
    const rows = [[], [], []];
    SKILLS.forEach((it, i) => rows[i % 3].push(it));
    return rows;
  }, []);

  const renderIconOnly = (it) => (
    <a
      href={it.href}
      target="_blank"
      rel="noopener noreferrer"
      title={it.alt}
      className="
        inline-grid place-items-center
        w-20 h-20         
        sm:w-24 sm:h-24     
        md:w-28 md:h-28  
        rounded-xl border
        border-[var(--color-tile-border)] bg-[var(--color-tile)] shadow-sm
        transition-transform duration-200 hover:scale-105
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-[var(--color-accent,theme(colors.indigo.500))]
      "
    >
      <img
        src={it.src}
        alt={it.alt}
        width={88}
        height={88}
        className="
          w-14 h-14
          sm:w-20 sm:h-20
          md:w-24 md:h-24
          object-contain
        "
        loading="lazy"
        decoding="async"
      />
    </a>
  );

  return (
    <section aria-labelledby="skills-title" className="relative w-full px-4 sm:px-6">
      <h2 id="skills-title" className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-text)]">
        Skills
      </h2>

      {/* Line 1 */}
      <InfiniteMovingCards
        items={row1}
        direction="left"
        speed="normal"
        pauseOnHover
        gap="0.75rem"
        bare
        
        renderItem={renderIconOnly}
        itemKey={(it) => it.alt}
      />

      {/* Line 2 */}
      <InfiniteMovingCards
        items={row2}
        direction="right"
        speed="slow"
        pauseOnHover
        gap="0.75rem"
        bare
        
        renderItem={renderIconOnly}
        itemKey={(it) => it.alt}
      />

      {/* Line 3 */}
      <InfiniteMovingCards
        items={row3}
        direction="left"
        speed="normal"
        pauseOnHover
        gap="0.75rem"
        bare
        
        renderItem={renderIconOnly}
        itemKey={(it) => it.alt}
      />
    </section>
  );
}
