"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { OrderStatusItem } from "@/types/report";
import { STATUS_COLORS } from "@/data/reports";

interface OrderStatusProps {
  data: OrderStatusItem[];
}

export default function OrderStatus({
  data,
}: OrderStatusProps) {

  const totalOrders = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">
        Order Status Summary
      </h3>

      <div className="flex flex-col items-center">
        <div className="relative h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={STATUS_COLORS[index]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">
              {totalOrders}
            </h2>

            <p className="text-xs text-gray-500">
              Total Orders
            </p>
          </div>
        </div>

        <div className="mt-4 w-full space-y-2">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      STATUS_COLORS[index],
                  }}
                />

                <span>{item.name}</span>
              </div>

              <span className="font-semibold">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}