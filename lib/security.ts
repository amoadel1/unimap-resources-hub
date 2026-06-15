import { z } from "zod";
import { platforms } from "./constants";

const urlSchema = z
  .string()
  .trim()
  .url()
  .refine((value) => ["https:", "http:"].includes(new URL(value).protocol), {
    message: "Only http and https links are allowed.",
  });

export const programmeSchema = z.object({
  name: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a URL-safe slug."),
  faculty: z.string().trim().max(180).optional().or(z.literal("")),
  description: z.string().trim().max(800).optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export const resourceSchema = z.object({
  programme_id: z.string().uuid().nullable().optional(),
  title: z.string().trim().min(3).max(180),
  owner_name: z.string().trim().min(2).max(140),
  intake: z.string().trim().min(1).max(40),
  platform: z.enum(platforms as [string, ...string[]]),
  url: urlSchema,
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  is_official: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export const submissionSchema = z.object({
  full_name: z.string().trim().min(2).max(140),
  programme_id: z.string().uuid(),
  intake: z.string().trim().min(1).max(40),
  platform: z.enum(platforms as [string, ...string[]]),
  resource_url: urlSchema,
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export function normalizeEmpty(value: unknown) {
  return typeof value === "string" && value.trim() === "" ? null : value;
}

export function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}
