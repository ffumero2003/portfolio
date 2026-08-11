import RevealOnScroll from "../gsap/revealOnScroll";
import useIsDesktop from "../hooks/isDesktop";

const TIMELINE = [
  {
    title: "Software Engineer",
    date: "AUG 2026 – PRESENT",
    desc: "Building open source AI integrations, sample apps, SDK extensions, and reference implementations in Python, TypeScript, Go, and Rust, using AI-assisted tools like Claude Code while validating correctness, security, and performance. Contributing through code, reviews, and maintenance so repositories stay tested, documented, and ready for external adoption.",
  },
  {
    title: "Data Engineer",
    date: "MAR 2026 – JUN 2026",
    desc: "Completed the CriticalRiver Data & AI Freshers Program (Mar–May 2026), building end-to-end pipelines with Apache Airflow, dbt, BigQuery, and Snowflake. Earned 18 official Anthropic AI/LLM certifications and am finishing a BBA at LEAD University (grad. Aug 2026).",
  },
  {
    title: "Software Developer Intern",
    date: "OCT 2025 – JAN 2026",
    desc: "Interned at PayFacility, a LATAM fintech, inside the DS Spread payment sandbox — testing and debugging authorization, reversal, and error-handling flows with ADB/Logcat.",
  },
  {
    title: "Technical Mentorship",
    date: "JUN – NOV 2025",
    desc: "Mentored by David Luna (Senior Developer at Novacomp) in React architecture, component design patterns, advanced hooks, and state-management strategies.",
  },
  {
    title: "Front-End Developer",
    date: "OCT 2024 – SEP 2025",
    desc: "Built northweek.cr from scratch at Social Brands with Shopify Liquid, HTML/CSS, and JavaScript — shipping a production e-commerce site with upselling and optimized navigation, solo.",
  },
  {
    title: "Software Development Technician",
    date: "JUL 2024",
    desc: "Graduated from Cenfotec University as a full-stack Software Development Technician — React, TypeScript, Node.js, databases, and software architecture.",
  },
  {
    title: "Started University",
    date: "OCT 2022",
    desc: "Began the Software Development Technician program at Cenfotec and a Bachelor of Business Administration at LEAD University in parallel.",
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
