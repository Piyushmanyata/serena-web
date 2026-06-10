"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";

interface Order {
  id: string;
  name: string;
  phone: string;
  total: number;
  createdAt: string;
  orderStatus: string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("serena_last_order");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate browser-only order receipt after mount
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-lg mx-auto px-4 text-center py-16">
        {/* Animated jar */}
        <div className="jar-float inline-block mb-6">
          <JarSVG accentColor="#c6a15b" label="✦" className="w-36" />
        </div>

        {/* Sparkles */}
        <div className="flex justify-center gap-3 text-2xl mb-6" aria-hidden="true">
          {["✨", "💎", "✨"].map((e, i) => (
            <span key={i} className="sparkle" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
          ))}
        </div>

        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4" style={{ background: "rgba(34,197,94,0.15)", color: "#16a34a" }}>
          Order Placed ✓
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>
          Your SERENA jar is being prepared.
        </h1>
        <p className="text-base mb-2" style={{ color: "var(--serena-muted)" }}>
          We will confirm your order details on WhatsApp shortly.
        </p>

        {order && (
          <div className="glass-card p-5 mb-8 text-left">
            <div className="flex flex-col gap-2">
              {[
                ["Order ID", order.id],
                ["Name", order.name],
                ["Phone", order.phone],
                ["Total", `₹${order.total}`],
                ["Status", "New — Awaiting Confirmation"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 text-sm">
                  <span className="w-24 flex-shrink-0 font-semibold" style={{ color: "var(--serena-gold)" }}>{k}</span>
                  <span style={{ color: "var(--serena-ink)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={createWhatsAppLink(generalMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "#25D366" }}
          >
            💬 WhatsApp SERENA
          </a>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all hover:-translate-y-0.5"
            style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/customize"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
          >
            ✦ Customize Another Jar
          </Link>
        </div>

        <p className="text-xs mt-8" style={{ color: "var(--serena-muted)" }}>
          Open it. Wear it. Keep the jar. — Not just jewellery, a small treasure ritual.
        </p>
      </div>
    </div>
  );
}
