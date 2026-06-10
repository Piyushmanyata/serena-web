import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import { SERENA_CONTACT } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="relative pt-16 pb-24 md:pb-16 mt-auto"
      style={{ background: "var(--serena-ink)", color: "var(--serena-champagne)" }}
    >
      {/* Gold top border */}
      <div className="gold-divider mb-12 mx-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Logo size="md" className="text-[#f8efe2]" />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(234,216,183,0.7)" }}>
              Premium jewellery jars curated around your aesthetic, photos, and personal style.
              Not just jewellery — a small treasure ritual.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={`tel:${SERENA_CONTACT.phoneIntl}`}
                aria-label="Call SERENA owner Manyata Sodhani"
                className="text-sm flex items-center gap-2 transition-colors hover:text-[#c6a15b]"
                style={{ color: "rgba(234,216,183,0.8)" }}
              >
                📞 {SERENA_CONTACT.phone}
              </a>
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 transition-colors hover:text-[#c6a15b]"
                style={{ color: "rgba(234,216,183,0.8)" }}
              >
                💬 WhatsApp: {SERENA_CONTACT.phone}
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
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm transition-colors hover:text-[#c6a15b]"
                  style={{ color: "rgba(234,216,183,0.75)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--serena-gold)" }}>
              Order Directly
            </h3>
            <p className="text-sm" style={{ color: "rgba(234,216,183,0.7)" }}>
              Many customers order directly with Manyata via WhatsApp.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={createWhatsAppLink(generalMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: "#25D366" }}
              >
                💬 WhatsApp Manyata
              </a>
              <a
                href={`tel:${SERENA_CONTACT.phoneIntl}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium text-white transition-all hover:scale-105 border border-[rgba(198,161,91,0.3)]"
                style={{ background: "var(--serena-burgundy)" }}
              >
                📞 Call Manyata
              </a>
              <Link
                href="/customize"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium transition-all hover:scale-105 border border-[rgba(198,161,91,0.4)] text-[#c6a15b]"
              >
                ✦ Customize via WhatsApp
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="gold-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(234,216,183,0.5)" }}>
            © {new Date().getFullYear()} SERENA by Manyata Sodhani. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms" },
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
            <span className="text-xs" style={{ color: "rgba(234,216,183,0.5)" }}>
              {SERENA_CONTACT.instagram}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
