"use client";

import { FileText, Truck, Package, CreditCard, Factory, UserPlus, ArrowLeftRight } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { RECENT_ACTIVITIES_BY_OUTLET } from "@/lib/dashboard-data";

const ICONS = [FileText, Truck, Package, CreditCard, Factory, UserPlus, ArrowLeftRight];
const ICON_COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#16A34A", "#7C3AED", "#2563EB", "#06B6D4"];

export function RecentActivities() {
  const { selectedOutlet } = useUIStore();
  const activities = RECENT_ACTIVITIES_BY_OUTLET[selectedOutlet] || RECENT_ACTIVITIES_BY_OUTLET["All Outlets"];

  return (
    <div className="bg-white rounded-card shadow-card border border-surface-border p-4">
      <h3 className="text-[14px] font-semibold text-surface-text mb-3">Recent Activities</h3>
      <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
        {activities.map((activity, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <div key={idx} className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${ICON_COLORS[idx % ICON_COLORS.length]}1A` }}
              >
                <Icon size={13} style={{ color: ICON_COLORS[idx % ICON_COLORS.length] }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] text-surface-text leading-tight">{activity.text}</p>
                <p className="text-[11px] text-surface-muted mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
