import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "green" | "red" | "amber" | "blue" | "neutral";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "green" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
        tone === "red" && "bg-red-500/15 text-red-600 dark:text-red-300",
        tone === "amber" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
        tone === "blue" && "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
        tone === "neutral" && "bg-slate-500/15 text-slate-700 dark:text-slate-300",
      )}
    >
      {children}
    </span>
  );
}
