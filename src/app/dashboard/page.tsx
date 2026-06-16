import { Activity, Camera, Database, HardDrive, Users, Video } from "lucide-react";
import { CameraStatusChart, RecordingStatsChart, StorageUsageChart } from "@/components/charts/vms-charts";
import { PageHeader } from "@/components/common/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cameras, events, users } from "@/mock-data/vms";

export default function DashboardPage() {
  const online = cameras.filter((camera) => camera.status === "online").length;
  return (
    <>
      <PageHeader title="Dashboard" description="Operational overview across cameras, recordings, storage, users, and security events." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Total Cameras" value={String(cameras.length)} helper="Across 4 facility zones" icon={Camera} />
        <MetricCard label="Online Cameras" value={String(online)} helper="Live streams available" icon={Video} />
        <MetricCard label="Offline Cameras" value={String(cameras.length - online)} helper="Requires operator action" icon={Activity} />
        <MetricCard label="Total Users" value={String(users.length)} helper="Frontend mock accounts" icon={Users} />
        <MetricCard label="Storage Used" value="82%" helper="18.4 TB of 22.5 TB" icon={HardDrive} />
        <MetricCard label="Events Today" value={String(events.length)} helper="3 open incidents" icon={Database} />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <CameraStatusChart />
        <RecordingStatsChart />
        <StorageUsageChart />
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-2 rounded-md bg-slate-100 p-3 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{event.type}</p>
                <p className="text-sm text-slate-500">{event.camera} · {event.timestamp}</p>
              </div>
              <Badge tone={event.severity === "critical" ? "red" : event.severity === "high" ? "amber" : "blue"}>{event.severity}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
