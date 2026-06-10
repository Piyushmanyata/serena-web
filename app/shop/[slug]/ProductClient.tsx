"use client";

import { useState } from "react";
import Link from "next/link";
import { JarSVG } from "@/components/brand/Logo";
import { JarCard } from "@/components/product/JarCard";
import { createWhatsAppLink, productOrderMessage } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { DELIVERY_WINDOW, FAQS, FREE_SHIPPING_THRESHOLD, PAYMENT_NOTE, SHIPPING_FEE } from "@/lib/constants";
import { formatPrice, getDropStatus } from "@/lib/commerce";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

export default function ProductClient({
  product,
  related,
  isLowStock,
}: {
  product: NonNullable<ReturnType<typeof getProductBySlug>>;
  related: ReturnType<typeof getRelatedProducts>;
  isLowStock: boolean;
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const dropStatus = getDropStatus(product);

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const waLink = createWhatsAppLink(productOrderMessage(product.name));

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs mb-8" aria-label="Breadcrumb" style={{ color: "var(--serena-muted)" }}>
          <Link href="/" className="hover:text-[#8b1e2d] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#8b1e2d] transition-colors">Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--serena-ink)" }}>{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left: Jar visual */}
          <div className="flex flex-col gap-4">
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center py-12 px-8"
              style={{ background: `radial-gradient(ellipse, ${product.accentColor}22 0%, ${product.accentColor}08 60%, transparent 100%), var(--serena-cream)`, border: "1px solid rgba(198,161,91,0.2)" }}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isLimitedDrop && (
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full text-white" style={{ background: "var(--serena-burgundy)" }}>Limited Drop</span>
                )}
                {dropStatus && (
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: "var(--serena-champagne)", color: "var(--serena-deep-burgundy)" }}>{dropStatus}</span>
                )}
                {isLowStock && (
                  <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full text-white" style={{ background: "#b45309" }}>Only {product.stock} left</span>
                )}
              </div>

              {/* Piece count badge */}
              <div className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "var(--serena-champagne)", color: "var(--serena-deep-burgundy)" }}>
                {product.pieceCountMin}–{product.pieceCountMax} pieces
              </div>

              <div className="jar-float w-full max-w-xs">
                <JarSVG
                  accentColor={product.accentColor}
                  label={product.emoji}
                  className="w-full drop-shadow-[0_20px_60px_rgba(198,161,91,0.3)]"
                />
              </div>
            </div>

            {/* Colour palette chips */}
            <div className="flex flex-wrap gap-2">
              {product.colourPalette.map((c) => (
                <span key={c} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-muted)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: "var(--serena-gold)" }}>
                {product.category} · {product.emoji}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
                {product.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.moodTags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border" style={{ borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-4xl font-black" style={{ color: "var(--serena-deep-burgundy)" }}>₹{product.price}</span>
              {product.compareAtPrice && (
                <span className="text-xl line-through" style={{ color: "var(--serena-muted)" }}>₹{product.compareAtPrice}</span>
              )}
              {product.compareAtPrice && (
                <span className="text-sm font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(198,161,91,0.15)", color: "var(--serena-gold)" }}>
                  Save ₹{product.compareAtPrice - product.price}
                </span>
              )}
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-2xl border p-3"
              style={{ borderColor: "rgba(198,161,91,0.25)", background: "rgba(198,161,91,0.08)" }}
            >
              {[
                ["Delivery", DELIVERY_WINDOW],
                ["Shipping", `${formatPrice(SHIPPING_FEE)} · free above ${formatPrice(FREE_SHIPPING_THRESHOLD)}`],
                ["Payment", "After personal confirmation"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl px-3 py-2" style={{ background: "rgba(255,250,243,0.55)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>{label}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--serena-muted)" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Metal tones */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--serena-gold)" }}>Metal Tones</p>
              <div className="flex flex-wrap gap-2">
                {product.metalTones.map((m) => (
                  <span key={m} className="text-xs px-3 py-1.5 rounded-full border font-medium" style={{ borderColor: "rgba(198,161,91,0.4)", color: "var(--serena-ink)", background: "rgba(234,216,183,0.2)" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Included types */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--serena-gold)" }}>What&apos;s Inside</p>
              <div className="flex flex-wrap gap-2">
                {product.includedTypes.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "var(--serena-champagne)", color: "var(--serena-deep-burgundy)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border overflow-hidden" style={{ borderColor: "rgba(198,161,91,0.4)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[rgba(198,161,91,0.1)]" style={{ color: "var(--serena-ink)" }} aria-label="Decrease quantity">-</button>
                <span className="w-8 text-center text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>{qty}</span>
                <button onClick={() => setQty(Math.min(10, qty + 1))} className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[rgba(198,161,91,0.1)]" style={{ color: "var(--serena-ink)" }} aria-label="Increase quantity">+</button>
              </div>
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="flex-1 btn-shimmer py-3 rounded-full font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: added ? "var(--serena-gold)" : "var(--serena-deep-burgundy)",
                  color: "var(--serena-cream)",
                  border: "1px solid var(--serena-gold)",
                }}
              >
                {product.stock === 0 ? "Sold Out" : added ? "✓ Saved to Order" : "Save to Order"}
              </button>
            </div>

            {/* WhatsApp order */}
            <div className="flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: "#25D366" }}
              >
                💬 Order via WhatsApp
              </a>
              <Link
                href={`/checkout`}
                className="flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm border transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--serena-gold)", color: "var(--serena-deep-burgundy)" }}
              >
                Choose How to Order
              </Link>
            </div>

            {/* Customize link */}
            {product.isCustomizable && (
              <Link
                href={`/customize?vibe=${encodeURIComponent(product.moodTags[0] ?? "")}`}
                className="text-center text-sm transition-colors hover:text-[#52111c]"
                style={{ color: "var(--serena-gold)" }}
              >
                ✦ Want a custom version? Build your own jar →
              </Link>
            )}

            {/* Disclaimers */}
            <div className="text-xs leading-relaxed p-4 rounded-xl" style={{ background: "rgba(198,161,91,0.08)", color: "var(--serena-muted)" }}>
              <p>SERENA jars include premium fashion jewellery. Exact pieces may vary based on availability and preferences.</p>
              <p className="mt-1">Keep away from water, perfume, and harsh chemicals.</p>
              <p className="mt-1">{PAYMENT_NOTE}</p>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <div className="gold-divider mb-10" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>
            Before You Order
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQS.slice(0, 4).map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border p-4"
                style={{ borderColor: "rgba(198,161,91,0.22)", background: "rgba(255,250,243,0.72)" }}
              >
                <summary className="cursor-pointer text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>
                  {faq.question}
                </summary>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--serena-muted)" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <div className="pb-20">
            <div className="gold-divider mb-12" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8" style={{ color: "var(--serena-deep-burgundy)" }}>
              You Might Also Love
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              {related.map((p) => (
                <JarCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
