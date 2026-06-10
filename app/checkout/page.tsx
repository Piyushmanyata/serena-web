"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface CheckoutForm {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  payment: "razorpay" | "cod" | "whatsapp";
}

const INDIAN_STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, mounted } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    name: "", phone: "", whatsapp: "", email: "", address: "", city: "", state: "", pincode: "", notes: "", payment: "whatsapp",
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [loading, setLoading] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  function set<K extends keyof CheckoutForm>(k: K, v: CheckoutForm[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<CheckoutForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "Select a state";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Save order to localStorage
    const order = {
      id: `SERENA-${Date.now()}`,
      ...form,
      items,
      subtotal,
      shipping,
      total,
      paymentStatus: form.payment === "whatsapp" ? "pending" : "pending",
      orderStatus: "new",
      createdAt: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("serena_orders") ?? "[]");
    orders.push(order);
    localStorage.setItem("serena_orders", JSON.stringify(orders));
    localStorage.setItem("serena_last_order", JSON.stringify(order));

    clearCart();
    setTimeout(() => router.push("/orders/success"), 800);
  }

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--serena-pearl)" }}>
        <div className="text-center">
          <p className="text-2xl mb-4">🫙</p>
          <p className="font-serif text-xl mb-4" style={{ color: "var(--serena-deep-burgundy)" }}>Your cart is empty</p>
          <Link href="/shop" className="underline" style={{ color: "var(--serena-gold)" }}>Shop jars</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl font-bold mb-8" style={{ color: "var(--serena-deep-burgundy)" }}>Checkout</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact */}
              <div className="glass-card p-6">
                <h2 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--serena-gold)" }}>Contact Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.name}>
                    <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass(!!errors.name)} required />
                  </Field>
                  <Field label="Phone *" error={errors.phone}>
                    <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={10} className={inputClass(!!errors.phone)} required />
                  </Field>
                  <Field label="WhatsApp Number">
                    <input type="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="Same as phone?" className={inputClass(false)} />
                  </Field>
                  <Field label="Email (optional)">
                    <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass(false)} />
                  </Field>
                </div>
              </div>

              {/* Address */}
              <div className="glass-card p-6">
                <h2 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--serena-gold)" }}>Shipping Address</h2>
                <div className="flex flex-col gap-4">
                  <Field label="Full Address *" error={errors.address}>
                    <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass(!!errors.address)} required />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field label="City *" error={errors.city}>
                      <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputClass(!!errors.city)} required />
                    </Field>
                    <Field label="State *" error={errors.state}>
                      <select value={form.state} onChange={(e) => set("state", e.target.value)} className={inputClass(!!errors.state)} required>
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Pincode *" error={errors.pincode}>
                      <input type="text" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} maxLength={6} className={inputClass(!!errors.pincode)} required />
                    </Field>
                  </div>
                  <Field label="Order Notes (optional)">
                    <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className={inputClass(false) + " resize-none"} />
                  </Field>
                </div>
              </div>

              {/* Payment */}
              <div className="glass-card p-6">
                <h2 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--serena-gold)" }}>Payment Method</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { val: "whatsapp", label: "💬 Confirm & Pay via WhatsApp", desc: "Manyata will share payment link on WhatsApp after order confirmation." },
                    { val: "cod", label: "💵 Cash on Delivery", desc: "Pay when your jar arrives. (Available in select areas)" },
                    { val: "razorpay", label: "💳 Pay Online (Razorpay)", desc: "UPI, cards, netbanking. (Coming soon)" },
                  ].map((p) => (
                    <label key={p.val} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${form.payment === p.val ? "shadow-[0_2px_12px_rgba(198,161,91,0.2)]" : "hover:border-[rgba(198,161,91,0.4)]"}`} style={{ borderColor: form.payment === p.val ? "var(--serena-gold)" : "rgba(198,161,91,0.2)", background: form.payment === p.val ? "rgba(255,250,243,0.7)" : "transparent" }}>
                      <input type="radio" name="payment" value={p.val} checked={form.payment === p.val as "razorpay" | "cod" | "whatsapp"} onChange={() => set("payment", p.val as "razorpay" | "cod" | "whatsapp")} className="mt-1 accent-[#8b1e2d]" />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--serena-ink)" }}>{p.label}</p>
                        <p className="text-xs" style={{ color: "var(--serena-muted)" }}>{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <h2 className="font-serif text-lg font-bold mb-5" style={{ color: "var(--serena-deep-burgundy)" }}>Order Summary</h2>
                <div className="flex flex-col gap-2 mb-5">
                  {items.map((i) => (
                    <div key={i.productId} className="flex justify-between text-xs">
                      <span className="flex-1 truncate" style={{ color: "var(--serena-muted)" }}>{i.productName} ×{i.quantity}</span>
                      <span style={{ color: "var(--serena-ink)" }}>₹{i.price * i.quantity}</span>
                    </div>
                  ))}
                  <div className="gold-divider my-2" />
                  <div className="flex justify-between text-sm"><span style={{ color: "var(--serena-muted)" }}>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between text-sm"><span style={{ color: "var(--serena-muted)" }}>Shipping</span><span style={{ color: shipping === 0 ? "#22c55e" : undefined }}>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                  <div className="gold-divider my-2" />
                  <div className="flex justify-between font-bold"><span style={{ color: "var(--serena-ink)" }}>Total</span><span className="font-serif text-xl" style={{ color: "var(--serena-deep-burgundy)" }}>₹{total}</span></div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full font-semibold text-sm btn-shimmer disabled:opacity-70 transition-all hover:-translate-y-0.5"
                  style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>

                <p className="text-xs text-center mt-3" style={{ color: "var(--serena-muted)" }}>
                  By placing an order you agree to our terms.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-[var(--serena-gold)] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.15)] ${hasError ? "border-red-400" : ""}`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--serena-gold)" }}>{label}</label>
      <div style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" } as React.CSSProperties}>
        {children}
      </div>
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  );
}
