import { LucideIcon } from "lucide-react";

export interface KPIItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export interface RevenueItem {
  name: string;
  revenue: number;
  profit: number;
}

export interface CategoryItem {
  name: string;
  value: number;
}

export interface OutletItem {
  name: string;
  sales: number;
}

export interface OrderStatusItem {
  name: string;
  value: number;
}

export interface MonthlyTrendItem {
  month: string;
  revenue: number;
}

export interface ProductItem {
  product: string;
  category: string;
  qty: number;
  revenue: string;
}

export interface InsightItem {
  title: string;
  icon: LucideIcon;
}

export interface ShortcutItem {
  title: string;
  icon: LucideIcon;
}