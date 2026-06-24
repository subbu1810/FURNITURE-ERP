"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import { User, Building2, Store, Users, Bell, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { CompanyTab } from "@/components/settings/CompanyTab";
import { OutletsTab } from "@/components/settings/OutletsTab";
import { UsersTab } from "@/components/settings/UsersTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { SecurityTab } from "@/components/settings/SecurityTab";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company Info", icon: Building2 },
  { id: "outlets", label: "Outlets & Warehouses", icon: Store },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SettingsContent() {
  const searchParams = useSearchParams();
  const paramTab = searchParams.get("tab") as TabId | null;
  const defaultTab = (TABS.some((tab) => tab.id === paramTab) ? paramTab : "profile") as TabId;
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Settings" breadcrumb={["Settings"]} showOutletFilter={false} showDateFilter={false} />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
          {/* Tab nav */}
          <nav className="bg-white rounded-card border border-surface-border shadow-card p-2 h-fit">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-medium text-left transition-colors mb-0.5",
                    isActive
                      ? "bg-brand-50 text-brand-600"
                      : "text-surface-muted hover:bg-gray-50 hover:text-surface-text"
                  )}
                >
                  <Icon size={16} className={isActive ? "text-brand-600" : "text-surface-muted"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tab content */}
          <div className="min-w-0">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "company" && <CompanyTab />}
            {activeTab === "outlets" && <OutletsTab />}
            {activeTab === "users" && <UsersTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "security" && <SecurityTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <React.Suspense fallback={null}>
      <SettingsContent />
    </React.Suspense>
  );
}
