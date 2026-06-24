import { create } from "zustand";

export const OUTLETS = [
  "All Outlets",
  "HSR Layout",
  "Koramangala",
  "Marathahalli",
  "Jayanagar",
  "Whitefield",
] as const;

export type Outlet = (typeof OUTLETS)[number];

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  expandedGroups: Record<string, boolean>;
  toggleGroup: (label: string) => void;
  setGroupExpanded: (label: string, value: boolean) => void;

  selectedOutlet: Outlet;
  setSelectedOutlet: (outlet: Outlet) => void;

  dateRangeLabel: string;
  setDateRangeLabel: (label: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  expandedGroups: { Inventory: true, Manufacturing: false },
  toggleGroup: (label) =>
    set((state) => ({
      expandedGroups: {
        ...state.expandedGroups,
        [label]: !state.expandedGroups[label],
      },
    })),
  setGroupExpanded: (label, value) =>
    set((state) => ({
      expandedGroups: { ...state.expandedGroups, [label]: value },
    })),

  selectedOutlet: "All Outlets",
  setSelectedOutlet: (outlet) => set({ selectedOutlet: outlet }),

  dateRangeLabel: "01 May 2025 - 17 May 2025",
  setDateRangeLabel: (label) => set({ dateRangeLabel: label }),
}));
