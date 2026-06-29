"use client";

import { ShortcutItem } from "@/types/report";

interface ReportShortcutsProps {
  data: ShortcutItem[];
}

export default function ReportShortcuts({
  data,
}: ReportShortcutsProps) {
  return (
    <section className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">
        Report Shortcuts
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:bg-gray-50"
            >
              <Icon
                size={22}
                className="text-blue-600"
              />

              <span className="text-sm font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}