"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, Plus, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";
import { JarSVG } from "@/components/brand/Logo";
import { createWhatsAppLink, productOrderMessage } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";
import { getDropStatus } from "@/lib/commerce";
import { DELIVERY_WINDOW } from "@/lib/constants";

interface JarCardProps {
  product: Product;
  featured?: boolean;
}

export function JarCard({ product, featured = false }: JarCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;
  const dropStatus = getDropStatus(product);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className={`serena-jar-card ${featured ? "is-featured" : ""}`}>
      <Link href={`/shop/${product.slug}`} className="serena-jar-visual" aria-label={`View ${product.name}`}>
        <div className="serena-jar-badges">
          {product.isLimitedDrop && <span>Limited</span>}
          {dropStatus && <span>{dropStatus}</span>}
          {isLowStock && !isOutOfStock && <span>Only {product.stock} left</span>}
          {isOutOfStock && <span>Sold out</span>}
        </div>
        <JarSVG accentColor={product.accentColor} label={product.emoji} className="serena-card-jar" />
      </Link>

      <div className="serena-jar-body">
        <div className="serena-jar-meta">
          <span>{product.pieceCountMin}-{product.pieceCountMax} pieces</span>
          <span>Ships in {DELIVERY_WINDOW}</span>
        </div>

        <Link href={`/shop/${product.slug}`} className="serena-jar-title">
          {product.name}
        </Link>

        <p>{product.shortDescription}</p>

        <div className="serena-jar-tags">
          {product.moodTags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="serena-jar-price-row">
          <div>
            <span className="serena-jar-price">Rs {product.price}</span>
            {product.compareAtPrice && <span className="serena-jar-compare">Rs {product.compareAtPrice}</span>}
          </div>
          <span>{product.category}</span>
        </div>

        <div className="serena-jar-actions">
          <button type="button" onClick={handleAddToCart} disabled={isOutOfStock}>
            <Plus size={16} aria-hidden="true" />
            {isOutOfStock ? "Sold Out" : added ? "Saved" : "Save"}
          </button>
          <a
            href={createWhatsAppLink(productOrderMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} via WhatsApp`}
          >
            <MessageCircle size={16} aria-hidden="true" />
          </a>
        </div>

        {product.isCustomizable && (
          <a
            href={createWhatsAppLink(`Hi SERENA! I want to customize the ${product.name} jar. Can you help?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="serena-customize-link"
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Customize this vibe
          </a>
        )}
      </div>
    </article>
  );
}
