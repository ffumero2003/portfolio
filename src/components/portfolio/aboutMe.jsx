import { useEffect, useRef } from "react";
import gsap from "gsap";
import ButtonPrimary from "./buttonPrimary";

export default function AboutMe() {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  const TITLE = "Developer";
  const P1 =
    "I am a front-end web developer focused on React and modern JavaScript technologies. I specialize in building efficient, modular, and scalable interfaces, paying close attention to both user experience and code quality.";
  const P2_PRE =
    "I am curious and self-taught, sharing what I learn through projects and practices. Everything is published on ";
  const P2_LINK_TEXT = "https://github.com/ffumero2003";
  const P2_POST = ".";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const maskRect = root.querySelector("#reveal-rect");
    const chars = root.querySelectorAll(".char");
    const underline = root.querySelector("[data-role='underline']");

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "cubic-bezier(0.22,1,0.36,1)" },
    });

    tl.fromTo(maskRect, { attr: { width: 0 } }, { attr: { width: "100%" }, duration: 1.1 })
      .fromTo(
        underline,
        { scaleX: 0, opacity: 0, transformOrigin: "left center" },
        { scaleX: 1, opacity: 1, duration: 0.45 },
        0.08
      )
      .fromTo(
        chars,
        { y: 16, opacity: 0, rotate: 0.001 },
        { y: 0, opacity: 1, duration: 0.3, stagger: { each: 0.008, from: 0 } },
        0.08
      );

    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  const replay = () => tlRef.current?.restart();

  const renderChars = (text) =>
    [...text].map((ch, i) =>
      ch === " "
        ? " "
        : (
          <span key={i} className="char inline-block will-change-transform">
            {ch}
          </span>
        )
    );

  return (
    <section
      ref={rootRef}
      className="mx-auto max-w-3xl p-6 md:p-8 rounded-2xl border shadow-md overflow-hidden"
      style={{ background: "var(--color-surface)", borderColor: "var(--color-outline)" }}
      id="about"
    >
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="relative w-full">
          <svg
            viewBox="0 0 1200 260"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <mask id="reveal-mask">
              <rect x="0" y="0" id="reveal-rect" width="0" height="100%" fill="white" />
            </mask>
            <g mask="url(#reveal-mask)"></g>
          </svg>

          <div className="relative mb-4">
            <h2
              data-role="title"
              className="relative z-10 text-2xl md:text-3xl font-extrabold whitespace-pre-wrap"
              style={{ color: "var(--color-primary)" }}
            >
              {renderChars(TITLE)}
            </h2>

            <span
              data-role="underline"
              className="mt-2 block h-[3px] rounded-full opacity-0"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    color-mix(in srgb, var(--color-primary) 30%, transparent) 0%,
                    color-mix(in srgb, var(--color-primary) 60%, transparent) 50%,
                    color-mix(in srgb, var(--color-primary) 10%, transparent) 100%
                  )
                `,
              }}
            />
          </div>

          <p
            data-role="p1"
            className="relative z-10 text-base md:text-lg leading-7 md:leading-8 mb-4 whitespace-pre-wrap break-words"
            style={{ color: "var(--color-paragraph)" }}
          >
            {renderChars(P1)}
          </p>

          <p
            data-role="p2"
            className="relative z-10 text-base md:text-lg leading-7 md:leading-8 whitespace-pre-wrap break-words"
            style={{ color: "var(--color-paragraph)" }}
          >
            {renderChars(P2_PRE)}
            <a
              href="https://github.com/ffumero2003"
              target="_blank"
              rel="noopener noreferrer"
              className=" break-all "
              style={{ color: "var(--color-primary)" }}
            >
              {renderChars(P2_LINK_TEXT)}
            </a>
            {renderChars(P2_POST)}
          </p>
        </div>

        <ButtonPrimary
          type="button"
          onClick={replay}
          className="rounded-lg px-3 py-2 text-sm font-semibold"
          style={{ background: "var(--color-button)", color: "var(--color-button-text)" }}
          text="Animate"
        />
      </div>
    </section>
  );
}
