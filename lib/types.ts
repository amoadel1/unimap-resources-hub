export type Platform =
  | "Google Drive"
  | "OneDrive"
  | "Box"
  | "Telegram"
  | "Website"
  | "Other";

export type Programme = {
  id: string;
  name: string;
  slug: string;
  faculty: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
};

export type Resource = {
  id: string;
  programme_id: string | null;
  title: string;
  owner_name: string;
  intake: string;
  platform: Platform;
  url: string;
  notes: string | null;
  is_official: boolean;
  is_active: boolean;
  created_at: string;
  programmes?: Pick<Programme, "name" | "slug"> | null;
};

export type Submission = {
  id: string;
  full_name: string;
  programme_id: string;
  intake: string;
  platform: Platform;
  resource_url: string;
  notes: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  programmes?: Pick<Programme, "name" | "slug"> | null;
};

export type SiteStats = {
  programmes: number;
  resources: number;
  officialResources: number;
  pendingSubmissions: number;
};
