"use client";

import { useState } from "react";
import type { Installation } from "@/types/installation";

import {
  MapPin,
  X,
  User,
  Users,
  Phone,
  Truck,
  Clock3,
  CalendarClock,
  Timer,
  Star,
  FileText,
  FileSignature,
  ShieldCheck,
  Pencil,
  CalendarDays,
  CircleX,
} from "lucide-react";

interface InstallationDetailsProps {
  installation: Installation | null;
}

export default function InstallationDetails({
  installation,
}: InstallationDetailsProps) {
    const [activeTab, setActiveTab] = useState("Overview");
  if (!installation) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="flex h-[650px] items-center justify-center text-gray-400">
          Select an installation to view details
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5">

        <div>
          <h2 className="text-xl font-semibold">
            Installation Details
          </h2>
        </div>

        <div className="flex items-center gap-3">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              installation.status === "Completed"
                ? "bg-green-100 text-green-700"
                : installation.status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : installation.status === "Scheduled"
                ? "bg-purple-100 text-purple-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {installation.status}
          </span>

          <button className="rounded-lg border p-2 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>

        </div>
      </div>

      {/* Row 1 */}

      <div className="grid grid-cols-3 border-b border-gray-100">

        <div className="border-r border-gray-100 p-5">

          <p className="text-xs text-gray-500">
            Installation No
          </p>

          <p className="mt-1 font-semibold">
            {installation.installationNo}
          </p>

        </div>

        <div className="border-r border-gray-100 p-5">

          <p className="text-xs text-gray-500">
            Order No
          </p>

          <p className="mt-1 font-semibold">
            {installation.orderNo}
          </p>

        </div>

        <div className="p-5">

          <p className="text-xs text-gray-500">
            Schedule Date
          </p>

          <p className="mt-1 font-semibold">
            {installation.scheduleDate}
          </p>

        </div>

      </div>

      {/* Row 2 */}

      <div className="grid grid-cols-2 border-b border-gray-100">

        <div className="border-r border-gray-100 p-5">

          <p className="text-xs text-gray-500">
            Customer
          </p>

          <p className="mt-2 font-semibold">
            {installation.customer}
          </p>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

            <Phone className="h-4 w-4" />

            {installation.phone}

          </div>

        </div>

        <div className="p-5">

          <p className="text-xs text-gray-500">
            Address
          </p>

          <div className="mt-3 flex items-start gap-2">

            <MapPin className="mt-1 h-4 w-4 text-gray-500" />

            <div className="text-sm text-gray-700">
              #123, 4th Main,
              <br />
              HSR Layout,
              <br />
              Bangalore - 560102
            </div>

          </div>

        </div>

      </div>

      {/* Installation Progress */}

<div className="border-b border-gray-100 p-5">

  <h3 className="mb-6 text-lg font-semibold">
    Installation Progress
  </h3>

  <div className="flex items-center justify-between">

    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
        ✓
      </div>

      <p className="mt-2 text-xs font-medium">
        Scheduled
      </p>

      <span className="text-[11px] text-gray-500">
        15 May
      </span>
    </div>

    <div className="h-1 flex-1 bg-green-500"></div>

    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
        ✓
      </div>

      <p className="mt-2 text-xs font-medium">
        Dispatched
      </p>

      <span className="text-[11px] text-gray-500">
        16 May
      </span>
    </div>

    <div className="h-1 flex-1 bg-green-500"></div>

    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
        ✓
      </div>

      <p className="mt-2 text-xs font-medium">
        On Site
      </p>

      <span className="text-[11px] text-gray-500">
        17 May
      </span>
    </div>

    <div className="h-1 flex-1 bg-green-500"></div>

    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
        ✓
      </div>

      <p className="mt-2 text-xs font-medium">
        Completed
      </p>

      <span className="text-[11px] text-gray-500">
        17 May
      </span>
    </div>

  </div>

</div>

{/* Tabs */}

<div className="border-b border-gray-100">

  <div className="flex overflow-x-auto">

    {[
      "Overview",
      "Items",
      "Checklist",
      "Photos",
      "Notes",
      "History",
    ].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-5 py-3 text-sm font-medium transition ${
          activeTab === tab
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-blue-600"
        }`}
      >
        {tab}
      </button>
    ))}

  </div>

</div>

{/* Overview */}
{activeTab === "Overview" && (
  <div className="p-6">

    <div className="grid grid-cols-2 gap-8">

      {/* LEFT SECTION */}
      <div className="space-y-5">

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Installer / Team
            </span>
          </div>

          <div className="text-right">
            <p className="font-semibold text-slate-900">
              {installation.installer}
            </p>
            <p className="text-xs text-slate-500">
              Team A
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Lead Installer
            </span>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              {installation.lead}
            </p>

            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-slate-500">
              <Phone className="h-3.5 w-3.5 text-pink-500" />
              {installation.phone}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Helper
            </span>
          </div>

          <div className="text-right">
            <p className="font-semibold">
              Rohit Kumar
            </p>

            <div className="mt-1 flex items-center justify-end gap-1 text-xs text-slate-500">
              <Phone className="h-3.5 w-3.5 text-pink-500" />
              9876567890
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Vehicle
            </span>
          </div>

          <span className="font-semibold">
            {installation.vehicle}
          </span>
        </div>

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Started At
            </span>
          </div>

          <span className="font-semibold">
            17 May 2025, 10:15 AM
          </span>
        </div>

        <div className="flex items-start justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <CalendarClock className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Completed At
            </span>
          </div>

          <span className="font-semibold">
            17 May 2025, 01:45 PM
          </span>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Timer className="h-5 w-5 text-slate-500" />
            <span className="text-sm text-slate-600">
              Total Duration
            </span>
          </div>

          <span className="font-semibold">
            {installation.duration}
          </span>
        </div>

      </div>

      {/* RIGHT SECTION */}

      <div>

        <h3 className="mb-3 text-lg font-semibold">
          Customer Feedback
        </h3>

        <div className="mb-4 flex items-center gap-1">

          {[1,2,3,4,5].map((star)=>(
            <Star
              key={star}
              className="h-5 w-5 fill-yellow-400 text-yellow-400"
            />
          ))}

          <span className="ml-2 font-semibold">
            5.0
          </span>

        </div>

        <p className="text-sm leading-6 text-slate-600">
          {installation.feedback}
        </p>

        <div className="mt-8">

          <h3 className="mb-4 text-lg font-semibold">
            Documents
          </h3>

          <div className="space-y-3">

            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              <FileText className="h-4 w-4" />
              Installation Report
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              <FileSignature className="h-4 w-4" />
              Customer Signature
            </button>

            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Warranty Card
            </button>

          </div>

        </div>

        <div className="mt-8 border-t border-gray-200 pt-5">

          <div className="flex items-center justify-between">

            <span className="text-slate-600 font-medium">
              Amount
            </span>

            <span className="text-3xl font-bold text-slate-900">
              ₹ 2,450.00
            </span>

          </div>

        </div>

      </div>

    </div>

    <div className="mt-10 grid grid-cols-3 gap-4">

      <button className="flex items-center justify-center gap-2 rounded-xl border border-blue-500 py-3 font-medium text-blue-600 transition hover:bg-blue-50">
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-blue-500 py-3 font-medium text-blue-600 transition hover:bg-blue-50">
        <CalendarDays className="h-4 w-4" />
        Reschedule
      </button>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-medium text-red-600 transition hover:bg-red-50">
        <CircleX className="h-4 w-4" />
        Cancel Installation
      </button>

    </div>

  </div>
)}

    </div>
  );
}