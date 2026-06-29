"use client";

const tabs = [
  "Overview",
  "Sales",
  "Inventory",
  "Manufacturing",
  "Delivery",
  "Installation",
  "Financials",
];

export default function ReportsTabs() {
  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex flex-wrap gap-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              index === 0
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:border-blue-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}