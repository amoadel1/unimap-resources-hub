
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SearchHub } from "@/components/search-hub";
import { SiteHeader } from "@/components/site-header";
import { ResourceCard } from "@/components/resource-card";
import {
  officialAcademicGuide,
  owner,
  welcomeArabic,
  welcomeEnglish,
} from "@/lib/constants";
import {
  getOfficialResources,
  getProgrammes,
  getResources,
  getStats,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [programmes, resources, officialResources, stats] =
    await Promise.all([
      getProgrammes(),
      getResources(),
      getOfficialResources(),
      getStats(),
    ]);

  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="container-page grid min-h-[75vh] items-center gap-16 py-24 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-200">
              By Students, For Students
            </div>

<h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 lg:text-7xl dark:text-white">
  UniMAP Resources Hub
</h1>

<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
  Access academic drives, notes, past exams, assignments, lab materials,
  and official resources shared by UniMAP students across different
  engineering and technology programmes.
</p>

<div className="mt-6 flex flex-wrap gap-3">
  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    ⚡ Electrical Engineering
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    🤖 Mechatronic Engineering
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    💻 Computer Engineering
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    🏭 Chemical Engineering
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    ⚙️ Mechanical Engineering
  </span>

  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
    🧬 Biomedical Engineering
  </span>
</div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" href="#programmes">
                Browse Resources
              </Link>

              <Link className="btn-secondary" href="/submit">
                Submit Resource
              </Link>
            </div>
          </div>

          {/* Founder Card */}
          <div className="glass rounded-[2rem] p-6 shadow-2xl">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white dark:from-white dark:via-slate-100 dark:to-slate-200 dark:text-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wider opacity-70">
  Founder & Maintainer
</p>

<h2 className="mt-4 text-2xl font-black leading-tight lg:text-4xl">
  ADEL HUSHAM MOHAMEDAIN
</h2>

<p className="mt-2 text-lg font-semibold text-teal-300">
  (AMO ADEL)
</p>

<p className="mt-6 text-sm leading-7 opacity-80">
  This platform organizes academic resources, notes, drives, and
  educational links shared by UniMAP students to help future
  generations access useful study materials in one place.
</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <Stat label="Programmes" value={stats.programmes} />
              <Stat label="Resources" value={stats.resources} />
              <Stat label="Official" value={stats.officialResources} />
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="container-page py-16">
          <article className="card p-6 sm:p-8">
            <h2 className="section-title">Welcome Message</h2>

            <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
              {welcomeEnglish.map((paragraph) => (
                <p className="leading-7" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <p className="font-semibold">
                For inquiries, submissions, or broken link reports:
              </p>

              <a
                className="font-bold text-teal-700 dark:text-teal-300"
                href={`mailto:${owner.email}`}
              >
                {owner.email}
              </a>
            </div>

            <div className="my-12 border-t border-slate-200 dark:border-slate-700" />

            <div className="rtl">
              <h2 className="section-title">مرحبًا بكم</h2>

              <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
                {welcomeArabic.map((paragraph) => (
                  <p className="leading-8" key={paragraph}>
                    {paragraph}
                  </p>
                ))}

                <p className="font-semibold">
                  للتواصل أو إرسال مصادر جديدة أو الإبلاغ عن الروابط المعطلة:
                </p>

                <a
                  className="font-bold text-teal-700 dark:text-teal-300"
                  href={`mailto:${owner.email}`}
                >
                  {owner.email}
                </a>
              </div>
            </div>
          </article>
        </section>

        <SearchHub programmes={programmes} resources={resources} />

        {/* Official Resources */}
        <section className="container-page py-16">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
              Official UniMAP Resources
            </p>

            <h2 className="section-title mt-3">
              Official academic links
            </h2>

            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
              The official academic guide is included in the database and can be
              managed from the admin dashboard with other official links.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {officialResources.length > 0 ? (
              officialResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <a
                className="card card-hover block p-6"
                href={officialAcademicGuide.url}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                  {officialAcademicGuide.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {officialAcademicGuide.description}
                </p>
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-soft dark:bg-slate-900">
      <strong className="block text-2xl font-black text-slate-950 dark:text-white">
        {value}
      </strong>

      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  );
}