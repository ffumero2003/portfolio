import { useEffect, useRef } from "react";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}
const cssVar = (name, fallback="#000") =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

function colorToInt(input, fallback = 0x000000) {
  if (!input) return fallback;
  let s = String(input).trim().toLowerCase();
  if (s.startsWith("#")) {
    let hex = s.slice(1);
    if (hex.length === 3) hex = hex.split("").map(ch => ch+ch).join("");
    if (hex.length === 6) {
      const n = parseInt(hex, 16);
      return Number.isNaN(n) ? fallback : n;
    }
  }
  const m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const [r,g,b] = m[1].split(",").map(p => parseInt(p.trim(),10));
    return ((r&255)<<16)|((g&255)<<8)|(b&255);
  }
  return fallback;
}

function getThemeColors() {
  return {
    color1: colorToInt(cssVar("--vanta-1", "#1a344a")),
    color2: colorToInt(cssVar("--vanta-2", "#64a1a8")),
  };
}

export default function VantaBg() {
  const ref = useRef(null);
  const effectRef = useRef(null);
  const moRef = useRef(null);

  useEffect(() => {
    let disposed = false;

    async function ensureLibs() {
      if (!window.THREE) {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
      }
      if (!window.VANTA) {
        await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js");
      }
    }

    function mountVanta() {
      if (disposed || !ref.current || !window.VANTA || !window.THREE) return;

      try { effectRef.current?.destroy?.(); } catch {}

      const { color1, color2 } = getThemeColors();

      effectRef.current = window.VANTA.BIRDS({
        el: ref.current,
        THREE: window.THREE,
        backgroundAlpha: 0.0,
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        scale: 1.0,
        scaleMobile: 1.0,
        birdSize: 1.0,
        quantity: 4.5,
        speedLimit: 2.0,
        color1,
        color2,
      });
    }

    (async () => {
      await ensureLibs();
      mountVanta();

      moRef.current = new MutationObserver((mut) => {
        for (const m of mut) {
          if (m.type === "attributes" && m.attributeName === "class") {
            mountVanta();
            break;
          }
        }
      });
      moRef.current.observe(document.documentElement, { attributes: true });
    })();

    return () => {
      disposed = true;
      try { moRef.current?.disconnect?.(); } catch {}
      try { effectRef.current?.destroy?.(); } finally { effectRef.current = null; }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10  pointer-events-none"
    />
  );
}
