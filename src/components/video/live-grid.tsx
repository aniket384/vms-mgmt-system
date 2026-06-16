"use client";

import { Expand, Maximize2, MicOff, PauseCircle, Volume2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cameras } from "@/mock-data/vms";
import { cn } from "@/lib/utils";

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
        {visible.map((camera) => (
          <Card key={camera.id} draggable className="overflow-hidden">
            <div className="relative aspect-video bg-slate-950">
              {camera.status === "online" ? (
                <video
                  className="h-full w-full object-cover opacity-80"
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">Signal lost</div>
              )}
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <Badge tone={camera.status === "online" ? "green" : "red"}>{camera.status}</Badge>
                {camera.recording && <span className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-xs font-medium text-white"><span className="h-2 w-2 rounded-full bg-white" />REC</span>}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-slate-950/70 p-2 text-white backdrop-blur">
                <div>
                  <p className="text-sm font-medium">{camera.name}</p>
                  <p className="text-xs text-slate-300">{camera.location}</p>
                </div>
                <div className="flex gap-1">
                  {[PauseCircle, MicOff, Volume2, Expand, Maximize2].map((Icon, index) => (
                    <button key={index} className="rounded p-1.5 hover:bg-white/10" aria-label="Video control">
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
