import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import logoAnim from "../../lottie/LogoPortfolio.json"; 

export default function Logo() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const FPS = logoAnim.fr ?? 30;
  const start = Math.floor(FPS * 0.6);
  const end = Math.floor(FPS * 2.5);

  
  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none)").matches);
  }, []);

  const playAnimation = () => {
    const item = ref.current?.animationItem;
    if (!item) return;
    item.setLoop(false); 
    ref.current.playSegments([start, end], true);
  };

  const handleDesktopEnter = () => {
    playAnimation();
  };

  const handleDesktopClick = (e) => {
    e.preventDefault();
    navigate("/"); 
  };

  const handleMobileClick = (e) => {
    e.preventDefault();
    playAnimation(); 
  };

  return (
    <a
      href={isMobile ? undefined : "/"}
      className="inline-block w-12 h-12"
      onMouseEnter={!isMobile ? handleDesktopEnter : undefined}
      onClick={isMobile ? handleMobileClick : handleDesktopClick}
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
