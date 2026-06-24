"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Smartphone, Monitor } from "lucide-react";
import { SaveBar } from "./SaveBar";
import { cn } from "@/lib/utils";

const INITIAL_SESSIONS = [
  { id: 1, device: "Chrome on Windows", location: "Bengaluru, IN", current: true, icon: Monitor },
  { id: 2, device: "Safari on iPhone", location: "Bengaluru, IN", current: false, icon: Smartphone },
];

export function SecurityTab() {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [twoFA, setTwoFA] = useState(false);

  const handleSave = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setError("Please fill in all password fields.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (newPwd.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    setError("");
    setSaved(true);
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Password */}
      <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
        <h2 className="text-[15px] font-semibold text-surface-text mb-1">Change Password</h2>
        <p className="text-[12.5px] text-surface-muted mb-5">
          Use a strong password you don't use elsewhere.
        </p>

        <div className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
              />
              <button
                onClick={() => setShowCurrent((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-muted"
              >
                {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
              />
              <button
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-muted"
              >
                {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-medium text-surface-text">Confirm New Password</label>
            <input
              type="password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
            />
          </div>
          {error && <p className="text-[12px] text-status-red">{error}</p>}
        </div>

        <SaveBar onSave={handleSave} saved={saved} />
      </div>

      {/* 2FA */}
      <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-status-greenBg flex items-center justify-center shrink-0">
              <ShieldCheck size={16} className="text-status-green" />
            </div>
            <div>
              <p className="text-[13.5px] font-medium text-surface-text">Two-Factor Authentication</p>
              <p className="text-[11.5px] text-surface-muted">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFA((v) => !v)}
            className={cn(
              "w-10 h-5.5 rounded-full relative transition-colors shrink-0",
              twoFA ? "bg-brand-500" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full transition-transform",
                twoFA && "translate-x-4.5"
              )}
            />
          </button>
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-white rounded-card border border-surface-border shadow-card p-5">
        <h2 className="text-[15px] font-semibold text-surface-text mb-1">Active Sessions</h2>
        <p className="text-[12.5px] text-surface-muted mb-4">
          These are devices currently signed in to your account.
        </p>
        <div className="space-y-2">
          {sessions.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="flex items-center justify-between border border-surface-border rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-surface-muted" />
                  <div>
                    <p className="text-[13px] font-medium text-surface-text">
                      {s.device} {s.current && <span className="text-status-green text-[11px] font-normal">(this device)</span>}
                    </p>
                    <p className="text-[11.5px] text-surface-muted">{s.location}</p>
                  </div>
                </div>
                {!s.current && (
                  <button
                    onClick={() => setSessions((prev) => prev.filter((session) => session.id !== s.id))}
                    className="text-[12px] text-status-red font-medium hover:underline"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
