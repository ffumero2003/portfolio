import { useEffect, useRef, useState } from "react";
import { initLordicon } from "../utils/initLordIcon";

export default function LazyLordIcon({
  src,
  trigger = "hover",
  colors,
  style,
  className,
  width = 256,
  height = 256,
  ...rest
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        initLordicon().then(() => setReady(true));
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const boxStyle = { width, height, ...style };

  return ready ? (
    <lord-icon
      ref={ref}
      src={src}
      trigger={trigger}
      colors={colors}
      style={boxStyle}
      class={className}
      {...rest}
    />
  ) : (
    <div
      ref={ref}
      style={boxStyle}
      className={`rounded-xl animate-pulse bg-black/5 dark:bg-white/5 ${className || ""}`}
      aria-hidden="true"
    />
  );
}
