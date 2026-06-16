"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Plus, Power, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Camera } from "@/types";
import { vmsService } from "@/services/vms-service";

const columns: ColumnDef<Camera>[] = [
  { accessorKey: "name", header: "Camera Name" },
  { accessorKey: "id", header: "Camera ID" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "ipAddress", header: "IP Address" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "online" ? "green" : "red"}>{row.original.status}</Badge> },
  { accessorKey: "resolution", header: "Resolution" },
  { accessorKey: "storage", header: "Storage" },
  { id: "actions", header: "Actions", cell: ({ row }) => <div className="flex gap-1">
    {[
      { label: "View", icon: Eye },
      { label: "Edit", icon: Pencil },
      { label: row.original.status === "online" ? "Disable" : "Enable", icon: Power },
      { label: "Delete", icon: Trash2 },
    ].map(({ label, icon: Icon }) => (
      <button key={label} type="button" className="rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`${label} ${row.original.name}`} onClick={() => toast.info(`${label} is disabled in demo mode`)}>
        <Icon className="h-4 w-4" />
      </button>
    ))}
  </div> },
];

export default function CamerasPage() {
  const cameras = vmsService.getCameras();
  return (
    <>
      <PageHeader title="Cameras" description="Manage camera inventory, network metadata, stream state, and storage assignments." action={<Button><Plus className="h-4 w-4" />Add Camera</Button>} />
      <DataTable data={cameras} columns={columns} searchPlaceholder="Search cameras..." exportFilename="cameras.csv" />
    </>
  );
}
