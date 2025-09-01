import ButtonPrimary from "./buttonPrimary";
import { useEffect, useState } from "react";
import LazyLordIcon from "../lazyLordIcon";

export default function Banner() {
  const [isDark, setIsDark] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // ← detectar viewport

  const usage = [
    { skills: "React",    bg: "bg-blue-200",    text: "text-blue-700" },
    { skills: "Sass",     bg: "bg-pink-200",    text: "text-pink-700" },
    { skills: "Tailwind", bg: "bg-purple-200",  text: "text-purple-700" },
    { skills: "Router",   bg: "bg-slate-200",   text: "text-slate-700" },
    { skills: "Spline",   bg: "bg-fuchsia-200", text: "text-fuchsia-700" },
  ];

  // Detectar dark mode (tu lógica original)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

 
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      aria-labelledby="built-with"
      className="w-full py-4 px-6 bg-[var(--color-muted)] opacity-85 text-[var(--color-text)]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="w-full">
          <div className="rounded-xl p-6 shadow-sm m-4">
            <h1
              id="built-with"
              className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[var(--color-text)]"
            >
              This website was made with:
            </h1>

            <div className="mt-4 md:mt-6">
              <div
                className="flex flex-wrap justify-center items-center md:justify-start md:items-start gap-2 sm:gap-3 min-w-0"
                role="list"
                aria-label="Technologies used"
              >
                {usage.map(({ skills, bg, text }) => (
                  <span
                    key={skills}
                    role="listitem"
                    className={`${bg} ${text} inline-flex items-center rounded-lg px-3 py-1 text-sm sm:text-base font-medium shadow-sm ring-1 ring-black/5`}
                  >
                    {skills}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-center items-center md:justify-start md:items-start">
                <a
                  href="https://github.com/ffumero2003/portfolioOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ButtonPrimary text="Check Github" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — solo desktop */}
        <div className="hidden md:flex justify-center md:justify-start" aria-hidden={!isDesktop}>
          {isDesktop && (
            <LazyLordIcon
              src="https://cdn.lordicon.com/jectmwqf.json"
              trigger="hover"
              colors={
                isDark
                  ? "primary:#2bb3b1,secondary:#71e6c4"
                  : "primary:#1a344a,secondary:#ffffff"
              }
              width={384}
              height={384}
              className="block"
            />
          )}
        </div>
      </div>
    </section>
  );
}
