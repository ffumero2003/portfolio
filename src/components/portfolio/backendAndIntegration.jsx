"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "../gsap/revealOnScroll";

// Backend & integration projects live here. Each renders as its own card via <ProjectCard>.
const PROJECTS = [
  {
    title: "Connector Service — Caching API Gateway",
    oneLiner:
      "A backend service that sits in front of an upstream public API, returning a clean, stable response contract while adding Redis caching and resilient failure handling — the core pattern behind integration “glue” services.",
    overview:
      "A caching API gateway built in Django REST Framework. A client calls the service instead of the upstream API directly; the service checks a Redis cache first, and only on a miss does it call the GitHub API, reshape the response into a fixed contract it controls, and store the result in Redis with a TTL. This decouples consumers from the upstream — a change in GitHub's response only requires a single-point fix, never a change in every caller. The service bounds outbound calls with timeouts, retries transient failures with exponential backoff, and returns proper HTTP status codes instead of crashing. Built over a weekend to learn Django/DRF hands-on from a Flask background, mapping the concepts directly across frameworks.",
    tech: [
      "Python",
      "Django",
      "Django REST Framework",
      "Redis",
      "Docker",
      "requests",
      "REST APIs",
    ],
    features: [
      "Caching API gateway in Django REST Framework that fronts an upstream public API and returns a stable response contract, decoupling consumers from the upstream's shape",
      "Cache-aside caching with Redis (run in Docker) and TTL expiry: a cache hit skips the upstream entirely; a miss fetches, stores, and returns — cutting redundant calls and respecting the upstream's rate limit",
      "Resilience layer: bounded request timeouts, retry with exponential backoff on transient failures, and correct HTTP status codes (404 / 502 / 503) for graceful degradation",
      "Null-safe field mapping: a missing upstream field resolves to null rather than crashing the response, so the contract holds even with incomplete source data",
      "Flask → DRF concept mapping (routes → URL dispatcher, view functions → APIView, jsonify → Response) — a self-directed weekend build to learn the framework",
      "Reproducible environment via requirements.txt and a clean .gitignore (no committed virtualenv)",
    ],
    video: "/backendAndIntegration/djangoConnectoService/connector-demo.mp4",
    poster:
      "/backendAndIntegration/djangoConnectoService/drf-browsable-api.png",
    architecture:
      "/backendAndIntegration/djangoConnectoService/connector-service-architecture.png",
    architectureCaption:
      "Client → Connector Service (Django + DRF) → checks Redis (cache, TTL) → on a miss, calls the GitHub API (upstream) → reshapes the response into a clean, stable JSON contract returned to the client. Caching avoids redundant upstream calls; retry/backoff and proper status codes handle upstream failures gracefully.",
    gallery: [
      {
        src: "/backendAndIntegration/djangoConnectoService/drf-browsable-api.png",
        label: "DRF browsable API — the clean response contract",
      },
      {
        src: "/backendAndIntegration/djangoConnectoService/cache-proof.png",
        label: "Cache proof — miss, then served from Redis",
      },
      {
        src: "/backendAndIntegration/djangoConnectoService/redis-ttl.png",
        label: "Redis key with live time-to-live",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/django-connector-service",
    lookerUrl: "", // optional — no dashboard for this one, leaves the button hidden
    linkedinUrl: "", // optional — paste your LinkedIn post link to show the button
  },

  {
    title: "Pre-Signed URL Upload Service",
    oneLiner:
      "A backend that issues time-limited signed URLs so clients upload files directly into a private cloud bucket, then notify the service — the exact connector pattern of client → storage → backend, with the bucket never going public and the file bytes never passing through the API.",
    overview:
      "A Flask service that brokers secure uploads without ever exposing the storage bucket or routing file bytes through the API. A client asks for permission to upload; the service signs a short-lived, single-object, single-verb (PUT) URL using a service-account key and returns it. The client uploads the file straight to a private Google Cloud Storage bucket with that URL — offloading the heavy transfer off the API entirely. The client then notifies the backend, which verifies the object actually exists in the bucket (rather than trusting the client's claim) before recording its metadata. Built from scratch to learn object storage and signed URLs hands-on, mapping directly to the AWS S3 pre-signed URL equivalent.",
    tech: [
      "Python",
      "Flask",
      "Google Cloud Storage",
      "Signed URLs",
      "REST APIs",
      "Service Accounts / IAM",
    ],
    features: [
      "Issues v4 signed PUT URLs scoped to one object and one operation, signed locally with a service-account private key — no credentials exposed and the bucket never made public",
      "Direct-to-bucket uploads: the file travels client → storage on its own lane, so the API only handles permission and metadata and stays light regardless of file size",
      "Short TTL on every URL (least-privilege + time-boxed): a leaked URL is rejected by storage within minutes — demonstrated with an ExpiredToken rejection on an expired URL",
      "Verify-don't-trust on completion: the backend confirms the object exists in the bucket (blob.exists) before recording, returning 404 when a claimed upload isn't there",
      "Three REST endpoints with proper status codes: POST /upload-url (issue), POST /complete (verify + record), GET /files (list)",
      "Documented S3 equivalence (boto3 generate_presigned_url) and honest limitations (in-memory metadata, no auth, dev server) for production-readiness framing",
    ],
    video: "/backendAndIntegration/presigned-upload-service/presigned-demo.mp4",
    poster:
      "/backendAndIntegration/presigned-upload-service/signed-url-issued.png",
    architecture:
      "/backendAndIntegration/presigned-upload-service/presigned-url-service-architecture.png",
    architectureCaption:
      "Client → POST /upload-url → service signs a short-lived PUT URL → client uploads the file DIRECTLY to the private GCS bucket (bytes never touch the API) → client calls POST /complete → backend verifies the object exists and records its metadata. The bucket stays private throughout; each URL is single-object, single-verb, and time-boxed.",
    gallery: [
      {
        src: "/backendAndIntegration/presigned-upload-service/signed-url-issued.png",
        label: "Signed URL issued — time-limited PUT permission",
      },
      {
        src: "/backendAndIntegration/presigned-upload-service/recorded-metadata.png",
        label: "Backend verifies the object, then records its metadata",
      },
      {
        src: "/backendAndIntegration/presigned-upload-service/expiry-rejection.png",
        label: "Expired URL rejected by storage — TTL enforced",
      },
    ],
    githubUrl: "https://github.com/ffumero2003/presigned-upload-service",
    lookerUrl: "", // no dashboard for this one
    linkedinUrl: "", // paste your LinkedIn post link to show the button
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
                  <p className="mt-6 text-sm md:text-base leading-relaxed text-[var(--color-text)]/80">
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
                    <p className="mt-3 text-xs md:text-sm text-[var(--color-text)]/70">
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

export default function BackendAndIntegration() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-12"
      id="backend-integration"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-[var(--color-text)]">
        Backend &amp; Integration
      </h2>
      <p className="text-sm md:text-base text-[var(--color-text)]/70 mb-6 md:mb-8">
        APIs, integrations, and resilient service patterns — caching, stable
        contracts, and graceful failure handling.
      </p>

      <div className="space-y-6 md:space-y-8">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
