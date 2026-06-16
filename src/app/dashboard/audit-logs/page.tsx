"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/common/page-header";
import { DataTable } from "@/components/tables/data-table";
import { vmsService } from "@/services/vms-service";
import type { AuditLog } from "@/types";

const columns: ColumnDef<AuditLog>[] = [
  { accessorKey: "user", header: "User" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "module", header: "Module" },
  { accessorKey: "timestamp", header: "Timestamp" },
  { accessorKey: "ipAddress", header: "IP Address" },
];

export default function AuditLogsPage() {
  const auditLogs = vmsService.getAuditLogs();
  return (
    <>
      <PageHeader title="Audit Logs" description="Searchable mock audit trail for user activity, system actions, modules, timestamps, and IP addresses." />
      <DataTable data={auditLogs} columns={columns} searchPlaceholder="Search audit logs..." exportFilename="audit-logs.csv" />
    </>
  );
}
