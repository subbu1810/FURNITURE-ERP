import { Construction } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";

export function PlaceholderPage({ title, breadcrumb }: { title: string; breadcrumb?: string[] }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title={title} breadcrumb={breadcrumb} />
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-10">
        <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center">
          <Construction size={26} className="text-brand-500" />
        </div>
        <h2 className="text-[16px] font-semibold text-surface-text">{title} module coming soon</h2>
        <p className="text-[13px] text-surface-muted max-w-sm">
          This section is part of the planned ERP modules. UI will follow the same design system as Dashboard and Inventory.
        </p>
      </div>
    </div>
  );
}
