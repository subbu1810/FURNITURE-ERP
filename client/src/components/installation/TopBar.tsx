"use client";

import Image from "next/image";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  warehouse: string;
  setWarehouse: (value: string) => void;
}

export default function TopBar({
  warehouse,
  setWarehouse,
}: TopBarProps) {
      const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const adminRef = useRef<HTMLDivElement>(null);

  const notifications = [
    "New Installation Added",
    "INS-1256 Completed",
    "Installation Scheduled",
    "Installer Assigned",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        adminRef.current &&
        !adminRef.current.contains(event.target as Node)
      ) {
        setShowAdminMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Installation Management
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Installation &gt; Installations
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Warehouse */}
        <select
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option>HSR Layout Warehouse</option>
          <option>Whitefield Warehouse</option>
          <option>Marathahalli Warehouse</option>
          <option>Koramangala Warehouse</option>
        </select>

        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative"
          >
            <Bell className="h-6 w-6 cursor-pointer text-gray-700 hover:text-blue-600" />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications.length}
            </span>
          </button>

          {showNotifications && (
          <div
  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-[9999]"
>
  <div className="border-b bg-gray-50 px-4 py-3 font-semibold">
    Notifications
  </div>

  {notifications.map((item, index) => (
    <button
      key={index}
      className="block w-full border-b px-4 py-3 text-left text-sm hover:bg-gray-100"
    >
      {item}
    </button>
  ))}

  <button
    className="block w-full px-4 py-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-50"
  >
    View All Notifications
  </button>
</div>
          )}
        </div>

        {/* Admin */}
        <div className="relative" ref={adminRef}>
          <button
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/admin.png"
              alt="Admin"
              width={40}
              height={40}
              className="rounded-full border"
            />

            <span className="font-medium">Admin</span>

            <ChevronDown className="h-4 w-4" />
          </button>

          {showAdminMenu && (
  <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl z-[9999]">

    {/* User Info */}
    <div className="border-b bg-gray-50 px-4 py-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Admin User
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        admin@furnitureerp.in
      </p>
    </div>

    {/* Profile */}
    <button
      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
      onClick={() => router.push("/settings")}
    >
      <User className="h-4 w-4" />
      My Profile
    </button>

    {/* Settings */}
    <button
      className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
      onClick={() => router.push("/settings")}
    >
      <Settings className="h-4 w-4" />
      Settings
    </button>

    {/* Sign Out */}
    <button
      className="flex w-full items-center gap-3 border-t px-4 py-3 text-sm text-red-600 hover:bg-red-50"
      onClick={() => {
        localStorage.removeItem("token");
        router.push("/login");
      }}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </button>
  </div>
)}
        </div>
      </div>
    </div>
  );
}