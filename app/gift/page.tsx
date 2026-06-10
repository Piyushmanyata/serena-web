import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { DELIVERY_WINDOW, INSTAGRAM_URL } from "@/lib/constants";

export const metadata = {
  title: "Gift a SERENA Jar",
  description: "Gift-ready mystery jewellery jars curated for birthdays, festivals, best friends, bridesmaids, and surprise hampers.",
};

const GIFT_IDEAS = [
  "Birthday surprise jar",
  "Best friend hamper",
  "Bridesmaid mini jar",
  "Festival gifting",
  "College farewell",
  "Self-care treat",
];

export default function GiftPage() {
  const giftMessage =
    "Hi SERENA! I want to gift a jewellery jar. Please help me curate one for the recipient.";

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <section className="py-16 md:py-24" style={{ background: "var(--serena-cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Gift a Jar</div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-5" style={{ color: "var(--serena-deep-burgundy)" }}>
              A mystery reveal made for someone you love.
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "var(--serena-muted)" }}>
              Share their vibe, occasion, colours, and jewellery preferences. SERENA curates a gift-ready mystery jar that feels personal from the first look to the final reveal.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={createWhatsAppLink(giftMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
                style={{ background: "#25D366" }}
              >
                Plan a Gift on WhatsApp
              </a>
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border hover-lift"
                style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
              >
                Build a Custom Jar
              </Link>
            </div>
          </div>

          <div className="rounded-3xl p-6 md:p-8" style={{ background: "rgba(255,250,243,0.72)", border: "1px solid rgba(198,161,91,0.25)" }}>
            <div className="text-6xl mb-6 text-center jar-float">🎁</div>
            <div className="grid grid-cols-2 gap-3">
              {GIFT_IDEAS.map((idea) => (
                <div key={idea} className="rounded-2xl p-4 text-sm font-medium" style={{ background: "var(--serena-cream)", color: "var(--serena-ink)" }}>
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ["Tell us who it is for", "Age, occasion, style, metal tone, favourite colours, and what they usually wear."],
            ["We curate the surprise", "Manyata and Hridyanshi match the jar to the recipient while keeping the reveal intact."],
            ["Send it with confidence", `Delivery is usually ${DELIVERY_WINDOW}. We confirm timing and payment before dispatch.`],
          ].map(([title, desc], index) => (
            <div key={title} className="glass-card p-6">
              <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-4" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)" }}>
                {index + 1}
              </span>
              <h2 className="font-serif text-xl font-bold mb-2" style={{ color: "var(--serena-deep-burgundy)" }}>{title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            See gifting ideas on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
