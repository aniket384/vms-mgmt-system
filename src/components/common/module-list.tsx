import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SimpleListPage({
  title,
  items,
}: {
  title: string;
  items: Array<Record<string, string | number>>;
}) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800 md:grid-cols-[1fr_auto] md:items-center">
            <div className="grid gap-2 md:grid-cols-3">
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs uppercase text-slate-500">{key}</p>
                  {key === "progress" ? <Progress value={Number(value)} /> : <p className="text-sm font-medium">{value}</p>}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Badge tone="blue">Mock</Badge>
              <Button variant="secondary">Action</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
