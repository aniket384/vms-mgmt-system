"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { vmsService } from "@/services/vms-service";
import type { Recording } from "@/types";

const columns: ColumnDef<Recording>[] = [
  { accessorKey: "id", header: "Recording ID" },
  { accessorKey: "cameraName", header: "Camera Name" },
  { accessorKey: "startTime", header: "Start Time" },
  { accessorKey: "endTime", header: "End Time" },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "size", header: "Size" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "ready" ? "green" : row.original.status === "processing" ? "amber" : "neutral"}>{row.original.status}</Badge> },
  { id: "actions", header: "Actions", cell: ({ row }) => <div className="flex gap-1">
    {[
      { label: "Preview", icon: Eye },
      { label: "Download", icon: Download },
      { label: "Share", icon: Share2 },
      { label: "Delete", icon: Trash2 },
    ].map(({ label, icon: Icon }) => (
      <button key={label} type="button" className="rounded p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`${label} ${row.original.id}`} onClick={() => toast.info(`${label} is disabled in demo mode`)}>
        <Icon className="h-4 w-4" />
      </button>
    ))}
  </div> },
];

export default function RecordingsPage() {
  const recordings = vmsService.getRecordings();
  return (
    <>
      <PageHeader title="Recordings" description="Search, filter, sort, preview, download, share, delete, and export dummy recording records." />
      <DataTable data={recordings} columns={columns} searchPlaceholder="Search recordings..." exportFilename="recordings.csv" />
    </>
  );
}
