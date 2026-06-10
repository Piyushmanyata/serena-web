import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { SERENA_CONTACT } from "@/lib/constants";

export const metadata = {
  title: "About SERENA — Our Story",
  description: "SERENA is built around the idea that jewellery shopping should feel personal, visual, and memorable.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Hero */}
      <section
        className="py-20 md:py-28 relative overflow-hidden text-center"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(198,161,91,0.12) 0%, transparent 70%), var(--serena-cream)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Our Story</div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>
            Jewellery should feel personal.
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--serena-muted)" }}>
            SERENA is built around the idea that jewellery shopping should feel personal, visual, and memorable. Instead of ordinary product browsing, SERENA curates jars based on mood, aesthetic, photos, and personal styling preferences.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--serena-gold)" }}>The Ritual</div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>A Reveal Made for You</h2>
                <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                  <p>Each SERENA jar is designed as a reveal experience — something to open, style, photograph, and keep. Not a random assortment of accessories, but a curated collection built around who you are and how you dress.</p>
                  <p>You choose your aesthetic. You share your references. You tell us your mood. And Manyata personally curates 5–10 pieces that belong together — pieces that feel like they were made for you.</p>
                  <p>The jar itself becomes a keepsake. The jewellery, a collection. The whole experience, a ritual.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: "11+", label: "Jar Aesthetics" },
                  { num: "5–10", label: "Pieces per Jar" },
                  { num: "100%", label: "Personally Curated" },
                ].map((s) => (
                  <div key={s.label} className="glass-card p-4 text-center">
                    <div className="font-serif text-2xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>{s.num}</div>
                    <div className="text-xs" style={{ color: "var(--serena-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="jar-float relative">
                {["💍", "🌸", "✨", "💫"].map((charm, i) => (
                  <span
                    key={i}
                    className="absolute text-xl opacity-60"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: i % 2 === 0 ? "-20%" : "105%",
                      animation: `floatSlow ${5 + i}s ease-in-out ${i * 0.5}s infinite`,
                    }}
                    aria-hidden="true"
                  >
                    {charm}
                  </span>
                ))}
                <JarSVG accentColor="#c6a15b" label="✦" className="w-60 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24" style={{ background: "var(--serena-cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>What We Believe</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>The SERENA Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "Personal", desc: "Every jar is built around you — your aesthetic, your references, your mood. Not mass-produced, not random." },
              { icon: "✨", title: "Visual", desc: "SERENA is made for the way you discover style: through photos, moods, and visual storytelling." },
              { icon: "🎁", title: "Giftable", desc: "A SERENA jar is the kind of gift that feels special. It says 'I thought about who you are.'" },
              { icon: "🫙", title: "Collectible", desc: "The jar itself is designed to be kept. A keepsake object, not just packaging." },
              { icon: "💎", title: "Premium Feel", desc: "Fashion jewellery at accessible prices, but curated and presented with a premium, editorial touch." },
              { icon: "🌸", title: "Ritual", desc: "The unboxing is an experience. The reveal is the moment. That's what SERENA is built for." },
            ].map((v) => (
              <div key={v.title} className="glass-card p-6 flex flex-col gap-3">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="font-serif font-bold text-lg" style={{ color: "var(--serena-deep-burgundy)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner block */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 md:p-12">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4" style={{ background: "var(--serena-burgundy)" }}>
              M
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "var(--serena-gold)" }}>Founded by</div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
              {SERENA_CONTACT.ownerName}
            </h2>
            <p className="text-base leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              For custom jars, styling help, and orders, contact on WhatsApp or phone. Manyata personally reviews every custom request and curates each jar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "#25D366" }}
              >
                💬 WhatsApp Manyata
              </a>
              <a
                href={`tel:${SERENA_CONTACT.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "var(--serena-burgundy)" }}
              >
                📞 Call Manyata
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Microcopy bar */}
      <section className="py-8" style={{ background: "var(--serena-deep-burgundy)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif italic text-lg" style={{ color: "var(--serena-champagne)" }}>
            &ldquo;Open it. Wear it. Keep the jar. Not just jewellery — a small treasure ritual.&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}
