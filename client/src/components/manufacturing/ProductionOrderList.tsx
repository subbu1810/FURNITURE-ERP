"use client";

import { useState, useEffect, useRef } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useProductionStore } from "@/store/useProductionStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

function ProgressBar({ completed, planned }: { completed: number; planned: number }) {
  const pct = planned > 0 ? Math.min(100, Math.round((completed / planned) * 100)) : 0;
  const color =
    pct >= 100 ? "bg-status-green" : pct > 0 ? "bg-status-blue" : "bg-gray-300";
  return (
    <div className="flex flex-col gap-1 w-full max-w-[120px]">
      <span className="text-[13px] font-medium text-surface-text">
        {completed} <span className="text-surface-muted font-normal text-[11.5px]">({pct}%)</span>
      </span>
      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-300", color)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ProductionOrderList() {
  const {
    getFilteredOrders,
    selectedId,
    setSelectedId,
    currentPage,
    pageSize,
    setPage,
    orders,
  } = useProductionStore();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openMenuId) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuId(null);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenuId]);

  const filtered = getFilteredOrders();
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-th">Order No</th>
              <th className="table-th">Product</th>
              <th className="table-th">Unit</th>
              <th className="table-th">Planned Qty</th>
              <th className="table-th">Completed Qty</th>
              <th className="table-th">Status</th>
              <th className="table-th">Planned Date</th>
              <th className="table-th text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((order) => {
              const isSelected = order.id === selectedId;
              return (
                <tr
                  key={order.id}
                  onClick={() => setSelectedId(order.id)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected ? "bg-brand-50" : "hover:bg-gray-50/60"
                  )}
                >
                  <td className="table-td font-medium text-brand-600">{order.orderNo}</td>
                  <td className="table-td font-medium text-surface-text">{order.product}</td>
                  <td className="table-td text-surface-muted">{order.unit}</td>
                  <td className="table-td text-surface-muted">{order.plannedQty}</td>
                  <td className="table-td">
                    <ProgressBar completed={order.completedQty} planned={order.plannedQty} />
                  </td>
                  <td className="table-td">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="table-td text-surface-muted whitespace-nowrap">{order.plannedDate}</td>
                  <td className="table-td text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}
                        className="text-surface-muted hover:text-surface-text transition-colors"
                      >
                        <MoreVertical size={15} />
                      </button>
                      {openMenuId === order.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-6 w-36 bg-white border border-surface-border rounded-md shadow-lg z-10 text-left overflow-hidden"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(order.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(order.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                          >
                            Edit Order
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(order.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-status-redBg/30 text-status-red"
                          >
                            Cancel Order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-surface-muted text-[13px]">
                  No production orders match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-surface-border text-[12.5px] text-surface-muted">
        <span>
          Showing {pageItems.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filtered.length)} of {orders.length} entries
        </span>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-surface-border disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-md border text-[12.5px] transition-colors",
                  p === currentPage ? "bg-brand-500 text-white border-brand-500" : "border-surface-border hover:bg-gray-50"
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-surface-border disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
