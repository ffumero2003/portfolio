import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Astronaut from "../../lottie/astronaut.json";

export default function TitleSection() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const start = () => setPlay(true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start);
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(start, 200);
      return () => clearTimeout(id);
    }
  }, []);

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  return (
    <Lottie
      animationData={Astronaut}
      autoplay={play && !reduce}
      loop={!reduce}
      rendererSettings={{ progressiveLoad: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
