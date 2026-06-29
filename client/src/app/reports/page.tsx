"use client";


import { useState } from "react";

import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsTabs from "@/components/reports/ReportsTabs";
import KPISection from "@/components/reports/KPISection";
import { kpiData } from "@/data/reports";
import RevenueChart from "@/components/reports/RevenueChart";
import { revenueData } from "@/data/reports";
import CategoryChart from "@/components/reports/CategoryChart";
import { categoryData } from "@/data/reports";
import OutletChart from "@/components/reports/OutletChart";
import { outletData } from "@/data/reports";
import OrderStatus from "@/components/reports/OrderStatus";
import { orderStatusData } from "@/data/reports";
import MonthlyTrend from "@/components/reports/MonthlyTrend";
import { monthlyTrendData } from "@/data/reports";
import BestSellingProducts from "@/components/reports/BestSellingProducts";
import { bestSellingProducts } from "@/data/reports";
import QuickInsights from "@/components/reports/QuickInsights";
import { quickInsights } from "@/data/reports";
import ReportShortcuts from "@/components/reports/ReportShortcuts";
import { reportShortcuts } from "@/data/reports";


// import "./page.css";


function ReportsAnalytics() {

    const [period, setPeriod] = useState("Daily");

     const [outletPeriod, setOutletPeriod] =
    useState("This Month");

    const [trendType, setTrendType] =
  useState("Revenue");

  const [selectedOutlet, setSelectedOutlet] =
  useState("HSR Layout");

  const [selectedDate, setSelectedDate] = useState(
  "01 May 2025 - 17 May 2025"
);

const [loading, setLoading] = useState(false);

const [showNotifications, setShowNotifications] =
  useState(false);

  const [showProfileMenu, setShowProfileMenu] =
  useState(false);

  const [showExportMenu, setShowExportMenu] =
  useState(false);


const handleRefresh = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
  <ReportsHeader
  selectedOutlet={selectedOutlet}
  onOutletChange={setSelectedOutlet}
  selectedDate={selectedDate}
  onDateChange={setSelectedDate}
  loading={loading}
  onRefresh={handleRefresh}
  showNotifications={showNotifications}
  onToggleNotifications={() =>
    setShowNotifications(!showNotifications)
  }
  showProfileMenu={showProfileMenu}
  onToggleProfileMenu={() =>
    setShowProfileMenu(!showProfileMenu)
  }
  showExportMenu={showExportMenu}
  onToggleExportMenu={() =>
    setShowExportMenu(!showExportMenu)
  }
/>

      {/* Tabs */}
      <ReportsTabs />

      {/* KPI Cards */}
      <KPISection data={kpiData} />


<div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4 items-stretch">
  <div className="xl:col-span-2">
   <RevenueChart
  data={revenueData[period as keyof typeof revenueData]}
  period={period}
  onPeriodChange={setPeriod}
/>
  </div>

  <CategoryChart data={categoryData} />

  <OutletChart
  data={outletData[outletPeriod as keyof typeof outletData]}
  period={outletPeriod}
  onPeriodChange={setOutletPeriod}
/>
</div>

{/* Second Row */}
<div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

<OrderStatus data={orderStatusData} />

 <MonthlyTrend
  data={
    monthlyTrendData[
      trendType as keyof typeof monthlyTrendData
    ]
  }
  trendType={trendType}
  onTrendTypeChange={setTrendType}
/>

 <BestSellingProducts data={bestSellingProducts} />

</div>

<QuickInsights data={quickInsights} />

<ReportShortcuts data={reportShortcuts} />

    </div>
  );
}

export default ReportsAnalytics;