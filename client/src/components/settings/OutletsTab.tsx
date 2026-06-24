"use client";

import { useState } from "react";
import { Plus, MoreVertical, X, Store, Warehouse, Phone, User } from "lucide-react";
import { useSettingsStore, type OutletRecord } from "@/store/useSettingsStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

function OutletFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial?: OutletRecord;
  onClose: () => void;
  onSubmit: (data: Omit<OutletRecord, "id">) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    type: initial?.type ?? "Outlet",
    address: initial?.address ?? "",
    phone: initial?.phone ?? "",
    manager: initial?.manager ?? "",
    status: initial?.status ?? "Active",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">
            {initial ? "Edit Location" : "Add Outlet / Warehouse"}
          </h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Type</label>
            <div className="flex gap-2">
              {(["Outlet", "Warehouse"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={cn(
                    "flex-1 py-2 rounded-md border text-[13px] transition-colors",
                    form.type === t ? "bg-brand-500 text-white border-brand-500" : "border-surface-border text-surface-text hover:bg-gray-50"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Indiranagar"
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={2}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Manager / In-charge</label>
            <input
              value={form.manager}
              onChange={(e) => setForm({ ...form, manager: e.target.value })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[12px] font-medium text-surface-text">Active</label>
            <button
              onClick={() => setForm({ ...form, status: form.status === "Active" ? "Inactive" : "Active" })}
              className={cn(
                "w-10 h-5.5 rounded-full relative transition-colors",
                form.status === "Active" ? "bg-brand-500" : "bg-gray-300"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full transition-transform",
                  form.status === "Active" && "translate-x-4.5"
                )}
              />
            </button>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={!form.name}
            onClick={() => onSubmit(form)}
            className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {initial ? "Save Changes" : "Add Location"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OutletsTab() {
  const { outlets, addOutlet, updateOutlet, removeOutlet } = useSettingsStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<OutletRecord | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[15px] font-semibold text-surface-text">Outlets &amp; Warehouses</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-1.5 text-[13px] rounded-md px-3 py-1.5 bg-brand-500 text-white hover:bg-brand-600 transition-colors"
        >
          <Plus size={14} /> Add Location
        </button>
      </div>
      <p className="text-[12.5px] text-surface-muted mb-5">
        Manage your retail outlets and warehouses. These appear in the location filter across the app.
      </p>

      <div className="space-y-2.5">
        {outlets.map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between border border-surface-border rounded-lg px-4 py-3 hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                {o.type === "Warehouse" ? (
                  <Warehouse size={15} className="text-surface-muted" />
                ) : (
                  <Store size={15} className="text-surface-muted" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-medium text-surface-text">{o.name}</p>
                  <StatusBadge status={o.status} />
                </div>
                <p className="text-[11.5px] text-surface-muted truncate">{o.address}</p>
                <div className="flex items-center gap-3 mt-0.5 text-[11px] text-surface-muted">
                  <span className="flex items-center gap-1"><User size={10} /> {o.manager}</span>
                  <span className="flex items-center gap-1"><Phone size={10} /> {o.phone}</span>
                </div>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setOpenMenuId(openMenuId === o.id ? null : o.id)}
                className="text-surface-muted hover:text-surface-text transition-colors p-1"
              >
                <MoreVertical size={16} />
              </button>
              {openMenuId === o.id && (
                <div className="absolute right-0 top-7 w-36 bg-white border border-surface-border rounded-md shadow-lg z-10 overflow-hidden">
                  <button
                    onClick={() => { setEditing(o); setShowForm(true); setOpenMenuId(null); }}
                    className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      updateOutlet(o.id, { status: o.status === "Active" ? "Inactive" : "Active" });
                      setOpenMenuId(null);
                    }}
                    className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                  >
                    {o.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => { removeOutlet(o.id); setOpenMenuId(null); }}
                    className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-status-redBg/30 text-status-red"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <OutletFormModal
          initial={editing ?? undefined}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            if (editing) updateOutlet(editing.id, data);
            else addOutlet({ ...data, id: String(Date.now()) });
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
