"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { KeyRound, Pencil, Trash2, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import type { VmsUser } from "@/types";
import { users } from "@/mock-data/vms";

const columns: ColumnDef<VmsUser>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "active" ? "green" : "red"}>{row.original.status}</Badge> },
  { accessorKey: "lastLogin", header: "Last Login" },
  { id: "actions", header: "Actions", cell: () => <div className="flex gap-1"><Pencil className="h-4 w-4" /><KeyRound className="h-4 w-4" /><UserCheck className="h-4 w-4" /><Trash2 className="h-4 w-4" /></div> },
];

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Frontend-only user management with search, sorting, pagination, bulk actions, and CSV export affordances." />
      <DataTable data={users} columns={columns} searchPlaceholder="Search users..." />
    </>
  );
}
