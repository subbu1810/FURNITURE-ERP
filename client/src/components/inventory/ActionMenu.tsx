"use client";

import type { Product } from "@/types/product";

interface ActionMenuProps {
  item: Product;
  setSelectedProduct: (product: Product) => void;
  setShowProduct: (value: boolean) => void;
  setShowMenu: (value: boolean) => void;
}

export default function ActionMenu({
  item,
  setSelectedProduct,
  setShowProduct,
  setShowMenu,
}: ActionMenuProps) {
  return (
    <div className="absolute right-0 top-6 z-50 w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">

      <button
        className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          setSelectedProduct(item);
          setShowProduct(true);
          setShowMenu(false);
        }}
      >
        👁 View Product
      </button>

      <button
        className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          alert(`Edit ${item.product}`);
          setShowMenu(false);
        }}
      >
        ✏ Edit Product
      </button>

      <button
        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        onClick={() => {
          alert(`Delete ${item.product}`);
          setShowMenu(false);
        }}
      >
        🗑 Delete Product
      </button>

    </div>
  );
}