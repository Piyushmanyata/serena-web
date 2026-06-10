"use client";

import { useState } from "react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { INSTAGRAM_URL, SERENA_CONTACT } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "", type: "Order" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const enquiries = JSON.parse(localStorage.getItem("serena_enquiries") ?? "[]");
    enquiries.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("serena_enquiries", JSON.stringify(enquiries));
    setSent(true);
  }

  const waMsg = `Hi SERENA, my name is ${form.name || "[Name]"}. ${form.message || "I want to know more about jewellery jars."}`;

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Header */}
      <section className="py-16 md:py-20 text-center" style={{ background: "var(--serena-cream)" }}>
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--serena-gold)" }}>Get in Touch</div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Contact SERENA</h1>
        <p className="text-base max-w-lg mx-auto" style={{ color: "var(--serena-muted)" }}>
          Questions, custom jar ideas, collaborations — reach Manyata directly on WhatsApp or phone.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-8">
              <h2 className="font-serif text-xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>SERENA by {SERENA_CONTACT.ownerName}</h2>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--serena-gold)" }}>Phone</p>
                  <a href={`tel:${SERENA_CONTACT.phoneIntl}`} className="text-lg font-medium transition-colors hover:text-[#8b1e2d]" style={{ color: "var(--serena-ink)" }}>
                    {SERENA_CONTACT.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--serena-gold)" }}>WhatsApp</p>
                  <a href={createWhatsAppLink("Hi SERENA, I want to know more about jewellery jars.")} target="_blank" rel="noopener noreferrer" className="text-lg font-medium transition-colors hover:text-[#25D366]" style={{ color: "var(--serena-ink)" }}>
                    {SERENA_CONTACT.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--serena-gold)" }}>Instagram</p>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-lg font-medium transition-colors hover:text-[#bc1888]" style={{ color: "var(--serena-ink)" }}>
                    {SERENA_CONTACT.instagram}
                  </a>
                </div>
              </div>

              <div className="gold-divider my-6" />

              <div className="flex flex-col gap-3">
                <a href={createWhatsAppLink("Hi SERENA, I want to customize a jewellery jar.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm text-white" style={{ background: "#25D366" }}>
                  💬 WhatsApp Now
                </a>
                <a href={`tel:${SERENA_CONTACT.phoneIntl}`} className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm text-white" style={{ background: "var(--serena-burgundy)" }}>
                  📞 Call Now
                </a>
                <a href={createWhatsAppLink("Hi SERENA, I want to customize a jewellery jar. Please share details.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm border transition-all hover:bg-[rgba(198,161,91,0.05)]" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
                  ✦ Customize Jar on WhatsApp
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--serena-gold)" }}>Best for</h3>
              <ul className="flex flex-col gap-2">
                {["Custom jar orders", "Gifting ideas", "Styling help", "Bulk / corporate gifting", "Collaboration enquiries", "Instagram drops"].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--serena-muted)" }}>
                    <span style={{ color: "var(--serena-gold)" }}>✦</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass-card p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: "var(--serena-deep-burgundy)" }}>Message received!</h3>
                <p className="text-base mb-6" style={{ color: "var(--serena-muted)" }}>Manyata will get back to you on WhatsApp soon.</p>
                <a
                  href={createWhatsAppLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white"
                  style={{ background: "#25D366" }}
                >
                  💬 Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="font-serif text-xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>Send a Message</h2>

                {[
                  { key: "name", label: "Your Name", type: "text", required: true },
                  { key: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
                ].map((f) => (
                  <div key={f.key} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      required={f.required}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-[var(--serena-gold)] transition-all"
                      style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Request Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                  >
                    {["Order", "Custom jar", "Collaboration", "Other"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about your jar idea, styling questions, or any other query..."
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                    style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button type="submit" className="btn-shimmer py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
                    Send Message
                  </button>
                  <a href={createWhatsAppLink(waMsg)} target="_blank" rel="noopener noreferrer" className="py-4 rounded-full font-semibold text-sm text-white text-center" style={{ background: "#25D366" }}>
                    💬 WhatsApp Instead
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
