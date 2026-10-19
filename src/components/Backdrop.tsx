export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blob -left-32 -top-32 size-[28rem] bg-[var(--blob-1)]" />
      <div className="blob right-[-10rem] top-1/3 size-[32rem] bg-[var(--blob-2)] [animation-delay:-6s]" />
      <div className="blob bottom-[-12rem] left-1/4 size-[30rem] bg-[var(--blob-3)] [animation-delay:-12s]" />
    </div>
  );
}
