"use client";

import { useState, useRef } from "react";
import { Camera, Check } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";

export function ProfileTab() {
  const { profile, updateProfile } = useSettingsStore();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, avatar: imageUrl });
    }
  };

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <h2 className="text-[15px] font-semibold text-surface-text mb-1">My Profile</h2>
      <p className="text-[12.5px] text-surface-muted mb-5">
        Update your personal information and how others see you across the app.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center text-lg font-semibold overflow-hidden">
            {form.avatar ? (
              <img src={form.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              form.initials
            )}
          </div>
          {isEditing && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <button
                title="Change photo"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-surface-border flex items-center justify-center hover:bg-gray-50 z-10"
              >
                <Camera size={12} className="text-surface-muted" />
              </button>
            </>
          )}
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
            disabled={!isEditing}
            className={`w-full text-[13px] border border-surface-border rounded-md px-3 py-2 ${!isEditing ? "bg-gray-50 text-surface-muted cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"}`}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Role</label>
          <input
            value={form.role}
            disabled
            className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 bg-gray-50 text-surface-muted cursor-not-allowed"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={!isEditing}
            className={`w-full text-[13px] border border-surface-border rounded-md px-3 py-2 ${!isEditing ? "bg-gray-50 text-surface-muted cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"}`}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[12px] font-medium text-surface-text">Phone Number</label>
          <input
            type="text"
            value={form.phone}
            maxLength={10}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, '');
              setForm({ ...form, phone: onlyNums });
            }}
            disabled={!isEditing}
            className={`w-full text-[13px] border border-surface-border rounded-md px-3 py-2 ${!isEditing ? "bg-gray-50 text-surface-muted cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-surface-border mt-5">
        <button
          onClick={isEditing ? handleSave : undefined}
          disabled={!isEditing}
          className="px-4 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          Save Changes
        </button>

        {isEditing ? (
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md bg-white border border-surface-border text-surface-text text-[13px] font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-md bg-white border border-surface-border text-surface-text text-[13px] font-medium hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
        )}

        {!isEditing && saved && (
          <div className="flex items-center gap-1.5 text-[12.5px] text-status-green">
            <Check size={14} /> Saved
          </div>
        )}
      </div>
    </div>
  );
}
