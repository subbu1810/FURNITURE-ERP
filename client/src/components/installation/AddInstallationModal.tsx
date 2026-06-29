"use client";

import { X } from "lucide-react";

interface NewInstallation {
  installationNo: string;
  orderNo: string;
  customer: string;
  phone: string;
  lead: string;
  vehicle: string;
  duration: string;
}

interface AddInstallationModalProps {
  open: boolean;
  newInstallation: NewInstallation;
  setNewInstallation: React.Dispatch<React.SetStateAction<NewInstallation>>;
  onClose: () => void;
  onSave: () => void;
}

export default function AddInstallationModal({
  open,
  newInstallation,
  setNewInstallation,
  onClose,
  onSave,
}: AddInstallationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Add Installation
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <input
            className="rounded-lg border p-2"
            placeholder="Installation No"
            value={newInstallation.installationNo}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                installationNo: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Order No"
            value={newInstallation.orderNo}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                orderNo: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Customer"
            value={newInstallation.customer}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                customer: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Phone"
            value={newInstallation.phone}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                phone: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Lead"
            value={newInstallation.lead}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                lead: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Vehicle"
            value={newInstallation.vehicle}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                vehicle: e.target.value,
              })
            }
          />

          <input
            className="rounded-lg border p-2"
            placeholder="Duration"
            value={newInstallation.duration}
            onChange={(e) =>
              setNewInstallation({
                ...newInstallation,
                duration: e.target.value,
              })
            }
          />

        </div>

        <button
          onClick={onSave}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Save Installation
        </button>

      </div>
    </div>
  );
}