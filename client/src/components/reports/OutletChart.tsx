"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { OutletItem } from "@/types/report";

interface OutletChartProps {
  data: OutletItem[];
  period: string;
  onPeriodChange: (value: string) => void;
}

export default function OutletChart({
  data,
  period,
  onPeriodChange,
}: OutletChartProps) {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Sales by Outlet
        </h3>

        <select
  value={period}
  onChange={(e) => onPeriodChange(e.target.value)}
  className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
>
  <option value="This Month">This Month</option>
  <option value="Last Month">Last Month</option>
  <option value="This Year">This Year</option>
</select>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="name"
              width={90}
            />

            <Tooltip />

            <Bar
              dataKey="sales"
              fill="#2563eb"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}