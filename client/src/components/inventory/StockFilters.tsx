"use client";

import { Search, Filter } from "lucide-react";

interface StockFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  showFilter: boolean;
  setShowFilter: (value: boolean) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  selectedStatus: string;
  setSelectedStatus: (value: string) => void;

  setAppliedCategory: (value: string) => void;
  setAppliedStatus: (value: string) => void;
}

export default function StockFilters({
  searchTerm,
  setSearchTerm,
  showFilter,
  setShowFilter,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  setAppliedCategory,
  setAppliedStatus,
}: StockFiltersProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-3">

      {/* Category */}
      <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
        <option>All Categories</option>
        <option>Sofas</option>
        <option>Beds</option>
        <option>Dining</option>
        <option>Chairs</option>
        <option>Storage</option>
        <option>Tables</option>
        <option>Wardrobes</option>
      </select>

      {/* Warehouse */}
      <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
        <option>All Warehouses</option>
        <option>Main Warehouse</option>
        <option>HSR Warehouse</option>
        <option>BTM Warehouse</option>
      </select>

      {/* Location */}
      <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
        <option>All Locations</option>
        <option>Aisle 01 - Rack 01</option>
        <option>Aisle 01 - Rack 02</option>
        <option>Aisle 02 - Rack 01</option>
      </select>

      {/* Status */}
      <select className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
        <option>All Status</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out Of Stock</option>
      </select>

      {/* Search */}
      <div className="flex min-w-[300px] items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
        <Search size={16} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Product / SKU"
          className="ml-2 w-full outline-none"
        />
      </div>

      {/* Filter Button */}
      <div className="relative">

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <Filter size={16} />
          Filters
        </button>

        {showFilter && (

          <div className="absolute left-0 top-14 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">

            <h3 className="mb-3 font-semibold">
              Advanced Filters
            </h3>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option>All Categories</option>
              <option>Sofas</option>
              <option>Beds</option>
              <option>Dining</option>
              <option>Storage</option>
              <option>Chairs</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option>All Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out Of Stock</option>
            </select>

            <button
              className="w-full rounded-lg bg-blue-600 py-2 text-white"
              onClick={() => {
                setAppliedCategory(selectedCategory);
                setAppliedStatus(selectedStatus);
                setShowFilter(false);
              }}
            >
              Apply Filters
            </button>

          </div>

        )}

      </div>

    </div>
  );
}