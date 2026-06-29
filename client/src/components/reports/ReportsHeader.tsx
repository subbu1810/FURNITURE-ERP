"use client";

import { useRouter } from "next/navigation";
import {
  exportPdf,
  exportExcel,
  exportCsv,
} from "@/utils/exportReport";

import {
  Bell,
  Download,
  RefreshCw,
  UserCircle2,
} from "lucide-react";

interface ReportsHeaderProps {
  selectedOutlet: string;
  onOutletChange: (value: string) => void;

  selectedDate: string;
  onDateChange: (value: string) => void;

  loading: boolean;
  onRefresh: () => void;

  showNotifications: boolean;
  onToggleNotifications: () => void;

  showProfileMenu: boolean;
  onToggleProfileMenu: () => void;

  showExportMenu: boolean;
onToggleExportMenu: () => void;
}

export default function ReportsHeader({
  selectedOutlet,
  onOutletChange,
  selectedDate,
  onDateChange,
  loading,
  onRefresh,
  showNotifications,
  onToggleNotifications,
  showProfileMenu,
  onToggleProfileMenu,
  showExportMenu,
 onToggleExportMenu,
}: ReportsHeaderProps) {

    const router = useRouter();


  return (
    <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Get insights into your business performance
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Outlet */}
        <select
  value={selectedOutlet}
  onChange={(e) => onOutletChange(e.target.value)}
  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="HSR Layout">HSR Layout</option>
  <option value="Jayanagar">Jayanagar</option>
  <option value="Whitefield">Whitefield</option>
  <option value="Marathahalli">Marathahalli</option>
  <option value="Koramangala">Koramangala</option>
</select>

        {/* Date */}
        <select
  value={selectedDate}
  onChange={(e) => onDateChange(e.target.value)}
  className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none"
>
  <option value="01 May 2025 - 17 May 2025">
    01 May 2025 - 17 May 2025
  </option>

  <option value="18 May 2025 - 31 May 2025">
    18 May 2025 - 31 May 2025
  </option>

  <option value="June 2025">
    June 2025
  </option>

  <option value="This Year">
    This Year
  </option>
</select>

        {/* Refresh */}
        <button
  onClick={onRefresh}
  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
>
  <RefreshCw
    size={18}
    className={loading ? "animate-spin" : ""}
  />
</button>

        {/* Notification */}
       <div className="relative">
  <button
    onClick={onToggleNotifications}
    className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
  >
    <Bell size={18} />

    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
      12
    </span>
  </button>

  {showNotifications && (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-gray-200 bg-white shadow-xl">
      <div className="border-b border-gray-100 p-4">
        <h4 className="font-semibold text-gray-900">
          Notifications
        </h4>
      </div>

      <div className="max-h-80 overflow-y-auto">

        <div className="cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50">
          <p className="font-medium">
            🛒 New Order #1254
          </p>
          <p className="text-xs text-gray-500">
            2 minutes ago
          </p>
        </div>

        <div className="cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50">
          <p className="font-medium">
            💰 Payment Received
          </p>
          <p className="text-xs text-gray-500">
            10 minutes ago
          </p>
        </div>

        <div className="cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50">
          <p className="font-medium">
            📦 Low Stock Alert
          </p>
          <p className="text-xs text-gray-500">
            30 minutes ago
          </p>
        </div>

        <div className="cursor-pointer p-4 hover:bg-gray-50">
          <p className="font-medium">
            🚚 Delivery Completed
          </p>
          <p className="text-xs text-gray-500">
            1 hour ago
          </p>
        </div>

      </div>

      <button className="w-full border-t border-gray-100 p-3 text-sm font-medium text-blue-600 hover:bg-blue-50">
        View All Notifications
      </button>
    </div>
  )}
</div>

        {/* Admin */}
        <div className="relative">
  <button
    onClick={onToggleProfileMenu}
    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
  >
    <UserCircle2
      size={34}
      className="text-gray-500"
    />

    <div className="text-left">
      <h5 className="text-sm font-semibold">
        Admin
      </h5>

      <p className="text-xs text-gray-500">
        Super Admin
      </p>
    </div>
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">

      <button
  onClick={() => router.push("/settings")}
  className="w-full border-b px-4 py-3 text-left hover:bg-gray-50"
>
  👤 My Profile
</button>

      <button
  onClick={() => router.push("/settings")}
  className="w-full border-b px-4 py-3 text-left hover:bg-gray-50"
>
  ⚙  Settings
</button>

      <button
  onClick={() => router.push("/forgot-password")}
  className="w-full border-b px-4 py-3 text-left hover:bg-gray-50"
>
  🔒 Change Password
</button>

      <button
  onClick={() => router.push("/login")}
  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
>
  🚪 Logout
</button>

    </div>
  )}
</div>

        {/* Export */}
       <div className="relative">
  <button
    onClick={onToggleExportMenu}
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
  >
    <Download size={18} />
    Export Report
  </button>

  {showExportMenu && (
    <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-gray-200 bg-white shadow-xl">

      <button
  onClick={exportPdf}
  className="w-full border-b px-4 py-3 text-left hover:bg-gray-50"
>
  📄 Export PDF
</button>

      <button
  onClick={exportExcel}
  className="w-full border-b px-4 py-3 text-left hover:bg-gray-50"
>
  📊 Export Excel
</button>

      <button
  onClick={exportCsv}
  className="w-full px-4 py-3 text-left hover:bg-gray-50"
>
  📑 Export CSV
</button>

    </div>
  )}
</div>
      </div>
    </div>
  );
}