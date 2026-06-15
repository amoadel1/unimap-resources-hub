import { createSupabaseServerClient } from "./supabase/server";
import type { Programme, Resource, SiteStats, Submission } from "./types";

export async function getProgrammes() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programmes")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return (data ?? []) as Programme[];
}

export async function getProgrammeBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programmes")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Programme;
}

export async function getResources(programmeId?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("resources")
    .select("*, programmes(name, slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (programmeId) query = query.eq("programme_id", programmeId);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function getOfficialResources() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("resources")
    .select("*, programmes(name, slug)")
    .eq("is_official", true)
    .eq("is_active", true)
    .order("title");

  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function getSubmissions() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*, programmes(name, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Submission[];
}

export async function getStats(): Promise<SiteStats> {
  const supabase = await createSupabaseServerClient();
  const [programmes, resources, officialResources, pendingSubmissions] =
    await Promise.all([
      supabase.from("programmes").select("id", { count: "exact", head: true }),
      supabase.from("resources").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase
        .from("resources")
        .select("id", { count: "exact", head: true })
        .eq("is_official", true)
        .eq("is_active", true),
      supabase
        .from("submissions")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
    ]);

  return {
    programmes: programmes.count ?? 0,
    resources: resources.count ?? 0,
    officialResources: officialResources.count ?? 0,
    pendingSubmissions: pendingSubmissions.count ?? 0,
  };
}

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return data?.is_admin ? user : null;
}
