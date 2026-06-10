import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactButtons } from "@/components/layout/ContactButtons";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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
      </body>
    </html>
  );
}
