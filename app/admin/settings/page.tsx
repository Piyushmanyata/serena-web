"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SERENA_CONTACT, SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface Settings {
  ownerName: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  activeDropName: string;
  dropEndDate: string;
  customSlotsTotal: number;
  customSlotsUsed: number;
  shippingFee: number;
  freeShippingThreshold: number;
}

const DEFAULT: Settings = {
  ownerName: SERENA_CONTACT.ownerName,
  phone: SERENA_CONTACT.phone,
  whatsapp: SERENA_CONTACT.phone,
  instagram: SERENA_CONTACT.instagram,
  activeDropName: "",
  dropEndDate: "",
  customSlotsTotal: 20,
  customSlotsUsed: 0,
  shippingFee: SHIPPING_FEE,
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("serena_settings");
    if (raw) setSettings(JSON.parse(raw));
  }, []);

  function update<K extends keyof Settings>(k: K, v: Settings[K]) {
    setSettings((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  }

  function save() {
    localStorage.setItem("serena_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0f0c0a", color: "#f8efe2" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/admin" className="text-xs mb-1 block" style={{ color: "rgba(198,161,91,0.6)" }}>← Admin</Link>
          <h1 className="font-serif text-2xl font-bold">Site Settings</h1>
        </div>

        <div className="flex flex-col gap-6">
          {/* Contact */}
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--serena-gold)" }}>Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { k: "ownerName", label: "Owner Name", type: "text" },
                { k: "phone", label: "Phone", type: "tel" },
                { k: "whatsapp", label: "WhatsApp", type: "tel" },
                { k: "instagram", label: "Instagram Handle", type: "text" },
              ] as const).map((f) => (
                <div key={f.k} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(198,161,91,0.6)" }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={settings[f.k]}
                    onChange={(e) => update(f.k, e.target.value as never)}
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                    style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Drop settings */}
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--serena-gold)" }}>Active Drop</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(198,161,91,0.6)" }}>Drop Name</label>
                <input
                  type="text"
                  value={settings.activeDropName}
                  onChange={(e) => update("activeDropName", e.target.value)}
                  placeholder="e.g. Summer Collection Drop"
                  className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                  style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(198,161,91,0.6)" }}>Drop End Date</label>
                <input
                  type="date"
                  value={settings.dropEndDate}
                  onChange={(e) => update("dropEndDate", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                  style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                />
              </div>
            </div>
          </div>

          {/* Custom slots */}
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--serena-gold)" }}>Custom Jar Slots</h2>
            <div className="grid grid-cols-2 gap-4">
              {([
                { k: "customSlotsTotal", label: "Total Slots" },
                { k: "customSlotsUsed", label: "Slots Used" },
              ] as const).map((f) => (
                <div key={f.k} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(198,161,91,0.6)" }}>{f.label}</label>
                  <input
                    type="number"
                    value={settings[f.k]}
                    onChange={(e) => update(f.k, Number(e.target.value) as never)}
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                    style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: "rgba(248,239,226,0.4)" }}>
              Slots remaining: {Math.max(0, settings.customSlotsTotal - settings.customSlotsUsed)}
            </p>
          </div>

          {/* Shipping */}
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="font-semibold text-sm mb-4" style={{ color: "var(--serena-gold)" }}>Shipping</h2>
            <div className="grid grid-cols-2 gap-4">
              {([
                { k: "shippingFee", label: "Shipping Fee (₹)" },
                { k: "freeShippingThreshold", label: "Free Shipping Above (₹)" },
              ] as const).map((f) => (
                <div key={f.k} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(198,161,91,0.6)" }}>{f.label}</label>
                  <input
                    type="number"
                    value={settings[f.k]}
                    onChange={(e) => update(f.k, Number(e.target.value) as never)}
                    className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                    style={{ background: "rgba(255,250,243,0.05)", borderColor: "rgba(198,161,91,0.3)", color: "#f8efe2" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={save}
            className="py-4 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: saved ? "var(--serena-gold)" : "var(--serena-deep-burgundy)", color: saved ? "#1d1512" : "var(--serena-cream)", border: "1px solid var(--serena-gold)" }}
          >
            {saved ? "✓ Settings Saved" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
