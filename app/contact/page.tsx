import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { owner } from "@/lib/constants";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-page py-16">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
            Contact
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            Send resources, updates, or removal requests.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            For broken links, new submissions, ownership updates, or removal requests,
            contact the maintainer directly.
          </p>
          <a className="btn-primary mt-8" href={`mailto:${owner.email}`}>
            {owner.email}
          </a>
        </section>
        <section className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-sm font-semibold text-slate-500">Owner</p>
            <p className="mt-2 font-bold">{owner.name}</p>
          </div>
          <div className="card rtl p-5">
            <p className="text-sm font-semibold text-slate-500">الاسم</p>
            <p className="mt-2 font-bold">{owner.arabicName}</p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-semibold text-slate-500">Role</p>
            <p className="mt-2 font-bold">{owner.role}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
