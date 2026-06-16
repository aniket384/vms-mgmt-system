import { PageHeader } from "@/components/common/page-header";
import { SimpleListPage } from "@/components/common/module-list";
import { vmsService } from "@/services/vms-service";

export default function SharedVideosPage() {
  const sharedVideos = vmsService.getSharedVideos();
  return (
    <>
      <PageHeader title="Shared Videos" description="Track shared video links, recipients, expiry dates, status, and link management actions." />
      <SimpleListPage title="Shared Links" items={sharedVideos} />
    </>
  );
}
