"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, HelpCircle, ChevronDown, Calendar, Store, X, User, Settings, LogOut, Package, ShoppingCart, Truck, IndianRupee } from "lucide-react";
import { useUIStore, OUTLETS } from "@/store/useUIStore";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { STOCK_ITEMS } from "@/lib/inventory-data";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title: string;
  breadcrumb?: string[];
  showOutletFilter?: boolean;
  outletInTopRow?: boolean;
  showDateFilter?: boolean;
  /** Slot rendered in the FILTER row (left side, beside outlet/date) */
  rightSlot?: React.ReactNode;
  /** Slot rendered in the TOP row (right side, beside bell/profile) */
  actionSlot?: React.ReactNode;
}

const DATE_PRESETS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "01 May 2025 - 17 May 2025",
  "This Month",
  "Last Month",
  "Custom Range",
];

type NotifType = "order" | "stock" | "delivery" | "payment" | "offer";

interface AppNotification {
  id: number;
  type: NotifType;
  title: string;
  text: string;
  time: string;
  unread: boolean;
  href: string;
}

const NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    type: "stock",
    title: "Low Stock Alert",
    text: "Dining Table 6 Seater has only 5 units left at Main Warehouse",
    time: "5m ago",
    unread: true,
    href: "/inventory/stock-list",
  },
  {
    id: 2,
    type: "order",
    title: "New Order Received",
    text: "Order #ORD-1248 placed by customer at HSR Layout — ₹42,500",
    time: "32m ago",
    unread: true,
    href: "/orders",
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery Completed",
    text: "DLV-1253 delivered successfully to customer in Koramangala",
    time: "1h ago",
    unread: true,
    href: "/delivery/deliveries",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Received",
    text: "₹1,85,000 received against Invoice #INV-0892 from Sunrise Furnitures",
    time: "2h ago",
    unread: true,
    href: "/accounts",
  },
  {
    id: 5,
    type: "stock",
    title: "Out of Stock",
    text: "Mattress Queen Size is now out of stock at Main Warehouse",
    time: "3h ago",
    unread: false,
    href: "/inventory/stock-list",
  },
  {
    id: 6,
    type: "order",
    title: "Order Cancelled",
    text: "Order #ORD-1239 was cancelled by customer — refund initiated",
    time: "5h ago",
    unread: false,
    href: "/orders",
  },
  {
    id: 7,
    type: "delivery",
    title: "Delivery Scheduled",
    text: "DLV-1260 scheduled for tomorrow, 10:00 AM — Whitefield outlet",
    time: "Yesterday",
    unread: false,
    href: "/delivery/deliveries",
  },
  {
    id: 8,
    type: "offer",
    title: "Supplier Offer",
    text: "Get 12% off on bulk plywood orders from Shree Timber Co. this week",
    time: "Yesterday",
    unread: false,
    href: "/purchases",
  },
];

const NOTIF_ICON: Record<NotifType, any> = {
  order: ShoppingCart,
  stock: Package,
  delivery: Truck,
  payment: IndianRupee,
  offer: Bell,
};

const NOTIF_COLOR: Record<NotifType, string> = {
  order: "text-status-blue bg-status-blueBg",
  stock: "text-status-orange bg-status-orangeBg",
  delivery: "text-status-purple bg-status-purpleBg",
  payment: "text-status-green bg-status-greenBg",
  offer: "text-brand-600 bg-brand-50",
};

const NAV_PAGES = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Sales / POS", href: "/sales-pos" },
  { label: "Orders", href: "/orders" },
  { label: "Stock List", href: "/inventory/stock-list" },
  { label: "Stock In", href: "/inventory/stock-in" },
  { label: "Stock Out", href: "/inventory/stock-out" },
  { label: "Stock Transfer", href: "/inventory/stock-transfer" },
  { label: "Warehouse Stock", href: "/inventory/warehouse-stock" },
  { label: "Purchases", href: "/purchases" },
  { label: "Deliveries", href: "/delivery/deliveries" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export function Topbar({
  title,
  breadcrumb,
  showOutletFilter = true,
  outletInTopRow = false,
  showDateFilter = true,
  rightSlot,
  actionSlot,
}: TopbarProps) {
  const router = useRouter();
  const { selectedOutlet, setSelectedOutlet, dateRangeLabel, setDateRangeLabel } = useUIStore();
  const { profile } = useSettingsStore();

  const [outletOpen, setOutletOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);

  const searchRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const outletRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (outletRef.current && !outletRef.current.contains(e.target as Node)) setOutletOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setDateOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const handleNotifClick = (n: AppNotification) => {
    setNotifications((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
    setBellOpen(false);
    router.push(n.href);
  };

  // Real product matches from inventory data
  const productMatches = searchQuery
    ? STOCK_ITEMS.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barcode.includes(searchQuery)
    ).slice(0, 5)
    : [];

  // Page/nav matches
  const pageMatches = searchQuery
    ? NAV_PAGES.filter((p) => p.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  const hasQuery = searchQuery.trim().length > 0;
  const noResults = hasQuery && productMatches.length === 0 && pageMatches.length === 0;

  const goToProduct = (sku: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/inventory/stock-list?q=${encodeURIComponent(sku)}`);
  };

  const goToPage = (href: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  const handleSignOut = () => {
    setShowSignOutConfirm(false);
    router.push("/login");
  };

  const hasFilterRow = (showOutletFilter && !outletInTopRow) || showDateFilter || rightSlot;

  const OutletDropdown = (
    <div ref={outletRef} className="relative">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOutletOpen((o) => !o);
        }}
        className={cn(
          "flex items-center gap-2 px-4 py-2 border rounded-lg text-[13.5px] font-medium transition-all shadow-sm",
          outletInTopRow
            ? "border-surface-border text-surface-text bg-white hover:bg-gray-50"
            : "border-surface-border text-surface-text bg-white hover:bg-gray-50"
        )}
      >
        <Store size={14} className="text-surface-muted" />
        {selectedOutlet}
        <ChevronDown size={14} className={cn("text-surface-muted transition-transform", outletOpen && "rotate-180")} />
      </button>
      {outletOpen && (
        <div className="absolute mt-2 right-0 w-48 bg-white border border-surface-border rounded-lg shadow-lg z-30 overflow-hidden">
          {OUTLETS.map((outlet) => (
            <button
              type="button"
              key={outlet}
              onClick={(event) => {
                event.stopPropagation();
                setSelectedOutlet(outlet);
                const setWarehouse = useInventoryStore.getState().setWarehouse;
                if (setWarehouse) {
                  let mapped: string = outlet;
                  if (mapped === "All Outlets") {
                    mapped = "All Warehouses";
                  } else if (mapped.endsWith(" Outlet")) {
                    mapped = mapped.replace(" Outlet", "");
                  }
                  setWarehouse(mapped);
                }
                setOutletOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-[13.5px] hover:bg-gray-50 transition-colors",
                outlet === selectedOutlet && "bg-brand-50 text-brand-600 font-medium"
              )}
            >
              {outlet}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="bg-white border-b border-surface-border sticky top-0 z-30">
        {/* ── Top row ── */}
        <div className="flex items-center justify-between h-[72px] px-8">
          {/* Left: title + breadcrumb */}
          <div>
            <h1 className="text-[22px] font-semibold text-surface-text leading-tight">{title}</h1>
            {breadcrumb && (
              <p className="text-[12px] text-surface-muted mt-0.5">{breadcrumb.join("  >  ")}</p>
            )}
          </div>

          {/* Right: action buttons (if any) + icon row */}
          <div className="flex items-center gap-4">
            {/* Page-level action buttons (Export, Stock In, etc.) */}
            {actionSlot && (
              <div className="flex items-center gap-2 pr-4 border-r border-surface-border">
                {actionSlot}
              </div>
            )}

            {showOutletFilter && outletInTopRow && (
              <div className="pr-4 border-r border-surface-border">
                {OutletDropdown}
              </div>
            )}

            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="text-surface-muted hover:text-surface-text transition-colors mt-1"
              >
                <Search size={19} />
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-8 w-80 bg-white border border-surface-border rounded-xl shadow-lg z-40 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-border">
                    <Search size={14} className="text-surface-muted shrink-0" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, SKU, pages…"
                      className="flex-1 text-[13px] outline-none placeholder:text-surface-muted"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}>
                        <X size={13} className="text-surface-muted hover:text-surface-text" />
                      </button>
                    )}
                  </div>
                  <div className="py-1 max-h-80 overflow-y-auto">
                    {!hasQuery && (
                      <p className="text-[11.5px] text-surface-muted px-4 py-3">
                        Search by product name, SKU, barcode, or jump to a page.
                      </p>
                    )}
                    {noResults && (
                      <p className="text-[12px] text-surface-muted px-4 py-3">
                        No results for &ldquo;{searchQuery}&rdquo;
                      </p>
                    )}
                    {productMatches.length > 0 && (
                      <div>
                        <p className="text-[10.5px] font-semibold text-surface-muted uppercase tracking-wide px-4 pt-2 pb-1">
                          Products
                        </p>
                        {productMatches.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => goToProduct(item.sku)}
                            className="w-full text-left px-4 py-2 text-[13px] text-surface-text hover:bg-gray-50 flex items-center justify-between gap-2"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Package size={13} className="text-surface-muted shrink-0" />
                              <span className="truncate">{item.productName}</span>
                            </span>
                            <span className="text-[11px] text-surface-muted shrink-0">{item.sku}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {pageMatches.length > 0 && (
                      <div>
                        <p className="text-[10.5px] font-semibold text-surface-muted uppercase tracking-wide px-4 pt-2 pb-1">
                          Pages
                        </p>
                        {pageMatches.map((p) => (
                          <button
                            key={p.href}
                            onClick={() => goToPage(p.href)}
                            className="w-full text-left px-4 py-2 text-[13px] text-surface-text hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Search size={12} className="text-surface-muted" />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bell */}
            <div ref={bellRef} className="relative mt-1">
              <button
                onClick={() => setBellOpen((o) => !o)}
                className="relative text-surface-muted hover:text-surface-text transition-colors"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-[15px] h-[15px] bg-status-red rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {bellOpen && (
                <div className="absolute right-0 top-8 w-[340px] bg-white border border-surface-border rounded-xl shadow-lg z-40 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
                    <span className="text-[13px] font-semibold text-surface-text">Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[11px] text-brand-500 hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-surface-border/50">
                    {notifications.map((n) => {
                      const Icon = NOTIF_ICON[n.type];
                      return (
                        <button
                          key={n.id}
                          onClick={() => handleNotifClick(n)}
                          className={cn(
                            "w-full text-left px-4 py-3 text-[12.5px] flex items-start gap-2.5",
                            n.unread ? "bg-brand-50" : "bg-white hover:bg-gray-50"
                          )}
                        >
                          <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5", NOTIF_COLOR[n.type])}>
                            <Icon size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className={cn("leading-snug", n.unread ? "text-surface-text font-medium" : "text-surface-muted")}>
                              {n.title}
                            </p>
                            <p className="text-[11.5px] text-surface-muted leading-snug mt-0.5">{n.text}</p>
                            <p className="text-[10.5px] text-surface-muted mt-1">{n.time}</p>
                          </div>
                          {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="px-4 py-2.5 border-t border-surface-border text-center">
                    <button
                      onClick={() => {
                        setBellOpen(false);
                        router.push("/settings?tab=notifications");
                      }}
                      className="text-[12px] text-brand-500 font-medium hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 pl-4 border-l border-surface-border cursor-pointer"
              >
                <div className="w-[30px] h-[30px] rounded-full bg-surface-border text-surface-text flex items-center justify-center text-xs font-semibold overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=f3f4f6&color=1f2937" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <span className="text-[13.5px] font-medium text-surface-text">{profile.name.split(" ")[0]}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-10 w-52 bg-white border border-surface-border rounded-xl shadow-lg z-40 overflow-hidden">
                  <div className="px-4 py-3 border-b border-surface-border">
                    <p className="text-[13px] font-semibold text-surface-text">{profile.name}</p>
                    <p className="text-[11px] text-surface-muted">{profile.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => { setProfileOpen(false); router.push("/settings"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-surface-text hover:bg-gray-50 transition-colors"
                    >
                      <User size={14} className="text-surface-muted" /> My Profile
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); router.push("/settings"); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-surface-text hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={14} className="text-surface-muted" /> Settings
                    </button>
                    <div className="border-t border-surface-border my-1" />
                    <button
                      onClick={() => { setProfileOpen(false); setShowSignOutConfirm(true); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-status-red hover:bg-status-redBg/30 transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Filter row ── */}
      {hasFilterRow && (
        <div className="flex items-center justify-between px-8 py-3 gap-3 bg-white border-b border-surface-border">
          <div className="flex items-center gap-4">
            {showOutletFilter && !outletInTopRow && OutletDropdown}

            {showDateFilter && (
              <div ref={dateRef} className="relative">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setDateOpen((o) => !o);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-surface-border rounded-lg text-[13.5px] font-medium text-surface-text bg-white shadow-sm hover:bg-gray-50 transition-all"
                >
                  <Calendar size={14} className="text-surface-muted" />
                  {dateRangeLabel}
                  <ChevronDown size={14} className={cn("text-surface-muted transition-transform", dateOpen && "rotate-180")} />
                </button>
                {dateOpen && (
                  <div className="absolute mt-2 left-0 w-56 bg-white border border-surface-border rounded-lg shadow-lg z-30 overflow-hidden">
                    {DATE_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={(event) => {
                          event.stopPropagation();
                          setDateRangeLabel(preset);
                          setDateOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2.5 text-[13.5px] hover:bg-gray-50 transition-colors",
                          preset === dateRangeLabel && "bg-brand-50 text-brand-600 font-medium"
                        )}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {rightSlot && <div className="flex items-center gap-3">{rightSlot}</div>}
        </div>
      )}

      {showSignOutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSignOutConfirm(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="p-5">
              <div className="w-11 h-11 rounded-full bg-status-redBg flex items-center justify-center mb-3">
                <LogOut size={18} className="text-status-red" />
              </div>
              <h2 className="text-[15px] font-semibold text-surface-text mb-1">Sign out of Furniture ERP?</h2>
              <p className="text-[13px] text-surface-muted">
                You'll need to sign in again to access your dashboard, orders, and inventory.
              </p>
            </div>
            <div className="flex gap-2 px-5 pb-5">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="flex-1 py-2 rounded-md bg-status-red text-white text-[13px] font-medium hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
