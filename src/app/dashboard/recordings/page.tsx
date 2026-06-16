"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Share2, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { recordings } from "@/mock-data/vms";
import type { Recording } from "@/types";

const columns: ColumnDef<Recording>[] = [
  { accessorKey: "id", header: "Recording ID" },
  { accessorKey: "cameraName", header: "Camera Name" },
  { accessorKey: "startTime", header: "Start Time" },
  { accessorKey: "endTime", header: "End Time" },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "size", header: "Size" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "ready" ? "green" : row.original.status === "processing" ? "amber" : "neutral"}>{row.original.status}</Badge> },
  { id: "actions", header: "Actions", cell: () => <div className="flex gap-1"><Eye className="h-4 w-4" /><Download className="h-4 w-4" /><Share2 className="h-4 w-4" /><Trash2 className="h-4 w-4" /></div> },
];

export default function RecordingsPage() {
  return (
    <>
      <PageHeader title="Recordings" description="Search, filter, sort, preview, download, share, delete, and export dummy recording records." />
      <DataTable data={recordings} columns={columns} searchPlaceholder="Search recordings..." />
    </>
  );
}
