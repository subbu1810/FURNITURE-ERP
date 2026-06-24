"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { SaveBar } from "./SaveBar";

export function CompanyTab() {
  const { company, updateCompany } = useSettingsStore();
  const [form, setForm] = useState(company);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setForm((prev) => ({ ...prev, logoUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateCompany(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (label: string, key: keyof typeof form, full = false) => (
    <div className={`space-y-1 ${full ? "sm:col-span-2" : ""}`}>
      <label className="text-[12px] font-medium text-surface-text">{label}</label>
      <input
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <h2 className="text-[15px] font-semibold text-surface-text mb-1">Company Information</h2>
      <p className="text-[12.5px] text-surface-muted mb-5">
        This information appears on invoices, purchase orders, and customer-facing documents.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-lg bg-gray-100 border border-surface-border flex items-center justify-center overflow-hidden">
          {form.logoUrl ? (
            <img src={form.logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-surface-muted text-center px-1">Logo</span>
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-[12.5px] border border-surface-border rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors"
          >
            <Upload size={13} className="text-surface-muted" />
            Upload Logo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleLogoUpload(event.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("Business Name", "businessName", true)}
        {field("GSTIN", "gstin")}
        {field("PAN", "pan")}
        {field("Registered Address", "address", true)}
        {field("City", "city")}
        {field("State", "state")}
        {field("Pincode", "pincode")}
        {field("Business Phone", "phone")}
        {field("Business Email", "email")}
      </div>

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
