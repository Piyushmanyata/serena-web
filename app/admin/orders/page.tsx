"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { SERENA_CONTACT } from "@/lib/constants";

interface Order {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: { productName: string; quantity: number; price: number }[];
}

const STATUS_COLORS: Record<string, string> = {
  new: "#f59e0b",
  confirmed: "#3b82f6",
  packed: "#8b5cf6",
  shipped: "#06b6d4",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("serena_orders") ?? "[]"));
  }, []);

  function updateStatus(id: string, status: string) {
    const updated = orders.map((o) => (o.id === id ? { ...o, orderStatus: status } : o));
    setOrders(updated);
    localStorage.setItem("serena_orders", JSON.stringify(updated));
  }

  const filtered = filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0f0c0a", color: "#f8efe2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs mb-1 block" style={{ color: "rgba(198,161,91,0.6)" }}>← Admin</Link>
            <h1 className="font-serif text-2xl font-bold">Orders</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "confirmed", "packed", "shipped", "delivered"].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className="text-xs px-3 py-1.5 rounded-full border capitalize transition-all" style={{ borderColor: filter === s ? "var(--serena-gold)" : "rgba(198,161,91,0.2)", color: filter === s ? "var(--serena-gold)" : "rgba(248,239,226,0.5)" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-dark rounded-2xl p-12 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p style={{ color: "rgba(248,239,226,0.5)" }}>No orders yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((order) => (
              <div key={order.id} className="glass-dark rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs" style={{ color: "var(--serena-gold)" }}>{order.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${STATUS_COLORS[order.orderStatus] ?? "#666"}22`, color: STATUS_COLORS[order.orderStatus] ?? "#666" }}>
                        {order.orderStatus}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(248,239,226,0.4)" }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="font-semibold">{order.name}</p>
                    <p className="text-sm" style={{ color: "rgba(248,239,226,0.6)" }}>{order.phone} · {order.city}, {order.state}</p>
                    <div className="text-xs flex flex-wrap gap-2">
                      {order.items?.map((i, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full" style={{ background: "rgba(198,161,91,0.1)", color: "rgba(198,161,91,0.8)" }}>
                          {i.productName} ×{i.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="font-serif text-xl font-bold" style={{ color: "var(--serena-gold)" }}>₹{order.total}</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-xs px-3 py-1.5 rounded-xl border outline-none"
                      style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                    >
                      {["new", "confirmed", "packed", "shipped", "delivered", "cancelled"].map((s) => <option key={s} value={s} className="bg-[#1a1210] capitalize">{s}</option>)}
                    </select>
                    <div className="flex gap-2">
                      <a
                        href={createWhatsAppLink(`Hi ${order.name}, this is SERENA. Your order ${order.id} status has been updated.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full text-white"
                        style={{ background: "#25D366" }}
                        aria-label={`WhatsApp ${order.name}`}
                      >
                        💬 WA
                      </a>
                      <a
                        href={`tel:+91${order.phone}`}
                        className="text-xs px-3 py-1.5 rounded-full text-white"
                        style={{ background: "var(--serena-burgundy)" }}
                        aria-label={`Call ${order.name}`}
                      >
                        📞
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
