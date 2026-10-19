import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import { getPracticeTools } from "@/lib/roadmap";

export default function PracticePage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">Practice on an Android tablet</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Browser labs run in Chrome; apps install from Google Play. A Bluetooth keyboard makes terminal work much
        easier. Packet Tracer, GNS3 and Windows Server / Hyper-V VMs need a laptop or PC — from the tablet you can
        reach those over Remote Desktop.
      </p>
      <Suspense fallback={<PageFallback />}>
        <ToolList />
      </Suspense>
    </>
  );
}

async function ToolList() {
  await connection();
  const tools = await getPracticeTools();
  const groups = [
    { heading: "Browser playgrounds", items: tools.filter((tool) => tool.platform === "browser") },
    { heading: "Android apps", items: tools.filter((tool) => tool.platform === "android-app") },
  ];

  return (
    <div className="mt-8 space-y-10">
      {groups.map((group) => (
        <section key={group.heading}>
          <h2 className="mb-3 font-semibold">{group.heading}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {group.items.map((tool) => (
              <li key={tool.name}>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full glass-card glass-interactive p-5"
                >
                  <span className="text-xs uppercase tracking-wide text-zinc-500">{tool.category}</span>
                  <span className="mt-1 block font-medium text-indigo-700 dark:text-indigo-300">{tool.name}</span>
                  <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">{tool.useFor}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
