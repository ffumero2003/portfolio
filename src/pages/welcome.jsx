import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Border from "../components/portfolio/border";
import WelcomeText from "../components/welcome/welcomeText";
import useIsDesktop from "../components/hooks/isDesktop";

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  // Desktop: >= 900 px
  const isDesktop = useIsDesktop(900);

  useEffect(() => {
    const target = isDesktop ? "/hero" : "/portfolio";
    // Evita navegación redundante si ya estás en el destino
    if (location.pathname === target) return;
    const t = setTimeout(() => navigate(target, { replace: true }), 3000);
    return () => clearTimeout(t);
  }, [isDesktop, navigate, location.pathname]);

  return (
    <motion.div
      className="flex justify-center items-center w-screen h-screen relative"
      style={{ background: "var(--color-surface)", color: "var(--color-text)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <WelcomeText />
      <Border />
    </motion.div>
  );
}
