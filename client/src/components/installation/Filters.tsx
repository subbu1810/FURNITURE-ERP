interface FiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;

  outletFilter: string;
  setOutletFilter: (value: string) => void;

  installerFilter: string;
  setInstallerFilter: (value: string) => void;

  search: string;
  setSearch: (value: string) => void;

  onAdd: () => void;
}

export default function Filters({
  statusFilter,
  setStatusFilter,
  outletFilter,
  setOutletFilter,
  installerFilter,
  setInstallerFilter,
  search,
  setSearch,
  onAdd,
}: FiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      <select
        className="rounded-lg border px-3 py-2"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select
        className="rounded-lg border px-3 py-2"
        value={outletFilter}
        onChange={(e) => setOutletFilter(e.target.value)}
      >
        <option value="">All Outlets</option>
        <option value="HSR Layout">HSR Layout</option>
        <option value="Whitefield">Whitefield</option>
        <option value="Marathahalli">Marathahalli</option>
        <option value="Koramangala">Koramangala</option>
      </select>

      <select
        className="rounded-lg border px-3 py-2"
        value={installerFilter}
        onChange={(e) => setInstallerFilter(e.target.value)}
      >
        <option value="">All Installers</option>
        <option value="Vikram Team">Vikram Team</option>
        <option value="Arun Team">Arun Team</option>
        <option value="Manoj Team">Manoj Team</option>
        <option value="Ravi Team">Ravi Team</option>
        <option value="New Team">New Team</option>
      </select>

      <input
        className="rounded-lg border px-3 py-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + New Installation
      </button>
    </div>
  );
}