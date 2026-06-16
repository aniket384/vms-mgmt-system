import { PageHeader } from "@/components/common/page-header";
import { TabsPanel } from "@/components/common/tabs-panel";

export default function EditRolePage() {
  return (
    <>
      <PageHeader title="Edit Role" description="Edit dummy RBAC role metadata and permission coverage." />
      <TabsPanel tabs={["Details", "Permissions", "Audit"]} />
    </>
  );
}
