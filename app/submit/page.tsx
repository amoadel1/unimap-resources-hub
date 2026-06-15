import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getProgrammes } from "@/lib/data";
import { SubmitForm } from "./submit-form";

export const metadata = {
  title: "Submit Resource",
};

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const programmes = await getProgrammes();

  return (
    <>
      <SiteHeader />
      <main className="container-page grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
            Submit Resource
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            Share a useful academic link with UniMAP students.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Submissions go into a pending approval queue. Approved links become public
            after admin review.
          </p>
        </section>
        <SubmitForm programmes={programmes} />
      </main>
      <Footer />
    </>
  );
}
