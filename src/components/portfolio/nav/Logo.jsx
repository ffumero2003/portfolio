import { useRef } from "react";
import Lottie from "lottie-react";
import logoAnim from "../../lottie/LogoPortfolio.json"; 

export default function Logo() {
  const ref = useRef(null);

  const FPS = logoAnim.fr ?? 30;
  const start = Math.floor(FPS * 0.6);
  const end = Math.floor(FPS * 2.5);

  return (
    <a
      href="#hero"
      className="inline-block w-12 h-12"
      onMouseEnter={() => {
        const item = ref.current?.animationItem;
        if (!item) return;
        item.setLoop(true);
        ref.current.playSegments([start, end], true);
      }}
      onMouseLeave={() => {
        const item = ref.current?.animationItem;
        if (!item) return;
        item.setLoop(false);
        item.stop();
      }}
    >
      <style>{`
        .logo-svg [fill], .logo-svg [stroke] {
          fill: #004752 !important;
          stroke: #004752 !important;
          transition: fill .2s ease, stroke .2s ease;
        }
        .dark .logo-svg [fill], .dark .logo-svg [stroke] {
          fill: var(--color-primary) !important;
          stroke: var(--color-primary) !important;
        }
      `}</style>

      <Lottie
        lottieRef={ref}
        animationData={logoAnim}  
        autoplay={false}
        loop={false}
        className="w-12 h-12"
        renderer="svg"
        rendererSettings={{ className: "logo-svg" }}
      />
    </a>
  );
}
