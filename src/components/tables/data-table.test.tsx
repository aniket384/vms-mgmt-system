import type { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable } from "@/components/tables/data-table";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

type Row = {
  id: string;
  name: string;
};

const columns: ColumnDef<Row>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

describe("DataTable", () => {
  it("filters rows and shows an empty state", async () => {
    const user = userEvent.setup();
    render(<DataTable data={[{ id: "1", name: "Main Gate" }]} columns={columns} />);

    await user.type(screen.getByPlaceholderText("Search..."), "missing");

    expect(screen.getByText("No matching records")).toBeInTheDocument();
  });

  it("exports filtered rows to CSV", async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    render(<DataTable data={[{ id: "1", name: "Main Gate" }]} columns={columns} exportFilename="rows.csv" />);
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    vi.spyOn(document, "createElement").mockReturnValue({ click } as unknown as HTMLAnchorElement);

    await user.click(screen.getByLabelText("Export filtered rows to CSV"));

    expect(click).toHaveBeenCalled();
  });
});
