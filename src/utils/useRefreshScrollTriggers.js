import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getGSAP } from "./gsap"; 

export function useRefreshScrollTriggers() {
  const { ScrollTrigger } = getGSAP();
  const location = useLocation();

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(true), 300);
    return () => clearTimeout(id);
  }, [location.pathname, ScrollTrigger]);
}
