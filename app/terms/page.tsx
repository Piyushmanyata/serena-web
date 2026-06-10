export const metadata = { title: "Terms | SERENA" };

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--serena-deep-burgundy)" }}>Terms & Conditions</h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--serena-muted)" }}>
          <p>All jars include premium fashion jewellery. Exact pieces may vary based on availability and customization preferences.</p>
          <p>Keep pieces away from water, perfume, sweat, and harsh chemicals. Store pieces dry to preserve finish.</p>
          <p>Reference photos guide the curation, but exact matching depends on available stock and selected budget.</p>
          <p>Orders confirmed via WhatsApp are binding. Cancellations must be requested within 24 hours of confirmation.</p>
          <p>For any queries, contact Manyata Sodhani at +91 9875393417.</p>
        </div>
      </div>
    </div>
  );
}
