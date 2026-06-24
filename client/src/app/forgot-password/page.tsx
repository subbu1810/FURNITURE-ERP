"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const forgotSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = React.useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSent(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fc] dark:bg-slate-950 p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 border border-primary/20">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Forgot Password?</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {isSent 
              ? "Check your inbox for a reset link." 
              : "No worries! Enter your email and we'll send you a recovery link."}
          </p>
        </div>

        {!isSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="mt-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  className={cn(
                    "block w-full pl-10 pr-3 py-3 border rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm",
                    errors.email && "border-destructive ring-destructive"
                  )}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive ml-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-primary/25"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="mt-8">
            <button
              onClick={() => setIsSent(false)}
              className="w-full py-3.5 px-4 border rounded-xl text-sm font-bold hover:bg-muted transition-all"
            >
              Resend Link
            </button>
          </div>
        )}

        <div className="text-center pt-4">
          <Link href="/login" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
