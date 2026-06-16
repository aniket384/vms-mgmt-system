"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Gauge, MonitorPlay, PlaySquare, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { label: "Home", href: "/dashboard", icon: Gauge },
  { label: "Live", href: "/dashboard/live-view", icon: MonitorPlay },
  { label: "Playback", href: "/dashboard/playback", icon: PlaySquare },
  { label: "Cameras", href: "/dashboard/cameras", icon: Camera },
  { label: "Events", href: "/dashboard/events", icon: ShieldAlert },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:hidden" aria-label="Mobile primary navigation">
      <div className="grid grid-cols-5 gap-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-medium text-slate-500",
                active && "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
