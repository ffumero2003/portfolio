"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import RevealOnScroll from "../gsap/revealOnScroll";

// Shared styling for the card action buttons. Change here to restyle every button
// on every section that uses this card.
export function buttonClass(variant = "solid") {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  if (variant === "outline") {
    return `${base} bg-[var(--btn-outline-bg)] hover:bg-[var(--btn-outline-hover)] border border-[var(--btn-outline-border)] text-[var(--color-text)] hover:text-[var(--color-primary-dark)]`;
  }
  return `${base} bg-[var(--btn-solid-bg)] text-[var(--btn-solid-text)] hover:opacity-90`;
}

// The expandable project card used by the Software Engineering & AI and
// Full-Stack Builds sections. Holds its own state so multiple cards don't interfere.
//
// Every media block is optional — a project missing `video`, `architecture`, or
// `gallery` simply doesn't render that block, so a project can be listed before
// its demo video or diagram exists. Recognised fields:
//   title, oneLiner, overview, tech[]           — always rendered
//   video + poster                              — video hero; poster alone renders as a photo
//   videoComingSoon                             — captions the photo hero as awaiting a recording
//   architecture + architectureCaption          — diagram block
//   gallery[{src,label}]                        — screenshot grid
//   features[]                                  — "Key features" list
//   githubUrl / githubComingSoon                — code link, or a disabled "Coming Soon" chip
//   liveUrl + liveLabel (default "Live Demo")   — deployed app or landing page
//   lookerUrl, linkedinUrl                      — extra links, hidden when empty
export default function ProjectDeepCard({ project }) {
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
                  {/* Hero: demo video when there is one, otherwise the still image */}
                  {project.video ? (
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
                  ) : (
                    project.poster && (
                      <div>
                        {/* No backdrop and no fixed aspect: images with a
                            transparent background sit on the card surface, and
                            tall mockups render whole instead of being cropped. */}
                        <button
                          onClick={() => setLightbox(project.poster)}
                          className="block w-full overflow-hidden rounded-xl ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition"
                        >
                          <img
                            src={project.poster}
                            alt={`${project.title} screenshot`}
                            className="w-full h-auto object-contain"
                            loading="lazy"
                          />
                        </button>
                        {project.videoComingSoon && (
                          <p className="mt-2 text-xs text-[var(--color-text)]/60">
                            Demo video coming soon
                          </p>
                        )}
                      </div>
                    )
                  )}

                  {/* Overview */}
                  <p className="mt-6 text-sm md:text-base leading-relaxed text-[var(--color-text)]/80">
                    {project.overview}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.githubComingSoon ? (
                      <span
                        aria-disabled="true"
                        className={`${buttonClass("outline")} cursor-default opacity-60 hover:bg-[var(--btn-outline-bg)]`}
                      >
                        Coming Soon
                      </span>
                    ) : (
                      project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={buttonClass("outline")}
                        >
                          View Code
                        </a>
                      )
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonClass("solid")}
                      >
                        {project.liveLabel ?? "Live Demo"}
                      </a>
                    )}
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
                  {project.architecture && (
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
                  )}

                  {/* Features */}
                  {project.features?.length > 0 && (
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
                  )}

                  {/* Screenshots gallery */}
                  {project.gallery?.length > 0 && (
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
                  )}
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
