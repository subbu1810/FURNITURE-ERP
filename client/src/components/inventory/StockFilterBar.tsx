"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useInventoryStore } from "@/store/useInventoryStore";
import { CATEGORIES, WAREHOUSES, LOCATIONS, STATUSES } from "@/lib/inventory-data";

export function StockFilterBar() {
  const {
    searchQuery,
    category,
    warehouse,
    location,
    status,
    setSearchQuery,
    setCategory,
    setWarehouse,
    setLocation,
    setStatus,
    resetFilters,
  } = useInventoryStore();

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-white rounded-card border border-surface-border shadow-card">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[140px]"
      >
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
        className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[140px]"
      >
        {WAREHOUSES.map((w) => (
          <option key={w}>{w}</option>
        ))}
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[140px]"
      >
        {LOCATIONS.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[120px]"
      >
        {STATUSES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div className="relative flex-1 min-w-[220px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-muted" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by product / SKU / Barcode"
          className="w-full text-[13px] border border-surface-border rounded-md pl-9 pr-3 py-1.5 bg-white text-surface-text placeholder:text-surface-muted focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
        />
      </div>

      <button
        onClick={resetFilters}
        className="flex items-center gap-1.5 text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal size={14} />
        Filters
      </button>
    </div>
  );
}
