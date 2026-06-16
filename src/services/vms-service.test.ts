import { describe, expect, it } from "vitest";
import { vmsService } from "@/services/vms-service";

describe("vms service", () => {
  it("returns mock cameras through a replaceable service layer", () => {
    expect(vmsService.getCameras()[0]).toMatchObject({ id: "CAM-001", name: "Main Gate ANPR" });
  });

  it("returns cloned data so callers cannot mutate shared mock state", () => {
    const firstRead = vmsService.getUsers();
    firstRead[0].name = "Mutated";

    expect(vmsService.getUsers()[0].name).not.toBe("Mutated");
  });
});
