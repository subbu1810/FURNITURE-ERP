"use client";

import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import StockHeader from "@/components/inventory/StockHeader";
import StockKPIs from "@/components/inventory/StockKPIs";
import StockFilters from "@/components/inventory/StockFilters";
import StockTable from "@/components/inventory/StockTable";
import ProductModal from "@/components/inventory/ProductModal";
import StockInModal from "@/components/inventory/StockInModal";
import Pagination from "@/components/inventory/Pagination";


import {
  Package,
  Warehouse,
  Search,
  TriangleAlert,
  CircleX,
  Eye,
  MoreVertical,
  Filter,
} from "lucide-react";

import { useState } from "react";




function StockList() {

    const router = useRouter();

    const [showProduct, setShowProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

    const [showMenu, setShowMenu] = useState(false);
    const [selectedMenuProduct, setSelectedMenuProduct] =
    useState<Product | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [appliedCategory, setAppliedCategory] = useState("All Categories");
    const [appliedStatus, setAppliedStatus] = useState("All Status");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [showStockForm, setShowStockForm] = useState(false);
    
   

const filteredProducts = products.filter((item) => {

  const categoryMatch =
  appliedCategory === "All Categories" ||
  item.category === appliedCategory;

const statusMatch =
  appliedStatus === "All Status" ||
  item.status === appliedStatus;
  const searchMatch =
    item.product
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    item.sku
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  return (
    categoryMatch &&
    statusMatch &&
    searchMatch
  );
});

const lastIndex = currentPage * itemsPerPage;
const firstIndex = lastIndex - itemsPerPage;

const currentProducts =
  filteredProducts.slice(
    firstIndex,
    lastIndex
  );

  const inStockCount = products.filter(
  (item) => item.status === "In Stock"
).length;

const lowStockCount = products.filter(
  (item) => item.status === "Low Stock"
).length;

const outOfStockCount = products.filter(
  (item) => item.status === "Out Of Stock"
).length;

const inStockPercentage =
  products.length > 0
    ? ((inStockCount / products.length) * 100).toFixed(2)
    : "0";

    const lowStockPercentage =
  products.length > 0
    ? ((lowStockCount / products.length) * 100).toFixed(2)
    : "0";

    const outOfStockPercentage =
  products.length > 0
    ? ((outOfStockCount / products.length) * 100).toFixed(2)
    : "0";

    const totalStockValue = products.reduce(
  (total, item) =>
    total +
    Number(
      item.value
        .replace("₹", "")
        .replaceAll(",", "")
    ),
  0
);

  return (
    <div className="layout">
      

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-slate-100 p-8">


        {/* Topbar */}
        <StockHeader
  onStockIn={() => setShowStockForm(true)}
/>

        {/* Cards */}
    <StockKPIs
  totalItems={products.length}
  inStockCount={inStockCount}
  lowStockCount={lowStockCount}
  outOfStockCount={outOfStockCount}
  inStockPercentage={inStockPercentage}
  lowStockPercentage={lowStockPercentage}
  outOfStockPercentage={outOfStockPercentage}
  totalStockValue={totalStockValue}
/>

        {/* Filters */}
       <StockFilters
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  showFilter={showFilter}
  setShowFilter={setShowFilter}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  selectedStatus={selectedStatus}
  setSelectedStatus={setSelectedStatus}
  setAppliedCategory={setAppliedCategory}
  setAppliedStatus={setAppliedStatus}
/>

        {/* Table */}

<StockTable
  products={currentProducts}
  showMenu={showMenu}
  setShowMenu={setShowMenu}
  selectedMenuProduct={selectedMenuProduct}
  setSelectedMenuProduct={setSelectedMenuProduct}
  setSelectedProduct={setSelectedProduct}
  setShowProduct={setShowProduct}
/>

       <Pagination
  currentPage={currentPage}
  totalItems={filteredProducts.length}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
/>
      </div>


      

<StockInModal
  open={showStockForm}
  onClose={() => setShowStockForm(false)}
/>

    <ProductModal
  open={showProduct}
  product={selectedProduct}
  onClose={() => setShowProduct(false)}
/>
    </div>
  );
}

export default StockList;