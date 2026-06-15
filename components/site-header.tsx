import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-soft dark:bg-white dark:text-slate-950">
            UR
          </span>

          <span className="min-w-0">
            <span className="block truncate text-base font-bold text-slate-950 dark:text-white">
              UniMAP Resources Hub
            </span>

            <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
              By Students, For Students
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          <Link className="btn-secondary" href="/#programmes">
            Programmes
          </Link>

          <Link className="btn-secondary" href="/submit">
            Submit
          </Link>

          <Link className="btn-secondary" href="/about">
            About
          </Link>

          <Link className="btn-secondary" href="/contact">
            Contact
          </Link>

          <Link className="btn-primary" href="/admin">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link className="btn-primary px-4" href="/submit">
            Submit
          </Link>

          <ThemeToggle />
        </div>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}