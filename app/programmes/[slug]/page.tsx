import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ResourceCard } from "@/components/resource-card";
import { SiteHeader } from "@/components/site-header";
import { getProgrammeBySlug, getResources } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);
  if (!programme) notFound();

  const resources = await getResources(programme.id);

  return (
    <>
      <SiteHeader />
      <main className="container-page py-16">
        <section className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
            {programme.faculty ?? "Academic Programme"}
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            {programme.name}
          </h1>
          {programme.description ? (
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {programme.description}
            </p>
          ) : null}
        </section>
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Resources
            </h2>
            <span className="text-sm font-semibold text-slate-500">
              {resources.length} resources
            </span>
          </div>
          {resources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center text-slate-600 dark:text-slate-300">
              No resources yet. This programme is ready for future submissions.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
