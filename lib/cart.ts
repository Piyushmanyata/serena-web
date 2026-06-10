"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { CartItem, Product } from "@/types";

const CART_KEY = "serena_cart";
const CART_STORAGE_EVENT = "serena:cart-updated";
const cartListeners = new Set<() => void>();
const noopSubscribe = () => () => {};

let cachedCart: CartItem[] | null = null;
let lastRawCart: string | null = null;

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw === lastRawCart && cachedCart !== null) {
      return cachedCart;
    }
    lastRawCart = raw;
    cachedCart = raw ? JSON.parse(raw) : [];
    return cachedCart!;
  } catch {
    cachedCart = [];
    return cachedCart;
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(items);
  localStorage.setItem(CART_KEY, raw);
  lastRawCart = raw;
  cachedCart = items;
}

function emitCartChange() {
  cartListeners.forEach((listener) => listener());
}

function subscribeCart(listener: () => void) {
  cartListeners.add(listener);

  if (typeof window !== "undefined") {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_KEY) listener();
    };
    const handleCustomEvent = () => listener();

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CART_STORAGE_EVENT, handleCustomEvent);

    return () => {
      cartListeners.delete(listener);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CART_STORAGE_EVENT, handleCustomEvent);
    };
  }

  return () => {
    cartListeners.delete(listener);
  };
}

function sameCustomizations(
  a: CartItem["customizations"],
  b: CartItem["customizations"]
) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

function useMountedFlag() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useCart() {
  const items = useSyncExternalStore(subscribeCart, readCart, () => []);
  const mounted = useMountedFlag();

  const save = useCallback((updater: (current: CartItem[]) => CartItem[]) => {
    const current = readCart();
    const next = updater(current);
    writeCart(next);
    emitCartChange();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(CART_STORAGE_EVENT));
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, qty = 1, customizations?: CartItem["customizations"]) => {
      save((current) => {
        const existing = current.find(
          (item) =>
            item.productId === product.id &&
            sameCustomizations(item.customizations, customizations)
        );

        if (existing) {
          return current.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + qty } : item
          );
        }

        return [
          ...current,
          {
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            quantity: qty,
            price: product.price,
            emoji: product.emoji,
            customizations,
          },
        ];
      });
    },
    [save]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      save((current) => current.filter((item) => item.productId !== productId));
    },
    [save]
  );

  const updateQty = useCallback(
    (productId: string, qty: number) => {
      if (qty < 1) {
        save((current) => current.filter((item) => item.productId !== productId));
        return;
      }
      save((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity: qty } : item
        )
      );
    },
    [save]
  );

  const clearCart = useCallback(() => save(() => []), [save]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return { items, count, subtotal, mounted, addToCart, removeFromCart, updateQty, clearCart };
}
