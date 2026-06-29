"use client";

interface StockInModalProps {
  open: boolean;
  onClose: () => void;
}

export default function StockInModal({
  open,
  onClose,
}: StockInModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-xl font-bold">
          Stock In
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />

          <input
            type="number"
            placeholder="Quantity"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />

          <input
            type="text"
            placeholder="Warehouse"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}