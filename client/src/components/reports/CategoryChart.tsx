"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { CategoryItem } from "@/types/report";
import { COLORS } from "@/data/reports";

interface CategoryChartProps {
  data: CategoryItem[];
}

export default function CategoryChart({
  data,
}: CategoryChartProps) {
  return (
    <div className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Sales by Category
      </h3>

      <div className="h-[230px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-gray-700">
                {item.name}
              </span>
            </div>

            <span className="font-semibold text-gray-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}