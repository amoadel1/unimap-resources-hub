import type { Resource } from "@/lib/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="card card-hover flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
            {resource.title}
          </h3>
          {resource.programmes?.name ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {resource.programmes.name}
            </p>
          ) : null}
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-400/10 dark:text-teal-200">
          {resource.platform}
        </span>
      </div>
      <dl className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        <div className="flex justify-between gap-4">
          <dt className="font-semibold">Owner</dt>
          <dd className="text-right">{resource.owner_name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-semibold">Intake</dt>
          <dd>{resource.intake}</dd>
        </div>
      </dl>
      {resource.notes ? (
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
          {resource.notes}
        </p>
      ) : null}
      <a className="btn-primary mt-auto" href={resource.url} rel="noreferrer" target="_blank">
        Open Resource
      </a>
    </article>
  );
}
