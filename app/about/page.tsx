import { JarSVG } from "@/components/brand/Logo";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { SERENA_CONTACT, SERENA_CO_OWNER } from "@/lib/constants";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "About SERENA — Our Story",
  description: "SERENA is built around the idea that jewellery shopping should feel personal, visual, and memorable.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Hero */}
      <section
        className="py-24 md:py-32 relative overflow-hidden text-center"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(198,161,91,0.12) 0%, transparent 70%), var(--serena-cream)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {["💍","✨","🌙","💎"].map((e, i) => (
            <span key={i} className="absolute text-xl opacity-15 float-around" style={{ left: `${15 + i * 25}%`, top: `${30 + (i % 2) * 40}%`, animationDelay: `${i * 1.5}s` }}>{e}</span>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-5xl mb-4 jar-float inline-block" aria-hidden="true">🫙</div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Our Story</div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "var(--serena-deep-burgundy)" }}>
              Jewellery should feel personal.
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              SERENA is built around the idea that jewellery shopping should feel personal, visual, and memorable. Instead of ordinary product browsing, SERENA curates mystery jars based on mood, aesthetic, photos, and personal styling preferences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fade-up">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--serena-gold)" }}>The Ritual</div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>A Reveal Made for You</h2>
                  <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                    <p>Each SERENA mystery jar is designed as a reveal experience — something to open, style, photograph, and keep. Not a random assortment of accessories, but a curated collection built around who you are and how you dress.</p>
                    <p>You choose your aesthetic. You share your references. You tell us your mood. And Manyata &amp; Hridyanshi personally curate 5–10 pieces that belong together — pieces that feel like they were made for you.</p>
                    <p>The jar itself becomes a keepsake. The jewellery, a collection. The whole experience, a ritual.</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  {[
                    { num: "11+", label: "Jar Aesthetics" },
                    { num: "5–10", label: "Pieces per Jar" },
                    { num: "100%", label: "Personally Curated" },
                  ].map((s, i) => (
                    <div key={s.label} className="glass-card p-4 text-center interactive-card">
                      <div className="font-serif text-2xl font-bold" style={{ color: "var(--serena-deep-burgundy)", animationDelay: `${i * 0.15}s` }}>{s.num}</div>
                      <div className="text-xs" style={{ color: "var(--serena-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="flex justify-center">
              <ScrollReveal variant="scale-up" delayMs={150}>
                <div className="jar-glow-anim jar-float relative">
                  {["💍","✨","🪙","🔮"].map((charm, i) => (
                    <span
                      key={i}
                      className="absolute text-xl"
                      style={{
                        top: `${15 + i * 20}%`,
                        left: i % 2 === 0 ? "-20%" : "105%",
                        animation: `floatSlow ${5 + i}s ease-in-out ${i * 0.5}s infinite`,
                        opacity: 0.5,
                      }}
                      aria-hidden="true"
                    >
                      {charm}
                    </span>
                  ))}
                  <JarSVG accentColor="#c6a15b" label="?" className="w-64 drop-shadow-2xl" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28" style={{ background: "var(--serena-cream)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4 text-center" style={{ color: "var(--serena-gold)" }}>What We Believe</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center" style={{ color: "var(--serena-deep-burgundy)" }}>The SERENA Philosophy</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎁", title: "Mystery First", desc: "Every jar is a mystery until it's opened. That anticipation and surprise is what makes SERENA special." },
              { icon: "🎨", title: "Personal", desc: "Every jar is built around you — your aesthetic, your references, your mood. Not mass-produced, not random." },
              { icon: "✨", title: "Visual", desc: "SERENA is made for the way you discover style: through photos, moods, and visual storytelling." },
              { icon: "🫙", title: "Collectible", desc: "The jar itself is designed to be kept. A keepsake object, not just packaging." },
              { icon: "💎", title: "Premium Feel", desc: "Fashion jewellery at accessible prices, curated and presented with a premium, editorial touch." },
              { icon: "🌸", title: "Ritual", desc: "The unboxing is an experience. The reveal is the moment. That's what SERENA is built for." },
            ].map((v, i) => (
              <ScrollReveal key={v.title} variant="fade-up" delayMs={i * 75}>
                <div className="glass-card p-6 flex flex-col gap-3 interactive-card h-full">
                  <span className="text-3xl float-medium" style={{ animationDelay: `${i * 0.4}s` }}>{v.icon}</span>
                  <h3 className="font-serif font-bold text-lg" style={{ color: "var(--serena-deep-burgundy)" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founders block */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up" className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4 text-center" style={{ color: "var(--serena-gold)" }}>The Team</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center" style={{ color: "var(--serena-deep-burgundy)" }}>Meet the Co-Founders</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manyata */}
            <ScrollReveal variant="fade-up" delayMs={0} className="h-full">
              <div className="glass-card p-8 text-center interactive-card h-full flex flex-col justify-between">
                <div>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 heartbeat"
                    style={{ background: "var(--serena-burgundy)" }}
                  >
                    M
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "var(--serena-gold)" }}>Co-Founder</div>
                  <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
                    {SERENA_CONTACT.ownerName}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--serena-muted)" }}>
                    Manyata personally curates every jar and reviews each custom request. The creative force behind SERENA&apos;s aesthetic.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={createWhatsAppLink(generalMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white"
                    style={{ background: "#25D366" }}
                  >
                    💬 WhatsApp Manyata
                  </a>
                  <a
                    href={`tel:${SERENA_CONTACT.phoneIntl}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white transition-all hover:scale-[1.02]"
                    style={{ background: "var(--serena-burgundy)" }}
                  >
                    📞 {SERENA_CONTACT.phone}
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Hridyanshi */}
            <ScrollReveal variant="fade-up" delayMs={150} className="h-full">
              <div className="glass-card p-8 text-center interactive-card h-full flex flex-col justify-between">
                <div>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 heartbeat"
                    style={{ background: "linear-gradient(135deg, #f09433, #dc2743)" }}
                  >
                    H
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "var(--serena-gold)" }}>Co-Founder</div>
                  <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
                    {SERENA_CO_OWNER.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--serena-muted)" }}>
                    Hridyanshi brings her eye for style and curation to every jar. Reach out to her for orders, styling tips, and custom requests!
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${SERENA_CO_OWNER.whatsapp}?text=${encodeURIComponent("Hi Hridyanshi! I want to order a SERENA jar.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white"
                    style={{ background: "#25D366" }}
                  >
                    💬 WhatsApp Hridyanshi
                  </a>
                  <a
                    href={`tel:${SERENA_CO_OWNER.phoneIntl}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white transition-all hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #f09433, #dc2743)" }}
                  >
                    📞 {SERENA_CO_OWNER.phone}
                  </a>
                </div>
              </div>
            </ScrollReveal>
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
