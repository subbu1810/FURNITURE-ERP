"use client";

import { ArrowRight } from "lucide-react";
import { ProductItem } from "@/types/report";

interface BestSellingProductsProps {
  data: ProductItem[];
}

export default function BestSellingProducts({
  data,
}: BestSellingProductsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Top 5 Best Selling Products
        </h3>

        <select className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 outline-none">
          <option>This Month</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Category
              </th>

              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Qty Sold
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Revenue (₹)
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.product}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-5 py-3 text-sm font-medium text-gray-900">
                  {item.product}
                </td>

                <td className="px-5 py-3 text-sm text-gray-600">
                  {item.category}
                </td>

                <td className="px-5 py-3 text-center text-sm text-gray-700">
                  {item.qty}
                </td>

                <td className="px-5 py-3 text-right text-sm font-semibold text-gray-900">
                  {item.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
          View All Products
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}