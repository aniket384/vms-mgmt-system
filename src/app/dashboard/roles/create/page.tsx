import { PageHeader } from "@/components/common/page-header";
import { TabsPanel } from "@/components/common/tabs-panel";

export default function CreateRolePage() {
  return (
    <>
      <PageHeader title="Create Role" description="Create a custom frontend-only RBAC role and select module permissions." />
      <TabsPanel tabs={["Details", "Permissions", "Review"]} />
    </>
  );
}
