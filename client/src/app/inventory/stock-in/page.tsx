"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { useInventoryStore } from "@/store/useInventoryStore";
import { useRouter } from "next/navigation";

export default function StockInPage() {
  const router = useRouter();
  const { items, addStock } = useInventoryStore();
  
  const [sku, setSku] = useState("");
  const [qty, setQty] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(qty, 10);
    if (!sku || isNaN(quantity) || quantity <= 0) {
      setMessage("Please enter a valid SKU and quantity.");
      return;
    }
    
    const itemExists = items.some(item => item.sku === sku);
    if (!itemExists) {
      setMessage("SKU not found in inventory. Please add it as a new product first.");
      return;
    }
    
    addStock(sku, quantity);
    setMessage(`Successfully added ${quantity} units to ${sku}.`);
    setSku("");
    setQty("");
    
    // Auto-clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-surface-page">
      <Topbar 
        title="Stock In" 
        breadcrumb={["Inventory", "Stock In"]} 
        showOutletFilter={false}
        showDateFilter={false}
      />
      
      <div className="p-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-surface-border overflow-hidden">
          <div className="p-6 border-b border-surface-border">
            <h2 className="text-lg font-semibold text-surface-text">Add Stock</h2>
            <p className="text-sm text-surface-muted mt-1">Increase the available quantity for an existing SKU.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {message && (
              <div className={`p-4 rounded-md text-sm ${message.includes("Successfully") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-text mb-1">
                  SKU
                </label>
                <input 
                  type="text" 
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value.toUpperCase())}
                  placeholder="e.g. SOF-001"
                  className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-text mb-1">
                  Quantity to Add
                </label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="Enter quantity"
                  className="w-full px-3 py-2 border border-surface-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            </div>
            
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-border">
              <button 
                type="button" 
                onClick={() => router.push("/inventory/stock-list")}
                className="px-4 py-2 border border-surface-border rounded-lg text-sm font-medium hover:bg-gray-50 text-surface-text"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"
              >
                Confirm Stock In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
