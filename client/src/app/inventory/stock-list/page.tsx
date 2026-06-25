"use client";

import { useState, useEffect } from "react";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useRouter } from "next/navigation";
import { CATEGORIES, WAREHOUSES, LOCATIONS, STATUSES, type StockItem } from "@/lib/inventory-data";
import { Topbar } from "@/components/layout/Topbar";
import {
  FaBox,
  FaWarehouse,
  FaSearch,
  FaExclamationTriangle,
  FaTimesCircle,
  FaEye,
  FaEllipsisV,
  FaFilter,
} from "react-icons/fa";
import "./page.css";

function StockList() {
  const [mounted, setMounted] = useState(false);
  const [viewItem, setViewItem] = useState<StockItem | null>(null);
  const [editItem, setEditItem] = useState<StockItem | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const {
    items,
    searchQuery,
    category,
    warehouse,
    location,
    status,
    currentPage,
    pageSize,
    selectedIds,
    setSearchQuery,
    setCategory,
    setWarehouse,
    setLocation,
    setStatus,
    setPage,
    toggleSelect,
    toggleSelectAll,
    getFilteredItems,
    getStats,
  } = useInventoryStore();

  const filteredItems = getFilteredItems();
  const stats = getStats();

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Add all visible IDs to the selection
      currentItems.forEach(item => {
        if (!selectedIds.has(item.id)) {
          toggleSelect(item.id);
        }
      });
    } else {
      // Remove all visible IDs from the selection
      currentItems.forEach(item => {
        if (selectedIds.has(item.id)) {
          toggleSelect(item.id);
        }
      });
    }
  };

  const isAllSelected = currentItems.length > 0 && currentItems.every((i) => selectedIds.has(i.id));

  const router = useRouter();

  if (!mounted) return null;

  const handleExport = () => {
    const headers = ["SKU", "Product Name", "Category", "Warehouse", "Location", "Available Qty", "Status", "Stock Value"];
    const csvContent = [
      headers.join(","),
      ...currentItems.map(item => 
        [item.sku, `"${item.productName}"`, item.category, `"${item.warehouse}"`, `"${item.location}"`, item.availableQty, item.status, item.stockValue].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stock_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-surface-page">
      <Topbar 
        title="Stock List" 
        breadcrumb={["Inventory", "Stock List"]} 
        showOutletFilter={false}
        showDateFilter={false}
        actionSlot={
          <>
            <button onClick={handleExport} className="px-4 py-2 border border-surface-border rounded-lg text-[13px] font-medium text-surface-text hover:bg-gray-50 mr-2 bg-white">Export</button>
            <button onClick={() => router.push("/inventory/stock-in")} className="px-4 py-2 bg-brand-600 text-white rounded-lg text-[13px] font-medium hover:bg-brand-700">+ Stock In</button>
          </>
        }
      />

      <div className="main">
        {/* Cards */}
        <div className="cards">
          <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatus("All Status")}>
            <div className="card-icon icon-blue">
              <FaBox />
            </div>
            <h4>Total Items</h4>
            <h2>{stats.totalItems.toLocaleString("en-IN")}</h2>
            <p className="card-link">View all items →</p>
          </div>

          <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatus("In Stock")}>
            <div className="card-icon icon-green">
              <FaWarehouse />
            </div>
            <h4>In Stock</h4>
            <h2>{stats.inStock.toLocaleString("en-IN")}</h2>
            <p className="card-percent green-text">
              {stats.totalItems > 0 ? ((stats.inStock / stats.totalItems) * 100).toFixed(2) : 0}% of total
            </p>
          </div>

          <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatus("Low Stock")}>
            <div className="card-icon icon-orange">
              <FaExclamationTriangle />
            </div>
            <h4>Low Stock</h4>
            <h2>{stats.lowStock.toLocaleString("en-IN")}</h2>
            <p className="card-percent orange-text">
              {stats.totalSKUs > 0 ? ((stats.lowStock / stats.totalSKUs) * 100).toFixed(2) : 0}% of SKUs
            </p>
          </div>

          <div className="card cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatus("Out of Stock")}>
            <div className="card-icon icon-red">
              <FaTimesCircle />
            </div>
            <h4>Out Of Stock</h4>
            <h2>{stats.outOfStock.toLocaleString("en-IN")}</h2>
            <p className="card-percent red-text">
              {stats.totalSKUs > 0 ? ((stats.outOfStock / stats.totalSKUs) * 100).toFixed(2) : 0}% of SKUs
            </p>
          </div>

          <div className="card">
            <div className="card-icon icon-blue">₹</div>
            <h4>Stock Value</h4>
            <h2>₹{stats.stockValue.toLocaleString("en-IN")}</h2>
            <p className="card-link">View valuation →</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            {WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}
          </select>

          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <div className="search">
            <FaSearch />
            <input
              placeholder="Search by product / SKU / Barcode"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="filter-btn">
            <FaFilter />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} /></th>
                <th>Image</th>
                <th>SKU / Barcode</th>
                <th>Product</th>
                <th>Category</th>
                <th>Warehouse</th>
                <th>Location</th>
                <th>Available Qty</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((item) => (
                <tr key={item.id}>
                  <td><input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleSelect(item.id)} /></td>
                  <td>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.productName)}&background=f3f4f6&color=1f2937&size=100`}
                      alt={item.productName}
                      className="product-img"
                    />
                  </td>
                  <td>
                    <strong>{item.sku}</strong>
                    <div className="barcode">{item.barcode}</div>
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.warehouse}</td>
                  <td>{item.location}</td>
                  <td>
                    <span className={item.status === "In Stock" ? "qty-green" : item.status === "Low Stock" ? "qty-orange" : "qty-red"}>
                      {item.availableQty}
                    </span>
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <span className={item.status === "In Stock" ? "green" : item.status === "Low Stock" ? "orange" : "red"}>
                      {item.status}
                    </span>
                  </td>
                  <td>₹{item.stockValue.toLocaleString("en-IN")}</td>
                  <td>
                    <div className="action-icons relative">
                      <FaEye onClick={() => setViewItem(item)} title="View Details" />
                      <FaEllipsisV 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                        }} 
                        title="More Options" 
                        className="cursor-pointer"
                      />
                      {openDropdownId === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-[9]" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                            }}
                          />
                          <div className="absolute right-0 top-full mt-1 bg-white border border-surface-border rounded-lg shadow-lg w-32 z-10 py-1 text-left">
                            <button 
                              className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 text-surface-text transition-colors"
                              onClick={() => {
                                setEditItem(item);
                                setOpenDropdownId(null);
                              }}
                            >
                              Edit Item
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 text-brand-600 transition-colors"
                              onClick={() => {
                                router.push('/inventory/stock-in');
                                setOpenDropdownId(null);
                              }}
                            >
                              Add Stock
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-[13px] hover:bg-red-50 text-red-600 transition-colors"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${item.productName}?`)) {
                                  useInventoryStore.getState().deleteItem(item.id);
                                }
                                setOpenDropdownId(null);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={12} style={{ textAlign: "center", padding: "40px" }} className="text-surface-muted">No items found matching the filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

          <div className="table-footer flex justify-between items-center">
          <div>
            Showing {filteredItems.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredItems.length)} of {filteredItems.length} entries
          </div>
          <div className="pagination">
            <button onClick={() => setPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>{"<"}</button>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active-page" : ""}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button onClick={() => setPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>{">"}</button>
          </div>
        </div>
      </div>
      
      {/* Item Details Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewItem(null)}>
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-surface-border">
              <h3 className="font-semibold text-lg text-surface-text">Item Details</h3>
              <button onClick={() => setViewItem(null)} className="text-gray-400 hover:text-gray-600">
                <FaTimesCircle size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm text-surface-text">
              <div className="flex items-center gap-4 mb-6">
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(viewItem.productName)}&background=f3f4f6&color=1f2937&size=100`} alt={viewItem.productName} className="w-16 h-16 rounded-lg" />
                <div>
                  <h4 className="font-semibold text-base">{viewItem.productName}</h4>
                  <p className="text-surface-muted text-xs">{viewItem.sku} | {viewItem.barcode}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-surface-muted mb-1 text-xs">Category</p><p className="font-medium">{viewItem.category}</p></div>
                <div><p className="text-surface-muted mb-1 text-xs">Status</p><p className="font-medium">{viewItem.status}</p></div>
                <div><p className="text-surface-muted mb-1 text-xs">Warehouse</p><p className="font-medium">{viewItem.warehouse}</p></div>
                <div><p className="text-surface-muted mb-1 text-xs">Location</p><p className="font-medium">{viewItem.location}</p></div>
                <div><p className="text-surface-muted mb-1 text-xs">Available Qty</p><p className="font-medium">{viewItem.availableQty} {viewItem.unit}</p></div>
                <div><p className="text-surface-muted mb-1 text-xs">Stock Value</p><p className="font-medium">₹{viewItem.stockValue.toLocaleString("en-IN")}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setEditItem(null)}>
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-surface-border">
              <h3 className="font-semibold text-lg text-surface-text">Edit Item</h3>
              <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-gray-600">
                <FaTimesCircle size={20} />
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updates = {
                  productName: formData.get("productName") as string,
                  category: formData.get("category") as string,
                  warehouse: formData.get("warehouse") as string,
                  location: formData.get("location") as string,
                  availableQty: parseInt(formData.get("availableQty") as string, 10),
                  stockValue: parseInt(formData.get("stockValue") as string, 10),
                };
                useInventoryStore.getState().updateItem(editItem.id, updates);
                setEditItem(null);
              }}
              className="p-6 space-y-4 text-sm text-surface-text"
            >
              <div>
                <label className="block text-xs font-medium text-surface-muted mb-1">Product Name</label>
                <input name="productName" defaultValue={editItem.productName} required className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-surface-muted mb-1">Category</label>
                  <select name="category" defaultValue={editItem.category} className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {CATEGORIES.filter(c => c !== "All Categories").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-muted mb-1">Warehouse</label>
                  <select name="warehouse" defaultValue={editItem.warehouse} className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {WAREHOUSES.filter(w => w !== "All Warehouses").map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-muted mb-1">Location</label>
                  <select name="location" defaultValue={editItem.location} className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {LOCATIONS.filter(l => l !== "All Locations").map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-muted mb-1">Available Qty</label>
                  <input name="availableQty" type="number" min="0" defaultValue={editItem.availableQty} required className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-surface-muted mb-1">Stock Value (₹)</label>
                  <input name="stockValue" type="number" min="0" defaultValue={editItem.stockValue} required className="w-full px-3 py-2 border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-surface-border mt-2">
                <button type="button" onClick={() => setEditItem(null)} className="px-4 py-2 border border-surface-border rounded-lg text-sm font-medium hover:bg-gray-50 text-surface-text">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockList;