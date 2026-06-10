"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "serena_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setMounted(true);
  }, []);

  const save = useCallback((next: CartItem[]) => {
    setItems(next);
    writeCart(next);
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1, customizations?: CartItem["customizations"]) => {
      const existing = items.find(
        (i) => i.productId === product.id && !i.customizations && !customizations
      );
      if (existing) {
        save(
          items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + qty } : i
          )
        );
      } else {
        save([
          ...items,
          {
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            quantity: qty,
            price: product.price,
            emoji: product.emoji,
            customizations,
          },
        ]);
      }
    },
    [items, save]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      save(items.filter((i) => i.productId !== productId));
    },
    [items, save]
  );

  const updateQty = useCallback(
    (productId: string, qty: number) => {
      if (qty < 1) {
        save(items.filter((i) => i.productId !== productId));
      } else {
        save(items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)));
      }
    },
    [items, save]
  );

  const clearCart = useCallback(() => save([]), [save]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return { items, count, subtotal, mounted, addToCart, removeFromCart, updateQty, clearCart };
}
