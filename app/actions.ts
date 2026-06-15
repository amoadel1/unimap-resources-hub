"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFormString, normalizeEmpty, programmeSchema, resourceSchema, submissionSchema } from "@/lib/security";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/data";

export type ActionState = {
  ok: boolean;
  message: string;
};

export async function submitResourceAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = submissionSchema.safeParse({
  resource_type: getFormString(formData, "resource_type"),

  full_name: getFormString(formData, "full_name"),

  programme_id: getFormString(formData, "programme_id"),

  intake: getFormString(formData, "intake"),

  platform: getFormString(formData, "platform"),

  resource_url: getFormString(formData, "resource_url"),

  notes: getFormString(formData, "notes"),

  website: getFormString(formData, "website"),
});

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  try {
    const admin = createSupabaseAdminClient();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await admin
      .from("rate_limits")
      .select("id", { count: "exact", head: true })
      .eq("key", ip)
      .eq("action", "submit_resource")
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 5) {
      return {
        ok: false,
        message: "Too many submissions. Please try again later.",
      };
    }

    await admin.from("rate_limits").insert({
      key: ip,
      action: "submit_resource",
    });
  } catch {
    return {
      ok: false,
      message: "Submission protection is not configured. Please contact the maintainer.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("submissions").insert({
    ...parsed.data,
    notes: normalizeEmpty(parsed.data.notes),
    status: "pending",
  });

  if (error) {
    return { ok: false, message: "Could not submit the resource. Please try again." };
  }

  revalidatePath("/");
  return {
    ok: true,
    message: "Thank you. Your resource was submitted and is pending approval.",
  };
}

export async function signInAction(formData: FormData) {
  const email = getFormString(formData, "email");
  const password = getFormString(formData, "password");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/admin/login?error=Invalid%20admin%20login");
  }

  redirect("/admin");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

async function assertAdmin() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
}

export async function addProgrammeAction(formData: FormData) {
  await assertAdmin();
  const parsed = programmeSchema.safeParse({
    name: getFormString(formData, "name"),
    slug: getFormString(formData, "slug"),
    faculty: getFormString(formData, "faculty"),
    description: getFormString(formData, "description"),
    is_active: formData.get("is_active") === "on",
  });

  if (!parsed.success) redirect("/admin?error=Programme%20validation%20failed");

  const supabase = await createSupabaseServerClient();
  await supabase.from("programmes").insert({
    ...parsed.data,
    faculty: normalizeEmpty(parsed.data.faculty),
    description: normalizeEmpty(parsed.data.description),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Programme%20added");
}

export async function updateProgrammeAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const parsed = programmeSchema.safeParse({
    name: getFormString(formData, "name"),
    slug: getFormString(formData, "slug"),
    faculty: getFormString(formData, "faculty"),
    description: getFormString(formData, "description"),
    is_active: formData.get("is_active") === "on",
  });

  if (!id || !parsed.success) redirect("/admin?error=Programme%20validation%20failed");

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("programmes")
    .update({
      ...parsed.data,
      faculty: normalizeEmpty(parsed.data.faculty),
      description: normalizeEmpty(parsed.data.description),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Programme%20updated");
}

export async function deleteProgrammeAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("programmes").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Programme%20deleted");
}

export async function addResourceAction(formData: FormData) {
  await assertAdmin();
  const parsed = resourceSchema.safeParse({
    programme_id: normalizeEmpty(getFormString(formData, "programme_id")),
    title: getFormString(formData, "title"),
    owner_name: getFormString(formData, "owner_name"),
    intake: getFormString(formData, "intake"),
    platform: getFormString(formData, "platform"),
    url: getFormString(formData, "url"),
    notes: getFormString(formData, "notes"),
    is_official: formData.get("is_official") === "on",
    is_active: formData.get("is_active") === "on",
  });

  if (!parsed.success) redirect("/admin?error=Resource%20validation%20failed");

  const supabase = await createSupabaseServerClient();
  await supabase.from("resources").insert({
    ...parsed.data,
    notes: normalizeEmpty(parsed.data.notes),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Resource%20added");
}

export async function updateResourceAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const parsed = resourceSchema.safeParse({
    programme_id: normalizeEmpty(getFormString(formData, "programme_id")),
    title: getFormString(formData, "title"),
    owner_name: getFormString(formData, "owner_name"),
    intake: getFormString(formData, "intake"),
    platform: getFormString(formData, "platform"),
    url: getFormString(formData, "url"),
    notes: getFormString(formData, "notes"),
    is_official: formData.get("is_official") === "on",
    is_active: formData.get("is_active") === "on",
  });

  if (!id || !parsed.success) redirect("/admin?error=Resource%20validation%20failed");

  const supabase = await createSupabaseServerClient();
  await supabase
    .from("resources")
    .update({ ...parsed.data, notes: normalizeEmpty(parsed.data.notes) })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Resource%20updated");
}

export async function deleteResourceAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("resources").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Resource%20deleted");
}

export async function approveSubmissionAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const supabase = await createSupabaseServerClient();
  const { data: submission } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (!submission) redirect("/admin?error=Submission%20not%20found");

  await supabase.from("resources").insert({
    programme_id: submission.programme_id,
    title: `${submission.full_name} Resource`,
    owner_name: submission.full_name,
    intake: submission.intake,
    platform: submission.platform,
    url: submission.resource_url,
    notes: submission.notes,
    is_official: false,
    is_active: true,
  });

  await supabase.from("submissions").update({ status: "approved" }).eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=Submission%20approved");
}

export async function rejectSubmissionAction(formData: FormData) {
  await assertAdmin();
  const id = getFormString(formData, "id");
  const supabase = await createSupabaseServerClient();
  await supabase.from("submissions").update({ status: "rejected" }).eq("id", id);

  revalidatePath("/admin");
  redirect("/admin?success=Submission%20rejected");
}
