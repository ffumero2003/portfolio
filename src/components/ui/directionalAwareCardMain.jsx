"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

function cn(...c) {
  return c.filter(Boolean).join(" ");
}

export default function DirectionAwareHoverCardMain({
  imageUrl,
  title,
  learning,
  githubUrl,
  githubComingSoon,
  liveUrl,
  tags,
  imageClassName,
  className,
  childrenClassName,
  comingSoon = false,
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group/card relative overflow-hidden rounded-2xl bg-transparent",
        "ring-1 ring-[var(--card-ring)] hover:ring-[var(--card-ring-hover)] transition",
        className,
      )}
      onMouseEnter={() => isDesktop && setActive(true)}
      onMouseLeave={() => isDesktop && setActive(false)}
      onClick={() => !isDesktop && setActive((v) => !v)}
      onKeyDown={(e) => {
        if (!isDesktop && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setActive((v) => !v);
        }
      }}
      role={!isDesktop ? "button" : undefined}
      tabIndex={!isDesktop ? 0 : undefined}
      aria-pressed={!isDesktop ? active : undefined}
    >
      <motion.div
        className="relative h-full w-full"
        animate={active ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <img
          src={imageUrl}
          alt={title ?? "project image"}
          className={cn(
            "h-full w-full object-cover select-none",
            imageClassName,
          )}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 z-10 hidden md:block transition-colors duration-200",
          "group-hover/card:bg-[var(--card-veil)]",
        )}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 p-3 md:p-6",

          comingSoon
            ? cn(
                "transition-opacity duration-300",
                active ? "opacity-100" : "opacity-0",
                "md:opacity-0 md:group-hover/card:opacity-100",
              )
            : cn(
                "transition-opacity duration-300",
                active ? "opacity-100" : "opacity-0",
                "md:opacity-0 md:group-hover/card:opacity-100",
              ),
          childrenClassName,
        )}
      >
        {comingSoon ? (
          <div className="space-y-2">
            {title && (
              <h3
                className=" text-lg md:text-xl font-semibold tracking-tight"
                style={{ color: "var(--overlay-title)" }}
              >
                {title}
              </h3>
            )}
            <span className="inline-block py-0.5 text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white/90">
              Coming Soon
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {title && (
              <h3
                className="px-2 text-base md:text-xl font-semibold tracking-tight"
                style={{ color: "var(--overlay-title)" }}
              >
                {title}
              </h3>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 max-h-12 md:max-h-none overflow-hidden">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-black/30 backdrop-blur-sm text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {learning && (
              <p
                className="px-2 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none"
                style={{ color: "var(--overlay-text)" }}
              >
                {learning}
              </p>
            )}

            <div className="flex flex-wrap gap-2 px-2 pt-1">
              {githubUrl &&
                (githubComingSoon ? (
                  <span
                    className={buttonClass("outline")}
                    aria-label="GitHub coming soon"
                  >
                    <span>Coming Soon</span>
                  </span>
                ) : (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClass("outline")}
                    aria-label="Open GitHub repository"
                  >
                    <GithubIcon className="size-4" />
                    <span>GitHub</span>
                  </a>
                ))}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass("solid")}
                  aria-label="Open live site"
                >
                  <ExternalIcon className="size-4" />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function buttonClass(variant = "solid") {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs md:text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors";

  if (variant === "outline") {
    return cn(
      base,
      "backdrop-blur-[2px]",
      "bg-[var(--btn-outline-bg)] hover:bg-[var(--btn-outline-hover)]",
      "border border-[var(--btn-outline-border)]",
      "text-[var(--overlay-title)] hover:text-[var(--color-primary-dark)]",
    );
  }

  return cn(
    base,
    "bg-[var(--btn-solid-bg)] hover:opacity-90",
    "text-[var(--btn-solid-text)]",
  );
}

// Icons
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.74.08-.74 1.21.08 1.85 1.24 1.85 1.24 1.08 1.85 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.31 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.31-1.23 3.31-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.48 5.94.43.36.81 1.08.81 2.19v3.25c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function ExternalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 3a1 1 0 1 0 0 2h3.586l-6.293 6.293a1 1 0 0 0 1.414 1.414L19 6.414V10a1 1 0 1 0 2 0V3h-7ZM6 5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4a1 1 0 1 0-2 0v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4a1 1 0 1 0 0-2H6Z" />
    </svg>
  );
}
