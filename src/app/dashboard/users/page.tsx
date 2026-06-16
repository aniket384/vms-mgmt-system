"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { KeyRound, Pencil, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import type { VmsUser } from "@/types";
import { vmsService } from "@/services/vms-service";

const columns: ColumnDef<VmsUser>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "active" ? "green" : "red"}>{row.original.status}</Badge> },
  { accessorKey: "lastLogin", header: "Last Login" },
  { id: "actions", header: "Actions", cell: ({ row }) => <div className="flex gap-1">
    {[
      { label: "Edit", icon: Pencil },
      { label: "Reset password", icon: KeyRound },
      { label: row.original.status === "active" ? "Deactivate" : "Activate", icon: UserCheck },
      { label: "Delete", icon: Trash2 },
    ].map(({ label, icon: Icon }) => (
      <button key={label} type="button" className="rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`${label} ${row.original.name}`} onClick={() => toast.info(`${label} is disabled in demo mode`)}>
        <Icon className="h-4 w-4" />
      </button>
    ))}
  </div> },
];

export default function UsersPage() {
  const users = vmsService.getUsers();
  return (
    <>
      <PageHeader title="Users" description="Frontend-only user management with search, sorting, pagination, bulk actions, and CSV export affordances." />
      <DataTable data={users} columns={columns} searchPlaceholder="Search users..." exportFilename="users.csv" />
    </>
  );
}
