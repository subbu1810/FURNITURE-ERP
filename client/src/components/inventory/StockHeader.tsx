"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StockHeaderProps {
  onStockIn: () => void;
}

export default function StockHeader({
  onStockIn,
}: StockHeaderProps) {
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Stock List
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Inventory &gt; Stock List
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Outlet */}
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
          <option>HSR Layout Outlet</option>
          <option>Jayanagar</option>
          <option>HBR Layout</option>
          <option>BTM Layout</option>
        </select>

        {/* Notification */}
        <div className="relative">
          <div
            className="relative cursor-pointer"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            <span className="text-xl">🔔</span>

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              5
            </span>
          </div>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                📦 New Stock Received
              </div>

              <div className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                ⚠ Low Stock Alert
              </div>

              <div className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                🚚 Stock Transfer Completed
              </div>

              <div className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                📊 Monthly Inventory Report Ready
              </div>

              <div className="rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                ✅ Stock Audit Completed
              </div>
            </div>
          )}
        </div>

        {/* Admin */}
        <div className="relative">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() =>
              setShowAdminMenu(!showAdminMenu)
            }
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
              A
            </div>

            <span className="font-medium">
              Admin
            </span>
          </div>

          {showAdminMenu && (
            <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div
                className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => router.push("/settings")}
              >
                👤 My Profile
              </div>

              <div
                className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => router.push("/settings")}
              >
                ⚙ Settings
              </div>

              <div
                className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => router.push("/forgot-password")}
              >
                🔐 Change Password
              </div>

              <div
                className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => router.push("/login")}
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="rounded-lg border px-4 py-2 font-medium"
            onClick={() => alert("Export Started")}
          >
            Export
          </button>

          <button
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
            onClick={onStockIn}
          >
            + Stock In
          </button>
        </div>
      </div>
    </div>
  );
}