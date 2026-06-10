"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: isOpen ? "var(--serena-gold)" : "rgba(198,161,91,0.24)",
        background: isOpen ? "rgba(255,250,243,0.95)" : "rgba(255,250,243,0.78)",
        boxShadow: isOpen ? "0 4px 20px rgba(198, 161, 91, 0.08)" : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left p-5 focus:outline-none"
      >
        <span className="font-serif text-base md:text-lg font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>
          {question}
        </span>
        <span
          className="w-6 h-6 flex items-center justify-center rounded-full border text-xs font-bold transition-transform duration-300 flex-shrink-0 ml-4"
          style={{
            borderColor: "var(--serena-gold)",
            color: "var(--serena-gold)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            background: isOpen ? "rgba(198,161,91,0.1)" : "transparent",
          }}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <ScrollReveal key={faq.question} variant="fade-up" delayMs={index * 50}>
          <FAQItem
            question={faq.question}
            answer={faq.answer}
            defaultOpen={index < 2}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
