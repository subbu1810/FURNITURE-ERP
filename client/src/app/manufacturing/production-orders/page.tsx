"use client";

import { ClipboardList, Loader2, CheckCircle2, Clock, PauseCircle } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { StatCard } from "@/components/ui/StatCard";
import { ProductionFilterBar } from "@/components/manufacturing/ProductionFilterBar";
import { ProductionOrderList } from "@/components/manufacturing/ProductionOrderList";
import { ProductionOrderDetail } from "@/components/manufacturing/ProductionOrderDetail";
import { useProductionStore } from "@/store/useProductionStore";
import { useUIStore } from "@/store/useUIStore";

export default function ProductionOrdersPage() {
  const { selectedOutlet, dateRangeLabel } = useUIStore();
  const orders = useProductionStore(state => state.orders);
  const getStats = useProductionStore(state => state.getStats);
  const setStatusFilter = useProductionStore(state => state.setStatusFilter);
  const stats = getStats();

  const pct = (n: number) => stats.total > 0 ? `${((n / stats.total) * 100).toFixed(2)}% of total` : "0% of total";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Topbar
        title="Production Orders"
        breadcrumb={["Manufacturing", "Production Orders"]}
        showOutletFilter
        outletInTopRow
        showDateFilter={false}
      />

      <div className="p-6 space-y-4">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={ClipboardList}
            iconColor="#2563EB"
            iconBg="#DBEAFE"
            label="Total Orders"
            value={String(stats.total)}
            onClick={() => setStatusFilter("All Status")}
            link={{ text: "View all orders", href: "#" }}
          />
          <StatCard
            icon={Loader2}
            iconColor="#16A34A"
            iconBg="#DCFCE7"
            label="In Progress"
            value={String(stats.inProgress)}
            sub={{ text: pct(stats.inProgress) }}
            onClick={() => setStatusFilter("In Progress")}
          />
          <StatCard
            icon={CheckCircle2}
            iconColor="#7C3AED"
            iconBg="#EDE9FE"
            label="Completed"
            value={String(stats.completed)}
            sub={{ text: pct(stats.completed) }}
            onClick={() => setStatusFilter("Completed")}
          />
          <StatCard
            icon={Clock}
            iconColor="#F59E0B"
            iconBg="#FEF3C7"
            label="Pending"
            value={String(stats.pending)}
            sub={{ text: pct(stats.pending) }}
            onClick={() => setStatusFilter("Pending")}
          />
          <StatCard
            icon={PauseCircle}
            iconColor="#0891B2"
            iconBg="#CFFAFE"
            label="On Hold"
            value={String(stats.onHold)}
            sub={{ text: pct(stats.onHold) }}
            onClick={() => setStatusFilter("On Hold")}
          />
        </div>

        {/* Filter bar */}
        <ProductionFilterBar />

        {/* Master-detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 items-start">
          <ProductionOrderList />
          <div className="lg:sticky lg:top-[160px]">
            <ProductionOrderDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
