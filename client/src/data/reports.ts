import {
  TrendingUp,
  Sofa,
  Package,
  Truck,
  Wrench,
  FileText,
  Warehouse,
  Factory,
  IndianRupee,
  ShoppingCart,
  Briefcase,
  Wallet,
  Users,
} from "lucide-react";

import {
  KPIItem,
  RevenueItem,
  CategoryItem,
  OutletItem,
  OrderStatusItem,
  MonthlyTrendItem,
  ProductItem,
  InsightItem,
  ShortcutItem,
} from "@/types/report";




export const kpiData: KPIItem[] = [
  {
    title: "Total Revenue",
    value: "₹ 1,24,58,600",
    change: "↑ 18.6% vs previous period",
    icon: IndianRupee,
    color: "bg-blue-500",
  },
  {
    title: "Total Orders",
    value: "352",
    change: "↑ 12.4% vs previous period",
    icon: ShoppingCart,
    color: "bg-green-500",
  },
  {
    title: "Gross Profit",
    value: "₹ 28,76,450",
    change: "↑ 16.2%",
    icon: Briefcase,
    color: "bg-purple-500",
  },
  {
    title: "Net Profit",
    value: "₹ 14,68,820",
    change: "↑ 14.8%",
    icon: Wallet,
    color: "bg-orange-500",
  },
  {
    title: "Customers",
    value: "1,285",
    change: "↑ 10.3%",
    icon: Users,
    color: "bg-cyan-500",
  },
];

export const revenueData = {
  Daily: [
    { name: "01 May", revenue: 30, profit: 12 },
    { name: "03 May", revenue: 35, profit: 18 },
    { name: "05 May", revenue: 28, profit: 14 },
    { name: "07 May", revenue: 34, profit: 19 },
    { name: "09 May", revenue: 40, profit: 22 },
    { name: "11 May", revenue: 32, profit: 15 },
    { name: "13 May", revenue: 38, profit: 20 },
    { name: "15 May", revenue: 36, profit: 18 },
    { name: "17 May", revenue: 43, profit: 21 },
  ],

  Weekly: [
    { name: "Week 1", revenue: 180, profit: 72 },
    { name: "Week 2", revenue: 210, profit: 84 },
    { name: "Week 3", revenue: 250, profit: 100 },
    { name: "Week 4", revenue: 290, profit: 120 },
  ],

  Monthly: [
    { name: "Jan", revenue: 820, profit: 320 },
    { name: "Feb", revenue: 910, profit: 350 },
    { name: "Mar", revenue: 980, profit: 380 },
    { name: "Apr", revenue: 1050, profit: 420 },
    { name: "May", revenue: 1240, profit: 480 },
  ],
};

export const categoryData: CategoryItem[] = [
  { name: "Sofas", value: 32.6 },
  { name: "Beds", value: 21.8 },
  { name: "Dining", value: 17.4 },
  { name: "Wardrobes", value: 12.6 },
  { name: "Tables", value: 8.9 },
  { name: "Others", value: 6.7 },
];

export const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#94a3b8",
];

export const outletData = {
  "This Month": [
    { name: "HSR Layout", sales: 48 },
    { name: "Jayanagar", sales: 28 },
    { name: "Whitefield", sales: 19 },
    { name: "Marathahalli", sales: 15 },
    { name: "Koramangala", sales: 12 },
  ],

  "Last Month": [
    { name: "HSR Layout", sales: 40 },
    { name: "Jayanagar", sales: 22 },
    { name: "Whitefield", sales: 16 },
    { name: "Marathahalli", sales: 12 },
    { name: "Koramangala", sales: 10 },
  ],

  "This Year": [
    { name: "HSR Layout", sales: 520 },
    { name: "Jayanagar", sales: 410 },
    { name: "Whitefield", sales: 380 },
    { name: "Marathahalli", sales: 290 },
    { name: "Koramangala", sales: 250 },
  ],
};

export const orderStatusData: OrderStatusItem[] = [
  { name: "Delivered", value: 184 },
  { name: "In Transit", value: 68 },
  { name: "Pending", value: 54 },
  { name: "Cancelled", value: 28 },
  { name: "Failed", value: 18 },
];

export const STATUS_COLORS = [
  "#22c55e",
  "#2563eb",
  "#f59e0b",
  "#ef4444",
  "#94a3b8",
];

export const monthlyTrendData = {
  Revenue: [
    { month: "Jan", revenue: 45 },
    { month: "Feb", revenue: 60 },
    { month: "Mar", revenue: 80 },
    { month: "Apr", revenue: 110 },
    { month: "May", revenue: 125 },
    { month: "Jun", revenue: 70 },
    { month: "Jul", revenue: 50 },
    { month: "Aug", revenue: 65 },
    { month: "Sep", revenue: 75 },
    { month: "Oct", revenue: 95 },
    { month: "Nov", revenue: 110 },
    { month: "Dec", revenue: 130 },
  ],

  Profit: [
    { month: "Jan", revenue: 20 },
    { month: "Feb", revenue: 28 },
    { month: "Mar", revenue: 35 },
    { month: "Apr", revenue: 48 },
    { month: "May", revenue: 55 },
    { month: "Jun", revenue: 32 },
    { month: "Jul", revenue: 25 },
    { month: "Aug", revenue: 30 },
    { month: "Sep", revenue: 38 },
    { month: "Oct", revenue: 45 },
    { month: "Nov", revenue: 50 },
    { month: "Dec", revenue: 60 },
  ],
};

export const bestSellingProducts: ProductItem[] = [
  {
    product: "3 Seater Sofa",
    category: "Sofas",
    qty: 156,
    revenue: "₹19,68,000",
  },
  {
    product: "King Size Bed",
    category: "Beds",
    qty: 112,
    revenue: "₹15,23,200",
  },
  {
    product: "Dining Table",
    category: "Dining",
    qty: 98,
    revenue: "₹11,76,000",
  },
  {
    product: "Wardrobe 3 Door",
    category: "Wardrobes",
    qty: 86,
    revenue: "₹9,46,000",
  },
  {
    product: "Center Table",
    category: "Tables",
    qty: 74,
    revenue: "₹6,35,000",
  },
];

export const quickInsights: InsightItem[] = [
  {
    title: "Revenue this month is 18.6% higher",
    icon: TrendingUp,
  },
  {
    title: "Sofas are the top category",
    icon: Sofa,
  },
  {
    title: "Inventory worth ₹2,34,56,780",
    icon: Package,
  },
  {
    title: "32 deliveries in transit",
    icon: Truck,
  },
  {
    title: "18 installations scheduled",
    icon: Wrench,
  },
];

export const reportShortcuts: ShortcutItem[] = [
  {
    title: "Sales Report",
    icon: FileText,
  },
  {
    title: "Inventory Report",
    icon: Warehouse,
  },
  {
    title: "Production Report",
    icon: Factory,
  },
  {
    title: "Delivery Report",
    icon: Truck,
  },
  {
    title: "Installation Report",
    icon: Wrench,
  },
  {
    title: "Financial Report",
    icon: IndianRupee,
  },
];