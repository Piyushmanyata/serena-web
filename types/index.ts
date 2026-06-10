export type JewelleryType =
  | "Necklace / Pendant"
  | "Waist Chain"
  | "Rings"
  | "Earrings"
  | "Armlet"
  | "Stack Bracelets"
  | "Watches"
  | "Anklets";

export type MetalTone = "Gold" | "Silver" | "Rose Gold" | "Gunmetal" | "Mixed" | "Surprise Me";

export type Vibe =
  | "Coquette / Romance"
  | "Grunge / Fairy Core"
  | "Clean Girl / Minimalist"
  | "Streetwear / Chunky"
  | "That '90s Vibe"
  | "Midnight / Gothic"
  | "Sun & Stars"
  | "Ocean Breeze"
  | "Surprise Me";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  pieceCountMin: number;
  pieceCountMax: number;
  moodTags: string[];
  colourPalette: string[];
  metalTones: MetalTone[];
  includedTypes: JewelleryType[];
  images: string[];
  emoji: string;
  accentColor: string;
  stock: number;
  lowStockThreshold: number;
  isLimitedDrop: boolean;
  dropEndsAt?: string;
  isCustomizable: boolean;
  featuredRank?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  slug: string;
  quantity: number;
  price: number;
  emoji: string;
  customizations?: {
    vibe?: string;
    jewelleryTypes?: string[];
    metalTone?: string;
    colourPalette?: string;
    notes?: string;
  };
}

export interface CustomJarRequest {
  customerName: string;
  phone: string;
  email?: string;
  whatsapp: string;
  selectedVibe: string;
  selectedJewelleryTypes: JewelleryType[];
  metalTone: MetalTone | "";
  colourPalette: string;
  budget: number;
  notes: string;
  status?: string;
  createdAt?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "razorpay" | "cod" | "whatsapp";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "new" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
