import { describe, expect, it } from "vitest";
import { cn, formatNumber } from "@/lib/utils";

describe("utils", () => {
  it("merges conditional Tailwind classes with later classes winning", () => {
    expect(cn("px-2", "px-4", false && "hidden", "text-sm")).toBe("px-4 text-sm");
  });

  it("formats numbers using US grouping", () => {
    expect(formatNumber(1289000)).toBe("1,289,000");
  });
});
