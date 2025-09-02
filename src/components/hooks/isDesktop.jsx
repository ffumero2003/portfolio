import { useEffect, useState } from "react";

export default function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width:${minWidth}px)`);
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [minWidth]);

  return isDesktop;
}
