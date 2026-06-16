import { AlertTriangle, BrainCircuit, Clock, MapPinned, ShieldAlert, TimerReset, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AiInsight, EventItem, SiteHealth } from "@/types";

const riskTone = {
  low: "green",
  medium: "amber",
  high: "red",
  critical: "red",
} as const;

export function CommandCenterHero({
  totalCameras,
  openEvents,
  healthScore,
}: {
  totalCameras: number;
  openEvents: number;
  healthScore: number;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-sm dark:border-slate-800">
      <div className="grid gap-4 p-5 lg:grid-cols-[1.5fr_1fr] lg:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">Command Center</Badge>
            <Badge tone={openEvents > 0 ? "amber" : "green"}>{openEvents} open incidents</Badge>
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-normal md:text-3xl">Unified surveillance intelligence across every site.</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Prioritize incidents, inspect site health, and coordinate live monitoring from one operator-grade control surface.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-md border border-white/10 bg-white/5 p-3">
            <Video className="h-4 w-4 text-cyan-300" />
            <p className="mt-3 text-2xl font-semibold">{totalCameras}</p>
            <p className="text-xs text-slate-400">Cameras</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/5 p-3">
            <ShieldAlert className="h-4 w-4 text-amber-300" />
            <p className="mt-3 text-2xl font-semibold">{openEvents}</p>
            <p className="text-xs text-slate-400">Open</p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/5 p-3">
            <TimerReset className="h-4 w-4 text-emerald-300" />
            <p className="mt-3 text-2xl font-semibold">{healthScore}%</p>
            <p className="text-xs text-slate-400">Health</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IncidentPriorityBoard({ events }: { events: EventItem[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Incident Priority</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {events.slice(0, 4).map((event) => (
          <div key={event.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{event.type}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{event.camera} · {event.timestamp}</p>
              </div>
              <Badge tone={event.severity === "critical" ? "red" : event.severity === "high" ? "amber" : "blue"}>{event.severity}</Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              SLA target: acknowledge in 5 minutes
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SiteHealthGrid({ sites }: { sites: SiteHealth[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Multi-Site Health</CardTitle></CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {sites.map((site) => (
          <div key={site.id} className="rounded-md bg-slate-100 p-4 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <MapPinned className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                  <p className="font-medium">{site.name}</p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{site.city} · {site.online}/{site.cameras} online</p>
              </div>
              <Badge tone={riskTone[site.risk]}>{site.risk}</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Storage</span>
                <span>{site.storageUsed}%</span>
              </div>
              <Progress value={site.storageUsed} />
              <p className="text-xs text-slate-500">Avg response SLA {site.responseSla}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AiInsightsPanel({ insights }: { insights: AiInsight[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>AI Operator Insights</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="rounded-md bg-slate-100 p-4 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                {insight.severity === "high" ? <AlertTriangle className="h-4 w-4" /> : <BrainCircuit className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium">{insight.title}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">{insight.summary}</p>
                <p className="mt-2 text-xs text-slate-500">Confidence {insight.confidence}%</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
