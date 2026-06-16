import { describe, expect, it } from "vitest";
import { dummyCredentials, signInWithDummyCredentials } from "@/services/auth";

describe("dummy auth service", () => {
  it("contains the expected demo accounts", () => {
    expect(dummyCredentials.map((credential) => credential.email)).toEqual([
      "admin@vms.local",
      "operator@vms.local",
      "viewer@vms.local",
    ]);
  });

  it("signs in with a valid dummy account", async () => {
    await expect(signInWithDummyCredentials("admin@vms.local", "Admin@1234")).resolves.toMatchObject({
      name: "Aarav Sharma",
      role: "Super Admin",
    });
  });

  it("rejects invalid dummy credentials", async () => {
    await expect(signInWithDummyCredentials("admin@vms.local", "wrong-password")).resolves.toBeUndefined();
  });
});
