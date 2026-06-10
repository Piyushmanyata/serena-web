"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { JarCard } from "@/components/product/JarCard";
import { getFeaturedProducts } from "@/lib/products";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { VIBE_CONFIG, JEWELLERY_TYPES } from "@/lib/constants";

const FEATURED = getFeaturedProducts(8);

const STEPS = [
  { num: "01", title: "Pick Your Vibe", desc: "Choose from 9 aesthetic moods — from Coquette to Gothic.", icon: "🎨" },
  { num: "02", title: "Customize", desc: "Select jewellery types, metal tone, colour mood, and upload reference photos.", icon: "📸" },
  { num: "03", title: "We Curate", desc: "Manyata personally selects 5–10 pieces around your style and budget.", icon: "💎" },
  { num: "04", title: "You Unbox", desc: "Receive your custom jar — styled, sealed, and ready to reveal.", icon: "✨" },
];

const TESTIMONIALS = [
  { text: "Felt like opening a jewellery treasure bottle.", name: "Priya S.", vibe: "Celestial" },
  { text: "The jar looked so pretty I kept it on my shelf.", name: "Ananya M.", vibe: "Coquette" },
  { text: "Loved that it matched the reference photo I sent.", name: "Riya K.", vibe: "Minimalist" },
  { text: "Got it as a birthday gift — best one I received.", name: "Shreya P.", vibe: "Ocean Breeze" },
];

const HERO_PARTICLES = [
  { x: 5, y: 20, delay: 0, emoji: "💍" },
  { x: 15, y: 60, delay: 1.5, emoji: "✨" },
  { x: 25, y: 35, delay: 3, emoji: "🌸" },
  { x: 78, y: 15, delay: 0.8, emoji: "🪙" },
  { x: 88, y: 45, delay: 2.2, emoji: "💫" },
  { x: 92, y: 70, delay: 1, emoji: "🔮" },
  { x: 60, y: 80, delay: 3.5, emoji: "✦" },
  { x: 40, y: 10, delay: 2, emoji: "🌙" },
];

function HeroSection() {
  const letters = "SERENA".split("");

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(198,161,91,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,30,45,0.08) 0%, transparent 50%), var(--serena-pearl)",
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {HERO_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute text-lg pointer-events-none select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `particleDrift ${6 + p.delay}s ease-in-out ${p.delay}s infinite`,
              opacity: 0,
            }}
          >
            {p.emoji}
          </span>
        ))}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-20 breathe" style={{ background: "radial-gradient(circle, rgba(198,161,91,0.4) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full opacity-15 breathe" style={{ background: "radial-gradient(circle, rgba(139,30,45,0.3) 0%, transparent 70%)", animationDelay: "2s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-80px)] py-12">
          {/* Left */}
          <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
            <div
              className="text-xs font-semibold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full"
              style={{ background: "rgba(198,161,91,0.15)", color: "var(--serena-gold)" }}
            >
              ✦ Custom Jewellery Jars
            </div>

            <div className="overflow-hidden" aria-label="SERENA">
              <div className="flex gap-0">
                {letters.map((letter, i) => (
                  <span
                    key={i}
                    className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black"
                    style={{
                      color: "var(--serena-deep-burgundy)",
                      animation: `letterReveal 0.7s ${i * 0.1}s ease forwards`,
                      opacity: 0,
                      display: "inline-block",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <p
              className="font-serif italic text-xl sm:text-2xl"
              style={{ color: "var(--serena-muted)", animation: "fadeInUp 0.8s 0.8s ease forwards", opacity: 0 }}
            >
              Jewellery jars made for your mood.
            </p>

            <p
              className="text-base leading-relaxed max-w-lg"
              style={{ color: "var(--serena-muted)", animation: "fadeInUp 0.8s 1s ease forwards", opacity: 0 }}
            >
              Choose an aesthetic. Send your references. Receive{" "}
              <strong style={{ color: "var(--serena-ink)" }}>5–10 pieces</strong> curated inside a
              custom jar — styled around you.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              style={{ animation: "fadeInUp 0.8s 1.2s ease forwards", opacity: 0 }}
            >
              <Link
                href="/customize"
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,161,91,0.5)] hover:-translate-y-1"
                style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
              >
                ✦ Build My Jar
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1 border"
                style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)", background: "transparent" }}
              >
                Shop Drops
              </Link>
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1 text-white"
                style={{ background: "#25D366" }}
              >
                WhatsApp Us
              </a>
            </div>

            <div
              className="flex items-center gap-6 pt-2 flex-wrap"
              style={{ animation: "fadeInUp 0.8s 1.4s ease forwards", opacity: 0 }}
            >
              {["5–10 curated pieces", "Custom vibes", "WhatsApp ordering"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span style={{ color: "var(--serena-gold)" }}>✓</span>
                  <span className="text-xs" style={{ color: "var(--serena-muted)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Jar */}
          <div className="flex justify-center items-center order-1 lg:order-2">
            <div className="relative w-full max-w-sm lg:max-w-md">
              <div
                className="absolute inset-0 rounded-full gold-rim-glow"
                style={{ background: "radial-gradient(ellipse, rgba(198,161,91,0.2) 0%, transparent 70%)", transform: "scale(0.8)" }}
                aria-hidden="true"
              />
              {["💍", "🌸", "✨", "🪙"].map((charm, i) => (
                <span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: "50%",
                    left: "50%",
                    animation: `orbiting ${8 + i * 2}s linear ${i * 2}s infinite`,
                    transformOrigin: "0 0",
                  }}
                  aria-hidden="true"
                >
                  {charm}
                </span>
              ))}
              <div className="jar-float relative z-10">
                <JarSVG
                  accentColor="#c6a15b"
                  label="✦"
                  className="w-full drop-shadow-[0_20px_60px_rgba(198,161,91,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--serena-muted)" }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--serena-gold)" }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

function RitualSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>The Experience</div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>The Reveal Ritual</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--serena-muted)" }}>
            Not a normal accessory order. A SERENA jar is a small reveal ritual — built around your style, your photos, and your mood.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden">
              <span className="absolute top-3 right-4 font-serif text-6xl font-black opacity-10" style={{ color: "var(--serena-gold)" }} aria-hidden="true">{step.num}</span>
              <div className="text-4xl float-medium" style={{ animationDelay: `${i * 0.5}s` }}>{step.icon}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Step {step.num}</div>
              <h3 className="font-serif font-bold text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/customize" className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
            Start My Reveal
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedDropsSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--serena-gold)" }}>Current Collection</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Featured Jar Drops</h2>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#8b1e2d]" style={{ color: "var(--serena-gold)" }}>View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURED.map((product) => (
            <JarCard key={product.id} product={product} featured />
          ))}
        </div>
        <div className="flex justify-center mt-10 md:hidden">
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
            View all jars →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CustomizerPreviewSection() {
  const vibeKeys = Object.keys(VIBE_CONFIG);
  const [activeVibe, setActiveVibe] = useState(vibeKeys[0]);
  const config = VIBE_CONFIG[activeVibe];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Interactive</div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Choose Your Vibe</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>Select an aesthetic and watch your jar come to life.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1">
            {vibeKeys.map((vibe) => {
              const v = VIBE_CONFIG[vibe];
              const isActive = activeVibe === vibe;
              return (
                <button
                  key={vibe}
                  onClick={() => setActiveVibe(vibe)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 ${isActive ? "shadow-[0_4px_20px_rgba(198,161,91,0.3)]" : "hover:border-[rgba(198,161,91,0.4)]"}`}
                  style={{ background: isActive ? "rgba(255,250,243,0.9)" : "transparent", borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{v.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "var(--serena-ink)" }}>{vibe}</p>
                      <p className="text-xs truncate" style={{ color: "var(--serena-muted)" }}>{v.desc}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {v.colors.slice(0, 3).map((c, i) => (
                        <span key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-700" style={{ background: `radial-gradient(circle, ${config.colors[0]}44 0%, ${config.colors[1]}22 50%, transparent 80%)` }}>
              <div className="jar-float">
                <JarSVG accentColor={config.colors[0]} label={config.emoji} className="w-48 drop-shadow-2xl" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>{config.emoji} {activeVibe}</p>
              <p className="text-sm mt-1" style={{ color: "var(--serena-muted)" }}>{config.palette}</p>
            </div>
            <Link
              href={`/customize?vibe=${encodeURIComponent(activeVibe)}`}
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
            >
              ✦ Customize This Vibe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConstellationSection() {
  const emojis = ["📿", "⛓️", "💍", "💎", "🔮", "🪙", "⌚", "🌙"];
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>What&apos;s Inside</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Jewellery Constellation</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>Every jar is curated from these categories. Pick what you love most.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {JEWELLERY_TYPES.map((type, i) => (
            <Link
              key={type}
              href={`/shop?type=${encodeURIComponent(type)}`}
              className="glass-card px-5 py-3 flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_20px_rgba(198,161,91,0.3)] hover:border-[rgba(198,161,91,0.6)]"
              style={{ color: "var(--serena-ink)" }}
            >
              <span>{emojis[i]}</span>
              {type}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--serena-deep-burgundy) 0%, #3a0d18 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {["✨", "💫", "🌸", "💎", "🔮", "🪙"].map((e, i) => (
          <span key={i} className="absolute text-2xl opacity-10" style={{ left: `${15 + i * 15}%`, top: `${30 + (i % 2) * 40}%`, animation: `floatSlow ${6 + i}s ease-in-out ${i}s infinite` }}>{e}</span>
        ))}
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Follow the Drops</div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-white">Made for Reveal Reels</h2>
        <p className="text-base md:text-lg mb-8" style={{ color: "rgba(234,216,183,0.8)" }}>
          Follow the drops before they disappear. SERENA jars are made for reveal reels, shelf styling, and custom gifting.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://instagram.com/serena.jars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-1" style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "white" }}>
            📸 Open Instagram
          </a>
          <a href={createWhatsAppLink(generalMessage())} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-1" style={{ background: "#25D366" }}>
            💬 WhatsApp to Order
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>From Our Customers</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Unboxing Stories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="flex gap-1">{[...Array(5)].map((_, s) => <span key={s} style={{ color: "var(--serena-gold)" }}>★</span>)}</div>
              <p className="font-serif italic text-base leading-relaxed" style={{ color: "var(--serena-ink)" }}>&ldquo;{t.text}&rdquo;</p>
              <div className="mt-auto flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--serena-burgundy)" }}>{t.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--serena-muted)" }}>{t.vibe} Jar</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.2) 0%, transparent 60%), var(--serena-pearl)" }}>
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none" aria-hidden="true">
        <JarSVG accentColor="#c6a15b" label="✦" className="w-64 md:w-96" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Limited Batches</div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Your jewellery jar is waiting to be curated.</h2>
        <p className="text-base md:text-lg mb-3" style={{ color: "var(--serena-muted)" }}>Choose your vibe before the next batch closes.</p>
        <p className="text-xs mb-10 px-6 py-2 rounded-full inline-block" style={{ background: "rgba(198,161,91,0.12)", color: "var(--serena-gold)" }}>
          Custom slots open in small batches to keep every jar personal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/customize" className="btn-shimmer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(198,161,91,0.5)]" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
            ✦ Build My Jar
          </Link>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg border transition-all duration-300 hover:-translate-y-1" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
            Shop Drops
          </Link>
          <a href={createWhatsAppLink(generalMessage())} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg text-white transition-all duration-300 hover:-translate-y-1" style={{ background: "#25D366" }}>
            WhatsApp SERENA
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RitualSection />
      <FeaturedDropsSection />
      <CustomizerPreviewSection />
      <ConstellationSection />
      <InstagramSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
