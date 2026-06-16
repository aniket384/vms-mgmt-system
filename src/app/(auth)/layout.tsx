import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">
        <section className="hidden bg-[radial-gradient(circle_at_top_left,#0e7490,transparent_38%),linear-gradient(135deg,#020617,#0f172a_50%,#111827)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyan-400 text-slate-950">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">VMS Management System</p>
              <p className="text-sm text-slate-300">Unified CCTV operations console</p>
            </div>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-semibold leading-tight">Secure video operations for every site, camera, and event.</h1>
            <p className="mt-5 text-lg text-slate-300">
              Monitor live feeds, investigate recordings, manage users, and inspect audit trails from one frontend-only mock system.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">24/7 monitoring</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">RBAC ready</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">Mock data layer</div>
          </div>
        </section>
        <section className="flex items-center justify-center bg-white p-6 text-slate-950 dark:bg-slate-950 dark:text-white">
          {children}
        </section>
      </div>
    </main>
  );
}
