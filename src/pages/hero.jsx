import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsDesktop from "../components/hooks/isDesktop";
import HeroText from "../components/hero/heroText";
import HeroButton from "../components/hero/heroButton";
import Border from "../components/portfolio/border";

// Lazy 3D only when ready
const RobotViewer = lazy(() => import("../components/hero/robot"));

export default function Hero() {
  const navigate = useNavigate();
  // Desktop: >= 900 px
  const isDesktop = useIsDesktop(768);
  const [show3D, setShow3D] = useState(false);

  // If mobile, redirect after mount (don’t do anything else)
  useEffect(() => {
    if (isDesktop === false) {
      // small timeout avoids racing with initial paint/hydration
      const t = setTimeout(() => navigate("/portfolio", { replace: true }), 150);
      return () => clearTimeout(t);
    }
  }, [isDesktop, navigate]);

  // Preload heavy stuff when idle (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const start = () => {
      import("../components/portfolio/vantaBg");
      import("../components/portfolio/navigation");
      import("../components/portfolio/title/headline");
      import("../components/portfolio/timelineSection");
      import("../components/portfolio/skills");
      import("../components/portfolio/aboutMe");
    };
    const id =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1200 })
        : setTimeout(start, 400);
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback?.(id);
      else clearTimeout(id);
    };
  }, [isDesktop]);

  // Show 3D a moment later (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const start = () => setShow3D(true);
    const id =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(start, { timeout: 1200 })
        : setTimeout(start, 400);
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback?.(id);
      else clearTimeout(id);
    };
  }, [isDesktop]);

  if (isDesktop === undefined) return null; // espera a medir
  if (isDesktop === false) return <div style={{ display: "none" }} />;

  return (
    <motion.div
      className="relative min-h-screen w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background 3D */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        <div className="w-full h-full scale-[1.08] origin-center">
          {show3D && (
            <Suspense fallback={null}>
              <RobotViewer />
            </Suspense>
          )}
        </div>
      </div>

      {/* Text */}
      <div className="fixed top-12 inset-x-0  flex justify-center px-4 pointer-events-none">
        <HeroText className="w-11/12" />
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 inset-x-0 z-20 flex justify-center">
        <HeroButton onClick={() => navigate("/portfolio")} aria="Go to Portfolio" />
      </div>

      {/* Decorative border between bg and content */}
      <div className="fixed inset-0 -z-5">
        <Border />
      </div>
    </motion.div>
  );
}
