"use client";

import React, { useState } from "react";
import { AnimatedTooltip } from "./animated-tooltip";

// A scrolling logo row whose items stay React components, so an animated
// tooltip can live on every one of them.
//
// The list is rendered twice in JSX and the track slides exactly -50%, which is
// one copy-width, so the loop is seamless with no measurement. Duplicating in
// the DOM instead (cloneNode) would produce copies React cannot see, leaving
// most logos unresponsive to hover and tap.
//
// Change this when the row needs a different duplication count — then the -50%
// in the keyframes must change to match (e.g. -33.333% for three copies).
export function MarqueeTooltipRow({
  items,
  direction = "left",
  duration = 40,
  gap = "0.5rem",
}) {
  // One flag per copy. This is the only pause mechanism for pointers: the
  // track cannot use CSS :hover because it is pointer-events-none (see below),
  // and touch never fires :hover anyway. An open tooltip pauses its row so the
  // tile being read does not scroll out from under its own label.
  const [activeCopies, setActiveCopies] = useState([false, false]);
  const isPaused = activeCopies.some(Boolean);

  const setCopyActive = (copyIndex, active) =>
    setActiveCopies((current) => {
      if (current[copyIndex] === active) return current;
      const next = [...current];
      next[copyIndex] = active;
      return next;
    });

  return (
    // pointer-events-none is essential, not cosmetic. Rows are pulled together
    // with negative margins, so each row's reserved tooltip padding physically
    // overlaps the row above it. Later rows paint last, so without this their
    // invisible padding swallows every hover and tap aimed at the row beneath.
    // The tiles themselves re-enable pointer events.
    <div className="pointer-events-none relative w-full overflow-x-hidden">
      <MarqueeKeyframes />

      <div
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        // Padding is asymmetric on purpose: the tooltip only ever opens
        // upward, so the top needs ~80px of room to avoid the wrapper's
        // overflow clipping it, while the bottom needs almost none. That is
        // what lets consecutive rows sit tightly together.
        className="marquee-track flex w-max flex-nowrap items-center pb-2 pt-20 focus-within:[animation-play-state:paused]"
      >
        {/* Two identical copies. Each gets its own AnimatedTooltip instance so
            the copies keep independent state and never both pop open.
            The gap lives inside each copy plus one trailing margin, never on
            the track itself — that keeps each copy exactly half the track
            width, which is what makes the -50% slide seamless. */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            style={{ gap, marginRight: gap }}
            className="flex flex-nowrap items-center"
            aria-hidden={copy === 1}
          >
            <AnimatedTooltip
              items={items}
              onActiveChange={(active) => setCopyActive(copy, active)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Keyframes are inlined because this project runs Tailwind v3 with no custom
// animation entries in tailwind.config.cjs.
function MarqueeKeyframes() {
  return (
    <style>{`
      @keyframes marquee-slide {
        0%   { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      .marquee-track {
        animation-name: marquee-slide;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        will-change: transform;
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track { animation: none; }
      }
    `}</style>
  );
}
