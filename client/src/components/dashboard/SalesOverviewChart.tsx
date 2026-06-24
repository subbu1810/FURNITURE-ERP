"use client";

import { useMemo } from "react";
import { useUIStore } from "@/store/useUIStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SALES_OVERVIEW_BY_OUTLET_AND_RANGE } from "@/lib/dashboard-data";

export function SalesOverviewChart() {
  const { selectedOutlet, dateRangeLabel } = useUIStore();
  const data = useMemo(
    () =>
      SALES_OVERVIEW_BY_OUTLET_AND_RANGE[selectedOutlet]?.[dateRangeLabel] ||
      SALES_OVERVIEW_BY_OUTLET_AND_RANGE[selectedOutlet]?.["01 May 2025 - 17 May 2025"] ||
      SALES_OVERVIEW_BY_OUTLET_AND_RANGE["All Outlets"]["01 May 2025 - 17 May 2025"],
    [selectedOutlet, dateRangeLabel]
  );

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[14px] font-semibold text-surface-text">Sales Overview</h3>
        <select className="text-[12px] border border-surface-border rounded-md px-2 py-1 text-surface-muted bg-white">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}K`}
          />
          <Tooltip
            formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Sales"]}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1565C0"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#1565C0" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
