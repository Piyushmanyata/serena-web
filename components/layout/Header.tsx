"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/lib/cart";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { NAV_LINKS, SERENA_CONTACT } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-[rgba(255,250,243,0.92)] backdrop-blur-xl shadow-[0_4px_24px_rgba(198,161,91,0.15)] border-b border-[rgba(198,161,91,0.2)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo size="sm" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "text-sm font-medium tracking-wider uppercase transition-colors duration-200",
                    pathname === link.href
                      ? "text-[#8b1e2d]"
                      : "text-[#7b6a62] hover:text-[#52111c]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right icons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact SERENA on WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "#25D366" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href={`tel:${SERENA_CONTACT.phoneIntl}`}
                aria-label="Call SERENA"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                style={{ background: "var(--serena-burgundy)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
              <Link
                href="/cart"
                aria-label={`Cart — ${count} items`}
                className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "var(--serena-champagne)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52111c" strokeWidth="2" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: "var(--serena-burgundy)" }}>
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/cart"
                aria-label={`Cart — ${count} items`}
                className="relative w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--serena-champagne)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#52111c" strokeWidth="2" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: "var(--serena-burgundy)" }}>
                    {count}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all"
                style={{ background: "var(--serena-champagne)" }}
              >
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col pt-20 px-6 pb-32"
          style={{ background: "rgba(29,21,18,0.97)" }}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {["💍", "🪙", "✨", "💫", "🔮", "🌸"].map((e, i) => (
              <span
                key={i}
                className="absolute text-2xl opacity-20 float-slow"
                style={{
                  left: `${10 + i * 16}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.7}s`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          <nav className="relative flex flex-col gap-8 mt-8" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-serif font-bold text-[#f8efe2] hover:text-[#c6a15b] transition-colors duration-200"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative mt-auto flex flex-col gap-3 pb-4">
            <a
              href={createWhatsAppLink(generalMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-full text-white font-medium"
              style={{ background: "#25D366" }}
            >
              WhatsApp SERENA
            </a>
            <a
              href={`tel:${SERENA_CONTACT.phoneIntl}`}
              className="flex items-center justify-center gap-3 py-4 rounded-full text-white font-medium border border-[rgba(198,161,91,0.3)]"
              style={{ background: "var(--serena-burgundy)" }}
            >
              Call Manyata
            </a>
          </div>
        </div>
      )}
    </>
  );
}
