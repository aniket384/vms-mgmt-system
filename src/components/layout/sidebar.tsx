"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-950 lg:block",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500 text-slate-950">
          <ShieldCheck className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">VMS Control</p>
            <p className="text-xs text-slate-500">Enterprise Surveillance</p>
          </div>
        )}
      </div>
      <nav className="space-y-1 p-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                active && "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
                collapsed && "justify-center px-0",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
