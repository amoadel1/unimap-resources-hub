# Supabase Setup Guide

## 1. Create Supabase Project

Create a new project at Supabase and copy:

- Project URL
- Anon public key
- Service role key

Use the service role key only in server environment variables.

## 2. Create Database Schema

Open Supabase SQL Editor and run:

```sql
-- paste all contents of supabase/schema.sql
```

This creates:

- `profiles`
- `programmes`
- `resources`
- `submissions`
- `rate_limits`
- enum types for platforms and submission status
- RLS policies
- seed data

## 3. Seed Data Included

The schema inserts the initial programmes and resources supplied for:

- Bachelor of Electrical Engineering with Honours
- Bachelor of Mechatronic Engineering with Honours
- Bachelor of Mechanical Engineering with Honours
- Bachelor of Chemical Engineering with Honours
- Bachelor of Computer Engineering with Honours
- Bachelor of Biomedical Electronic Engineering with Honours
- Faculty of Electronic Engineering & Technology (FKTEN)
- Faculty of Business & Communication (FPK)
- UniMAP Academic Guide

## 4. RLS Model

Public visitors can:

- Read active programmes
- Read active resources
- Create pending submissions

Admins can:

- Manage programmes
- Manage resources
- Manage submissions
- View statistics

## 5. Admin Promotion

After creating the admin user in Supabase Auth, promote the account:

```sql
update public.profiles
set is_admin = true,
    full_name = 'ADEL HUSHAM MOHAMEDAIN'
where id = 'YOUR_AUTH_USER_ID';
```

Find `YOUR_AUTH_USER_ID` in Supabase Authentication users.
