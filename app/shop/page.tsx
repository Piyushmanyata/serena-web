"use client";

import { useState, useMemo } from "react";
import { JarCard } from "@/components/product/JarCard";
import { SEED_PRODUCTS } from "@/lib/products";
import { DELIVERY_WINDOW, FREE_SHIPPING_THRESHOLD, JEWELLERY_TYPES, PAYMENT_NOTE, SHIPPING_FEE, VIBES } from "@/lib/constants";
import { productMatchesVibe } from "@/lib/commerce";
import type { Product } from "@/types";

const SHOP_VIBES = VIBES.filter((vibe) => vibe !== "Surprise Me");
const METALS = ["Gold", "Silver", "Rose Gold", "Gunmetal", "Mixed"];
const PRICE_RANGES = [
  { label: "Under ₹399", min: 0, max: 399 },
  { label: "₹399–₹599", min: 399, max: 599 },
  { label: "₹599–₹999", min: 599, max: 999 },
  { label: "₹999+", min: 999, max: Infinity },
];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

function filterProducts(
  products: Product[],
  search: string,
  selectedVibes: string[],
  selectedTypes: string[],
  selectedMetals: string[],
  selectedPrice: number | null,
  sort: string
): Product[] {
  let result = [...products];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.moodTags.some((t) => t.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }

  if (selectedVibes.length) {
    result = result.filter((p) =>
      selectedVibes.some((v) => productMatchesVibe(p, v))
    );
  }

  if (selectedTypes.length) {
    result = result.filter((p) =>
      selectedTypes.some((t) => p.includedTypes.includes(t as never))
    );
  }

  if (selectedMetals.length) {
    result = result.filter((p) =>
      selectedMetals.some((m) => p.metalTones.includes(m as never))
    );
  }

  if (selectedPrice !== null) {
    const range = PRICE_RANGES[selectedPrice];
    if (range) result = result.filter((p) => p.price >= range.min && p.price < range.max);
  }

  switch (sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      result.sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
  }

  return result;
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => filterProducts(SEED_PRODUCTS, search, selectedVibes, selectedTypes, selectedMetals, selectedPrice, sort),
    [search, selectedVibes, selectedTypes, selectedMetals, selectedPrice, sort]
  );

  function toggle(arr: string[], val: string, set: (v: string[]) => void) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function clearAll() {
    setSearch("");
    setSelectedVibes([]);
    setSelectedTypes([]);
    setSelectedMetals([]);
    setSelectedPrice(null);
    setSort("featured");
  }

  const hasFilters = selectedVibes.length || selectedTypes.length || selectedMetals.length || selectedPrice !== null || search;

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--serena-pearl)" }}>
      {/* Page header */}
      <div
        className="py-12 md:py-16 text-center relative overflow-hidden"
        style={{ background: "var(--serena-cream)" }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--serena-gold)" }}>
          All Jars
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-3" style={{ color: "var(--serena-deep-burgundy)" }}>
          Shop the Drops
        </h1>
        <p className="text-base max-w-lg mx-auto" style={{ color: "var(--serena-muted)" }}>
          {SEED_PRODUCTS.length} curated jewellery jars · 5–10 pieces each · Custom batches available
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 px-4">
          {[
            `Ships in ${DELIVERY_WINDOW}`,
            `Rs ${SHIPPING_FEE} shipping · free above Rs ${FREE_SHIPPING_THRESHOLD}`,
            "Order confirmed personally before payment",
          ].map((note) => (
            <span
              key={note}
              className="text-xs px-3 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(198,161,91,0.35)", color: "var(--serena-deep-burgundy)", background: "rgba(255,250,243,0.7)" }}
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--serena-muted)" }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search jars, vibes, aesthetics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border text-sm outline-none transition-all focus:border-[var(--serena-gold)] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.15)]"
              style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-full border text-sm outline-none cursor-pointer"
            style={{ background: "rgba(255,250,243,0.8)", borderColor: "rgba(198,161,91,0.3)", color: "var(--serena-ink)" }}
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden px-5 py-3 rounded-full border text-sm font-medium"
            style={{ background: filtersOpen ? "var(--serena-deep-burgundy)" : "transparent", color: filtersOpen ? "white" : "var(--serena-ink)", borderColor: "rgba(198,161,91,0.3)" }}
          >
            {filtersOpen ? "✕ Close" : "⚙ Filters"} {hasFilters ? `(${(selectedVibes.length + selectedTypes.length + selectedMetals.length + (selectedPrice !== null ? 1 : 0))} active)` : ""}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters — desktop always visible, mobile collapsible */}
          <aside
            className={`w-60 flex-shrink-0 flex-col gap-6 ${filtersOpen ? "flex" : "hidden"} sm:flex`}
          >
            {hasFilters && (
              <button onClick={clearAll} className="text-xs underline transition-colors hover:text-[#8b1e2d]" style={{ color: "var(--serena-muted)" }}>
                Clear all filters
              </button>
            )}

            {/* Vibe */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--serena-gold)" }}>Vibe</h3>
              <div className="flex flex-col gap-2">
                {SHOP_VIBES.map((v) => (
                  <label key={v} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedVibes.includes(v)}
                      onChange={() => toggle(selectedVibes, v, setSelectedVibes)}
                      className="w-4 h-4 rounded border accent-[#8b1e2d] cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-[#52111c] transition-colors" style={{ color: "var(--serena-muted)" }}>{v}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jewellery type */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--serena-gold)" }}>Jewellery Type</h3>
              <div className="flex flex-col gap-2">
                {JEWELLERY_TYPES.map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggle(selectedTypes, t, setSelectedTypes)}
                      className="w-4 h-4 rounded border accent-[#8b1e2d] cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-[#52111c] transition-colors" style={{ color: "var(--serena-muted)" }}>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--serena-gold)" }}>Budget</h3>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((r, i) => (
                  <label key={r.label} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPrice === i}
                      onChange={() => setSelectedPrice(selectedPrice === i ? null : i)}
                      className="w-4 h-4 accent-[#8b1e2d] cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-[#52111c] transition-colors" style={{ color: "var(--serena-muted)" }}>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Metal */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--serena-gold)" }}>Metal Tone</h3>
              <div className="flex flex-col gap-2">
                {METALS.map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedMetals.includes(m)}
                      onChange={() => toggle(selectedMetals, m, setSelectedMetals)}
                      className="w-4 h-4 rounded border accent-[#8b1e2d] cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-[#52111c] transition-colors" style={{ color: "var(--serena-muted)" }}>{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color: "var(--serena-muted)" }}>
                {filtered.length} jar{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div
              className="mb-5 rounded-2xl border px-4 py-3 text-sm"
              style={{ background: "rgba(198,161,91,0.08)", borderColor: "rgba(198,161,91,0.24)", color: "var(--serena-muted)" }}
            >
              {PAYMENT_NOTE}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🫙</p>
                <p className="font-serif text-xl mb-2" style={{ color: "var(--serena-deep-burgundy)" }}>No jars match your filters</p>
                <button onClick={clearAll} className="text-sm underline mt-2" style={{ color: "var(--serena-gold)" }}>Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filtered.map((product) => (
                  <JarCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
