"use client";

import { useActionState } from "react";
import { submitResourceAction, type ActionState } from "@/app/actions";
import { platforms } from "@/lib/constants";
import type { Programme } from "@/lib/types";

const initialState: ActionState = {
  ok: false,
  message: "",
};

export function SubmitForm({ programmes }: { programmes: Programme[] }) {
  const [state, action, pending] = useActionState(submitResourceAction, initialState);

  return (
    <form action={action} className="card grid gap-5 p-6 sm:p-8">
      <input aria-hidden="true" className="hidden" name="website" tabIndex={-1} />
      <div className="grid gap-2">
        <label className="label" htmlFor="full_name">
          Full Name
        </label>
        <input className="input" id="full_name" name="full_name" required />
      </div>
      <div className="grid gap-2">
        <label className="label" htmlFor="programme_id">
          Programme
        </label>
        <select className="input" id="programme_id" name="programme_id" required>
          {programmes.map((programme) => (
            <option key={programme.id} value={programme.id}>
              {programme.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="label" htmlFor="intake">
            Intake
          </label>
          <input className="input" id="intake" name="intake" placeholder="2023" required />
        </div>
        <div className="grid gap-2">
          <label className="label" htmlFor="platform">
            Platform
          </label>
          <select className="input" id="platform" name="platform" required>
            {platforms.map((platform) => (
              <option key={platform}>{platform}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label className="label" htmlFor="resource_url">
          Resource URL
        </label>
        <input className="input" id="resource_url" name="resource_url" type="url" required />
      </div>
      <div className="grid gap-2">
        <label className="label" htmlFor="notes">
          Notes
        </label>
        <textarea className="input min-h-32 py-3" id="notes" name="notes" />
      </div>
      {state.message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            state.ok
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200"
              : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200"
          }`}
        >
          {state.message}
        </p>
      ) : null}
      <button className="btn-primary" disabled={pending} type="submit">
        {pending ? "Submitting..." : "Submit for Approval"}
      </button>
    </form>
  );
}
