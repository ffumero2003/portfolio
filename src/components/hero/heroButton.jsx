import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function HeroButton({
  onClick,
  aria = "Scroll down",
  size = "xl",
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label={aria}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative inline-flex h-20 w-20 items-center justify-center rounded-full select-none"
      style={{
        border: "none",
        background: "transparent",
        
        color: hover ? "var(--color-primary)" : "var(--color-text)",
        
        boxShadow: hover ? "0 0 24px var(--color-outline)" : "none",
        transition: "color 300ms ease, box-shadow 300ms ease",
      }}
    >
      
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "transparent",
          transition: "background 300ms ease",
        }}
      />

      
      <span className="relative z-10 duration-300">
        <FontAwesomeIcon
          icon={faArrowDown}
          size={size}
          className="pointer-events-none"
          bounce={hover}
        />
      </span>

      
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="
            [stroke-dasharray:289]
            [stroke-dashoffset:289]
            transition-[stroke-dashoffset]
            duration-900 ease-in-out
            group-hover:[stroke-dashoffset:0]
          "
          transform="rotate(-90 50 50)"
        />
      </svg>
    </button>
  );
}
