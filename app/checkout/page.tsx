"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createWhatsAppLink, cartOrderMessage } from "@/lib/whatsapp";
import { INSTAGRAM_URL, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export default function CheckoutPage() {
  const { items, subtotal, mounted } = useCart();
  const [copied, setCopied] = useState(false);
  const [instaExpanded, setInstaExpanded] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const orderLines = [
    "Hi SERENA! I'd like to order:",
    "",
    ...items.map((item, idx) => `${idx + 1}. ${item.productName} ×${item.quantity} — ₹${item.price * item.quantity}`),
    "",
    `Subtotal: ₹${subtotal}`,
    shipping > 0 ? `Shipping: ₹${shipping}` : "Shipping: Free 🎉",
    `Total: ₹${total}`,
    "",
    "Please confirm availability!",
  ];
  const orderText = orderLines.join("\n");

  function handleCopy() {
    navigator.clipboard.writeText(orderText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <div className="text-center px-4">
          <div className="text-7xl mb-6 jar-float inline-block">🫙</div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>Your cart is empty</h1>
          <p className="text-base mb-8" style={{ color: "var(--serena-muted)" }}>Discover curated mystery jars made for your mood.</p>
          <Link href="/shop" className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
            Shop Jars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4 bounce-in inline-block">🛍️</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
            How do you want to order?
          </h1>
          <p className="text-sm" style={{ color: "var(--serena-muted)" }}>
            We handle all orders personally via WhatsApp or Instagram — quick &amp; friendly!
          </p>
        </div>

        {/* Order summary */}
        <div className="glass-card p-6 mb-8">
          <h2 className="font-semibold text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "var(--serena-gold)" }}>Your Order Summary</h2>
          <div className="flex flex-col gap-2.5 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm items-center gap-2">
                <span className="flex items-center gap-2" style={{ color: "var(--serena-muted)" }}>
                  <span className="text-base">{item.emoji}</span>
                  <span className="truncate">{item.productName} ×{item.quantity}</span>
                </span>
                <span className="font-medium flex-shrink-0" style={{ color: "var(--serena-ink)" }}>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="gold-divider mb-3" />
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: "var(--serena-muted)" }}>Shipping</span>
            <span style={{ color: shipping === 0 ? "#22c55e" : "var(--serena-ink)" }}>
              {shipping === 0 ? "Free 🎉" : `₹${shipping}`}
            </span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span style={{ color: "var(--serena-ink)" }}>Total</span>
            <span className="font-serif text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>₹{total}</span>
          </div>
        </div>

        {/* Choice buttons */}
        <div className="flex flex-col gap-4 mb-6">

          {/* WhatsApp */}
          <a
            href={createWhatsAppLink(orderText)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden flex items-center gap-5 p-6 rounded-2xl border-2 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              borderColor: "#25D366",
              color: "white",
              boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 35px rgba(37,211,102,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.25)"; }}
          >
            <span className="text-4xl flex-shrink-0 float-medium">💬</span>
            <div className="flex-1">
              <p className="font-bold text-lg">Order via WhatsApp</p>
              <p className="text-sm opacity-90">Tap to open WhatsApp — your order details are pre-filled!</p>
            </div>
            <span className="text-2xl opacity-70 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          {/* Instagram */}
          {instaExpanded ? (
            <div
              className="glass-card p-6 rounded-2xl border-2 transition-all duration-300"
              style={{ borderColor: "#E1306C" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl float-medium">📸</span>
                <div>
                  <p className="font-bold text-base" style={{ color: "var(--serena-deep-burgundy)" }}>Order via Instagram DM</p>
                  <p className="text-xs" style={{ color: "var(--serena-muted)" }}>Copy your order, then DM @_serena_.co</p>
                </div>
              </div>
              <pre
                className="text-xs p-4 rounded-xl mb-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed"
                style={{ background: "rgba(198,161,91,0.08)", color: "var(--serena-ink)", border: "1px dashed rgba(198,161,91,0.3)" }}
              >
                {orderText}
              </pre>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="btn-shimmer flex-1 py-3 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: copied ? "var(--serena-gold)" : "var(--serena-deep-burgundy)",
                    color: "var(--serena-cream)",
                    border: "1px solid var(--serena-gold)",
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Order"}
                </button>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer flex-1 py-3 rounded-full font-semibold text-sm text-white text-center"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
                >
                  📸 Open Instagram
                </a>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setInstaExpanded(true)}
              className="group flex items-center gap-5 p-6 rounded-2xl border-2 transition-all duration-300 text-white"
              style={{
                background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                borderColor: "#E1306C",
                boxShadow: "0 4px 20px rgba(220,39,67,0.25)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 35px rgba(220,39,67,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(220,39,67,0.25)"; }}
            >
              <span className="text-4xl flex-shrink-0 float-medium">📸</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-lg">Order via Instagram</p>
                <p className="text-sm opacity-90">Slide into our DMs — @_serena_.co</p>
              </div>
              <span className="text-2xl opacity-70 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          )}
        </div>

        <p className="text-xs text-center" style={{ color: "var(--serena-muted)" }}>
          We personally confirm every order. No prepayment until we confirm availability! ✦
        </p>

        <div className="flex justify-center mt-4">
          <Link href="/cart" className="text-sm hover:underline transition-colors" style={{ color: "var(--serena-gold)" }}>
            ← Back to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
