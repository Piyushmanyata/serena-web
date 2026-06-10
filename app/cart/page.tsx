"use client";

import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { useCart } from "@/lib/cart";
import { createWhatsAppLink, cartOrderMessage } from "@/lib/whatsapp";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { getProductBySlug } from "@/lib/products";

export default function CartPage() {
  const { items, count, subtotal, updateQty, removeFromCart, mounted } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <div className="text-center px-4">
          <div className="text-7xl mb-6 jar-float inline-block">🫙</div>
          <h1 className="font-serif text-3xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>Your cart is empty</h1>
          <p className="text-base mb-8" style={{ color: "var(--serena-muted)" }}>Discover curated jewellery jars made for your mood.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
              Shop Jars
            </Link>
            <Link href="/customize" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border" style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}>
              ✦ Build Custom Jar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8" style={{ color: "var(--serena-deep-burgundy)" }}>
          Your Cart <span className="text-xl font-normal" style={{ color: "var(--serena-muted)" }}>({count} {count === 1 ? "item" : "items"})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => {
              const product = getProductBySlug(item.slug);
              return (
                <div key={item.productId} className="glass-card p-4 flex gap-4">
                  {/* Jar thumb */}
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--serena-cream)" }}>
                    {product ? (
                      <JarSVG accentColor={product.accentColor} label={item.emoji} className="w-16 h-16" />
                    ) : (
                      <span className="text-3xl">{item.emoji}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/shop/${item.slug}`} className="font-semibold text-sm hover:text-[#8b1e2d] transition-colors" style={{ color: "var(--serena-ink)" }}>
                          {item.productName}
                        </Link>
                        {item.customizations?.vibe && (
                          <p className="text-xs" style={{ color: "var(--serena-muted)" }}>Vibe: {item.customizations.vibe}</p>
                        )}
                      </div>
                      <button onClick={() => removeFromCart(item.productId)} aria-label={`Remove ${item.productName}`} className="text-sm transition-colors hover:text-red-600 flex-shrink-0" style={{ color: "var(--serena-muted)" }}>✕</button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty */}
                      <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: "rgba(198,161,91,0.4)" }}>
                        <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-base transition-colors hover:bg-[rgba(198,161,91,0.1)]" style={{ color: "var(--serena-ink)" }} aria-label="Decrease">-</button>
                        <span className="w-6 text-center text-sm" style={{ color: "var(--serena-ink)" }}>{item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-base transition-colors hover:bg-[rgba(198,161,91,0.1)]" style={{ color: "var(--serena-ink)" }} aria-label="Increase">+</button>
                      </div>
                      <span className="font-serif font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>Order Summary</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--serena-muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--serena-ink)" }}>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--serena-muted)" }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#22c55e" : "var(--serena-ink)" }}>
                    {shipping === 0 ? (subtotal > 0 ? "Free 🎉" : "—") : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs" style={{ color: "var(--serena-muted)" }}>
                    Add ₹{FREE_SHIPPING_THRESHOLD - subtotal} more for free shipping
                  </p>
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
                  className="btn-shimmer w-full py-4 rounded-full font-semibold text-sm text-center transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                >
                  Proceed to Checkout
                </Link>
                <a
                  href={createWhatsAppLink(cartOrderMessage(items, total))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full font-semibold text-sm text-white text-center transition-all hover:-translate-y-0.5"
                  style={{ background: "#25D366" }}
                >
                  💬 WhatsApp Checkout
                </a>
              </div>

              <p className="text-xs text-center mt-4" style={{ color: "var(--serena-muted)" }}>
                Secure checkout · WhatsApp confirmation included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
