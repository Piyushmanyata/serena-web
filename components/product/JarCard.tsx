"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { JarSVG } from "@/components/brand/Logo";
import { createWhatsAppLink, productOrderMessage } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";

interface JarCardProps {
  product: Product;
  featured?: boolean;
}

export function JarCard({ product, featured = false }: JarCardProps) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <article
      className={`jar-card group relative flex flex-col rounded-2xl overflow-hidden ${featured ? "shadow-[0_8px_40px_rgba(198,161,91,0.18)]" : "shadow-[0_4px_20px_rgba(0,0,0,0.08)]"}`}
      style={{ background: "rgba(255,250,243,0.8)", border: "1px solid rgba(198,161,91,0.2)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card glow overlay */}
      <div
        className="card-glow absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 20%, ${product.accentColor}28 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Sparkle dots (appear on hover) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {hovered && [
          { top: "10%", left: "15%", delay: "0s" },
          { top: "20%", right: "12%", delay: "0.3s" },
          { top: "8%", right: "30%", delay: "0.6s" },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute text-xs"
            style={{
              ...pos,
              color: "var(--serena-gold)",
              animation: `twinkleStar 1.2s ${pos.delay} ease-in-out infinite`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isLimitedDrop && (
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ background: "var(--serena-burgundy)" }}>
            Limited Drop
          </span>
        )}
        {isLowStock && !isOutOfStock && (
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full text-white" style={{ background: "#b45309" }}>
            Only {product.stock} left
          </span>
        )}
        {isOutOfStock && (
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-gray-500">
            Sold Out
          </span>
        )}
        {product.compareAtPrice && !isOutOfStock && (
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "var(--serena-gold)", color: "#1d1512" }}>
            Sale
          </span>
        )}
      </div>

      {/* Jar visual */}
      <Link href={`/shop/${product.slug}`} className="block relative pt-6 pb-2 px-8">
        <div className="jar-thumb w-full max-w-[160px] mx-auto">
          <JarSVG
            accentColor={product.accentColor}
            label={product.emoji}
            className="w-full drop-shadow-lg"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Piece count */}
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: "var(--serena-champagne)", color: "var(--serena-deep-burgundy)" }}
          >
            {product.pieceCountMin}–{product.pieceCountMax} mystery pieces
          </span>
        </div>

        <Link href={`/shop/${product.slug}`} className="group/title">
          <h3
            className="font-serif font-semibold text-lg leading-tight group-hover/title:text-[#8b1e2d] transition-colors"
            style={{ color: "var(--serena-ink)" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--serena-muted)" }}>
          {product.shortDescription}
        </p>

        {/* Mood tags */}
        <div className="flex flex-wrap gap-1">
          {product.moodTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border transition-colors hover:border-[rgba(198,161,91,0.6)]"
              style={{ borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Includes */}
        {product.includedTypes.length > 0 && (
          <p className="text-[11px]" style={{ color: "var(--serena-muted)" }}>
            <span style={{ color: "var(--serena-gold)" }}>Includes</span>{" "}
            {product.includedTypes.slice(0, 3).join(", ")}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="font-serif text-xl font-bold" style={{ color: "var(--serena-deep-burgundy)" }}>
            ₹{product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm line-through" style={{ color: "var(--serena-muted)" }}>
              ₹{product.compareAtPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 text-xs py-2.5 rounded-full font-medium transition-all duration-300 btn-shimmer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: added ? "var(--serena-gold)" : "var(--serena-deep-burgundy)",
              color: "var(--serena-cream)",
              border: "1px solid var(--serena-gold)",
              animation: added ? "jellyBounce 0.4s ease" : "",
            }}
          >
            {isOutOfStock ? "Sold Out" : added ? "✓ Added to Jar!" : "Add to Jar"}
          </button>
          <a
            href={createWhatsAppLink(productOrderMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} via WhatsApp`}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-all hover:scale-115 active:scale-95"
            style={{ background: "#25D366" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>

        {/* Customize link */}
        {product.isCustomizable && (
          <a
            href={createWhatsAppLink(`Hi SERENA! I want to customize the ${product.name} jar. Can you help?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-center transition-colors hover:text-[#8b1e2d]"
            style={{ color: "var(--serena-gold)" }}
          >
            ✦ Customize this vibe via WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
