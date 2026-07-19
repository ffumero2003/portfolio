"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "../gsap/revealOnScroll";

// Data Analytics / BI case studies. Same card shell as Backend & Integration,
// analysis first: dataset, findings, conclusions. No code emphasis.
const PROJECTS = [
  {
    title: "Olist Sourcing and Delivery Performance. QuickSight BI Dashboard",
    oneLiner:
      "A five visual Amazon QuickSight dashboard over ~110K delivered orders, surfacing where delivery promises break down by time, seller region, and geography, plus the freight cost burden by category.",
    tech: ["Amazon QuickSight", "SPICE", "Python", "pandas", "SQL", "AWS"],

    dataset:
      "Olist Brazilian E-Commerce (public, Kaggle). ~110K delivered orders from 2017 to 2018, spanning orders, sellers, products, customers, and estimated vs actual delivery dates.",
    datasetUrl: "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",

    // Findings: each names the top/bottom item and says if it is good or bad.
    findings: [
      {
        visual: "Late Delivery Rate",
        insight:
          "About 7.91% of orders arrived after the promised date, roughly 1 in 13. That is actually healthy, since Olist pads its delivery estimates, so a single digit rate is the good baseline the rest of the dashboard compares against.",
      },
      {
        visual: "Late Rate Trend by Month",
        insight:
          "This is the warning sign. The late rate is low through 2017 but climbs to a peak near 20% in early 2018 as order volume grows. The trend going up as the business scales suggests delivery capacity is not keeping pace with demand.",
      },
      {
        visual: "Late Rate by Seller Region",
        insight:
          "Amazonas shows the highest late rate, but it has very few orders, so that number is noisy and not trustworthy on its own. The real takeaway is that regional rates have to be read alongside order volume before drawing conclusions.",
      },
      {
        visual: "Delivery Speed by State",
        insight:
          "The remote northern states are the worst, averaging 20 to 30 days to deliver, while states near the São Paulo hub are the best at about half that. Distance from the logistics core is the main driver, so this is a structural problem, not an operational one.",
      },
      {
        visual: "Freight Burden by Category",
        insight:
          "Cheap, bulky categories are the worst offenders, where shipping can cost almost as much as the item itself, while small high value goods are the lightest. This flags where freight is quietly eating into margin.",
      },
    ],

    // Plain language conclusion with a clear objective, the kind you can read aloud.
    conclusions:
      "The goal was to find where Olist's delivery promises break down and what it costs. Overall delivery is healthy at about 8% late, but two things stand out. First, the late rate is climbing over time as order volume grows, which suggests capacity is not scaling with demand. Second, the problem is worst in remote regions far from the São Paulo hub, where distance makes deliveries structurally slower. On the cost side, shipping is heaviest on cheap bulky products, where freight can rival the item price. So the recommendations are to invest in delivery capacity as volume grows, set more realistic delivery windows for remote regions, and review freight economics on low value categories.",
    liveUrl: "",
    walkthroughVideo: "", // e.g. "/dataAnalytics/olist/walkthrough.mp4" a screen recording
    heroImage: "/dataAnalytics/quickSight/olist/dashboard-overview.png", // full dashboard screenshot
    notebookUrl:
      "https://colab.research.google.com/drive/1ogxLQBJfGqmC0Y8Tg2IUs10Wi3h8AnRD?usp=sharing", // your shared Colab or GitHub link

    gallery: [
      {
        src: "/dataAnalytics/quickSight/olist/kpi-late-rate.png",
        label: "Late Delivery Rate. 7.91% baseline",
      },
      {
        src: "/dataAnalytics/quickSight/olist/trend-by-month.png",
        label: "Late rate trend, filtered to Jan 2017 onward",
      },
      {
        src: "/dataAnalytics/quickSight/olist/late-rate-by-region.png",
        label: "Late rate by seller region",
      },
      {
        src: "/dataAnalytics/quickSight/olist/delivery-speed-by-state.png",
        label: "Average delivery days by customer state",
      },
      {
        src: "/dataAnalytics/quickSight/olist/freight-by-category.png",
        label: "Freight cost as a share of price, by category",
      },
    ],

    linkedinUrl: "", // optional LinkedIn post link
  },

  {
    title: "DataCo Delivery and Sourcing Performance. Tableau BI Dashboard",
    oneLiner:
      "A five visual Tableau Public dashboard over ~180K supply chain orders, surfacing what actually drives late delivery, across shipping mode, product category, and geography, plus which categories carry the thinnest margins.",
    tech: ["Tableau Public", "SQL", "Python", "pandas", "Data Modeling"],

    dataset:
      "DataCo Smart Supply Chain (public, Kaggle). ~180K orders with scheduled vs actual shipping days, shipping mode, product category, order region, and profit ratio.",
    datasetUrl:
      "https://www.kaggle.com/datasets/shashwatwork/dataco-smart-supply-chain-for-big-data-analysis",

    // One finding per visual. Verify numbers against your live dashboard.
    findings: [
      {
        visual: "Late Delivery Rate",
        insight:
          "About 57% of all orders arrived after the scheduled date. That is high, more than half of deliveries miss their promise, and it is the baseline the rest of the dashboard breaks down to explain.",
      },
      {
        visual: "Late Rate by Shipping Mode",
        insight:
          "This is where the real problem lives. First Class is the worst at roughly 95% late, and Standard Class is the best at roughly 40%. That is the opposite of what customers expect, the premium fast option misses most often because its promised window is the tightest, so the fix is aligning promises with what each mode can actually deliver.",
      },
      {
        visual: "Late Rate by Category",
        insight:
          "Late rate barely moves across products, everything sits between about 55 and 62%, with Golf Bags and Carts highest and Men's Clothing lowest. The takeaway is a negative one in a useful way, category is not driving lateness, so effort should not go here.",
      },
      {
        visual: "Late Rate by Country",
        insight:
          "Late rate varies by destination. A handful of countries run well above the global average and show up as the darkest on the map, which flags them as the geographies to investigate first, while most of the world sits near the 57% baseline.",
      },
      {
        visual: "Least Profitable Categories",
        insight:
          "Unlike late rate, margin varies a lot by category. Men's Clothing is the worst with the thinnest average profit ratio, and CDs sit at the healthier end. The color overlay adds the important cross check, whether a thin margin category is also frequently late, since that combination is where delivery problems hurt profit the most.",
      },
    ],

    // Overall takeaway, in plain language
    conclusions:
      "The goal was to find what actually causes late deliveries. The answer is shipping speed, not the product. First Class, the fastest option, is late about 95% of the time because its promised window is the hardest to hit, while the slowest option, Standard, is late only about 40%. Product category made almost no difference. So the fix is to set more realistic delivery promises for the fast shipping options, instead of blaming specific products. On the money side, profit varies a lot more by category than lateness does, which shows where a late delivery would cost the business the most.",
    // Paste your public Tableau URL here to enable the button
    liveUrl:
      "https://public.tableau.com/views/DataCoDeliverySourcingPerformance/DataCoDeliverySourcingPerformance?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    // Tableau Public embeds are public, so a screen recording is optional here
    walkthroughVideo: "",
    heroImage: "/dataAnalytics/tableau/dataco/dashboard-overview.png",
    notebookUrl:
      "https://colab.research.google.com/drive/1Sm29BMu0FbqE4AAkmiqD7cb58QtFX8UH?usp=sharing",

    // Optional pipeline diagram. Leave "" to hide the section (same guard as Olist).
    architecture: "",
    architectureCaption: "",

    // One screenshot per visual
    gallery: [
      {
        src: "/dataAnalytics/tableau/dataco/kpi-late-rate.png",
        label: "Late Delivery Rate. 57.3% baseline",
      },
      {
        src: "/dataAnalytics/tableau/dataco/late-rate-by-shipping-mode.png",
        label: "Late rate by shipping mode, the real driver",
      },
      {
        src: "/dataAnalytics/tableau/dataco/late-rate-by-category.png",
        label: "Late rate by category, uniform across products",
      },
      {
        src: "/dataAnalytics/tableau/dataco/late-rate-by-country.png",
        label: "Late rate by country",
      },
      {
        src: "/dataAnalytics/tableau/dataco/least-profitable-categories.png",
        label: "Least profitable categories, colored by late rate",
      },
    ],

    linkedinUrl: "",
  },
];

function buttonClass(variant = "solid") {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  if (variant === "outline") {
    return `${base} bg-[var(--btn-outline-bg)] hover:bg-[var(--btn-outline-hover)] border border-[var(--btn-outline-border)] text-[var(--color-text)] hover:text-[var(--color-primary-dark)]`;
  }
  return `${base} bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:opacity-90`;
}

function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const expand = () => {
    const v = videoRef.current;
    if (v?.requestFullscreen) v.requestFullscreen();
    else if (v?.webkitEnterFullscreen) v.webkitEnterFullscreen();
  };

  return (
    <>
      <RevealOnScroll>
        <article className="rounded-2xl ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition bg-[color-mix(in_srgb,var(--color-surface)_88%,transparent)] backdrop-blur-xl overflow-hidden">
          {/* Clickable header identical to Backend & Integration */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="w-full text-left p-4 md:p-8 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-[var(--color-text)]/80">
                {project.oneLiner}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-1 text-[11px] md:text-xs font-medium ring-1 ring-[var(--card-ring)] text-[var(--color-text)]/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-block text-xs md:text-sm font-medium text-[var(--color-primary-light)]">
                {open ? "Click to collapse" : "Click to view case study"}
              </span>
            </div>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`mt-1 size-6 shrink-0 text-[var(--color-text)] transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-8 pb-4 md:pb-8 pt-2">
                  {/* Hero: walkthrough video if present, else the full dashboard image */}
                  {project.walkthroughVideo ? (
                    <div className="relative overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] bg-black">
                      <video
                        ref={videoRef}
                        className="w-full aspect-video object-cover cursor-pointer"
                        src={project.walkthroughVideo}
                        poster={project.heroImage}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onClick={expand}
                      />
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <button
                          onClick={toggleMute}
                          className="rounded-lg bg-black/55 hover:bg-black/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white"
                        >
                          {muted ? "🔇 Unmute" : "🔊 Mute"}
                        </button>
                        <button
                          onClick={expand}
                          className="rounded-lg bg-black/55 hover:bg-black/70 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white"
                        >
                          ⤢ Expand
                        </button>
                      </div>
                    </div>
                  ) : project.heroImage ? (
                    <button
                      onClick={() => setLightbox(project.heroImage)}
                      className="block w-full overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition"
                    >
                      <img
                        src={project.heroImage}
                        alt="Full dashboard overview"
                        className="w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ) : null}

                  {/* Primary CTA row (renders only what has a link) */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("solid")}
                      >
                        View Live Dashboard
                      </a>
                    )}
                    {project.datasetUrl && (
                      <a
                        href={project.datasetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("outline")}
                      >
                        Dataset
                      </a>
                    )}

                    {project.notebookUrl && (
                      <a
                        href={project.notebookUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("outline")}
                      >
                        Data Prep Notebook
                      </a>
                    )}
                    {project.linkedinUrl && (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("outline")}
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>

                  {/* Dataset (method paragraph removed) */}
                  <div className="mt-8">
                    <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-2">
                      Dataset
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed text-[var(--color-text)]/80">
                      {project.dataset}
                    </p>
                  </div>

                  {/* Findings, one per visual */}
                  {project.findings?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3">
                        Findings
                      </h4>
                      <ul className="space-y-3">
                        {project.findings.map((f) => (
                          <li
                            key={f.visual}
                            className="text-sm md:text-base text-[var(--color-text)]/80"
                          >
                            <span className="font-semibold text-[var(--color-text)]">
                              {f.visual}.{" "}
                            </span>
                            <span>{f.insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Conclusions (replaces recommendations + limitations) */}
                  {project.conclusions && (
                    <div className="mt-8">
                      <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-2">
                        Conclusions
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed text-[var(--color-text)]/80">
                        {project.conclusions}
                      </p>
                    </div>
                  )}

                  {/* Screenshots left exactly as they were (zoom kept) */}
                  {project.gallery?.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3">
                        The dashboard
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                        {project.gallery.map((img) => (
                          <figure key={img.src}>
                            <button
                              onClick={() => setLightbox(img.src)}
                              className="block w-full overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition"
                            >
                              <img
                                src={img.src}
                                alt={img.label}
                                className="w-full aspect-video object-cover"
                                loading="lazy"
                              />
                            </button>
                            <figcaption className="mt-2 text-xs text-[var(--color-text)]/60">
                              {img.label}
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </RevealOnScroll>

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <img
              src={lightbox}
              alt="Enlarged"
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain"
            />
          </div>,
          document.body
        )}
    </>
  );
}

export default function DataAnalytics() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="data-analytics"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        Data Analytics &amp; BI
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        Dashboards and the analysis behind them, from the data to the findings
        and the decisions they drive.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
