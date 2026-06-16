"use client";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cameraStatusData, recordingStats, storageUsage } from "@/mock-data/vms";

const colors = ["#06b6d4", "#ef4444", "#f59e0b", "#64748b"];

function useMounted() {
  const [mounted, setMounted] = useState(false);
  // Recharts needs browser layout dimensions; this deliberately gates chart render until mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}

function ChartFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-64 min-h-64">
        {children}
      </CardContent>
    </Card>
  );
}

export function CameraStatusChart() {
  const mounted = useMounted();
  return (
    <ChartFrame title="Camera Status">
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={cameraStatusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
              {cameraStatusData.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : <div className="h-full rounded-md bg-slate-100 dark:bg-slate-900" />}
    </ChartFrame>
  );
}

export function RecordingStatsChart() {
  const mounted = useMounted();
  return (
    <ChartFrame title="Recording Statistics">
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={recordingStats}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : <div className="h-full rounded-md bg-slate-100 dark:bg-slate-900" />}
    </ChartFrame>
  );
}

export function StorageUsageChart() {
  const mounted = useMounted();
  return (
    <ChartFrame title="Storage Usage">
      {mounted ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={storageUsage} dataKey="value" nameKey="name" outerRadius={92}>
              {storageUsage.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : <div className="h-full rounded-md bg-slate-100 dark:bg-slate-900" />}
    </ChartFrame>
  );
}
