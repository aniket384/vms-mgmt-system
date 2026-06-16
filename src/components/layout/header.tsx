"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Moon, Search, Sun, UserCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/layout/command-palette";
import { cn } from "@/lib/utils";
import { notifications } from "@/mock-data/vms";
import { useAuthStore } from "@/store/auth-store";
import { useUiStore } from "@/store/ui-store";

export function Header() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const openMobileSidebar = useUiStore((state) => state.openMobileSidebar);
  const [mounted, setMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // next-themes resolves the current theme only after hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function closeMenus(event: MouseEvent) {
      const target = event.target as Node;
      if (
        notificationsRef.current?.contains(target) ||
        profileRef.current?.contains(target)
      ) {
        return;
      }
      setNotificationsOpen(false);
      setProfileOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Button variant="ghost" className="h-10 w-10 px-0 lg:hidden" onClick={openMobileSidebar} aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="hidden h-10 w-10 px-0 lg:inline-flex" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        <button
          type="button"
          className="relative hidden h-10 flex-1 items-center rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-left text-sm text-slate-400 outline-none transition hover:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 md:flex"
          onClick={() => setCommandOpen(true)}
          aria-label="Open command palette"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <span className="truncate">Search cameras, users, events, recordings...</span>
          <span className="ml-auto rounded border border-slate-200 bg-white px-1.5 py-0.5 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950">⌘K</span>
        </button>
        <Button
          variant="ghost"
          className="h-10 w-10 px-0"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="relative" ref={notificationsRef}>
          <Button
            variant="ghost"
            className="h-10 w-10 px-0"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="menu"
            aria-controls="header-notifications-menu"
            onClick={() => {
              setNotificationsOpen((value) => !value);
              setProfileOpen(false);
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <div
            id="header-notifications-menu"
            role="menu"
            className={cn(
              "absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-3 shadow-lg transition dark:border-slate-800 dark:bg-slate-950",
              notificationsOpen ? "visible z-50 opacity-100" : "invisible opacity-0",
            )}
          >
            <p className="mb-2 text-sm font-semibold">Notifications</p>
            <div className="space-y-2">
              {notifications.map((item) => (
                <div key={item} role="menuitem" className="rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-900">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative" ref={profileRef}>
          <Button
            variant="secondary"
            className="h-10"
            aria-label="User menu"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-controls="header-profile-menu"
            onClick={() => {
              setProfileOpen((value) => !value);
              setNotificationsOpen(false);
            }}
          >
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">{user?.name ?? "Demo User"}</span>
          </Button>
          <div
            id="header-profile-menu"
            role="menu"
            className={cn(
              "absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-lg transition dark:border-slate-800 dark:bg-slate-950",
              profileOpen ? "visible z-50 opacity-100" : "invisible opacity-0",
            )}
          >
            <Link role="menuitem" className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-900" href="/dashboard/profile" onClick={() => setProfileOpen(false)}>
              Profile
            </Link>
            <button
              role="menuitem"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-500/10"
              onClick={() => {
                logout();
                setProfileOpen(false);
                router.push("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
