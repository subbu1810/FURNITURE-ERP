"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { SaveBar } from "./SaveBar";

export function ProfileTab() {
  const { profile, updateProfile } = useSettingsStore();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <h2 className="text-[15px] font-semibold text-surface-text mb-1">My Profile</h2>
      <p className="text-[12.5px] text-surface-muted mb-5">
        Update your personal information and how others see you across the app.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center text-lg font-semibold">
            {form.initials}
          </div>
          <button
            title="Change photo"
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-surface-border flex items-center justify-center hover:bg-gray-50"
          >
            <Camera size={12} className="text-surface-muted" />
          </button>
        </div>
        <div>
          <p className="text-[13px] font-medium text-surface-text">{form.name}</p>
          <p className="text-[12px] text-surface-muted">{form.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Role</label>
          <input
            value={form.role}
            disabled
            className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-gray-50 text-surface-muted"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
