"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { VIBES, JEWELLERY_TYPES, METAL_TONES, BUDGET_OPTIONS, VIBE_CONFIG } from "@/lib/constants";
import { createWhatsAppLink, customJarMessage } from "@/lib/whatsapp";
import type { CustomJarRequest, JewelleryType, MetalTone } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STEPS = ["Vibe", "Jewellery", "Metal", "Upload", "Budget", "Notes", "Review"];

const initialState: CustomJarRequest = {
  customerName: "",
  phone: "",
  email: "",
  whatsapp: "",
  selectedVibe: "",
  selectedJewelleryTypes: [],
  metalTone: "",
  colourPalette: "",
  budget: 0,
  notes: "",
};

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}><div className="text-3xl jar-float">🫙</div></div>}>
      <CustomizePageInner />
    </Suspense>
  );
}

function CustomizePageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CustomJarRequest>(() => ({
    ...initialState,
    selectedVibe: searchParams.get("vibe") ?? "",
    colourPalette: "Discuss on WhatsApp",
  }));
  const [submitted, setSubmitted] = useState(false);

  const vibeConfig = form.selectedVibe ? VIBE_CONFIG[form.selectedVibe] : null;
  const accentColor = vibeConfig?.colors[0] ?? "#c6a15b";

  function update<K extends keyof CustomJarRequest>(key: K, val: CustomJarRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function toggleType(type: JewelleryType) {
    update(
      "selectedJewelleryTypes",
      form.selectedJewelleryTypes.includes(type)
        ? form.selectedJewelleryTypes.filter((t) => t !== type)
        : [...form.selectedJewelleryTypes, type]
    );
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0: return !!form.selectedVibe;
      case 1: return form.selectedJewelleryTypes.length > 0;
      case 2: return !!form.metalTone;
      case 3: return true; // upload optional
      case 4: return form.budget > 0;
      case 5: return true; // notes optional
      case 6: return !!(form.customerName && form.phone);
      default: return true;
    }
  }

  function handleSubmit() {
    // Save to localStorage for admin view
    const requests = JSON.parse(localStorage.getItem("serena_custom_requests") ?? "[]");
    requests.push({ ...form, status: "new", createdAt: new Date().toISOString() });
    localStorage.setItem("serena_custom_requests", JSON.stringify(requests));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="text-7xl mb-6 jar-float inline-block">🫙</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>
            Your SERENA jar request has been received.
          </h1>
          <p className="text-base mb-8" style={{ color: "var(--serena-muted)" }}>
            Manyata will review your references and confirm your jar details on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={createWhatsAppLink(customJarMessage(form))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
              style={{ background: "#25D366" }}
            >
              💬 Continue on WhatsApp
            </a>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
              Shop More Jars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <ScrollReveal variant="fade-in" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="text-center mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--serena-gold)" }}>Custom Jar Builder</div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-2" style={{ color: "var(--serena-deep-burgundy)" }}>Build My Jar</h1>
          <p className="text-sm" style={{ color: "var(--serena-muted)" }}>Step {step + 1} of {STEPS.length}</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1 mb-8">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              className="flex-1 h-1.5 rounded-full transition-all duration-300 overflow-hidden relative"
              style={{ background: i <= step ? "var(--serena-gold)" : "rgba(198,161,91,0.2)", cursor: i < step ? "pointer" : "default" }}
              aria-label={`Step ${i + 1}: ${s}`}
              aria-current={i === step ? "step" : undefined}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form area */}
          <div className="md:col-span-3">
            <div className="glass-card p-6 md:p-8 min-h-[400px]">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "var(--serena-gold)" }}>
                Step {step + 1}
              </div>
              <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>
                {STEPS[step]}
              </h2>

              {/* Step 0: Vibe */}
              {step === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VIBES.map((vibe) => {
                    const v = VIBE_CONFIG[vibe];
                    const isActive = form.selectedVibe === vibe;
                    return (
                      <button
                        key={vibe}
                        onClick={() => update("selectedVibe", vibe)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 ${isActive ? "shadow-[0_4px_16px_rgba(198,161,91,0.3)]" : "hover:border-[rgba(198,161,91,0.5)]"}`}
                        style={{ background: isActive ? "rgba(255,250,243,0.9)" : "transparent", borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)" }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{v.emoji}</span>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: "var(--serena-ink)" }}>{vibe}</p>
                            <p className="text-xs" style={{ color: "var(--serena-muted)" }}>{v.desc}</p>
                            <div className="flex gap-1 mt-1.5">
                              {v.colors.slice(0, 3).map((c, i) => <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 1: Jewellery types */}
              {step === 1 && (
                <div>
                  <p className="text-sm mb-4" style={{ color: "var(--serena-muted)" }}>Pick what you wear most. We will curate around your selected types.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {JEWELLERY_TYPES.map((type) => {
                      const emojis = ["📿", "⛓️", "💍", "💎", "🔮", "🪙", "⌚", "🌙"];
                      const i = JEWELLERY_TYPES.indexOf(type);
                      const isActive = form.selectedJewelleryTypes.includes(type);
                      return (
                        <button
                          key={type}
                          onClick={() => toggleType(type)}
                          className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-200 ${isActive ? "shadow-[0_2px_12px_rgba(198,161,91,0.3)]" : "hover:border-[rgba(198,161,91,0.5)]"}`}
                          style={{ background: isActive ? "rgba(255,250,243,0.9)" : "transparent", borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)" }}
                          aria-pressed={isActive}
                        >
                          <span>{emojis[i]}</span>
                          <span className="text-sm font-medium" style={{ color: "var(--serena-ink)" }}>{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Metal tone */}
              {step === 2 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {METAL_TONES.map((metal) => {
                    const colors: Record<string, string> = { Gold: "#c6a15b", Silver: "#a8b2bd", "Rose Gold": "#d4a0a0", Gunmetal: "#5a5a5a", Mixed: "#c6a15b", "Surprise Me": "#c6a15b" };
                    const isActive = form.metalTone === metal;
                    return (
                      <button
                        key={metal}
                        onClick={() => update("metalTone", metal as MetalTone)}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 ${isActive ? "shadow-[0_4px_16px_rgba(198,161,91,0.3)]" : "hover:border-[rgba(198,161,91,0.5)]"}`}
                        style={{ background: isActive ? "rgba(255,250,243,0.9)" : "transparent", borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)" }}
                      >
                        <div className="w-8 h-8 rounded-full" style={{ background: colors[metal] ?? "#c6a15b" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--serena-ink)" }}>{metal}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 3: Upload references */}
              {step === 3 && (
                <div>
                  <p className="text-sm mb-4" style={{ color: "var(--serena-muted)" }}>
                    Upload outfit photos, jewellery inspo, Pinterest screenshots, colour palettes, or jar label ideas. (1–5 images, max 5MB each)
                  </p>
                  <div
                    className="border-2 border-dashed rounded-2xl p-8 text-center transition-colors"
                    style={{ borderColor: "rgba(198,161,91,0.4)", background: "rgba(255,250,243,0.5)" }}
                  >
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--serena-ink)" }}>Drag & drop or click to upload</p>
                    <p className="text-xs" style={{ color: "var(--serena-muted)" }}>JPG, PNG, WEBP · Max 5MB each</p>
                    <p className="text-xs mt-2" style={{ color: "var(--serena-gold)" }}>(Upload functionality coming soon — you can send photos via WhatsApp)</p>
                  </div>
                  <p className="text-xs mt-3 text-center" style={{ color: "var(--serena-muted)" }}>
                    You can also send reference photos on WhatsApp when Manyata contacts you.
                  </p>
                </div>
              )}

              {/* Step 4: Budget */}
              {step === 4 && (
                <div>
                  <p className="text-sm mb-4" style={{ color: "var(--serena-muted)" }}>Higher budgets allow more statement pieces, richer layering, and stronger customization.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {BUDGET_OPTIONS.map((b) => {
                      const isActive = form.budget === b;
                      return (
                        <button
                          key={b}
                          onClick={() => update("budget", b)}
                          className={`p-4 rounded-xl border flex flex-col items-center gap-1 transition-all duration-200 ${isActive ? "shadow-[0_4px_16px_rgba(198,161,91,0.3)]" : "hover:border-[rgba(198,161,91,0.5)]"}`}
                          style={{ background: isActive ? "rgba(255,250,243,0.9)" : "transparent", borderColor: isActive ? "var(--serena-gold)" : "rgba(198,161,91,0.2)" }}
                        >
                          <span className="font-serif text-2xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>₹{b}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 block" style={{ color: "var(--serena-gold)" }}>Custom Budget</label>
                    <input
                      type="number"
                      placeholder="Enter your budget"
                      value={form.budget || ""}
                      onChange={(e) => update("budget", Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.4)", color: "var(--serena-ink)" }}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Notes */}
              {step === 5 && (
                <div>
                  <textarea
                    placeholder="Tell us your vibe: soft, bold, minimal, gothic, beachy, bridal, college daily wear, birthday gift, etc."
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all focus:border-[var(--serena-gold)]"
                    style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                  />
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] mb-1.5 block" style={{ color: "var(--serena-gold)" }}>Your Name *</label>
                      <input
                        type="text"
                        value={form.customerName}
                        onChange={(e) => update("customerName", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-[0.2em] mb-1.5 block" style={{ color: "var(--serena-gold)" }}>Phone *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                        style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                        required
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-4 rounded-xl" style={{ background: "rgba(198,161,91,0.08)", border: "1px solid rgba(198,161,91,0.2)" }}>
                    <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--serena-ink)" }}>Your Custom Jar</h3>
                    {[
                      ["Vibe", form.selectedVibe],
                      ["Jewellery Types", form.selectedJewelleryTypes.join(", ")],
                      ["Metal Tone", form.metalTone],
                      ["Budget", `₹${form.budget}`],
                      ["Notes", form.notes || "—"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex gap-2 text-xs mb-1">
                        <span className="font-semibold w-28 flex-shrink-0" style={{ color: "var(--serena-gold)" }}>{label}</span>
                        <span style={{ color: "var(--serena-muted)" }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleSubmit}
                      disabled={!canAdvance()}
                      className="w-full py-4 rounded-full font-semibold text-sm btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                    >
                      ✦ Submit Custom Request
                    </button>
                    <a
                      href={createWhatsAppLink(customJarMessage(form))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-full font-semibold text-sm text-white text-center"
                      style={{ background: "#25D366" }}
                    >
                      💬 Submit and Continue to WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3 mt-4">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-full border text-sm font-medium transition-all"
                  style={{ borderColor: "rgba(198,161,91,0.4)", color: "var(--serena-muted)" }}
                >
                  ← Back
                </button>
              )}
              {step < STEPS.length - 1 && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canAdvance()}
                  className="flex-1 py-3 rounded-full text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: canAdvance() ? "var(--serena-deep-burgundy)" : "rgba(198,161,91,0.2)", color: canAdvance() ? "var(--serena-cream)" : "var(--serena-muted)", border: "1px solid var(--serena-gold)" }}
                >
                  Continue →
                </button>
              )}
            </div>
          </div>

          {/* Jar preview sidebar */}
          <div className="md:col-span-2 flex flex-col items-center gap-4">
            <div
              className="w-full rounded-3xl p-6 flex flex-col items-center gap-4 sticky top-24"
              style={{ background: vibeConfig ? `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)` : "var(--serena-cream)", border: "1px solid rgba(198,161,91,0.2)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Your Jar Preview</p>
              <div className="jar-float w-full max-w-[160px]">
                <JarSVG
                  accentColor={accentColor}
                  label={vibeConfig?.emoji ?? "✦"}
                  className="w-full drop-shadow-2xl"
                />
              </div>
              {form.selectedVibe && (
                <div className="text-center">
                  <p className="font-semibold text-sm" style={{ color: "var(--serena-ink)" }}>{form.selectedVibe}</p>
                  {form.metalTone && <p className="text-xs" style={{ color: "var(--serena-muted)" }}>{form.metalTone} tones</p>}
                  {form.budget > 0 && <p className="font-serif text-xl font-bold mt-1" style={{ color: "var(--serena-deep-burgundy)" }}>₹{form.budget}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
