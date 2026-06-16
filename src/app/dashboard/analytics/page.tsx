import { CameraStatusChart, RecordingStatsChart, StorageUsageChart } from "@/components/charts/vms-charts";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cameras } from "@/mock-data/vms";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Mock charts for uptime, storage growth, recording volume, user activity, and top cameras." />
      <div className="grid gap-4 xl:grid-cols-3">
        <CameraStatusChart />
        <RecordingStatsChart />
        <StorageUsageChart />
      </div>
      <Card className="mt-4">
        <CardHeader><CardTitle>Top Cameras by Uptime</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {cameras.slice(0, 4).map((camera) => (
            <div key={camera.id} className="rounded-md bg-slate-100 p-4 dark:bg-slate-900">
              <p className="font-medium">{camera.name}</p>
              <p className="mt-1 text-2xl font-semibold text-cyan-600 dark:text-cyan-300">{camera.uptime}%</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
