import { Bell } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { notifications } from "@/mock-data/vms";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Operator notification center for system alerts and workflow reminders." />
      <div className="grid gap-3">
        {notifications.map((notification) => (
          <Card key={notification}>
            <CardContent className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                <Bell className="h-4 w-4" />
              </div>
              <p className="text-sm">{notification}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
