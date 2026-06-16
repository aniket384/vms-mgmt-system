import { describe, expect, it, vi } from "vitest";
import { downloadCsv, objectRowsToCsv } from "@/lib/csv";

describe("csv utilities", () => {
  it("converts object rows to escaped CSV", () => {
    expect(objectRowsToCsv([{ name: "Main Gate", note: "A,B" }])).toBe('name,note\nMain Gate,"A,B"');
  });

  it("creates and revokes an object URL for downloads", () => {
    const createObjectURL = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    const revokeObjectURL = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const click = vi.fn();
    const createElement = vi.spyOn(document, "createElement").mockReturnValue({
      click,
      set href(value: string) {
        expect(value).toBe("blob:mock");
      },
      set download(value: string) {
        expect(value).toBe("export.csv");
      },
    } as unknown as HTMLAnchorElement);

    downloadCsv("export.csv", "a,b");

    expect(createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");

    createObjectURL.mockRestore();
    revokeObjectURL.mockRestore();
    createElement.mockRestore();
  });
});
