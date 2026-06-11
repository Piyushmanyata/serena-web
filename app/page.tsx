"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { JarSVG, Logo } from "@/components/brand/Logo";
import { JarCard } from "@/components/product/JarCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getFeaturedProducts } from "@/lib/products";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { DELIVERY_WINDOW, VIBE_CONFIG, JEWELLERY_TYPES, MYSTERY_BONUS_NOTE, INSTAGRAM_URL } from "@/lib/constants";

const FEATURED = getFeaturedProducts(8);

const STEPS = [
  { num: "01", title: "Pick Your Vibe", desc: "Choose from 9 aesthetic moods — Coquette to Gothic to Ocean Breeze.", icon: "🎨" },
  { num: "02", title: "Tell Us Your Style", desc: "Select jewellery types, metal tone, colour mood, and budget.", icon: "📸" },
  { num: "03", title: "We Curate", desc: "Manyata & Hridyanshi personally select 5–10 pieces around your mood.", icon: "💎" },
  { num: "04", title: "You Unbox", desc: "Receive your mystery jar — styled, sealed, and ready to reveal.", icon: "✨" },
];

const TESTIMONIALS = [
  { text: "Felt like opening a jewellery treasure bottle. I had NO idea what was inside and it was perfect.", name: "Priya S.", vibe: "Celestial" },
  { text: "The jar looked so pretty I kept it on my shelf! All pieces matched my vibe.", name: "Ananya M.", vibe: "Coquette" },
  { text: "Loved that it matched my aesthetic. Got bonus bag charms too — lucky me!", name: "Riya K.", vibe: "Minimalist" },
  { text: "Got it as a birthday gift — best surprise I've received. The mystery made it SO special.", name: "Shreya P.", vibe: "Ocean Breeze" },
];

// Subtle hero confetti: fixed, ambient, and never enters the jar.
const HERO_DECOR = [
  { emoji: "✨", x: 7, y: 12, size: "1.2rem", delay: 0.2 },
  { emoji: "💎", x: 86, y: 16, size: "1.2rem", delay: 0.9 },
  { emoji: "✦", x: 83, y: 74, size: "1.15rem", delay: 1.8 },
];

// Mystery jar items to reveal
const MYSTERY_ITEMS = [
  { emoji: "📿", label: "Necklace / Pendant" },
  { emoji: "💍", label: "Rings" },
  { emoji: "📎", label: "Earrings" },
  { emoji: "🧿", label: "Armlet" },
  { emoji: "🔗", label: "Stack Bracelets" },
  { emoji: "🌊", label: "Anklets" },
  { emoji: "⛓️", label: "Waist Chain" },
];

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(198,161,91,0.14) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,30,45,0.09) 0%, transparent 50%), var(--serena-pearl)",
      }}
    >
      {/* Ambient hero decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {HERO_DECOR.map((p, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: p.size,
              animation: `floatAround ${12 + i * 0.8}s ease-in-out ${p.delay}s infinite`,
              opacity: 0.28,
              filter: "drop-shadow(0 2px 8px rgba(198,161,91,0.18))",
            }}
          >
            {p.emoji}
          </span>
        ))}
        {/* Atmospheric glow blobs */}
        <div className="absolute top-1/4 -left-24 w-[500px] h-[500px] rounded-full opacity-20 breathe"
          style={{ background: "radial-gradient(circle, rgba(198,161,91,0.45) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full opacity-15 breathe"
          style={{ background: "radial-gradient(circle, rgba(139,30,45,0.35) 0%, transparent 70%)", animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, rgba(198,161,91,0.6) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-80px)] py-12">
          <ScrollReveal variant="fade-up" durationMs={1000}>
            <div className="flex flex-col items-start gap-6">
              <div
                className="text-xs font-semibold uppercase tracking-[0.3em] px-5 py-2 rounded-full heartbeat"
                style={{ background: "rgba(198,161,91,0.15)", color: "var(--serena-gold)", border: "1px solid rgba(198,161,91,0.3)" }}
              >
                ✦ Mystery Jewellery Jars
              </div>

              <div className="w-full max-w-[620px]">
                <Logo size="xl" className="drop-shadow-[0_16px_36px_rgba(82,17,28,0.08)]" />
              </div>

              <p
                className="font-serif italic text-xl sm:text-2xl"
                style={{ color: "var(--serena-muted)" }}
              >
                Every unboxing is a mystery. Every jar, your story.
              </p>

              <p
                className="text-base leading-relaxed max-w-lg"
                style={{ color: "var(--serena-muted)" }}
              >
                Receive <strong style={{ color: "var(--serena-ink)" }}>5–10 curated pieces</strong> styled around your aesthetic —
                you won&apos;t know exactly what&apos;s inside until you open it. That&apos;s the magic.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
              >
                <a
                  href={createWhatsAppLink(generalMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
                  style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                >
                  ✦ Get My Mystery Jar
                </a>
                <Link
                  href="/shop"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base border"
                  style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)", background: "transparent" }}
                >
                  Shop Drops
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-2 flex-wrap">
                {[
                  { check: "✓", text: "5–10 mystery pieces" },
                  { check: "✓", text: "Curated for your vibe" },
                  { check: "✓", text: "WA & Instagram ordering" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--serena-muted)" }}>
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                      style={{ background: "var(--serena-gold)" }}
                    >
                      {t.check}
                    </span>
                    {t.text}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale-up" durationMs={1000} delayMs={200}>
            <div className="flex justify-center items-center">
              <div
                className="relative"
                style={{ width: "min(520px, 90vw)", height: "min(520px, 90vw)" }}
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full breathe"
                  style={{ width: "280px", height: "280px", background: "radial-gradient(circle, rgba(198,161,91,0.2) 0%, transparent 70%)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full gold-rim-glow"
                  style={{ width: "320px", height: "320px" }}
                  aria-hidden="true"
                />

                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  {["✨", "🌙"].map((emoji, i) => (
                    <span
                      key={emoji}
                      className="absolute select-none"
                      style={{
                        left: `${24 + i * 40}%`,
                        top: `${24 + (i % 2) * 44}%`,
                        fontSize: "1.25rem",
                        opacity: 0.32,
                        animation: `floatAround ${8 + i * 1.2}s ease-in-out ${i * 0.4}s infinite`,
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "200px", zIndex: 20 }}
                >
                  <div className="jar-glow-anim jar-float">
                    <JarSVG
                      accentColor="#c6a15b"
                      label="✦"
                      className="w-full drop-shadow-[0_24px_60px_rgba(198,161,91,0.55)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true" style={{ animation: "fadeInDown 1s 1.2s ease both" }}>
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "var(--serena-muted)" }}>Scroll</span>
        <div className="w-px h-8 rounded-full overflow-hidden" style={{ background: "rgba(198,161,91,0.2)" }}>
          <div className="w-full rounded-full" style={{ height: "50%", background: "var(--serena-gold)", animation: "floatMedium 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── MYSTERY JAR SECTION (MAIN USP) ───────────────────────── */
function MysteryJarSection() {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [jarShaking, setJarShaking] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: string; left: number; delay: number; size: number; spin: number }>>([]);

  function shakeJar() {
    setJarShaking(true);
    setRevealedItems([]);
    const burst = Array.from({ length: 20 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: 12 + Math.random() * 76,
      delay: Math.random() * 0.15,
      size: 8 + Math.random() * 8,
      spin: -80 + Math.random() * 160,
    }));
    setConfetti(burst);
    setTimeout(() => {
      setJarShaking(false);
      // Reveal items one by one
      MYSTERY_ITEMS.forEach((_, i) => {
        setTimeout(() => {
          setRevealedItems((prev) => [...prev, i]);
        }, i * 200);
      });
      setTimeout(() => setConfetti([]), 1700);
    }, 600);
  }

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #52111c 0%, #1a0509 50%, #2d0d16 100%)" }}
    >
      {/* Animated bg sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {["✨","💎","✦"].map((e, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + (i % 2) * 40}%`,
              fontSize: "1.5rem",
              opacity: 0.12,
              animation: `floatAround ${6 + i}s ease-in-out ${i * 0.9}s infinite`,
            }}
          >
            {e}
          </span>
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(198,161,91,0.5) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — Mystery jar interactive */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                  {confetti.map((piece) => (
                    <span
                      key={piece.id}
                      className="absolute block jar-confetti"
                      style={{
                        left: `${piece.left}%`,
                        top: "34%",
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        animationDelay: `${piece.delay}s`,
                        "--spin-angle": `${piece.spin}deg`,
                      } as CSSProperties}
                    />
                  ))}
                </div>
                {/* Mystery question marks floating around the jar */}
                {["?", "?", "?"].map((q, i) => (
                  <span
                    key={i}
                    className="absolute font-serif font-black select-none"
                    style={{
                      top: `${15 + i * 25}%`,
                      left: i % 2 === 0 ? "-18%" : "108%",
                      fontSize: "2rem",
                      color: "rgba(198,161,91,0.6)",
                      animation: `mysteryFloat ${3 + i * 0.5}s ease-in-out ${i * 0.8}s infinite`,
                    }}
                    aria-hidden="true"
                  >
                    {q}
                  </span>
                ))}

                <div
                  className={`relative ${jarShaking ? "jelly-bounce" : "jar-float"}`}
                  onClick={shakeJar}
                  style={{ cursor: "pointer" }}
                  title="Tap to shake the jar!"
                >
                  <JarSVG
                    accentColor="#c6a15b"
                    label="?"
                    className="w-52 drop-shadow-[0_20px_50px_rgba(198,161,91,0.45)]"
                  />
                </div>

                {/* Tap hint */}
                <button
                  type="button"
                  onClick={shakeJar}
                  className="mt-4 w-full rounded-full px-5 py-3 text-center font-serif text-xl sm:text-2xl font-bold tracking-wide transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    color: "var(--serena-gold-light)",
                    background: "linear-gradient(180deg, rgba(198,161,91,0.08), rgba(198,161,91,0.02))",
                    border: "1px solid rgba(198,161,91,0.24)",
                    boxShadow: "0 10px 30px rgba(82,17,28,0.18)",
                    textShadow: "0 2px 10px rgba(82,17,28,0.35)",
                  }}
                >
                  🫙 Tap the jar to reveal!
                </button>
              </div>

              {/* Revealed items */}
              <div className="flex flex-wrap justify-center gap-2 min-h-[76px] items-center">
                {revealedItems.length === 0 ? (
                  <p className="text-sm font-medium italic" style={{ color: "rgba(234,216,183,0.45)" }}>
                    What&apos;s inside? Tap to see&hellip;
                  </p>
                ) : (
                  MYSTERY_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        background: "rgba(198,161,91,0.18)",
                        border: "1px solid rgba(198,161,91,0.38)",
                        color: "var(--serena-champagne)",
                        opacity: revealedItems.includes(i) ? 1 : 0,
                        transform: revealedItems.includes(i) ? "scale(1) translateY(0)" : "scale(0.6) translateY(8px)",
                        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        boxShadow: revealedItems.includes(i) ? "0 2px 10px rgba(198,161,91,0.15)" : "none",
                      }}
                    >
                      <span>{item.emoji}</span>
                      {item.label}
                    </div>
                  ))
                )}
              </div>

              <div
                className="w-full max-w-xl rounded-3xl p-5 sm:p-6 text-center relative overflow-hidden mystery-card-pulse"
                style={{
                  background: "linear-gradient(135deg, rgba(198,161,91,0.16), rgba(139,30,45,0.12))",
                  border: "1px solid rgba(198,161,91,0.28)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.22), transparent 55%)" }} />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] mb-2" style={{ color: "var(--serena-gold)" }}>
                    Lucky Bonus Surprises
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--serena-champagne)" }}>
                    {MYSTERY_BONUS_NOTE}
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Copy */}
            <div className="flex flex-col gap-6">
              <div className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--serena-gold)" }}>
                Our Main USP
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
                The Mystery Jar{" "}
                <span className="shimmer-gold">Experience</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(234,216,183,0.85)" }}>
                You don&apos;t know exactly what&apos;s inside until you open it — and that&apos;s the whole
                point. Tell us your vibe, your aesthetic, your mood. We curate 5–10 pieces that feel
                made for you.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { icon: "🎁", title: "5–10 Curated Pieces", desc: "Hand-picked for your exact aesthetic — no random assortments." },
                  { icon: "🎨", title: "Styled to Go Together", desc: "Every piece inside complements the others. Wear them as a set or individually." },
                  { icon: "✨", title: "The Reveal is the Ritual", desc: "Opening your SERENA jar is an experience, not just a delivery." },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl interactive-card"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(198,161,91,0.2)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <span className="text-2xl flex-shrink-0 float-medium" style={{ animationDelay: `${i * 0.5}s` }}>
                      {card.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "var(--serena-champagne)" }}>{card.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(234,216,183,0.65)" }}>{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href={createWhatsAppLink("Hi SERENA! I want to order a mystery jar. Can you help me pick my vibe?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
                  style={{ background: "#25D366" }}
                >
                  💬 Order via WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border"
                  style={{ borderColor: "var(--serena-gold)", color: "white" }}
                >
                  📸 DM on Instagram
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────────────── */
function RitualSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>The Experience</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>The Reveal Ritual</h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              Not a normal accessory order. A SERENA jar is a small unboxing ritual — styled, sealed, and curated just for you.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.num} variant="fade-up" delayMs={i * 100}>
              <div
                className="glass-card p-6 h-full flex flex-col gap-4 relative overflow-hidden interactive-card"
              >
                <span className="absolute top-3 right-4 font-serif text-6xl font-black opacity-10" style={{ color: "var(--serena-gold)" }} aria-hidden="true">{step.num}</span>
                <div className="text-4xl float-medium" style={{ animationDelay: `${i * 0.5}s` }}>{step.icon}</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Step {step.num}</div>
                <h3 className="font-serif font-bold text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <ScrollReveal variant="scale-up" delayMs={200}>
            <a
              href={createWhatsAppLink(generalMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
              style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
            >
              ✦ Start My Reveal
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { value: "1,500+", label: "Jars Curated & Unboxed", icon: "🫙" },
    { value: "9+", label: "Signature Mood Vibes", icon: "🎨" },
    { value: "4.9 ★", label: "Happy Customer Rating", icon: "✦" },
  ];

  return (
    <section className="py-14 border-y border-[rgba(198,161,91,0.18)]" style={{ background: "linear-gradient(90deg, var(--serena-cream) 0%, var(--serena-pearl) 50%, var(--serena-cream) 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span
                className="text-xl md:text-2xl mb-1 heartbeat"
                aria-hidden="true"
                style={{ animationDelay: `${i * 0.4}s`, display: "inline-block" }}
              >
                {stat.icon}
              </span>
              <span
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold"
                style={{ color: "var(--serena-burgundy)" }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest" style={{ color: "var(--serena-muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURED DROPS ────────────────────────────────────────── */
function FeaturedDropsSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--serena-gold)" }}>Current Collection</div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Featured Jar Drops</h2>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover-lift transition-colors hover:text-[#8b1e2d]" style={{ color: "var(--serena-gold)" }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {FEATURED.map((product) => (
              <JarCard key={product.id} product={product} featured />
            ))}
          </div>
          <div className="flex justify-center mt-10 md:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border hover-lift" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
              View all jars →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── CUSTOM JAR SECTION (SECOND USP) ──────────────────────── */
function CustomizerPreviewSection() {
  const vibeKeys = Object.keys(VIBE_CONFIG);
  const [activeVibe, setActiveVibe] = useState(vibeKeys[0]);
  const config = VIBE_CONFIG[activeVibe];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "var(--serena-cream)" }}>
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 breathe"
          style={{ background: `radial-gradient(circle, ${config.colors[0]}88 0%, transparent 70%)`, transition: "background 0.7s ease" }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10 breathe"
          style={{ background: `radial-gradient(circle, ${config.colors[1]}88 0%, transparent 70%)`, animationDelay: "1.5s", transition: "background 0.7s ease" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Custom Jars</div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>
              Want It Your Way? Choose Your Vibe.
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              Can&apos;t decide? Pick your aesthetic and tell us what you love. We&apos;ll curate a mystery jar made exactly for your style.
            </p>
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
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 ${isActive ? "" : "hover:border-[rgba(198,161,91,0.4)] hover:bg-[rgba(255,255,255,0.5)]"}`}
                    style={{
                      background: isActive ? "rgba(255,250,243,0.95)" : "transparent",
                      borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)",
                      transform: isActive ? "translateX(6px) scale(1.01)" : "",
                      boxShadow: isActive ? "0 4px 20px rgba(198,161,91,0.28), 0 1px 0 rgba(255,255,255,0.8) inset" : "",
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl float-medium" style={{ animationDelay: `${vibeKeys.indexOf(vibe) * 0.3}s` }}>{v.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: "var(--serena-ink)" }}>{vibe}</p>
                        <p className="text-xs truncate" style={{ color: "var(--serena-muted)" }}>{v.desc}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        {v.colors.slice(0, 3).map((c, i) => (
                          <span key={i} className="w-3 h-3 rounded-full" style={{ background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col items-center gap-6">
              <div
                className="relative w-72 h-72 rounded-full flex items-center justify-center transition-all duration-700"
                style={{ background: `radial-gradient(circle, ${config.colors[0]}55 0%, ${config.colors[1]}33 50%, transparent 80%)` }}
              >
                {/* Orbiting emojis around the vibe jar */}
                {[config.emoji, "✨"].map((e, i) => (
                  <span
                    key={i}
                    className="absolute select-none text-xl"
                    style={{
                      top: "50%",
                      left: "50%",
                      "--orbit-r": `${110 + i * 15}px`,
                      animation: `emojiOrbit ${9 + i * 2}s ${i * 1.5}s linear infinite`,
                      opacity: 0.65,
                    } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {e}
                  </span>
                ))}
                <div className="jar-float relative z-10">
                  <JarSVG accentColor={config.colors[0]} label={config.emoji} className="w-52 drop-shadow-2xl" />
                </div>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>{config.emoji} {activeVibe}</p>
                <p className="text-sm mt-1" style={{ color: "var(--serena-muted)" }}>{config.palette}</p>
              </div>
              <a
                href={createWhatsAppLink(`Hi SERENA! I want a custom mystery jar with the ${activeVibe} vibe. Can you help me?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold"
                style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
              >
                ✦ Order This Vibe
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── WHAT'S INSIDE YOUR JAR ────────────────────────────────── */
function WhatsInsideSection() {
  const emojis = ["📿", "⛓️", "💍", "💎", "🔮", "🪙", "🌙", "📎"];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>What&apos;s Inside</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Jewellery Constellation</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>
              Every jar is curated from these categories. Tell us what you love most!
            </p>
          </div>
        </ScrollReveal>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {JEWELLERY_TYPES.map((type, i) => {
            const isHov = hoveredIdx === i;
            return (
              <div
                key={type}
                className="glass-card px-5 py-3 flex items-center gap-2.5 text-sm font-medium cursor-pointer select-none"
                style={{
                  color: isHov ? "var(--serena-deep-burgundy)" : "var(--serena-ink)",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isHov ? "translateY(-9px) scale(1.08)" : "translateY(0) scale(1)",
                  boxShadow: isHov ? "0 10px 28px rgba(198,161,91,0.35), 0 1px 0 rgba(255,255,255,0.9) inset" : "",
                  borderColor: isHov ? "rgba(198,161,91,0.7)" : undefined,
                  background: isHov ? "rgba(255,250,243,0.98)" : undefined,
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span
                  className={isHov ? "jelly-bounce" : ""}
                  style={{ display: "inline-block", fontSize: "1.1rem" }}
                  aria-hidden="true"
                >
                  {emojis[i] || "✨"}
                </span>
                {type}
              </div>
            );
          })}
        </div>

        {/* Lucky bonus banner */}
        <ScrollReveal variant="scale-up">
          <div
            className="relative mx-auto max-w-2xl text-center p-6 rounded-3xl overflow-hidden mystery-card-pulse"
            style={{ background: "linear-gradient(135deg, rgba(198,161,91,0.15), rgba(139,30,45,0.1))", border: "1px solid rgba(198,161,91,0.35)" }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {["⌚","👜","🔑"].map((e, i) => (
                <span key={i} className="absolute text-lg opacity-20 float-slow" style={{ left: `${20 + i * 30}%`, top: "50%", transform: "translateY(-50%)", animationDelay: `${i * 0.5}s` }}>{e}</span>
              ))}
            </div>
            <div className="relative">
              <span className="text-3xl block mb-2 mystery-float" aria-hidden="true">🍀</span>
              <p className="font-semibold text-base" style={{ color: "var(--serena-deep-burgundy)" }}>Lucky Bonus!</p>
              <p className="text-sm mt-1" style={{ color: "var(--serena-muted)" }}>{MYSTERY_BONUS_NOTE}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── INSTAGRAM SECTION ─────────────────────────────────────── */
function InstagramSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--serena-deep-burgundy) 0%, #3a0d18 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {["✨", "💎"].map((e, i) => (
          <span key={i} className="absolute text-2xl opacity-15 float-around" style={{ left: `${30 + i * 40}%`, top: `${25 + (i % 2) * 45}%`, animationDelay: `${i * 1.1}s` }}>{e}</span>
        ))}
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="fade-up">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Follow the Drops</div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-white">Made for Reveal Reels</h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "rgba(234,216,183,0.8)" }}>
            Follow drops before they disappear. SERENA jars are curated for reveal reels, shelf styling, and custom gifting.
            DM us on Instagram to order — we respond fast!
          </p>
          <p className="text-sm font-semibold mb-8" style={{ color: "var(--serena-gold)" }}>
            @_serena_.co
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
            >
              📸 Follow &amp; Order on Instagram
            </a>
            <a
              href={createWhatsAppLink(generalMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp to Order
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── GIFTING SECTION ───────────────────────────────────────── */
function GiftingSection() {
  const occasions = ["Birthday", "Best friend", "Bridesmaid", "Festival", "Farewell", "Self-care"];

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <div className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--serena-gold)" }}>Giftable Mystery Jars</div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight" style={{ color: "var(--serena-deep-burgundy)" }}>
                Send a reveal that feels personal.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                Tell us who it is for, the occasion, their style, and your budget. We curate a gift-ready SERENA jar with the same mystery, tuned to the person receiving it.
              </p>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occasion) => (
                  <span key={occasion} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: "rgba(198,161,91,0.32)", color: "var(--serena-muted)", background: "rgba(255,250,243,0.7)" }}>
                    {occasion}
                  </span>
                ))}
              </div>
              <p className="text-sm" style={{ color: "var(--serena-muted)" }}>
                Typical delivery: {DELIVERY_WINDOW}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/gift"
                  className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold"
                  style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                >
                  Gift a Jar
                </Link>
                <a
                  href={createWhatsAppLink("Hi SERENA! I want to gift a mystery jewellery jar. Can you help me curate one?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border hover-lift"
                  style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
                >
                  WhatsApp Gift Help
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(82,17,28,0.95), rgba(139,30,45,0.88))", border: "1px solid rgba(198,161,91,0.3)" }}>
              <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(circle at 70% 20%, rgba(232,201,122,0.65), transparent 45%)" }} />
              <div className="relative text-center">
                <div className="text-6xl mb-4 jar-float">🎁</div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">What we ask before curating</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {["Recipient vibe", "Occasion date", "Metal preference", "Favourite colours"].map((item) => (
                    <div key={item} className="rounded-2xl px-4 py-3 text-sm font-medium" style={{ background: "rgba(255,250,243,0.12)", color: "var(--serena-champagne)", border: "1px solid rgba(198,161,91,0.2)" }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>From Our Customers</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Unboxing Stories</h2>
          </div>

          {/* Carousel Container */}
          <div className="relative min-h-[240px] flex items-center justify-center">
            {TESTIMONIALS.map((t, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={i}
                  className="absolute inset-x-0 transition-all duration-700 ease-in-out flex flex-col items-center text-center px-4 sm:px-12"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex gap-0.5 mb-5 justify-center">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="text-lg" style={{ color: "var(--serena-gold)" }}>★</span>
                    ))}
                  </div>
                  <p className="font-serif italic text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--serena-burgundy), var(--serena-deep-burgundy))", boxShadow: "0 0 0 3px rgba(198,161,91,0.25)" }}
                    >
                      {t.name[0]}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "var(--serena-gold)" }}>{t.vibe} Jar ✦</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: activeIdx === i ? "24px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: activeIdx === i ? "var(--serena-gold)" : "rgba(198,161,91,0.3)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.2) 0%, transparent 60%), var(--serena-pearl)" }}>
      <div className="absolute right-0 bottom-0 pointer-events-none" style={{ opacity: 0.08 }} aria-hidden="true">
        <JarSVG accentColor="#c6a15b" label="✦" className="w-64 md:w-96 jar-float" />
      </div>
      {/* Scattered background emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {["✨","💎"].map((e, i) => (
          <span key={i} className="absolute text-xl opacity-15 float-around" style={{ left: `${30 + i * 40}%`, top: `${20 + (i % 2) * 50}%`, animationDelay: `${i * 1.2}s` }}>{e}</span>
        ))}
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal variant="fade-up">
          <div className="text-4xl mb-4 jar-float inline-block" aria-hidden="true">🫙</div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Limited Batches</div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>
            Your mystery jar is waiting to be curated.
          </h2>
          <p className="text-base md:text-lg mb-3" style={{ color: "var(--serena-muted)" }}>Choose your vibe before the next batch closes.</p>
          <p className="text-xs mb-10 px-6 py-2 rounded-full inline-block heartbeat" style={{ background: "rgba(198,161,91,0.12)", color: "var(--serena-gold)", border: "1px solid rgba(198,161,91,0.25)" }}>
            Custom slots open in small batches to keep every unboxing personal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={createWhatsAppLink(generalMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg text-white"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp SERENA
            </a>
            <Link
              href="/shop"
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg border"
              style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
            >
              Shop Drops
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MysteryJarSection />
      <RitualSection />
      <StatsBand />
      <FeaturedDropsSection />
      <CustomizerPreviewSection />
      <WhatsInsideSection />
      <InstagramSection />
      <GiftingSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
