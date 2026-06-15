import { signInAction } from "@/app/actions";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Admin Login",
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="container-page grid min-h-[70vh] place-items-center py-16">
        <form action={signInAction} className="card w-full max-w-md p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
            Secure Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
            Sign in to manage content
          </h1>
          <div className="mt-8 grid gap-5">
            <div className="grid gap-2">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input className="input" id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input className="input" id="password" name="password" type="password" required />
            </div>
            {params.error ? (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:bg-rose-400/10 dark:text-rose-200">
                {params.error}
              </p>
            ) : null}
            <button className="btn-primary" type="submit">
              Sign In
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
