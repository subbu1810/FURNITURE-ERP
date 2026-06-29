"use client";

import type { Product } from "@/types/product";

interface ProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({
  open,
  product,
  onClose,
}: ProductModalProps) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-4 text-xl font-bold">
          Product Details
        </h2>

        <div className="space-y-3">

          <div>
            <span className="font-semibold">
              Product:
            </span>{" "}
            {product.product}
          </div>

          <div>
            <span className="font-semibold">
              SKU:
            </span>{" "}
            {product.sku}
          </div>

          <div>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {product.category}
          </div>

          <div>
            <span className="font-semibold">
              Quantity:
            </span>{" "}
            {product.qty}
          </div>

          <div>
            <span className="font-semibold">
              Status:
            </span>{" "}
            {product.status}
          </div>

          <div>
            <span className="font-semibold">
              Value:
            </span>{" "}
            {product.value}
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}