type KpiCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  subtitleClassName?: string;
  
};

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  subtitleClassName,
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full text-white ${iconBg}`}
      >
        {icon}
      </div>

      <h4 className="text-sm text-gray-500">
        {title}
      </h4>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>

      <p
  className={`mt-4 text-sm font-medium ${subtitleClassName ?? "text-gray-600"}`}
>
  {subtitle}
</p>
    </div>
  );
}