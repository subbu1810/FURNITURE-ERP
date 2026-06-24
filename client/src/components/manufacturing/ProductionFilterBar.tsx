"use client";

import { Search, SlidersHorizontal, Plus, Calendar, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useProductionStore } from "@/store/useProductionStore";
import { useUIStore } from "@/store/useUIStore";
import { PRODUCTS, UNITS, STATUSES } from "@/lib/production-data";
import { NewProductionOrderModal } from "./NewProductionOrderModal";
import { cn } from "@/lib/utils";

const DATE_PRESETS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "01 May 2025 - 17 May 2025",
  "This Month",
  "Last Month",
  "Custom Range",
];

export function ProductionFilterBar() {
  const {
    statusFilter,
    productFilter,
    unitFilter,
    searchQuery,
    setStatusFilter,
    setProductFilter,
    setUnitFilter,
    setSearchQuery,
  } = useProductionStore();

  const { dateRangeLabel, setDateRangeLabel } = useUIStore();
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setDateOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-white rounded-card border border-surface-border shadow-card">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[120px]"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[140px]"
        >
          {PRODUCTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text min-w-[120px]"
        >
          {UNITS.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        <div ref={dateRef} className="relative shrink-0">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setDateOpen((o) => !o);
            }}
            className="flex items-center justify-between gap-2 px-3 py-1.5 border border-surface-border rounded-md text-[13px] text-surface-text bg-white hover:bg-gray-50 min-w-[200px]"
          >
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-surface-muted" />
              {dateRangeLabel}
            </span>
            <ChevronDown size={14} className={cn("text-surface-muted transition-transform", dateOpen && "rotate-180")} />
          </button>
          {dateOpen && (
            <div className="absolute mt-1 left-0 w-52 bg-white border border-surface-border rounded-md shadow-lg z-30 overflow-hidden">
              {DATE_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDateRangeLabel(preset);
                    setDateOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 transition-colors",
                    preset === dateRangeLabel && "bg-brand-50 text-brand-600 font-medium"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-muted" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order no / product"
            className="w-full text-[13px] border border-surface-border rounded-md pl-9 pr-3 py-1.5 bg-white text-surface-text placeholder:text-surface-muted focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
          />
        </div>

        <button
          onClick={() => setShowFiltersPanel((s) => !s)}
          className="flex items-center gap-1.5 text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text hover:bg-gray-50 transition-colors relative"
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

        <button
          onClick={() => setShowNewOrder(true)}
          className="flex items-center gap-1.5 text-[13px] rounded-md px-3 py-1.5 bg-brand-500 text-white hover:bg-brand-600 transition-colors ml-auto"
        >
          <Plus size={14} />
          New Production Order
        </button>
      </div>

      {showFiltersPanel && (
        <div className="bg-white rounded-card border border-surface-border shadow-card p-4 mt-2">
          <p className="text-[12.5px] text-surface-muted">
            Showing orders filtered by status, product, and unit selected above. Use the search box to find a specific order number or product.
          </p>
        </div>
      )}

      {showNewOrder && <NewProductionOrderModal onClose={() => setShowNewOrder(false)} />}
    </>
  );
}
