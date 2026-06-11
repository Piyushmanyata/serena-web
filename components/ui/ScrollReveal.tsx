"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-in" | "scale-up";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delayMs = 0,
  durationMs = 800,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const getVariantStyles = () => {
    switch (variant) {
      case "fade-in":
        return {
          opacity: isVisible ? 1 : 0,
          transform: "none",
        };
      case "scale-up":
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.95)",
        };
      case "fade-up":
      default:
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
        };
    }
  };

  return (
    <div
      ref={ref}
      className={["scroll-reveal", className].filter(Boolean).join(" ")}
      style={{
        ...getVariantStyles(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
