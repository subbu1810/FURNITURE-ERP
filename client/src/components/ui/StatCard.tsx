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
    <div className={cn(baseClasses, "gap-3 items-center flex-row")} onClick={onClick}>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={22} style={{ color: iconColor }} />
      </div>
      <div className="min-w-0 flex flex-col justify-center">
        <p className="text-[12px] text-surface-muted font-medium truncate">{label}</p>
        <p className="text-[20px] font-bold text-surface-text truncate leading-tight">{value}</p>
        {sub ? (
          <p
            className={cn(
              "text-[11px] font-medium flex items-center gap-1 mt-0.5",
              sub.trend === "up" && "text-status-green",
              sub.trend === "down" && "text-status-red",
              !sub.trend && "text-surface-muted"
            )}
          >
            {sub.text}
          </p>
        ) : link ? (
          <span className="text-[11px] text-brand-600 font-medium hover:underline mt-0.5">
            {link.text}
          </span>
        ) : <div />}
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
