import { redirect } from "next/navigation";
import {
  addProgrammeAction,
  addResourceAction,
  approveSubmissionAction,
  deleteProgrammeAction,
  deleteResourceAction,
  rejectSubmissionAction,
  signOutAction,
  updateProgrammeAction,
  updateResourceAction,
} from "@/app/actions";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { platforms } from "@/lib/constants";
import { getProgrammes, getResources, getStats, getSubmissions, requireAdmin } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  const params = await searchParams;
  const [programmes, resources, submissions, stats] = await Promise.all([
    getProgrammes(),
    getResources(),
    getSubmissions(),
    getStats(),
  ]);

  const pendingSubmissions = submissions.filter((submission) => submission.status === "pending");

  return (
    <>
      <SiteHeader />
      <main className="container-page py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">
              Manage everything without editing code.
            </h1>
          </div>
          <form action={signOutAction}>
            <button className="btn-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>

        {params.success || params.error ? (
          <p
            className={`mt-6 rounded-2xl px-4 py-3 text-sm font-semibold ${
              params.success
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
                : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200"
            }`}
          >
            {params.success ?? params.error}
          </p>
        ) : null}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AdminStat label="Programmes" value={stats.programmes} />
          <AdminStat label="Public Resources" value={stats.resources} />
          <AdminStat label="Official Links" value={stats.officialResources} />
          <AdminStat label="Pending" value={stats.pendingSubmissions} />
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Add Programme
            </h2>
            <form action={addProgrammeAction} className="mt-5 grid gap-4">
              <Input name="name" label="Programme Name" required />
              <Input name="slug" label="Slug" placeholder="bachelor-electrical-engineering" required />
              <Input name="faculty" label="Faculty" />
              <Textarea name="description" label="Description" />
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input defaultChecked name="is_active" type="checkbox" /> Active
              </label>
              <button className="btn-primary" type="submit">
                Add Programme
              </button>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
              Add Resource
            </h2>
            <ResourceForm programmes={programmes} action={addResourceAction} />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
            Pending Approval Queue
          </h2>
          <div className="grid gap-4">
            {pendingSubmissions.length > 0 ? (
              pendingSubmissions.map((submission) => (
                <div className="card grid gap-4 p-5 lg:grid-cols-[1fr_auto]" key={submission.id}>
                  <div>
                    <h3 className="font-bold text-slate-950 dark:text-white">
                      {submission.full_name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {submission.programmes?.name} · {submission.intake} · {submission.platform}
                    </p>
                    <a
                      className="mt-2 block break-all text-sm font-semibold text-teal-700 dark:text-teal-300"
                      href={submission.resource_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {submission.resource_url}
                    </a>
                    {submission.notes ? (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {submission.notes}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <form action={approveSubmissionAction}>
                      <input name="id" type="hidden" value={submission.id} />
                      <button className="btn-primary" type="submit">
                        Approve
                      </button>
                    </form>
                    <form action={rejectSubmissionAction}>
                      <input name="id" type="hidden" value={submission.id} />
                      <button className="btn-secondary" type="submit">
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="card p-6 text-slate-600 dark:text-slate-300">
                No pending submissions.
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
              Edit Programmes
            </h2>
            <div className="grid gap-4">
              {programmes.map((programme) => (
                <form action={updateProgrammeAction} className="card grid gap-3 p-5" key={programme.id}>
                  <input name="id" type="hidden" value={programme.id} />
                  <Input defaultValue={programme.name} name="name" label="Name" required />
                  <Input defaultValue={programme.slug} name="slug" label="Slug" required />
                  <Input defaultValue={programme.faculty ?? ""} name="faculty" label="Faculty" />
                  <Textarea defaultValue={programme.description ?? ""} name="description" label="Description" />
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <input defaultChecked={programme.is_active} name="is_active" type="checkbox" /> Active
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn-primary" type="submit">
                      Save
                    </button>
                    <button className="btn-secondary" formAction={deleteProgrammeAction} type="submit">
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-bold text-slate-950 dark:text-white">
              Edit Resources
            </h2>
            <div className="grid gap-4">
              {resources.map((resource) => (
                <form action={updateResourceAction} className="card grid gap-3 p-5" key={resource.id}>
                  <input name="id" type="hidden" value={resource.id} />
                  <ResourceFormFields programmes={programmes} resource={resource} />
                  <div className="flex flex-wrap gap-2">
                    <button className="btn-primary" type="submit">
                      Save
                    </button>
                    <button className="btn-secondary" formAction={deleteResourceAction} type="submit">
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AdminStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <strong className="text-3xl font-black text-slate-950 dark:text-white">{value}</strong>
      <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

function Input({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        defaultValue={defaultValue}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="grid gap-2">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea className="input min-h-24 py-3" defaultValue={defaultValue} id={name} name={name} />
    </div>
  );
}

function ResourceForm({ programmes, action }: { programmes: Awaited<ReturnType<typeof getProgrammes>>; action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="mt-5 grid gap-4">
      <ResourceFormFields programmes={programmes} />
      <button className="btn-primary" type="submit">
        Add Resource
      </button>
    </form>
  );
}

function ResourceFormFields({
  programmes,
  resource,
}: {
  programmes: Awaited<ReturnType<typeof getProgrammes>>;
  resource?: Awaited<ReturnType<typeof getResources>>[number];
}) {
  return (
    <>
      <Input defaultValue={resource?.title ?? ""} name="title" label="Title" required />
      <Input defaultValue={resource?.owner_name ?? ""} name="owner_name" label="Owner Name" required />
      <Input defaultValue={resource?.intake ?? ""} name="intake" label="Intake" required />
      <div className="grid gap-2">
        <label className="label" htmlFor={`programme-${resource?.id ?? "new"}`}>
          Programme
        </label>
        <select
          className="input"
          defaultValue={resource?.programme_id ?? ""}
          id={`programme-${resource?.id ?? "new"}`}
          name="programme_id"
        >
          <option value="">Official / no programme</option>
          {programmes.map((programme) => (
            <option key={programme.id} value={programme.id}>
              {programme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label className="label" htmlFor={`platform-${resource?.id ?? "new"}`}>
          Platform
        </label>
        <select
          className="input"
          defaultValue={resource?.platform ?? "Google Drive"}
          id={`platform-${resource?.id ?? "new"}`}
          name="platform"
        >
          {platforms.map((platform) => (
            <option key={platform}>{platform}</option>
          ))}
        </select>
      </div>
      <Input defaultValue={resource?.url ?? ""} name="url" label="URL" required />
      <Textarea defaultValue={resource?.notes ?? ""} name="notes" label="Notes" />
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <label className="flex items-center gap-2">
          <input defaultChecked={resource?.is_official ?? false} name="is_official" type="checkbox" /> Official
        </label>
        <label className="flex items-center gap-2">
          <input defaultChecked={resource?.is_active ?? true} name="is_active" type="checkbox" /> Active
        </label>
      </div>
    </>
  );
}
