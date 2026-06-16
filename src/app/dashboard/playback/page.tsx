import { PageHeader } from "@/components/common/page-header";
import { PlaybackConsole } from "@/components/video/playback-console";

export default function PlaybackPage() {
  return (
    <>
      <PageHeader title="Playback" description="Review dummy recordings with camera selection, timeline controls, speed controls, volume, and fullscreen actions." />
      <PlaybackConsole />
    </>
  );
}
