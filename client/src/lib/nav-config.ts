import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Boxes,
  Factory,
  Truck,
  Wrench,
  ReceiptText,
  CreditCard,
  BarChart3,
  Layers,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Sales / POS",
    href: "/sales-pos",
    icon: ShoppingCart,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    label: "Inventory",
    href: "/inventory/stock-list",
    icon: Boxes,
    children: [
      { label: "Stock List", href: "/inventory/stock-list" },
      { label: "Stock In", href: "/inventory/stock-in" },
      { label: "Stock Out", href: "/inventory/stock-out" },
      { label: "Stock Transfer", href: "/inventory/stock-transfer" },
      { label: "Stock Adjustment", href: "/inventory/stock-adjustment" },
      { label: "Warehouse Stock", href: "/inventory/warehouse-stock" },
    ],
  },
  {
    label: "Manufacturing",
    href: "/manufacturing/production-orders",
    icon: Factory,
    children: [
      { label: "Production Orders", href: "/manufacturing/production-orders" },
      { label: "BOM", href: "/manufacturing/bom" },
      { label: "Work Orders", href: "/manufacturing/work-orders" },
      { label: "Material Issue", href: "/manufacturing/material-issue" },
      { label: "Work In Progress", href: "/manufacturing/wip" },
      { label: "Finished Goods", href: "/manufacturing/finished-goods" },
      { label: "QC Check", href: "/manufacturing/qc-check" },
    ],
  },
  {
    label: "Delivery",
    href: "/delivery/deliveries",
    icon: Truck,
  },
  {
    label: "Installation",
    href: "/installation/installations",
    icon: Wrench,
  },
  {
    label: "Purchases",
    href: "/purchases",
    icon: ReceiptText,
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: CreditCard,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    label: "Masters",
    href: "/masters",
    icon: Layers,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
