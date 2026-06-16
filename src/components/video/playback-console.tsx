"use client";

import { FastForward, Maximize2, Pause, PictureInPicture, Play, Rewind, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cameras } from "@/mock-data/vms";

export function PlaybackConsole() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);

  async function play() {
    const video = videoRef.current;
    if (!video) return;
    await video.play().catch(() => undefined);
    setPlaying(true);
  }

  function pause() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  }

  function seekBy(seconds: number) {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || Number.MAX_SAFE_INTEGER, video.currentTime + seconds));
  }

  function seekTo(percent: number) {
    const video = videoRef.current;
    if (!video || !video.duration) {
      setProgress(percent);
      return;
    }
    video.currentTime = (video.duration * percent) / 100;
    setProgress(percent);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function changeVolume(nextVolume: number) {
    const video = videoRef.current;
    if (!video) return;
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    setVolume(nextVolume);
    setMuted(video.muted);
  }

  function changeSpeed(nextSpeed: number) {
    const video = videoRef.current;
    if (video) video.playbackRate = nextSpeed;
    setSpeed(nextSpeed);
  }

  async function enterPictureInPicture() {
    const video = videoRef.current;
    if (!video || !document.pictureInPictureEnabled || document.pictureInPictureElement) return;
    await video.requestPictureInPicture?.().catch(() => undefined);
  }

  async function enterFullscreen() {
    await videoRef.current?.requestFullscreen?.().catch(() => undefined);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Camera</label>
            <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              {cameras.map((camera) => <option key={camera.id}>{camera.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Date</label>
            <Input type="date" defaultValue="2026-06-16" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Speed</label>
            <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900" value={speed} onChange={(event) => changeSpeed(Number(event.target.value))}>
              <option value={0.5}>0.5x</option><option value={1}>1x</option><option value={2}>2x</option><option value={4}>4x</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <div className="aspect-video bg-slate-950">
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-85"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (video.duration) setProgress((video.currentTime / video.duration) * 100);
            }}
          />
        </div>
        <CardContent className="space-y-4">
          <input aria-label="Playback timeline" type="range" className="w-full accent-cyan-500" value={progress} min={0} max={100} onChange={(event) => seekTo(Number(event.target.value))} />
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds"><Rewind className="h-4 w-4" /></Button>
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={play} aria-label="Play recording"><Play className="h-4 w-4" /></Button>
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={pause} aria-label="Pause recording"><Pause className="h-4 w-4" /></Button>
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => seekBy(10)} aria-label="Forward 10 seconds"><FastForward className="h-4 w-4" /></Button>
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={toggleMute} aria-label={muted ? "Unmute recording" : "Mute recording"}>{muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</Button>
            <input aria-label="Recording volume" type="range" min={0} max={1} step={0.05} value={volume} onChange={(event) => changeVolume(Number(event.target.value))} className="h-2 w-28 accent-cyan-500" />
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={enterPictureInPicture} aria-label="Picture in picture"><PictureInPicture className="h-4 w-4" /></Button>
            <Button variant="secondary" className="h-10 w-10 px-0" onClick={enterFullscreen} aria-label="Fullscreen recording"><Maximize2 className="h-4 w-4" /></Button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{playing ? "Playing" : "Paused"} · {speed}x</p>
        </CardContent>
      </Card>
    </div>
  );
}
