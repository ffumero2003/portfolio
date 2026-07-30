"use client";
import { useRef, useState } from "react";
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
  {
  title: "Retrieval Quality Benchmark - Smarter RAG vs Plain Vector Search",
  oneLiner:
    "Two search systems, the same documents, the same questions - and real numbers showing which one actually finds the right answer more often.",
  overview:
    "Most RAG projects bolt on reranking and hybrid search, then just assume things got better. This one measures it. I built a document set from Apple's latest 10-K filing (the risk factors and management discussion sections), split it into 134 pieces, and indexed those pieces two different ways. The first way is plain vector search - the standard approach. The second way has an AI model write a short summary of where each piece sits in the document before indexing it, then searches using both keyword matching and vector similarity, combines the two result lists, and finally reranks them with Cohere. Both systems get the exact same six questions. I wrote an answer key by hand with the exact sentences that count as correct, and the app shows both sets of results side by side with each one marked right or wrong. The smarter pipeline wins on every metric. This is search only - it doesn't write answers, so the numbers measure finding, not writing.",
  tech: [
    "Python", "RAG", "Chroma", "all-MiniLM-L6-v2", "OpenAI API",
    "Cohere Rerank", "BM25", "FastAPI", "React", "Vite", "pytest", "SEC EDGAR API",
  ],
  features: [
    "Both search systems read the exact same 134 pieces of text, split at the exact same points - so any difference in the scores comes from the search method and nothing else",
    "Before indexing, an AI model writes a one-line summary of where each piece sits in the document, so a paragraph that says 'these risks' still makes sense on its own",
    "Combines keyword search and vector search, merges the two ranked lists, then has Cohere reorder the finalists - each step is a standard technique, measured rather than assumed",
    "The results: plain vector search finds the answer 75% of the time; the upgraded pipeline finds it 100% of the time, and ranks it higher when it does",
    "An answer is only counted correct if the retrieved text contains the exact wording from the answer key - the AI-written summary never counts, so the score measures search quality and not the AI's writing",
    "Every result can be traced back to the original file and verified character by character, so nothing shown on screen is unverifiable",
    "A separate free-text box lets you ask anything, and those results are never scored - there is no answer key for a made-up question, so the app is built so it physically cannot mark them right or wrong",
    "398 backend tests and 42 frontend tests, including deliberate trap cases that fail if the app ever fakes a correct/incorrect mark instead of reading the real measured one",
  ],
  video: "/aiApplications/benchmarkRetrieval/benchmark-retrieval.mp4",
  architecture: "/aiApplications/benchmarkRetrieval/architecture.png",
  architectureCaption:
    "Apple's 10-K is downloaded from SEC EDGAR, trimmed to two sections, and split into 134 pieces. Those same pieces are indexed twice: once as-is, and once with an AI-written context line attached. A question then runs through both systems - the plain one does vector search, the upgraded one does keyword plus vector search, merges the results, and reranks them with Cohere. A scoring script grades both against a hand-written answer key, saves the numbers to a file, and the web app displays them side by side. A separate free-text search runs both systems live but is never scored.",
  gallery: [
    { src: "/aiApplications/benchmarkRetrieval/diff-q3.png", label: "Side by side - the plain search misses the answer, the upgraded one finds it" },
    { src: "/aiApplications/benchmarkRetrieval/scoreboard.png", label: "The measured scores for both systems" },
    { src: "/aiApplications/benchmarkRetrieval/eval-run.png", label: "The scoring script that produces every number in the app" },
  ],
  githubUrl: "https://github.com/ffumero2003/retrieval-benchmark-project",
  lookerUrl: "",
  linkedinUrl: "",
}
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
