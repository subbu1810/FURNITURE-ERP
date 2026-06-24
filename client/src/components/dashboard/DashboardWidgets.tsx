"use client";

import { useMemo, useState } from "react";
import { Boxes, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { STOCK_ITEMS } from "@/lib/inventory-data";
import { TOP_OUTLETS_BY_OUTLET, PROFIT_LOSS_BY_OUTLET } from "@/lib/dashboard-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInventoryStore } from "@/store/useInventoryStore";
export function TopOutletsTable() {
  const { selectedOutlet } = useUIStore();
  const outlets = TOP_OUTLETS_BY_OUTLET[selectedOutlet] || TOP_OUTLETS_BY_OUTLET["All Outlets"];

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <h3 className="text-[14px] font-semibold text-surface-text mb-1">Top Outlets by Sales</h3>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th className="table-th !pl-0">Outlet</th>
              <th className="table-th text-right">Sales (₹)</th>
              <th className="table-th text-right">Orders</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((row) => (
              <tr key={row.outlet}>
                <td className="text-[13px] py-2 text-surface-text border-t border-surface-border/60 !pl-0">{row.outlet}</td>
                <td className="text-[13px] py-2 text-surface-text text-right border-t border-surface-border/60">{row.sales}</td>
                <td className="text-[13px] py-2 text-surface-text text-right border-t border-surface-border/60">{row.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/settings?tab=outlets" className="text-[12px] text-brand-500 font-medium hover:underline inline-block mt-3">
        View All Outlets &gt;
      </Link>
    </div>
  );
}

export function StockSummaryWidget() {
  const { selectedOutlet } = useUIStore();
  const router = useRouter();

  const stockSummary = useMemo(() => {
    const filteredItems = selectedOutlet === "All Outlets"
      ? STOCK_ITEMS
      : STOCK_ITEMS.filter((item) => item.warehouse === selectedOutlet);

    const totalItems = filteredItems.reduce((sum, item) => sum + item.availableQty, 0);
    const inStock = filteredItems
      .filter((item) => item.status === "In Stock")
      .reduce((sum, item) => sum + item.availableQty, 0);
    const lowStock = filteredItems.filter((item) => item.status === "Low Stock").length;
    const outOfStock = filteredItems.filter((item) => item.status === "Out of Stock").length;

    return {
      totalItems: totalItems.toLocaleString("en-IN"),
      inStock: inStock.toLocaleString("en-IN"),
      lowStock: lowStock.toString(),
      outOfStock: outOfStock.toString(),
    };
  }, [selectedOutlet]);

  const handleNavigate = (statusFilter?: string) => {
    if (statusFilter) {
      useInventoryStore.getState().setStatus(statusFilter);
    } else {
      useInventoryStore.getState().setStatus("All Status");
    }
    router.push("/inventory/stock-list");
  };

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <h3 className="text-[14px] font-semibold text-surface-text mb-3">Stock Summary</h3>
      <div className="grid grid-cols-2 gap-3">
        <div 
          onClick={() => handleNavigate()}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-status-blueBg/40 cursor-pointer hover:bg-status-blueBg/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-status-blueBg flex items-center justify-center shrink-0">
            <Boxes size={15} className="text-status-blue" />
          </div>
          <div>
            <p className="text-[11px] text-surface-muted">Total Items</p>
            <p className="text-[15px] font-semibold text-surface-text">{stockSummary.totalItems}</p>
          </div>
        </div>
        <div 
          onClick={() => handleNavigate("In Stock")}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-status-greenBg/40 cursor-pointer hover:bg-status-greenBg/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-status-greenBg flex items-center justify-center shrink-0">
            <CheckCircle2 size={15} className="text-status-green" />
          </div>
          <div>
            <p className="text-[11px] text-surface-muted">In Stock</p>
            <p className="text-[15px] font-semibold text-surface-text">{stockSummary.inStock}</p>
          </div>
        </div>
        <div 
          onClick={() => handleNavigate("Low Stock")}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-status-orangeBg/40 cursor-pointer hover:bg-status-orangeBg/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-status-orangeBg flex items-center justify-center shrink-0">
            <AlertTriangle size={15} className="text-status-orange" />
          </div>
          <div>
            <p className="text-[11px] text-surface-muted">Low Stock</p>
            <p className="text-[15px] font-semibold text-surface-text">{stockSummary.lowStock}</p>
          </div>
        </div>
        <div 
          onClick={() => handleNavigate("Out of Stock")}
          className="flex items-center gap-2.5 p-3 rounded-lg bg-status-redBg/40 cursor-pointer hover:bg-status-redBg/60 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-status-redBg flex items-center justify-center shrink-0">
            <XCircle size={15} className="text-status-red" />
          </div>
          <div>
            <p className="text-[11px] text-surface-muted">Out of Stock</p>
            <p className="text-[15px] font-semibold text-surface-text">{stockSummary.outOfStock}</p>
          </div>
        </div>
      </div>
      <button 
        onClick={() => handleNavigate()}
        className="text-[12px] text-brand-500 font-medium hover:underline inline-block mt-3 bg-transparent border-none p-0 cursor-pointer"
      >
        View Stock Report &gt;
      </button>
    </div>
  );
}

export function ProfitLossWidget() {
  const [period, setPeriod] = useState("This Month");
  const { selectedOutlet } = useUIStore();
  const metrics = PROFIT_LOSS_BY_OUTLET[selectedOutlet]?.[period] || PROFIT_LOSS_BY_OUTLET["All Outlets"][period];

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-semibold text-surface-text">Profit &amp; Loss Overview</h3>
        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="text-[12px] border border-surface-border rounded-md px-2 py-1 text-surface-muted bg-white"
        >
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-surface-muted">Total Income</span>
          <span className="text-[14px] font-semibold text-surface-text">{metrics.income}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-surface-muted">Total Expenses</span>
          <span className="text-[14px] font-semibold text-surface-text">{metrics.expenses}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-surface-border">
          <span className="text-[13px] font-medium text-surface-text">Net Profit</span>
          <span className={`text-[16px] font-bold ${metrics.profitClass}`}>{metrics.profit}</span>
        </div>
      </div>
    </div>
  );
}
