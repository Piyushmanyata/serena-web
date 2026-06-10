"use client";

import { useState } from "react";
import Link from "next/link";
import { SEED_PRODUCTS } from "@/lib/products";
import { JarSVG } from "@/components/brand/Logo";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});

  function startEdit(p: Product) {
    setEditing(p.id);
    setEditData({ ...p });
  }

  function saveEdit(id: string) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...editData } : p)));
    setEditing(null);
    setEditData({});
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0f0c0a", color: "#f8efe2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs mb-1 block" style={{ color: "rgba(198,161,91,0.6)" }}>← Admin</Link>
            <h1 className="font-serif text-2xl font-bold">Products</h1>
          </div>
          <p className="text-xs" style={{ color: "rgba(198,161,91,0.5)" }}>{products.length} jars</p>
        </div>

        <div className="flex flex-col gap-3">
          {products.map((p) => (
            <div key={p.id} className="glass-dark rounded-2xl p-4">
              {editing === p.id ? (
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(["name", "price", "compareAtPrice", "stock"] as const).map((k) => (
                      <div key={k}>
                        <label className="text-xs mb-1 block capitalize" style={{ color: "rgba(198,161,91,0.6)" }}>{k}</label>
                        <input
                          type={["price", "compareAtPrice", "stock"].includes(k) ? "number" : "text"}
                          value={(editData[k] as string | number | undefined) ?? ""}
                          onChange={(e) => setEditData((prev) => ({ ...prev, [k]: ["price", "compareAtPrice", "stock"].includes(k) ? Number(e.target.value) : e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border text-xs outline-none"
                          style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "rgba(248,239,226,0.7)" }}>
                      <input type="checkbox" checked={editData.isLimitedDrop ?? false} onChange={(e) => setEditData((prev) => ({ ...prev, isLimitedDrop: e.target.checked }))} className="accent-[#c6a15b]" />
                      Limited Drop
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(p.id)} className="text-xs px-4 py-2 rounded-full font-semibold" style={{ background: "var(--serena-deep-burgundy)", color: "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}>Save</button>
                    <button onClick={() => setEditing(null)} className="text-xs px-4 py-2 rounded-full border" style={{ borderColor: "rgba(198,161,91,0.2)", color: "rgba(248,239,226,0.6)" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0">
                    <JarSVG accentColor={p.accentColor} label={p.emoji} className="w-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm">{p.name}</p>
                      {p.isLimitedDrop && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(139,30,45,0.3)", color: "#e8c97a" }}>Limited</span>}
                    </div>
                    <p className="text-xs" style={{ color: "rgba(248,239,226,0.5)" }}>{p.category} · Stock: {p.stock}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-serif font-bold" style={{ color: "var(--serena-gold)" }}>₹{p.price}</p>
                    {p.compareAtPrice && <p className="text-xs line-through" style={{ color: "rgba(248,239,226,0.3)" }}>₹{p.compareAtPrice}</p>}
                  </div>
                  <button onClick={() => startEdit(p)} className="text-xs px-3 py-1.5 rounded-full border transition-all hover:border-[var(--serena-gold)]" style={{ borderColor: "rgba(198,161,91,0.2)", color: "rgba(248,239,226,0.6)" }}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
