import type { JewelleryType, MetalTone, Vibe } from "@/types";

export const SERENA_CONTACT = {
  ownerName: "Manyata Sodhani",
  phone: "9875393417",
  phoneIntl: "+919875393417",
  whatsapp: "919875393417",
  instagram: "@_serena_.co",
  instagramUrl: "https://www.instagram.com/_serena_.co",
  instagramDM: "https://ig.me/m/_serena_.co",
};

export const SERENA_CO_OWNER = {
  name: "Hridyanshi Agrawal",
  phone: "9569933040",
  phoneIntl: "+919569933040",
  whatsapp: "919569933040",
};

export const WHATSAPP_BASE = "https://wa.me/919875393417";
export const INSTAGRAM_URL = "https://www.instagram.com/_serena_.co";
export const INSTAGRAM_DM = "https://ig.me/m/_serena_.co";
export const SITE_URL = "https://serena-web.vercel.app";

export const JEWELLERY_TYPES: JewelleryType[] = [
  "Necklace / Pendant",
  "Waist Chain",
  "Rings",
  "Earrings",
  "Armlet",
  "Stack Bracelets",
  "Anklets",
];

export const MYSTERY_BONUS_NOTE =
  "If lucky, your jar might also include watches, bag charms, keychains & more surprises!";

export const METAL_TONES: MetalTone[] = [
  "Gold",
  "Silver",
  "Rose Gold",
  "Gunmetal",
  "Mixed",
  "Surprise Me",
];

export const VIBES: Vibe[] = [
  "Coquette / Romance",
  "Grunge / Fairy Core",
  "Clean Girl / Minimalist",
  "Streetwear / Chunky",
  "That '90s Vibe",
  "Midnight / Gothic",
  "Sun & Stars",
  "Ocean Breeze",
  "Surprise Me",
];

export const VIBE_CONFIG: Record<
  string,
  { emoji: string; colors: string[]; desc: string; palette: string }
> = {
  "Coquette / Romance": {
    emoji: "🌸",
    colors: ["#f7c5cc", "#f9e0e5", "#e8c97a", "#fffaf3"],
    desc: "Soft, romantic, feminine",
    palette: "Pearl · Blush · Rose Gold",
  },
  "Grunge / Fairy Core": {
    emoji: "🍄",
    colors: ["#6b5e4e", "#8a7a6a", "#4a4040", "#c9b99a"],
    desc: "Moody, whimsical, earthy",
    palette: "Smoke · Forest · Antique Silver",
  },
  "Clean Girl / Minimalist": {
    emoji: "✨",
    colors: ["#e8c97a", "#ead8b7", "#fffaf3", "#d4c49a"],
    desc: "Polished everyday luxury",
    palette: "Champagne · Gold · Ivory",
  },
  "Streetwear / Chunky": {
    emoji: "⛓️",
    colors: ["#2a2a2a", "#5a5a5a", "#c0c0c0", "#cc2200"],
    desc: "Bold, edgy, statement",
    palette: "Silver · Black · Chrome",
  },
  "That '90s Vibe": {
    emoji: "🌼",
    colors: ["#ff90b3", "#ffde59", "#7ecfcd", "#b7f0ad"],
    desc: "Playful, nostalgic, colourful",
    palette: "Candy Pink · Daisy Yellow · Aqua",
  },
  "Midnight / Gothic": {
    emoji: "🖤",
    colors: ["#1a1a2e", "#16213e", "#0f3460", "#800020"],
    desc: "Dark, dramatic, mysterious",
    palette: "Black · Gunmetal · Deep Red",
  },
  "Sun & Stars": {
    emoji: "🌙",
    colors: ["#1e1b4b", "#312e81", "#c6a15b", "#e8c97a"],
    desc: "Dreamy, cosmic, magical",
    palette: "Gold · Midnight Blue · Pearl",
  },
  "Ocean Breeze": {
    emoji: "🌊",
    colors: ["#0e7490", "#06b6d4", "#a7f3d0", "#f0fdf4"],
    desc: "Beachy, fresh, vacation-ready",
    palette: "Turquoise · Sand · Sea Green",
  },
  "Surprise Me": {
    emoji: "🎁",
    colors: ["#8b1e2d", "#c6a15b", "#f8efe2", "#ead8b7"],
    desc: "A delightful mystery curation",
    palette: "Mixed & Magical",
  },
};

export const COLOUR_MOODS = [
  "Soft Pink",
  "Pearl White",
  "Gold",
  "Black",
  "Ocean Blue",
  "Earthy Green",
  "Red Accent",
  "Pastel Mix",
  "Custom",
];

export const BUDGET_OPTIONS = [399, 599, 799, 999];

export const SHIPPING_FEE = 60;
export const FREE_SHIPPING_THRESHOLD = 599;
export const DELIVERY_WINDOW = "3-6 working days after confirmation";
export const PAYMENT_NOTE =
  "No online payment is collected on the website. We confirm availability on WhatsApp or Instagram, then share payment details.";

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Customize", href: "/customize" },
  { label: "Gift", href: "/gift" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FAQS = [
  {
    question: "How do I place an order?",
    answer:
      "Save jars to your order, then send the pre-filled message on WhatsApp or Instagram. We confirm availability and payment details personally before anything is finalized.",
  },
  {
    question: "When will my SERENA jar arrive?",
    answer: `Most jars ship within ${DELIVERY_WINDOW}. Custom jars can take a little longer if we are matching reference photos or a specific gifting date.`,
  },
  {
    question: "Do I pay online on the website?",
    answer: PAYMENT_NOTE,
  },
  {
    question: "How much is shipping?",
    answer: `Shipping is Rs ${SHIPPING_FEE}. Orders of Rs ${FREE_SHIPPING_THRESHOLD} or more get free shipping.`,
  },
  {
    question: "Can I choose exactly what is inside?",
    answer:
      "SERENA is a mystery jar experience, so exact pieces stay a surprise. You can choose vibe, metal tone, colours, jewellery types, and notes so the curation feels personal.",
  },
  {
    question: "Can I send this as a gift?",
    answer:
      "Yes. Share the recipient's vibe, occasion, and message. We can curate a gift-ready jar for birthdays, festivals, bridesmaids, best friends, or surprise hampers.",
  },
  {
    question: "Can I return a jar?",
    answer:
      "Because every jar is curated and packed as a mystery experience, returns are reviewed case by case. If something arrives damaged, message us immediately with clear photos.",
  },
  {
    question: "Who curates the jars?",
    answer:
      "Manyata Sodhani and Hridyanshi Agrawal personally review requests and curate the jars around your aesthetic, preferences, and budget.",
  },
];
