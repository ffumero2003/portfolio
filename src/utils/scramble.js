export function initScramble({
  selector = "[data-scramble]",
  duration = 800,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  flickerMin = 80,
  flickerMax = 140
} = {}) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const getEventElement = (e) => {
    const path = e.composedPath?.();
    if (path && path.length) {
      const first = path[0];
      if (first instanceof Element) return first;
      return first?.parentElement ?? null;
    }
    if (e.target instanceof Element) return e.target;
    return e.target?.parentElement ?? null;
  };

  const forceReset = (el) => {
    if (!el) return;
    const finalText = el.getAttribute("data-final") ?? el.textContent ?? "";
    if (el._raf) cancelAnimationFrame(el._raf);
    el.textContent = finalText;
    el._scrambling = false;
  };

  const onEnter = (e) => {
    const base = getEventElement(e);
    if (!base) return;

    const el = base.closest(selector);
    if (!el) return;

    const finalText = el.getAttribute("data-final") ?? el.textContent ?? "";
    if (reduce) { el.textContent = finalText; return; }

    if (el._scrambling) return;
    el._scrambling = true;

    if (el._raf) cancelAnimationFrame(el._raf);

    const start = performance.now();
    const len = finalText.length;
    const temp     = new Array(len).fill("");
    const nextSwap = new Array(len).fill(0);
    const rand = () => chars[(Math.random() * chars.length) | 0];

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const reveal = Math.floor(p * len);
      let out = "";

      for (let i = 0; i < len; i++) {
        if (i < reveal) {
          out += finalText[i];
        } else {
          if (t >= nextSwap[i]) {
            temp[i] = rand();
            nextSwap[i] = t + flickerMin + Math.random() * (flickerMax - flickerMin);
          }
          out += temp[i] || (temp[i] = rand());
        }
      }

      el.textContent = out;
      if (p < 1) {
        el._raf = requestAnimationFrame(tick);
      } else {
        el.textContent = finalText;
        el._scrambling = false;
      }
    };

    el._raf = requestAnimationFrame(tick);

    const leave = () => { forceReset(el); 
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("blur", leave);
      el.removeEventListener("pointerleave", leave);
    };
    el.addEventListener("mouseleave", leave, { once: true });
    el.addEventListener("pointerleave", leave, { once: true });
    el.addEventListener("blur", leave, { once: true });

    
    const commit = () => forceReset(el);
    el.addEventListener("pointerdown", commit, { once: true, passive: true });
    el.addEventListener("click", commit, { once: true, passive: true });
    el.addEventListener("keydown", (ke) => {
      if (ke.key === "Enter" || ke.key === " ") commit();
    }, { once: true, passive: true });
  };

  document.addEventListener("pointerenter", onEnter, true);
  document.addEventListener("focusin", onEnter, true);

  return () => {
    document.removeEventListener("pointerenter", onEnter, true);
    document.removeEventListener("focusin", onEnter, true);
  };
}
