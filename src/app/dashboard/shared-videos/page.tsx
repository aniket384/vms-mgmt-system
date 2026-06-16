import { PageHeader } from "@/components/common/page-header";
import { SimpleListPage } from "@/components/common/module-list";
import { sharedVideos } from "@/mock-data/vms";

export default function SharedVideosPage() {
  return (
    <>
      <PageHeader title="Shared Videos" description="Track shared video links, recipients, expiry dates, status, and link management actions." />
      <SimpleListPage title="Shared Links" items={sharedVideos} />
    </>
  );
}
