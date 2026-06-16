import { PageHeader } from "@/components/common/page-header";
import { SimpleListPage } from "@/components/common/module-list";
import { downloads } from "@/mock-data/vms";

export default function DownloadsPage() {
  return (
    <>
      <PageHeader title="Downloads" description="Download history with progress indicators and retry/delete action affordances." />
      <SimpleListPage title="Download Queue" items={downloads} />
    </>
  );
}
