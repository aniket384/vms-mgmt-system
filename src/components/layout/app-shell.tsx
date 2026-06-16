import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex min-h-dvh">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
