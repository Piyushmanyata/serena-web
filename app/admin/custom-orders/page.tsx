"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createWhatsAppLink, customJarMessage } from "@/lib/whatsapp";
import type { CustomJarRequest } from "@/types";

interface StoredRequest extends CustomJarRequest {
  status: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "#f59e0b",
  reviewing: "#3b82f6",
  confirmed: "#8b5cf6",
  curating: "#06b6d4",
  packed: "#10b981",
  shipped: "#22c55e",
  completed: "#16a34a",
  cancelled: "#ef4444",
};

export default function AdminCustomOrdersPage() {
  const [requests, setRequests] = useState<StoredRequest[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate browser-only admin data after mount
    setRequests(JSON.parse(localStorage.getItem("serena_custom_requests") ?? "[]"));
  }, []);

  function updateStatus(idx: number, status: string) {
    const updated = requests.map((r, i) => (i === idx ? { ...r, status } : r));
    setRequests(updated);
    localStorage.setItem("serena_custom_requests", JSON.stringify(updated));
  }

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0f0c0a", color: "#f8efe2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin" className="text-xs mb-1 block" style={{ color: "rgba(198,161,91,0.6)" }}>← Admin</Link>
            <h1 className="font-serif text-2xl font-bold">Custom Jar Requests</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "new", "reviewing", "confirmed", "curating", "packed", "shipped"].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className="text-xs px-3 py-1.5 rounded-full border capitalize transition-all" style={{ borderColor: filter === s ? "var(--serena-gold)" : "rgba(198,161,91,0.2)", color: filter === s ? "var(--serena-gold)" : "rgba(248,239,226,0.5)" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-dark rounded-2xl p-12 text-center">
            <p className="text-4xl mb-3">🎨</p>
            <p style={{ color: "rgba(248,239,226,0.5)" }}>No custom requests yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((req, idx) => (
              <div key={idx} className="glass-dark rounded-2xl p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: `${STATUS_COLORS[req.status] ?? "#666"}22`, color: STATUS_COLORS[req.status] ?? "#666" }}>
                        {req.status}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(248,239,226,0.4)" }}>{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="font-semibold">{req.customerName}</p>
                    <p className="text-sm" style={{ color: "rgba(248,239,226,0.6)" }}>{req.phone}</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs mt-1">
                      {[
                        ["Vibe", req.selectedVibe],
                        ["Types", req.selectedJewelleryTypes.join(", ")],
                        ["Metal", req.metalTone],
                        ["Colour", req.colourPalette],
                        ["Budget", `₹${req.budget}`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <span className="font-semibold" style={{ color: "rgba(198,161,91,0.6)" }}>{k}:</span>
                          <span style={{ color: "rgba(248,239,226,0.7)" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    {req.notes && (
                      <p className="text-xs p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(248,239,226,0.6)" }}>
                        Notes: {req.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <select
                      value={req.status}
                      onChange={(e) => updateStatus(idx, e.target.value)}
                      className="text-xs px-3 py-1.5 rounded-xl border outline-none"
                      style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                    >
                      {["new", "reviewing", "confirmed", "curating", "packed", "shipped", "completed", "cancelled"].map((s) => (
                        <option key={s} value={s} className="bg-[#1a1210] capitalize">{s}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <a
                        href={createWhatsAppLink(customJarMessage(req))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full text-white"
                        style={{ background: "#25D366" }}
                      >
                        💬 WA Summary
                      </a>
                      <a
                        href={`tel:+91${req.phone}`}
                        className="text-xs px-3 py-1.5 rounded-full text-white"
                        style={{ background: "var(--serena-burgundy)" }}
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
