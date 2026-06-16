"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TabsPanel({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => <Button key={tab} variant={active === tab ? "primary" : "secondary"} onClick={() => setActive(tab)}>{tab}</Button>)}
      </div>
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm"><span>Policy name</span><input className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-900" defaultValue={`${active} policy`} /></label>
          <label className="space-y-2 text-sm"><span>Status</span><select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-900"><option>Enabled</option><option>Disabled</option></select></label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-cyan-500" />Notify administrators</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={active !== "Security"} className="accent-cyan-500" />Allow operator overrides</label>
        </CardContent>
      </Card>
    </div>
  );
}
