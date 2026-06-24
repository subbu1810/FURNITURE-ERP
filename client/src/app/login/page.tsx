"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sofa } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@furnitureerp.in");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulated auth — in production this calls the real auth API
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-page px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center">
            <Sofa size={20} className="text-white" />
          </div>
          <span className="text-[18px] font-bold text-surface-text">FURNITURE ERP</span>
        </div>

        <div className="bg-white rounded-card border border-surface-border shadow-card p-6">
          <h1 className="text-[16px] font-semibold text-surface-text mb-1">Sign in to your account</h1>
          <p className="text-[12.5px] text-surface-muted mb-5">
            Enter your credentials to access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-surface-text">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-surface-text">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-[13px] border border-surface-border rounded-md px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-surface-muted"
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && <p className="text-[12px] text-status-red">{error}</p>}

            <div className="flex items-center justify-between text-[12px]">
              <label className="flex items-center gap-1.5 text-surface-muted">
                <input type="checkbox" className="rounded border-surface-border" />
                Remember me
              </label>
              <button type="button" className="text-brand-500 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 disabled:opacity-60 transition-colors"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11.5px] text-surface-muted mt-4">
          © 2025 Furniture ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
}
