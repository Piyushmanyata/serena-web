export const metadata = { title: "Privacy Policy | SERENA" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>Privacy Policy</h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
          <p>SERENA collects minimal personal information (name, phone, address) solely for order fulfilment and WhatsApp communication.</p>
          <p>We do not sell, trade, or share your information with third parties except as required for delivery.</p>
          <p>Reference photos uploaded during customization are used only for curation purposes and are not shared publicly.</p>
          <p>For any privacy queries, contact Manyata Sodhani at +91 9875393417.</p>
        </div>
      </div>
    </div>
  );
}
