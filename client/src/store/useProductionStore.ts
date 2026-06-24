import { create } from "zustand";
import { PRODUCTION_ORDERS, type ProductionOrder } from "@/lib/production-data";

interface ProductionState {
  orders: ProductionOrder[];
  selectedId: string;
  setSelectedId: (id: string) => void;

  statusFilter: string;
  productFilter: string;
  unitFilter: string;
  searchQuery: string;
  setStatusFilter: (v: string) => void;
  setProductFilter: (v: string) => void;
  setUnitFilter: (v: string) => void;
  setSearchQuery: (v: string) => void;

  currentPage: number;
  pageSize: number;
  setPage: (p: number) => void;

  getFilteredOrders: () => ProductionOrder[];
  getStats: () => {
    total: number;
    inProgress: number;
    completed: number;
    pending: number;
    onHold: number;
  };
  getSelectedOrder: () => ProductionOrder | undefined;
  addOrder: (orderData: Partial<ProductionOrder> & { product: string; unit: string; outlet: string; plannedQty: number; plannedDate: string; notes: string }) => void;
  updateOrder: (id: string, updates: Partial<ProductionOrder>) => void;
  cancelOrder: (id: string) => void;
}

export const useProductionStore = create<ProductionState>((set, get) => ({
  orders: PRODUCTION_ORDERS,
  selectedId: PRODUCTION_ORDERS[0].id,
  setSelectedId: (id) => set({ selectedId: id }),

  statusFilter: "All Status",
  productFilter: "All Products",
  unitFilter: "All Units",
  searchQuery: "",
  setStatusFilter: (v) => set({ statusFilter: v, currentPage: 1 }),
  setProductFilter: (v) => set({ productFilter: v, currentPage: 1 }),
  setUnitFilter: (v) => set({ unitFilter: v, currentPage: 1 }),
  setSearchQuery: (v) => set({ searchQuery: v, currentPage: 1 }),

  currentPage: 1,
  pageSize: 10,
  setPage: (p) => set({ currentPage: p }),

  getFilteredOrders: () => {
    const { orders, statusFilter, productFilter, unitFilter, searchQuery } = get();
    const q = searchQuery.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "All Status" && o.status !== statusFilter) return false;
      if (productFilter !== "All Products" && o.product !== productFilter) return false;
      if (unitFilter !== "All Units" && o.unit !== unitFilter) return false;
      if (q && !o.orderNo.toLowerCase().includes(q) && !o.product.toLowerCase().includes(q)) return false;
      return true;
    });
  },

  getStats: () => {
    const { orders } = get();
    return {
      total: orders.length,
      inProgress: orders.filter((o) => o.status === "In Progress").length,
      completed: orders.filter((o) => o.status === "Completed").length,
      pending: orders.filter((o) => o.status === "Pending").length,
      onHold: orders.filter((o) => o.status === "On Hold").length,
    };
  },

  getSelectedOrder: () => get().orders.find((o) => o.id === get().selectedId),
  addOrder: (orderData) => set((state) => {
    const newOrder: ProductionOrder = {
      id: Math.random().toString(36).substring(7),
      orderNo: `PO-${Math.floor(Math.random() * 10000)}`,
      completedQty: 0,
      status: "Pending",
      startDate: "—",
      expectedCompletion: "—",
      actualCompletion: null,
      createdBy: "Current User",
      createdDate: new Date().toLocaleString(),
      lastUpdated: new Date().toLocaleString(),
      steps: [],
      ...orderData
    };
    return { orders: [newOrder, ...state.orders] };
  }),
  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, ...updates, lastUpdated: new Date().toLocaleString() } : o)
  })),
  cancelOrder: (id) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { 
      ...o, 
      status: "Cancelled" as any, 
      lastUpdated: new Date().toLocaleString(),
      steps: o.steps.map(s => (s.status === "Pending" || s.status === "In Progress") ? { ...s, status: "Cancelled" as any } : s)
    } : o)
  })),
}));
