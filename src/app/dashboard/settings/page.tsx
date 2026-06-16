import { PageHeader } from "@/components/common/page-header";
import { TabsPanel } from "@/components/common/tabs-panel";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="General, security, storage, notifications, appearance, theme, and language configuration." />
      <TabsPanel tabs={["General", "Security", "Storage", "Notifications", "Appearance", "Theme", "Language"]} />
    </>
  );
}
