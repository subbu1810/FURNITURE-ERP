import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  sub?: {
    text: string;
    trend?: "up" | "down";
    color?: string;
  };
  link?: {
    text: string;
    href: string;
  };
  onClick?: () => void;
}

export function StatCard({ icon: Icon, iconColor, iconBg, label, value, sub, link, onClick }: StatCardProps) {
  const baseClasses = cn(
    "bg-white rounded-card shadow-card border border-surface-border p-4 flex flex-col gap-2 min-w-0",
    (link || onClick) && "cursor-pointer hover:border-surface-border/80"
  );

  const cardContent = (
    <div className={baseClasses} onClick={onClick}>
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] text-surface-muted font-medium mb-1 truncate">{label}</p>
          <p className="text-[22px] font-bold text-surface-text truncate">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        {sub ? (
          <p
            className={cn(
              "text-[12px] font-medium flex items-center gap-1",
              sub.trend === "up" && "text-status-green",
              sub.trend === "down" && "text-status-red",
              !sub.trend && "text-surface-muted"
            )}
          >
            {sub.text}
          </p>
        ) : <div />}
        {link && (
          <span className="text-[12px] text-brand-600 font-medium hover:underline">
            {link.text}
          </span>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link.href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
