# Portfolio

Personal portfolio site for Felipe Fumero, built with React 19 and Vite. Single-page layout covering intro/headline, about me, career timeline, skills, and several project showcases (software engineering + AI, full-stack builds, data engineering, data analytics/BI, and smaller practice projects), plus a contact section.

## Tech stack

- **React 19** + **React Router 7** (client-side routing via `createBrowserRouter`)
- **Vite 7** for dev server and build
- **Tailwind CSS 3** + **Sass** for styling
- **GSAP** and **Framer Motion / motion** for animation and scroll reveals
- **Three.js** via `@react-three/fiber` / `@react-three/drei`, plus **Vanta.js** and **Spline** for background/3D visuals
- **Lottie** (`lottie-react`, `lottie-web`) for vector animations
- **EmailJS** for the contact form
- **Font Awesome** for icons

## Project structure

```
src/
  App.jsx                 # Router entry point
  routes.jsx               # Route definitions
  layout/rootLayout.jsx     # Shared layout wrapper
  pages/portfolio.jsx       # Main page, composes all sections
  components/
    portfolio/               # Page sections (headline, aboutMe, skills,
                              #   timelineSection, projectsSection,
                              #   fullStackBuilds, dataEngineering,
                              #   dataAnalytics, softwareEngineeringAI,
                              #   contactSection, footer, navigation, ...)
    ui/                       # Reusable UI primitives (tooltip, cards)
    gsap/, hooks/             # Animation helpers and custom hooks
  utils/                    # GSAP setup, scramble text, lord-icon init
  styles/                   # Sass reset, variables, global styles
  assets/                   # Images, logos, and project screenshots
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

Deployed via Vercel (`vercel.json` rewrites all routes to `index.html` for client-side routing).
