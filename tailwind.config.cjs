/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  // ✅ GOOD — only scans your source files
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        text: "var(--color-text)",
        outline: "var(--color-outline)",
      },
    },
  },
  plugins: [],
};
