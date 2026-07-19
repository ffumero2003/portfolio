"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "../gsap/revealOnScroll";

const PROJECTS = [
  {
    title: "Prompt Gate — Governed AI Image Generation",
    oneLiner:
      "An admission-controlled AI image pipeline: it gates every prompt on scope and budget before spending a cent, generates with OpenAI, uses a second LLM to grade and refine the result, and stores each image to the cloud with a tamper-proof provenance record — as both a CLI and a React web app.",
    overview:
      "A governed image-generation app built on the genblaze pipeline. Every prompt passes an admission gate before any money is spent: a persisted daily-run ledger caps generations per day, a cost guard bounds the worst-case run cost, and an OpenAI LLM classifies whether the prompt is an in-scope product shot. Only accepted prompts generate — OpenAI's gpt-image-1 creates the image, gpt-4o (vision) scores it 0–1 with written feedback, and if it misses the quality bar that feedback sharpens the prompt and it retries (up to 3 attempts). The winning image plus a provenance manifest — prompt, model, attempts, cost, and a content hash — are stored on Backblaze B2. One shared Python core powers two interfaces: a CLI and a React (Vite + Tailwind) web app served by FastAPI.",
    tech: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "gpt-image-1",
      "gpt-4o",
      "Backblaze B2",
      "genblaze",
      "Pydantic",
      "React",
      "Vite",
      "Tailwind CSS",
      "uvicorn",
    ],
    features: [
      "Admission gate that rejects off-scope or over-budget prompts before any paid call, with a distinct exit code per reason",
      "LLM scope classifier (OpenAI) using structured JSON output plus a fail-closed, tolerant parser — an unconfirmed prompt never reaches paid generation",
      "Cost guard: a per-run worst-case cost ceiling computed fully offline from an app-priced model registry (no network, no API key)",
      "Persisted daily-run ledger enforcing a cross-run daily generation cap that survives between invocations — the real budget control a single-run check can't provide",
      "LLM-as-judge retry loop: gpt-4o scores each image 0–1 with feedback; below-threshold results retry with that feedback folded into the prompt (genblaze AgentLoop)",
      "Provenance: every stored image ships with a manifest (prompt, model, attempts, cost, and a content hash for tamper detection)",
      "One shared orchestration behind two interfaces (CLI + React/FastAPI web); everything provider-facing routes through the genblaze pipeline — no direct SDK / boto3 / raw HTTP",
    ],
    video: "/aiApplications/promptGate/prompt-gate.mp4",
    poster: "/aiApplications/promptGate/web-demo.png",
    architecture: "/aiApplications/promptGate/architecture.png",
    architectureCaption:
      "Prompt → gate (daily-run ledger → cost guard → LLM scope classifier) → gpt-image-1 generation → gpt-4o scoring → retry-on-feedback loop (up to 3×) → Backblaze B2 storage with a provenance manifest. One shared Python core serves both a CLI and a React (Vite + Tailwind) frontend over a FastAPI /generate endpoint.",
    gallery: [
      {
        src: "/aiApplications/promptGate/web-ui.png",
        label: "React web UI — generated product shot",
      },
      {
        src: "/aiApplications/promptGate/terminal.png",
        label: "CLI — gate accept + rejections",
      },
      {
        src: "/aiApplications/promptGate/backblaze.png",
        label: "Backblaze B2 — stored images & manifests",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/prompt-gate",
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

                  <p className="mt-6 text-sm md:text-base leading-relaxed text-[var(--color-text)]/80">
                    {project.overview}
                  </p>

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
                    <p className="mt-3 text-xs md:text-sm text-[var(--color-text)]/70">
                      {project.architectureCaption}
                    </p>
                  </div>

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

      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <img
              src={lightbox}
              alt="Enlarged screenshot"
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain"
            />
          </div>,
          document.body
        )}
    </>
  );
}

export default function AiApplications() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="ai-applications"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        AI / LLM Applications
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        LLM-powered applications — generation pipelines, agentic loops, and the
        guardrails that make them production-safe.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
