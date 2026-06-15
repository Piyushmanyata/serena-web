import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactButtons } from "@/components/layout/ContactButtons";
import { BackToTop } from "@/components/ui/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serena-web-sand.vercel.app"),
  title: "SERENA — Mystery Jewellery Jars Curated for Your Vibe",
  description:
    "Mystery jewellery jars with 5–10 curated pieces styled around your aesthetic. Coquette, Celestial, Gothic, Minimalist & more. Order via WhatsApp or Instagram.",
  openGraph: {
    title: "SERENA — Mystery Jewellery Jars Curated for Your Vibe",
    description: "Pick your vibe. Receive 5–10 mystery jewellery pieces curated just for you. Order via WhatsApp or Instagram.",
    type: "website",
    url: "https://serena-web-sand.vercel.app",
    siteName: "SERENA",
  },
  twitter: {
    card: "summary_large_image",
    title: "SERENA — Mystery Jewellery Jars",
    description: "5–10 curated mystery pieces styled around your aesthetic. Order via WhatsApp.",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b1e2d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              "name": "SERENA",
              "description": "Shop premium fashion jewellery jars with 5–10 curated pieces. Customize your SERENA jar by aesthetic, colour, jewellery type, and reference photos.",
              "url": "https://serenacurates.com",
              "telephone": "+919875393417",
              "priceRange": "₹399 - ₹1199",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "founders": [
                {
                  "@type": "Person",
                  "name": "Manyata Sharma"
                },
                {
                  "@type": "Person",
                  "name": "Hridyanshi"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ background: "var(--serena-pearl)", color: "var(--serena-ink)" }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactButtons />
        <BackToTop />
      </body>
    </html>
  );
}
