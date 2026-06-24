"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, Sofa } from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav-config";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, expandedGroups, toggleGroup } = useUIStore();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 bg-[#0F172A] text-white shrink-0 transition-all duration-200",
        sidebarCollapsed ? "w-[76px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-20 border-b border-white/5 shrink-0">
        <Sofa size={24} className="text-white shrink-0" />
        {!sidebarCollapsed && (
          <span className="font-bold text-[16px] tracking-wider truncate text-white">FURNITURE ERP</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.children?.some((c) => pathname === c.href) ?? false) ||
            (item.href !== "/" && pathname.startsWith(item.href.split("/").slice(0, 2).join("/")) && item.href.length > 1 && pathname.startsWith("/" + item.href.split("/")[1]));

          const isExactActive = pathname === item.href;
          const hasActiveChild = item.children?.some((c) => pathname === c.href);
          const expanded = expandedGroups[item.label] ?? false;

          if (item.children) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition-colors",
                    hasActiveChild || expanded
                      ? "bg-white/5 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={cn("transition-transform shrink-0", expanded && "rotate-180")}
                      />
                    </>
                  )}
                </button>
                {!sidebarCollapsed && expanded && (
                  <div className="mt-0.5 ml-[26px] border-l border-white/10 pl-3 space-y-0.5">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-md text-[13px] transition-colors truncate",
                            childActive
                              ? "bg-[#2563EB] text-white font-medium"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition-colors",
                isExactActive
                  ? "bg-[#2563EB] text-white font-medium"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 shrink-0">
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-xs font-semibold shrink-0">
            S
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium truncate">Sunrise Furnitures Pvt. Ltd.</p>
              <p className="text-[11px] text-white/50 truncate">Super Admin</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[12px] text-white/60 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ChevronLeft size={14} className={cn("transition-transform", sidebarCollapsed && "rotate-180")} />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
