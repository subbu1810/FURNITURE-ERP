"use client";

import { KPIItem } from "@/types/report";

interface KPISectionProps {
  data: KPIItem[];
}

export default function KPISection({
  data,
}: KPISectionProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {data.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${item.color}`}
              >
                <Icon size={24} />
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-xs font-medium text-green-600">
                  {item.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}