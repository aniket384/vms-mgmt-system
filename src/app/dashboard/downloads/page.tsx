import { PageHeader } from "@/components/common/page-header";
import { SimpleListPage } from "@/components/common/module-list";
import { vmsService } from "@/services/vms-service";

export default function DownloadsPage() {
  const downloads = vmsService.getDownloads();
  return (
    <>
      <PageHeader title="Downloads" description="Download history with progress indicators and retry/delete action affordances." />
      <SimpleListPage title="Download Queue" items={downloads} />
    </>
  );
}
