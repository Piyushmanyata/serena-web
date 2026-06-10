"use client";

import { useState } from "react";
import Link from "next/link";
import { JarSVG, Logo } from "@/components/brand/Logo";
import { JarCard } from "@/components/product/JarCard";
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
  { emoji: "💫", x: 15, y: 24, size: "1.15rem", delay: 1.5 },
  { emoji: "🌸", x: 10, y: 78, size: "1.1rem", delay: 2.1 },
  { emoji: "💎", x: 86, y: 16, size: "1.2rem", delay: 0.9 },
  { emoji: "🌙", x: 92, y: 34, size: "1.05rem", delay: 2.7 },
  { emoji: "✦", x: 83, y: 74, size: "1.15rem", delay: 1.8 },
  { emoji: "🪙", x: 20, y: 6, size: "1rem", delay: 3.2 },
  { emoji: "🌟", x: 78, y: 10, size: "1rem", delay: 3.8 },
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
          <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
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

            <div
              className="flex items-center gap-6 pt-2 flex-wrap"
            >
              {["5–10 mystery pieces", "Curated for your vibe", "WA & Instagram ordering"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <span className="heartbeat" style={{ color: "var(--serena-gold)", display: "inline-block" }}>✓</span>
                  <span className="text-xs" style={{ color: "var(--serena-muted)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center order-1 lg:order-2">
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
                {["✨", "💫", "🌙", "🌸"].map((emoji, i) => (
                  <span
                    key={emoji}
                    className="absolute select-none"
                    style={{
                      left: `${18 + i * 20}%`,
                      top: `${18 + (i % 2) * 54}%`,
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
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--serena-muted)" }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--serena-gold)" }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ─── MYSTERY JAR SECTION (MAIN USP) ───────────────────────── */
function MysteryJarSection() {
  const [revealedItems, setRevealedItems] = useState<number[]>([]);
  const [jarShaking, setJarShaking] = useState(false);

  function shakeJar() {
    setJarShaking(true);
    setRevealedItems([]);
    setTimeout(() => {
      setJarShaking(false);
      // Reveal items one by one
      MYSTERY_ITEMS.forEach((_, i) => {
        setTimeout(() => {
          setRevealedItems((prev) => [...prev, i]);
        }, i * 200);
      });
    }, 600);
  }

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #52111c 0%, #1a0509 50%, #2d0d16 100%)" }}
    >
      {/* Animated bg sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {["✨","💫","🌟","✦","💎","🪙"].map((e, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${8 + i * 16}%`,
              top: `${15 + (i % 3) * 30}%`,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Mystery jar interactive */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* Mystery question marks floating around the jar */}
              {["?", "?", "?", "?"].map((q, i) => (
                <span
                  key={i}
                  className="absolute font-serif font-black select-none"
                  style={{
                    top: `${10 + i * 22}%`,
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
              <p
                className="text-center text-xs mt-2 font-medium animate-bounce"
                style={{ color: "rgba(198,161,91,0.7)" }}
              >
                🫙 Tap the jar to reveal!
              </p>
            </div>

            {/* Revealed items */}
            <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
              {MYSTERY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(198,161,91,0.15)",
                    border: "1px solid rgba(198,161,91,0.35)",
                    color: "var(--serena-champagne)",
                    opacity: revealedItems.includes(i) ? 1 : 0,
                    transform: revealedItems.includes(i) ? "scale(1)" : "scale(0)",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </div>
              ))}
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
                { icon: "🍀", title: "Lucky Bonus Surprises", desc: MYSTERY_BONUS_NOTE },
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
                className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                📸 Order via Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ──────────────────────────────────────────── */
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
            <div
              key={step.num}
              className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden interactive-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="absolute top-3 right-4 font-serif text-6xl font-black opacity-10" style={{ color: "var(--serena-gold)" }} aria-hidden="true">{step.num}</span>
              <div className="text-4xl float-medium" style={{ animationDelay: `${i * 0.5}s` }}>{step.icon}</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Step {step.num}</div>
              <h3 className="font-serif font-bold text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--serena-muted)" }}>{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <a
            href={createWhatsAppLink(generalMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
            style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
          >
            ✦ Start My Reveal
          </a>
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
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 interactive-card ${isActive ? "shadow-[0_4px_20px_rgba(198,161,91,0.3)]" : ""}`}
                  style={{
                    background: isActive ? "rgba(255,250,243,0.9)" : "transparent",
                    borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)",
                    transform: isActive ? "translateX(4px)" : "",
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
              {[config.emoji, "✨", "💫", "🌟"].map((e, i) => (
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
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>What&apos;s Inside</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Jewellery Constellation</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--serena-muted)" }}>
            Every jar is curated from these categories. Tell us what you love most!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {JEWELLERY_TYPES.map((type, i) => (
            <div
              key={type}
              className="glass-card px-5 py-3 flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{
                color: "var(--serena-ink)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: hoveredIdx === i ? "translateY(-8px) scale(1.1)" : "translateY(0) scale(1)",
                boxShadow: hoveredIdx === i ? "0 8px 25px rgba(198,161,91,0.35)" : "",
                borderColor: hoveredIdx === i ? "rgba(198,161,91,0.7)" : "",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span
                className={hoveredIdx === i ? "jelly-bounce" : ""}
                style={{ display: "inline-block" }}
              >
                {emojis[i]}
              </span>
              {type}
            </div>
          ))}
        </div>

        {/* Lucky bonus banner */}
        <div
          className="relative mx-auto max-w-2xl text-center p-6 rounded-3xl overflow-hidden mystery-card-pulse"
          style={{ background: "linear-gradient(135deg, rgba(198,161,91,0.15), rgba(139,30,45,0.1))", border: "1px solid rgba(198,161,91,0.35)" }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {["⌚","👜","🔑","🪬","✨","💫"].map((e, i) => (
              <span key={i} className="absolute text-lg opacity-20 float-slow" style={{ left: `${8 + i * 16}%`, top: "50%", transform: "translateY(-50%)", animationDelay: `${i * 0.5}s` }}>{e}</span>
            ))}
          </div>
          <div className="relative">
            <span className="text-3xl block mb-2 mystery-float" aria-hidden="true">🍀</span>
            <p className="font-semibold text-base" style={{ color: "var(--serena-deep-burgundy)" }}>Lucky Bonus!</p>
            <p className="text-sm mt-1" style={{ color: "var(--serena-muted)" }}>{MYSTERY_BONUS_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── INSTAGRAM SECTION ─────────────────────────────────────── */
function InstagramSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--serena-deep-burgundy) 0%, #3a0d18 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {["✨", "💫", "🌸", "💎", "🔮", "🪙"].map((e, i) => (
          <span key={i} className="absolute text-2xl opacity-15 float-around" style={{ left: `${12 + i * 14}%`, top: `${25 + (i % 2) * 45}%`, animationDelay: `${i * 1.1}s` }}>{e}</span>
        ))}
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Follow the Drops</div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-white">Made for Reveal Reels</h2>
        <p className="text-base md:text-lg mb-8" style={{ color: "rgba(234,216,183,0.8)" }}>
          Follow drops before they disappear. SERENA jars are made for reveal reels, shelf styling, and custom gifting.
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
      </div>
    </section>
  );
}

/* ─── GIFTING SECTION ───────────────────────────────────────── */
function GiftingSection() {
  const occasions = ["Birthday", "Best friend", "Bridesmaid", "Festival", "Farewell", "Self-care"];

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────── */
function TestimonialsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28" style={{ background: "var(--serena-cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>From Our Customers</div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Unboxing Stories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="glass-card p-6 flex flex-col gap-4 cursor-pointer"
              style={{
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: hoveredIdx === i ? "translateY(-10px) scale(1.03)" : "translateY(0) scale(1)",
                boxShadow: hoveredIdx === i ? "0 20px 50px rgba(198,161,91,0.25)" : "",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <span
                    key={s}
                    style={{ color: "var(--serena-gold)", display: "inline-block", animation: `twinkleStar ${2 + s * 0.3}s ease-in-out ${s * 0.2}s infinite` }}
                  >★</span>
                ))}
              </div>
              <p className="font-serif italic text-base leading-relaxed" style={{ color: "var(--serena-ink)" }}>&ldquo;{t.text}&rdquo;</p>
              <div className="mt-auto flex items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white heartbeat" style={{ background: "var(--serena-burgundy)" }}>{t.name[0]}</div>
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

/* ─── FINAL CTA ─────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(198,161,91,0.2) 0%, transparent 60%), var(--serena-pearl)" }}>
      <div className="absolute right-0 bottom-0 opacity-8 pointer-events-none" aria-hidden="true">
        <JarSVG accentColor="#c6a15b" label="✦" className="w-64 md:w-96 jar-float" />
      </div>
      {/* Scattered background emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {["💍","✨","💎","🌙","📿","💫"].map((e, i) => (
          <span key={i} className="absolute text-xl opacity-15 float-around" style={{ left: `${5 + i * 18}%`, top: `${20 + (i % 2) * 50}%`, animationDelay: `${i * 1.2}s` }}>{e}</span>
        ))}
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-4xl mb-4 jar-float inline-block" aria-hidden="true">🫙</div>
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Limited Batches</div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>
          Your mystery jar is waiting to be curated.
        </h2>
        <p className="text-base md:text-lg mb-3" style={{ color: "var(--serena-muted)" }}>Choose your vibe before the next batch closes.</p>
        <p className="text-xs mb-10 px-6 py-2 rounded-full inline-block heartbeat" style={{ background: "rgba(198,161,91,0.12)", color: "var(--serena-gold)", border: "1px solid rgba(198,161,91,0.25)" }}>
          Custom slots open in small batches to keep every jar personal.
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
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg text-white"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            📸 Instagram
          </a>
          <Link
            href="/shop"
            className="btn-shimmer inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-lg border"
            style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
          >
            Shop Drops
          </Link>
        </div>
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
