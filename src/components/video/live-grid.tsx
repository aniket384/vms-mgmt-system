"use client";

import { Camera as SnapshotIcon, Expand, Maximize2, Mic, MicOff, PauseCircle, PlayCircle, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cameras } from "@/mock-data/vms";
import { cn } from "@/lib/utils";
import type { Camera } from "@/types";

const layouts = [1, 4, 9, 16, 25];

export function LiveGrid() {
  const [count, setCount] = useState(4);
  const visible = cameras.slice(0, count);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {layouts.map((layout) => (
          <Button key={layout} variant={count === layout ? "primary" : "secondary"} onClick={() => setCount(layout)}>
            {Math.sqrt(layout)}x{Math.sqrt(layout)}
          </Button>
        ))}
      </div>
      <div
        className={cn(
          "grid gap-3",
          count === 1 && "grid-cols-1",
          count === 4 && "grid-cols-1 md:grid-cols-2",
          count === 9 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
          count === 16 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          count === 25 && "grid-cols-1 md:grid-cols-3 xl:grid-cols-5",
        )}
      >
        {visible.map((camera) => <LiveCameraTile key={camera.id} camera={camera} />)}
      </div>
    </div>
  );
}

function LiveCameraTile({ camera }: { camera: Camera }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const online = camera.status === "online";

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video || !online) return;
    if (paused) {
      await video.play().catch(() => undefined);
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video || !online) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function changeVolume(nextVolume: number) {
    const video = videoRef.current;
    if (!video || !online) return;
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setMuted(video.muted);
  }

  async function enterFullscreen() {
    await tileRef.current?.requestFullscreen?.().catch(() => undefined);
  }

  function snapshot() {
    const video = videoRef.current;
    if (!video || !online || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
  }

  return (
    <Card draggable className="overflow-hidden">
      <div ref={tileRef} className="relative aspect-video bg-slate-950">
        {online ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-80"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Signal lost</div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge tone={online ? "green" : "red"}>{camera.status}</Badge>
          {camera.recording && <span className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-xs font-medium text-white"><span className="h-2 w-2 rounded-full bg-white" />REC</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 rounded-md bg-slate-950/75 p-2 text-white backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{camera.name}</p>
              <p className="truncate text-xs text-slate-300">{camera.location}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button type="button" className="rounded p-1.5 hover:bg-white/10 disabled:opacity-40" aria-label={paused ? `Play ${camera.name}` : `Pause ${camera.name}`} onClick={togglePlayback} disabled={!online}>
                {paused ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-white/10 disabled:opacity-40" aria-label={muted ? `Unmute ${camera.name}` : `Mute ${camera.name}`} onClick={toggleMute} disabled={!online}>
                {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-white/10 disabled:opacity-40" aria-label={`Snapshot ${camera.name}`} onClick={snapshot} disabled={!online}>
                <SnapshotIcon className="h-4 w-4" />
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-white/10" aria-label={`Expand ${camera.name}`} onClick={enterFullscreen}>
                <Expand className="h-4 w-4" />
              </button>
              <button type="button" className="rounded p-1.5 hover:bg-white/10" aria-label={`Fullscreen ${camera.name}`} onClick={enterFullscreen}>
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {muted ? <VolumeX className="h-3.5 w-3.5 text-slate-300" /> : <Volume2 className="h-3.5 w-3.5 text-slate-300" />}
            <input aria-label={`Volume ${camera.name}`} type="range" min={0} max={1} step={0.05} value={volume} onChange={(event) => changeVolume(Number(event.target.value))} className="h-1 flex-1 accent-cyan-400" disabled={!online} />
          </div>
        </div>
      </div>
    </Card>
  );
}
