"use client";

import { InsightItem } from "@/types/report";

interface QuickInsightsProps {
  data: InsightItem[];
}

export default function QuickInsights({
  data,
}: QuickInsightsProps) {
  return (
    <section className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">
        Quick Insights
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <Icon
                size={28}
                className="text-blue-600"
              />

              <p className="text-sm text-gray-600">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}