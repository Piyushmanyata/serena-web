"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/lib/cart";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { NAV_LINKS, SERENA_CONTACT, INSTAGRAM_URL } from "@/lib/constants";

// Mini filling jar for the cart icon
function CartJarIcon({ count, idPrefix = "desktop" }: { count: number; idPrefix?: string }) {
  const fillFraction = Math.min(count / 8, 1);
  const jarBodyHeight = 182;
  const jarBodyTop = 78;
  const fillTranslateY = jarBodyHeight * (1 - fillFraction);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 200 280"
        aria-hidden="true"
        style={{ width: "22px", height: "30px" }}
      >
        <defs>
          <clipPath id={`${idPrefix}-jar-clip`}>
            <path d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z" />
          </clipPath>
        </defs>
        {/* Cork */}
        <rect x="50" y="22" width="100" height="8" rx="4" fill="#b8935a" />
        <rect x="45" y="28" width="110" height="36" rx="10" fill="#c6a15b" />
        {/* Rim */}
        <rect x="18" y="62" width="164" height="16" rx="5" fill="#c6a15b" />
        {/* Jar outline */}
        <path
          d="M22 78 L18 240 Q18 260 38 260 L162 260 Q182 260 182 240 L178 78 Z"
          fill="rgba(255,255,255,0.15)"
          stroke="#c6a15b"
          strokeWidth="2"
        />
        {/* Animated fill */}
        {fillFraction > 0 && (
          <rect
            x="19"
            y={jarBodyTop}
            width="162"
            height={jarBodyHeight}
            fill="rgba(139,30,45,0.45)"
            clipPath={`url(#${idPrefix}-jar-clip)`}
            style={{
              transform: `translateY(${fillTranslateY}px)`,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        )}
        {/* Glass reflection */}
        <path d="M36 90 L32 230 L50 230 L54 90 Z" fill="rgba(255,255,255,0.12)" clipPath={`url(#${idPrefix}-jar-clip)`} />
      </svg>

      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
          style={{
            width: "16px",
            height: "16px",
            background: "var(--serena-burgundy)",
            animation: "bounceIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu immediately after route changes
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-[rgba(255,250,243,0.94)] backdrop-blur-xl shadow-[0_4px_24px_rgba(198,161,91,0.15)] border-b border-[rgba(198,161,91,0.2)]"
            : "bg-transparent backdrop-blur-none border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo size="sm" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "group relative py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300",
                      isActive
                        ? "text-[#8b1e2d]"
                        : "text-[#7b6a62] hover:text-[#52111c]",
                    ].join(" ")}
                  >
                    <span>{link.label}</span>
                    <span
                      className={[
                        "absolute bottom-0 left-0 w-full h-[2px] bg-[#8b1e2d] transition-transform duration-300 origin-left",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      ].join(" ")}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop right icons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SERENA on Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 text-white"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* WhatsApp */}
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

              {/* Cart — filling jar icon */}
              <Link
                href="/cart"
                aria-label={`Cart — ${count} items`}
                className="relative flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                style={{ width: "36px", height: "36px", background: "var(--serena-champagne)" }}
              >
                <CartJarIcon count={count} idPrefix="desktop" />
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex md:hidden items-center gap-3">
              <Link
                href="/cart"
                aria-label={`Cart — ${count} items`}
                className="relative flex items-center justify-center rounded-full"
                style={{ width: "36px", height: "36px", background: "var(--serena-champagne)" }}
              >
                <CartJarIcon count={count} idPrefix="mobile" />
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="w-9 h-9 rounded-full flex flex-col items-center justify-center gap-[4px] transition-all"
                style={{ background: "var(--serena-champagne)" }}
              >
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
                <span className={`block w-4 h-0.5 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} style={{ background: "var(--serena-deep-burgundy)" }} />
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
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {["💍","🪙","✨","💫","🔮","🌸","💎","🌙"].map((e, i) => (
              <span
                key={i}
                className="absolute text-2xl opacity-20 float-around"
                style={{ left: `${8 + i * 12}%`, top: `${15 + (i % 3) * 25}%`, animationDelay: `${i * 0.6}s` }}
              >
                {e}
              </span>
            ))}
          </div>

          <nav className="relative flex flex-col gap-7 mt-8" aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-serif font-bold text-[#f8efe2] hover:text-[#c6a15b] transition-all duration-200 hover:translate-x-2"
                style={{ animation: `slideInBottom 0.4s ${i * 0.08}s ease forwards`, opacity: 0 }}
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
              className="flex items-center justify-center gap-3 py-4 rounded-full text-white font-medium transition-all hover:scale-[1.02]"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp SERENA
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-4 rounded-full text-white font-medium transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
            >
              📸 Instagram @_serena_.co
            </a>
            <a
              href={`tel:${SERENA_CONTACT.phoneIntl}`}
              className="flex items-center justify-center gap-3 py-4 rounded-full text-white font-medium border border-[rgba(198,161,91,0.3)] transition-all hover:scale-[1.02]"
              style={{ background: "var(--serena-burgundy)" }}
            >
              📞 Call Manyata
            </a>
          </div>
        </div>
      )}
    </>
  );
}
