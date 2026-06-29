import type { Installation } from "@/types/installation";
import { Eye } from "lucide-react";

interface InstallationTableProps {
  installations: Installation[];
  onView: (installation: Installation) => void;
}

export default function InstallationTable({
  installations,
  onView,
}: InstallationTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Installation No
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Order No
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Customer
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Outlet
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Schedule Date
            </th>
            <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
              Installer
            </th>
            <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {installations.map((item) => (
            <tr
              key={item.installationNo}
              className="border-b border-gray-100 transition hover:bg-gray-50"
            >
              <td className="px-5 py-4 text-sm text-gray-700">
                {item.installationNo}
              </td>

              <td className="px-5 py-4 text-sm text-gray-700">
                {item.orderNo}
              </td>

              <td className="px-5 py-4 text-sm font-medium text-gray-800">
                {item.customer}
              </td>

              <td className="px-5 py-4 text-sm text-gray-700">
                {item.outlet}
              </td>

              <td className="px-5 py-4 text-sm text-gray-700">
                {item.scheduleDate}
              </td>

              <td className="px-5 py-4 text-sm text-gray-700">
                {item.installer}
              </td>

              <td className="px-5 py-4 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : item.status === "Scheduled"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-center">
                  <button
                    onClick={() => onView(item)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}