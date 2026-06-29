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

import { MonthlyTrendItem } from "@/types/report";

interface MonthlyTrendProps {
  data: MonthlyTrendItem[];
  trendType: string;
  onTrendTypeChange: (value: string) => void;
}

export default function MonthlyTrend({
  data,
  trendType,
  onTrendTypeChange,
}: MonthlyTrendProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Monthly Trend
        </h3>

        <select
          value={trendType}
          onChange={(e) => onTrendTypeChange(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none"
        >
          <option value="Revenue">Revenue</option>
          <option value="Profit">Profit</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}