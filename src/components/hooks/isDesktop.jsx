import { useEffect, useState } from "react";

export default function useIsDesktop(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width:${minWidth}px)`);
    const onChange = (e) => set(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [minWidth]);

  return isDesktop;
}
