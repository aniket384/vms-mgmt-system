"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { events } from "@/mock-data/vms";
import type { EventItem } from "@/types";

const columns: ColumnDef<EventItem>[] = [
  { accessorKey: "id", header: "Event ID" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "camera", header: "Source" },
  { accessorKey: "severity", header: "Severity", cell: ({ row }) => <Badge tone={row.original.severity === "critical" ? "red" : row.original.severity === "high" ? "amber" : "blue"}>{row.original.severity}</Badge> },
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "status", header: "Status" },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader title="Events" description="Motion, offline, storage, login, and tamper events with severity badges and table controls." />
      <DataTable data={events} columns={columns} searchPlaceholder="Search events..." />
    </>
  );
}
