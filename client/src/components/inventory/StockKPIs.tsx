"use client";

import { Package, Warehouse, TriangleAlert, CircleX } from "lucide-react";
import KpiCard from "@/components/inventory/KpiCard";

interface StockKPIsProps {
  totalItems: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockPercentage: string;
  lowStockPercentage: string;
  outOfStockPercentage: string;
  totalStockValue: number;
}

export default function StockKPIs({
  totalItems,
  inStockCount,
  lowStockCount,
  outOfStockCount,
  inStockPercentage,
  lowStockPercentage,
  outOfStockPercentage,
  totalStockValue,
}: StockKPIsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <KpiCard
        title="Total Items"
        value={totalItems}
        subtitle="View all items →"
        icon={<Package size={18} />}
        iconBg="bg-blue-600"
      />

      <KpiCard
        title="In Stock"
        value={inStockCount}
        subtitle={`${inStockPercentage}% of total`}
        icon={<Warehouse size={18} />}
        iconBg="bg-green-600"
        subtitleClassName="text-green-600"
      />

      <KpiCard
        title="Low Stock"
        value={lowStockCount}
        subtitle={`${lowStockPercentage}% of total`}
        icon={<TriangleAlert size={18} />}
        iconBg="bg-orange-500"
        subtitleClassName="text-orange-600"
      />

      <KpiCard
        title="Out Of Stock"
        value={outOfStockCount}
        subtitle={`${outOfStockPercentage}% of total`}
        icon={<CircleX size={18} />}
        iconBg="bg-red-600"
        subtitleClassName="text-red-600"
      />

      <KpiCard
        title="Stock Value"
        value={`₹${totalStockValue.toLocaleString("en-IN")}`}
        subtitle="View valuation →"
        icon={<span>₹</span>}
        iconBg="bg-blue-600"
        subtitleClassName="text-blue-600"
      />
    </div>
  );
}