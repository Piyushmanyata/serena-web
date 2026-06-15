import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { SERENA_CONTACT, SERENA_CO_OWNER, INSTAGRAM_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="relative pt-16 pb-12 mt-auto mobile-bottom-bar-padding"
      style={{
        background: "linear-gradient(180deg, #1d1512 0%, #130f0c 100%)",
        color: "var(--serena-champagne)",
        borderTop: "1px solid rgba(198,161,91,0.18)",
        boxShadow: "0 -1px 0 rgba(198,161,91,0.1) inset",
      }}
    >
      <div className="gold-divider mb-12 mx-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Logo size="md" className="text-[#f8efe2]" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(234,216,183,0.7)" }}>
              Mystery jewellery jars curated around your aesthetic, photos, and personal style.
              Not just jewellery — a small treasure ritual.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 transition-colors hover:text-[#c6a15b]"
                style={{ color: "rgba(234,216,183,0.8)" }}
              >
                <Camera size={16} aria-hidden="true" />
                {SERENA_CONTACT.instagram}
              </a>
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 transition-colors hover:text-[#c6a15b]"
                style={{ color: "rgba(234,216,183,0.8)" }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp: {SERENA_CONTACT.phone}
              </a>
            </div>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {[
                { href: "/shop", label: "Shop All Jars" },
                { href: "/customize", label: "Customize a Jar" },
                { href: "/gift", label: "Gift a Jar" },
                { href: "/about", label: "Our Story" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm transition-all hover:text-[#c6a15b] hover:translate-x-1"
                  style={{ color: "rgba(234,216,183,0.75)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Order column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>
              Order Directly
            </h3>
            <p className="text-sm" style={{ color: "rgba(234,216,183,0.7)" }}>
              All orders are handled personally via WhatsApp or Instagram.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium text-white"
                style={{ background: "#25D366" }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp Manyata
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
              >
                <Camera size={16} aria-hidden="true" />
                Instagram @_serena_.co
              </a>
              <a
                href={`https://wa.me/${SERENA_CO_OWNER.whatsapp}?text=${encodeURIComponent("Hi Hridyanshi! I want to order a SERENA jar.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium text-white border border-[rgba(198,161,91,0.3)]"
                style={{ background: "var(--serena-burgundy)" }}
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp Hridyanshi
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(234,216,183,0.5)" }}>
            © 2026 SERENA by Manyata Sodhani &amp; Hridyanshi Agrawal. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms" },
              { href: "/faq", label: "FAQ" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs transition-colors hover:text-[#c6a15b]"
                style={{ color: "rgba(234,216,183,0.5)" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[#c6a15b]"
              style={{ color: "rgba(234,216,183,0.5)" }}
            >
              {SERENA_CONTACT.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
