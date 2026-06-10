import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SERENA — Custom Jewellery Jars for Your Mood",
  description:
    "Shop premium fashion jewellery jars with 5–10 curated pieces. Customize your SERENA jar by aesthetic, colour, jewellery type, and reference photos.",
  keywords: "jewellery jar, custom jewellery, fashion jewellery, curated jewellery, aesthetic jewellery, SERENA",
  openGraph: {
    title: "SERENA — Custom Jewellery Jars for Your Mood",
    description: "Pick your vibe. Customize your jar. Receive 5–10 jewellery pieces curated just for you.",
    type: "website",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable} h-full`}>
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
              "telephone": "+918130761109",
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
