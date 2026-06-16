import { Camera, KeyRound, Upload } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" description="Editable operator profile with avatar upload UI, change password, and recent account activity." />
      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Card>
          <CardContent className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
              <Camera className="h-10 w-10" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Aarav Sharma</h2>
            <p className="text-sm text-slate-500">Super Admin</p>
            <Button className="mt-4" variant="secondary"><Upload className="h-4 w-4" />Upload Avatar</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input defaultValue="Aarav Sharma" />
            <Input defaultValue="admin@vms.local" />
            <Input placeholder="Current password" type="password" />
            <Input placeholder="New password" type="password" />
            <Button><KeyRound className="h-4 w-4" />Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
