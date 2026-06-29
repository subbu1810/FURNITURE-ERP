"use client";
// import { useRouter } from "next/navigation";

import { useState } from "react";
import type { Installation } from "@/types/installation";
import { initialInstallations } from "@/data/installations";
import TopBar from "@/components/installation/TopBar";
import SummaryCards from "@/components/installation/SummaryCards";
import Filters from "@/components/installation/Filters";
import InstallationTable from "@/components/installation/InstallationTable";
import DetailsModal from "@/components/installation/DetailsModal";
import AddInstallationModal from "@/components/installation/AddInstallationModal";
import InstallationDetails from "@/components/installation/InstallationDetails";

// import "./page.css";

function InstallationManagement() {
//  const router = useRouter();


 const [showDetails, setShowDetails] = useState(false);
 const [selectedInstallation, setSelectedInstallation] =
  useState<Installation | null>(null);
 const [search, setSearch] = useState("");
 const [statusFilter, setStatusFilter] = useState("");
 const [showAddModal, setShowAddModal] = useState(false);

const [newInstallation, setNewInstallation] = useState({
  installationNo: "",
  orderNo: "",
  customer: "",
  phone: "",
  lead: "",
  vehicle: "",
  duration: ""
});

const [outletFilter, setOutletFilter] = useState("");
const [installerFilter,setInstallerFilter] = useState("");


const [warehouse, setWarehouse] = useState(
  "HSR Layout Warehouse"
);



const handleSaveInstallation = () => {
  if (
    !newInstallation.installationNo ||
    !newInstallation.orderNo ||
    !newInstallation.customer
  ) {
    alert("Please fill all fields");
    return;
  }

  const newRow = {
    ...newInstallation,
    outlet: "HSR Layout",
    scheduleDate: new Date().toLocaleDateString(),
    installer: "New Team",
    status: "Scheduled",
   lead: newInstallation.lead,
vehicle: newInstallation.vehicle,
duration: newInstallation.duration,
    rating: "0",
    feedback: "New Installation Added"
  };

  setInstallations([...installations, newRow]);

  setNewInstallation({
    installationNo: "",
    orderNo: "",
    customer: "",
    phone: "",
    lead: "",
  vehicle: "",
  duration: ""
  });

  setShowAddModal(false);
};

const [installations, setInstallations] =
  useState<Installation[]>(initialInstallations);
 

const filteredInstallations = installations.filter((item) => {

  const matchesSearch =
    item.installationNo.toLowerCase().includes(search.toLowerCase()) ||
    item.orderNo.toLowerCase().includes(search.toLowerCase()) ||
    item.customer.toLowerCase().includes(search.toLowerCase()) ||
    item.installer.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "" ||
    item.status === statusFilter;

  const matchesOutlet =
    outletFilter === "" ||
    item.outlet === outletFilter;

  const matchesInstaller =
    installerFilter === "" ||
    item.installer === installerFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesOutlet &&
    matchesInstaller
  );
});

const totalInstallations = installations.length;

const completedCount = installations.filter(
  (item) => item.status === "Completed"
).length;

const progressCount = installations.filter(
  (item) => item.status === "In Progress"
).length;

const scheduledCount = installations.filter(
  (item) => item.status === "Scheduled"
).length;

const cancelledCount = installations.filter(
  (item) => item.status === "Cancelled"
).length;

  return (
  <div className="min-h-screen bg-gray-100 p-6">

      

      {/* Top Bar */}
      <TopBar
  warehouse={warehouse}
  setWarehouse={setWarehouse}
/>

      {/* Summary Cards */}
      <SummaryCards
  totalInstallations={totalInstallations}
  completedCount={completedCount}
  progressCount={progressCount}
  scheduledCount={scheduledCount}
  cancelledCount={cancelledCount}
  onViewAll={() => {
    setSearch("");
    setStatusFilter("");
    setOutletFilter("");
    setInstallerFilter("");
  }}
/>

      {/* Filters */}
      <Filters
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  outletFilter={outletFilter}
  setOutletFilter={setOutletFilter}
  installerFilter={installerFilter}
  setInstallerFilter={setInstallerFilter}
  search={search}
  setSearch={setSearch}
  onAdd={() => setShowAddModal(true)}
/>

    {/* Main Content */}
<div className="grid grid-cols-12 gap-6">

  <div className="col-span-7">
    <InstallationTable
      installations={filteredInstallations}
      onView={(installation) => {
        setSelectedInstallation(installation);
      }}
    />
  </div>

  <div className="col-span-5">
    <InstallationDetails
      installation={selectedInstallation}
    />
  </div>

</div>

<DetailsModal
  open={showDetails}
  installation={selectedInstallation}
  onClose={() => setShowDetails(false)}
/>

<AddInstallationModal
  open={showAddModal}
  newInstallation={newInstallation}
  setNewInstallation={setNewInstallation}
  onClose={() => setShowAddModal(false)}
  onSave={handleSaveInstallation}
/>

</div>

 );
}

export default InstallationManagement;