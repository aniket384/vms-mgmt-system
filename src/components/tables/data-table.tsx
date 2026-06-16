"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ArrowUpDown, Download, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/common/state-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadCsv, objectRowsToCsv } from "@/lib/csv";

export function DataTable<TData extends object>({
  data,
  columns,
  searchPlaceholder = "Search...",
  exportFilename = "vms-export.csv",
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchPlaceholder?: string;
  exportFilename?: string;
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  // TanStack Table intentionally returns function-heavy instances for table state.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const visibleRows = table.getFilteredRowModel().rows.map((row) => row.original);

  function exportCsv() {
    if (visibleRows.length === 0) {
      toast.warning("No rows available to export");
      return;
    }
    downloadCsv(exportFilename, objectRowsToCsv(visibleRows as Array<Record<string, unknown>>));
    toast.success("CSV export generated");
  }

  function demoBulkDelete() {
    toast.info("Bulk delete is disabled in demo mode");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-10" placeholder={searchPlaceholder} value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={exportCsv} aria-label="Export filtered rows to CSV"><Download className="h-4 w-4" />CSV Export</Button>
          <Button variant="danger" onClick={demoBulkDelete} aria-label="Bulk delete selected rows"><Trash2 className="h-4 w-4" />Bulk Delete</Button>
        </div>
      </div>
      {table.getRowModel().rows.length === 0 ? (
        <EmptyState title="No matching records" description="Clear the search box or try a different query." />
      ) : <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-100 text-left text-xs uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3 font-semibold">
                      {header.isPlaceholder ? null : (
                        <button
                          className="inline-flex items-center gap-2 text-left"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && <ArrowUpDown className="h-3.5 w-3.5" />}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/70">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-slate-700 dark:text-slate-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}
