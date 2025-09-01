import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import cursorNormal from "./lottie/Hover alert.json";

const INTERACTIVE_SELECTOR = `
  button, a, input, textarea, select, label, summary,
  [role="button"], [data-cursor="interactive"],
  [tabindex]:not([tabindex="-1"]),
  [contenteditable=""], [contenteditable="true"]
`;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [desktop, setDesktop] = useState(true);


  useEffect(() => {
    const checkScreen = () => setDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

 
  useEffect(() => {
    if (!desktop) {
      document.body.style.cursor = "auto";
      return;
    }

    const moveCursor = (e) => {
      const el = cursorRef.current;
      if (el) {
        el.style.left = `${e.clientX}px`;
        el.style.top  = `${e.clientY}px`;
      }

      const interactive = !!e.target.closest(INTERACTIVE_SELECTOR);
      setIsInteractive(interactive);

      // cursor nativo
      document.body.style.cursor = interactive ? "pointer" : "none";

      // opacity del cursor custom
      if (el) el.style.opacity = interactive ? "0" : "1";
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.body.style.cursor = "none"; //  inicial

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.body.style.cursor = "auto"; 
    };
  }, [desktop]);

  if (!desktop) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed left-0 top-0 w-24 h-24 pointer-events-none z-[9999]
        -translate-x-1/2 -translate-y-1/2
        ${isInteractive ? "opacity-0" : "opacity-100"}`}
      style={{ transition: "opacity 150ms ease-in-out" }}
    >
      <Lottie animationData={cursorNormal} loop={false} autoplay={false} />
    </div>
  );
}
