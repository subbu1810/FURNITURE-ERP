"use client";

import { useState } from "react";
import { Package, Edit2, X, FileText, Hash, Boxes } from "lucide-react";
import { useProductionStore } from "@/store/useProductionStore";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const TABS = ["Overview", "BOM & Components", "Material Issue", "Work Orders", "Production", "History"] as const;

function DonutChart({ completed, planned }: { completed: number; planned: number }) {
  const pct = planned > 0 ? Math.min(100, Math.round((completed / planned) * 100)) : 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-32 h-32 shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F3F4F6" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#1565C0"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[20px] font-bold text-surface-text">{pct}%</span>
        <span className="text-[10px] text-surface-muted">Completed</span>
      </div>
    </div>
  );
}

function EditOrderModal({ orderId, orderNo, currentQty, onClose }: { orderId: string; orderNo: string; currentQty: number; onClose: () => void }) {
  const [qty, setQty] = useState(currentQty.toString());
  const updateOrder = useProductionStore(state => state.updateOrder);

  const handleSave = () => {
    const parsed = parseInt(qty, 10);
    if (!isNaN(parsed) && parsed > 0) {
      updateOrder(orderId, { plannedQty: parsed });
      alert(`Order ${orderNo} planned quantity successfully updated to ${parsed}.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="text-[15px] font-semibold text-surface-text">Edit Order {orderNo}</h2>
          <button onClick={onClose}><X size={18} className="text-surface-muted" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Planned Quantity *</label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function CancelOrderModal({ orderId, orderNo, onClose }: { orderId: string; orderNo: string; onClose: () => void }) {
  const cancelOrder = useProductionStore(state => state.cancelOrder);

  const handleCancel = () => {
    cancelOrder(orderId);
    alert(`Order ${orderNo} has been successfully cancelled.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="p-5">
          <div className="w-11 h-11 rounded-full bg-status-redBg flex items-center justify-center mb-3">
            <X size={18} className="text-status-red" />
          </div>
          <h2 className="text-[15px] font-semibold text-surface-text mb-1">Cancel Order {orderNo}?</h2>
          <p className="text-[13px] text-surface-muted">
            This will stop all pending production steps for this order. Completed work will not be reversed.
          </p>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-md border border-surface-border text-[13px] text-surface-text hover:bg-gray-50 transition-colors">
            Keep Order
          </button>
          <button onClick={handleCancel} className="flex-1 py-2 rounded-md bg-status-red text-white text-[13px] font-medium hover:bg-red-600 transition-colors">
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductionOrderDetail() {
  const { getSelectedOrder } = useProductionStore();
  const order = getSelectedOrder();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  if (!order) {
    return (
      <div className="bg-white rounded-card border border-surface-border shadow-card p-8 flex items-center justify-center h-full">
        <p className="text-[13px] text-surface-muted">Select a production order to view details.</p>
      </div>
    );
  }

  const inProgressQty = order.steps
    .filter((s) => s.status === "In Progress")
    .reduce((sum, s) => sum + s.completedQty, 0);
  const pendingQty = order.plannedQty - order.completedQty - inProgressQty;

  return (
    <>
      <div className="bg-white rounded-card border border-surface-border shadow-card flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-surface-border">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-surface-text">
              Production Order: <span className="text-brand-600">{order.orderNo}</span>
            </h2>
            <StatusBadge status={order.status} />
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Package size={18} className="text-surface-muted" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-surface-text">{order.product}</p>
                <p className="text-[11px] text-surface-muted">{order.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-surface-muted">
              <Boxes size={13} />
              Planned Qty: <span className="font-medium text-surface-text">{order.plannedQty} Nos</span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-surface-muted">
              <Hash size={13} />
              Planned Date: <span className="font-medium text-surface-text">{order.plannedDate}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-5 border-b border-surface-border overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab
                  ? "border-brand-500 text-brand-600"
                  : "border-transparent text-surface-muted hover:text-surface-text"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === "Overview" && (
            <>
              {/* Progress Summary */}
              <div>
                <h3 className="text-[12.5px] font-semibold text-surface-text mb-3">Progress Summary</h3>
                <div className="flex items-center gap-6">
                  <DonutChart completed={order.completedQty} planned={order.plannedQty} />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="text-surface-muted">Completed Qty</span>
                      <span className="font-medium text-status-green">{order.completedQty} Nos</span>
                    </div>
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="text-surface-muted">In Progress Qty</span>
                      <span className="font-medium text-status-blue">{Math.max(0, inProgressQty)} Nos</span>
                    </div>
                    <div className="flex items-center justify-between text-[12.5px]">
                      <span className="text-surface-muted">Pending Qty</span>
                      <span className="font-medium text-status-orange">{Math.max(0, pendingQty)} Nos</span>
                    </div>
                    <div className="flex items-center justify-between text-[12.5px] pt-2 border-t border-surface-border">
                      <span className="text-surface-muted">Total Qty</span>
                      <span className="font-semibold text-surface-text">{order.plannedQty} Nos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates + Additional info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[12.5px] font-semibold text-surface-text mb-3">Dates</h3>
                  <div className="space-y-2 text-[12.5px]">
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Planned Date</span>
                      <span className="font-medium text-surface-text">{order.plannedDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Start Date</span>
                      <span className="font-medium text-surface-text">{order.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Expected Completion</span>
                      <span className="font-medium text-surface-text">{order.expectedCompletion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Actual Completion</span>
                      <span className="font-medium text-surface-text">{order.actualCompletion ?? "—"}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[12.5px] font-semibold text-surface-text mb-3">Additional Information</h3>
                  <div className="space-y-2 text-[12.5px]">
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Created By</span>
                      <span className="font-medium text-surface-text">{order.createdBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Created Date</span>
                      <span className="font-medium text-surface-text">{order.createdDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-muted">Last Updated</span>
                      <span className="font-medium text-surface-text">{order.lastUpdated}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-surface-muted shrink-0">Notes</span>
                      <span className="font-medium text-surface-text text-right">{order.notes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Steps */}
              <div>
                <h3 className="text-[12.5px] font-semibold text-surface-text mb-3">Production Steps</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="table-th !pl-0">Step</th>
                        <th className="table-th">Work Center</th>
                        <th className="table-th">Planned Qty</th>
                        <th className="table-th">Completed Qty</th>
                        <th className="table-th">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.steps.map((s) => (
                        <tr key={s.step}>
                          <td className="table-td !pl-0 text-surface-muted">{s.step}</td>
                          <td className="table-td font-medium text-surface-text">{s.workCenter}</td>
                          <td className="table-td text-surface-muted">{s.plannedQty} Nos</td>
                          <td className="table-td text-surface-muted">{s.completedQty} Nos</td>
                          <td className="table-td">
                            <StatusBadge status={s.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab !== "Overview" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <FileText size={20} className="text-surface-muted" />
              </div>
              <p className="text-[13px] font-medium text-surface-text">{activeTab}</p>
              <p className="text-[12px] text-surface-muted mt-1 max-w-xs">
                {activeTab} details for {order.orderNo} will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-t border-surface-border">
          <button
            onClick={() => setShowEdit(true)}
            className="flex items-center gap-1.5 text-[13px] border border-surface-border rounded-md px-3 py-1.5 bg-white text-surface-text hover:bg-gray-50 transition-colors"
          >
            <Edit2 size={13} />
            Edit Order
          </button>
          <button
            onClick={() => setShowCancel(true)}
            className="flex items-center gap-1.5 text-[13px] border border-status-redBg rounded-md px-3 py-1.5 bg-status-redBg/40 text-status-red hover:bg-status-redBg/60 transition-colors"
          >
            <X size={13} />
            Cancel Order
          </button>
          <button onClick={() => setActiveTab("Work Orders")} className="flex items-center gap-1.5 text-[13px] rounded-md px-3 py-1.5 bg-brand-500 text-white hover:bg-brand-600 transition-colors ml-auto">
            View Work Orders
          </button>
        </div>
      </div>

      {showEdit && <EditOrderModal orderId={order.id} orderNo={order.orderNo} currentQty={order.plannedQty} onClose={() => setShowEdit(false)} />}
      {showCancel && <CancelOrderModal orderId={order.id} orderNo={order.orderNo} onClose={() => setShowCancel(false)} />}
    </>
  );
}
