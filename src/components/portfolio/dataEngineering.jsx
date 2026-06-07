"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "../gsap/revealOnScroll";

// Both projects live here. Each renders as its own card via <ProjectCard>.
const PROJECTS = [
  {
    title: "LATAM Economic Intelligence Dashboard",
    oneLiner:
      "An end-to-end ELT pipeline that ingests live economic data into BigQuery, models it with dbt, and serves it through a Looker Studio dashboard and a natural-language SQL interface powered by Claude.",
    overview:
      "An end-to-end ELT pipeline on Google BigQuery. Python ingests live macroeconomic indicators — Costa Rica and U.S. inflation, exchange rates, interest rates, and GDP — from the U.S. Federal Reserve's FRED API into a raw layer (fred_raw), then dbt transforms them into clean analytical models (fred_analytics) with yearly averages and year-over-year change. The modeled tables feed a Looker Studio dashboard and a natural-language interface: you ask a question in plain English, Claude writes read-only SQL, it runs against BigQuery, and the answer returns with the generated SQL shown for transparency.",
    tech: [
      "BigQuery",
      "dbt",
      "Python",
      "pandas",
      "SQL",
      "FRED API",
      "Looker Studio",
      "Flask",
      "React",
      "Claude API",
    ],
    features: [
      "ELT architecture on BigQuery with a clean raw → analytics separation (fred_raw → fred_analytics)",
      "Automated ingestion of 5 live FRED indicators in Python, with retry/backoff for API rate limits and re-runnable loads",
      "dbt transformation layer computing yearly averages and year-over-year change, with DAG-ordered model dependencies",
      "Interactive Looker Studio dashboard built directly on the modeled tables",
      "Natural-language analytics: Claude generates read-only SQL → runs on BigQuery → plain-English answer, with the SQL surfaced",
      "Engineering guardrails: read-only query enforcement, input validation, and graceful handling of off-topic questions",
    ],
    video:
      "/dataEngineering/latamEconomicDashboard/latam-economic-dashboard-vid.mp4",
    poster: "/dataEngineering/latamEconomicDashboard/chat-demo.png",
    architecture: "/dataEngineering/latamEconomicDashboard/architecture.png",
    architectureCaption:
      "FRED API → Python + pandas (ingest & clean) → BigQuery (fred_raw) → dbt (SQL transforms) → BigQuery (fred_analytics) → Looker Studio dashboard & the AI Q&A app (React → Flask → Claude writes SQL → runs on BigQuery → answer back to the user).",
    gallery: [
      {
        src: "/dataEngineering/latamEconomicDashboard/dashboard.png",
        label: "Looker Studio dashboard",
      },
      {
        src: "/dataEngineering/latamEconomicDashboard/dbt-run.png",
        label: "dbt transformation run",
      },
      {
        src: "/dataEngineering/latamEconomicDashboard/bigquery-tables.png",
        label: "BigQuery tables & row counts",
      },
    ],
    githubUrl:
      "https://github.com/ffumero2003/latam-economic-intelligence-dashboard",
    lookerUrl:
      "https://datastudio.google.com/reporting/20e9802f-b247-4d9d-9724-b565d64b56a5", // optional — leave "" to hide the Live Dashboard button
  },
  {
    title: "Credit Risk Scoring + Explainable AI",
    oneLiner:
      "An end-to-end credit-risk pipeline that scores loan applicants, makes an approve/decline decision, and generates plain-English, FCRA-style adverse-action explanations with Claude, orchestrated end to end with Apache Airflow.",
    overview:
      "An end-to-end credit-risk pipeline on Google BigQuery. Python ingests the Home Credit dataset (loan applications plus credit-bureau history) into a raw layer, then dbt aggregates the bureau records to applicant grain and builds a model-ready feature mart. An XGBoost model (benchmarked against a logistic-regression baseline) scores each applicant's probability of default, SHAP extracts the principal factors behind each individual score, and Claude turns them into a clear, FCRA-style adverse-action explanation. Protected attributes (gender, age, marital status) are dropped from the model and filtered out before they can influence a decision or appear in an explanation. The entire batch pipeline (ingest, dbt, score, data-quality check) is orchestrated as an Apache Airflow DAG running in Docker.",
    tech: [
      "BigQuery",
      "dbt",
      "Python",
      "pandas",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "Claude API",
      "Apache Airflow",
      "Docker",
      "Flask",
      "React",
      "Looker Studio",
    ],
    features: [
      "Multi-source ingestion: ~308K applications and ~1.7M bureau records loaded into BigQuery with idempotent re-runs",
      "dbt transformation layer that aggregates bureau history to one row per applicant (a grain change) and builds a feature mart, with data tests",
      "XGBoost vs. a logistic-regression baseline, evaluated with credit-standard metrics (AUC / Gini / KS) instead of misleading accuracy on imbalanced data",
      "Per-applicant explainability with SHAP → Claude: SHAP computes each decision's principal factors, Claude writes the plain-language, FCRA-style adverse-action notice",
      "Fair-lending guardrail enforced in code: protected attributes are dropped from the model and filtered before any explanation is generated",
      "Full pipeline orchestrated as an Apache Airflow DAG (ingest → dbt → score → quality check) in Docker, with a data-quality gate that fails the run on empty output",
      "Looker Studio dashboard including a decision-rate-by-gender fairness check",
    ],
    video: "/dataEngineering/creditRisk/ui_video.mp4",
    poster: "/dataEngineering/creditRisk/app_demo.png",
    architecture: "/dataEngineering/creditRisk/credit_risk_architecture.png",
    architectureCaption:
      "Home Credit data → Python + pandas (load_raw.py) → BigQuery (credit_raw) → dbt (staging → feature mart + tests) → BigQuery (credit_analytics) → XGBoost + SHAP scoring (train_model.py) → BigQuery (scored_applications) → Looker Studio dashboard & the Claude explainer app (React → Flask → Claude writes the adverse-action explanation). The whole batch pipeline is orchestrated end to end by an Apache Airflow DAG in Docker.",
    gallery: [
      {
        src: "/dataEngineering/creditRisk/looker_studio.png",
        label: "Looker Studio dashboard",
      },
      {
        src: "/dataEngineering/creditRisk/airflow_green_dag_run.png",
        label: "Airflow DAG, full pipeline run",
      },
      {
        src: "/dataEngineering/creditRisk/model_output.png",
        label: "Model metrics + SHAP output",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/credit-risk-explainable-ai",
    lookerUrl:
      "https://datastudio.google.com/reporting/bf6b79e2-35bb-47e0-bcad-16d057153661", // optional — paste your shared Looker report link to show the button
    linkedinUrl: "", // optional — paste your LinkedIn post link to show the button
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

// One project card. Holds its own state so multiple cards don't interfere.
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
          {/* Clickable header */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="w-full text-left p-4 md:p-8 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-[var(--color-text)]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-[var(--color-text)]/80 max-w-3xl">
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
                {open ? "Click to collapse" : "Click to view project"}
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

          {/* Collapsible body */}
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
                  {/* Video hero */}
                  <div className="relative overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] bg-black">
                    <video
                      ref={videoRef}
                      className="w-full aspect-video object-cover cursor-pointer"
                      src={project.video}
                      poster={project.poster}
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

                  {/* Overview */}
                  <p className="mt-6 text-sm md:text-base leading-relaxed text-[var(--color-text)]/80 max-w-3xl">
                    {project.overview}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonClass("outline")}
                    >
                      View Code
                    </a>
                    {project.lookerUrl && (
                      <a
                        href={project.lookerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("solid")}
                      >
                        Live Dashboard
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

                  {/* Architecture */}
                  <div className="mt-10">
                    <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3">
                      Architecture
                    </h4>
                    <button
                      onClick={() => setLightbox(project.architecture)}
                      className="block w-full overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition"
                    >
                      <img
                        src={project.architecture}
                        alt="Pipeline architecture diagram"
                        className="w-full object-contain"
                        loading="lazy"
                      />
                    </button>
                    <p className="mt-3 text-xs md:text-sm text-[var(--color-text)]/70 max-w-3xl">
                      {project.architectureCaption}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-10">
                    <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3">
                      Key features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 text-sm md:text-base text-[var(--color-text)]/80"
                        >
                          <span className="mt-1 text-[var(--color-primary-dark)]">
                            ▹
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Screenshots gallery */}
                  <div className="mt-10">
                    <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3">
                      Screenshots
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </RevealOnScroll>

      {/* Lightbox (per card) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Enlarged screenshot"
            className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain"
          />
        </div>
      )}
    </>
  );
}

export default function DataEngineering() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="data-engineering"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        Data Engineering
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        End-to-end ELT pipelines — ingestion, cloud warehousing, and dbt data
        modeling.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
