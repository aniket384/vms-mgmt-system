export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div className="h-full rounded-full bg-cyan-500" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}
