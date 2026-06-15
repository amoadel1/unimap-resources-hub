import Link from "next/link";
import { owner } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 dark:border-white/10 dark:bg-slate-950/60">
      <div className="container-page grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-bold text-slate-950 dark:text-white">UniMAP Resources Hub</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            This platform organizes external academic links only. It does not host files
            or claim ownership of student resources.
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Maintained by {owner.name} · {owner.email}
          </p>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link className="btn-secondary" href="/about">
            About
          </Link>
          <Link className="btn-secondary" href="/contact">
            Contact
          </Link>
          <Link className="btn-secondary" href="/submit">
            Submit Resource
          </Link>
        </nav>
      </div>
    </footer>
  );
}
