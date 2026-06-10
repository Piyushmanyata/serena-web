import Link from "next/link";
import { FAQS } from "@/lib/constants";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQList } from "./FAQList";

export const metadata = {
  title: "FAQ — SERENA Jewellery Jars",
  description: "Answers about SERENA ordering, payment, delivery, customization, gifting, and returns.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Hero */}
      <section className="py-20 md:py-28 text-center relative overflow-hidden" style={{ background: "var(--serena-cream)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {["✨","🔮","💫"].map((e, i) => (
            <span key={i} className="absolute text-xl opacity-10 float-around" style={{ left: `${20 + i * 30}%`, top: `${30 + (i % 2) * 35}%`, animationDelay: `${i * 2}s` }}>{e}</span>
          ))}
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Help &amp; Support</div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Questions before you order</h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              Clear answers about the mystery jar experience, custom curation, delivery, payment, and gifting.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Accordions */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <FAQList faqs={FAQS} />

        {/* Footer Promo Box */}
        <ScrollReveal variant="fade-up" className="mt-16">
          <div className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-champagne)" }}>
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none" aria-hidden="true">
              <span className="text-9xl">🫙</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-white">Still have questions?</h2>
            <p className="text-sm md:text-base mb-8 max-w-md mx-auto" style={{ color: "rgba(234,216,183,0.8)" }}>
              Send your question to SERENA and we will help you choose the right jar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm"
                style={{ background: "#25D366" }}
              >
                💬 WhatsApp SERENA
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border text-sm transition-all hover:bg-white/5"
                style={{ borderColor: "var(--serena-gold)", color: "var(--serena-champagne)" }}
              >
                Browse Jars ✦
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
