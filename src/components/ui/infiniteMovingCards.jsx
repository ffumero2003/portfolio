"use client";

import React, { useLayoutEffect, useRef } from "react";
import { cn as cnImp } from "../../lib/utils.jsx";

const cn = (...a) => (typeof cnImp === "function" ? cnImp(...a) : a.filter(Boolean).join(" "));

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  renderItem,
  cardClassName = "",
  itemKey = (it, i) => it?.name ?? it?.alt ?? i,
  gap = "0.5rem",
  bare = false,
  maskEdges = false,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    let originals = [];
    if (!scroller.dataset.imcCloned) {
      originals = Array.from(scroller.children);
    } else {
      const kids = Array.from(scroller.children);
      originals = kids.slice(0, kids.length / 2);
    }

    
    if (!scroller.dataset.imcCloned) {
      const blockClone = document.createDocumentFragment();
      originals.forEach((node) => blockClone.appendChild(node.cloneNode(true)));
      scroller.appendChild(blockClone);
      scroller.dataset.imcCloned = "1";
    }


    const cs = getComputedStyle(scroller);
    const gapPx = parseFloat(cs.columnGap || cs.gap || "0") || 0;

    const firstHalf = Array.from(scroller.children).slice(0, originals.length);

    const measureFirstWidth = () => {
      const last = firstHalf[firstHalf.length - 1];
      const rectFirst = firstHalf[0].getBoundingClientRect();
      const rectLast = last.getBoundingClientRect();
      const width = rectLast.right - rectFirst.left;
      return Math.round(width + gapPx); 
    };

    
    const ensureFilled = () => {
      const containerW = container.clientWidth;
      let firstW = measureFirstWidth();

      
      while (firstW < containerW) {
        const insertIndex = originals.length;
        const blockClone = document.createDocumentFragment();
        originals.forEach((node) => blockClone.appendChild(node.cloneNode(true)));
        scroller.insertBefore(blockClone, scroller.children[insertIndex]);

        const kids = Array.from(scroller.children);
        const newFirstHalf = kids.slice(0, kids.length / 2);
        firstHalf.splice(0, firstHalf.length, ...newFirstHalf);
        firstW = measureFirstWidth();
      }

      return firstW;
    };

    const firstBlockWidth = ensureFilled();

    // 5) variables de animación (dirección/duración/recorrido en PX)
    container.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    container.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "25s" : speed === "normal" ? "30s" : "35s"
    );
    container.style.setProperty("--imc-distance", `-${firstBlockWidth}px`);

  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 w-full overflow-x-hidden",
        className
      )}
    >
      <style>{`
        @keyframes imc-scroll {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(var(--imc-distance, -50%),0,0); }
        }
        .imc-animate {
          animation-name: imc-scroll;
          animation-duration: var(--animation-duration, 40s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--animation-direction, forwards);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .imc-animate { animation: none; }
        }
      `}</style>

      <ul
        ref={scrollerRef}
        style={{
          "--imc-gap": gap,
          "--imc-gap-half": `calc(var(--imc-gap) / 2)`,
          gap: "var(--imc-gap)",
        }}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap py-2 imc-animate",
          pauseOnHover && "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={itemKey(item, idx)}
            className={cn(
              "shrink-0",
              !bare && [
                "rounded-xl border border-zinc-200 dark:border-zinc-700",
                "bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] dark:bg-[linear-gradient(180deg,#27272a,#18181b)]",
                "px-3 py-2",
              ],
              cardClassName
            )}
          >
            {renderItem ? renderItem(item, idx) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
