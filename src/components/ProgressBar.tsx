export default function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-teal-400 transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-10 text-right text-sm tabular-nums text-zinc-500">{percent}%</span>
    </div>
  );
}
