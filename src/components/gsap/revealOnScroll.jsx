// gsap/revealOnScroll.jsx
import { useLayoutEffect, useRef } from "react";
import { getGSAP } from "../../utils/gsap";

export default function RevealOnScroll({
  children,
  // motion
  from = ({ y = 20 } = {}) => ({ y, autoAlpha: 0 }),
  to = { y: 0, autoAlpha: 1 },
  duration = 0.65,
  ease = "power2.out",
  delay = 0,
  stagger = 0,
  // trigger
  start = "top 88%",
  end,
  once = false,
  toggleActions = "play none none reverse",
  markers = false,
  // opts
  enableOnMobile = false,
  refreshOnLoad = false,       // ⟵ opcional: por defecto no refresca en load/img
  // element
  as: Tag = "div",
  className = "",
}) {
  const el = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const { gsap, ScrollTrigger } = getGSAP();
    gsap.config({ force3D: true });

    let refreshTimer = null;
    const debouncedRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        try { ScrollTrigger?.refresh(true); } catch {}
      }, 120);
    };

    const ctx = gsap.context(() => {
      const root = el.current;
      if (!root) return;

      const isMobile = window.matchMedia?.("(max-width: 1023.98px)")?.matches;

      if ((isMobile && !enableOnMobile) || prefersReduced) {
        const targets =
          root.children && root.children.length > 1 ? root.children : root;
        gsap.set(targets, { clearProps: "all", autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      const targets =
        root.children && root.children.length > 1 ? root.children : root;

      const fromVars = typeof from === "function" ? from() : from;

      gsap.fromTo(
        targets,
        { ...fromVars, willChange: "transform, opacity, filter" },
        {
          ...to,
          immediateRender: false,
          duration,
          ease,
          delay,
          stagger,
          clearProps: "willChange, filter",
          scrollTrigger: {
            trigger: root,
            start,
            end: end ?? "+=1", // ⟵ evita rebote inmediato enter/leave
            scrub: false,
            markers,
            toggleActions: once ? "play none none none" : toggleActions,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            anticipatePin: 0.5,
            // Fix: desactiva el trigger tras la primera entrada si once=true
            onEnter(self) { if (once) self.disable(); },
            onEnterBack(self) { if (once) self.disable(); },
          },
        }
      );

      // Refrescos opcionales (desactivados por defecto)
      if (refreshOnLoad) {
        const imgs = root.querySelectorAll?.("img");
        imgs?.forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", debouncedRefresh, { once: true, passive: true });
          }
        });
        window.addEventListener("load", debouncedRefresh, { once: true, passive: true });
      }
    }, el);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [
    from, to, duration, ease, delay, stagger, start, end,
    once, toggleActions, markers, enableOnMobile, refreshOnLoad,
  ]);

  return (
    <Tag ref={el} className={`will-change-transform transform-gpu ${className}`}>
      {children}
    </Tag>
  );
}
