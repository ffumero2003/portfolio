import ButtonPrimary from "./buttonPrimary";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import LazyLordIcon from "../lazyLordIcon";

const SERVICE_ID = "service_59vogi8";
const TEMPLATE_ID = "template_2446eso";
const PUBLIC_KEY  = "jfCWnm3h4UylhLaps";

export default function ContactSection() {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); 
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formEl = formRef.current;
    if (!formEl) return;

    setLoading(true);
    setSent(false);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl, { publicKey: PUBLIC_KEY });
      formEl.reset();
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => (loading ? "Sending..." : sent ? "Sent!" : "Submit");

  return (
    <section className="w-full py-4 px-6 bg-[var(--color-surface)] opacity-85 text-[var(--color-text)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-24 items-center ">
        {/* LEFT — solo desktop */}
        <div className="hidden md:flex justify-center md:justify-end " aria-hidden={!isDesktop}>
          {isDesktop && (
            <LazyLordIcon
              src="https://cdn.lordicon.com/jdgfsfzr.json"
              trigger="hover"
              colors={
                isDark
                  ? "primary:#2bb3b1,secondary:#71e6c4"
                  : "primary:#1a344a,secondary:#ACCFD5"
              }
              width={512}
              height={512}
              className="block w-full h-auto max-w-[420px]"
              style={{ aspectRatio: "1 / 1" }}
            />
          )}
        </div>

        {/* RIGHT */}
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6 w-full">
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">Full Name</label>
            <input
              type="text"
              name="from_name"
              placeholder="Name..."
              required
              minLength={3}
              className="mt-1 w-full rounded-lg px-4 py-3 outline-none bg-[var(--color-surface)] text-[var(--color-text)] border border-[color-mix(in_oklab,var(--color-muted),var(--color-text)_15%)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">Email</label>
            <input
              type="email"
              name="from_email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-lg px-4 py-3 outline-none bg-[var(--color-surface)] text-[var(--color-text)] border border-[color-mix(in_oklab,var(--color-muted),var(--color-text)_15%)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">Message</label>
            <textarea
              rows={5}
              name="message"
              placeholder="Write your message..."
              required
              minLength={10}
              className="mt-1 w-full rounded-lg px-4 py-3 outline-none bg-[var(--color-surface)] text-[var(--color-text)] border border-[color-mix(in_oklab,var(--color-muted),var(--color-text)_15%)] focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <ButtonPrimary text={getButtonText()} type="submit" disabled={loading} />
        </form>
      </div>
    </section>
  );
}
