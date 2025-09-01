import Logo from "./nav/Logo";
import ButtonPrimary from "./buttonPrimary";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Theme from "./nav/themeSwitch";
import CvButton from "./cvButton";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  return (
    <header
      className="navbar top-0 inset-x-0 z-20 h-16 md:h-14 w-full"
      style={{ color: "var(--color-text)", background: "transparent" }}
    >
      <nav className="relative h-full w-full px-3 md:px-4 lg:px-8 py-2">
        <div
          className="relative flex w-full items-center justify-between rounded-md"
          style={{ color: "var(--color-text)" }}
        >
          {/* LEFT */}
          <div className="shrink-0 z-10 flex items-center gap-2 md:gap-2">
            <Logo />
            <div className="hidden md:block md:scale-95 lg:scale-100">
              <CvButton />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 z-10 md:scale-95 lg:scale-100">
            <Theme />
            <a href="#contact" className="md:scale-95 lg:scale-100 origin-center">
              <ButtonPrimary text="Contact" />
            </a>
          </div>

          {/* RIGHT Hamburger */}
          <button
            ref={btnRef}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus-visible:ring-2"
            aria-label="Toggle Menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              color: "var(--color-primary)",
              background: "transparent",
              boxShadow: "0 0 0 0 var(--color-outline)",
            }}
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              className="w-5 h-5"
              style={{ color: "var(--color-primary)" }}
            />
          </button>

          {/* CENTER MENU */}
          <div className="pointer-events-none md:pointer-events-auto hidden md:flex absolute inset-0 items-center justify-center">
            <div
              className="pointer-events-auto flex items-center gap-6 md:gap-8 lg:gap-12 rounded-3xl backdrop-blur-sm px-8 md:px-10 lg:px-20 py-1.5 md:py-2 md:scale-95 lg:scale-100"
              style={{
                background:
                  "color-mix(in srgb, var(--color-surface) 95%, transparent)",
                color: "var(--color-text)",
                border: "1px solid var(--color-outline)",
              }}
            >
              <a
                href="#about"
                data-scramble
                data-final="About Me"
                className="text-sm md:text-base lg:text-lg"
                style={{ color: "var(--color-text)" }}
              >
                About Me
              </a>
              <a
                href="#skills"
                data-scramble
                data-final="Skills"
                className="text-sm md:text-base lg:text-lg"
                style={{ color: "var(--color-text)" }}
              >
                Skills
              </a>
              <a
                href="#projects"
                data-scramble
                data-final="Projects"
                className="text-sm md:text-base lg:text-lg"
                style={{ color: "var(--color-text)" }}
              >
                Projects
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE  */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`md:hidden fixed left-3 right-3 top-3 z-50 origin-top rounded-2xl
          transition-transform duration-250 will-change-transform will-change-opacity
          ${open ? "translate-y-0 opacity-100 pointer-events-auto"
                 : "-translate-y-full opacity-0 "}`}
        aria-hidden={!open}
        style={{
          background:
            "color-mix(in srgb, var(--color-surface) 95%, transparent)",
          color: "var(--color-text)",
          border: "1px solid var(--color-outline)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="px-5 py-4">
          <a
            href="#about"
            className="block rounded-lg px-3 py-2"
            onClick={() => setOpen(false)}
            style={{
              color: "var(--color-text)",
              background:
                "color-mix(in srgb, var(--color-text) 0%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 10%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 0%, transparent)")
            }
          >
            About Me
          </a>
          <a
            href="#skills"
            className="block rounded-lg px-3 py-2"
            onClick={() => setOpen(false)}
            style={{
              color: "var(--color-text)",
              background:
                "color-mix(in srgb, var(--color-text) 0%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 10%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 0%, transparent)")
            }
          >
            Skills
          </a>
          <a
            href="#projects"
            className="block rounded-lg px-3 py-2"
            onClick={() => setOpen(false)}
            style={{
              color: "var(--color-text)",
              background:
                "color-mix(in srgb, var(--color-text) 0%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 10%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--color-text) 0%, transparent)")
            }
          >
            Projects
          </a>

          <div className="px-2 pt-2">
            <a  href="#contact">
              <ButtonPrimary text="Contact" />
            </a>
          </div>

          <div className="px-2 pt-2">
            <CvButton />
          </div>

          <div className="px-2 pt-2">
            <Theme />
          </div>
        </div>
      </div>
    </header>
  );
}
