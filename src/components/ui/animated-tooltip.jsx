"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

// Aceternity's Animated Tooltip, ported to JSX and adapted for square logos.
// A pointer over an item reveals a card with its name and category that tilts
// toward the cursor.
//
// Input handling differs by device on purpose: a mouse reveals on hover, while
// touch toggles on tap and dismisses when the next tap lands elsewhere. Without
// that split, phones get no labels at all, since there is no hover there.
//
// `onActiveChange` reports whether any tooltip is currently open, so a parent
// (the marquee) can pause its animation while one is being read.
// Change this when the card needs different content than name + designation.
export const AnimatedTooltip = ({ items, circular = false, onActiveChange }) => {
  const [activeId, setActiveId] = useState(null);

  // Rotation and horizontal drift are driven by where the pointer sits inside
  // the hovered tile, so the card leans toward the cursor.
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  // Kept in a ref so the effect below does not need the callback as a
  // dependency, which would re-run it on every parent render.
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;

  useEffect(() => {
    onActiveChangeRef.current?.(activeId !== null);
  }, [activeId]);

  // Any tap outside a tile closes an open tooltip. Only attached while one is
  // open, so there is no idle listener on the document.
  //
  // The setTimeout is load-bearing, not a hack: pointerdown is a discrete
  // event, so React flushes this effect synchronously while the very tap that
  // opened the tooltip is still bubbling up to the document. Attaching
  // immediately means that same tap closes what it just opened, which on touch
  // looks like tapping does nothing at all. Deferring by a tick lets the
  // opening event finish first.
  useEffect(() => {
    if (activeId === null) return;

    const onDocumentPointerDown = (event) => {
      if (!event.target.closest?.("[data-tooltip-item]")) setActiveId(null);
    };

    let detach = () => {};
    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", onDocumentPointerDown);
      detach = () =>
        document.removeEventListener("pointerdown", onDocumentPointerDown);
    }, 0);

    return () => {
      clearTimeout(timer);
      detach();
    };
  }, [activeId]);

  // Maps the pointer to a -100..100 range relative to the tile's own width.
  const handlePointerMove = (event) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item) => (
        <div
          // pointer-events-auto re-enables input on the tile itself, since a
          // parent may disable it to stop overlapping layout from stealing
          // taps. touch-manipulation removes the double-tap-to-zoom delay so
          // the first tap registers immediately.
          className={`group pointer-events-auto relative touch-manipulation ${circular ? "-mr-4" : ""}`}
          key={item.id}
          data-tooltip-item
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") setActiveId(item.id);
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setActiveId(null);
          }}
          onPointerDown={(e) => {
            // Touch and pen toggle, so a second tap on the same tile closes it.
            if (e.pointerType !== "mouse") {
              setActiveId((current) => (current === item.id ? null : item.id));
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {activeId === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: "nowrap",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-outline)",
                }}
                className="pointer-events-none absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl"
              >
                {/* Two gradient hairlines under the card, from the original */}
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold">
                  {item.name}
                </div>
                <div className="text-xs opacity-70">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {circular ? (
            <img
              onPointerMove={handlePointerMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          ) : (
            <div
              onPointerMove={handlePointerMove}
              className="relative grid h-20 w-20 place-items-center rounded-xl border shadow-sm transition duration-500 group-hover:z-30 group-hover:scale-110 sm:h-24 sm:w-24"
              style={{
                background: "var(--color-tile)",
                borderColor: "var(--color-tile-border)",
              }}
            >
              <img
                height={80}
                width={80}
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
