"use client";

import React from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b bg-card px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-muted px-3 py-2 rounded-lg w-96">
        <Search size={18} className="text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search for projects, leads, or inventory..." 
          className="bg-transparent border-none outline-none text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
        </button>

        <div className="h-8 w-[1px] bg-border mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}
