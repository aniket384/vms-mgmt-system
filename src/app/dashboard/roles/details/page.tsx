import { permissions } from "@/constants/navigation";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function RoleDetailsPage() {
  return (
    <>
      <PageHeader title="Role Details" description="Read-only overview of role capabilities and assigned permissions." />
      <Card><CardContent className="grid gap-3 md:grid-cols-2">{permissions.map((permission) => <div key={permission} className="rounded-md bg-slate-100 p-3 dark:bg-slate-900">{permission}</div>)}</CardContent></Card>
    </>
  );
}
