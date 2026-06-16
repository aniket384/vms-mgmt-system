"use client";

import { FastForward, Maximize2, Pause, PictureInPicture, Play, Rewind, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cameras } from "@/mock-data/vms";

export function PlaybackConsole() {
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
            <select className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option>0.5x</option><option>1x</option><option>2x</option><option>4x</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <div className="aspect-video bg-slate-950">
          <video className="h-full w-full object-cover opacity-85" src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" controls />
        </div>
        <CardContent className="space-y-4">
          <input type="range" className="w-full accent-cyan-500" defaultValue={44} />
          <div className="flex flex-wrap items-center gap-2">
            {[Rewind, Play, Pause, FastForward, Volume2, PictureInPicture, Maximize2].map((Icon, index) => (
              <Button key={index} variant="secondary" className="h-10 w-10 px-0">
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
