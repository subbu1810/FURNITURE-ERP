"use client";

import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { SalesOverviewChart } from "@/components/dashboard/SalesOverviewChart";
import { SalesByCategoryChart } from "@/components/dashboard/SalesByCategoryChart";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { TopOutletsTable, StockSummaryWidget, ProfitLossWidget } from "@/components/dashboard/DashboardWidgets";
import { useUIStore } from "@/store/useUIStore";
import { STAT_CARD_METRICS_BY_OUTLET } from "@/lib/dashboard-data";
import { ShoppingCart, ClipboardList, IndianRupee, Truck, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { selectedOutlet } = useUIStore();
  const outletMetrics = STAT_CARD_METRICS_BY_OUTLET[selectedOutlet] || STAT_CARD_METRICS_BY_OUTLET["All Outlets"];
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Dashboard" />

      <div className="p-6 space-y-5">
        {/* Stat cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <StatCard
            icon={ShoppingCart}
            iconColor="#2563EB"
            iconBg="#DBEAFE"
            label="Total Sales"
            value={outletMetrics.sales}
            sub={{ text: "↑ 12.5% vs last month", trend: "up" }}
            link={{ text: "View sales report", href: "/sales-pos" }}
          />
          <StatCard
            icon={ClipboardList}
            iconColor="#16A34A"
            iconBg="#DCFCE7"
            label="Total Orders"
            value={outletMetrics.orders}
            sub={{ text: "↑ 8.2% vs last month", trend: "up" }}
            link={{ text: "View orders", href: "/orders" }}
          />
          <StatCard
            icon={IndianRupee}
            iconColor="#7C3AED"
            iconBg="#EDE9FE"
            label="Total Profit"
            value={outletMetrics.profit}
            sub={{ text: "↑ 15.3% vs last month", trend: "up" }}
            link={{ text: "View profit details", href: "/reports" }}
          />
          <StatCard
            icon={Truck}
            iconColor="#F59E0B"
            iconBg="#FEF3C7"
            label="Pending Deliveries"
            value={outletMetrics.pendingDeliveries}
            sub={{ text: "↓ 4.6% vs last month", trend: "down" }}
            link={{ text: "View deliveries", href: "/delivery/deliveries" }}
          />
          <StatCard
            icon={AlertTriangle}
            iconColor="#DC2626"
            iconBg="#FEE2E2"
            label="Low Stock Items"
            value={outletMetrics.lowStockItems}
            link={{ text: "View details", href: "/inventory/stock-list" }}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SalesOverviewChart />
          </div>
          <SalesByCategoryChart />
        </div>

        {/* Recent activities row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TopOutletsTable />
          </div>
          <RecentActivities />
        </div>

        {/* Stock summary + P&L */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StockSummaryWidget />
          <ProfitLossWidget />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-surface-muted pt-2 pb-4">
          <span>© 2025 Furniture ERP. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </div>
      </div>
    </div>
  );
}
