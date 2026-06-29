"use client";

import type { Product } from "@/types/product";
import StockTableRow from "./StockTableRow";

interface StockTableProps {
  products: Product[];

  showMenu: boolean;
  setShowMenu: (value: boolean) => void;

  selectedMenuProduct: Product | null;
  setSelectedMenuProduct: (product: Product | null) => void;

  setSelectedProduct: (product: Product) => void;
  setShowProduct: (value: boolean) => void;
}

export default function StockTable({
  products,
  showMenu,
  setShowMenu,
  selectedMenuProduct,
  setSelectedMenuProduct,
  setSelectedProduct,
  setShowProduct,
}: StockTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">

      <table className="min-w-[1400px] border-collapse">

        <thead className="bg-gray-50">

          <tr>

            <th>
              <input type="checkbox" />
            </th>

            <th className="px-4 py-3 text-left">
              Image
            </th>

            <th className="px-4 py-3 text-left">
              SKU / Barcode
            </th>

            <th className="px-4 py-3 text-left">
              Product
            </th>

            <th className="px-4 py-3 text-left">
              Category
            </th>

            <th className="px-4 py-3 text-left">
              Warehouse
            </th>

            <th className="px-4 py-3 text-left">
              Location
            </th>

            <th className="px-4 py-3 text-left">
              Availability Qty
            </th>

            <th className="px-4 py-3 text-left">
              Unit
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Value
            </th>

            <th className="px-4 py-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((item) => (

            <StockTableRow
              key={item.sku}
              item={item}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              selectedMenuProduct={selectedMenuProduct}
              setSelectedMenuProduct={setSelectedMenuProduct}
              setSelectedProduct={setSelectedProduct}
              setShowProduct={setShowProduct}
            />

          ))}

        </tbody>

      </table>

    </div>
  );
}