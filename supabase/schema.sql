-- UniMAP Resources Hub database schema and seed data.
-- Run this file in Supabase SQL Editor after creating the project.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.platform_type as enum (
    'Google Drive',
    'OneDrive',
    'Box',
    'Telegram',
    'Website',
    'Other'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.submission_status as enum ('pending', 'approved', 'rejected');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.programmes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  faculty text,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid references public.programmes(id) on delete set null,
  title text not null,
  owner_name text not null,
  intake text not null,
  platform public.platform_type not null,
  url text not null check (url ~ '^https?://'),
  notes text,
  is_official boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  programme_id uuid not null references public.programmes(id) on delete cascade,
  intake text not null,
  platform public.platform_type not null,
  resource_url text not null check (resource_url ~ '^https?://'),
  notes text,
  status public.submission_status not null default 'pending',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.rate_limits (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  action text not null,
  created_at timestamptz not null default now()
);

create index if not exists programmes_slug_idx on public.programmes(slug);
create index if not exists resources_programme_idx on public.resources(programme_id);
create index if not exists resources_public_idx on public.resources(is_active, is_official);
create index if not exists submissions_status_idx on public.submissions(status);
create index if not exists rate_limits_key_action_idx on public.rate_limits(key, action, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists programmes_updated_at on public.programmes;
create trigger programmes_updated_at
before update on public.programmes
for each row execute function public.set_updated_at();

drop trigger if exists resources_updated_at on public.resources;
create trigger resources_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, is_admin)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'Admin'),
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.programmes enable row level security;
alter table public.resources enable row level security;
alter table public.submissions enable row level security;
alter table public.rate_limits enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active programmes" on public.programmes;
create policy "Public can read active programmes"
on public.programmes for select
to anon, authenticated
using (is_active = true or public.is_admin());

drop policy if exists "Admins manage programmes" on public.programmes;
create policy "Admins manage programmes"
on public.programmes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active resources" on public.resources;
create policy "Public can read active resources"
on public.resources for select
to anon, authenticated
using (is_active = true or public.is_admin());

drop policy if exists "Admins manage resources" on public.resources;
create policy "Admins manage resources"
on public.resources for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can create pending submissions" on public.submissions;
create policy "Anyone can create pending submissions"
on public.submissions for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Admins manage submissions" on public.submissions;
create policy "Admins manage submissions"
on public.submissions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Only admins can read rate limits" on public.rate_limits;
create policy "Only admins can read rate limits"
on public.rate_limits for select
to authenticated
using (public.is_admin());

insert into public.programmes (name, slug, faculty, description)
values
  ('Bachelor of Electrical Engineering with Honours', 'bachelor-electrical-engineering-with-honours', 'Engineering', 'Electrical engineering academic resources shared by UniMAP students.'),
  ('Bachelor of Mechatronic Engineering with Honours', 'bachelor-mechatronic-engineering-with-honours', 'Engineering', 'Mechatronic engineering drives, notes, labs, and study resources.'),
  ('Bachelor of Mechanical Engineering with Honours', 'bachelor-mechanical-engineering-with-honours', 'Engineering', 'Mechanical engineering academic resources and community links.'),
  ('Bachelor of Chemical Engineering with Honours', 'bachelor-chemical-engineering-with-honours', 'Engineering', 'This programme page is ready for future resources.'),
  ('Bachelor of Computer Engineering with Honours', 'bachelor-computer-engineering-with-honours', 'Engineering', 'Computer engineering academic resources shared by students.'),
  ('Bachelor of Biomedical Electronic Engineering with Honours', 'bachelor-biomedical-electronic-engineering-with-honours', 'Engineering', 'Biomedical electronic engineering resource collections.'),
  ('Faculty of Electronic Engineering & Technology (FKTEN)', 'faculty-electronic-engineering-technology-fkten', 'FKTEN', 'Faculty-level electronic engineering and technology resources.'),
  ('Faculty of Business & Communication (FPK)', 'faculty-business-communication-fpk', 'FPK', 'This faculty page is ready for future resources.')
on conflict (slug) do update
set name = excluded.name,
    faculty = excluded.faculty,
    description = excluded.description,
    is_active = true;

insert into public.resources (programme_id, title, owner_name, intake, platform, url, notes)
select p.id, r.title, r.owner_name, r.intake, r.platform::public.platform_type, r.url, r.notes
from (
  values
    ('bachelor-electrical-engineering-with-honours', 'ABDULAZIZ OSHAISH OneDrive', 'ABDULAZIZ OSHAISH', '2020', 'OneDrive', 'https://unimapedumy-my.sharepoint.com/:f:/g/personal/s201090009-5_studentmail_unimap_edu_my/EqV_7MM7Wc5BhuwdVytE0XcBC6imJFPjOTPEzNRfF1_Zeg?e=7wdENY', null),
    ('bachelor-electrical-engineering-with-honours', 'ABDULRAHMAN ALSHAQDARI Drive', 'ABDULRAHMAN ALSHAQDARI', '2022', 'Google Drive', 'https://drive.google.com/drive/folders/19GpBX01ekINNOIDGnKl0b2HevPh0w7_t', null),
    ('bachelor-electrical-engineering-with-honours', 'WALEED ABDULLAH ALFUTAIH Drive', 'WALEED ABDULLAH ALFUTAIH', '2023', 'Google Drive', 'https://drive.google.com/drive/folders/1FfOIZWjQePYLjj0o5JuLYJPlRLhYqc8b', null),
    ('bachelor-electrical-engineering-with-honours', 'ADEL HUSHAM MOHAMEDAIN Drive', 'ADEL HUSHAM MOHAMEDAIN', '2023', 'Google Drive', 'https://drive.google.com/drive/folders/1CHJnJDgs3cqo14FownuZVtShnGe9qhOY', null),
    ('bachelor-mechatronic-engineering-with-honours', 'SAIF HASAN AL AHDAL Box', 'SAIF HASAN AL AHDAL', '2020', 'Box', 'https://app.box.com/s/2dnpvvxix2rng4v9wqi9f0gb4u72019t', null),
    ('bachelor-mechatronic-engineering-with-honours', 'AMMAR AL MEKHLAFI Drive', 'AMMAR AL MEKHLAFI', '2020', 'Google Drive', 'https://drive.google.com/drive/u/0/folders/1qNJFPQKgjQjEc5YNQbzC5_me8_xlvcC6', null),
    ('bachelor-mechatronic-engineering-with-honours', 'ABDULKAREEM BAGERI Drive', 'ABDULKAREEM BAGERI', '2021', 'Google Drive', 'https://drive.google.com/drive/folders/1Qz3vOFiEITbpeQa2zm8pyU-jRMP3MpVL', null),
    ('bachelor-mechatronic-engineering-with-honours', 'AMR IBRAHIM Drive', 'AMR IBRAHIM', '2020', 'Google Drive', 'https://drive.google.com/drive/folders/1zfTpaeO1eM4NzK8GAsrba3X_-OdwXoAM', null),
    ('bachelor-mechatronic-engineering-with-honours', 'WAHIB ISMAIL MOHAMED Drive', 'WAHIB ISMAIL MOHAMED', '2020', 'Google Drive', 'https://drive.google.com/drive/folders/14EvztpSPyIPtVmxsLamSCsFupn_UrFO4', null),
    ('bachelor-mechatronic-engineering-with-honours', 'ABDULMALEK BAABED Drive', 'ABDULMALEK BAABED', '2024', 'Google Drive', 'https://drive.google.com/drive/folders/1slANeZqBtsqWgU80NMK9XO-c5OoObwPh', null),
    ('bachelor-mechatronic-engineering-with-honours', 'AKRAM YASSIR Drive', 'AKRAM YASSIR', '2024', 'Google Drive', 'https://drive.google.com/drive/folders/1IzJbgBpD06dpCJIsun420ix1iAo0Z3it', null),
    ('bachelor-mechanical-engineering-with-honours', 'Mechanical Engineering Community Drive', 'Community Drive', 'Unknown', 'Google Drive', 'https://drive.google.com/drive/mobile/folders/1JF_x67GZnezYfasKagxXDV7zdf9lHnvC', 'Shared by multiple students.'),
    ('bachelor-computer-engineering-with-honours', 'MOHAMMED SALEH Drive', 'MOHAMMED SALEH', '2023', 'Google Drive', 'https://drive.google.com/drive/folders/1lYMpBrPn8bs-XHwdeGFOaTP2mNDI-5NA', null),
    ('bachelor-computer-engineering-with-honours', 'ALA NADHER Drive', 'ALA NADHER', '2024', 'Google Drive', 'https://drive.google.com/drive/folders/1Z1WqZDr93dmcyv7Wsac2vsPiL5FnJxlJ', null),
    ('bachelor-biomedical-electronic-engineering-with-honours', 'Mohammed Khaled Drive', 'Mohammed Khaled', '2016', 'Google Drive', 'https://drive.google.com/drive/folders/1dkT16HnVxLwrkZuuOrGrGp7tg2FEMMJo', null),
    ('bachelor-biomedical-electronic-engineering-with-honours', 'RAMZI KHAN Drive', 'RAMZI KHAN', '2018', 'Google Drive', 'https://drive.google.com/drive/folders/13S26zFVlDyez-R84GtBkYeN_2QIgXifq', null),
    ('bachelor-biomedical-electronic-engineering-with-honours', 'AHMED & METEB & MUSAAB Drive', 'AHMED & METEB & MUSAAB', '2019', 'Google Drive', 'https://drive.google.com/drive/folders/1RJopRh6Mi4sfNAP6iunEDtSJf10YfU3t', null),
    ('bachelor-biomedical-electronic-engineering-with-honours', 'MARWAN ALI HASAN Drive', 'MARWAN ALI HASAN', '2021', 'Google Drive', 'https://drive.google.com/drive/folders/1xT9K3FdwgVW5EWRCD3SECZxiKY0BKd3L', null),
    ('bachelor-biomedical-electronic-engineering-with-honours', 'AHMED BASHUMEEL Drive', 'AHMED BASHUMEEL', '2024', 'Google Drive', 'https://drive.google.com/drive/folders/1r--HXduccYeOoSsYiCOHUciFiZP40gWd', null),
    ('faculty-electronic-engineering-technology-fkten', 'Andrew Leong Drive', 'Andrew Leong', '2022', 'Google Drive', 'https://drive.google.com/drive/folders/1_JFTgSb9I5P-IdMWjb_MU_D3LqYJCYtU', null)
) as r(slug, title, owner_name, intake, platform, url, notes)
join public.programmes p on p.slug = r.slug
where not exists (
  select 1 from public.resources existing where existing.url = r.url
);

insert into public.resources (
  programme_id,
  title,
  owner_name,
  intake,
  platform,
  url,
  notes,
  is_official,
  is_active
)
select
  null,
  'UniMAP Academic Guide',
  'Universiti Malaysia Perlis',
  'Official',
  'Website',
  'https://sites.google.com/unimap.edu.my/academicunimap/home',
  'Official UniMAP academic information including academic guide, regulations, academic calendar, timetable, forms, and academic resources.',
  true,
  true
where not exists (
  select 1 from public.resources where url = 'https://sites.google.com/unimap.edu.my/academicunimap/home'
);

-- After creating your first Supabase Auth user, promote it to admin:
-- update public.profiles
-- set is_admin = true, full_name = 'ADEL HUSHAM MOHAMEDAIN'
-- where id = 'YOUR_AUTH_USER_ID';
