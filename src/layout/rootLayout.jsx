import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { initScramble } from "../utils/scramble";
import CustomCursor from "../components/lottieCursor";
import { useRefreshScrollTriggers } from "../utils/useRefreshScrollTriggers";

export default function RootLayout() {
  useRefreshScrollTriggers();
  const location = useLocation();

  useEffect(() => {
    const dispose = initScramble({
      selector: "[data-scramble]",
      duration: 900,
      flickerMin: 180,
      flickerMax: 320,
    });
    return dispose;
  }, []);

  return (
    <div className="w-screen min-h-dvh"> 
      <CustomCursor />

      <AnimatePresence mode="sync">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.12 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
