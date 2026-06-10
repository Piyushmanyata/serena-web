"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SEED_PRODUCTS } from "@/lib/products";

const ADMIN_PASSWORD = "serena2026";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-20" style={{ background: "#0f0c0a", color: "#f8efe2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: "var(--serena-gold)" }}>Admin Dashboard</p>
            <h1 className="font-serif text-2xl font-bold">SERENA Admin</h1>
          </div>
          <nav className="flex gap-4">
            {[
              { href: "/admin", label: "Dashboard" },
              { href: "/admin/products", label: "Products" },
              { href: "/admin/orders", label: "Orders" },
              { href: "/admin/custom-orders", label: "Custom" },
              { href: "/admin/settings", label: "Settings" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:border-[var(--serena-gold)]" style={{ borderColor: "rgba(198,161,91,0.2)", color: "rgba(248,239,226,0.7)" }}>
                {l.label}
              </Link>
            ))}
            <Link href="/" className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(248,239,226,0.5)" }}>← Site</Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [orders, setOrders] = useState<unknown[]>([]);
  const [customOrders, setCustomOrders] = useState<unknown[]>([]);

  useEffect(() => {
    const ok = sessionStorage.getItem("serena_admin") === "true";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate browser-only admin session after mount
    if (ok) setAuthed(true);
    setOrders(JSON.parse(localStorage.getItem("serena_orders") ?? "[]"));
    setCustomOrders(JSON.parse(localStorage.getItem("serena_custom_requests") ?? "[]"));
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem("serena_admin", "true");
      setAuthed(true);
    } else {
      setErr("Incorrect password");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "#0f0c0a" }}>
        <form onSubmit={login} className="glass-dark p-8 rounded-2xl w-full max-w-sm flex flex-col gap-5">
          <h1 className="font-serif text-2xl font-bold" style={{ color: "#f8efe2" }}>Admin Login</h1>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
            style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
          />
          {err && <p className="text-xs text-red-400">{err}</p>}
          <button type="submit" className="py-3 rounded-full font-semibold text-sm" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>
            Login
          </button>
          <p className="text-xs text-center" style={{ color: "rgba(198,161,91,0.4)" }}>Demo password: serena2026</p>
        </form>
      </div>
    );
  }

  const lowStockProducts = SEED_PRODUCTS.filter((p) => p.stock <= p.lowStockThreshold);
  const revenue = (orders as {total?: number}[]).reduce((acc, o) => acc + (o.total ?? 0), 0);

  const stats = [
    { label: "Total Orders", value: (orders as unknown[]).length, icon: "📦", color: "#c6a15b" },
    { label: "Custom Requests", value: (customOrders as unknown[]).length, icon: "🎨", color: "#d9a0a8" },
    { label: "Revenue", value: `₹${revenue}`, icon: "💰", color: "#c6a15b" },
    { label: "Low Stock", value: lowStockProducts.length, icon: "⚠️", color: "#f59e0b" },
    { label: "Total Products", value: SEED_PRODUCTS.length, icon: "🫙", color: "#c6a15b" },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="glass-dark rounded-2xl p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="font-serif text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: "rgba(248,239,226,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick links */}
        <div className="glass-dark rounded-2xl p-6">
          <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--serena-gold)" }}>Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: "/admin/products", label: "Manage Products", icon: "🫙" },
              { href: "/admin/orders", label: "View Orders", icon: "📦" },
              { href: "/admin/custom-orders", label: "Custom Requests", icon: "🎨" },
              { href: "/admin/settings", label: "Site Settings", icon: "⚙️" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 p-3 rounded-xl border transition-all hover:border-[var(--serena-gold)] hover:scale-105" style={{ borderColor: "rgba(198,161,91,0.2)" }}>
                <span>{l.icon}</span>
                <span className="text-xs font-medium" style={{ color: "rgba(248,239,226,0.8)" }}>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Low stock alert */}
        <div className="glass-dark rounded-2xl p-6">
          <h2 className="font-semibold text-sm mb-4" style={{ color: "#f59e0b" }}>Low Stock Alert</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-xs" style={{ color: "rgba(248,239,226,0.5)" }}>All products are well stocked.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-lg" style={{ background: "rgba(245,158,11,0.1)" }}>
                  <span style={{ color: "rgba(248,239,226,0.8)" }}>{p.name}</span>
                  <span style={{ color: "#f59e0b" }}>{p.stock} left</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 glass-dark rounded-2xl p-5">
        <p className="text-xs" style={{ color: "rgba(198,161,91,0.4)" }}>
          Admin hint: Use the nav above to manage products, orders, and custom requests. Password: serena2026
        </p>
      </div>
    </AdminLayout>
  );
}
