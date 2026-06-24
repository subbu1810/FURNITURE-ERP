import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  "In Stock": "bg-status-greenBg text-status-green",
  "Low Stock": "bg-status-orangeBg text-status-orange",
  "Out of Stock": "bg-status-redBg text-status-red",
  "Completed": "bg-status-greenBg text-status-green",
  "Delivered": "bg-status-greenBg text-status-green",
  "In Progress": "bg-status-blueBg text-status-blue",
  "In Transit": "bg-status-blueBg text-status-blue",
  "Pending": "bg-status-orangeBg text-status-orange",
  "On Hold": "bg-cyan-100 text-cyan-700",
  "Failed": "bg-status-redBg text-status-red",
  "Cancelled": "bg-status-redBg text-status-red",
  "Scheduled": "bg-status-purpleBg text-status-purple",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? "bg-status-grayBg text-status-gray";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-[11.5px] font-medium whitespace-nowrap",
        style
      )}
    >
      {status}
    </span>
  );
}
