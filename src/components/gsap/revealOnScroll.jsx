import { useLayoutEffect, useRef } from "react";
import { getGSAP } from "../../utils/gsap";

/**
 * RevealOnScroll
 * - Desktop: toggle-based, suave (sin scrub)
 * - Mobile: desactivado por defecto (enableOnMobile=false)
 * - immediateRender:false, invalidateOnRefresh y refresh tras carga de imágenes
 * - Respeta prefers-reduced-motion
 */
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
  once = false,                      // si true: play una vez
  toggleActions = "play none none reverse",
  markers = false,
  // opts
  enableOnMobile = false,            // ← por defecto DESACTIVADO en mobile
  // element
  as: Tag = "div",
  className = "",
}) {
  const el = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const { gsap } = getGSAP();
    // suavecidad global de render
    gsap.config({ force3D: true });

    const ctx = gsap.context(() => {
      const root = el.current;
      if (!root) return;

      const isMobile = window.matchMedia?.("(max-width: 1023.98px)")?.matches;

      // Si mobile y no queremos animar: pinta visible y listo
      if ((isMobile && !enableOnMobile) || prefersReduced) {
        const targets =
          root.children && root.children.length > 1 ? root.children : root;
        gsap.set(targets, { clearProps: "all", autoAlpha: 1, x: 0, y: 0 });
        return;
      }

      const targets =
        root.children && root.children.length > 1 ? root.children : root;

      const fromVars =
        typeof from === "function" ? from({ y: to?.y ?? 0 }) : from;

      gsap.fromTo(
        targets,
        { ...fromVars, willChange: "transform, opacity" },
        {
          ...to,
          immediateRender: false,
          duration,
          ease,
          delay,
          stagger,
          clearProps: "willChange",
          scrollTrigger: {
            trigger: root,
            start,
            end,
            scrub: false, // ← sin scrub
            markers,
            toggleActions: once ? "play none none none" : toggleActions,
            invalidateOnRefresh: true,
          },
        }
      );

      // Refresh cuando cargan imágenes (evita desfases en mobile/desktop)
      const imgs = root.querySelectorAll?.("img");
      imgs?.forEach((img) => {
        if (img.complete) return;
        img.addEventListener(
          "load",
          () => {
            try {
              gsap.core.globals().ScrollTrigger?.refresh(true);
            } catch {}
          },
          { once: true, passive: true }
        );
      });

      // Extra: refresh al cargar todo
      const onLoad = () => {
        try {
          gsap.core.globals().ScrollTrigger?.refresh(true);
        } catch {}
      };
      window.addEventListener("load", onLoad, { once: true, passive: true });
    }, el);

    return () => ctx.revert();
  }, [
    from,
    to,
    duration,
    ease,
    delay,
    stagger,
    start,
    end,
    once,
    toggleActions,
    markers,
    enableOnMobile,
  ]);

  return (
    <Tag ref={el} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
