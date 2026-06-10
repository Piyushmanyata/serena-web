"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createWhatsAppLink, cartOrderMessage } from "@/lib/whatsapp";
import { DELIVERY_WINDOW, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, PAYMENT_NOTE } from "@/lib/constants";
import { getProductBySlug } from "@/lib/products";
import type { CartItem } from "@/types";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// ── Animated filling jar visual ──────────────────────────────
function FillingJarDisplay({ count, items }: { count: number; items: CartItem[] }) {
  const maxCount = 10;
  const fillFraction = Math.min(count / maxCount, 1);

  // Jar body: top=78, bottom=260, height=182
  const jarBodyHeight = 182;
  const jarBodyTop = 78;
  const fillTranslateY = jarBodyHeight * (1 - fillFraction);

  const fillColor = fillFraction === 0
    ? "transparent"
    : fillFraction < 0.35
    ? "rgba(139,30,45,0.22)"
    : fillFraction < 0.65
    ? "rgba(139,30,45,0.3)"
    : "rgba(139,30,45,0.38)";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: "140px" }}>
        {/* Floating item emojis inside jar area */}
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{ top: "28%", left: "18%", right: "18%", bottom: "8%", zIndex: 5 }}
          aria-hidden="true"
        >
          {items.slice(0, 5).map((item, i) => (
            <span
              key={item.productId}
              className="absolute text-base select-none"
              style={{
                left: `${15 + (i % 3) * 32}%`,
                bottom: `${8 + Math.floor(i / 3) * 40}%`,
                animation: `floatSlow ${3 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
                opacity: 0.75,
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

        <svg viewBox="0 0 200 280" className="w-full relative z-10" aria-label="Filling jar">
          <defs>
            <clipPath id="cart-jar-clip">
              <path d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z" />
            </clipPath>
          </defs>

          {/* Cork */}
          <rect x="50" y="22" width="100" height="8" rx="4" fill="#b8935a" />
          <rect x="45" y="28" width="110" height="36" rx="10" fill="#c6a15b" />
          {/* Rim */}
          <rect x="18" y="62" width="164" height="16" rx="5" fill="#c6a15b" />
          {/* Jar body */}
          <path
            d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z"
            fill="rgba(255,255,255,0.12)"
            stroke="#c6a15b"
            strokeWidth="1.5"
          />

          {/* Animated fill */}
          <rect
            x="19"
            y={jarBodyTop}
            width="162"
            height={jarBodyHeight}
            fill={fillColor}
            clipPath="url(#cart-jar-clip)"
            style={{
              transform: `translateY(${fillTranslateY}px)`,
              transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />

          {/* Glass reflection */}
          <path d="M36 90 L32 230 Q32 245 42 245 L50 245 L54 90 Z" fill="rgba(255,255,255,0.14)" clipPath="url(#cart-jar-clip)" />

          {/* Label */}
          <rect x="38" y="100" width="124" height="120" rx="12" fill="rgba(248,239,226,0.8)" stroke="#c6a15b" strokeWidth="1" clipPath="url(#cart-jar-clip)" />

          {count === 0 ? (
            <>
              <text x="100" y="155" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="13" fill="rgba(82,17,28,0.35)">EMPTY</text>
              <text x="100" y="172" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="6.5" letterSpacing="2" fill="rgba(123,106,98,0.5)">ADD ITEMS</text>
            </>
          ) : (
            <>
              <text x="100" y="148" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="16" letterSpacing="3" fill="#52111c">SERENA</text>
              <text x="100" y="165" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="6.5" letterSpacing="2.5" fill="#7b6a62">JEWELLERY JAR</text>
              <text x="100" y="192" textAnchor="middle" fontSize="11" fill="#c6a15b">✦</text>
            </>
          )}

          {/* Bottom glow */}
          <ellipse cx="100" cy="262" rx="60" ry="6" fill="#c6a15b" opacity="0.18" />
        </svg>
      </div>

      {/* Fill level label */}
      <div className="text-center">
        {count === 0 ? (
          <p className="text-xs" style={{ color: "var(--serena-muted)" }}>Your jar is empty</p>
        ) : (
          <p className="text-xs font-semibold" style={{ color: "var(--serena-gold)" }}>
            {count} {count === 1 ? "item" : "items"} in your jar
          </p>
        )}
        {count > 0 && (
          <div className="mt-1 h-1.5 w-32 rounded-full overflow-hidden mx-auto" style={{ background: "rgba(198,161,91,0.15)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(fillFraction * 100, 100)}%`,
                background: "linear-gradient(90deg, var(--serena-gold), var(--serena-gold-light))",
                transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeFromCart, mounted } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[rgba(198,161,91,0.25)] border-t-[var(--serena-gold)] animate-spin" />
          <p className="text-sm" style={{ color: "var(--serena-muted)" }}>Loading your saved order...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <ScrollReveal variant="scale-up" className="max-w-md w-full px-4 text-center flex flex-col items-center justify-center">
          <div className="mb-6 flex justify-center">
            <FillingJarDisplay count={0} items={[]} />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>Your jar is empty</h1>
          <p className="text-sm md:text-base mb-8 max-w-sm mx-auto" style={{ color: "var(--serena-muted)" }}>
            Let&apos;s start styling! Choose one of our curated mystery collections or customize a jar entirely to your aesthetic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
            <Link href="/shop" className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold w-full sm:w-auto" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
              Shop Jars
            </Link>
            <Link href="/customize" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border hover-lift w-full sm:w-auto" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
              ✦ Customize Jar
            </Link>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8" style={{ color: "var(--serena-deep-burgundy)" }}>
          Your Saved Order{" "}
          <span className="text-xl font-normal" style={{ color: "var(--serena-muted)" }}>
            ({count} {count === 1 ? "item" : "items"})
          </span>
        </h1>
        <div
          className="mb-8 rounded-2xl border p-5"
          style={{ background: "rgba(198,161,91,0.08)", borderColor: "rgba(198,161,91,0.25)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["1", "Save jars", "Choose ready drops or custom jars you want SERENA to reserve."],
              ["2", "Send on WhatsApp", "Your order details are pre-filled so you do not need to retype anything."],
              ["3", "Confirm + pay", `We confirm availability, delivery, and payment details. Delivery: ${DELIVERY_WINDOW}.`],
            ].map(([num, title, desc]) => (
              <div key={title} className="flex gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)" }}>{num}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>{title}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--serena-muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--serena-muted)" }}>{PAYMENT_NOTE}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item, idx) => {
              const product = getProductBySlug(item.slug);
              return (
                <div
                  key={item.productId}
                  className="glass-card p-4 flex gap-4"
                  style={{
                    animation: `slideInBottom 0.4s ${idx * 0.08}s ease forwards`,
                    opacity: 0,
                  }}
                >
                  {/* Jar thumb */}
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 hover-lift"
                    style={{ background: "var(--serena-cream)", cursor: "pointer" }}
                  >
                    {product ? (
                      <svg viewBox="0 0 200 280" className="w-14 h-14" aria-label={item.productName}>
                        <rect x="50" y="22" width="100" height="8" rx="4" fill="#b8935a" />
                        <rect x="45" y="28" width="110" height="36" rx="10" fill={product.accentColor} />
                        <rect x="18" y="62" width="164" height="16" rx="5" fill={product.accentColor} />
                        <path d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z" fill="rgba(255,255,255,0.2)" stroke={product.accentColor} strokeWidth="1.5" />
                        <text x="100" y="175" textAnchor="middle" fontSize="40">{item.emoji}</text>
                      </svg>
                    ) : (
                      <span className="text-3xl float-medium">{item.emoji}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-semibold text-sm hover:text-[#8b1e2d] transition-colors"
                          style={{ color: "var(--serena-ink)" }}
                        >
                          {item.productName}
                        </Link>
                        {item.customizations?.vibe && (
                          <p className="text-xs mt-0.5" style={{ color: "var(--serena-muted)" }}>
                            Vibe: {item.customizations.vibe}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        aria-label={`Remove ${item.productName}`}
                        className="text-sm transition-all hover:text-red-500 hover:scale-125 flex-shrink-0"
                        style={{ color: "var(--serena-muted)" }}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: "rgba(198,161,91,0.4)" }}>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-base transition-all hover:bg-[rgba(198,161,91,0.15)] active:scale-90"
                          style={{ color: "var(--serena-ink)" }}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-base transition-all hover:bg-[rgba(198,161,91,0.15)] active:scale-90"
                          style={{ color: "var(--serena-ink)" }}
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-serif font-bold text-base" style={{ color: "var(--serena-deep-burgundy)" }}>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary + filling jar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              {/* Animated filling jar */}
              <div className="mb-6">
                <FillingJarDisplay count={count} items={items} />
              </div>

              <h2 className="font-serif text-xl font-bold mb-5" style={{ color: "var(--serena-deep-burgundy)" }}>Order Summary</h2>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--serena-muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--serena-ink)" }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--serena-muted)" }}>Shipping</span>
                  <span className="font-semibold" style={{ color: shipping === 0 ? "#16a34a" : "var(--serena-ink)" }}>
                    {shipping === 0 ? (subtotal > 0 ? "Free 🎉" : "—") : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping > 0 ? (
                  <div className="mt-1">
                    <p className="text-xs mb-1.5 flex justify-between" style={{ color: "var(--serena-muted)" }}>
                      <span>Free shipping progress</span>
                      <span className="font-semibold" style={{ color: "var(--serena-gold)" }}>₹{subtotal} / ₹{FREE_SHIPPING_THRESHOLD}</span>
                    </p>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(198,161,91,0.15)" }}>
                      <div
                        className="h-full rounded-full bg-[var(--serena-gold)] transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] mt-1.5 italic" style={{ color: "var(--serena-muted)" }}>
                      Add ₹{FREE_SHIPPING_THRESHOLD - subtotal} more for free shipping
                    </p>
                  </div>
                ) : (
                  subtotal > 0 && (
                    <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
                      🎉 You qualified for Free Shipping!
                    </p>
                  )
                )}

                <div className="gold-divider" />
                <div className="flex justify-between font-bold">
                  <span style={{ color: "var(--serena-ink)" }}>Total</span>
                  <span className="font-serif text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>₹{total}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/checkout"
                  className="btn-shimmer w-full py-4 rounded-full font-semibold text-sm text-center"
                  style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                >
                  ✦ Choose How to Send Order
                </Link>
                <a
                  href={createWhatsAppLink(cartOrderMessage(items, total))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer w-full py-4 rounded-full font-semibold text-sm text-white text-center"
                  style={{ background: "#25D366" }}
                >
                  💬 WhatsApp Checkout
                </a>
              </div>

              <p className="text-xs text-center mt-4" style={{ color: "var(--serena-muted)" }}>
                Orders confirmed via WhatsApp or Instagram ✦
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
