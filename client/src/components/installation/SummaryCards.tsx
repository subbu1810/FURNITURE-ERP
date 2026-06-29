import {
  Wrench,
  CheckCircle2,
  Clock3,
  CalendarDays,
  XCircle,
} from "lucide-react";

interface SummaryCardsProps {
  totalInstallations: number;
  completedCount: number;
  progressCount: number;
  scheduledCount: number;
  cancelledCount: number;
  onViewAll: () => void;
}

export default function SummaryCards({
  totalInstallations,
  completedCount,
  progressCount,
  scheduledCount,
  cancelledCount,
  onViewAll,
}: SummaryCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

      {/* Total Installations */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
          <Wrench className="h-6 w-6 text-blue-600" />
        </div>

        <h4 className="text-sm text-gray-500">
          Total Installations
        </h4>

        <h2 className="mt-2 text-3xl font-bold">
          {totalInstallations}
        </h2>

        <button
          onClick={onViewAll}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          View all
        </button>
      </div>

      {/* Completed */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>

        <h4 className="text-sm text-gray-500">
          Completed
        </h4>

        <h2 className="mt-2 text-3xl font-bold">
          {completedCount}
        </h2>
      </div>

      {/* In Progress */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
          <Clock3 className="h-6 w-6 text-orange-600" />
        </div>

        <h4 className="text-sm text-gray-500">
          In Progress
        </h4>

        <h2 className="mt-2 text-3xl font-bold">
          {progressCount}
        </h2>
      </div>

      {/* Scheduled */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
          <CalendarDays className="h-6 w-6 text-purple-600" />
        </div>

        <h4 className="text-sm text-gray-500">
          Scheduled
        </h4>

        <h2 className="mt-2 text-3xl font-bold">
          {scheduledCount}
        </h2>
      </div>

      {/* Cancelled */}
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>

        <h4 className="text-sm text-gray-500">
          Cancelled
        </h4>

        <h2 className="mt-2 text-3xl font-bold">
          {cancelledCount}
        </h2>
      </div>

    </div>
  );
}