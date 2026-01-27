import RevealOnScroll from "../gsap/revealOnScroll";
import useIsDesktop from "../hooks/isDesktop";

const TIMELINE = [
  {
    title: "Currently",
    date: "NOW 2026",
    desc: "Studying Business Administration at Lead University (grad. Jan 2026) while managing projects and preparing for first dev job.",
  },
  {
    title: "Took Action",
    date: "MAY 2025",
    desc: "Sought guidance at Cenfotec after realizing my projects weren’t strong enough.",
  },
  {
    title: "Decision",
    date: "JAN 2025",
    desc: "Committed seriously, revisited front-end courses, and moved beyond basics.",
  },
  {
    title: "University Technician",
    date: "AUG 2024",
    desc: "Graduated from CENFOTEC and deepened interest in web development.",
  },
  {
    title: "Cenfotec University",
    date: "OCT 2023",
    desc: "Pursued Software Development Technician degree but didn’t go deep enough.",
  },
  {
    title: "Graduation",
    date: "JUN 2022",
    desc: "Finished Business Admin basics while exploring software development direction.",
  },
];

export default function TimelineSection() {
  const isDesktop = useIsDesktop(1024);

  return (
    <section className="relative w-full py-12 md:py-16 px-3 md:px-4">
      <div className="relative mx-auto max-w-3xl md:max-w-4xl">
        {/* línea vertical */}
        <div className="pointer-events-none absolute inset-y-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px md:w-[2px] rounded bg-[var(--color-outline)]" />
        </div>

        <h2
          className="pl-9 md:pl-2 text-xl md:text-3xl font-extrabold mb-6 md:mb-8"
          style={{ color: "var(--color-primary)" }}
        >
          Timeline
        </h2>

        <ol className="space-y-7 md:space-y-10">
          {TIMELINE.map((step, i) => {
            const isLeft = i % 2 === 0;
            const fromX = isLeft ? -28 : 28;

            return (
              <li
                key={`${step.title}-${i}`}
                className="relative md:grid md:grid-cols-2"
              >
                {/* Punto */}
                <div
                  className="absolute top-2.5 left-3.5 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 rounded-full ring-2 ring-[var(--color-outline)]"
                  style={{ background: "var(--color-primary)" }}
                  aria-hidden
                />

                <div
                  className={
                    isLeft
                      ? "md:col-start-1 pl-9 md:pl-0 md:pr-8"
                      : "md:col-start-2 pl-9 md:pl-8"
                  }
                >
                  <RevealOnScroll
                    enableOnMobile={true}
                    from={{ x: fromX, autoAlpha: 0 }}
                    to={{ x: 0, autoAlpha: 1 }}
                    duration={1}
                    ease="power2.out"
                    start="top 65%"
                    end="+=180"
                    once={false}
                    toggleActions="play none restart none"
                    refreshOnLoad={false}
                  >
                    <div className="relative group/card transform-gpu">
                      <div
                        className="
                          relative rounded-md md:rounded-lg p-3 md:p-7 border border-outline
                          transition-shadow duration-300
                          hover:shadow-[0_0_44px_color-mix(in_srgb,_var(--color-primary)_50%,_transparent)]
                          focus-within:shadow-[0_0_20px_color-mix(in_srgb,_var(--color-primary)_40%,_transparent)]
                        "
                        style={{
                          background: "var(--color-surface)",
                          color: "var(--color-text)",
                        }}
                      >
                        <div
                          className="px-2 py-0.5 rounded border border-outline inline-block"
                          style={{ background: "var(--color-surface)" }}
                        >
                          <p
                            className="text-[10px] md:text-xs tracking-wide uppercase"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {step.date}
                          </p>
                        </div>

                        <h3
                          className="mt-1.5 md:mt-2 text-sm md:text-lg font-bold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {step.title}
                        </h3>

                        <p
                          className="mt-1 text-[13px] leading-relaxed md:text-[15px]"
                          style={{ color: "var(--color-text)" }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
