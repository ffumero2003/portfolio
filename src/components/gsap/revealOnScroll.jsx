// components/RevealOnScroll.jsx (versión ultra básica)
import { useEffect, useRef } from "react";

export default function RevealOnScroll({
  children,
  as: Tag = "div",
  className = "",
  offset = "0px 0px -10% 0px", // empieza a revelar un poco antes del viewport bottom
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // estado inicial: invisible y ligeramente desplazado
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.willChange = "transform, opacity";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // animación CSS con transition; nada de filtros ni scale
            el.style.transition = "transform 420ms cubic-bezier(.22,.61,.36,1), opacity 420ms";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            if (once) io.unobserve(el);
          } else if (!once) {
            // si no es once, puede revertir al salir
            el.style.opacity = "0";
            el.style.transform = "translateY(14px)";
          }
        });
      },
      { root: null, rootMargin: offset, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [offset, once]);

  return (
    <Tag ref={ref} className={`transform-gpu ${className}`}>
      {children}
    </Tag>
  );
}
