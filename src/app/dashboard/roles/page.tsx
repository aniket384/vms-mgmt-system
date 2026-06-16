"use client";

import Link from "next/link";
import { permissions } from "@/constants/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const roles = ["Super Admin", "Admin", "Operator", "Viewer", "Custom Role"];

export default function RolesPage() {
  return (
    <>
      <PageHeader title="Roles & Permissions" description="RBAC role list with permission toggles for cameras, playback, users, roles, audit logs, and settings." action={<Link href="/dashboard/roles/create"><Button>Create Role</Button></Link>} />
      <div className="grid gap-4 xl:grid-cols-2">
        {roles.map((role) => (
          <Card key={role}>
            <CardHeader><CardTitle>{role}</CardTitle></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {permissions.map((permission, index) => (
                <label key={permission} className="flex items-center justify-between rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-900">
                  {permission}
                  <input type="checkbox" defaultChecked={role === "Super Admin" || index < 5} className="accent-cyan-500" />
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
