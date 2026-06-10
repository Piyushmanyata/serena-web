import Link from "next/link";
import { FAQS } from "@/lib/constants";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";

export const metadata = {
  title: "FAQ — SERENA Jewellery Jars",
  description: "Answers about SERENA ordering, payment, delivery, customization, gifting, and returns.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <section className="py-16 md:py-20 text-center" style={{ background: "var(--serena-cream)" }}>
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Help</div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Questions before you order</h1>
        <p className="text-base max-w-2xl mx-auto px-4" style={{ color: "var(--serena-muted)" }}>
          Clear answers about the mystery jar experience, custom curation, delivery, payment, and gifting.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              open={index < 2}
              className="rounded-2xl border p-5"
              style={{ borderColor: "rgba(198,161,91,0.24)", background: "rgba(255,250,243,0.78)" }}
            >
              <summary className="cursor-pointer font-serif text-lg font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-3xl p-8 text-center" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-champagne)" }}>
          <h2 className="font-serif text-2xl font-bold mb-3 text-white">Still unsure?</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(234,216,183,0.78)" }}>
            Send your question to SERENA and we will help you choose the right jar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={createWhatsAppLink(generalMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              WhatsApp SERENA
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold border"
              style={{ borderColor: "var(--serena-gold)", color: "var(--serena-champagne)" }}
            >
              Browse jars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
