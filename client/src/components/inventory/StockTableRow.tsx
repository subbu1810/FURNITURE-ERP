"use client";

import Image from "next/image";
import { Eye, MoreVertical } from "lucide-react";
import type { Product } from "@/types/product";
import ActionMenu from "./ActionMenu";

interface StockTableRowProps {
  item: Product;

  showMenu: boolean;
  setShowMenu: (value: boolean) => void;

  selectedMenuProduct: Product | null;
  setSelectedMenuProduct: (product: Product | null) => void;

  setSelectedProduct: (product: Product) => void;
  setShowProduct: (value: boolean) => void;
}

export default function StockTableRow({
  item,
  showMenu,
  setShowMenu,
  selectedMenuProduct,
  setSelectedMenuProduct,
  setSelectedProduct,
  setShowProduct,
}: StockTableRowProps) {
  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50">
      {/* Checkbox */}
      <td className="px-4 py-3">
        <input type="checkbox" />
      </td>

      {/* Image */}
      <td className="px-4 py-3">
        <Image
          src={item.image}
          alt={item.product}
          width={60}
          height={60}
          className="rounded-lg object-cover"
        />
      </td>

      {/* SKU */}
      <td className="px-4 py-3 font-semibold">
        {item.sku}
      </td>

      {/* Product */}
      <td className="px-4 py-3">
        {item.product}
      </td>

      {/* Category */}
      <td className="px-4 py-3">
        {item.category}
      </td>

      {/* Warehouse */}
      <td className="px-4 py-3">
        Main Warehouse
      </td>

      {/* Location */}
      <td className="px-4 py-3">
        Aisle 01 - Rack 01
      </td>

      {/* Quantity */}
      <td className="px-4 py-3">
        <span
          className={
            item.status === "In Stock"
              ? "font-semibold text-green-600"
              : item.status === "Low Stock"
              ? "font-semibold text-orange-600"
              : "font-semibold text-red-600"
          }
        >
          {item.qty}
        </span>
      </td>

      {/* Unit */}
      <td className="px-4 py-3">
        Nos
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={
            item.status === "In Stock"
              ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
              : item.status === "Low Stock"
              ? "rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700"
              : "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
          }
        >
          {item.status}
        </span>
      </td>

      {/* Value */}
      <td className="px-4 py-3 font-medium">
        {item.value}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">

          <Eye
            size={18}
            className="cursor-pointer"
            onClick={() => {
              setSelectedProduct(item);
              setShowProduct(true);
            }}
          />

          <div className="relative">

            <MoreVertical
              size={18}
              className="cursor-pointer"
              onClick={() => {
                setSelectedMenuProduct(item);
                setShowMenu(!showMenu);
              }}
            />

           {showMenu &&
selectedMenuProduct?.sku === item.sku && (
  <ActionMenu
    item={item}
    setSelectedProduct={setSelectedProduct}
    setShowProduct={setShowProduct}
    setShowMenu={setShowMenu}
  />
)}

          </div>

        </div>
      </td>
    </tr>
  );
}