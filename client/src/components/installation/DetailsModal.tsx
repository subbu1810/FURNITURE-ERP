"use client";

import type { Installation } from "@/types/installation";
import { X } from "lucide-react";

interface DetailsModalProps {
  open: boolean;
  installation: Installation | null;
  onClose: () => void;
}

export default function DetailsModal({
  open,
  installation,
  onClose,
}: DetailsModalProps) {
  if (!open || !installation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Installation Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500">Installation No</p>
            <p>{installation.installationNo}</p>
          </div>

          <div>
            <p className="text-gray-500">Order No</p>
            <p>{installation.orderNo}</p>
          </div>

          <div>
            <p className="text-gray-500">Customer</p>
            <p>{installation.customer}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p>{installation.phone}</p>
          </div>

          <div>
            <p className="text-gray-500">Lead</p>
            <p>{installation.lead}</p>
          </div>

          <div>
            <p className="text-gray-500">Vehicle</p>
            <p>{installation.vehicle}</p>
          </div>

          <div>
            <p className="text-gray-500">Duration</p>
            <p>{installation.duration}</p>
          </div>

          <div>
            <p className="text-gray-500">Rating</p>
            <p>{installation.rating}</p>
          </div>

        </div>

        <div className="mt-6 rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 font-semibold">
            Customer Feedback
          </h3>

          <p>{installation.feedback}</p>
        </div>

      </div>
    </div>
  );
}