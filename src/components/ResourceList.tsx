import type { ResourceKind, WeekResourceDoc } from "@/models/Phase";

const SECTIONS: { kind: ResourceKind; heading: string }[] = [
  { kind: "video", heading: "Hindi video playlists" },
  { kind: "practice", heading: "Practice in the browser (works on Android tablet)" },
  { kind: "android-app", heading: "Android tablet apps" },
  { kind: "docs", heading: "Official docs & reading" },
];

export default function ResourceList({ resources }: { resources: WeekResourceDoc[] }) {
  if (resources.length === 0) return null;

  return (
    <div className="space-y-6">
      {SECTIONS.map(({ kind, heading }) => {
        const items = resources.filter((resource) => resource.kind === kind);
        if (items.length === 0) return null;
        return (
          <div key={kind}>
            <h3 className="mb-2 text-sm font-medium text-zinc-500">{heading}</h3>
            <ul className="space-y-2">
              {items.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block glass-card glass-interactive rounded-xl px-4 py-3"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-indigo-700 dark:text-indigo-300">{resource.title}</span>
                      {resource.language === "hi" && (
                        <span className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-2 py-0.5 text-[11px] font-medium text-white">
                          हिंदी
                        </span>
                      )}
                    </span>
                    {resource.source && <span className="block text-xs text-zinc-500">{resource.source}</span>}
                    {resource.note && <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">{resource.note}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
