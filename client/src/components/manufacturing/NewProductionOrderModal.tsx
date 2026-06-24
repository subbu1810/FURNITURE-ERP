"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PRODUCTS, UNITS } from "@/lib/production-data";
import { useProductionStore } from "@/store/useProductionStore";
import { useUIStore } from "@/store/useUIStore";

export function NewProductionOrderModal({ onClose }: { onClose: () => void }) {
  const addOrder = useProductionStore((state) => state.addOrder);
  const selectedOutlet = useUIStore((state) => state.selectedOutlet);
  const [product, setProduct] = useState("");
  const [unit, setUnit] = useState(UNITS[1]);
  const [qty, setQty] = useState("");
  const [plannedDate, setPlannedDate] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">New Production Order</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Product *</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            >
              <option value="">Select a product</option>
              {PRODUCTS.filter((p) => p !== "All Products").map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Production Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            >
              {UNITS.filter((u) => u !== "All Units").map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Planned Quantity *</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Enter quantity"
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Planned Completion Date</label>
            <input
              type="date"
              value={plannedDate}
              onChange={(e) => setPlannedDate(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Optional note…"
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={!product || !qty}
            onClick={() => {
              if (!product || !qty) return;
              addOrder({
                product,
                unit,
                outlet: selectedOutlet,
                plannedQty: Number(qty),
                plannedDate,
                notes,
              });
              onClose();
            }}
            className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
