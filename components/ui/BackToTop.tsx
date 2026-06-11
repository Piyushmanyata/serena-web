"use client";

import { useEffect, useRef, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const scrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateVisible = () => {
      setVisible(window.scrollY > 400);
      scrollRafRef.current = null;
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = window.requestAnimationFrame(updateVisible);
    };

    updateVisible();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={[
        "fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-1.5 active:scale-95 focus:outline-none",
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-75 pointer-events-none",
      ].join(" ")}
      style={{
        background: "rgba(255, 250, 243, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "rgba(198, 161, 91, 0.45)",
        color: "var(--serena-burgundy)",
        boxShadow: "0 4px 20px rgba(198,161,91,0.2), 0 1px 0 rgba(255,255,255,0.8) inset",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
