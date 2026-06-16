import type { UserRole } from "@/types";

export type DummyCredential = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export const dummyCredentials: DummyCredential[] = [
  { name: "Aarav Sharma", email: "admin@vms.local", password: "Admin@1234", role: "Super Admin" },
  { name: "Maya Iyer", email: "operator@vms.local", password: "Operator@1234", role: "Operator" },
  { name: "Rohan Mehta", email: "viewer@vms.local", password: "Viewer@1234", role: "Viewer" },
];

export async function signInWithDummyCredentials(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return dummyCredentials.find(
    (credential) =>
      credential.email.toLowerCase() === email.toLowerCase() &&
      credential.password === password,
  );
}
