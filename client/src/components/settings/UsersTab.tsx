"use client";

import { useState } from "react";
import { Plus, MoreVertical, X, Mail } from "lucide-react";
import { useSettingsStore, type UserAccount } from "@/store/useSettingsStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { OUTLETS } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const ROLES: UserAccount["role"][] = [
  "Super Admin", 
  "Admin", 
  "Manager", 
  "Staff", 
  "Sales Staff", 
  "Support Staff", 
  "Inventory Staff", 
  "Delivery Staff", 
  "Accountant"
];

const ROLE_PERMS: Record<UserAccount["role"], string> = {
  "Super Admin": "Full access to all modules, settings, and outlets",
  Admin: "Manage inventory, orders, and reports across outlets",
  Manager: "Manage operations for assigned outlet only",
  Staff: "View and process orders, stock at assigned outlet",
  "Sales Staff": "Handle customer sales and order processing",
  "Support Staff": "Manage customer inquiries and after-sales support",
  "Inventory Staff": "Manage stock intakes, transfers, and counts",
  "Delivery Staff": "Access delivery schedules and routing information",
  Accountant: "Access to billing, payments, and financial reports",
};

function UserFormModal({
  initial,
  onClose,
  onSubmit,
}: {
  initial?: UserAccount;
  onClose: () => void;
  onSubmit: (data: Omit<UserAccount, "id" | "lastActive">) => void;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    role: initial?.role ?? ("Staff" as UserAccount["role"]),
    outlet: initial?.outlet ?? "All Outlets",
    status: initial?.status ?? ("Active" as UserAccount["status"]),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">
            {initial ? "Edit User" : "Add Team Member"}
          </h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Full Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserAccount["role"] })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <p className="text-[11px] text-surface-muted">{ROLE_PERMS[form.role]}</p>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Assigned Outlet</label>
            <select
              value={form.outlet}
              onChange={(e) => setForm({ ...form, outlet: e.target.value })}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            >
              {OUTLETS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            disabled={!form.name || !form.email}
            onClick={() => onSubmit(form)}
            className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {initial ? "Save Changes" : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function UsersTab() {
  const { users, addUser, updateUser, removeUser } = useSettingsStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<UserAccount | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[15px] font-semibold text-surface-text">Users &amp; Roles</h2>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-1.5 text-[13px] rounded-md px-3 py-1.5 bg-brand-500 text-white hover:bg-brand-600 transition-colors"
        >
          <Plus size={14} /> Add Team Member
        </button>
      </div>
      <p className="text-[12.5px] text-surface-muted mb-5">
        Control who can access the system and what they can do.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-th !pl-0">Name</th>
              <th className="table-th">Role</th>
              <th className="table-th">Outlet</th>
              <th className="table-th">Status</th>
              <th className="table-th">Last Active</th>
              <th className="table-th text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="table-td !pl-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[11px] font-semibold shrink-0">
                      {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-surface-text">{u.name}</p>
                      <p className="text-[11px] text-surface-muted flex items-center gap-1">
                        <Mail size={10} /> {u.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="table-td text-surface-text">{u.role}</td>
                <td className="table-td text-surface-muted">{u.outlet}</td>
                <td className="table-td"><StatusBadge status={u.status} /></td>
                <td className="table-td text-surface-muted">{u.lastActive}</td>
                <td className="table-td text-center">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}
                      className="text-surface-muted hover:text-surface-text transition-colors"
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenuId === u.id && (
                      <div className="absolute right-0 top-6 w-36 bg-white border border-surface-border rounded-md shadow-lg z-10 text-left overflow-hidden">
                        <button
                          onClick={() => { setEditing(u); setShowForm(true); setOpenMenuId(null); }}
                          className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            updateUser(u.id, { status: u.status === "Active" ? "Inactive" : "Active" });
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-gray-50 text-surface-text"
                        >
                          {u.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => { removeUser(u.id); setOpenMenuId(null); }}
                          className="w-full text-left px-3 py-2 text-[12.5px] hover:bg-status-redBg/30 text-status-red"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserFormModal
          initial={editing ?? undefined}
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            if (editing) updateUser(editing.id, data);
            else addUser({ ...data, id: String(Date.now()), lastActive: "Just invited" });
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
