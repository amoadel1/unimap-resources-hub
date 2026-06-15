# Vercel Deployment Guide

## 1. Push Project to GitHub

Create a GitHub repository and push this project.

## 2. Import to Vercel

In Vercel:

1. Add New Project
2. Import the GitHub repository
3. Framework preset: Next.js
4. Build command: `npm run build`
5. Output directory: default

## 3. Add Environment Variables

In Vercel Project Settings, add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

Redeploy after adding variables.

## 4. Supabase Auth Redirect URLs

In Supabase Authentication URL settings, add:

```text
http://localhost:3000
https://your-domain.vercel.app
```

## 5. Production Checklist

- Confirm RLS is enabled.
- Confirm `SUPABASE_SERVICE_ROLE_KEY` is not public.
- Confirm admin login works.
- Confirm public submission creates pending records.
- Confirm approving a submission creates a public resource.
- Confirm programme pages work after adding a new programme in admin.
