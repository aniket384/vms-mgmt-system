"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, X } from "lucide-react";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useUiStore((state) => state.sidebarCollapsed);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const closeMobileSidebar = useUiStore((state) => state.closeMobileSidebar);

  const navigation = (
    <nav className="space-y-1 p-3">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            onClick={closeMobileSidebar}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
              active && "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className={cn("truncate", collapsed && "lg:hidden")}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
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
        {navigation}
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/60 opacity-0 backdrop-blur-sm transition lg:hidden",
          mobileSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
        )}
        aria-hidden={!mobileSidebarOpen}
        onClick={closeMobileSidebar}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[min(86vw,320px)] border-r border-slate-200 bg-white shadow-2xl transition-transform duration-200 dark:border-slate-800 dark:bg-slate-950 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileSidebarOpen}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500 text-slate-950">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">VMS Control</p>
            <p className="text-xs text-slate-500">Enterprise Surveillance</p>
          </div>
          </div>
          <Button variant="ghost" className="h-10 w-10 px-0" onClick={closeMobileSidebar} aria-label="Close navigation menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        {navigation}
      </aside>
    </>
  );
}
