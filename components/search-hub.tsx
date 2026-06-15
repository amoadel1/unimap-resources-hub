"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Programme, Resource } from "@/lib/types";
import { ResourceCard } from "./resource-card";

export function SearchHub({
  programmes,
  resources,
}: {
  programmes: Programme[];
  resources: Resource[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return {
        programmes,
        resources,
      };
    }

    return {
      programmes: programmes.filter((programme) =>
        [
          programme.name,
          programme.faculty,
          programme.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q),
      ),

      resources: resources.filter((resource) =>
        [
          resource.title,
          resource.owner_name,
          resource.intake,
          resource.platform,
          resource.notes,
          resource.programmes?.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q),
      ),
    };
  }, [programmes, resources, query]);

  return (
    <section className="container-page py-16" id="programmes">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
          Instant Search
        </p>

        <h2 className="section-title mt-3">
          Find resources by programme, owner, intake, or notes.
        </h2>

        <div className="mt-8">
          <label className="sr-only" htmlFor="global-search">
            Search resources
          </label>

          <input
            id="global-search"
            className="input min-h-14 text-base"
            placeholder="Search Electrical, 2020, Ahmed, Google Drive..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {/* PROGRAMMES */}
      <div className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
              Academic Programmes
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              New programmes added in admin appear here automatically.
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-500">
            {results.programmes.length} programmes
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.programmes.map((programme) => (
            <Link
              key={programme.id}
              href={`/programmes/${programme.slug}`}
              className="card card-hover block p-5"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
                {programme.faculty ?? "Programme"}
              </p>

              <h4 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">
                {programme.name}
              </h4>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {programme.description ??
                  "Open this page to view available resources."}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* RESOURCES */}
      {query.trim() && (
      <div className="mt-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
              Resources
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Search by title, owner, intake, platform, programme, or notes.
            </p>
          </div>

          <span className="text-sm font-semibold text-slate-500">
            {results.resources.length} resources
          </span>
        </div>

        {results.resources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
              />
            ))}
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              No resources found matching your search.
            </p>
          </div>
        )}
      </div>
      )}
    </section>
  );
}