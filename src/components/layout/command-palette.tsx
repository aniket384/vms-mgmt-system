"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return navigationItems;
    return navigationItems.filter((item) => item.label.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
      if (event.key === "Escape") onOpenChange(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="mx-auto mt-16 max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            autoFocus
            className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none"
            placeholder="Jump to dashboard, live view, cameras..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="button" className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-900" onClick={() => onOpenChange(false)} aria-label="Close command palette">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">No matching command found.</p>
          ) : results.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn("flex items-center gap-3 rounded-md px-3 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-900")}
              >
                <Icon className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
