"use client";

import { useMemo } from "react";
import { useUIStore } from "@/store/useUIStore";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { SALES_BY_CATEGORY_BY_OUTLET_AND_RANGE, TOTAL_SALES_BY_OUTLET } from "@/lib/dashboard-data";

export function SalesByCategoryChart() {
  const { selectedOutlet, dateRangeLabel } = useUIStore();
  const data = useMemo(
    () =>
      SALES_BY_CATEGORY_BY_OUTLET_AND_RANGE[selectedOutlet]?.[dateRangeLabel] ||
      SALES_BY_CATEGORY_BY_OUTLET_AND_RANGE[selectedOutlet]?.["01 May 2025 - 17 May 2025"] ||
      SALES_BY_CATEGORY_BY_OUTLET_AND_RANGE["All Outlets"]["01 May 2025 - 17 May 2025"],
    [selectedOutlet, dateRangeLabel]
  );
  const totalSales = TOTAL_SALES_BY_OUTLET[selectedOutlet] || TOTAL_SALES_BY_OUTLET["All Outlets"];

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <h3 className="text-[14px] font-semibold text-surface-text mb-2">Sales by Category</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[11px] text-surface-muted">Total</p>
          <p className="text-[15px] font-semibold text-surface-text">{totalSales}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 mt-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-[12px] text-surface-text">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            {entry.name}
            <span className="text-surface-muted ml-auto">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
