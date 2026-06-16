import { AlertTriangle, HardDrive } from "lucide-react";
import { StorageUsageChart } from "@/components/charts/vms-charts";
import { PageHeader } from "@/components/common/page-header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function StoragePage() {
  return (
    <>
      <PageHeader title="Storage" description="Storage capacity, usage distribution, remaining capacity, and system alerts." />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total Storage" value="22.5 TB" helper="NVR Cluster 01" icon={HardDrive} />
        <MetricCard label="Used Storage" value="18.4 TB" helper="82% allocated" icon={HardDrive} />
        <MetricCard label="Remaining" value="4.1 TB" helper="Estimated 5 days" icon={HardDrive} />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <StorageUsageChart />
        <Card>
          <CardHeader><CardTitle>Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3 rounded-md bg-amber-500/10 p-3 text-amber-700 dark:text-amber-300"><AlertTriangle className="h-5 w-5" />Storage threshold crossed</div>
            <Progress value={82} />
            <Progress value={68} />
            <Progress value={44} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
