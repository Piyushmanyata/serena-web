import type { Product } from "@/types";

export function formatPrice(value: number): string {
  return `₹${value}`;
}

export function formatDropDeadline(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function getDropStatus(product: Product): string | null {
  const deadline = formatDropDeadline(product.dropEndsAt);
  if (!deadline) return null;
  return `Closes ${deadline}`;
}

export function productMatchesVibe(product: Product, vibe: string): boolean {
  const normalized = `${product.name} ${product.category} ${product.shortDescription} ${product.description} ${product.moodTags.join(" ")}`.toLowerCase();
  const words = vibe
    .replace(/[/'’]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 2 && word !== "the" && word !== "and");

  if (vibe === "Surprise Me") return true;
  return words.some((word) => normalized.includes(word));
}
