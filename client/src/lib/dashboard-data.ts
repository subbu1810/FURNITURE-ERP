export const SALES_OVERVIEW = [
  { date: "01 May", value: 28000 },
  { date: "04 May", value: 35000 },
  { date: "07 May", value: 31000 },
  { date: "10 May", value: 42000 },
  { date: "13 May", value: 38000 },
  { date: "16 May", value: 47000 },
  { date: "17 May", value: 41000 },
];

export const SALES_OVERVIEW_BY_OUTLET: Record<string, Array<{ date: string; value: number }>> = {
  "All Outlets": SALES_OVERVIEW,
  "HSR Layout": [
    { date: "01 May", value: 4200 },
    { date: "04 May", value: 5100 },
    { date: "07 May", value: 4800 },
    { date: "10 May", value: 5700 },
    { date: "13 May", value: 5200 },
    { date: "16 May", value: 6300 },
    { date: "17 May", value: 5900 },
  ],
  Koramangala: [
    { date: "01 May", value: 3800 },
    { date: "04 May", value: 4600 },
    { date: "07 May", value: 4300 },
    { date: "10 May", value: 5100 },
    { date: "13 May", value: 4800 },
    { date: "16 May", value: 5500 },
    { date: "17 May", value: 5400 },
  ],
  Marathahalli: [
    { date: "01 May", value: 3200 },
    { date: "04 May", value: 3900 },
    { date: "07 May", value: 3600 },
    { date: "10 May", value: 4300 },
    { date: "13 May", value: 4100 },
    { date: "16 May", value: 4700 },
    { date: "17 May", value: 4600 },
  ],
  Jayanagar: [
    { date: "01 May", value: 2900 },
    { date: "04 May", value: 3400 },
    { date: "07 May", value: 3100 },
    { date: "10 May", value: 3800 },
    { date: "13 May", value: 3600 },
    { date: "16 May", value: 4100 },
    { date: "17 May", value: 4000 },
  ],
  Whitefield: [
    { date: "01 May", value: 2500 },
    { date: "04 May", value: 2900 },
    { date: "07 May", value: 2700 },
    { date: "10 May", value: 3300 },
    { date: "13 May", value: 3100 },
    { date: "16 May", value: 3600 },
    { date: "17 May", value: 3400 },
  ],
};

const createOverviewRange = (data: Array<{ date: string; value: number }>) => {
  const lastIndex = data.length - 1;
  return {
    Today: [data[lastIndex]],
    Yesterday: [data[Math.max(lastIndex - 1, 0)]],
    "Last 7 Days": data,
    "Last 30 Days": data,
    "01 May 2025 - 17 May 2025": data,
    "This Month": data,
    "Last Month": data,
    "Custom Range": data,
  };
};

export const SALES_OVERVIEW_BY_OUTLET_AND_RANGE: Record<
  string,
  Record<string, Array<{ date: string; value: number }>>
> = Object.fromEntries(
  Object.entries(SALES_OVERVIEW_BY_OUTLET).map(([outlet, data]) => [outlet, createOverviewRange(data)])
) as Record<string, Record<string, Array<{ date: string; value: number }>>>;

export const SALES_BY_CATEGORY = [
  { name: "Sofas", value: 35, color: "#2563EB" },
  { name: "Beds", value: 25, color: "#16A34A" },
  { name: "Dining", value: 20, color: "#F59E0B" },
  { name: "Wardrobes", value: 10, color: "#7C3AED" },
  { name: "Others", value: 10, color: "#06B6D4" },
];

const createCategoryRange = (data: Array<{ name: string; value: number; color: string }>) => ({
  Today: data,
  Yesterday: data,
  "Last 7 Days": data,
  "Last 30 Days": data,
  "01 May 2025 - 17 May 2025": data,
  "This Month": data,
  "Last Month": data,
  "Custom Range": data,
});

export const SALES_BY_CATEGORY_BY_OUTLET_AND_RANGE: Record<
  string,
  Record<string, Array<{ name: string; value: number; color: string }>>
> = {
  "All Outlets": createCategoryRange(SALES_BY_CATEGORY),
  "HSR Layout": createCategoryRange([
    { name: "Sofas", value: 30, color: "#2563EB" },
    { name: "Beds", value: 28, color: "#16A34A" },
    { name: "Dining", value: 18, color: "#F59E0B" },
    { name: "Wardrobes", value: 12, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ]),
  Koramangala: createCategoryRange([
    { name: "Sofas", value: 34, color: "#2563EB" },
    { name: "Beds", value: 24, color: "#16A34A" },
    { name: "Dining", value: 18, color: "#F59E0B" },
    { name: "Wardrobes", value: 11, color: "#7C3AED" },
    { name: "Others", value: 13, color: "#06B6D4" },
  ]),
  Marathahalli: createCategoryRange([
    { name: "Sofas", value: 32, color: "#2563EB" },
    { name: "Beds", value: 26, color: "#16A34A" },
    { name: "Dining", value: 20, color: "#F59E0B" },
    { name: "Wardrobes", value: 10, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ]),
  Jayanagar: createCategoryRange([
    { name: "Sofas", value: 28, color: "#2563EB" },
    { name: "Beds", value: 22, color: "#16A34A" },
    { name: "Dining", value: 24, color: "#F59E0B" },
    { name: "Wardrobes", value: 14, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ]),
  Whitefield: createCategoryRange([
    { name: "Sofas", value: 27, color: "#2563EB" },
    { name: "Beds", value: 23, color: "#16A34A" },
    { name: "Dining", value: 21, color: "#F59E0B" },
    { name: "Wardrobes", value: 14, color: "#7C3AED" },
    { name: "Others", value: 15, color: "#06B6D4" },
  ]),
};

export const TOTAL_SALES_BY_OUTLET: Record<string, string> = {
  "All Outlets": "₹1,85,42,300",
  "HSR Layout": "₹28,75,000",
  Koramangala: "₹24,60,000",
  Marathahalli: "₹21,30,000",
  Jayanagar: "₹18,90,000",
  Whitefield: "₹16,75,000",
};

export const STAT_CARD_METRICS_BY_OUTLET: Record<
  string,
  {
    sales: string;
    orders: string;
    profit: string;
    pendingDeliveries: string;
    lowStockItems: string;
  }
> = {
  "All Outlets": {
    sales: "₹1,85,42,300",
    orders: "1,248",
    profit: "₹23,48,200",
    pendingDeliveries: "156",
    lowStockItems: "23",
  },
  "HSR Layout": {
    sales: "₹28,75,000",
    orders: "210",
    profit: "₹3,85,000",
    pendingDeliveries: "24",
    lowStockItems: "8",
  },
  Koramangala: {
    sales: "₹24,60,000",
    orders: "185",
    profit: "₹3,17,000",
    pendingDeliveries: "19",
    lowStockItems: "6",
  },
  Marathahalli: {
    sales: "₹21,30,000",
    orders: "150",
    profit: "₹2,68,000",
    pendingDeliveries: "18",
    lowStockItems: "5",
  },
  Jayanagar: {
    sales: "₹18,90,000",
    orders: "132",
    profit: "₹2,12,000",
    pendingDeliveries: "16",
    lowStockItems: "4",
  },
  Whitefield: {
    sales: "₹16,75,000",
    orders: "110",
    profit: "₹1,85,000",
    pendingDeliveries: "14",
    lowStockItems: "3",
  },
};

export const STOCK_SUMMARY_BY_OUTLET: Record<
  string,
  {
    totalItems: string;
    inStock: string;
    lowStock: string;
    outOfStock: string;
  }
> = {
  "All Outlets": {
    totalItems: "2,340",
    inStock: "1,856",
    lowStock: "156",
    outOfStock: "28",
  },
  "HSR Layout": {
    totalItems: "420",
    inStock: "335",
    lowStock: "28",
    outOfStock: "4",
  },
  Koramangala: {
    totalItems: "380",
    inStock: "305",
    lowStock: "22",
    outOfStock: "3",
  },
  Marathahalli: {
    totalItems: "360",
    inStock: "290",
    lowStock: "18",
    outOfStock: "2",
  },
  Jayanagar: {
    totalItems: "320",
    inStock: "255",
    lowStock: "17",
    outOfStock: "4",
  },
  Whitefield: {
    totalItems: "300",
    inStock: "255",
    lowStock: "15",
    outOfStock: "3",
  },
};

export const PROFIT_LOSS_BY_OUTLET: Record<
  string,
  Record<
    string,
    {
      income: string;
      expenses: string;
      profit: string;
      profitClass: string;
    }
  >
> = {
  "All Outlets": {
    "This Month": {
      income: "₹2,10,45,000",
      expenses: "₹1,86,96,800",
      profit: "₹23,48,200",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹1,92,30,000",
      expenses: "₹1,75,85,400",
      profit: "₹16,44,600",
      profitClass: "text-status-green",
    },
  },
  "HSR Layout": {
    "This Month": {
      income: "₹31,20,000",
      expenses: "₹27,35,000",
      profit: "₹3,85,000",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹28,90,000",
      expenses: "₹25,20,000",
      profit: "₹3,70,000",
      profitClass: "text-status-green",
    },
  },
  Koramangala: {
    "This Month": {
      income: "₹27,25,000",
      expenses: "₹24,08,000",
      profit: "₹3,17,000",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹25,40,000",
      expenses: "₹22,40,000",
      profit: "₹3,00,000",
      profitClass: "text-status-green",
    },
  },
  Marathahalli: {
    "This Month": {
      income: "₹23,85,000",
      expenses: "₹21,17,000",
      profit: "₹2,68,000",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹22,10,000",
      expenses: "₹19,55,000",
      profit: "₹2,55,000",
      profitClass: "text-status-green",
    },
  },
  Jayanagar: {
    "This Month": {
      income: "₹21,00,000",
      expenses: "₹18,88,000",
      profit: "₹2,12,000",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹19,60,000",
      expenses: "₹17,50,000",
      profit: "₹2,10,000",
      profitClass: "text-status-green",
    },
  },
  Whitefield: {
    "This Month": {
      income: "₹18,60,000",
      expenses: "₹16,75,000",
      profit: "₹1,85,000",
      profitClass: "text-status-green",
    },
    "Last Month": {
      income: "₹17,50,000",
      expenses: "₹15,75,000",
      profit: "₹1,75,000",
      profitClass: "text-status-green",
    },
  },
};

export const TOP_OUTLETS_BY_OUTLET: Record<string, Array<{ outlet: string; sales: string; orders: number }>> = {
  "All Outlets": [
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
  ],
  "HSR Layout": [
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
  ],
  Koramangala: [
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
  ],
  Marathahalli: [
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
  ],
  Jayanagar: [
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
  ],
  Whitefield: [
    { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
    { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
    { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
    { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
    { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
  ],
};

export const SALES_BY_CATEGORY_BY_OUTLET: Record<string, Array<{ name: string; value: number; color: string }>> = {
  "All Outlets": SALES_BY_CATEGORY,
  "HSR Layout": [
    { name: "Sofas", value: 30, color: "#2563EB" },
    { name: "Beds", value: 28, color: "#16A34A" },
    { name: "Dining", value: 18, color: "#F59E0B" },
    { name: "Wardrobes", value: 12, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ],
  Koramangala: [
    { name: "Sofas", value: 34, color: "#2563EB" },
    { name: "Beds", value: 24, color: "#16A34A" },
    { name: "Dining", value: 18, color: "#F59E0B" },
    { name: "Wardrobes", value: 11, color: "#7C3AED" },
    { name: "Others", value: 13, color: "#06B6D4" },
  ],
  Marathahalli: [
    { name: "Sofas", value: 32, color: "#2563EB" },
    { name: "Beds", value: 26, color: "#16A34A" },
    { name: "Dining", value: 20, color: "#F59E0B" },
    { name: "Wardrobes", value: 10, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ],
  Jayanagar: [
    { name: "Sofas", value: 28, color: "#2563EB" },
    { name: "Beds", value: 22, color: "#16A34A" },
    { name: "Dining", value: 24, color: "#F59E0B" },
    { name: "Wardrobes", value: 14, color: "#7C3AED" },
    { name: "Others", value: 12, color: "#06B6D4" },
  ],
  Whitefield: [
    { name: "Sofas", value: 27, color: "#2563EB" },
    { name: "Beds", value: 23, color: "#16A34A" },
    { name: "Dining", value: 21, color: "#F59E0B" },
    { name: "Wardrobes", value: 14, color: "#7C3AED" },
    { name: "Others", value: 15, color: "#06B6D4" },
  ],
};

export const RECENT_ACTIVITIES_BY_OUTLET: Record<string, Array<{ text: string; time: string }>> = {
  "All Outlets": [
    { text: "New Sales Order SO1256 created", time: "10:30 AM" },
    { text: "Delivery DLV1253 completed", time: "09:45 AM" },
    { text: "Stock received for PO1254", time: "09:20 AM" },
    { text: "Payment received from CUS1023", time: "Yesterday" },
    { text: "Production Order WO1256 completed", time: "16 May 2025" },
    { text: "New Customer Arjun Prasad added", time: "16 May 2025" },
    { text: "Stock transfer ST1250 completed", time: "15 May 2025" },
  ],
  "HSR Layout": [
    { text: "HSR Layout order SO1301 created", time: "10:30 AM" },
    { text: "HSR Layout delivery DLV1300 completed", time: "09:45 AM" },
    { text: "HSR Layout received stock for PO1302", time: "09:20 AM" },
    { text: "Payment received from HSR Layout customer", time: "Yesterday" },
    { text: "Production Order WO1305 completed for HSR Layout", time: "16 May 2025" },
    { text: "New customer Rajesh added at HSR Layout", time: "16 May 2025" },
    { text: "Stock transfer ST1303 completed to HSR Layout", time: "15 May 2025" },
  ],
  Koramangala: [
    { text: "Koramangala order SO1320 created", time: "10:30 AM" },
    { text: "Koramangala delivery DLV1317 completed", time: "09:45 AM" },
    { text: "Koramangala received stock for PO1321", time: "09:20 AM" },
    { text: "Payment received from Koramangala customer", time: "Yesterday" },
    { text: "Production Order WO1325 completed for Koramangala", time: "16 May 2025" },
    { text: "New customer Sneha added at Koramangala", time: "16 May 2025" },
    { text: "Stock transfer ST1322 completed to Koramangala", time: "15 May 2025" },
  ],
  Marathahalli: [
    { text: "Marathahalli order SO1340 created", time: "10:30 AM" },
    { text: "Marathahalli delivery DLV1338 completed", time: "09:45 AM" },
    { text: "Marathahalli received stock for PO1341", time: "09:20 AM" },
    { text: "Payment received from Marathahalli customer", time: "Yesterday" },
    { text: "Production Order WO1345 completed for Marathahalli", time: "16 May 2025" },
    { text: "New customer Priya added at Marathahalli", time: "16 May 2025" },
    { text: "Stock transfer ST1342 completed to Marathahalli", time: "15 May 2025" },
  ],
  Jayanagar: [
    { text: "Jayanagar order SO1360 created", time: "10:30 AM" },
    { text: "Jayanagar delivery DLV1357 completed", time: "09:45 AM" },
    { text: "Jayanagar received stock for PO1361", time: "09:20 AM" },
    { text: "Payment received from Jayanagar customer", time: "Yesterday" },
    { text: "Production Order WO1365 completed for Jayanagar", time: "16 May 2025" },
    { text: "New customer Kavya added at Jayanagar", time: "16 May 2025" },
    { text: "Stock transfer ST1362 completed to Jayanagar", time: "15 May 2025" },
  ],
  Whitefield: [
    { text: "Whitefield order SO1380 created", time: "10:30 AM" },
    { text: "Whitefield delivery DLV1377 completed", time: "09:45 AM" },
    { text: "Whitefield received stock for PO1381", time: "09:20 AM" },
    { text: "Payment received from Whitefield customer", time: "Yesterday" },
    { text: "Production Order WO1385 completed for Whitefield", time: "16 May 2025" },
    { text: "New customer Anjali added at Whitefield", time: "16 May 2025" },
    { text: "Stock transfer ST1382 completed to Whitefield", time: "15 May 2025" },
  ],
};

export const RECENT_ACTIVITIES = RECENT_ACTIVITIES_BY_OUTLET["All Outlets"];

export const TOP_OUTLETS = [
  { outlet: "HSR Layout", sales: "₹28,75,000", orders: 210 },
  { outlet: "Koramangala", sales: "₹24,60,000", orders: 185 },
  { outlet: "Marathahalli", sales: "₹21,30,000", orders: 150 },
  { outlet: "Jayanagar", sales: "₹18,90,000", orders: 132 },
  { outlet: "Whitefield", sales: "₹16,75,000", orders: 110 },
];
