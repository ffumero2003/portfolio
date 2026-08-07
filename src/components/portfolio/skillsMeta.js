// Category shown as the second line of a skill's tooltip. Keyed by the `alt`
// string in the SKILLS array in ./skills.jsx — keep the two in sync whenever a
// tool is added or renamed.
export const CATEGORIES = {
  BigQuery: "Data Engineering",
  dbt: "Data Engineering",
  "Apache Airflow": "Data Engineering",
  Snowflake: "Data Engineering",
  PostgreSQL: "Data Engineering",
  pandas: "Data Engineering",
  "Looker Studio": "Analytics",
  PageSpeed: "Analytics",
  Lighthouse: "Analytics",
  "Django (REST Framework)": "Backend",
  Flask: "Backend",
  Redis: "Backend",
  Python: "Backend",
  "JSON Server": "Backend",
  Supabase: "Backend",
  "Google Sign-In": "Backend",
  "Auth Guards (Navigation)": "Backend",
  Postman: "Backend",
  "Claude (Anthropic API)": "AI",
  "ChatGPT / OpenAI": "AI",
  "Cursor AI": "AI",
  React: "Frontend",
  "Tailwind CSS": "Frontend",
  TypeScript: "Frontend",
  JavaScript: "Frontend",
  HTML5: "Frontend",
  CSS3: "Frontend",
  Sass: "Frontend",
  Bootstrap: "Frontend",
  jQuery: "Frontend",
  Redux: "Frontend",
  "Framer Motion": "Frontend",
  GSAP: "Frontend",
  Leaflet: "Frontend",
  Expo: "Mobile",
  Docker: "Cloud & DevOps",
  Netlify: "Cloud & DevOps",
  Vercel: "Cloud & DevOps",
  Shopify: "Cloud & DevOps",
  Git: "Tooling",
  GitHub: "Tooling",
  "VS Code": "Tooling",
  Figma: "Tooling",
  Vite: "Tooling",
};

// Category lookup that cannot throw on an unmapped or renamed skill, so adding
// a logo without touching CATEGORIES degrades to a label rather than a crash.
export function getCategory(alt) {
  return CATEGORIES[alt] ?? "Tooling";
}
