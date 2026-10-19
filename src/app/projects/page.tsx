import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import { getProjects } from "@/lib/roadmap";

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">Portfolio projects</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Each project needs a problem statement, architecture, implementation, testing evidence, troubleshooting
        examples, and lessons learned.
      </p>
      <Suspense fallback={<PageFallback />}>
        <ProjectList />
      </Suspense>
    </>
  );
}

async function ProjectList() {
  await connection();
  const projects = await getProjects();
  return (
    <ol className="mt-8 space-y-6">
      {projects.map((project) => (
        <li key={project.order} className="glass-card p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Project {project.order}</p>
          <h2 className="mt-1 text-lg font-semibold">{project.title}</h2>
          <p className="mt-2 text-sm">
            <span className="font-medium">Scenario:</span> {project.scenario}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
            {project.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium">Demonstrates:</span> {project.demonstrates}
          </p>
        </li>
      ))}
    </ol>
  );
}
