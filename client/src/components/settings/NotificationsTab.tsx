"use client";

import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { cn } from "@/lib/utils";
import { SaveBar } from "./SaveBar";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-10 h-5.5 rounded-full relative transition-colors shrink-0",
        checked ? "bg-brand-500" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full transition-transform",
          checked && "translate-x-4.5"
        )}
      />
    </button>
  );
}

export function NotificationsTab() {
  const { notifications, updateNotifications } = useSettingsStore();
  const [form, setForm] = useState(notifications);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateNotifications(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const row = (key: keyof typeof form, label: string, desc: string) => (
    <div className="flex items-center justify-between py-3 border-b border-surface-border/60 last:border-0">
      <div>
        <p className="text-[13px] font-medium text-surface-text">{label}</p>
        <p className="text-[11.5px] text-surface-muted">{desc}</p>
      </div>
      <Toggle checked={form[key]} onChange={() => setForm({ ...form, [key]: !form[key] })} />
    </div>
  );

  return (
    <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
      <h2 className="text-[15px] font-semibold text-surface-text mb-1">Notification Preferences</h2>
      <p className="text-[12.5px] text-surface-muted mb-3">
        Choose what you get notified about and how.
      </p>

      <p className="text-[12px] font-semibold text-surface-text mt-4 mb-1">Activity Alerts</p>
      {row("lowStockAlerts", "Low Stock Alerts", "Get notified when an item falls below its reorder level")}
      {row("orderUpdates", "Order Updates", "New orders, order status changes, and cancellations")}
      {row("deliveryUpdates", "Delivery Updates", "Delivery scheduled, dispatched, and completed")}
      {row("paymentAlerts", "Payment Alerts", "Payments received, due, or failed")}
      {row("promotionalOffers", "Promotional Offers", "Updates about offers from suppliers and partners")}

      <p className="text-[12px] font-semibold text-surface-text mt-5 mb-1">Delivery Channels</p>
      {row("pushNotifications", "Push Notifications", "Show alerts inside the app (bell icon)")}
      {row("emailDigest", "Email Digest", "Daily summary email of important activity")}
      {row("smsAlerts", "SMS Alerts", "Critical alerts via SMS to your registered number")}

      <SaveBar onSave={handleSave} saved={saved} />
    </div>
  );
}
