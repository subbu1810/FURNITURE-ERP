import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STOCK_ITEMS, type StockItem, type StockStatus } from "@/lib/inventory-data";

interface InventoryState {
  items: StockItem[];

  // filters
  searchQuery: string;
  category: string;
  warehouse: string;
  location: string;
  status: string;
  currentPage: number;
  pageSize: number;

  // selection
  selectedIds: Set<string>;

  setSearchQuery: (q: string) => void;
  setCategory: (v: string) => void;
  setWarehouse: (v: string) => void;
  setLocation: (v: string) => void;
  setStatus: (v: string) => void;
  setPage: (p: number) => void;
  resetFilters: () => void;

  toggleSelect: (id: string) => void;
  toggleSelectAll: (ids: string[]) => void;
  clearSelection: () => void;

  createItem: (item: Omit<StockItem, "id">) => void;
  addStock: (sku: string, qty: number) => void;
  updateItem: (id: string, updates: Partial<StockItem>) => void;
  deleteItem: (id: string) => void;

  getFilteredItems: () => StockItem[];
  getStats: () => {
    totalSKUs: number;
    totalItems: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    stockValue: number;
  };
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: STOCK_ITEMS,

      searchQuery: "",
      category: "All Categories",
      warehouse: "All Warehouses",
      location: "All Locations",
      status: "All Status",
      currentPage: 1,
      pageSize: 10,

      selectedIds: new Set<string>(),

      setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
      setCategory: (v) => set({ category: v, currentPage: 1 }),
      setWarehouse: (v) => set({ warehouse: v, currentPage: 1 }),
      setLocation: (v) => set({ location: v, currentPage: 1 }),
      setStatus: (v) => set({ status: v, currentPage: 1 }),
      setPage: (p) => set({ currentPage: p }),
      resetFilters: () =>
        set({
          searchQuery: "",
          category: "All Categories",
          warehouse: "All Warehouses",
          location: "All Locations",
          status: "All Status",
          currentPage: 1,
        }),

      toggleSelect: (id) =>
        set((state) => {
          const next = new Set(state.selectedIds);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { selectedIds: next };
        }),

      toggleSelectAll: (ids) =>
        set((state) => {
          const allSelected = ids.every((id) => state.selectedIds.has(id));
          if (allSelected) {
            const next = new Set(state.selectedIds);
            ids.forEach((id) => next.delete(id));
            return { selectedIds: next };
          }
          const next = new Set(state.selectedIds);
          ids.forEach((id) => next.add(id));
          return { selectedIds: next };
        }),

      clearSelection: () => set({ selectedIds: new Set() }),

      createItem: (item) =>
        set((state) => {
          const newItem = {
            ...item,
            id: Date.now().toString(),
          } as StockItem;
          return { items: [newItem, ...state.items] };
        }),

      addStock: (sku: string, qty: number) =>
        set((state) => {
          const nextItems = state.items.map((item) => {
            if (item.sku === sku) {
              const newQty = item.availableQty + qty;
              let newStatus = item.status;
              if (newQty <= 0) newStatus = "Out of Stock";
              else if (newQty < 10) newStatus = "Low Stock";
              else newStatus = "In Stock";
              return { ...item, availableQty: newQty, status: newStatus };
            }
            return item;
          });
          return { items: nextItems };
        }),

      updateItem: (id: string, updates: Partial<StockItem>) =>
        set((state) => {
          const nextItems = state.items.map((item) => {
            if (item.id === id) {
              const updated = { ...item, ...updates };
              if (updates.availableQty !== undefined) {
                if (updated.availableQty <= 0) updated.status = "Out of Stock";
                else if (updated.availableQty < 10) updated.status = "Low Stock";
                else updated.status = "In Stock";
              }
              return updated;
            }
            return item;
          });
          return { items: nextItems };
        }),

      deleteItem: (id: string) =>
        set((state) => ({ items: state.items.filter(i => i.id !== id) })),

      getFilteredItems: () => {
        const { items, searchQuery, category, warehouse, location, status } = get();
        const q = searchQuery.trim().toLowerCase();

        return items.filter((item) => {
          if (category !== "All Categories" && item.category !== category) return false;
          if (warehouse !== "All Warehouses" && item.warehouse !== warehouse) return false;
          if (location !== "All Locations" && item.location !== location) return false;
          if (status !== "All Status" && item.status !== (status as StockStatus)) return false;
          if (q) {
            const haystack = `${item.productName} ${item.sku} ${item.barcode}`.toLowerCase();
            if (!haystack.includes(q)) return false;
          }
          return true;
        });
      },

      getStats: () => {
        const filteredItems = get().getFilteredItems();
        const totalSKUs = filteredItems.length;
        const totalItems = filteredItems.reduce((sum, i) => sum + i.availableQty, 0);
        const inStock = filteredItems.filter((i) => i.status === "In Stock").reduce((s, i) => s + i.availableQty, 0);
        const lowStock = filteredItems.filter((i) => i.status === "Low Stock").length;
        const outOfStock = filteredItems.filter((i) => i.status === "Out of Stock").length;
        const stockValue = filteredItems.reduce((sum, i) => sum + i.stockValue, 0);
        return { totalSKUs, totalItems, inStock, lowStock, outOfStock, stockValue };
      },
    }),
    {
      name: "furniture-inventory-storage",
      version: 1, // Clear cache and load new image data
      migrate: (persistedState: any, version: number) => {
        // If migrating from an older version, wipe the cache and use fresh data
        if (version === 0) {
          return { items: STOCK_ITEMS };
        }
        return persistedState as any;
      },
      partialize: (state) => ({ items: state.items }), // Only persist the items array
    }
  )
);
