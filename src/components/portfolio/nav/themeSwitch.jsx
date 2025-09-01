import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const KEY = "theme"; // "dark" | "light"

export default function ThemeSwitch() {
  
  const initialDark = useMemo(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "dark") return true;
      if (saved === "light") return false;
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }, []);

  const [checked, setChecked] = useState(initialDark);

 
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", checked);
  }, [checked]);

  
  useEffect(() => {
    try {
      localStorage.setItem(KEY, checked ? "dark" : "light");
    } catch {}
  }, [checked]);

  
  useEffect(() => {
    const mm = window.matchMedia?.("(prefers-color-scheme: dark)");

    const onStorage = (e) => {
      if (e.key === KEY && e.newValue) {
        setChecked(e.newValue === "dark");
      }
    };

    const onMedia = (e) => {
      
      if (!localStorage.getItem(KEY)) {
        setChecked(e.matches);
      }
    };

    window.addEventListener("storage", onStorage);
    mm?.addEventListener?.("change", onMedia);

    return () => {
      window.removeEventListener("storage", onStorage);
      mm?.removeEventListener?.("change", onMedia);
    };
  }, []);

  const onToggle = () => setChecked((prev) => !prev);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label="Toggle dark mode"
      className={[
        "relative inline-flex items-center w-16 h-8 p-1 rounded-full cursor-pointer",
        checked ? "bg-slate-700" : "bg-slate-200",
        "transition-all duration-300 ease-out",
        checked ? "justify-end" : "justify-start",
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500",
      ].join(" ")}
    >
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white shadow transition-all duration-300">
        {checked ? (
          <FontAwesomeIcon icon={faMoon} className="text-slate-800" />
        ) : (
          <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
}
