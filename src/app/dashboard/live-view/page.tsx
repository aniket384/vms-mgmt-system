import { PageHeader } from "@/components/common/page-header";
import { LiveGrid } from "@/components/video/live-grid";

export default function LiveViewPage() {
  return (
    <>
      <PageHeader title="Live View" description="Simulated CCTV monitoring wall with layout switching, stream controls, and draggable camera tiles." />
      <LiveGrid />
    </>
  );
}
