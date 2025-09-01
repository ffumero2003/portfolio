import { lazy, Suspense } from "react";
import RotatingTitle from "./rotatingTitle";
import ButtonPrimary from "../buttonPrimary";

const TitleSection = lazy(() => import("./titleSection"));

export default function Headline() {
  return (
    <>
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-3xl border p-7 mt-5"
           style={{ background: "var(--color-surface)", borderColor: "var(--color-outline)", color: "var(--color-text)" }}>
        <h1 className="relative font-extrabold leading-tight">
          <span className="text-2xl md:text-3xl">
            Motion with{" "}
            <RotatingTitle
              words={["Intent","Precision","Taste","Purpose","Consistency"]}
              interval={2500}
            />
          </span>
          <span className="absolute left-0 right-0 -bottom-2 h-[3px] rounded-full"
                style={{ background:
                  "linear-gradient(90deg," +
                  "color-mix(in srgb, var(--color-primary) 30%, transparent) 0%," +
                  "color-mix(in srgb, var(--color-primary) 60%, transparent) 50%," +
                  "color-mix(in srgb, var(--color-primary) 10%, transparent) 100%)" }} />
        </h1>

        <h2 className="text-lg md:text-xl mt-6">
          From static layouts to living, purposeful interfaces
        </h2>

        <div className="mt-6  w-fit">
          <a href="#projects"><ButtonPrimary text="See Projects" /></a>
        </div>
      </div>

      <div className="w-11/12 md:w-3/6">
        <div className="aspect-[1/1] rounded-3xl  pointer-events-none -z-10" aria-hidden="true">
          <Suspense fallback={<div className="w-full h-full animate-pulse rounded-3xl" />}>
            <TitleSection />
          </Suspense>
        </div>
      </div>
    </>
  );
}
