"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveBar({
  onSave,
  saved,
  disabled,
}: {
  onSave: () => void;
  saved: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-surface-border mt-5">
      <button
        onClick={onSave}
        disabled={disabled}
        className="px-4 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
      >
        Save Changes
      </button>
      <span
        className={cn(
          "flex items-center gap-1.5 text-[12.5px] text-status-green transition-opacity duration-300",
          saved ? "opacity-100" : "opacity-0"
        )}
      >
        <Check size={14} /> Saved
      </span>
    </div>
  );
}

export function useSavedFlash() {
  // small helper hook colocated for tabs that need the "Saved" flash behaviour
  return null;
}
