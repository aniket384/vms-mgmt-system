"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Moon, Search, Sun, UserCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { notifications } from "@/mock-data/vms";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const openMobileSidebar = useUiStore((state) => state.openMobileSidebar);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Button variant="ghost" className="h-10 w-10 px-0 lg:hidden" onClick={openMobileSidebar} aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="hidden h-10 w-10 px-0 lg:inline-flex" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="h-10 w-full max-w-xl rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900"
            placeholder="Search cameras, users, events, recordings..."
          />
        </div>
        <Button
          variant="ghost"
          className="h-10 w-10 px-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="hidden h-5 w-5 dark:block" />
          <Moon className="h-5 w-5 dark:hidden" />
        </Button>
        <div className="group relative">
          <Button variant="ghost" className="h-10 w-10 px-0" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="invisible absolute right-0 mt-2 w-80 rounded-lg border border-slate-200 bg-white p-3 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950">
            <p className="mb-2 text-sm font-semibold">Notifications</p>
            <div className="space-y-2">
              {notifications.map((item) => (
                <div key={item} className="rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-900">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="group relative">
          <Button variant="secondary" className="h-10">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.name ?? "Demo User"}</span>
          </Button>
          <div className="invisible absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-950">
            <Link className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900" href="/dashboard/profile">
              Profile
            </Link>
            <button
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-500/10"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
