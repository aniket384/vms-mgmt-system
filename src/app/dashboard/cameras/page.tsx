"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Power, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Camera } from "@/types";
import { cameras } from "@/mock-data/vms";

const columns: ColumnDef<Camera>[] = [
  { accessorKey: "name", header: "Camera Name" },
  { accessorKey: "id", header: "Camera ID" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "ipAddress", header: "IP Address" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "online" ? "green" : "red"}>{row.original.status}</Badge> },
  { accessorKey: "resolution", header: "Resolution" },
  { accessorKey: "storage", header: "Storage" },
  { id: "actions", header: "Actions", cell: () => <div className="flex gap-1"><Eye className="h-4 w-4" /><Pencil className="h-4 w-4" /><Power className="h-4 w-4" /><Trash2 className="h-4 w-4" /></div> },
];

export default function CamerasPage() {
  return (
    <>
      <PageHeader title="Cameras" description="Manage camera inventory, network metadata, stream state, and storage assignments." action={<Button><Plus className="h-4 w-4" />Add Camera</Button>} />
      <DataTable data={cameras} columns={columns} searchPlaceholder="Search cameras..." />
    </>
  );
}
