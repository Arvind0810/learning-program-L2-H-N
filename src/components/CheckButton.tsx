import type { ReactNode } from "react";

export default function CheckButton({
  action,
  checked,
  children,
}: {
  action: () => Promise<void>;
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        aria-pressed={checked}
        className="flex w-full items-start gap-3 rounded-xl px-3 py-2 transition-colors text-left hover:bg-white/40 dark:hover:bg-white/5"
      >
        <span
          className={`mt-0.5 flex size-5 shrink-0 rounded-md items-center justify-center border text-[10px] ${
            checked
              ? "border-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white"
              : "border-zinc-400 dark:border-zinc-600"
          }`}
        >
          {checked ? "✓" : ""}
        </span>
        <span className={checked ? "text-zinc-500 line-through" : ""}>{children}</span>
      </button>
    </form>
  );
}
