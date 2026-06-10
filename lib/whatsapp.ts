import type { CartItem, CustomJarRequest } from "@/types";
import { WHATSAPP_BASE } from "./constants";

export function createWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function cartOrderMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (i, idx) => `${idx + 1}. ${i.productName} x${i.quantity} — ₹${i.price * i.quantity}`
  );
  return (
    `Hi SERENA, I want to order these jars:\n\n${lines.join("\n")}\n\n` +
    `Total: ₹${total}\n\nPlease confirm availability and payment details.`
  );
}

export function productOrderMessage(productName: string): string {
  return `Hi SERENA, I want to order the ${productName} jar. Please share details.`;
}

export function customJarMessage(req: CustomJarRequest): string {
  return (
    `Hi SERENA, I want a custom jewellery jar.\n\n` +
    `Name: ${req.customerName}\n` +
    `Vibe: ${req.selectedVibe}\n` +
    `Jewellery Types: ${req.selectedJewelleryTypes.join(", ")}\n` +
    `Metal Tone: ${req.metalTone}\n` +
    `Colour Mood: ${req.colourPalette}\n` +
    `Budget: ₹${req.budget}\n` +
    `Notes: ${req.notes || "–"}\n\n` +
    `I have submitted my request on the website.`
  );
}

export function generalMessage(): string {
  return "Hi SERENA, I want to customize a jewellery jar.";
}
