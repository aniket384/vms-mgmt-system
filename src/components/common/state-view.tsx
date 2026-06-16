import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function LoadingState({ label = "Loading data..." }: { label?: string }) {
  return (
    <Card>
      <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-slate-500 dark:text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
        <p className="text-sm">{label}</p>
      </CardContent>
    </Card>
  );
}

export function EmptyState({
  title = "No records found",
  description = "Try adjusting your filters or search query.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card>
      <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          <Inbox className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-slate-950 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "The requested data could not be loaded.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Card>
      <CardContent className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-500/10 text-red-600 dark:text-red-300">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-slate-950 dark:text-white">{title}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        {onRetry && <Button variant="secondary" onClick={onRetry}>Retry</Button>}
      </CardContent>
    </Card>
  );
}
