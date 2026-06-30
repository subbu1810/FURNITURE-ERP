import { create } from "zustand";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Manager" | "Staff" | "Sales Staff" | "Support Staff" | "Inventory Staff" | "Delivery Staff" | "Accountant";
  outlet: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

export interface OutletRecord {
  id: string;
  name: string;
  type: "Outlet" | "Warehouse";
  address: string;
  phone: string;
  manager: string;
  status: "Active" | "Inactive";
}

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  role: string;
  initials: string;
  avatar?: string;
}

interface CompanyState {
  businessName: string;
  gstin: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  logoUrl: string;
}

interface NotificationPrefs {
  lowStockAlerts: boolean;
  orderUpdates: boolean;
  deliveryUpdates: boolean;
  paymentAlerts: boolean;
  promotionalOffers: boolean;
  emailDigest: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
}

interface SettingsState {
  profile: ProfileState;
  updateProfile: (p: Partial<ProfileState>) => void;

  company: CompanyState;
  updateCompany: (c: Partial<CompanyState>) => void;

  outlets: OutletRecord[];
  addOutlet: (o: OutletRecord) => void;
  updateOutlet: (id: string, o: Partial<OutletRecord>) => void;
  removeOutlet: (id: string) => void;

  users: UserAccount[];
  addUser: (u: UserAccount) => void;
  updateUser: (id: string, u: Partial<UserAccount>) => void;
  removeUser: (id: string) => void;

  notifications: NotificationPrefs;
  updateNotifications: (n: Partial<NotificationPrefs>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  profile: {
    name: "Admin User",
    email: "admin@furnitureerp.in",
    phone: "+91 98765 43210",
    role: "Super Admin",
    initials: "AD",
  },
  updateProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),

  company: {
    businessName: "Sunrise Furnitures Pvt. Ltd.",
    gstin: "29ABCDE1234F1Z5",
    pan: "ABCDE1234F",
    address: "No. 42, 1st Main Road, HSR Layout",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560102",
    phone: "+91 80 4567 8900",
    email: "contact@sunrisefurnitures.in",
    logoUrl: "",
  },
  updateCompany: (c) => set((s) => ({ company: { ...s.company, ...c } })),

  outlets: [
    { id: "1", name: "HSR Layout", type: "Outlet", address: "27th Main, HSR Layout, Sector 2", phone: "+91 80 1234 5601", manager: "Ravi Kumar", status: "Active" },
    { id: "2", name: "Koramangala", type: "Outlet", address: "80 Feet Road, Koramangala 4th Block", phone: "+91 80 1234 5602", manager: "Sneha Reddy", status: "Active" },
    { id: "3", name: "Marathahalli", type: "Outlet", address: "Outer Ring Road, Marathahalli", phone: "+91 80 1234 5603", manager: "Arjun Nair", status: "Active" },
    { id: "4", name: "Jayanagar", type: "Outlet", address: "4th Block, Jayanagar", phone: "+91 80 1234 5604", manager: "Divya Shetty", status: "Active" },
    { id: "5", name: "Whitefield", type: "Outlet", address: "ITPL Main Road, Whitefield", phone: "+91 80 1234 5605", manager: "Karthik Iyer", status: "Inactive" },
    { id: "6", name: "Main Warehouse", type: "Warehouse", address: "Industrial Area, Peenya Phase 2", phone: "+91 80 1234 5699", manager: "Manoj Pillai", status: "Active" },
  ],
  addOutlet: (o) => set((s) => ({ outlets: [...s.outlets, o] })),
  updateOutlet: (id, o) =>
    set((s) => ({ outlets: s.outlets.map((x) => (x.id === id ? { ...x, ...o } : x)) })),
  removeOutlet: (id) => set((s) => ({ outlets: s.outlets.filter((x) => x.id !== id) })),

  users: [
    { id: "1", name: "Admin User", email: "admin@furnitureerp.in", role: "Super Admin", outlet: "All Outlets", status: "Active", lastActive: "Online now" },
    { id: "2", name: "Ravi Kumar", email: "ravi.kumar@sunrisefurnitures.in", role: "Manager", outlet: "HSR Layout", status: "Active", lastActive: "2h ago" },
    { id: "3", name: "Sneha Reddy", email: "sneha.reddy@sunrisefurnitures.in", role: "Manager", outlet: "Koramangala", status: "Active", lastActive: "5h ago" },
    { id: "4", name: "Pooja Hegde", email: "pooja.hegde@sunrisefurnitures.in", role: "Accountant", outlet: "All Outlets", status: "Active", lastActive: "1d ago" },
    { id: "5", name: "Vikram Singh", email: "vikram.singh@sunrisefurnitures.in", role: "Staff", outlet: "Marathahalli", status: "Inactive", lastActive: "12d ago" },
  ],
  addUser: (u) => set((s) => ({ users: [...s.users, u] })),
  updateUser: (id, u) =>
    set((s) => ({ users: s.users.map((x) => (x.id === id ? { ...x, ...u } : x)) })),
  removeUser: (id) => set((s) => ({ users: s.users.filter((x) => x.id !== id) })),

  notifications: {
    lowStockAlerts: true,
    orderUpdates: true,
    deliveryUpdates: true,
    paymentAlerts: true,
    promotionalOffers: false,
    emailDigest: true,
    smsAlerts: false,
    pushNotifications: true,
  },
  updateNotifications: (n) => set((s) => ({ notifications: { ...s.notifications, ...n } })),
}));
