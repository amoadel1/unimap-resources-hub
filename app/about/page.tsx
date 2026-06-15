import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { owner, welcomeArabic, welcomeEnglish } from "@/lib/constants";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container-page py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
            About
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            UniMAP Resources Hub
          </h1>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Info label="Owner" value={owner.name} />
            <Info label="Arabic Name" value={owner.arabicName} rtl />
            <Info label="Role" value={owner.role} />
          </div>
          <section className="card mt-10 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Project Purpose
            </h2>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              This platform collects and organizes external academic resources for
              UniMAP students. It does not host files, sell content, or claim ownership
              over any shared material.
            </p>
          </section>
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            <article className="card p-6">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">English</h2>
              <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
                {welcomeEnglish.map((paragraph) => (
                  <p className="leading-7" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
            <article className="card rtl p-6">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">العربية</h2>
              <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300">
                {welcomeArabic.map((paragraph) => (
                  <p className="leading-8" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Info({ label, value, rtl = false }: { label: string; value: string; rtl?: boolean }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className={`mt-2 font-bold text-slate-950 dark:text-white ${rtl ? "rtl" : ""}`}>
        {value}
      </p>
    </div>
  );
}
