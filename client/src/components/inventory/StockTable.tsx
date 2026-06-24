"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Eye, MoreVertical, ChevronLeft, ChevronRight, Package, X, Edit2, ArrowLeftRight, Sliders, Trash2 } from "lucide-react";
import { useInventoryStore } from "@/store/useInventoryStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatINR, cn } from "@/lib/utils";
import { WAREHOUSES, LOCATIONS, type StockItem } from "@/lib/inventory-data";

/* ─── View Detail Panel ─────────────────────────────────────── */
function ViewPanel({ item, onClose }: { item: StockItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-[380px] bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Item Details</h2>
          <button onClick={onClose} className="text-surface-muted hover:text-surface-text transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Icon */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
              <Package size={24} className="text-surface-muted" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-surface-text">{item.productName}</p>
              <p className="text-[12px] text-surface-muted">{item.sku}</p>
            </div>
          </div>

          {/* Fields */}
          {[
            ["SKU", item.sku],
            ["Barcode", item.barcode],
            ["Category", item.category],
            ["Warehouse", item.warehouse],
            ["Location", item.location],
            ["Available Qty", `${item.availableQty} ${item.unit}`],
            ["Stock Value", formatINR(item.stockValue)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between border-b border-surface-border/60 pb-3">
              <span className="text-[12.5px] text-surface-muted">{label}</span>
              <span className="text-[13px] font-medium text-surface-text text-right max-w-[55%]">{value}</span>
            </div>
          ))}

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-surface-muted">Status</span>
            <StatusBadge status={item.status} />
          </div>
        </div>
        <div className="px-5 py-4 border-t border-surface-border">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Stock In Modal ────────────────────────────────────────── */
function StockInModal({ item, onClose }: { item?: StockItem | null; onClose: () => void }) {
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Stock In</h2>
          <button onClick={onClose} className="text-surface-muted hover:text-surface-text">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {item && (
            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <p className="text-[13px] font-medium text-surface-text">{item.productName}</p>
              <p className="text-[11px] text-surface-muted">{item.sku} · Current: {item.availableQty} {item.unit}</p>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Quantity *</label>
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
            <label className="text-[12px] font-medium text-surface-text">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note…"
              rows={2}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={!qty}
            onClick={onClose}
            className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            Confirm Stock In
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Export Modal ──────────────────────────────────────────── */
function ExportModal({ onClose }: { onClose: () => void }) {
  const [format, setFormat] = useState("CSV");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Export Stock</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Format</label>
            <div className="flex gap-2">
              {["CSV", "Excel", "PDF"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn("flex-1 py-2 rounded-md border text-[13px] transition-colors",
                    format === f ? "bg-brand-500 text-white border-brand-500" : "border-surface-border text-surface-text hover:bg-gray-50"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-surface-muted">All filtered rows will be included in the export.</p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onClose} className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors">
            Download {format}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Generic Modals ────────────────────────────────────────── */
function EditItemModal({ item, onClose }: { item: StockItem; onClose: () => void }) {
  const [form, setForm] = useState({ ...item });
  const updateItem = useInventoryStore((state) => state.updateItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Edit Item</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Product Name</label>
            <input type="text" value={form.productName} onChange={e => setForm({...form, productName: e.target.value})} className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Category</label>
            <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2" />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">SKU</label>
            <input type="text" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5 pt-2 border-t border-surface-border mt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] hover:bg-gray-50">Cancel</button>
          <button onClick={() => { updateItem(item.id, form); onClose(); }} className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function AdjustStockModal({ item, onClose }: { item: StockItem; onClose: () => void }) {
  const [qty, setQty] = useState(item.availableQty.toString());
  const updateItem = useInventoryStore((state) => state.updateItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Adjust Stock</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-[13px] font-medium text-surface-text">{item.productName}</p>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">New Exact Quantity</label>
            <input type="number" value={qty} onChange={e => setQty(e.target.value)} className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] hover:bg-gray-50">Cancel</button>
          <button onClick={() => { updateItem(item.id, { availableQty: parseInt(qty) || 0 }); onClose(); }} className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600">Apply Adjust</button>
        </div>
      </div>
    </div>
  );
}

function TransferModal({ item, onClose }: { item: StockItem; onClose: () => void }) {
  const [warehouse, setWarehouse] = useState(item.warehouse);
  const [location, setLocation] = useState(item.location);
  const updateItem = useInventoryStore((state) => state.updateItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Transfer Item</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">New Warehouse</label>
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white"
            >
              {WAREHOUSES.filter(w => !w.startsWith("All ")).map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">New Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white"
            >
              {LOCATIONS.filter(l => !l.startsWith("All ")).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] hover:bg-gray-50">Cancel</button>
          <button onClick={() => { updateItem(item.id, { warehouse, location }); onClose(); }} className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600">Transfer</button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ item, onClose }: { item: StockItem; onClose: () => void }) {
  const deleteItem = useInventoryStore((state) => state.deleteItem);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="p-5 space-y-4 text-center mt-4">
          <div className="w-12 h-12 bg-status-redBg rounded-full mx-auto flex items-center justify-center">
            <Trash2 size={24} className="text-status-red" />
          </div>
          <h2 className="text-[16px] font-bold text-surface-text">Delete Item</h2>
          <p className="text-[13px] text-surface-muted">Are you sure you want to delete <strong>{item.productName}</strong>? This action cannot be undone.</p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] hover:bg-gray-50">Cancel</button>
          <button onClick={() => { deleteItem(item.id); onClose(); }} className="flex-1 py-2 rounded-md bg-status-red text-white text-[13px] font-medium hover:bg-red-600">Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Table ────────────────────────────────────────────── */
export function StockTable({ onExport, onStockIn }: { onExport?: () => void; onStockIn?: () => void }) {
  const {
    getFilteredItems,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    currentPage,
    pageSize,
    setPage,
    items,
    category,
    warehouse,
    location,
    status,
    searchQuery,
  } = useInventoryStore();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [viewItem, setViewItem] = useState<StockItem | null>(null);
  const [stockInItem, setStockInItem] = useState<StockItem | null | undefined>(undefined); // undefined = closed
  const [showExport, setShowExport] = useState(false);
  
  // Modal states
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [adjustItem, setAdjustItem] = useState<StockItem | null>(null);
  const [transferItem, setTransferItem] = useState<StockItem | null>(null);
  const [deleteItemData, setDeleteItemData] = useState<StockItem | null>(null);

  // Close more menu on outside click
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!openMenuId) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuId]);

  const filtered = useMemo(() => {
    const base = getFilteredItems();
    return [...base].sort((a, b) =>
      sortAsc ? a.availableQty - b.availableQty : b.availableQty - a.availableQty
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFilteredItems, sortAsc, items, category, warehouse, location, status, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pageIds = pageItems.map((i) => i.id);
  const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

  // Expose export/stockIn triggers via callbacks from parent page
  useEffect(() => {
    if (onExport) (window as any).__openExport = () => setShowExport(true);
    if (onStockIn) (window as any).__openStockIn = () => setStockInItem(null);
  }, [onExport, onStockIn]);

  // Fix hydration mismatch issues with persist by not rendering until mounted
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      {viewItem && <ViewPanel item={viewItem} onClose={() => setViewItem(null)} />}
      {stockInItem !== undefined && <StockInModal item={stockInItem} onClose={() => setStockInItem(undefined)} />}
      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      
      {editItem && <EditItemModal item={editItem} onClose={() => setEditItem(null)} />}
      {adjustItem && <AdjustStockModal item={adjustItem} onClose={() => setAdjustItem(null)} />}
      {transferItem && <TransferModal item={transferItem} onClose={() => setTransferItem(null)} />}
      {deleteItemData && <DeleteConfirmModal item={deleteItemData} onClose={() => setDeleteItemData(null)} />}

      <div className="bg-white rounded-card border border-surface-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-th w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleSelectAll(pageIds)}
                    className="rounded border-surface-border"
                  />
                </th>
                <th className="table-th">SKU / Barcode</th>
                <th className="table-th">Product Name</th>
                <th className="table-th">Category</th>
                <th className="table-th">Warehouse</th>
                <th className="table-th">Location</th>
                <th
                  className="table-th cursor-pointer select-none"
                  onClick={() => setSortAsc((s) => !s)}
                >
                  Available Qty {sortAsc ? "↑" : "↓"}
                </th>
                <th className="table-th">Unit</th>
                <th className="table-th">Status</th>
                <th className="table-th text-right">Stock Value (₹)</th>
                <th className="table-th text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="table-td">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="rounded border-surface-border"
                    />
                  </td>
                  <td className="table-td">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                        <Package size={14} className="text-surface-muted" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-text">{item.sku}</p>
                        <p className="text-[11px] text-surface-muted">{item.barcode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td font-medium text-surface-text">{item.productName}</td>
                  <td className="table-td text-surface-muted">{item.category}</td>
                  <td className="table-td text-surface-muted">{item.warehouse}</td>
                  <td className="table-td text-surface-muted">{item.location}</td>
                  <td
                    className={cn(
                      "table-td font-medium",
                      item.status === "Low Stock" && "text-status-orange",
                      item.status === "Out of Stock" && "text-status-red",
                      item.status === "In Stock" && "text-status-green"
                    )}
                  >
                    {item.availableQty}
                  </td>
                  <td className="table-td text-surface-muted">{item.unit}</td>
                  <td className="table-td">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="table-td text-right font-medium text-surface-text">
                    {formatINR(item.stockValue)}
                  </td>
                  <td className="table-td text-center">
                    <div className="flex items-center justify-center gap-2 relative">
                      <button
                        onClick={() => setViewItem(item)}
                        className="text-surface-muted hover:text-brand-500 transition-colors"
                        title="View details"
                      >
                        <Eye size={15} />
                      </button>
                      <div className="relative" ref={openMenuId === item.id ? menuRef : null}>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                          className="text-surface-muted hover:text-surface-text transition-colors"
                          title="More"
                        >
                          <MoreVertical size={15} />
                        </button>
                        {openMenuId === item.id && (
                          <div className="absolute right-0 top-6 w-40 bg-white border border-surface-border rounded-lg shadow-lg z-10 text-left overflow-hidden">
                            <button
                              onClick={() => { setStockInItem(item); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                            >
                              <Package size={13} className="text-surface-muted" /> Stock In
                            </button>
                            <button 
                              onClick={() => { setEditItem(item); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                            >
                              <Edit2 size={13} className="text-surface-muted" /> Edit Item
                            </button>
                            <button 
                              onClick={() => { setAdjustItem(item); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                            >
                              <Sliders size={13} className="text-surface-muted" /> Adjust Stock
                            </button>
                            <button 
                              onClick={() => { setTransferItem(item); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                            >
                              <ArrowLeftRight size={13} className="text-surface-muted" /> Transfer
                            </button>
                            <div className="border-t border-surface-border/60 my-0.5" />
                            <button 
                              onClick={() => { setDeleteItemData(item); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[12.5px] hover:bg-status-redBg/30 text-status-red"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-10 text-surface-muted text-[13px]">
                    No items match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-border text-[12.5px] text-surface-muted">
          <span>
            Showing {pageItems.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of {items.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-surface-border disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(0, 5)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-md border text-[12.5px] transition-colors",
                    p === currentPage
                      ? "bg-brand-500 text-white border-brand-500"
                      : "border-surface-border hover:bg-gray-50"
                  )}
                >
                  {p}
                </button>
              ))}
            {totalPages > 5 && <span className="px-1">…</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md border text-[12.5px] transition-colors",
                  totalPages === currentPage
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-surface-border hover:bg-gray-50"
                )}
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-surface-border disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
